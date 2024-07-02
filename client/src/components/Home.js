import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Home() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">San Francisco Movie Locations Challenge</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Home;
