package com.hyderabadrealty.modules.sitevisit.controller;

import com.hyderabadrealty.common.ApiResponse;
import com.hyderabadrealty.common.PageResponse;
import com.hyderabadrealty.modules.sitevisit.dto.BookSiteVisitRequest;
import com.hyderabadrealty.modules.sitevisit.dto.SiteVisitDto;
import com.hyderabadrealty.modules.sitevisit.dto.UpdateVisitStatusRequest;
import com.hyderabadrealty.modules.sitevisit.entity.VisitStatus;
import com.hyderabadrealty.modules.sitevisit.service.SiteVisitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/site-visits")
@RequiredArgsConstructor
@Tag(name = "Site Visits", description = "Endpoints for scheduling and managing luxury site visits")
public class SiteVisitController {

    private final SiteVisitService siteVisitService;

    @PostMapping
    @Operation(summary = "Book a new site visit")
    public ResponseEntity<ApiResponse<SiteVisitDto>> bookVisit(@Valid @RequestBody BookSiteVisitRequest request) {
        SiteVisitDto visit = siteVisitService.bookSiteVisit(request);
        return ResponseEntity.ok(ApiResponse.success(
                "Site visit booked successfully. Confirmation reference: " + visit.getVisitCode(), visit));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SALES_MANAGER', 'SALES_AGENT')")
    @Operation(summary = "Get list of site visits (Admin/Staff)")
    public ResponseEntity<ApiResponse<PageResponse<SiteVisitDto>>> getVisits(
            @RequestParam(required = false) VisitStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ResponseEntity.ok(ApiResponse.success(siteVisitService.getVisits(status, page, size)));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'SALES_MANAGER', 'SALES_AGENT')")
    @Operation(summary = "Update site visit status (Approve, Reschedule, Complete)")
    public ResponseEntity<ApiResponse<SiteVisitDto>> updateStatus(
            @PathVariable String id,
            @Valid @RequestBody UpdateVisitStatusRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success("Visit status updated", siteVisitService.updateStatus(id, request)));
    }
}
