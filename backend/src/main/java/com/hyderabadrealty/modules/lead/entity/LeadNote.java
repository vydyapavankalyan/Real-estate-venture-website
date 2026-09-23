package com.hyderabadrealty.modules.lead.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeadNote {
    private String note;
    private String addedBy;
    @Builder.Default
    private Instant addedAt = Instant.now();
}
