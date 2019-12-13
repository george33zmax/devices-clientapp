import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper';
import Devices from '../Devices/index';

const Router = () => (
  <MainWrapper>
    <main>
      <Layout />
      <div className="container__wrap">
        <Route path="/" component={Devices} />
      </div>
    </main>
  </MainWrapper>
);

export default Router;
