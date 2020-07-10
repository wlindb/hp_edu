import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const SocialMediaContainer = () => {
    return (
        <div className="social-container">
            <a href="/api/users/auth/facebook" className="social"><FontAwesomeIcon icon={faFacebook} /></a>
            <a className="social" href='/api/users/auth/google'><i className="fab fa-google fa-3x"></i></a>
        </div>
    )
};

export default SocialMediaContainer;
