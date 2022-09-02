import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { json } from 'stream/consumers';
import './Certification.css';

type AddProps = {
    certificationName: string;
    organizationName: string;
    startDate: string;
    endDate: string;
    description: string;
};

const ShowRecommendation = () => {
    const { userId } = useParams();
    const [certificationName, setcertificationName] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');

  const [result, setResult] = useState<AddProps[]>([]);

  useEffect(() => {
    const api = async () => {
      const data = await fetch("https://myportfolio-be.herokuapp.com/api/get_certification/" + userId, {
        method: "GET"
      });
      const jsonData = await data.json();
      console.log(jsonData);
      setcertificationName(jsonData.certificationName);
      setOrganizationName(jsonData.organizationName);
      setStartDate(jsonData.startDate);
      setEndDate(jsonData.endDate);
      setDescription(jsonData.description);
    };

    api();
  }, []);
  console.log(result);
  
  return (
    <section id="certification" className="certification section-bg">
      
      <div className="testimonial-item showCertification">
      <div className="container">
        <div className="certi-title">
          <h2>Certifications</h2>
          <p></p>
        </div>

        <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              
                  <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                    <span style={{color:'black'}}>Certification Name: </span>{certificationName}<br></br>
                    <span style={{color:'black'}}>Organization Name: </span>{organizationName}<br></br>
                    <span style={{color:'black'}}>Start Date: </span>{startDate}<br></br>
                    <span style={{color:'black'}}>End Date: </span>{endDate}<br></br>
                    <span style={{color:'black'}}>Description: </span>{description}<br></br>
                  <i className="bx bxs-quote-alt-right quote-icon-right"></i>
              </div>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>

      </div>
    </section>
  );
};

export default ShowRecommendation;
