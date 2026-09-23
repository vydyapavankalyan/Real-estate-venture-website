package com.hyderabadrealty.modules.media.controller;

import com.hyderabadrealty.common.ApiResponse;
import com.hyderabadrealty.modules.media.service.StorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/media")
@RequiredArgsConstructor
@Tag(name = "Media & Photo Uploads", description = "Endpoints for uploading property photos, floor plans, and brochures")
@PreAuthorize("hasAnyRole('ADMIN', 'CONTENT_MANAGER')")
public class MediaController {

    private final StorageService storageService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload single image or document")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadFile(@RequestParam("file") MultipartFile file) {
        String url = storageService.storeFile(file);
        return ResponseEntity.ok(ApiResponse.success("File uploaded successfully", Map.of("url", url)));
    }

    @PostMapping(value = "/upload-multiple", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload multiple project gallery images at once")
    public ResponseEntity<ApiResponse<List<String>>> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        List<String> urls = storageService.storeMultipleFiles(files);
        return ResponseEntity.ok(ApiResponse.success("Files uploaded successfully", urls));
    }
}
