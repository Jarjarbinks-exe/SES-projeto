import React from "react";
import { UserAuth } from "../auth/AuthContext";

const PrivateRoute = ({ children }) => {
    const { session } = UserAuth();

    return session ? children : <div>Please log in to access this page.</div>;
}

export default PrivateRoute;