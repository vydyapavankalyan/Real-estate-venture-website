package com.hyderabadrealty.modules.lead.repository;

import com.hyderabadrealty.modules.lead.entity.Lead;
import com.hyderabadrealty.modules.lead.entity.LeadStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeadRepository extends MongoRepository<Lead, String> {
    Page<Lead> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Lead> findByStatusOrderByCreatedAtDesc(LeadStatus status, Pageable pageable);
    List<Lead> findByAssignedAgentIdOrderByCreatedAtDesc(String agentId);
    long countByStatus(LeadStatus status);
}
