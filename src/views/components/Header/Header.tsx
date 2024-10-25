import { Nav, Navbar, Container } from "react-bootstrap";
import ScreenNameConfig from "../../../configs/ScreenNameConfig";

export default function HeaderComponent() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href={ScreenNameConfig.HOME}>LanggomSport</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link  href={ScreenNameConfig.HOME}>Home</Nav.Link>
        <Nav.Link href={ScreenNameConfig.PRODUCTS}>Products</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  );
}
