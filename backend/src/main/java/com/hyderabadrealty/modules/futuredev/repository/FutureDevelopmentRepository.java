package com.hyderabadrealty.modules.futuredev.repository;

import com.hyderabadrealty.modules.futuredev.entity.DevStatus;
import com.hyderabadrealty.modules.futuredev.entity.FutureDevelopment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FutureDevelopmentRepository extends MongoRepository<FutureDevelopment, String> {
    List<FutureDevelopment> findByActiveTrueOrderByDisplayOrderAsc();
    List<FutureDevelopment> findByCategoryAndActiveTrue(String category);
    List<FutureDevelopment> findByZoneAndActiveTrue(String zone);
    List<FutureDevelopment> findByStatusAndActiveTrue(DevStatus status);
}
