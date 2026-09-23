package com.hyderabadrealty.modules.sitevisit.repository;

import com.hyderabadrealty.modules.sitevisit.entity.SiteVisit;
import com.hyderabadrealty.modules.sitevisit.entity.VisitStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SiteVisitRepository extends MongoRepository<SiteVisit, String> {
    Page<SiteVisit> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<SiteVisit> findByStatusOrderByCreatedAtDesc(VisitStatus status, Pageable pageable);
    List<SiteVisit> findByPreferredDate(String date);
    long countByStatus(VisitStatus status);
}
