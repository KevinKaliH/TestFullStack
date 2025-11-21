import { ConstAppRoute } from "@const/appRoutes.const";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router";

const NavbarLayout = () => {
  return (
    <Navbar bg="primary" expand="md" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to={ConstAppRoute.Root}>
          Eventos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to={ConstAppRoute.Client}>
              Clientes
            </Nav.Link>
            <Nav.Link as={NavLink} to={ConstAppRoute.Reservations}>
              Reservaciones
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarLayout;
