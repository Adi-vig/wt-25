package com.book.backend.controller;

import com.book.backend.model.Orders;
import com.book.backend.service.OrdersService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @PostMapping
public Orders createOrder(@RequestBody Orders order) {
    try {
        ObjectMapper objectMapper = new ObjectMapper();
        String payloadString = objectMapper.writeValueAsString(order.getItems());
        order.setPayload(payloadString);  // Set the payload as a string
    } catch (Exception e) {
        e.printStackTrace();
    }
    return ordersService.saveOrder(order);
}

}