package com.hyderabadrealty.modules.project.controller;

import com.hyderabadrealty.common.ApiResponse;
import com.hyderabadrealty.common.PageResponse;
import com.hyderabadrealty.modules.project.dto.ProjectDto;
import com.hyderabadrealty.modules.project.dto.ProjectSearchCriteria;
import com.hyderabadrealty.modules.project.entity.ProjectStatus;
import com.hyderabadrealty.modules.project.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Tag(name = "Projects", description = "Endpoints for exploring, filtering and managing real estate projects")
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/featured")
    @Operation(summary = "Get featured projects for homepage and highlights")
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getFeaturedProjects() {
        return ResponseEntity.ok(ApiResponse.success(projectService.getFeaturedProjects()));
    }

    @GetMapping("/search")
    @Operation(summary = "Search projects with multi-criteria filters (location, type, bhk, budget, status)")
    public ResponseEntity<ApiResponse<PageResponse<ProjectDto>>> searchProjects(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String propertyType,
            @RequestParam(required = false) String bhk,
            @RequestParam(required = false) Long minPrice,
            @RequestParam(required = false) Long maxPrice,
            @RequestParam(required = false) ProjectStatus status,
            @RequestParam(required = false) String amenity,
            @RequestParam(required = false) Boolean featured,
            @RequestParam(defaultValue = "featured") String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        ProjectSearchCriteria criteria = ProjectSearchCriteria.builder()
                .query(query)
                .location(location)
                .propertyType(propertyType)
                .bhk(bhk)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .status(status)
                .amenity(amenity)
                .featured(featured)
                .sortBy(sortBy)
                .page(page)
                .size(size)
                .build();

        return ResponseEntity.ok(ApiResponse.success(projectService.searchProjects(criteria)));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get project details by slug")
    public ResponseEntity<ApiResponse<ProjectDto>> getProjectBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(projectService.getProjectBySlug(slug)));
    }

    @GetMapping("/id/{id}")
    @Operation(summary = "Get project details by ID")
    public ResponseEntity<ApiResponse<ProjectDto>> getProjectById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(projectService.getProjectById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'CONTENT_MANAGER')")
    @Operation(summary = "Create a new project (Admin/Content Manager)")
    public ResponseEntity<ApiResponse<ProjectDto>> createProject(@Valid @RequestBody ProjectDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Project created successfully", projectService.createProject(dto)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CONTENT_MANAGER')")
    @Operation(summary = "Update an existing project (Admin/Content Manager)")
    public ResponseEntity<ApiResponse<ProjectDto>> updateProject(@PathVariable String id, @Valid @RequestBody ProjectDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Project updated successfully", projectService.updateProject(id, dto)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a project (Admin only)")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable String id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(ApiResponse.success("Project deleted successfully", null));
    }
}
