import { useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import EducationalBG from '../EducationalBG/EducationalBG'
import ExperienceForm from '../Experience/ExperienceForm';
import PersonalDetails from '../PersonalDetails/PersonalDetails';
import ProjectWork from '../ProjectWork/ProjectWork';
import Skills from '../Skills/Skills';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './PortfolioMaker.css'
import Contact from '../Contact/Contact';
import personalDetailsLogo from '../../assests/personal-details-logo.png';
import AddRecommendationForm from '../Recommendation/RecommendationPost';
import AddCertificationForm from '../Certifications/CertificationPost';
import InterestForm from "../Interest/Interest";
import ProfessionalBG from '../ProfessionalBG/ProfessionalBG';
import Interest from '../Interest/Interest';

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const PortfolioMaker = () => {
  const navigate = useNavigate();
  const navigateToDisplayPage = () => {
    navigate("/portfolio/" + localStorage.getItem("userId"));
  };

  function navigateToHome() {
    navigate("/");
  }
  return (
    <div>
      <div>
        <Accordion defaultExpanded >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              height: "40px",
              backgroundColor: "#C7CECB"
            }}
          >
            <Typography >
              <span className='acc-header'>Personal Details</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <PersonalDetails></PersonalDetails>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              height: "40px",
              backgroundColor: "#C7CECB"
            }}
          >
            <Typography className='acc-header'>
              <span className='acc-header'>Educational BackGround </span>
               </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <EducationalBG></EducationalBG>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              height: "40px",
              backgroundColor: "#C7CECB"
            }}
          >
            <Typography className='acc-header'>
              <span className='acc-header'>Professional BackGround </span>
              </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ProfessionalBG></ProfessionalBG>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              height: "40px",
              backgroundColor: "#C7CECB"
            }}
          >
            <Typography className='acc-header'>
              <span className='acc-header'>Work Experience </span>
              </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ExperienceForm ></ExperienceForm>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              height: "40px",
              backgroundColor: "#C7CECB"
            }}
          >
            <Typography className='acc-header'>
              <span className='acc-header'>Project Work</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ProjectWork></ProjectWork>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              height: "40px",
              backgroundColor: "#C7CECB"
            }}
          >
            <Typography className='acc-header'>
              <span className='acc-header'>Interest </span>
              </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <InterestForm></InterestForm>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              height: "40px",
              backgroundColor: "#C7CECB"
            }}
          >
            <Typography className='acc-header'>
              <span className='acc-header'>Skills </span>
              </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Skills></Skills>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              height: "40px",
              backgroundColor: "#C7CECB"
            }}
          >
            <Typography className='acc-header'>
              <span className='acc-header'>Recommendation </span>
              </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <AddRecommendationForm></AddRecommendationForm>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              height: "40px",
              backgroundColor: "#C7CECB"
            }}
          >
            <Typography className='acc-header'>
          <span className='acc-header'>Certification </span>
          </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <AddCertificationForm></AddCertificationForm>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              height: "40px",
              backgroundColor: "#C7CECB"
            }}
          >
            <Typography className='acc-header'>
              <span className='acc-header'>Contact Details</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Contact></Contact>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <div className="bm-cta-container mt-4">
          <a className="bm-cta__cta" href="#" onClick={navigateToDisplayPage}>
            <span>Display portfolio</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default PortfolioMaker;
