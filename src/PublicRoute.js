import React from "react";
import { Route} from "react-router-dom";
import FrontendLayout from "./layouts/frontend/FrontendLayout";

const PublicRoute = ({...rest}) =>{

    return (
        <Route {...rest}
            render={() => <FrontendLayout/>
            }
        />
    );
}

export default PublicRoute;