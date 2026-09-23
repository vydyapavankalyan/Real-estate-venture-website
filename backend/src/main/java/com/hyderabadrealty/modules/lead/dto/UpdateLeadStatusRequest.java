package com.hyderabadrealty.modules.lead.dto;

import com.hyderabadrealty.modules.lead.entity.LeadStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateLeadStatusRequest {
    @NotNull(message = "Status is required")
    private LeadStatus status;

    private String assignedAgentId;
    private String assignedAgentName;
    private String note;
    private String nextFollowUpDate;
}
