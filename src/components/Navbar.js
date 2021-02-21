import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Form, Button, FormControl } from "react-bootstrap";

export default function TopNav() {
  return (
    <>
      <Navbar bg="info" fixed="top">
        <Navbar.Brand>HealthHood</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">About</Nav.Link>
          <Nav.Link href="/Map">Free Map</Nav.Link>
          <Nav.Link href="/Online">Online Resources</Nav.Link>
          <Nav.Link href="/Submit">Submit a Place </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar>
    </>
  );
}
