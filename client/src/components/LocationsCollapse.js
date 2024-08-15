import Container from "react-bootstrap/Container";
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';

function LocationsCollapse(props) {

    console.log(props)

    return (
        <Collapse in={props.open} dimension="width">
            <Container>
                <h4>{props.movie} Locations</h4>

                {props.locations.map((location) => (

                    <div id="example-collapse-text" key={location.Coordinates}>
                        <Card body style={{ width: '400px' }}>
                            {location.Locations}
                        </Card>
                    </div>

                ))}
            </Container>
        </Collapse>
    )
}

export default LocationsCollapse;