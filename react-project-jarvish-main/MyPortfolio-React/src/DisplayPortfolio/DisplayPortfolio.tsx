import React, { useContext, useState, useEffect } from "react";
import { SyntheticEvent } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import profileDisplay from "../assests/profile-display.jpg";
import "./DisplayPortfolio.css";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ShowRecommendation from "../components/Recommendation/ShowRecommendation";
import ShowCertification from "../components/Certifications/ShowCertification";
import axios from "axios";
import ShowEducationBG from "../components/EducationalBG/ShowEducationBG";
import ShowProfessionalBG from "../components/ProfessionalBG/ShowProfessionalBG";
import ShowInterest from "../components/Interest/ShowInterest";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

type Props = {};

const DisplayPortfolio = (props: Props) => {
  const { userId } = useParams();
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [about, setAbout] = useState("");
  const [workExp, setworkExp] = useState([]);

  //skills
  //const[skills,setSkills]= useState<SkillsListType[]>([]);
  const [skill, setSkill] = useState([]);

  //experience
  const [jobtitle, setJob] = useState("");
  const [company, setCompany] = useState("");
  const [jobstatus, setJobStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const imgUrl =
    "https://jarvis-portfolio.s3.amazonaws.com/profileImg_" +
    localStorage.getItem("userId");

  //contact
  // const [email, setEmail] = useState('');
  //  const [linkID, setLinkID] = useState('');
  //  const [gitHubID, setGitHubID] = useState('');
  // const [phone, setPhone] = useState('');
  const [workContact, setworkContact] = useState([]);

  // project Work
  // const [proName, setProName] = useState('');
  // const [proDesc, setProDesc] = useState('');
  //const [tech, setTech] = useState('');
  // const [gitHubLink, setGitHubLink] = useState('');
  //const [webLink, setWebLink] = useState('');
  const [workProject, setworkProject] = useState([]);

  const fetchPersonalDetails = async (e: SyntheticEvent<HTMLDivElement>) => {
    console.log("fetch personal details");
    try {
      const response = await axios.get(
        "https://myportfolio-be.herokuapp.com/api/personaldetails/" + userId
      );
      if (response.status == 200 && response.data) {
        console.log(response.data);
        setName(response.data.displayName);
        setJobTitle(response.data.jobTitle);
        setAbout(response.data.about);
        fetchSkills();
        fetchExperience();

        fetchProjectWork();
        fetchContact();
      } else {
        toast("Something wrong. Please try again.");
      }
    } catch (err: any) {
      toast("Something wrong. Please try again.");
    }
  };

  const fetchSkills = async () => {
    console.log("fetching skills");
    try {
      const response = await axios.get(
        "https://myportfolio-be.herokuapp.com/api/getskillsbyid/" + userId
      );
      if (response.status == 200 && response.data) {
        console.log(response.data);
        var skills: any = [];
        response.data.forEach((s: { SkillName: any }) => {
          skills.push(s.SkillName);
        });
        setSkill(skills);
      } else {
        toast("Something wrong. Please try again.");
      }
    } catch (err: any) {
      toast("Something wrong. Please try again.");
    }
  };

  const fetchExperience = async () => {
    console.log("fetching experience");
    try {
      const response = await axios.get(
        "https://myportfolio-be.herokuapp.com/api/getexperiencebyid/" + userId
      );
      if (response.status == 200 && response.data) {
        console.log(response.data.payload);
        setworkExp(response.data);

        // setJob(response.data.jobtitle);
        // setCompany(response.data.company);
        // setJobStatus(response.data.jobstatus);
        // setStartDate(response.data.startDate);
        // setEndDate(response.data.endDate);
        // setDescription(response.data.description);
        // setLocation(response.data.location);
      } else {
        toast("Something wrong. Please try again.");
      }
    } catch (err: any) {
      toast("Something wrong. Please try again.");
    }
  };
  const fetchContact = async () => {
    console.log("fetch contact");
    try {
      const response = await axios.get(
        "https://myportfolio-be.herokuapp.com/api/contact/" + userId
      );
      if (response.status == 200 && response.data) {
        setworkContact(response.data);
        // setEmail( response.data.email);
        //setLinkID(response.data.linkID );
        // setGitHubID(response.data.gitHubID);
        // setPhone(response.data.phone);
      } else {
        toast("Something wrong. Please try again.");
      }
    } catch (err: any) {
      toast("Something wrong. Please try again.");
    }
  };

  const fetchProjectWork = async () => {
    console.log("fetch projectwork");
    try {
      const response = await axios.get(
        "https://myportfolio-be.herokuapp.com/api/projectWork/" + userId
      );
      if (response.status == 200 && response.data) {
        setworkProject(response.data);
        //   setProName( response.data.proName);
        //  setProDesc(response.data.proDesc );
        //   setTech(response.data.tech);
        //   setGitHubLink(response.data.gitHubLink);
        //  setWebLink(response.data.webLink);
      } else {
        toast("Something wrong. Please try again.");
      }
    } catch (err: any) {
      toast("Something wrong. Please try again.");
    }
  };
  return (
    <div className="display-page">
      <ToastContainer />
      <section id="about" className="about mt-4">
        <div className="container" onLoad={fetchPersonalDetails}>
          <div className="row mt-2">
            <div className="image col-xl-5 d-flex align-items-stretch justify-content-center justify-content-lg-start">
              <img className="display-img" src={imgUrl} />
            </div>
            <div className="col-xl-7 ps-0 ps-lg-5 pe-lg-1 d-flex align-items-stretch">
              <div className="content d-flex flex-column justify-content-center">
                <h2 className="display-name">Hey ! I am {name}</h2>
                <h3 className="display-job"> {jobTitle}</h3>
                <p> {about}</p>
                <div className="row"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="services section-bg">
        <div className="container" onLoad={fetchProjectWork}>
          <div className="section-title">
            <h2>Projects</h2>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              {workProject.map(
                (we: {
                  proName: any;
                  proDesc: any;
                  tech: any;
                  gitHubLink: any;
                  webLink: any;
                }) => (
                  <div className="icon-box">
                    <h4 className="title">Project Name :{we.proName}</h4>
                    <p className="description">Description:{we.proDesc}</p>
                    <div className="project-stack">
                      <li className="project-stack-item">
                        Technology: {we.tech}
                      </li>
                      <li className="project-stack-item">
                        GitHub Link:{we.gitHubLink}
                      </li>
                      <li className="project-stack-item">
                        Web Link:{we.webLink}
                      </li>
                    </div>
                    <a href="#">
                      {" "}
                      <LinkIcon sx={{ color: "black" }}>add_circle</LinkIcon>
                    </a>
                    <a href="#">
                      {" "}
                      <GitHubIcon sx={{ color: "black" }}></GitHubIcon>
                    </a>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
      <section id="work" className="work-exp section-bg">
        <div className="container" onLoad={fetchExperience}>
          <div className="section-title">
            <h2>Work Experience</h2>

            <div className="work-exp experience section-padding">
              <div className="row">
                {workExp.map(
                  (e: { company: any; jobtitle: any; jobstatus: any; startDate:any; endDate:any;description:any;location:any; }) => (
                    <div className="experience-wrapper">
                      <div className="company-wrapper clearfix">
                        <div className="experience-title">{e.company}</div>
                        <div className="time">{e.jobstatus}</div>

                        <br></br>
                        <div className="company-description">
                          {e.startDate} - {e.endDate}
                        </div>
                      </div>

                      <div className="job-wrapper clearfix">
                        <div className="experience-title">{e.jobtitle} </div>
                        <div className="company-description">
                          <p>{e.location}</p>
                        </div>
                        <div className="company-description">
                          <p>
                            {e.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ShowEducationBG></ShowEducationBG>
      <ShowProfessionalBG></ShowProfessionalBG>
      <section id="skills" className="skills section-bg">
        <div className="container" onLoad={fetchSkills}>
          <div className="section-title">
            <h2>Skills</h2>
            <p>Skills are displayed below:</p>
          </div>
          {skill.map((skill) => (
            <ul className="skills__list">
              <li className="skills__list-item skill-btn skill-btn--plain">
                {skill}
              </li>
            </ul>
          ))}
        </div>
      </section>
      <section id="contact" className="contact section-bg">
        <br></br>
        <div className="container" onLoad={fetchContact}>
          <div className="section-title">
            <h2 className="contact-title">Contact</h2>
          </div>
          <div className="row">
            <div className="social-links">
              <a href="#" className="gitHub">
                <GitHubIcon></GitHubIcon>
              </a>
              <a href="#" className="linkedin">
                <LinkedInIcon></LinkedInIcon>
              </a>
              <a href="#" className="outlock">
                <EmailIcon></EmailIcon>
              </a>
            </div>
            {workContact.map(
              (we: {
                email: any;
                phone: any;
                tech: any;
                linkID: any;
                gitHubID: any;
              }) => (
                <div className="col-lg-6 col-md-6">
                  <div className="info">
                    <div className="d-flex align-items-center mt-4 contact-info">
                      <EmailIcon className="icon-logo"></EmailIcon>
                      <p>{we.email}</p>
                    </div>
                    <div className="d-flex align-items-center mt-4 contact-info">
                      <PhoneIcon className="icon-logo"></PhoneIcon>
                      <p>{we.phone}</p>
                    </div>
                    <div className="d-flex align-items-center contact-info">
                      <LinkedInIcon className="icon-logo"></LinkedInIcon>
                      <p>{we.linkID}</p>
                    </div>
                    <div className="d-flex align-items-center contact-info">
                      <GitHubIcon className="icon-logo"></GitHubIcon>
                      <p>{we.gitHubID}</p>
                      <a href="#" className="linkedin">
                        <LinkedInIcon></LinkedInIcon>
                      </a>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <ShowRecommendation></ShowRecommendation>

      <ShowCertification></ShowCertification>

      <ShowInterest></ShowInterest>
    </div>
  );
};

export default DisplayPortfolio;
