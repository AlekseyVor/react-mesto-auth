import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loading from './Loading';

export default function ProtectedRoute (props) {
    
    if(props.isLoadingRes) { return (
        <Loading/>
    )
        
    } else {
        return (
            <Route>
            { 
                () => props.isLoggedIn ? props.children : <Redirect to="./sign-in" />
            }
            </Route>
        )

    }

}
