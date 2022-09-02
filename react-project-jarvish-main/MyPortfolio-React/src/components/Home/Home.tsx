import React, { useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import HomePage from '../../assests/home.webp';
import HomePage2 from '../../assests/home2.jpg';
import './Home.css'
type Props = {};

const Home = (props: Props) => {
    const navigate = useNavigate();
    const navigateToLoginPage = () => {
        navigate("/login")
    }
    return (
        <div className='home-page'>
            <div className="px-5 ms-xl-4 mb-4 logo-image-div">
                <img src="logo.png"
                    alt="Logo image" className="logo-image" />
            </div>
            <div className='row'>
                <img src={HomePage}
                    alt="Home image" className="w-100 h-100" />
            </div>
            <div className="bm-cta-container mt-4">
                <a className="bm-cta__cta" href="#" onClick={navigateToLoginPage}>
                    <span>Start your online portfolio</span>
                </a>
            </div>
            <div className='row mt-4 mb-4 homepage2-img'>
                <img src={HomePage2}
                    alt="Home image" className="w-100 h-100" />
            </div>
        </div>
    );

};

export default Home;
