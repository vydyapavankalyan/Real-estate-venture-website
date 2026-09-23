package com.hyderabadrealty.modules.project.dto;

import com.hyderabadrealty.modules.project.entity.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectSearchCriteria {
    private String query;
    private String location;
    private String propertyType;
    private String bhk;
    private Long minPrice;
    private Long maxPrice;
    private ProjectStatus status;
    private String amenity;
    private Boolean featured;
    
    @Builder.Default
    private String sortBy = "featured"; // featured, price_asc, price_desc, newest
    
    @Builder.Default
    private int page = 0;
    
    @Builder.Default
    private int size = 12;
}
