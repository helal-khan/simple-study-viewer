import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
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
    max: '${label} cannot be longer than 50 characters'
};

const AddPatient = ({ addPatientSubmit, loading}) => {
    const formRef = React.createRef();
  
    const onReset = () => {
        formRef.current.resetFields();
      };

    return (
        <Form {...layout} name="addPatient" onFinish={(values)=> addPatientSubmit(values, formRef)} validateMessages={validateMessages} ref={formRef}>
            <Form.Item
                name={['patient', 'firstName']}
                label="First Name"
                rules={[
                    {
                        required: true
                    },
                    {
                        max: 50
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name={['patient', 'lastName']}
                label="Last Name"
                rules={[
                    {
                        required: true,
                    },
                    {
                        max: 50
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name={['patient', 'dob']}
                label="Date of birth"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <DatePicker />
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
                    Submit
                </Button>&nbsp;&nbsp;
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
}

export default AddPatient;
