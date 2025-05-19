package com.book.backend.model;

public class BookInfo {

    private String title;
    private double price;

    public BookInfo(String title, double price) {
        this.title = title;
        this.price = price;
    }

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}
