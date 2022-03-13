import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Particles from 'react-tsparticles';

const Landing = () => {
    const particlesInit = (main) => {};
    
    const particlesLoaded = (container) => {};

    const particleOptions = {
        // background: {
        //   color: {
        //     value: "#0d47a1",
        //   },
        // },
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
              opacity: 0.8,
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
            opacity: 0.5,
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
            speed: 3,
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
        <Container fluid className='mt-60'>
          {/* Stack the columns on mobile by making one full-width and the other half-width */}
          <Row className='justify-content-lg-center' style={{marginTop: '80px'}}>
            <Col className='text-center' xxl lg={8}>
              <h1 className='light-header'>TODO: MAKE LARGE BOLD</h1>
            </Col>
          </Row>

          {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
          <Row>
            <Col xs={6} md={4}>
              xs=6 md=4
            </Col>
            <Col xs={6} md={4}>
              xs=6 md=4
            </Col>
            <Col xs={6} md={4}>
              xs=6 md=4
            </Col>
          </Row>

          {/* Columns are always 50% wide, on mobile and desktop */}
          <Row>
            <Col xs={6}>xs=6</Col>
            <Col xs={6}>xs=6</Col>
          </Row>
        </Container>
      </>
    )
}

export default Landing;
