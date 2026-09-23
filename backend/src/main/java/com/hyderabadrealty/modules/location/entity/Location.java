package com.hyderabadrealty.modules.location.entity;

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
@Document(collection = "locations")
public class Location extends BaseDocument {

    @Indexed(unique = true)
    private String name;

    @Indexed(unique = true)
    private String slug;

    @Indexed
    private String zone; // WEST_HYDERABAD, NORTH_HYDERABAD, EAST_HYDERABAD, SOUTH_HYDERABAD

    private double latitude;
    private double longitude;

    private String description;
    private String overview;

    @Builder.Default
    private List<String> connectivityHighlights = new ArrayList<>();

    @Builder.Default
    private List<NearbyHub> nearbyHubs = new ArrayList<>();

    private String pricePerSqFtRange;
    private String growthProspects;

    private String heroImageUrl;

    @Builder.Default
    private boolean featured = false;

    @Builder.Default
    private boolean active = true;
}
