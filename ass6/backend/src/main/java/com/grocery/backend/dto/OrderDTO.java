package com.grocery.backend.dto;
import java.util.List;

public class OrderDTO {
    private Long userId;
    private List<OrderItemDTO> items;

    // Getters and setters
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public List<OrderItemDTO> getItems() {
        return items;
    }
    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }
}
