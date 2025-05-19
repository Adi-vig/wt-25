package com.result.backend.service;

import org.springframework.stereotype.Service;

@Service
public class ResultService {

    public double calculateFinalMarks(double mse, double ese) {
        return (mse * 0.30) + (ese * 0.70);
    }
}
