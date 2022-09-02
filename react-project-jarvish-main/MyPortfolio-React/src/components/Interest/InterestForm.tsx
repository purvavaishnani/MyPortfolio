 import { useState } from "react";
 import $ from 'jquery';
import './Interest.css';
import { useNavigate } from "react-router-dom";

type InterestProps = {
    onAddInterest: (interest: string) => void;
};

const InterestForm = (props: InterestProps) => {
     

    const [interest, setInterest] = useState("");

    const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        setInterest(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onAddInterest(interest);
        setInterest("");
    };

    
 return (
    <div className="interest-page">
    <div className="card">
      <div className="card-body pd-card">
          
            {/* <div style={{backgroundColor:"#ff7e5f"}} className="col-md-6 d-none d-md-block">
                <h1 className="text-center pt-3">Add Interest</h1>
            </div> 
            <div className="col-md-6 bg-dark">*/}
            <form onSubmit={handleSubmit}  className="col-12" >
            <div className="form-row mt-2 mb-2 input-text">
                <label className="col-sm-2 col-form-label label-text">
                  Interest:
                </label>
                <input
                    type='text'
                    value={interest}
                    size={30}
                    placeholder="enter interests with ,"
                    className="form-control col-sm-10"
                    onChange={handleInterestChange}
                /> <br></br>
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


export default InterestForm;