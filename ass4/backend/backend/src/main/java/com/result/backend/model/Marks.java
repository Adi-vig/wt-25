package com.result.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

@Entity
public class Marks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rollNo", nullable = false, unique = true)
    private String rollNo;

    @Column(name = "name", nullable = false)
    private String name;

    // Marks for different subjects
    @Column(name = "osMse")
    private Integer osMse;

    @Column(name = "osEse")
    private Integer osEse;

    @Column(name = "cnMse")
    private Integer cnMse;

    @Column(name = "cnEse")
    private Integer cnEse;

    @Column(name = "coaMse")
    private Integer coaMse;

    @Column(name = "coaEse")
    private Integer coaEse;

    @Column(name = "tocMse")
    private Integer tocMse;

    @Column(name = "tocEse")
    private Integer tocEse;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getOsMse() {
        return osMse;
    }

    public void setOsMse(Integer osMse) {
        this.osMse = osMse;
    }

    public Integer getOsEse() {
        return osEse;
    }

    public void setOsEse(Integer osEse) {
        this.osEse = osEse;
    }

    public Integer getCnMse() {
        return cnMse;
    }

    public void setCnMse(Integer cnMse) {
        this.cnMse = cnMse;
    }

    public Integer getCnEse() {
        return cnEse;
    }

    public void setCnEse(Integer cnEse) {
        this.cnEse = cnEse;
    }

    public Integer getCoaMse() {
        return coaMse;
    }

    public void setCoaMse(Integer coaMse) {
        this.coaMse = coaMse;
    }

    public Integer getCoaEse() {
        return coaEse;
    }

    public void setCoaEse(Integer coaEse) {
        this.coaEse = coaEse;
    }

    public Integer getTocMse() {
        return tocMse;
    }

    public void setTocMse(Integer tocMse) {
        this.tocMse = tocMse;
    }

    public Integer getTocEse() {
        return tocEse;
    }

    public void setTocEse(Integer tocEse) {
        this.tocEse = tocEse;
    }
}
