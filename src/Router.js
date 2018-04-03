import React from 'react';
import { Scene, Router, } from 'react-native-router-flux';
import Home from './components/Home';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ backgroundColor: '#cfcfcf', marginTop: 50, }} >
          <Scene key='main' >
            <Scene key='Home' component={Home} title='HATIRLATICI' initial />
          </Scene>
        </Router>
    );
};

export default RouterComponent;
