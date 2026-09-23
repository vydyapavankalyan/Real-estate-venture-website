package com.hyderabadrealty.modules.sitevisit.dto;

import com.hyderabadrealty.modules.sitevisit.entity.VisitStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SiteVisitDto {
    private String id;
    private String visitCode;
    private String name;
    private String phone;
    private String email;
    private String projectId;
    private String projectName;
    private String preferredDate;
    private String preferredTimeSlot;
    private int numberOfVisitors;
    private boolean transportationRequired;
    private String pickupAddress;
    private String specialRequests;
    private VisitStatus status;
    private String assignedAgentId;
    private String assignedAgentName;
    private String adminNotes;
    private Instant createdAt;
    private Instant updatedAt;
}
