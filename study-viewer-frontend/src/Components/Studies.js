import 'antd/dist/antd.css';
import { useState, useEffect } from 'react'
import { Layout, Table, Breadcrumb, Space, Button, Modal,
    Form,
    Input,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch
} from 'antd';
import { EditOutlined, UserAddOutlined, FileAddOutlined } from '@ant-design/icons';






const Studies = ({ studies }) => {
    const [showAddPatient, setShowAddPatient] = useState(false);

    console.log(studies)

    const updateStudy = (id) => {
        console.log(id);
    }

    const { Content } = Layout;

    const columns = [
        {
            title: 'Person code',
            render: (text, record) => (
                <>
                    {record.patient.personCode}
                </>
            ),
            responsive: ["sm"]
        },
        {
            title: "Patient's full name",
            render: (text, record) => (
                <>
                    {record.patient.firstName} {record.patient.lastName}
                </>
            ),
            responsive: ["sm"]
        },
        {
            title: "Patient's date of birth",
            render: (text, record) => (
                <>
                    {record.patient.dob}
                </>
            ),
            responsive: ["sm"]
        },
        {
            title: 'Study name',
            dataIndex: 'name',
            responsive: ["sm"]
        },
        {
            title: 'Study creation',
            dataIndex: 'createdAt',
            responsive: ["sm"]
        },
        /*         {
                    title: 'Chinese Score',
                    dataIndex: 'chinese',
                    sorter: {
                        compare: (a, b) => a.chinese - b.chinese,
                        multiple: 3,
                    },
                },
                {
                    title: 'Math Score',
                    dataIndex: 'math',
                    sorter: {
                        compare: (a, b) => a.math - b.math,
                        multiple: 2,
                    },
                },
                {
                    title: 'English Score',
                    dataIndex: 'english',
                    sorter: {
                        compare: (a, b) => a.english - b.english,
                        multiple: 1,
                    },
                }, */
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => updateStudy(record)}>
                        <EditOutlined /> Update
                </Button>
                </Space>
            ),
        }
    ];


    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    function addPatient() {
        setShowAddPatient(true);
    }


    return (
        <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Study</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">
                <h1 style={{ float: 'left' }}>List Of Study</h1>
                <div className="pull-right" style={{ float: 'right' }}>
                    <Button type="primary" style={{ background: "green", borderColor: "green" }} onClick={addPatient}><UserAddOutlined /> Add Patient</Button>&nbsp;
                    <Button type="primary" style={{ background: "green", borderColor: "green" }}><FileAddOutlined /> Add Study</Button>
                </div>
                <Table columns={columns} dataSource={studies} onChange={onChange} rowKey="id" />

                <Modal
                    title="Add new patient"
                    centered
                    visible={showAddPatient}
                    onOk={() => setShowAddPatient(false)}
                    onCancel={() => setShowAddPatient(false)}
                    width={1000}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{
                            modifier: 'public',
                        }}
                    >
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the title of collection!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="description" label="Description">
                            <Input type="textarea" />
                        </Form.Item>
                        <Form.Item name="modifier" className="collection-create-form_last-form-item">
                            <Radio.Group>
                                <Radio value="public">Public</Radio>
                                <Radio value="private">Private</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </Content>
    )
}

export default Studies
