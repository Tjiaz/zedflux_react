//
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./index.css";

const TopBar = () => {
  return (
    <section id="topbar" className="topbar d-flex align-items-center">
      <Container>
        <Row className="justify-content-center justify-content-md-between">
          <Col className="d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center me-1"></i>
            <a
              href="mailto:info@zedfluxtechnologies.com"
              className="text-nowrap"
            >
              info@zedfluxtechnologies.com
            </a>
            <i className="bi bi-phone d-flex align-items-center ms-1"></i>
            <span className="text-nowrap">+1 5589 55488 55</span>
          </Col>
          <Col className="d-none d-md-flex justify-content-end align-items-center">
            <a href="#" className="nav-link me-3">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="nav-link me-3">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="nav-link me-3">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="nav-link ">
              <i className="bi bi-linkedin"></i>
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TopBar;
