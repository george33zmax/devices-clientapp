import React from 'react';
import { Route } from 'react-router-dom';
import Devices from '../Devices/index';
import MainWrapper from './MainWrapper';

const Router = () => (
  <MainWrapper>
    <main>
      <div className="container__wrap">
        <Route path="/" component={Devices} />
      </div>
    </main>
  </MainWrapper>
);

export default Router;
