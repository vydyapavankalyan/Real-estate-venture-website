package com.hyderabadrealty.modules.admin.dto;

import com.hyderabadrealty.modules.lead.dto.LeadDto;
import com.hyderabadrealty.modules.sitevisit.dto.SiteVisitDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDto {
    private long totalProjects;
    private long activeProjects;
    private long readyToMoveProjects;
    private long underConstructionProjects;

    private long totalLeads;
    private long newEnquiries;
    private long siteVisitsScheduled;
    private long siteVisitsCompleted;
    private long convertedLeads;
    private long pendingFollowUps;

    private Map<String, Long> leadsByStatus;
    private Map<String, Long> leadsByCorridor;

    private List<LeadDto> recentLeads;
    private List<SiteVisitDto> upcomingSiteVisits;
}
