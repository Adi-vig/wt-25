package com.book.backend.repository;

import com.book.backend.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    // Custom query methods can be added if needed
}
