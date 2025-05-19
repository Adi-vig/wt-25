package com.book.backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double totalPrice;

    // Items as a list of Book objects
    @Transient // Mark it as transient to avoid persistence (we'll use it for serialization only)
    private List<Book> items;

    @Lob  // This will store large data like JSON as a string
    private String payload;  // The serialized payload as a string

    public Orders() {}

    public Orders(double totalPrice, List<Book> items) {
        this.totalPrice = totalPrice;
        this.items = items;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
    public List<Book> getItems() { return items; }
    public void setItems(List<Book> items) { this.items = items; }
    public String getPayload() { return payload; }
    public void setPayload(String payload) { this.payload = payload; }
}
