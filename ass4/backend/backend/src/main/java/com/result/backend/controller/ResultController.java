package com.result.backend.controller;

import com.result.backend.model.Marks;
import com.result.backend.service.MarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    @Autowired
    private MarksService marksService;

    @GetMapping
    public ResponseEntity<List<Marks>> getAllResults() {
        List<Marks> results = marksService.getAllMarks();
        
        // Assuming the Marks entity contains fields like 'rollNo', 'name', and marks for the various subjects
        return ResponseEntity.ok(results);
    }
}
