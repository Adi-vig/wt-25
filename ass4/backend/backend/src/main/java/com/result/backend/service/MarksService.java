package com.result.backend.service;

import com.result.backend.model.Marks;
import com.result.backend.repository.MarksRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarksService {

    @Autowired
    private MarksRepository marksRepository;

    public List<Marks> getAllMarks() {
        return marksRepository.findAll();
    }

    public Optional<Marks> getMarksById(Long id) {
        return marksRepository.findById(id);
    }
   
    public Marks addMarks(Marks marks) {
        return marksRepository.save(marks);
    }

    public Marks updateMarks(Marks marks) {
    // Check if the Marks entry with the provided rollNo exists
        Optional<Marks> existingMarks = marksRepository.findByRollNo(marks.getRollNo()); // or findById if using ID
        if (existingMarks.isPresent()) {
            Marks updatedMarks = existingMarks.get();
            
            // Only update fields that are present in the request
            updatedMarks.setName(marks.getName());
            updatedMarks.setCnEse(marks.getCnEse());
            updatedMarks.setCnMse(marks.getCnMse());
            updatedMarks.setCoaEse(marks.getCoaEse());
            updatedMarks.setCoaMse(marks.getCoaMse());
            updatedMarks.setOsEse(marks.getOsEse());
            updatedMarks.setOsMse(marks.getOsMse());
            updatedMarks.setTocEse(marks.getTocEse());
            updatedMarks.setTocMse(marks.getTocMse());

            // Return the updated entity
            return marksRepository.save(updatedMarks); // This should perform an update now
        } else {
            // If no matching entry found, return null or throw exception
            throw new EntityNotFoundException("Marks not found for roll number: " + marks.getRollNo());
        }
    }


    public void deleteMarks(Long id) {
        marksRepository.deleteById(id);
    }
}
