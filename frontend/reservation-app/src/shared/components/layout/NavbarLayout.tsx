import { ConstAppRoute } from "@const/appRoutes.const";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router";

const NavbarLayout = () => {
  return (
    <Navbar bg="primary" expand="md" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to={ConstAppRoute.Root}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to={ConstAppRoute.Client}>
              Clients
            </Nav.Link>
            <Nav.Link as={NavLink} to={ConstAppRoute.EventTypes}>
              Events
            </Nav.Link>
            <Nav.Link as={NavLink} to={ConstAppRoute.Reservations}>
              Reservations
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarLayout;
