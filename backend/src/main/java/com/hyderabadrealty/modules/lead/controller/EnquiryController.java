package com.hyderabadrealty.modules.lead.controller;

import com.hyderabadrealty.common.ApiResponse;
import com.hyderabadrealty.modules.lead.dto.CreateEnquiryRequest;
import com.hyderabadrealty.modules.lead.dto.LeadDto;
import com.hyderabadrealty.modules.lead.service.LeadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enquiries")
@RequiredArgsConstructor
@Tag(name = "Enquiries", description = "Public endpoints for homebuyers to request callbacks and property details")
public class EnquiryController {

    private final LeadService leadService;

    @PostMapping
    @Operation(summary = "Submit an enquiry or callback request")
    public ResponseEntity<ApiResponse<LeadDto>> submitEnquiry(@Valid @RequestBody CreateEnquiryRequest request) {
        LeadDto lead = leadService.createEnquiry(request);
        return ResponseEntity.ok(ApiResponse.success("Thank you! Your enquiry has been registered. Reference: " + lead.getLeadCode(), lead));
    }
}
