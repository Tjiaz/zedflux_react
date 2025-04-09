import React from "react";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "./index.css";
const TopBar = () => {
  return (
    <section id="topbar" className="topbar d-flex align-items-center">
      <Container>
        <Row className="justify-content-center justify-content-md-between">
          <Navbar expand="lg">
            <Nav className="mr-auto">
              <Nav.Item>
                <Nav.Link href="mailto:info@zedfluxtechnologies.com">
                  <i className="bi bi-envelope d-flex align-items-center m-lg-2"></i>
                  info@zedfluxtechnologies.com
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <i className="bi bi-phone d-flex align-items-center ms-4 m-lg-2"></i>
                  +1 5589 55488 55
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="d-none d-md-flex align-items-center">
                <Nav.Link href="#" className="nav-link">
                  <i className="bi bi-twitter"></i>
                </Nav.Link>
                <Nav.Link href="#" className="nav-link">
                  <i className="bi bi-facebook"></i>
                </Nav.Link>
                <Nav.Link href="#" className="nav-link">
                  <i className="bi bi-instagram"></i>
                </Nav.Link>
                <Nav.Link href="#" className="nav-link">
                  <i className="bi bi-linkedin"></i>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar>
        </Row>
      </Container>
    </section>
  );
};

export default TopBar;
