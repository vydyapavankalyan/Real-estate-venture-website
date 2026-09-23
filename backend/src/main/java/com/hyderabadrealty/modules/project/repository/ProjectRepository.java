package com.hyderabadrealty.modules.project.repository;

import com.hyderabadrealty.modules.project.entity.Project;
import com.hyderabadrealty.modules.project.entity.ProjectStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
    Optional<Project> findBySlug(String slug);
    List<Project> findByFeaturedTrueAndPublishedTrue();
    List<Project> findByPublishedTrue();
    List<Project> findByStatusAndPublishedTrue(ProjectStatus status);
    long countByPublishedTrue();
    long countByStatus(ProjectStatus status);
}
