import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import LeafMap from "./LeafMaps";

function Home() {
  return (
    <Container fluid>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            San Francisco Movie Locations Challenge
          </Navbar.Brand>
        </Container>
      </Navbar>
      <LeafMap></LeafMap>
    </Container>
  );
}

export default Home;
