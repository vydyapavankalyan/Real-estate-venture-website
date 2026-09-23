package com.hyderabadrealty.modules.user.repository;

import com.hyderabadrealty.modules.user.entity.Role;
import com.hyderabadrealty.modules.user.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    List<User> findByRolesContaining(Role role);
}
