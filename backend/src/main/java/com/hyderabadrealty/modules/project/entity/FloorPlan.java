package com.hyderabadrealty.modules.project.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FloorPlan {
    private String id;
    private String bhk; // "2 BHK", "3 BHK", "4 BHK", "PENTHOUSE"
    private String title;
    private int superBuiltUpAreaSqFt;
    private int carpetAreaSqFt;
    private String imageUrl;
    private String pricePlaceholder; // e.g. "Starting from ₹1.85 Cr*"
}
