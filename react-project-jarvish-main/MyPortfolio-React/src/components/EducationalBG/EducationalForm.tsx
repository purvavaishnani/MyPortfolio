import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './EducationalBG.css';

// function EducationalBG (){
    
 
type EduProps = {
    onAddEdu: (school: string, college: string, master: string,  masterCourse: string, course: string, additional: string) => void;
};

const EducationalForm = (props: EduProps) => {
    const navigate = useNavigate();

    const [school, setSchool] = useState("");
    const [college, setCollege] = useState("");
    const [master, setMaster] = useState("");
    const [masterCourse, setMasterCourse] = useState("");
    const [course, setCourse] = useState("");
    const [additional,setAdditional] = useState("");


const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setSchool(e.target.value);
};

const handleCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setCollege(e.target.value);
};

const handleMasterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setMaster(e.target.value);
};

const handleMasterCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setMasterCourse(e.target.value);
};

const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setCourse(e.target.value);
};

const handleAdditionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setAdditional(e.target.value);
};




const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onAddEdu(school,college, master, masterCourse, course, additional);
    setSchool("");
    setCollege("");
    setMaster("");
    setCourse("");
    setAdditional("");
    setMasterCourse("");
};


return (
   

<div className="educational-details-page">
        <div className="card">
          <div className="card-body pd-card">
            
              {/* <div className="form-row mt-1 mb-2"> */}
                <div className="card bg-glass">
                    <div className="card-body px-4 py-5">
                        <div className='div-to-align'>
                            <h2> Educational Details</h2><br></br>
                            <form onSubmit={handleSubmit} className='add-form'>
                                <div className="form-row mt-2 mb-2">
                                            <label className="col-sm-2 col-form-label label-text">
                                            School: 
                                            </label>
                                            <div className="form-outline">
                                                <input type="text" id="school" onChange={handleSchoolChange} placeholder='School Name' className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-row mt-2 mb-2 input-text">
                                            <label className="col-sm-2 col-form-label label-text">
                                            College:
                                            </label>
                                            <div className="form-outline">
                                                <input type="text" id="college" onChange={handleCollegeChange} placeholder='College Name' className="form-control" />
                                            </div>
                                        </div> 
                                        <div className="form-row mt-2 mb-2 input-text">
                                            <label className="col-sm-2 col-form-label label-text">
                                            College Course:
                                            </label>
                                            <div className="form-outline">
                                                <input type="text" id="course" onChange={handleCourseChange} placeholder='College Course Name' className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-row mt-2 mb-2 input-text">
                                            <label className="col-sm-2 col-form-label label-text">
                                            Master's Degree:
                                            </label>
                                            <div className="form-outline">
                                                <input type="text" id="university" onChange={handleMasterChange} placeholder='University Name' className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-row mt-2 mb-2 input-text">
                                            <label className="col-sm-2 col-form-label label-text">
                                            Master's Course:
                                            </label>
                                            <div className="form-outline">
                                                <input type="text" id="course" onChange={handleMasterCourseChange} placeholder='University Course Name' className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-row mt-2 mb-2 input-text">
                                            <label className="col-sm-2 col-form-label label-text">
                                            Additional Course:
                                            </label>
                                            <div className="form-outline">
                                                <input type="text" onChange={handleAdditionalChange} id="additional" placeholder='Additional Course Name' className="form-control" />
                                            </div>
                                        </div>
                                    
                                        <div className="form-row mt-2 mb-1 input-text">
                                    <button className="btn btn-primary btn save-btn" type="submit"> Submit </button>
                            </div>
                        </form>
                 </div>
            </div>
        </div>
    </div>
    </div>
    </div>
);
};

 export default EducationalForm;