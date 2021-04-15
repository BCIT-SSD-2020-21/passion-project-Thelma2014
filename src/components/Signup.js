import React, { useState } from 'react';
import Form from "react-boostrap/From";
import { useHistory } from "react-router-dom";
import LoadButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "../style/containers/Signup.css";



export default function Signup() {
    const [fields, handleFieldChange] = useFormFields({
        email:"",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
    });

    const history = useHistory();
    const [newUser, setNewUser] =useState(null);
    const { userHAsAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);


    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        setNewUser("Test");

        setIsLoading(false);
    }




    return (
        <div>
            
        </div>
    )
}
