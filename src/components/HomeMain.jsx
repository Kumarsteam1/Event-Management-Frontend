import React from "react";
import Screen from "../assets/screen.png";
import Screen2 from "../assets/imgone.png";
import Screen3 from "../assets/imgtwo.png";
import Star from "../assets/star.png"

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

import { FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaDiceD6 } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    text: "Amazing tool! Saved me months",
    description:
      "This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
    name: "John Master",
    position: "Director, Spark.com",
    bgColor: "dark"
  },
  {
    id: 2,
    text: "Amazing tool! Saved me months",
    description:
      "This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
    name: "John Master",
    position: "Director, Spark.com",
    bgColor: "light"
  },
  {
    id: 3,
    text: "Amazing tool! Saved me months",
    description:
      "This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
    name: "John Master",
    position: "Director, Spark.com",
    bgColor: "light"
  },
  {
    id: 4,
    text: "Amazing tool! Saved me months",
    description:
      "This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
    name: "John Master",
    position: "Director, Spark.com",
    bgColor: "dark"
  }
];


function HomeMain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); 

  const handleSignUpClick = () => {
    if (user) {
      dispatch(logout());
    }

    navigate("/signup");
  };

  return (
    <>
      <div className="home-main">
        <div className="intro">
          <h1>
            CNNCT – Easy <br />
            Scheduling Ahead
          </h1>
          <button className="signup-btn" onClick={handleSignUpClick}>
            Sign up free
          </button>
        </div>

        <img src={Screen} alt="Scheduling Screen" className="main-image" />

        <div className="info-section">
          <h2>Simplified scheduling for you and your team</h2>
          <p>
            CNNCT eliminates the back-and-forth of scheduling meetings so you can
            focus on what matters. Set your availability, share your link, and let
            others book time with you instantly.
          </p>
        </div>
      </div>

      <div>
        <div className="event-container-home">
          <div className="event-scheduling">
            <h2>Stay Organized with Your Calendar & Meetings</h2>
            <h3>Seamless Event Scheduling</h3>
            <ul>
              <li>View all your upcoming meetings and appointments in one place</li>
              <li>Syncs with Google Calendar, Outlook, and iCloud to avoid conflicts.</li>
              <li>
                Customize event types: one-on-ones, team meetings, group sessions, and webinars.
              </li>
            </ul>
          </div>

          <div className="event-images">
            <img src={Screen2} alt="Calendar Sync Example" />
          </div>
        </div>
      </div>

      <div>
        <div className="random-text">
          <div className="random-main-text">Here's what our <span>customer</span> has to says</div>

          <div className="random-little-text">
            <img src={Star} alt="Star Img"/>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, in aut! Iusto nulla sint provident voluptate quas veritatis natus quod.</span>
          </div>
        </div>

        <button className="random-button">
          Read customer stories
        </button>
      </div>

      <div className="testimonials-container">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className={`testimonial-card ${testimonial.bgColor}`}>
          <h3>{testimonial.text}</h3>
          <p>{testimonial.description}</p>
          <div className="testimonial-footer">
            <div className="avatar"></div>
            <div className="card-content">
              <strong>{testimonial.name}</strong>
              <br />
              <span>{testimonial.position}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <footer className="footer-container">
      <div className="footer-top-links">
      <div className="footer-top">
        <button className="btn login">Log in</button>
        <button className="btn signup">Sign up free</button>
      </div>
      <div className="footer-links">
        <div>
          <p>About CNNCT</p>
          <p>Blog</p>
          <p>Press</p>
          <p>Social Good</p>
          <p>Contact</p>
        </div>
        <div>
          <p>Careers</p>
          <p>Getting Started</p>
          <p>Features and How-Tos</p>
          <p>FAQs</p>
          <p>Report a Violation</p>
        </div>
        <div>
          <p>Terms and Conditions</p>
          <p>Privacy Policy</p>
          <p>Cookie Notice</p>
          <p>Trust Center</p>
        </div>
      </div>
      </div>
      <div className="footer-bottom">
        <p>
          We acknowledge the Traditional Custodians of the land on which our office stands,
          The Wurundjeri people of the Kulin Nation, and pay our respects to Elders past, present and emerging.
        </p>
        <div className="social-icons">
          <FaTwitter />
          <FaInstagram />
          <FaYoutube />
          <FaTiktok />
          <FaDiceD6 />
        </div>
      </div>
    </footer>
    </>
  );
}

export default HomeMain;
