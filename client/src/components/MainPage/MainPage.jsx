import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import RecipeList from '../RecipeList';
import Sidebar from '../Sidebar';
import Navigation from '../Navigation';

const { Header, Sider } = Layout;

class MainPage extends React.Component {
  async componentDidMount() {
    // nothing
  }

  render() {
    return (
      <>
        <Layout style={{ height: '100%' }}>
          <Header id="header">
            <Navigation siteMode="explore" />
          </Header>
          <Layout>
            <Sider theme="light" id="sidebar" width={400} style={{ height: '100%' }}>
              <Sidebar siteMode="explore" />
            </Sider>
            <Layout id="content" style={{ padding: '0 24px 24px' }}>
              <RecipeList siteMode="explore" />
            </Layout>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default MainPage;
