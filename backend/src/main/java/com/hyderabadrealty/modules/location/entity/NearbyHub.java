package com.hyderabadrealty.modules.location.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NearbyHub {
    private String name;
    private double distanceKm;
    private int travelTimeMins;
    private String category; // METRO, AIRPORT, IT_PARK, SCHOOL, HOSPITAL, MALL
    private boolean verified;
}
