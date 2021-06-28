import axios from 'axios';

const STUDY_API_BASE_URL = "http://localhost:8080/api/v1/study";

class StudyService {

    getEmployees(){
        return axios.get(STUDY_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(STUDY_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(STUDY_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(STUDY_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(STUDY_API_BASE_URL + '/' + employeeId);
    }
}

export default new StudyService()