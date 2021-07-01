
import { React, useState, useEffect } from 'react'
import '../../App.css';
import 'antd/dist/antd.css';
import Studies from './Studies';
import AddPatient from './AddPatient';
import StudyService from '../../Services/StudyService';
import PatientService from '../../Services/PatientService';
import 'antd/dist/antd.css';
import { Button, Modal, Spin, message, Form } from 'antd';
import { EditOutlined, UserAddOutlined, FileAddOutlined, EyeOutlined } from '@ant-design/icons';
import AddStudy from './AddStudy';


const Study = () => {
    const [studies, setStudies] = useState([])
    const [study, setStudy] = useState({})
    const [patients, setPatients] = useState([])

    const [showAddPatient, setShowAddPatient] = useState(false);
    const [showAddStudy, setShowAddStudy] = useState(false);
    const [showUpdateStudy, setShowUpdateStudy] = useState(false);

    const [loadStudy, setLoadStudy] = useState(true);
    const [loadAddPatient, setLoadAddPatient] = useState(false);
    const [loadAddStudy, setLoadAddStudy] = useState(false);
    const [loadUpdateStudy, setLoadUpdateStudy] = useState(false);

    useEffect(() => {
        StudyService.getStudies().then((res) => {
            setLoadStudy(false);
            console.log(res.data)
            setStudies(res.data);
        }).catch(err => {
            console.log(err);
            setLoadStudy(false);
            message.error('Somthing went wrong');
        });

        PatientService.getPatientsNotInStudy().then((res) => {
            console.log(res.data)
            setPatients(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const addPatientSubmit = (obj, addPatientFormRef) => {
        addPatientFormRef.current.resetFields();
        setLoadAddPatient(true);
        obj.patient.dob = obj.patient.dob.format('YYYY-MM-DD');

        PatientService.createPatient(obj.patient).then((res) => {
            setPatients([res.data, ...patients]);
            setLoadAddPatient(false);
            setShowAddPatient(false)
            message.info('Patient added succesfully');

        }).catch(err => {
            console.log(err);
            setLoadAddPatient(false);
            message.error('Somthing went wrong');
        });
    };

    const addStudySubmit = (newStudy, addStudyFormRef) => {
        addStudyFormRef.current.resetFields();
        setLoadAddStudy(true);
        newStudy.patient = patients.filter(p => p.id === newStudy.patient)[0];

        StudyService.createStudy(newStudy).then((res) => {
            setPatients(patients.filter(p => p.id !== newStudy.patient.id));
            res.data.patient.dob = res.data.patient.dob.substring(0, 10);
            setStudies([res.data, ...studies]);
            setLoadAddStudy(false);
            setShowAddStudy(false);
            message.info('Study added succesfully');

        }).catch(err => {
            console.log(err);
            setLoadAddStudy(false);
            message.error('Somthing went wrong');
        });
    };

    const updateStudy = (obj) => {
        console.log(obj)
        setStudy(obj);
        setShowUpdateStudy(true);
    };

    const updateStudySubmit = (updateStudy, updateStudyFormRef) => {
        console.log(updateStudy)
        let isPatientRemove = false;
        setLoadUpdateStudy(true);
        if (study.patient.id === updateStudy.patient) {
            isPatientRemove = false;
            updateStudy.patient = study.patient;
        } else {
            isPatientRemove = true;
            updateStudy.patient = patients.filter(p => p.id === updateStudy.patient)[0];
        }
        StudyService.updateStudy(updateStudy, updateStudy.id).then((res) => {
            console.log(res)
            if (isPatientRemove){
                let patient = patients.filter(p => p.id !== updateStudy.patient.id);
                patient.push(study.patient);
                setPatients(patient);
            }
            let objIndex = studies.findIndex((s => s.id === res.data.id));
            studies[objIndex].name = res.data.name;
            studies[objIndex].description = res.data.description;
            studies[objIndex].patient = res.data.patient;
            studies[objIndex].patient.dob = res.data.patient.dob.substring(0, 10); //app.date(res.data.patient.dob).date;
            setStudies(studies);
            setLoadUpdateStudy(false);
            setShowUpdateStudy(false);
            message.info('Study updated succesfully');

        }).catch(err => {
            console.log(err);
            setLoadUpdateStudy(false);
            setShowUpdateStudy(false);
            message.error('Somthing went wrong');
        });
    };

    return (
        <div className="site-layout-content">
            <center>
                <Spin spinning={loadStudy} size="large" />
            </center>
            <h1 style={{ float: 'left' }}>List Of Study</h1><br /><br />
            <div>
                <Button type="primary" style={{ background: "green", borderColor: "green" }} onClick={() => setShowAddPatient(true)}><UserAddOutlined /> Add Patient</Button>&nbsp;
                <Button type="primary" style={{ background: "green", borderColor: "green" }} onClick={() => setShowAddStudy(true)}><FileAddOutlined /> Add Study</Button>
            </div>
            <Studies studies={studies} updateStudy={updateStudy} />

            <Modal
                title="Add new patient"
                centered
                visible={showAddPatient}
                onOk={() => setShowAddPatient(false)}
                onCancel={() => setShowAddPatient(false)}
            >
                <AddPatient addPatientSubmit={addPatientSubmit} loading={loadAddPatient} />
            </Modal>

            <Modal
                title="Add new study"
                centered
                visible={showAddStudy}
                onOk={() => setShowAddStudy(false)}
                onCancel={() => setShowAddStudy(false)}
            >
                <AddStudy patients={patients} studySubmit={addStudySubmit} loading={loadAddStudy} />
            </Modal>

            <Modal
                title="Update study"
                centered
                visible={showUpdateStudy}
                onOk={() => setShowUpdateStudy(false)}
                onCancel={() => setShowUpdateStudy(false)}
            >
                <AddStudy patients={patients} study={study} studySubmit={updateStudySubmit} loading={loadUpdateStudy} />
            </Modal>
        </div>
    );
}

export default Study;
