import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Portfolio1 from '../../assests/portfolio1.jpg';
import Portfolio2 from '../../assests/portfolio2.webp';


type AddProps = {
    onLogin: (email: string, password: string) => void;
    errorMsg : String;
};
const LoginForm = (props: AddProps) => {
    const navigate = useNavigate();
    const navigateToSignUpPage = () => {
        navigate("/signup")
    }

    const navigateToCreatePortfolio = () => {
        navigate("/createPortfolio")
    }

    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mandatoryFieldErrorMsg, setMandatoryFieldErrorMsg] = useState('');
    const [emailValidationErrorMsg, setEmailValidationErrorMsg] = useState('');
    const [passwordValidationErrorMsg, setPasswordValidationErrorMsg] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        setEmail(e.target.value);
        setMandatoryFieldErrorMsg("");
        if (!regex.test(email)) {
            setEmailValidationErrorMsg("Invalid Email id.")
        } else {
            setEmailValidationErrorMsg("");
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        setPassword(e.target.value);
        setMandatoryFieldErrorMsg("");
        if (!passwordRegex.test(password)) {
            setPasswordValidationErrorMsg("Invalid Password. \n It should have more than 8 characters. \n One digit, one alphabet, one special character.");
        } else {
            setPasswordValidationErrorMsg("");
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("handle submit");
        e.preventDefault();
        setEmailValidationErrorMsg("");
        setPasswordValidationErrorMsg("");
        if (email == "" && password == "") {
            setMandatoryFieldErrorMsg("This field is mandatory.")
        } else if (!regex.test(email)) {
            setEmailValidationErrorMsg("Invalid Email id.")
        } else if (!passwordRegex.test(password)) {
            setPasswordValidationErrorMsg("Invalid Password. \n It should have more than 8 characters. \n One digit, one alphabet, one special character.");
        }
        else {
            props.onLogin(email, password);
        }
    };

    return (
        <div >
            <section className="vh-100">
                <div className="container-fluid">
                    <div className="row login-page">
                        <div className="col-sm-6 text-black">

                            <div className="px-5 ms-xl-4 logo-image-div">
                                <img src="logo.png"
                                    alt="Login image" className="logo-image" />
                            </div>

                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                                <form className='login-form' onSubmit={handleSubmit}>
                                    <h3 className="fw-normal mb-3 pb-3 h3-header" >Log in</h3>

                                    <div className="form-outline mb-4">
                                        <input required type="email" id="email" onChange={handleEmailChange} placeholder='Email address' className="form-control form-control-lg" />
                                        <span className='errorMsg'>{mandatoryFieldErrorMsg}</span>
                                        <span className='errorMsg'>{emailValidationErrorMsg}</span>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input required type="password" id="password" onChange={handlePasswordChange} placeholder='Password' className="form-control form-control-lg" />
                                        <span className='errorMsg'>{mandatoryFieldErrorMsg}</span>
                                        <span className='errorMsg new-line'>{passwordValidationErrorMsg}</span>
                                    </div>

                                    <div className="pt-1 mb-4">
                                        <button className="btn btn-info btn-lg btn-block" type="submit">Login</button>
                                    </div>
                                    <div className="pt-1 mb-4">
                                    <p className='credential-msg'>{props.errorMsg}</p>
                                    {/* <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p> */}
                                    <p className='p-login'>Don't have an account? <a href="#" onClick={navigateToSignUpPage} className="link-info">Register here</a></p>

                                    </div>
                                    
                                </form>

                            </div>

                        </div>
                        <div className="col-sm-6 px-0 d-none d-sm-block">
                            <img src={Portfolio2}
                                alt="Login image" className="w-100 h-100 login-img" />
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default LoginForm;
