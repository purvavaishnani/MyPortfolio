import axios from 'axios';
import { useContext, useState } from "react";
    import { Routes, Route, useNavigate } from "react-router-dom";
    import "react-toastify/dist/ReactToastify.css";
    import { ToastContainer, toast } from "react-toastify";
    import AuthContext, { AuthContextType } from "../../context/AuthContext";

import { Navigate } from 'react-router-dom';



const ProjectWork = () => {
   
    const auth = useContext(AuthContext) as AuthContextType;
    const [proName, setProName] = useState("");
    const [proDesc, setProDesc] = useState("");
    const [tech, setTech] = useState("");
    const [gitHubLink, setGitHubLink] = useState("");
    const [webLink, setWebLink] = useState("");
   
    
    const handleProNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProName(e.target.value);
    };
    const handleProDescChange = (e: any) => {
        setProDesc(e.target.value);
    };
    const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTech(e.target.value);
    };
    const handleGitHubLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGitHubLink(e.target.value);
    };
    const handleWebLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWebLink(e.target.value);
    };
    const navigate = useNavigate();
    const navigateToLoginPage = () => {
    navigate("/login");
  };
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        //by default it will submit the form, so prevent
        e.preventDefault();

        if ((auth.isLoggedIn && auth.userId) || (localStorage.getItem("userId"))) {
            try {
                
                    const response = await axios.post(
                        'https://myportfolio-be.herokuapp.com/api/projectwork',
                        {
                            userId: auth.userId ? auth.userId : localStorage.getItem("userId"),
                            proName: proName,
                            proDesc: proDesc,
                            tech: tech,
                            gitHubLink: gitHubLink,
                            webLink:webLink,
                        }
                    );
                    
                    if (response.status == 200 && response.data) {
                        toast("project Work updated successfully.");
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
                            <label className="col-sm-2 col-form-label label-text">Project Name</label>
                            <input className="form-control col-sm-10" type='text' value={proName} onChange={handleProNameChange} placeholder='Enter Your Project Name' />
                        </div>

                        <div className="form-row mt-2 mb-2 input-text">
                            <label className="col-sm-2 col-form-label label-text">Description</label>
                            <textarea className="form-control col-sm-10" id="desc" value={proDesc}
                                onChange={handleProDescChange}
                                placeholder='Enter your Description' rows={3}></textarea>
                        </div>
                        <div className="form-row mt-2 mb-2 input-text">
                            <label className="col-sm-2 col-form-label label-text">Technology</label>
                            <input type="text" className="form-control col-sm-10" value={tech}
                                onChange={handleTechChange} placeholder='Enter Technolgoies used in project' name="tech" id="tech" />
                        </div>
                        <div className="form-row mt-2 mb-2 input-text">
                            <label className="col-sm-2 col-form-label label-text">Web Link</label>
                            <input type="text" className="form-control col-sm-10" value={webLink}
                                onChange={handleWebLinkChange} placeholder='Enter web site link' name="webLink" id="webLink" />
                        </div>

                        <div className="form-row mt-2 mb-2 input-text">
                            <label className="col-sm-2 col-form-label label-text">Technology</label>
                            <input type="text" className="form-control col-sm-10" value={gitHubLink}
                                onChange={handleGitHubLinkChange} placeholder='Enter git hub link ' name="gitLink" id="gitLink" />
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

    

export default ProjectWork;














