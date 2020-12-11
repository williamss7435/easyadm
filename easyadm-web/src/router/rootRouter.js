import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import CostCenterPage from '../pages/CostCenterPage';
import DepartmentPage from '../pages/DepartmentPage';
import UserPage from '../pages/UserPage';
import ImportPage from '../pages/ImportPage';

import ProtectedRoute from './ProtectedRoute';

export default function RootRouter(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                <ProtectedRoute path="/cost-center" component={CostCenterPage}/>
                <ProtectedRoute path="/department" component={DepartmentPage}/>
                <ProtectedRoute path="/user" component={UserPage}/>
                <ProtectedRoute path="/import-list" component={ImportPage}/>
            </Switch>
        </BrowserRouter>
    );

}