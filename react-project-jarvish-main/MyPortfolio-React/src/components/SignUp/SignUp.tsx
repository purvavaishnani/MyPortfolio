import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

type Props = {};

const SignUp = () => {
    const navigate = useNavigate();
    const navigateToLoginPage = () => {
        navigate("/login")
    }
    const handleSignUp = async (firstName: string, lastName: string, email: string, password: string) => {
        console.log("sendPostRequest");
        try {
            const response = await axios.post(
                'https://myportfolio-be.herokuapp.com/api/signup',
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                }
            );
            console.log(response);
            if( response.status == 200 && response.data){
                toast("User Created successfully.");
                navigateToLoginPage();
            }else{
                toast("Something wrong. Please try again.")
            }
        } catch (err) {
            toast("Something wrong. Please try again.")
            console.log(err);
        }
    };

    return (
        
        <div className='page-style'>
            <ToastContainer />
            <SignUpForm onAddUser={handleSignUp}></SignUpForm>
        </div>
    );
};

export default SignUp;