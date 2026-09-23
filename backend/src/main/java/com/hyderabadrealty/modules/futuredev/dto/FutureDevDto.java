package com.hyderabadrealty.modules.futuredev.dto;

import com.hyderabadrealty.modules.futuredev.entity.DevStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FutureDevDto {
    private String id;

    @NotBlank(message = "Title is required")
    private String title;

    private String slug;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Zone is required")
    private String zone;

    private String locationName;
    private double latitude;
    private double longitude;

    private String description;
    private String impactSummary;

    @NotNull(message = "Status is required")
    private DevStatus status;

    private String expectedTimeline;
    private String sourceReference;
    private String lastUpdatedDate;
    private String imageUrl;
    private List<String> keyHighlights;
    private boolean verified;
    private boolean active;
    private int displayOrder;
}
