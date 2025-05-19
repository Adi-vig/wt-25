package com.grocery.backend.controller;

import com.grocery.backend.dto.OrderDTO;
import com.grocery.backend.dto.OrderItemDTO;
import com.grocery.backend.model.*;
import com.grocery.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired private UserRepository userRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private OrderRepository orderRepository;

    @PostMapping
    public String placeOrder(@RequestBody OrderDTO orderDTO) {
        User user = userRepository.findById(orderDTO.getUserId()).orElse(null);
        if (user == null) return "User not found";

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());

        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderItemDTO itemDTO : orderDTO.getItems()) {
            Product product = productRepository.findById(itemDTO.getProductId()).orElse(null);
            if (product == null) continue;

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemDTO.getQuantity());
            orderItem.setOrder(order);
            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        orderRepository.save(order);
        return "Order placed successfully!";
    }
}
