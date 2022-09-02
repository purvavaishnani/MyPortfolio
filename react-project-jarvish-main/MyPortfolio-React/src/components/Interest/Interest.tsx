import React, { useContext } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import InterestForm from './InterestForm';
import AuthContext, { AuthContextType } from "../../context/AuthContext";
type Props = {};

const Interest = () => {
    const navigate = useNavigate();
    const navigateToLoginPage = () => {
      navigate("/login");
    };
    const auth = useContext(AuthContext) as AuthContextType;
    const handlehobbyChange = async (interest: string) => {
        if((auth.isLoggedIn&&auth.userId)||(localStorage.getItem("userId"))){
            try {
                const response = await axios.post(
                    'https://myportfolio-be.herokuapp.com/api/addInterest',
                    {
                        interest : interest,
                        userId:auth.userId?auth.userId :localStorage.getItem("userId")

                    }
                );
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        }
        else{
            navigateToLoginPage();
        }
    }

    return (
        <div className='page-style'>
            <InterestForm onAddInterest={handlehobbyChange}></InterestForm>
        </div>
    );
};

export default Interest;