import { AmplifyPasswordField } from '@aws-amplify/ui-react';
import React, { useState } from 'react';
import From from "react-boostrap/Form";
import { Form } from 'react-bootstrap';
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
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <From.Label>Password</From.Label>
                    <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.vlue)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disable={!validateForm()}>
                    Login
                </Button>
            </Form>            
        </div>
    );
}
