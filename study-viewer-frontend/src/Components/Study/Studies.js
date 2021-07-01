import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import app from '../../Util/Utility';


const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    }),
};

class Studies extends React.Component {

    state = {
        searchText: '',
        searchedColumn: '',
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
              </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
              </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        const onChange = (pagination, filters, sorter, extra) => {
            console.log('params', pagination, filters, sorter, extra);
        }

        const columns = [
            {
                render: (text, record) => (
                    <Space size="middle">
                        <Button type="link" onClick={() => this.props.updateStudy(record)}>
                            <EyeOutlined />
                        </Button>
                    </Space>
                ),
            },
            {
                title: 'Person code',
                render: (text, record) => (<>{record.patient.personCode}</>),
            },
            {
                title: "Full name",
                sorter: (a, b) => a.patient.firstName.length - b.patient.firstName.length,
                sortDirections: ['descend', 'ascend'],
                render: (text, record) => (<>{record.patient.firstName} {record.patient.lastName}</>),
            },
            {
                title: "Date of birth",
                render: (text, record) => (<>{record.patient.dob}</>),
                responsive: ['md'],
            },
            {
                title: 'Study name',
                dataIndex: 'name',
                ...this.getColumnSearchProps('name'),
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ['descend', 'ascend'],
                responsive: ['md'],
            },
            {
                title: 'Study creation',
                render: (text, record) => (<>{app.date(record.createdAt).datetime}</>),
                responsive: ['md'],
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Button type="primary" onClick={() => this.props.updateStudy(record)}>
                            <EditOutlined /> Update
                    </Button>
                    </Space>
                ),
                responsive: ['lg'],
            }
        ];

        return <Table
            rowSelection={{ type: 'checkbox', ...rowSelection, }}
            columns={columns}
            dataSource={this.props.studies}
            onChange={onChange}
            rowKey="id" />;
    }
}

export default Studies;
