package com.result.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rollNo", nullable = false, unique = true)
    private String rollNo;

    @Column(name = "name", nullable = false)
    private String name;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRollNo() {
        return rollNo;  // Use rollNo here instead of rollNumber
    }

    public void setRollNo(String rollNo) {  // Use rollNo here instead of rollNumber
        this.rollNo = rollNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
