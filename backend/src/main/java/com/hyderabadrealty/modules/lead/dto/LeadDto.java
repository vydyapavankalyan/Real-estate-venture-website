package com.hyderabadrealty.modules.lead.dto;

import com.hyderabadrealty.modules.lead.entity.LeadNote;
import com.hyderabadrealty.modules.lead.entity.LeadStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeadDto {
    private String id;
    private String leadCode;
    private String name;
    private String phone;
    private String email;
    private String preferredLocation;
    private String propertyType;
    private String budget;
    private String projectId;
    private String projectName;
    private String message;
    private String source;
    private LeadStatus status;
    private String assignedAgentId;
    private String assignedAgentName;
    private List<LeadNote> notes;
    private String nextFollowUpDate;
    private Instant createdAt;
    private Instant updatedAt;
}
