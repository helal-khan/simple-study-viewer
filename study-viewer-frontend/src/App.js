
import { useState, useEffect } from 'react'
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import MyHeader from './Components/Header';
import MyFooter from './Components/Footer';
import Studies from './Components/Studies';
import StudyService from './Services/StudyService';

const App = () => {
  const [studies, setStudies] = useState([])

  useEffect(() => {
    StudyService.getEmployees().then((res) => {
      console.log(res.data)
      setStudies(res.data);
  });
  }, [])

  return (
    <div className="App">
      <Layout className="layout">
        <MyHeader/>
        <Studies studies={studies}/>
        <MyFooter/>
      </Layout>
    </div>
  );
}

export default App;
