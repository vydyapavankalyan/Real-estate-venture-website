package com.hyderabadrealty.modules.project.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectImage {
    private String url;
    private String caption;
    private String category; // EXTERIOR, ENTRANCE, LIVING_ROOM, BEDROOM, KITCHEN, BATHROOM, BALCONY, CLUBHOUSE, SWIMMING_POOL, GYM, GARDEN, PLAY_AREA, ROADS, LANDSCAPING
    private int order;
    private boolean isCover;
}
