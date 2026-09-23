package com.hyderabadrealty.modules.location.controller;

import com.hyderabadrealty.common.ApiResponse;
import com.hyderabadrealty.modules.location.dto.LocationDto;
import com.hyderabadrealty.modules.location.service.LocationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor
@Tag(name = "Locations", description = "Endpoints for Hyderabad growth corridor locations")
public class LocationController {

    private final LocationService locationService;

    @GetMapping
    @Operation(summary = "Get all active locations")
    public ResponseEntity<ApiResponse<List<LocationDto>>> getAllLocations() {
        return ResponseEntity.ok(ApiResponse.success(locationService.getAllActiveLocations()));
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured growth corridors")
    public ResponseEntity<ApiResponse<List<LocationDto>>> getFeaturedLocations() {
        return ResponseEntity.ok(ApiResponse.success(locationService.getFeaturedLocations()));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get location by slug")
    public ResponseEntity<ApiResponse<LocationDto>> getLocationBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(locationService.getLocationBySlug(slug)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'CONTENT_MANAGER')")
    @Operation(summary = "Create a new location (Admin/Content Manager)")
    public ResponseEntity<ApiResponse<LocationDto>> createLocation(@Valid @RequestBody LocationDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Location created", locationService.createLocation(dto)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CONTENT_MANAGER')")
    @Operation(summary = "Update location by ID")
    public ResponseEntity<ApiResponse<LocationDto>> updateLocation(@PathVariable String id, @Valid @RequestBody LocationDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Location updated", locationService.updateLocation(id, dto)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Deactivate location by ID")
    public ResponseEntity<ApiResponse<Void>> deleteLocation(@PathVariable String id) {
        locationService.deleteLocation(id);
        return ResponseEntity.ok(ApiResponse.success("Location deactivated", null));
    }
}
