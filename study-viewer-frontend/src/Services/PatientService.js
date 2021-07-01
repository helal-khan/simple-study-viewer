import axios from 'axios';
import app from '../Util/Utility';

const PATIENT_API_BASE_URL = `${app.apiBaseUrl}/patient`;

class PatientService {

    getPatients(){
        return axios.get(PATIENT_API_BASE_URL);
    }

    getPatientsNotInStudy(){
        return axios.get(`${PATIENT_API_BASE_URL}/id-not-in-study`);
    }

    createPatient(patient){
        return axios.post(PATIENT_API_BASE_URL, patient);
    }

    getPatientById(patientId){
        return axios.get(`${PATIENT_API_BASE_URL}/${patientId}`);
    }

    updatePatient(patient, patientId){
        return axios.put(`${PATIENT_API_BASE_URL}/${patientId}`, patient);
    }

    deletePatient(patientId){
        return axios.delete(`${PATIENT_API_BASE_URL}/${patientId}`);
    }
}

export default new PatientService()