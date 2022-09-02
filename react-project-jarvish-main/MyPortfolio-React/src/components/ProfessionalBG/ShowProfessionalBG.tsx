import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { json } from 'stream/consumers';
import './ProfessionalBG.css'

type AddProps = {
  field: string;
  orgName: string;
  position:string;
  technology:string;
  timeFrom:string;
  timeTo:string;
};

const ShowProfessional = () => {
  const { userId } = useParams();
  const [field, setField] = useState('');
  const [orgName, setOrgName] = useState('');
  const [position, setPosition] = useState('');
  const [technology, setTechnology] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');

  const [result, setResult] = useState<AddProps[]>([]);

  useEffect(() => {
    const api = async () => {
      const data = await fetch("https://myportfolio-be.herokuapp.com/api/getField/" + userId,{
        method: "GET"
      });
      const jsonData = await data.json();
      console.log(jsonData);
      setField(jsonData.field);
      setOrgName(jsonData.orgName);
      setPosition(jsonData.position);
      setTechnology(jsonData.technology);
      setTimeFrom(jsonData.timeFrom);
      setTimeTo(jsonData.timeTo);
    };

    api();
  }, []);
  console.log(result);
  
  return (
    <section id="professional" className="professional section-bg">
      <div className="testimonial-item showProfessional">
      <div className="container">
        <div className="professional-title">
          <h2>Professional Background</h2>
          <p></p>
        </div>

        <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
          <div className="swiper-wrapper">
            
            <div className="swiper-slide">
              <div className="professional-item">
              <span style={{color:'black'}}>Field: </span>{field}<br></br>
                    <span style={{color:'black'}}>Organization Name: </span>{orgName}<br></br>
                    <span style={{color:'black'}}>Posiiton: </span>{position}<br></br>
                    <span style={{color:'black'}}>Technology: </span>{technology}<br></br>
                    <span style={{color:'black'}}>Duration </span>
                    <span style={{color:'black'}}>From: </span>{timeFrom}<br></br>
                    <span style={{color:'black'}}>To: </span>{timeTo}<br></br>
      
              </div>
            </div>
          </div>
          
        </div>
        </div>
      </div>
    </section>
  );
  
};

export default ShowProfessional;
