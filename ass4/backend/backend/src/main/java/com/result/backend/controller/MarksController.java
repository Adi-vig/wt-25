package com.result.backend.controller;

import com.result.backend.model.Marks;
import com.result.backend.service.MarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/marks")
public class MarksController {

    @Autowired
    private MarksService marksService;

    @GetMapping
    public List<Marks> getAllMarks() {
        return marksService.getAllMarks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Marks> getMarksById(@PathVariable Long id) {
        Optional<Marks> marks = marksService.getMarksById(id);
        return marks.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Marks addMarks(@RequestBody Marks marks) {
        return marksService.addMarks(marks);
    }

    @PutMapping("/{rollNo}")
    public ResponseEntity<Marks> updateMarks(@PathVariable String rollNo, @RequestBody Marks marks) {
        marks.setRollNo(rollNo);;
        return ResponseEntity.ok(marksService.updateMarks(marks));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMarks(@PathVariable Long id) {
        marksService.deleteMarks(id);
        return ResponseEntity.noContent().build();
    }
}
