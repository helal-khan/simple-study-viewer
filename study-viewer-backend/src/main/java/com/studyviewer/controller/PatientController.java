package com.studyviewer.controller;

import com.studyviewer.exception.ResourceNotFoundException;
import com.studyviewer.model.Patient;
import com.studyviewer.repository.PatientRepository;
import com.studyviewer.repository.StudyRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/patient")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class PatientController {

    private PatientRepository patientRepository;

    @GetMapping
    public List<Patient> getAllPatients(){
        return patientRepository.findByOrderByCreatedAtDesc();
    }

    @GetMapping("/id-not-in-study")
    public List<Patient> getAllPatientsIdNotInStudy(){
        return patientRepository.findByIdNotIn();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable("id") Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id :" + patientId));
        return ResponseEntity.ok().body(patient);
    }

    @PostMapping
    public Patient createPatient(@Valid @RequestBody Patient patient) {
        patient.setPersonCode(this.generatedPatientCode());
        return patientRepository.save(patient);
    }

    @PutMapping("/{id}")
    public Patient updatePatient(@Valid @RequestBody Patient patient, @PathVariable("id") Long patientId) {
        Patient existingPatient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id :" + patientId));
        existingPatient.setFirstName(patient.getFirstName());
        existingPatient.setLastName(patient.getLastName());
        existingPatient.setDob(patient.getDob());
        return this.patientRepository.save(existingPatient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Patient> deletePatient(@PathVariable("id") Long patientId){
        Patient existingPatient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id :" + patientId));
        patientRepository.delete(existingPatient);
        return ResponseEntity.ok().build();
    }

    public String generatedPatientCode(){
        String id = patientRepository.findLast();
        return "p"+((Integer.parseInt(id.substring(1, id.length())))+1);
    }

    public Long generatedPatientId(){
        return Long.parseLong(patientRepository.findLastId());
    }

}
