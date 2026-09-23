package com.hyderabadrealty.modules.location.repository;

import com.hyderabadrealty.modules.location.entity.Location;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends MongoRepository<Location, String> {
    Optional<Location> findBySlug(String slug);
    List<Location> findByActiveTrue();
    List<Location> findByZoneAndActiveTrue(String zone);
    List<Location> findByFeaturedTrueAndActiveTrue();
}
