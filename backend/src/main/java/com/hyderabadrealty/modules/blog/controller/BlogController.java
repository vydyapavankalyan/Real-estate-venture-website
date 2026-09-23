package com.hyderabadrealty.modules.blog.controller;

import com.hyderabadrealty.common.ApiResponse;
import com.hyderabadrealty.modules.blog.entity.BlogPost;
import com.hyderabadrealty.modules.blog.service.BlogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
@Tag(name = "Insights & Blog", description = "Real estate articles, infrastructure updates, and market education")
public class BlogController {

    private final BlogService blogService;

    @GetMapping
    @Operation(summary = "Get all published blog articles")
    public ResponseEntity<ApiResponse<List<BlogPost>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(blogService.getAllPublished()));
    }

    @GetMapping("/category/{category}")
    @Operation(summary = "Get blog articles by category")
    public ResponseEntity<ApiResponse<List<BlogPost>>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(ApiResponse.success(blogService.getByCategory(category)));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get blog article by slug")
    public ResponseEntity<ApiResponse<BlogPost>> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(blogService.getBySlug(slug)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'CONTENT_MANAGER')")
    @Operation(summary = "Create blog post (Admin/Content Manager)")
    public ResponseEntity<ApiResponse<BlogPost>> create(@RequestBody BlogPost post) {
        return ResponseEntity.ok(ApiResponse.success("Article created", blogService.createPost(post)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CONTENT_MANAGER')")
    @Operation(summary = "Update blog post (Admin/Content Manager)")
    public ResponseEntity<ApiResponse<BlogPost>> update(@PathVariable String id, @RequestBody BlogPost post) {
        return ResponseEntity.ok(ApiResponse.success("Article updated", blogService.updatePost(id, post)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete blog post (Admin)")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        blogService.deletePost(id);
        return ResponseEntity.ok(ApiResponse.success("Article deleted", null));
    }
}
