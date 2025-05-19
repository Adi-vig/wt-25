package com.book.backend.service;

import com.book.backend.model.Orders;
import com.book.backend.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository orderRepository;

    public Orders saveOrder(Orders order) {
        return orderRepository.save(order);
    }
}
