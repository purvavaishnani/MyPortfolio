import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { json } from 'stream/consumers';
import './EducationalBG.css';

type AddProps = {
  school: string;
  college: string;
  masters:string;
  collegeCourse:string;
  mastersCourse:string;
  additional:string;
};

const ShowEducation = () => {
  const { userId } = useParams();
  const [school, setSchool] = useState('');
  const [college, setCollege] = useState('');
  const [masters, setMasters] = useState('');
  const [course, setCourse] = useState('');
  const [masterCourse, setMasterCourse] = useState('');
  const [additional, setAdditional] = useState('');

  const [result, setResult] = useState<AddProps[]>([]);

  useEffect(() => {
    const api = async () => {
      const data = await fetch("https://myportfolio-be.herokuapp.com/api/getCourse/" + userId, {
        method: "GET"
      });
      const jsonData = await data.json();
      console.log(jsonData);
      setSchool(jsonData.school);
      setCollege(jsonData.college);
      setCourse(jsonData.course);
      setMasters(jsonData.masters);
      setMasterCourse(jsonData.masterCourse);
      setAdditional(jsonData.additional);
    };

    api();
  }, []);
  console.log(result);
  
  return (
    <section id="education" className="education section-bg">
      <div className="testimonial-item showEducation">
      <div className="container">
        <div className="education-title">
          <h2>Educational Background</h2>
          <p></p>
        </div>

        <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
          <div className="swiper-wrapper">
            
            <div className="swiper-slide">
              <div className="educational-item">
              <span style={{color:'black'}}>School: </span>{school}<br></br>
                    <span style={{color:'black'}}>College Degree: </span>{college}<br></br>
                    <span style={{color:'black'}}>College Course: </span>{course}<br></br>
                    <span style={{color:'black'}}>Master's Degree: </span>{masters}<br></br>
                    <span style={{color:'black'}}>Master's Course: </span>{masterCourse}<br></br>
                    <span style={{color:'black'}}>Additional : </span>{additional}<br></br>
      
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

export default ShowEducation;
