package com.studyviewer.controller;

import com.studyviewer.exception.ResourceNotFoundException;
import com.studyviewer.model.Study;
import com.studyviewer.repository.StudyRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/study")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class StudyController {

    private StudyRepository studyRepository;

    @GetMapping
    public List<Study> getAllStudies(){
        return studyRepository.findByOrderByCreatedAtDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Study> getStudyById(@PathVariable("id") Long studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new ResourceNotFoundException("Study not found with id :" + studyId));
        return ResponseEntity.ok().body(study);
    }

    @PostMapping
    public Study createStudy(@Valid @RequestBody Study study) {
        return studyRepository.save(study);
    }

    @PutMapping("/{id}")
    public Study updateStudy(@Valid @RequestBody Study study, @PathVariable("id") Long studyId) {
        Study existingStudy= studyRepository.findById(studyId)
                .orElseThrow(() -> new ResourceNotFoundException("Study not found with id :" + studyId));
        existingStudy.setName(study.getName());
        existingStudy.setDescription(study.getDescription());
        existingStudy.setPatient(study.getPatient());
        return this.studyRepository.save(existingStudy);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Study> deleteStudy(@PathVariable("id") Long studyId){
        Study existingStudy = studyRepository.findById(studyId)
                .orElseThrow(() -> new ResourceNotFoundException("Study not found with id :" + studyId));
        studyRepository.delete(existingStudy);
        return ResponseEntity.ok().build();
    }
}
