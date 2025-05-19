package com.grocery.backend.repository;

import com.grocery.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;



public interface OrderRepository extends JpaRepository<Order, Long> {
    // Custom query methods can be defined here if needed
    List<Order> findByUserId(Long userId);

}
