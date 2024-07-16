import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import LeafMap from "./LeafMaps";
import MovieSearch from './MovieSearch'

function Home() {

  const handleSelect = (data) => {
    console.log("Home HandleSelect", data);
  }

  return (
    <Container fluid>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            San Francisco Movie Locations Challenge
          </Navbar.Brand>
         <MovieSearch onChange={handleSelect} />
        </Container>
      </Navbar>
      <LeafMap expand="lg"></LeafMap>
    </Container>
  );
}

export default Home;
