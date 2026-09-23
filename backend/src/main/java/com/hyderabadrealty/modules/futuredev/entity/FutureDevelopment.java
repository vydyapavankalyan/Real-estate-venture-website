package com.hyderabadrealty.modules.futuredev.entity;

import com.hyderabadrealty.common.BaseDocument;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "future_development")
public class FutureDevelopment extends BaseDocument {

    @Indexed
    private String title;

    private String slug;

    @Indexed
    private String category; // METRO, ROADWAYS, IT_SEZ, PHARMA_LIFE_SCIENCES, DATA_CENTERS, AIRPORT, URBAN_INFRA

    @Indexed
    private String zone; // WEST, NORTH, EAST, SOUTH, CENTRAL, REGIONAL

    private String locationName; // e.g. "Kokapet - Neopolis - Financial District"
    private double latitude;
    private double longitude;

    private String description;
    private String impactSummary;

    @Indexed
    private DevStatus status;

    private String expectedTimeline; // e.g., "2026 - 2028"
    private String sourceReference;  // e.g., "HMDA Master Plan & Telangana Infra Bulletin"
    private String lastUpdatedDate;  // e.g., "August 2026"

    private String imageUrl;

    @Builder.Default
    private List<String> keyHighlights = new ArrayList<>();

    @Builder.Default
    private boolean verified = true;

    @Builder.Default
    private boolean active = true;

    private int displayOrder;
}
