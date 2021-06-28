import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

function MyHeader() {
    return (
        <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">About</Menu.Item>
            </Menu>
        </Header>
    );
}

export default MyHeader;
