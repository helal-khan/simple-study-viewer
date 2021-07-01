import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;
const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 18,
    },
};

const validateMessages = {
    required: '${label} is required!',
};

const AddStudy = ({ patients, study, studySubmit, loading }) => {
    let formRef = React.createRef();
    const initialValues = { id: study.id, name: study.name, description: study.description, patient: study.patient.id };

    useEffect(() => formRef.current.resetFields() );

    const onReset = () => {
        formRef.current.resetFields();
    };

    return (
        <Form {...layout} name="addPatient" onFinish={(values) => studySubmit(values, formRef)} validateMessages={validateMessages} ref={formRef}
            initialValues={initialValues}>
            <Form.Item name="id" label="id" hidden={true}>
                <Input type="text" />
            </Form.Item>
            <Form.Item
                name="name"
                label="Study Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="description" rules={[
                {
                    max: 200,
                    message: 'Description cannot be longer than 200 characters'
                },
            ]} label="Description">
                <Input.TextArea initialValue="fdsfsf"  rows={4} />
            </Form.Item>
            <Form.Item
                name="patient"
                label="Patient"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select placeholder="select patient">
                    {study.patient.id != null ? <Option value={study.patient.id} key={study.patient.id} selected>{study.patient.firstName}</Option> : <></>}
                    {patients.map(({ id, firstName }, i) => (
                        <Option value={id} key={id} >{firstName}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 5,
                    },
                }}
            >
                <Button type="primary" htmlType="submit" loading={loading}>
                    {study.patient.id != null ? 'Update':'Submit'}
                </Button>&nbsp;&nbsp;
                <Button htmlType="button" onClick={onReset} hidden={study.patient.id != null}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
}

AddStudy.defaultProps = {
    study: {
        id: null,
        name: '',
        description: '',
        patient: {
            id: null,
            personCode: '',
            firstName: '',
            lastName: '',
            dob: '',
        }
    }
};

export default AddStudy;
