import React, { useState, useEffect } from 'react';
import api from './api';
import { logout, getToken } from './auth';
import { Route, Redirect } from 'react-router-dom';

export default function WAuth({ component: Component, ...rest }){
    const [ redirect, setRedirect ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        async function verify(){
            let response = await api.get('/api/users/checktoken', {params: {token: getToken}});

            if(response.data.status === 200){
                setLoading(false);
                setRedirect(false);
            } else {
                logout();
                setLoading(false);
                setRedirect(true);
            }
        }
        verify();
    }, [])

    return(
        loading 
            ? 'Carregando...' 
            : <Route {...rest} render={ props => !redirect 
                                                    ?( <Component {...props } /> )
                                                    :<Redirect to={{pathname: "/admin/login",
                                                    state: { from: props.location}}} />
            }/>
    );
}