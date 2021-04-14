import { AmplifyPasswordField } from '@aws-amplify/ui-react';
import React, { useState } from 'react';
import From from "react-boostrap/Form";
import Buttton from "react-bootstrap/Button";
import "./Login.css";


export default function Login() {
    const [email, setEmail] = useEstate("");
    cosnt [password, setPassword] =  useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }


    return (
        <div className="Login">
            
        </div>
    );
}
