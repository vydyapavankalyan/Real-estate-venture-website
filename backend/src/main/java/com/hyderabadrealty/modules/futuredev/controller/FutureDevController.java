package com.hyderabadrealty.modules.futuredev.controller;

import com.hyderabadrealty.common.ApiResponse;
import com.hyderabadrealty.modules.futuredev.dto.FutureDevDto;
import com.hyderabadrealty.modules.futuredev.entity.DevStatus;
import com.hyderabadrealty.modules.futuredev.service.FutureDevService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/future-development")
@RequiredArgsConstructor
@Tag(name = "Hyderabad Future Development", description = "Endpoints for Hyderabad infrastructure, metro expansion, RRR, and growth corridors")
public class FutureDevController {

    private final FutureDevService futureDevService;

    @GetMapping
    @Operation(summary = "Get all active infrastructure developments")
    public ResponseEntity<ApiResponse<List<FutureDevDto>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(futureDevService.getAllActive()));
    }

    @GetMapping("/category/{category}")
    @Operation(summary = "Filter developments by category (METRO, ROADWAYS, IT_SEZ, etc.)")
    public ResponseEntity<ApiResponse<List<FutureDevDto>>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(ApiResponse.success(futureDevService.getByCategory(category)));
    }

    @GetMapping("/zone/{zone}")
    @Operation(summary = "Filter developments by zone (WEST, NORTH, EAST, SOUTH, etc.)")
    public ResponseEntity<ApiResponse<List<FutureDevDto>>> getByZone(@PathVariable String zone) {
        return ResponseEntity.ok(ApiResponse.success(futureDevService.getByZone(zone)));
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Filter developments by status")
    public ResponseEntity<ApiResponse<List<FutureDevDto>>> getByStatus(@PathVariable DevStatus status) {
        return ResponseEntity.ok(ApiResponse.success(futureDevService.getByStatus(status)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get development details by ID")
    public ResponseEntity<ApiResponse<FutureDevDto>> getById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(futureDevService.getById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'CONTENT_MANAGER')")
    @Operation(summary = "Create an infrastructure development record (Admin)")
    public ResponseEntity<ApiResponse<FutureDevDto>> create(@Valid @RequestBody FutureDevDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Future development record created", futureDevService.create(dto)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CONTENT_MANAGER')")
    @Operation(summary = "Update an infrastructure development record (Admin)")
    public ResponseEntity<ApiResponse<FutureDevDto>> update(@PathVariable String id, @Valid @RequestBody FutureDevDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Future development record updated", futureDevService.update(id, dto)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete development record (Admin)")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        futureDevService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Record deleted", null));
    }
}
