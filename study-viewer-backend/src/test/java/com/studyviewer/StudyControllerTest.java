package com.studyviewer;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.studyviewer.controller.PatientController;
import com.studyviewer.controller.StudyController;
import com.studyviewer.model.Patient;
import com.studyviewer.model.Study;
import com.studyviewer.repository.PatientRepository;
import com.studyviewer.repository.StudyRepository;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest
public class StudyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper mapper = new ObjectMapper();

    @MockBean
    StudyController studyController;

    @MockBean
    StudyRepository studyRepository;

    private String URI="/api/v1/study";

    @Test
    public void testGetAllStudies() throws Exception {
        List<Study> studies = new ArrayList<>();
        Study mockStudy = new Study();
        studies.add(mockStudy);

        Mockito.when(studyController.getAllStudies()).thenReturn(studies);
        mockMvc.perform(get(URI)).andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(1)))
                .andExpect(jsonPath("$[0].name", Matchers.equalTo(mockStudy.getName())));
    }

    @Test
    public void testGetStudyById() throws Exception {
        Mockito.when(studyController.getStudyById(ArgumentMatchers.any())).thenReturn(null);
        mockMvc.perform(get(URI+"/15")).andExpect(status().isOk());
    }
}
