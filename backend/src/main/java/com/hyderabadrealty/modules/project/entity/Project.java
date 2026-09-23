package com.hyderabadrealty.modules.project.entity;

import com.hyderabadrealty.common.BaseDocument;
import com.hyderabadrealty.modules.location.entity.NearbyHub;
import lombok.*;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "projects")
@CompoundIndexes({
    @CompoundIndex(name = "location_status_idx", def = "{'location.area': 1, 'status': 1}"),
    @CompoundIndex(name = "type_price_idx", def = "{'propertyType': 1, 'price.startingFrom': 1}")
})
public class Project extends BaseDocument {

    @Indexed
    private String projectName;

    @Indexed(unique = true)
    private String slug;

    private String developer;

    private ProjectLocation location;

    @Indexed
    private String propertyType; // APARTMENT, VILLA, PLOT, COMMERCIAL

    @Builder.Default
    private List<String> configurations = new ArrayList<>(); // "2 BHK", "3 BHK", "4 BHK", "5 BHK"

    private ProjectPrice price;

    @Indexed
    private ProjectStatus status;

    private String reraNumber; // Placeholder string
    private String reraDisclaimer;

    private String description;
    private String tagline;

    private String landArea;       // e.g. "4.5 Acres"
    private int totalUnits;        // e.g. 340
    private String totalTowers;    // e.g. "3 High-Rise Towers (G+45)"
    private String possessionDate; // e.g. "December 2027"

    @Builder.Default
    private List<String> amenities = new ArrayList<>();

    @Builder.Default
    private List<ProjectImage> gallery = new ArrayList<>();

    @Builder.Default
    private List<FloorPlan> floorPlans = new ArrayList<>();

    @Builder.Default
    private List<NearbyHub> locationHighlights = new ArrayList<>();

    private String brochureUrl;
    private String videoTourUrl;
    private String virtualTour360Url;

    @Indexed
    @Builder.Default
    private boolean featured = false;

    @Builder.Default
    private boolean published = true;

    private String coverImageUrl;
}
