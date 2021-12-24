import React, { useContext } from "react";
import UserLogedIn from "../components/Home/UserLogedIn";
import UserLogedOut from "../components/Home/UserLogedOut";
import { AuthContext } from "../context/auth";
import '../styles/Home.css';

export default function Home() {
    const { user } = useContext(AuthContext);
    return (
        <div className="header">
        <div className="front-page-text-box">
            {user ? (
                <UserLogedIn />
            ) : (
                <UserLogedOut />
            )}
        </div>
        </div>
    )
}
