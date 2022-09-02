import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { json } from 'stream/consumers';
import './Recommendation.css';

type AddProps = {
  fullName: string;
  position: string;
  contactNo:string;
  email:string;
  letter:string;
};

const ShowRecommendation = () => {
  const { userId } = useParams();
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [contactNo, setcontactNo] = useState('');
  const [email, setEmail] = useState('');
  const [letter, setLetter] = useState('');

  const [result, setResult] = useState<AddProps[]>([]);

  useEffect(() => {
    const api = async () => {
      const data = await fetch("https://myportfolio-be.herokuapp.com/api/get_recommendation/" + userId, {
        method: "GET"
      });
      const jsonData = await data.json();
      console.log(jsonData);
      setFullName(jsonData.fullName);
      setPosition(jsonData.position);
      setcontactNo(jsonData.contactNo);
      setEmail(jsonData.emailId);
      setLetter(jsonData.messageContent);
    };

    api();
  }, []);
  console.log(result);
  
  return (
    <section id="recommendation" className="testimonials section-bg">
      <div className="testimonial-item showRecommendation">
      <div className="container">
        <div className="recommend-title">
          <h2>Co-Workers Recommendation</h2>
          <p></p>
        </div>

        <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              
                  {/* <i className="bx bxs-quote-alt-left quote-icon-left"></i> */}
                    <span style={{color:'black'}}>Name: </span>{fullName}<br></br>
                    <span style={{color:'black'}}>Position: </span>{position}<br></br>
                    <span style={{color:'black'}}>Contact Number: </span>{contactNo}<br></br>
                    <span style={{color:'black'}}>Email: </span>{email}<br></br>
                    <span style={{color:'black'}}>Letter Of Recommendation: </span>{letter}<br></br>
                  {/* <i className="bx bxs-quote-alt-right quote-icon-right"></i> */}
              </div>
            </div>
          </div>
          {/* <div className="swiper-pagination"></div> */}
        </div>
<br></br>
      </div>
    </section>
  );
};

export default ShowRecommendation;
