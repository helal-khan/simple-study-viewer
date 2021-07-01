package com.studyviewer.repository;

import com.studyviewer.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByOrderByCreatedAtDesc();

    @Query(nativeQuery =true, value = "SELECT * FROM patient p where p.id not in (select patient_id from study) order by created_at desc")
    List<Patient> findByIdNotIn();

    @Query(nativeQuery =true, value = "SELECT person_code FROM patient order by created_at desc limit 1")
    String findLast();

    @Query(nativeQuery =true, value = "SELECT id FROM patient order by created_at desc limit 1")
    String findLastId();
}
