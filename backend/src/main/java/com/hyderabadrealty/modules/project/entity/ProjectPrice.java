package com.hyderabadrealty.modules.project.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectPrice {
    private long startingFrom;      // Numeric for sorting/filtering (e.g. 18500000)
    private long maxPrice;          // Numeric
    private String priceDisplay;    // Formatted placeholder, e.g. "Starting from ₹1.85 Cr*"
    @Builder.Default
    private String currency = "INR";
}
