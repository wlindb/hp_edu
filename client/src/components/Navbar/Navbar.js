import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux'

export const Navbar = (
    auth
) => {
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
                <nav className="c-nav_list">
                    <ul className="c-nav-ul">
                        <li className="c-nav--primary-li"><span>INFO</span></li>
                        <li className="c-nav--primary-li"><span>INFO1</span></li>
                        <li className="c-nav--primary-li"><span>INFO2</span></li>
                        <li className="c-nav--primary-li"><span>INFO3</span></li>
                    </ul> 
                </nav>
                <div className="c-nav-btn-container">
                    <button className="btn-primary">Kom igång gratis</button>
                </div>
                <button style={{visibility: 'hidden'}}>hamburger</button>
            </div>
            <nav style={{visibility: 'hidden'}}>
                <div>
                    <a>toolbar logo</a>
                    <button>close btn</button>
                </div>
                <div >
                    <nav>
                        <ul>
                            <li>mobile nav content</li>
                            <li>mobile nav content</li>
                            <li>mobile nav content</li>
                            <li>mobile nav content</li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <div>
                        <button>
                            Registrera
                        </button>
                        <button>
                            Logga in
                        </button>
                    </div>
                </div>
            </nav>
        </nav>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
}; 


export default connect(mapStateToProps, {  })(Navbar);
