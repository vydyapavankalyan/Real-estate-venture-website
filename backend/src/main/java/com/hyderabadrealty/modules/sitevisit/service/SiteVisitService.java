package com.hyderabadrealty.modules.sitevisit.service;

import com.hyderabadrealty.common.PageResponse;
import com.hyderabadrealty.common.ResourceNotFoundException;
import com.hyderabadrealty.modules.lead.entity.Lead;
import com.hyderabadrealty.modules.lead.entity.LeadNote;
import com.hyderabadrealty.modules.lead.entity.LeadStatus;
import com.hyderabadrealty.modules.lead.repository.LeadRepository;
import com.hyderabadrealty.modules.project.entity.Project;
import com.hyderabadrealty.modules.project.repository.ProjectRepository;
import com.hyderabadrealty.modules.sitevisit.dto.BookSiteVisitRequest;
import com.hyderabadrealty.modules.sitevisit.dto.SiteVisitDto;
import com.hyderabadrealty.modules.sitevisit.dto.UpdateVisitStatusRequest;
import com.hyderabadrealty.modules.sitevisit.entity.SiteVisit;
import com.hyderabadrealty.modules.sitevisit.entity.VisitStatus;
import com.hyderabadrealty.modules.sitevisit.repository.SiteVisitRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.Instant;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class SiteVisitService {

    private final SiteVisitRepository siteVisitRepository;
    private final ProjectRepository projectRepository;
    private final LeadRepository leadRepository;

    private String generateVisitCode() {
        int randomNum = 1000 + new Random().nextInt(9000);
        return "VISIT-" + System.currentTimeMillis() % 100000 + "-" + randomNum;
    }

    public SiteVisitDto bookSiteVisit(BookSiteVisitRequest request) {
        String projectName = request.getProjectName();
        if (!StringUtils.hasText(projectName) && StringUtils.hasText(request.getProjectId())) {
            projectName = projectRepository.findById(request.getProjectId())
                    .map(Project::getProjectName)
                    .orElse("Hyderabad Luxury Project");
        }

        SiteVisit visit = SiteVisit.builder()
                .visitCode(generateVisitCode())
                .name(request.getName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .projectId(request.getProjectId())
                .projectName(projectName)
                .preferredDate(request.getPreferredDate())
                .preferredTimeSlot(request.getPreferredTimeSlot())
                .numberOfVisitors(request.getNumberOfVisitors())
                .transportationRequired(request.isTransportationRequired())
                .pickupAddress(request.getPickupAddress())
                .specialRequests(request.getSpecialRequests())
                .status(VisitStatus.PENDING)
                .build();

        SiteVisit saved = siteVisitRepository.save(visit);

        // Also ensure a corresponding Lead is captured/updated in CRM
        Lead lead = Lead.builder()
                .leadCode("HYD-SV-" + System.currentTimeMillis() % 100000)
                .name(request.getName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .projectId(request.getProjectId())
                .projectName(projectName)
                .source("SITE_VISIT_BOOKING")
                .status(LeadStatus.SITE_VISIT_SCHEDULED)
                .message("Site visit requested for " + request.getPreferredDate() + " at " + request.getPreferredTimeSlot())
                .build();
        lead.getNotes().add(LeadNote.builder()
                .note("Site visit booked. Code: " + saved.getVisitCode() + ", Visitors: " + request.getNumberOfVisitors() + ", Cab requested: " + request.isTransportationRequired())
                .addedBy("System")
                .addedAt(Instant.now())
                .build());
        leadRepository.save(lead);

        log.info("Site visit scheduled for project {} on {} (Code: {})", projectName, request.getPreferredDate(), saved.getVisitCode());
        return mapToDto(saved);
    }

    public PageResponse<SiteVisitDto> getVisits(VisitStatus status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<SiteVisit> visitPage = (status != null)
                ? siteVisitRepository.findByStatusOrderByCreatedAtDesc(status, pageable)
                : siteVisitRepository.findAllByOrderByCreatedAtDesc(pageable);

        return PageResponse.from(visitPage.map(this::mapToDto));
    }

    public SiteVisitDto updateStatus(String id, UpdateVisitStatusRequest request) {
        SiteVisit visit = siteVisitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SiteVisit", "id", id));

        visit.setStatus(request.getStatus());

        if (StringUtils.hasText(request.getAssignedAgentId())) {
            visit.setAssignedAgentId(request.getAssignedAgentId());
            visit.setAssignedAgentName(request.getAssignedAgentName());
        }

        if (StringUtils.hasText(request.getAdminNotes())) {
            visit.setAdminNotes(request.getAdminNotes());
        }

        if (StringUtils.hasText(request.getRescheduledDate())) {
            visit.setPreferredDate(request.getRescheduledDate());
            if (StringUtils.hasText(request.getRescheduledTimeSlot())) {
                visit.setPreferredTimeSlot(request.getRescheduledTimeSlot());
            }
        }

        return mapToDto(siteVisitRepository.save(visit));
    }

    public SiteVisitDto mapToDto(SiteVisit v) {
        return SiteVisitDto.builder()
                .id(v.getId())
                .visitCode(v.getVisitCode())
                .name(v.getName())
                .phone(v.getPhone())
                .email(v.getEmail())
                .projectId(v.getProjectId())
                .projectName(v.getProjectName())
                .preferredDate(v.getPreferredDate())
                .preferredTimeSlot(v.getPreferredTimeSlot())
                .numberOfVisitors(v.getNumberOfVisitors())
                .transportationRequired(v.isTransportationRequired())
                .pickupAddress(v.getPickupAddress())
                .specialRequests(v.getSpecialRequests())
                .status(v.getStatus())
                .assignedAgentId(v.getAssignedAgentId())
                .assignedAgentName(v.getAssignedAgentName())
                .adminNotes(v.getAdminNotes())
                .createdAt(v.getCreatedAt())
                .updatedAt(v.getUpdatedAt())
                .build();
    }
}
