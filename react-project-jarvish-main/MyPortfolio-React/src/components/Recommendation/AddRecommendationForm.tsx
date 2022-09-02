import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recommendation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import your icons
import { faEnvelope, faUser, faUserTag, faPhone, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

type AddProps = {
  onAdd: (
  fullName: string,
  position: string,
  contactNo: string,
  email: string,
  letter: string
  ) => void;
};

const AddRecommendationForm = (props: AddProps) => {

  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [contactNo, setcontactNo] = useState('');
  const [email, setEmail] = useState('');
  const [letter, setLetter] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //by default it will submit the form, so prevent
    e.preventDefault();
    props.onAdd(fullName,position,contactNo,email,letter);
    setFullName('');
    setPosition("");
    setcontactNo("");
    setEmail("");
    setLetter("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setFullName(e.target.value);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setPosition(e.target.value);
  };

  const handleContactNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setcontactNo(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setEmail(e.target.value);
  };

  const handleLetterChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e);
    setLetter(e.target.value);
  };

  return (
    <div className="recommendation-page">
    <div className="card">
      <div className="card-body pd-card">
            {/* <div style={{backgroundColor:"#ff7e5f"}} className="col-md-6 d-none d-md-block">
                <h1 className="text-center pt-3">Add Recommendation</h1>
            </div> 
            <div className="col-md-6 bg-dark">*/}
            <form onSubmit={handleSubmit} className="col-12">
            <div className="form-row mt-2 mb-2 input-text">
                <label className="col-sm-2 col-form-label label-text"> Name :</label>
                <input
                    type='text'
                    value={fullName}
                    size={30}
                    className="form-control col-sm-10"
                    onChange={handleNameChange}
                /> <br></br>
                </div>
                <div className="form-row mt-2 mb-2 input-text">
                <label className="col-sm-2 col-form-label label-text"> Position/Role :</label>
                    <input
                        type='text'
                        value={position}
                        size={30}
                        className="form-control col-sm-10"
                        onChange={handlePositionChange}
                    /><br></br>
                  </div>
                  <div className="form-row mt-2 mb-2 input-text">
                <label className="col-sm-2 col-form-label label-text"> Contact Number :</label>
                <input 
                    type='number'
                    value={contactNo}
                    size={30}
                    className="form-control col-sm-10"
                    onChange={handleContactNoChange}
                /><br></br>
                </div>
                <div className="form-row mt-2 mb-2 input-text">
                <label className="col-sm-2 col-form-label label-text"> Email :</label>
                    <input 
                        type='email'
                        value={email}
                        size={30}
                        className="form-control col-sm-10"
                        onChange={handleEmailChange}
                    /><br></br>
                </div>
                <div className="form-row mt-2 mb-2 input-text">
                <label className="col-sm-2 col-form-label label-text">Letter Of Recommendation :</label>
                    <textarea
                        value={letter}
                        className="form-control col-sm-10"
                        onChange={handleLetterChange}
                    />
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
   
  );
};

export default AddRecommendationForm;
