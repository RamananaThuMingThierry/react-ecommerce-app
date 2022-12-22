import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import swal from "sweetalert";
import MasterLayout from "./layouts/admin/MasterLayout";

const AdminPrivateRoute = ({...rest}) =>{

    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    useEffect(() =>{
        axios.get(`api/checkingAuthenticated`).then(res =>{
            if(res.status === 200){
                setAuthenticated(true);
            }
            setLoading(false);
        });

        return () =>{
            setAuthenticated(false);
        };

    }, []);


    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
        if(err.response.status === 401){
            swal("Vous n'avez pas eu accès!", err.response.data.message, "warning");
            history.push("/");
        }
        return Promise.reject(err);
    });

    if(loading){
        return <h1 className="text-center mt-4">loading...</h1>
    }

    return (
        <Route {...rest}
            render={({location}) =>
                Authenticated ?
                (<MasterLayout/>):
                ( <Redirect to={ {pathname: "/login", state: {from: location}} }/>)
            }
        />
    );
}

export default AdminPrivateRoute;