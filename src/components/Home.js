import React from "react";
import { Row, Col } from "react-bootstrap";

import { FaBeer, FaAppleAlt, FaBrain } from "react-icons/fa";

export default function Home() {
  return (
    <div className="home">
      <h1>What is HealthHood?</h1>
      <h2>
        Do you think healthy food, mental health support, exercise classes, and
        activities should be available to everyone <strong>for free</strong> ?
      </h2>
      <h2>So do we!</h2>
      <h3>
        Look through the <a href="/Map">map</a> and explore all the FREE
        community resources available. If It's not free, it's not here. If it's
        here, it's for everyone.
      </h3>
      <h3>
        <i>
          With the Covid-19 pandemic, many free community resources are
          unavailable; free in person counselling, free exercise classes, and
          other free activites are cancelled. While the Covid-19 pandemic has
          cancelled many in person services, available online resources are
          found in <a href="/Online">Online Resources</a>.
        </i>
      </h3>
      <Row>
        <Col>
          <FaAppleAlt />
          <h3>Free food in your community.</h3>
          <p>
            Need groceries? A hot meal? Explore the community ressources
            available such as
          </p>
          <ul>
            <li>Rescued groceries</li>
          </ul>
        </Col>
        <Col>
          <FaBrain />
          <h3>Free mental health support.</h3>
          <p>
            Free food in your community. Need groceries? A hot meal? Explore the
            community ressources available such as
          </p>
          <ul>
            <li>Rescued groceries</li>
          </ul>
        </Col>
      </Row>
    </div>
  );
}
