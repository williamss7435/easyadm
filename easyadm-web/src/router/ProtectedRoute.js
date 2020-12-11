import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default function ProtectedRoute({children, ...rest}){
    const token = sessionStorage.getItem('token');
    
    if(token){
        return (
            <>
                <Route {...rest} render={children}></Route>
            </>
        );
    }else
        return <Redirect to={{pathname: "/"}}/>
    
}

