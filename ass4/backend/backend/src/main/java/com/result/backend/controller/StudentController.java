package com.result.backend.controller;

import com.result.backend.model.Student;
import com.result.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentService.getStudentById(id);
        return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        System.out.println("Received Student: " + student.getName() + ", " + student.getRollNo()); // Log the data
        Student savedStudent = studentService.addStudent(student);
        return ResponseEntity.ok(savedStudent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        // Find the student by id
        Optional<Student> existingStudent = studentService.getStudentById(id);  
        
        if (!existingStudent.isPresent()) {
            return ResponseEntity.notFound().build();  // Student not found
        }

        // Update the student details
        Student studentToUpdate = existingStudent.get();
        studentToUpdate.setName(student.getName());
        studentToUpdate.setRollNo(student.getRollNo());

        // Save the updated student
        studentService.updateStudent(studentToUpdate);
        
        return ResponseEntity.ok(studentToUpdate);  // Return the updated student
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
