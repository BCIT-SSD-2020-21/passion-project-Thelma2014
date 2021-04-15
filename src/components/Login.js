import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../style/containers/Login.css";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hookLib";


export default function Login() {
    const history = useHistory();
    const { userHasAuthenticated } = useAppContext();
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
      });
    
  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await Auth.signIn(fields.email, fields.password);
            userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div className="Login">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={fields.email}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={fields.password}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Login
            </Button>
          </Form>
        </div>
      );
    }
