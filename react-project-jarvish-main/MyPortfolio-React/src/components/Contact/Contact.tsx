import axios from 'axios';
import { useContext, useState } from "react";
import './Contact.css';
    import { Routes, Route, useNavigate } from "react-router-dom";
    import "react-toastify/dist/ReactToastify.css";
    import { ToastContainer, toast } from "react-toastify";
    import AuthContext, { AuthContextType } from "../../context/AuthContext";

    type Props={
       
    };


const Contact = (props:Props) => {
   
    const auth = useContext(AuthContext) as AuthContextType;
    const [email, setEmail] = useState("");
    const [linkID, setLinkID] = useState("");
    const [gitHubID, setGitHubID] = useState("");
    const [phone, setPhone] = useState('');
   


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleLinkIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLinkID(e.target.value);
    };
    const handleGitHubIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGitHubID(e.target.value);
    };
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };
  const navigate = useNavigate();
  const navigateToLoginPage = () => {
  navigate("/login");
  };
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ((auth.isLoggedIn && auth.userId) || (localStorage.getItem("userId"))) {
            try {
                
                    const response = await axios.post(
                        'https://myportfolio-be.herokuapp.com/api/contact',
                        {
                            userId: auth.userId ? auth.userId : localStorage.getItem("userId"),
                            email: email,
                            linkID: linkID,
                            gitHubID: gitHubID,
                            phone: phone,
                        }
                    );
                    
                    if (response.status == 200 && response.data) {
                        toast("Contact updated successfully.");
                      } else {
                        toast("Something wrong. Please try again.");
                      }
                    } catch (err: any) {
                      toast("Something wrong. Please try again.");
                    }
                  } else {
              navigateToLoginPage();
              }
               
       
    };

    return (
        <div className='project-work-page'>
              <ToastContainer />
            <div className='card'>
                <div className="card-body pd-card">
                    <form className="col-12" onSubmit={handleSubmit}>

                        <div className="form-row mt-2 mb-2 input-text">
                            <label className="col-sm-2 col-form-label label-text">Email Address</label>
                            <input className="form-control col-sm-10" type='text' value={email} onChange={handleEmailChange} placeholder='Enter Your email address' />
                        

                        </div>

                        <div className="form-row mt-2 mb-2 input-text">
                            <label className="col-sm-2 col-form-label label-text">Phone No</label>
                            <input className="form-control col-sm-10" type='number' value={phone} onChange={handlePhoneChange} placeholder='Enter Your phone number' />
                        </div>
                        <div className="form-row mt-2 mb-2 input-text">
                            <label className="col-sm-2 col-form-label label-text">Linked In Profile</label>
                            <input type="text" className="form-control col-sm-10" value={linkID}
                                onChange={handleLinkIDChange} placeholder='Enter your linked in profile link' name="linkedin" id="linkedin" />
                        </div>

                        <div className="form-row mt-2 mb-2 input-text">
                            <label className="col-sm-2 col-form-label label-text">Technology</label>
                            <input type="text" className="form-control col-sm-10" value={gitHubID}
                                onChange={handleGitHubIDChange} placeholder='Enter git hub link ' name="gitLink" id="gitLink" />
                        </div>


                        <div className="form-row mt-2 mb-1 input-text">
                            <button type="submit" className="btn btn-primary btn save-btn">
                                SAVE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>



    )
}

export default Contact;



















    




