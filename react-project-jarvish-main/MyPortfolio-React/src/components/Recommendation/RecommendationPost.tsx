import React, { useContext } from 'react';
import axios from 'axios';
import RecommendationForm from './AddRecommendationForm';
import { Navigate } from 'react-router-dom';
import './Recommendation.css';
import AuthContext, { AuthContextType } from "../../context/AuthContext";

type Props = {};

const RecommendationPost = (props: Props) => {
    const handleLogin = async (  fullName: string,position: string,contactNo: string,email: string,letter: string) => {
        try {
            const response = await axios.post(
                'https://myportfolio-be.herokuapp.com/api/add_coworkers_recommendation',
                {
                    fullName: fullName,
                    position: position,
                    contactNo: contactNo,
                    email: email,
                    letter: letter,
                    userId: localStorage.getItem("userId")
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='page-style'>
            <RecommendationForm onAdd={handleLogin}></RecommendationForm>
        </div>
    );
};

export default RecommendationPost;