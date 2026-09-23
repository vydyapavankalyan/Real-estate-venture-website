package com.hyderabadrealty.modules.project.service;

import com.hyderabadrealty.common.PageResponse;
import com.hyderabadrealty.common.ResourceNotFoundException;
import com.hyderabadrealty.modules.location.service.LocationService;
import com.hyderabadrealty.modules.project.dto.ProjectDto;
import com.hyderabadrealty.modules.project.dto.ProjectSearchCriteria;
import com.hyderabadrealty.modules.project.entity.Project;
import com.hyderabadrealty.modules.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final MongoTemplate mongoTemplate;

    public List<ProjectDto> getFeaturedProjects() {
        return projectRepository.findByFeaturedTrueAndPublishedTrue().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ProjectDto getProjectBySlug(String slug) {
        Project project = projectRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "slug", slug));
        return mapToDto(project);
    }

    public ProjectDto getProjectById(String id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        return mapToDto(project);
    }

    public PageResponse<ProjectDto> searchProjects(ProjectSearchCriteria criteria) {
        Query query = new Query();
        query.addCriteria(Criteria.where("published").is(true));

        if (StringUtils.hasText(criteria.getQuery())) {
            Criteria textSearch = new Criteria().orOperator(
                    Criteria.where("projectName").regex(criteria.getQuery(), "i"),
                    Criteria.where("developer").regex(criteria.getQuery(), "i"),
                    Criteria.where("description").regex(criteria.getQuery(), "i")
            );
            query.addCriteria(textSearch);
        }

        if (StringUtils.hasText(criteria.getLocation())) {
            query.addCriteria(Criteria.where("location.area").regex(criteria.getLocation(), "i"));
        }

        if (StringUtils.hasText(criteria.getPropertyType())) {
            query.addCriteria(Criteria.where("propertyType").is(criteria.getPropertyType().toUpperCase()));
        }

        if (StringUtils.hasText(criteria.getBhk())) {
            query.addCriteria(Criteria.where("configurations").is(criteria.getBhk()));
        }

        if (criteria.getStatus() != null) {
            query.addCriteria(Criteria.where("status").is(criteria.getStatus()));
        }

        if (criteria.getMinPrice() != null || criteria.getMaxPrice() != null) {
            Criteria priceCriteria = Criteria.where("price.startingFrom");
            if (criteria.getMinPrice() != null) {
                priceCriteria = priceCriteria.gte(criteria.getMinPrice());
            }
            if (criteria.getMaxPrice() != null) {
                priceCriteria = priceCriteria.lte(criteria.getMaxPrice());
            }
            query.addCriteria(priceCriteria);
        }

        if (StringUtils.hasText(criteria.getAmenity())) {
            query.addCriteria(Criteria.where("amenities").is(criteria.getAmenity()));
        }

        if (criteria.getFeatured() != null && criteria.getFeatured()) {
            query.addCriteria(Criteria.where("featured").is(true));
        }

        long totalElements = mongoTemplate.count(query, Project.class);

        // Sorting
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        if ("price_asc".equalsIgnoreCase(criteria.getSortBy())) {
            sort = Sort.by(Sort.Direction.ASC, "price.startingFrom");
        } else if ("price_desc".equalsIgnoreCase(criteria.getSortBy())) {
            sort = Sort.by(Sort.Direction.DESC, "price.startingFrom");
        } else if ("featured".equalsIgnoreCase(criteria.getSortBy())) {
            sort = Sort.by(Sort.Direction.DESC, "featured").and(Sort.by(Sort.Direction.DESC, "createdAt"));
        }

        Pageable pageable = PageRequest.of(criteria.getPage(), criteria.getSize(), sort);
        query.with(pageable);

        List<Project> projects = mongoTemplate.find(query, Project.class);
        List<ProjectDto> dtos = projects.stream().map(this::mapToDto).collect(Collectors.toList());

        int totalPages = (int) Math.ceil((double) totalElements / criteria.getSize());
        boolean isLast = criteria.getPage() >= totalPages - 1;

        return PageResponse.<ProjectDto>builder()
                .content(dtos)
                .pageNumber(criteria.getPage())
                .pageSize(criteria.getSize())
                .totalElements(totalElements)
                .totalPages(totalPages)
                .last(isLast)
                .build();
    }

    public ProjectDto createProject(ProjectDto dto) {
        String slug = dto.getSlug() != null && !dto.getSlug().isBlank()
                ? LocationService.toSlug(dto.getSlug()) : LocationService.toSlug(dto.getProjectName());

        Project project = Project.builder()
                .projectName(dto.getProjectName())
                .slug(slug)
                .developer(dto.getDeveloper())
                .location(dto.getLocation())
                .propertyType(dto.getPropertyType().toUpperCase())
                .configurations(dto.getConfigurations())
                .price(dto.getPrice())
                .status(dto.getStatus())
                .reraNumber(dto.getReraNumber())
                .reraDisclaimer(dto.getReraDisclaimer())
                .description(dto.getDescription())
                .tagline(dto.getTagline())
                .landArea(dto.getLandArea())
                .totalUnits(dto.getTotalUnits())
                .totalTowers(dto.getTotalTowers())
                .possessionDate(dto.getPossessionDate())
                .amenities(dto.getAmenities())
                .gallery(dto.getGallery())
                .floorPlans(dto.getFloorPlans())
                .locationHighlights(dto.getLocationHighlights())
                .brochureUrl(dto.getBrochureUrl())
                .videoTourUrl(dto.getVideoTourUrl())
                .virtualTour360Url(dto.getVirtualTour360Url())
                .featured(dto.isFeatured())
                .published(dto.isPublished())
                .coverImageUrl(dto.getCoverImageUrl())
                .build();

        return mapToDto(projectRepository.save(project));
    }

    public ProjectDto updateProject(String id, ProjectDto dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));

        project.setProjectName(dto.getProjectName());
        if (dto.getSlug() != null && !dto.getSlug().isBlank()) {
            project.setSlug(LocationService.toSlug(dto.getSlug()));
        }
        project.setDeveloper(dto.getDeveloper());
        project.setLocation(dto.getLocation());
        project.setPropertyType(dto.getPropertyType().toUpperCase());
        project.setConfigurations(dto.getConfigurations());
        project.setPrice(dto.getPrice());
        project.setStatus(dto.getStatus());
        project.setReraNumber(dto.getReraNumber());
        project.setReraDisclaimer(dto.getReraDisclaimer());
        project.setDescription(dto.getDescription());
        project.setTagline(dto.getTagline());
        project.setLandArea(dto.getLandArea());
        project.setTotalUnits(dto.getTotalUnits());
        project.setTotalTowers(dto.getTotalTowers());
        project.setPossessionDate(dto.getPossessionDate());
        project.setAmenities(dto.getAmenities());
        project.setGallery(dto.getGallery());
        project.setFloorPlans(dto.getFloorPlans());
        project.setLocationHighlights(dto.getLocationHighlights());
        project.setBrochureUrl(dto.getBrochureUrl());
        project.setVideoTourUrl(dto.getVideoTourUrl());
        project.setVirtualTour360Url(dto.getVirtualTour360Url());
        project.setFeatured(dto.isFeatured());
        project.setPublished(dto.isPublished());
        project.setCoverImageUrl(dto.getCoverImageUrl());

        return mapToDto(projectRepository.save(project));
    }

    public void deleteProject(String id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        projectRepository.delete(project);
    }

    public ProjectDto mapToDto(Project p) {
        return ProjectDto.builder()
                .id(p.getId())
                .projectName(p.getProjectName())
                .slug(p.getSlug())
                .developer(p.getDeveloper())
                .location(p.getLocation())
                .propertyType(p.getPropertyType())
                .configurations(p.getConfigurations())
                .price(p.getPrice())
                .status(p.getStatus())
                .reraNumber(p.getReraNumber())
                .reraDisclaimer(p.getReraDisclaimer())
                .description(p.getDescription())
                .tagline(p.getTagline())
                .landArea(p.getLandArea())
                .totalUnits(p.getTotalUnits())
                .totalTowers(p.getTotalTowers())
                .possessionDate(p.getPossessionDate())
                .amenities(p.getAmenities())
                .gallery(p.getGallery())
                .floorPlans(p.getFloorPlans())
                .locationHighlights(p.getLocationHighlights())
                .brochureUrl(p.getBrochureUrl())
                .videoTourUrl(p.getVideoTourUrl())
                .virtualTour360Url(p.getVirtualTour360Url())
                .featured(p.isFeatured())
                .published(p.isPublished())
                .coverImageUrl(p.getCoverImageUrl())
                .createdAt(p.getCreatedAt())
                .updatedAt(p.getUpdatedAt())
                .build();
    }
}
