package com.grocery.backend.service;

import com.grocery.backend.dto.OrderDTO;
import com.grocery.backend.dto.OrderItemDTO;
import com.grocery.backend.model.Order;
import com.grocery.backend.model.OrderItem;
import com.grocery.backend.model.Product;
import com.grocery.backend.model.User;
import com.grocery.backend.repository.OrderRepository;
import com.grocery.backend.repository.ProductRepository;
import com.grocery.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
public class OrderService {
    @Autowired private UserRepository userRepo;
    @Autowired private ProductRepository productRepo;
    @Autowired private OrderRepository orderRepo;

    public Order placeOrder(OrderDTO dto) {
        User user = userRepo.findById(dto.getUserId()).orElseThrow();
        Order order = new Order(null, user, LocalDateTime.now(), new ArrayList<>());
        for (OrderItemDTO item : dto.getItems()) {
            Product p = productRepo.findById(item.getProductId()).orElseThrow();
            order.getItems().add(new OrderItem(null, item.getQuantity(), p, order));
        }
        return orderRepo.save(order);
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepo.findByUserId(userId);
    }
}

