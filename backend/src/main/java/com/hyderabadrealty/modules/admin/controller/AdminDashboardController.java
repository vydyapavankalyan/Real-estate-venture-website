package com.hyderabadrealty.modules.admin.controller;

import com.hyderabadrealty.common.ApiResponse;
import com.hyderabadrealty.modules.admin.dto.DashboardStatsDto;
import com.hyderabadrealty.modules.admin.service.AdminDashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
@Tag(name = "Admin Analytics", description = "Endpoints for executive KPIs, sales conversions and pipeline analytics")
@PreAuthorize("hasAnyRole('ADMIN', 'SALES_MANAGER')")
public class AdminDashboardController {

    private final AdminDashboardService dashboardService;

    @GetMapping("/stats")
    @Operation(summary = "Get high-level dashboard metrics, counts and pipeline breakdowns")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getStats() {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getDashboardStats()));
    }
}
