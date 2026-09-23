package com.hyderabadrealty.modules.blog.repository;

import com.hyderabadrealty.modules.blog.entity.BlogPost;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogPostRepository extends MongoRepository<BlogPost, String> {
    List<BlogPost> findByPublishedTrueOrderByCreatedAtDesc();
    List<BlogPost> findByCategoryAndPublishedTrue(String category);
    Optional<BlogPost> findBySlug(String slug);
}
