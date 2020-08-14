import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useWindowSize from '../../utils/useWindowSize';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { logoutUser } from "../../actions/authActions";

export const Navbar = ({
    isAuthenticated,
    logoutUser
}) => {
    const history = useHistory();
    const windowSize = useWindowSize();
    const [showLogin, setShowLogin] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [onMobile, setOnMobile] = useState(windowSize.width < 850);

    useEffect(() => {
        setOnMobile(windowSize.width < 850)
    }, [windowSize])
    
    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    const handleLogout = e => {
        e.preventDefault();
        logoutUser();
    };

    return (
        <nav className="c-nav c-nav--primary c-nav--alternate">
            <div className="c-nav__row c-container">
                <a href="/" className="c-hplogo">
                    <svg 
                        version="1.1" 
                        id="Layer_1_1_" 
                        x="0px" y="0px" 
                        viewBox="0 0 16 16" 
                        // style="enable-background:new 0 0 16 16;" 
                        >
                        <polygon points="0,5 8,9 15,5.5 15,14 16,14 16,5 8,1 "/>
                        <polygon points="3,7.059 3,11.5 8,14 13,11.5 13,7.059 8,9.559 "/>
                    </svg>
                    <span className="c-hplogo-white" >HP EDU</span>
                </a>
                {
                    !onMobile &&
                    <nav className="c-nav_list">
                        <ul className="c-nav-ul">
                            <li className="c-nav--primary-li"><span>INFO</span></li>
                            <li className="c-nav--primary-li"><span>INFO1</span></li>
                            <li className="c-nav--primary-li"><span>INFO2</span></li>
                            <li className="c-nav--primary-li"><span>INFO3</span></li>
                        </ul> 
                    </nav>
                }
                <div className="c-nav-btn-container">
                    {!onMobile ? 
                            !isAuthenticated ? 
                            <>
                                <button className="btn-secondary" onClick={() => history.push('/login')}>Logga in</button>
                                <button className="btn-primary" onClick={() => history.push('/signup')} >Kom igång gratis</button>
                            </>
                            :
                                <button className="btn-secondary" onClick={handleLogout}>Logga ut</button>
                    : <button 
                        className="hamburger-btn"
                        onClick={toggleExpanded}
                        >
                        <svg 
                            width="24"
                            height="17"
                            viewBox="0 0 24 17" 
                            xmlns="http://www.w3.org/2000/svg" 
                            aria-label="" class="svg-replaced" 
                            shape-rendering="geometricPrecision">
                                <path d="M0 0h24v3H0zm0 7h24v3H0zm0 7h24v3H0z" 
                                fill-rule="evenodd">
                                </path>
                        </svg>
                      </button>}
                </div>
            </div>
            {
                onMobile &&
                <nav className={`c-nav_mobile ${expanded ? 'is-open' : 'is-hidden'}`}>
                    <div className="c-nav_toolbar">
                        <a href="/" className="c-hplogo">
                            <svg 
                                version="1.1" 
                                id="Layer_1_1_" 
                                x="0px" y="0px" 
                                viewBox="0 0 16 16" 
                                // style="enable-background:new 0 0 16 16;" 
                                >
                                <polygon points="0,5 8,9 15,5.5 15,14 16,14 16,5 8,1 "/>
                                <polygon points="3,7.059 3,11.5 8,14 13,11.5 13,7.059 8,9.559 "/>
                            </svg>
                            <span className="c-hplogo-white" >HP EDU</span>
                        </a>
                        <button className="hamburger-btn-close" onClick={toggleExpanded}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="-255 347 100 100" 
                            width="18" 
                            aria-label="Close Navigation"
                            class="svg-replaced" 
                            shape-rendering="geometricPrecision">
                                <path
                                d="M-160.4 434.2l-37.2-37.2 37.1-37.1-7-7-37.1 37.1-37.1-37.1-7 7 37.1 37.1-37.2 37.2 7.1 7 37.1-37.2 37.2 37.2">
                                </path>
                        </svg>
                        </button>
                    </div>
                    <div className="c-nav_scroller">
                        <nav className="c-nav_list is-mobile">
                            <ul>
                                <li>mobile nav content</li>
                                <li>mobile nav content</li>
                                <li>mobile nav content</li>
                                <li>mobile nav content</li>
                            </ul>
                        </nav>
                    </div>
                    <div className="c-nav-btn-container">
                        <div className="c-feature-grid">
                            <button className="btn-secondary">
                                Registrera
                            </button>
                            <button className="btn-primary">
                                Logga in
                            </button>
                        </div>
                    </div>
                </nav>
            }
        </nav>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired
}; 


export default connect(mapStateToProps, { logoutUser })(Navbar);
