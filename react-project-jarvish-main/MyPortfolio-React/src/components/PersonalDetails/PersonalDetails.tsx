import { useContext, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PersonalDetails.css";
import profileImg from "../../assests/profiles-icon-blue.svg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import AuthContext, { AuthContextType } from "../../context/AuthContext";
import AWS from "aws-sdk";
const S3_BUCKET = "jarvis-portfolio";
const REGION = "us-east-1";
const BUCKET_DIR = "profileImage/";

AWS.config.update({
  accessKeyId: "AKIAQMMEKIXNOUIISNP4",
  secretAccessKey: "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",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
  maxRetries: 15,
});

const PersonalDetails = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [about, setAbout] = useState("");
  const [imgUrl, setImgUrl] = useState(profileImg);
  const profileImage =
    "https://jarvis-portfolio.s3.amazonaws.com/profileImg_" +
    localStorage.getItem("userId");
  const fileHandler = (e: any) => {
    setImgUrl(
      e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : profileImg
    );

    const params = {
      ACL: "public-read",
      Body: e.target.files[0],
      Bucket: S3_BUCKET,
      Key: "profileImg_" + localStorage.getItem("userId"),
    };

    myBucket.putObject(params, function (err, data) {
      if (err) {
        toast("Something wrong. Please try again.");
      } else {
        toast("Profile Image uploaded successfully.");
      }
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleJobTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
  };
  const handleAboutMeChange = (e: any) => {
    setAbout(e.target.value);
  };
  const navigate = useNavigate();
  const navigateToLoginPage = () => {
    navigate("/login");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handle submit");
    e.preventDefault();
    if ((auth.isLoggedIn && auth.userId) || localStorage.getItem("userId")) {
      try {
        const response = await axios.post(
          "https://myportfolio-be.herokuapp.com/api/addpersonaldetails",
          {
            userId: auth.userId ? auth.userId : localStorage.getItem("userId"),
            displayName: name,
            jobTitle: jobTitle,
            about: about,
          }
        );
        if (response.status == 200 && response.data) {
          toast("Personal Details updated successfully.");
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
    <div>
      <script src="https://sdk.amazonaws.com/js/aws-sdk-2.4.5.min.js"></script>
      <ToastContainer />
      <div className="personal-details-page">
        <div className="card">
          <div className="card-body pd-card">
            <form className="col-12" onSubmit={handleSubmit}>
              <div className="form-row mt-1 mb-2">
                <img
                  className="profile-img"
                  src={profileImage}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = profileImg;
                  }}
                  alt="Profile image"
                />
              </div>
              <div className="form-row mt-2 mb-2">
                <input
                  type="file"
                  onChange={fileHandler}
                  accept="image/png, image/gif, image/jpeg"
                  className="form-control col-sm-8 img-upload"
                  id="customFile"
                />
              </div>

              <div className="form-row mt-2 mb-2 input-text">
                <label className="col-sm-2 col-form-label label-text">
                  Name
                </label>
                <input
                  type="text"
                  onChange={handleNameChange}
                  className="form-control col-sm-10"
                  placeholder="Enter name to display"
                  name="name"
                  id="name"
                />
              </div>
              <div className="form-row mt-2 mb-2 input-text">
                <label className="col-sm-2 col-form-label label-text">
                  Title
                </label>
                <input
                  type="text"
                  onChange={handleJobTitle}
                  className="form-control col-sm-10"
                  placeholder="Enter job title"
                  name="name"
                  id="name"
                />
              </div>
              <div className="form-row mt-2 mb-2 input-text">
                <label className="col-sm-2 col-form-label label-text">
                  About Me
                </label>
                <textarea
                  onChange={handleAboutMeChange}
                  className="form-control col-sm-10"
                  id="aboutMe"
                  placeholder="Say something about yourself"
                  rows={3}
                ></textarea>
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
    </div>
  );
};

export default PersonalDetails;
