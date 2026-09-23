package com.hyderabadrealty.modules.testimonial.controller;

import com.hyderabadrealty.common.ApiResponse;
import com.hyderabadrealty.modules.testimonial.entity.Testimonial;
import com.hyderabadrealty.modules.testimonial.repository.TestimonialRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
@RequiredArgsConstructor
@Tag(name = "Testimonials", description = "Verified resident & investor reviews")
public class TestimonialController {

    private final TestimonialRepository testimonialRepository;

    @GetMapping
    @Operation(summary = "Get all active testimonials")
    public ResponseEntity<ApiResponse<List<Testimonial>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(testimonialRepository.findByActiveTrue()));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create testimonial (Admin)")
    public ResponseEntity<ApiResponse<Testimonial>> create(@RequestBody Testimonial testimonial) {
        return ResponseEntity.ok(ApiResponse.success("Created", testimonialRepository.save(testimonial)));
    }
}
