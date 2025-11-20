import { Outlet } from "react-router";
import NavbarLayout from "./NavbarLayout";
import { Container } from "react-bootstrap";

const AppLayout = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <NavbarLayout />
      <Container className="mt-3">
        <Outlet />
      </Container>
    </div>
  );
};

export default AppLayout;
