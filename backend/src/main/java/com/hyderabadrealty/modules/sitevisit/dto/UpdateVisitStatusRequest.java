package com.hyderabadrealty.modules.sitevisit.dto;

import com.hyderabadrealty.modules.sitevisit.entity.VisitStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateVisitStatusRequest {
    @NotNull(message = "Status is required")
    private VisitStatus status;

    private String assignedAgentId;
    private String assignedAgentName;
    private String adminNotes;
    private String rescheduledDate;
    private String rescheduledTimeSlot;
}
