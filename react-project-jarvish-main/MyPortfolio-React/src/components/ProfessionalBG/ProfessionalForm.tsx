import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './ProfessionalBG.css'

type AddProps = {
  onAddPro: (field: string, orgName: string, position: string, technology:string, timeFrom: string, timeTo: string) => void;
};


const ProfessionalForm = (props: AddProps) => {
    const navigate = useNavigate();
    const navigateToProfessional = () => {
        navigate("/int")
    }
  const [field, setField] = useState("");
  const [orgName, setOrgName] = useState("");
  const [position, setPosition] = useState("");
  const [technology, setTechnology] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setField(e.target.value);
};

const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e);
  setOrgName(e.target.value);
};

const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e);
  setPosition(e.target.value);
};

const handleTechnologyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e);
  setTechnology(e.target.value);
};

const handleTimeFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e);
  setTimeFrom(e.target.value);
};

const handleTimeToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e);
  setTimeTo(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  props.onAddPro(field, orgName, position, technology, timeFrom, timeTo);
  setField("");
  setOrgName("");
  setPosition("");
  setTechnology("");
  setTimeFrom("");
  setTimeTo("");
};


  return (

<div>
<div className="professional-details-page">
        <div className="card">
          <div className="card-body pd-card">
        <form className="col-12" onSubmit={handleSubmit}>
            <div className="form-row mt-2 mb-2 input-text">
            <label className="col-sm-2 col-form-label label-text" id="recommendationLabel" htmlFor="name"> Enter Field Type:</label>
                <input
                    type='text'
                    value={field}
                    size={30}
                    className='form-control col-sm-10'
                    onChange={handleFieldChange}
                /> <br></br>
                </div>
                <div className="form-row mt-2 mb-2 input-text">
                <label className="col-sm-2 col-form-label label-text" id="recommendationLabel" htmlFor="name">Organization Name:</label>
                    <input
                        type='text'
                        value={orgName}
                        size={30}
                        className='form-control col-sm-10'
                        onChange={handleOrgChange}
                    /><br></br>
                  </div>
                  <div className="form-row mt-2 mb-2 input-text">
                  <label className="col-sm-2 col-form-label label-text" id="recommendationLabel" htmlFor="name"> Position :</label>
                <input 
                    type='text'
                    value={position}
                    size={30}
                    className='form-control col-sm-10'
                    onChange={handlePositionChange}
                /><br></br><br></br>
                </div>
                <div className="form-row mt-2 mb-2 input-text">
                <label className="col-sm-2 col-form-label label-text" id="recommendationLabel" htmlFor="email"> Technology/Area of work :</label>
                    <input 
                        type='text'
                        value={technology}
                        size={30}
                        className='form-control col-sm-10'
                        onChange={handleTechnologyChange}
                    /><br></br>
                </div>
                <div className="form-row mt-2 mb-2 input-text">
                <label className="col-sm-2 col-form-label label-text" id="recommendationLabel" htmlFor="email"> From :</label>
                <input 
                    type='datetime-local'
                    value={timeFrom}
                    size={10}
                    className='form-control col-sm-10'
                    onChange={handleTimeFromChange}
                />
                </div>
                <div className="form-row mt-2 mb-2 input-text">
                <label className="col-sm-2 col-form-label label-text" id="recommendationLabel" htmlFor="email"> To :</label>
                <input 
                    type='datetime-local'
                    value={timeTo}
                    size={30}
                    className='form-control col-sm-10'
                    onChange={handleTimeToChange}
                />
                </div>
                <div className="form-row mt-2 mb-1 input-text">
                <input className='btn btn-primary btn save-btn' type='submit' value='Submit' /> </div>    
                </form>
                </div>
                </div >
            </div>
            </div>
  )

};
export default ProfessionalForm;