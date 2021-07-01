import { Link } from 'react-router-dom';
import {
    Layout, Breadcrumb
} from 'antd';

const { Content } = Layout;

const PageContent = ({ title, InnerComponent, link }) => {

    return (
        <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item><Link to={link} >{title}</Link></Breadcrumb.Item>
            </Breadcrumb>
            <InnerComponent />
        </Content>
    )
}

export default PageContent;
