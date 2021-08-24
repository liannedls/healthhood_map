import React from "react";
import { Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <div className="online">
      <Row>
        <Col className="first-col">
          <h1>Mental Health Support</h1>

          <button className="btn btn-info">
            <a href="https://www.ontario.ca/page/find-mental-health-support">
              Ontario Mental Health Support
            </a>
          </button>
        </Col>
        <Col className="second-col">
          <h1>Free Activity</h1>
          <button className="btn btn-info">
            <a href="https://www.ontario.ca/page/find-mental-health-support">
              Ontario Mental Health Support
            </a>
          </button>
        </Col>
        <Col classname="third-col">
          <h1>Other Free Resources</h1>
          <div>
            <button className="btn btn-info">
              <a href="https://buynothingproject.org/">Buy Nothing Project</a>
            </button>
          </div>
          <div>
            <button className="btn btn-info">
              <a href="https://www.ontario.ca/page/find-mental-health-support">
                Ottawa Public Library
              </a>
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
