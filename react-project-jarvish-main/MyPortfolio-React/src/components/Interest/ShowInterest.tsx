import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { json } from 'stream/consumers';
import './Interest.css';

type AddProps = {
  hobby:string
};

const ShowInterest = () => {
  const { userId } = useParams();
  const [interest, setInterest] = useState('');
 

  const [result, setResult] = useState<AddProps[]>([]);

  useEffect(() => {
    const api = async () => {
      const data = await fetch("https://myportfolio-be.herokuapp.com/api/getInterest/" + userId, {
        method: "GET"
      });
      const jsonData = await data.json();
      console.log(jsonData);
      setInterest(jsonData.interest);
    };

    api();
  }, []);
  console.log(result);
  
  return (
    <section id="interest" className="interest section-bg">
      <div className="testimonial-item showInterest">
      <div className="container">
        <div className="interest-title">
          <h2> Interest </h2>
          <p></p>
        </div>

        <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
          <div className="swiper-wrapper">
            
            <div className="swiper-slide">
              <div className="interest-item">
              <span style={{color:'black'}}>Interest: </span>{interest}<br></br>
              
              </div>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
        </div>
      </div>
    </section>
  );
  
};

export default ShowInterest;
