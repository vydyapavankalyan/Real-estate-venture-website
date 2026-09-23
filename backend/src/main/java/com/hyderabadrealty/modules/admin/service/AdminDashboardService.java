package com.hyderabadrealty.modules.admin.service;

import com.hyderabadrealty.modules.admin.dto.DashboardStatsDto;
import com.hyderabadrealty.modules.lead.entity.Lead;
import com.hyderabadrealty.modules.lead.entity.LeadStatus;
import com.hyderabadrealty.modules.lead.repository.LeadRepository;
import com.hyderabadrealty.modules.lead.service.LeadService;
import com.hyderabadrealty.modules.project.entity.ProjectStatus;
import com.hyderabadrealty.modules.project.repository.ProjectRepository;
import com.hyderabadrealty.modules.sitevisit.entity.VisitStatus;
import com.hyderabadrealty.modules.sitevisit.repository.SiteVisitRepository;
import com.hyderabadrealty.modules.sitevisit.service.SiteVisitService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

    private final ProjectRepository projectRepository;
    private final LeadRepository leadRepository;
    private final SiteVisitRepository siteVisitRepository;
    private final LeadService leadService;
    private final SiteVisitService siteVisitService;

    public DashboardStatsDto getDashboardStats() {
        long totalProjects = projectRepository.count();
        long activeProjects = projectRepository.countByPublishedTrue();
        long readyToMove = projectRepository.countByStatus(ProjectStatus.READY_TO_MOVE);
        long underConstruction = projectRepository.countByStatus(ProjectStatus.UNDER_CONSTRUCTION);

        long totalLeads = leadRepository.count();
        long newEnquiries = leadRepository.countByStatus(LeadStatus.NEW);
        long siteVisitsScheduled = siteVisitRepository.countByStatus(VisitStatus.APPROVED) + siteVisitRepository.countByStatus(VisitStatus.PENDING);
        long siteVisitsCompleted = siteVisitRepository.countByStatus(VisitStatus.COMPLETED);
        long convertedLeads = leadRepository.countByStatus(LeadStatus.CONVERTED);
        long pendingFollowUps = leadRepository.countByStatus(LeadStatus.CONTACTED) + leadRepository.countByStatus(LeadStatus.QUALIFIED);

        Map<String, Long> leadsByStatus = new HashMap<>();
        for (LeadStatus status : LeadStatus.values()) {
            leadsByStatus.put(status.name(), leadRepository.countByStatus(status));
        }

        Map<String, Long> leadsByCorridor = leadRepository.findAll().stream()
                .filter(l -> l.getPreferredLocation() != null)
                .collect(Collectors.groupingBy(Lead::getPreferredLocation, Collectors.counting()));

        var recentLeads = leadRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(0, 5))
                .getContent().stream()
                .map(leadService::mapToDto)
                .collect(Collectors.toList());

        var upcomingVisits = siteVisitRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(0, 5))
                .getContent().stream()
                .map(siteVisitService::mapToDto)
                .collect(Collectors.toList());

        return DashboardStatsDto.builder()
                .totalProjects(totalProjects)
                .activeProjects(activeProjects)
                .readyToMoveProjects(readyToMove)
                .underConstructionProjects(underConstruction)
                .totalLeads(totalLeads)
                .newEnquiries(newEnquiries)
                .siteVisitsScheduled(siteVisitsScheduled)
                .siteVisitsCompleted(siteVisitsCompleted)
                .convertedLeads(convertedLeads)
                .pendingFollowUps(pendingFollowUps)
                .leadsByStatus(leadsByStatus)
                .leadsByCorridor(leadsByCorridor)
                .recentLeads(recentLeads)
                .upcomingSiteVisits(upcomingVisits)
                .build();
    }
}
