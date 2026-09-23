package com.hyderabadrealty.modules.futuredev.service;

import com.hyderabadrealty.common.ResourceNotFoundException;
import com.hyderabadrealty.modules.futuredev.dto.FutureDevDto;
import com.hyderabadrealty.modules.futuredev.entity.DevStatus;
import com.hyderabadrealty.modules.futuredev.entity.FutureDevelopment;
import com.hyderabadrealty.modules.futuredev.repository.FutureDevelopmentRepository;
import com.hyderabadrealty.modules.location.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FutureDevService {

    private final FutureDevelopmentRepository futureDevRepository;

    public List<FutureDevDto> getAllActive() {
        return futureDevRepository.findByActiveTrueOrderByDisplayOrderAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<FutureDevDto> getByCategory(String category) {
        return futureDevRepository.findByCategoryAndActiveTrue(category.toUpperCase()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<FutureDevDto> getByZone(String zone) {
        return futureDevRepository.findByZoneAndActiveTrue(zone.toUpperCase()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<FutureDevDto> getByStatus(DevStatus status) {
        return futureDevRepository.findByStatusAndActiveTrue(status).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public FutureDevDto getById(String id) {
        FutureDevelopment entity = futureDevRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FutureDevelopment", "id", id));
        return mapToDto(entity);
    }

    public FutureDevDto create(FutureDevDto dto) {
        String slug = LocationService.toSlug(dto.getTitle());

        FutureDevelopment entity = FutureDevelopment.builder()
                .title(dto.getTitle())
                .slug(slug)
                .category(dto.getCategory().toUpperCase())
                .zone(dto.getZone().toUpperCase())
                .locationName(dto.getLocationName())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .description(dto.getDescription())
                .impactSummary(dto.getImpactSummary())
                .status(dto.getStatus())
                .expectedTimeline(dto.getExpectedTimeline())
                .sourceReference(dto.getSourceReference())
                .lastUpdatedDate(dto.getLastUpdatedDate())
                .imageUrl(dto.getImageUrl())
                .keyHighlights(dto.getKeyHighlights())
                .verified(dto.isVerified())
                .active(true)
                .displayOrder(dto.getDisplayOrder())
                .build();

        return mapToDto(futureDevRepository.save(entity));
    }

    public FutureDevDto update(String id, FutureDevDto dto) {
        FutureDevelopment entity = futureDevRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FutureDevelopment", "id", id));

        entity.setTitle(dto.getTitle());
        entity.setCategory(dto.getCategory().toUpperCase());
        entity.setZone(dto.getZone().toUpperCase());
        entity.setLocationName(dto.getLocationName());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setDescription(dto.getDescription());
        entity.setImpactSummary(dto.getImpactSummary());
        entity.setStatus(dto.getStatus());
        entity.setExpectedTimeline(dto.getExpectedTimeline());
        entity.setSourceReference(dto.getSourceReference());
        entity.setLastUpdatedDate(dto.getLastUpdatedDate());
        entity.setImageUrl(dto.getImageUrl());
        entity.setKeyHighlights(dto.getKeyHighlights());
        entity.setVerified(dto.isVerified());
        entity.setActive(dto.isActive());
        entity.setDisplayOrder(dto.getDisplayOrder());

        return mapToDto(futureDevRepository.save(entity));
    }

    public void delete(String id) {
        FutureDevelopment entity = futureDevRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FutureDevelopment", "id", id));
        futureDevRepository.delete(entity);
    }

    private FutureDevDto mapToDto(FutureDevelopment d) {
        return FutureDevDto.builder()
                .id(d.getId())
                .title(d.getTitle())
                .slug(d.getSlug())
                .category(d.getCategory())
                .zone(d.getZone())
                .locationName(d.getLocationName())
                .latitude(d.getLatitude())
                .longitude(d.getLongitude())
                .description(d.getDescription())
                .impactSummary(d.getImpactSummary())
                .status(d.getStatus())
                .expectedTimeline(d.getExpectedTimeline())
                .sourceReference(d.getSourceReference())
                .lastUpdatedDate(d.getLastUpdatedDate())
                .imageUrl(d.getImageUrl())
                .keyHighlights(d.getKeyHighlights())
                .verified(d.isVerified())
                .active(d.isActive())
                .displayOrder(d.getDisplayOrder())
                .build();
    }
}
