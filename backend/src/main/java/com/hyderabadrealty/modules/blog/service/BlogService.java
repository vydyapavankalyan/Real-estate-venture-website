package com.hyderabadrealty.modules.blog.service;

import com.hyderabadrealty.common.ResourceNotFoundException;
import com.hyderabadrealty.modules.blog.entity.BlogPost;
import com.hyderabadrealty.modules.blog.repository.BlogPostRepository;
import com.hyderabadrealty.modules.location.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogPostRepository blogPostRepository;

    public List<BlogPost> getAllPublished() {
        return blogPostRepository.findByPublishedTrueOrderByCreatedAtDesc();
    }

    public List<BlogPost> getByCategory(String category) {
        return blogPostRepository.findByCategoryAndPublishedTrue(category);
    }

    public BlogPost getBySlug(String slug) {
        return blogPostRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("BlogPost", "slug", slug));
    }

    public BlogPost createPost(BlogPost post) {
        if (post.getSlug() == null || post.getSlug().isBlank()) {
            post.setSlug(LocationService.toSlug(post.getTitle()));
        }
        return blogPostRepository.save(post);
    }

    public BlogPost updatePost(String id, BlogPost post) {
        BlogPost existing = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BlogPost", "id", id));

        existing.setTitle(post.getTitle());
        existing.setCategory(post.getCategory());
        existing.setExcerpt(post.getExcerpt());
        existing.setContent(post.getContent());
        existing.setAuthorName(post.getAuthorName());
        existing.setAuthorTitle(post.getAuthorTitle());
        existing.setReadTimeMinutes(post.getReadTimeMinutes());
        existing.setCoverImageUrl(post.getCoverImageUrl());
        existing.setTags(post.getTags());
        existing.setRelatedProjectSlugs(post.getRelatedProjectSlugs());
        existing.setPublished(post.isPublished());

        return blogPostRepository.save(existing);
    }

    public void deletePost(String id) {
        blogPostRepository.deleteById(id);
    }
}
