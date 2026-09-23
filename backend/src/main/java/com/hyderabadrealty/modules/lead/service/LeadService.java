package com.hyderabadrealty.modules.lead.service;

import com.hyderabadrealty.common.PageResponse;
import com.hyderabadrealty.common.ResourceNotFoundException;
import com.hyderabadrealty.modules.lead.dto.AddNoteRequest;
import com.hyderabadrealty.modules.lead.dto.CreateEnquiryRequest;
import com.hyderabadrealty.modules.lead.dto.LeadDto;
import com.hyderabadrealty.modules.lead.dto.UpdateLeadStatusRequest;
import com.hyderabadrealty.modules.lead.entity.Lead;
import com.hyderabadrealty.modules.lead.entity.LeadNote;
import com.hyderabadrealty.modules.lead.entity.LeadStatus;
import com.hyderabadrealty.modules.lead.repository.LeadRepository;
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
public class LeadService {

    private final LeadRepository leadRepository;

    private String generateLeadCode() {
        int randomNum = 1000 + new Random().nextInt(9000);
        return "HYD-" + System.currentTimeMillis() % 100000 + "-" + randomNum;
    }

    public LeadDto createEnquiry(CreateEnquiryRequest request) {
        Lead lead = Lead.builder()
                .leadCode(generateLeadCode())
                .name(request.getName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .preferredLocation(request.getPreferredLocation())
                .propertyType(request.getPropertyType())
                .budget(request.getBudget())
                .projectId(request.getProjectId())
                .projectName(request.getProjectName())
                .message(request.getMessage())
                .source(StringUtils.hasText(request.getSource()) ? request.getSource() : "WEBSITE_ENQUIRY")
                .status(LeadStatus.NEW)
                .build();

        if (StringUtils.hasText(request.getMessage())) {
            lead.getNotes().add(LeadNote.builder()
                    .note("Customer message: " + request.getMessage())
                    .addedBy("System")
                    .addedAt(Instant.now())
                    .build());
        }

        Lead saved = leadRepository.save(lead);
        log.info("New Lead captured: {} with code {}", saved.getName(), saved.getLeadCode());
        return mapToDto(saved);
    }

    public PageResponse<LeadDto> getLeads(LeadStatus status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Lead> leadPage = (status != null)
                ? leadRepository.findByStatusOrderByCreatedAtDesc(status, pageable)
                : leadRepository.findAllByOrderByCreatedAtDesc(pageable);

        return PageResponse.from(leadPage.map(this::mapToDto));
    }

    public LeadDto getLeadById(String id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead", "id", id));
        return mapToDto(lead);
    }

    public LeadDto updateLeadStatus(String id, UpdateLeadStatusRequest request, String updatedBy) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead", "id", id));

        lead.setStatus(request.getStatus());

        if (StringUtils.hasText(request.getAssignedAgentId())) {
            lead.setAssignedAgentId(request.getAssignedAgentId());
            lead.setAssignedAgentName(request.getAssignedAgentName());
        }

        if (StringUtils.hasText(request.getNextFollowUpDate())) {
            lead.setNextFollowUpDate(request.getNextFollowUpDate());
        }

        if (StringUtils.hasText(request.getNote())) {
            lead.getNotes().add(LeadNote.builder()
                    .note(request.getNote())
                    .addedBy(updatedBy != null ? updatedBy : "Sales Agent")
                    .addedAt(Instant.now())
                    .build());
        }

        return mapToDto(leadRepository.save(lead));
    }

    public LeadDto addNoteToLead(String id, AddNoteRequest request, String addedBy) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead", "id", id));

        lead.getNotes().add(LeadNote.builder()
                .note(request.getNote())
                .addedBy(addedBy != null ? addedBy : "Sales Agent")
                .addedAt(Instant.now())
                .build());

        return mapToDto(leadRepository.save(lead));
    }

    public LeadDto mapToDto(Lead l) {
        return LeadDto.builder()
                .id(l.getId())
                .leadCode(l.getLeadCode())
                .name(l.getName())
                .phone(l.getPhone())
                .email(l.getEmail())
                .preferredLocation(l.getPreferredLocation())
                .propertyType(l.getPropertyType())
                .budget(l.getBudget())
                .projectId(l.getProjectId())
                .projectName(l.getProjectName())
                .message(l.getMessage())
                .source(l.getSource())
                .status(l.getStatus())
                .assignedAgentId(l.getAssignedAgentId())
                .assignedAgentName(l.getAssignedAgentName())
                .notes(l.getNotes())
                .nextFollowUpDate(l.getNextFollowUpDate())
                .createdAt(l.getCreatedAt())
                .updatedAt(l.getUpdatedAt())
                .build();
    }
}
