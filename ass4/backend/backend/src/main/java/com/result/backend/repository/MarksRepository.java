package com.result.backend.repository;

import com.result.backend.model.Marks;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MarksRepository extends JpaRepository<Marks, Long> {
    Optional<Marks> findByRollNo(String rollNo);

}
