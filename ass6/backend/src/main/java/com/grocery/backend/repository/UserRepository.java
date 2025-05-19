package com.grocery.backend.repository;

import com.grocery.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}