import axios from 'axios';
import app from '../Util/Utility';

const STUDY_API_BASE_URL = `${app.apiBaseUrl}/study`;

class StudyService {

    getStudies(){
        return axios.get(STUDY_API_BASE_URL);
    }

    createStudy(study){
        return axios.post(STUDY_API_BASE_URL, study);
    }

    getStudyById(studyId){
        return axios.get(`${STUDY_API_BASE_URL}/${studyId}`);
    }

    updateStudy(study, studyId){
        return axios.put(`${STUDY_API_BASE_URL}/${studyId}`, study);
    }

    deleteStudy(studyId){
        return axios.delete(`${STUDY_API_BASE_URL}/${studyId}`);
    }
}

export default new StudyService()