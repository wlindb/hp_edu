import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Particles from 'react-tsparticles';

const Landing = () => {
    const particlesInit = (main) => {};
    
    const particlesLoaded = (container) => {};

    const particleOptions = {
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.9,
              size: 40,
            },
            push: {
              quantity: 2,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#a2a2a2",
          },
          links: {
            color: "#a2a2a2",
            distance: 250,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 40,
          },
          opacity: {
            value: 0.1,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      };

    return (
      <>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particleOptions}
        />
        <Container fluid='lg' style={{color: 'white'}}>
          <Row className='justify-content-sm-center px-5 mx-5' >
            <Col className='text-center' >
              <h1 className='fw-bold lh-lg'>BRILJERA PÅ <span className='badge-primary-color'>HÖGSKOLEPROVET</span></h1>
              <Container fluid='sm' className='px-5'>
                <p className='text-center fs-5 w-50 mx-auto'>
                  Förbättra dig på högskoleprovet genom av att bemästra ett delmoment i taget.
                  Förbättra dig på högskoleprovet genom av att bemästra ett delmoment i taget.
                  Förbättra dig på högskoleprovet genom av att bemästra ett delmoment i taget.
                </p>
              </Container>
            </Col>
          </Row>
        </Container>
      </>
    )
}

export default Landing;
