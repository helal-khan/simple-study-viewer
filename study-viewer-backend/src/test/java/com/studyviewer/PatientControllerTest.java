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
import com.studyviewer.model.Patient;
import com.studyviewer.repository.PatientRepository;
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
public class PatientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper mapper = new ObjectMapper();

    @MockBean
    PatientController patientController;

    @MockBean
    PatientRepository patientRepository;

    private String URI="/api/v1/patient";

    @Test
    public void testGetAllPatients() throws Exception {
        List<Patient> patients = new ArrayList<>();
        Patient mockPatient = this.getMockPatient();
        patients.add(mockPatient);

        Mockito.when(patientController.getAllPatients()).thenReturn(patients);

        mockMvc.perform(get(URI)).andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(1)))
                .andExpect(jsonPath("$[0].firstName", Matchers.equalTo(mockPatient.getFirstName())));
    }

    @Test
    public void testGetPatientById() throws Exception {
        Mockito.when(patientController.getPatientById(ArgumentMatchers.any())).thenReturn(null);
        mockMvc.perform(get(URI+"/15")).andExpect(status().isOk());
    }

    @Test
    public void testCreatePatient() throws Exception {
        Patient mockPatient = this.getMockPatient();

        Mockito.when(patientController.createPatient(ArgumentMatchers.any())).thenReturn(mockPatient);
        String json = mapper.writeValueAsString(mockPatient);

        mockMvc.perform(post(URI).contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
                .content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", Matchers.equalTo(mockPatient.getId())))
                .andExpect(jsonPath("$.firstName", Matchers.equalTo(mockPatient.getFirstName())));
    }

    @Test
    public void testUpdatePatient() throws Exception {
        Patient mockPatient = new Patient();
        mockPatient.setId(50L);
        mockPatient.setPersonCode("p1016");
        mockPatient.setFirstName("Abdur");
        mockPatient.setLastName("Rahman");
        mockPatient.setDob(new SimpleDateFormat("yyyy-MM-dd").parse("1968-01-01"));
        mockPatient.setFirstName(mockPatient.getFirstName()+" updated");

        Mockito.when(patientController.updatePatient(ArgumentMatchers.any(), anyLong())).thenReturn(mockPatient);
        String json = mapper.writeValueAsString(mockPatient);

        mockMvc.perform(put(URI+"/50").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
                .content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id", Matchers.equalTo(50)))
                .andExpect(jsonPath("$.firstName", Matchers.equalTo(mockPatient.getFirstName())));
    }

    @Test
    public void testDeletePatient() throws Exception {
        Mockito.when(patientController.deletePatient(anyLong())).thenReturn(null);
        MvcResult requestResult = mockMvc.perform(delete(URI+"/52").param("patientId", "52"))
                .andExpect(status().isOk())
                .andExpect(status().isOk()).andReturn();
    }

    private Patient getMockPatient() throws ParseException {
        Patient mockPatient = new Patient();
        mockPatient.setId(patientController.generatedPatientId());
        mockPatient.setPersonCode(patientController.generatedPatientCode());
        mockPatient.setFirstName("First"+mockPatient.getPersonCode());
        mockPatient.setLastName("Last"+mockPatient.getPersonCode());
        mockPatient.setDob(new SimpleDateFormat("yyyy-MM-dd").parse("1992-01-01"));
        return mockPatient;
    }
}