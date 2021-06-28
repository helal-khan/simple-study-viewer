import 'antd/dist/antd.css';
import '../index.css';
import { Layout } from 'antd';

const { Footer } = Layout;

function MyFooter() {
    return (
        <Footer style={{ textAlign: 'center' }}>Study Viewer ©2021 Created by Helal</Footer>
    );
}

export default MyFooter;
