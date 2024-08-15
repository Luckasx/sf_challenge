import { useState } from 'react';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import LeafMap from "./LeafMaps";
import MovieSearch from './MovieSearch'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LocationsCollapse from "./LocationsCollapse";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Modal from 'react-bootstrap/Modal';
import {SquareLoader} from 'react-spinners';

function Home() {

  const [locations, setLocations] = useState([]);

  const [show, setShow] = useState(false);

  let [loading, setLoading] = useState(false);

  const [movieTitle, setMovieTitle] = useState("");

  const colMaps = locations.length > 0 ? 9 : 12;

  const COORDINATES_URI = '/api/coordinates/'

  const handleSelect = async (data) => {

    setLoading(true)

    console.log("Home HandleSelect", data);

    if (data[0]?.Title) {
      let resp = await fetch(`${COORDINATES_URI}?movie=${data[0].Title}`);

      setLoading(false)

      const d = await resp.json();

      console.log(d)

      if (d.items.length === 0) {

        setLocations([])
        setMovieTitle(false)
        setShow(true);
        return;
      }

      setLocations(d.items)

      setMovieTitle(data[0] === undefined ? "" : data[0].Title)
    }

    setLoading(false);

  }


  return (
    <Container fluid>
      <Row>
        <ToastContainer
          position="top-end"
        >
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg="warning">
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">:(</strong>
            </Toast.Header>
            <Toast.Body>No locations found for this movie.</Toast.Body>
          </Toast>
        </ToastContainer>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">
              San Francisco Movie Locations Challenge
            </Navbar.Brand>
            <MovieSearch location="" onChange={handleSelect} />

            <Modal show={loading} >
              <Modal.Body>Searching...<SquareLoader /></Modal.Body>              
            </Modal>
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Col lg={colMaps}>
          <LeafMap expand="lg"></LeafMap>
        </Col>
        <Col lg={3}>
          <LocationsCollapse open={locations.length > 0} locations={locations} movie={movieTitle}></LocationsCollapse>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
