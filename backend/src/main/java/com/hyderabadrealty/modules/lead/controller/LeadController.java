package com.hyderabadrealty.modules.lead.controller;

import com.hyderabadrealty.common.ApiResponse;
import com.hyderabadrealty.common.PageResponse;
import com.hyderabadrealty.modules.lead.dto.AddNoteRequest;
import com.hyderabadrealty.modules.lead.dto.LeadDto;
import com.hyderabadrealty.modules.lead.dto.UpdateLeadStatusRequest;
import com.hyderabadrealty.modules.lead.entity.LeadStatus;
import com.hyderabadrealty.modules.lead.service.LeadService;
import com.hyderabadrealty.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
@Tag(name = "Leads Management", description = "Admin & sales agent endpoints for managing prospective buyers")
@PreAuthorize("hasAnyRole('ADMIN', 'SALES_MANAGER', 'SALES_AGENT')")
public class LeadController {

    private final LeadService leadService;

    @GetMapping
    @Operation(summary = "Get paginated leads with optional status filter")
    public ResponseEntity<ApiResponse<PageResponse<LeadDto>>> getLeads(
            @RequestParam(required = false) LeadStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ResponseEntity.ok(ApiResponse.success(leadService.getLeads(status, page, size)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get lead details by ID")
    public ResponseEntity<ApiResponse<LeadDto>> getLeadById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(leadService.getLeadById(id)));
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Update lead pipeline status and assign agent")
    public ResponseEntity<ApiResponse<LeadDto>> updateLeadStatus(
            @PathVariable String id,
            @Valid @RequestBody UpdateLeadStatusRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser
    ) {
        String updatedBy = (currentUser != null) ? currentUser.getFullName() : "Admin";
        return ResponseEntity.ok(ApiResponse.success("Lead status updated", leadService.updateLeadStatus(id, request, updatedBy)));
    }

    @PostMapping("/{id}/notes")
    @Operation(summary = "Append a follow-up note to lead")
    public ResponseEntity<ApiResponse<LeadDto>> addNote(
            @PathVariable String id,
            @Valid @RequestBody AddNoteRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser
    ) {
        String addedBy = (currentUser != null) ? currentUser.getFullName() : "Agent";
        return ResponseEntity.ok(ApiResponse.success("Note added", leadService.addNoteToLead(id, request, addedBy)));
    }
}
