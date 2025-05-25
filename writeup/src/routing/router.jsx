import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signup from "../components/Signup";
import Home from "../components/Home";
import Signing from "../components/Signin";
import Document from "../components/Document";
import PrivateDocument from "../documents/PrivateDocument";

export const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/signup", element: <Signup /> },
    { path: "/home", element: <Home /> },
    { path: "/signin", element: <Signing /> },
    { path: "/document/", element: <PrivateDocument><Document /></PrivateDocument> },
])