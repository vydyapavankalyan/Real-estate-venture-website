package com.hyderabadrealty.modules.location.dto;

import com.hyderabadrealty.modules.location.entity.NearbyHub;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LocationDto {
    private String id;

    @NotBlank(message = "Location name is required")
    private String name;

    private String slug;

    @NotBlank(message = "Zone is required")
    private String zone;

    private double latitude;
    private double longitude;

    private String description;
    private String overview;

    private List<String> connectivityHighlights;
    private List<NearbyHub> nearbyHubs;

    private String pricePerSqFtRange;
    private String growthProspects;

    private String heroImageUrl;
    private boolean featured;
    private boolean active;
}
