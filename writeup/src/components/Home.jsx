import React from "react";
import { UserAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import CreateDocument from "./CreateDocument";
import DocumentList from "./DocumentList";



const Home = () => {
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();

    const handle_Signout = async (e) => {
        e.preventDefault()
        try {
            await signOut();
            console.log("User signed out successfully");
            navigate("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    return (
        <div>
            <h1>Home</h1>
            {session ? (
                <div>
                    <button onClick={handle_Signout}>Sign Out</button>
                    <CreateDocument />
                    <DocumentList />
                </div>
            ) : (
                <div>
                    <button onClick={() => navigate("/signup")}>Sign Up</button>
                    <button onClick={() => navigate("/signin")}>Sign In</button>
                </div>
            )}
        </div>
    );
}

export default Home;