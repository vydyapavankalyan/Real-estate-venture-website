package com.hyderabadrealty.modules.project.dto;

import com.hyderabadrealty.modules.location.entity.NearbyHub;
import com.hyderabadrealty.modules.project.entity.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    private String id;

    @NotBlank(message = "Project name is required")
    private String projectName;

    private String slug;
    private String developer;

    @NotNull(message = "Location is required")
    private ProjectLocation location;

    @NotBlank(message = "Property type is required")
    private String propertyType;

    private List<String> configurations;
    private ProjectPrice price;

    @NotNull(message = "Project status is required")
    private ProjectStatus status;

    private String reraNumber;
    private String reraDisclaimer;

    private String description;
    private String tagline;

    private String landArea;
    private int totalUnits;
    private String totalTowers;
    private String possessionDate;

    private List<String> amenities;
    private List<ProjectImage> gallery;
    private List<FloorPlan> floorPlans;
    private List<NearbyHub> locationHighlights;

    private String brochureUrl;
    private String videoTourUrl;
    private String virtualTour360Url;

    private boolean featured;
    private boolean published;
    private String coverImageUrl;

    private Instant createdAt;
    private Instant updatedAt;
}
