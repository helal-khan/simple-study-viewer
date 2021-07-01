import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { MyHeader, MyFooter, PageContent,  Study, About} from './Components/';

const App = () => {

  const router = {
    study: {
      title: 'Study',
      path: '/',
      component: Study
    },
    about: {
      title: 'About',
      path: '/about',
      component: About
    }
  };

  return (
    <Router>
      <div className="App">
        <Layout className="layout">
          <MyHeader />
          <Route path={router.study.path} exact
            render={(props) => (
              <>
                <PageContent title={router.study.title} link={router.study.path} InnerComponent={router.study.component} />
              </>
            )} />
          <Route path={router.about.path}
            render={(props) => (
              <>
                <PageContent title={router.about.title} link={router.about.path}InnerComponent={router.about.component} />
              </>
            )} />
          <MyFooter />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
