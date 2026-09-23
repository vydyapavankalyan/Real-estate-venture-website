package com.hyderabadrealty.modules.project.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectLocation {
    private String area;      // e.g., Kokapet
    private String city;      // Hyderabad
    private String state;     // Telangana
    private String address;   // Golden Mile Road, Kokapet
    private double latitude;
    private double longitude;
}
