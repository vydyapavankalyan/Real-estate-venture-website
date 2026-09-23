package com.hyderabadrealty.modules.testimonial.repository;

import com.hyderabadrealty.modules.testimonial.entity.Testimonial;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestimonialRepository extends MongoRepository<Testimonial, String> {
    List<Testimonial> findByActiveTrue();
}
