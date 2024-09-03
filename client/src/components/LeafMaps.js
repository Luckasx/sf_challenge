import {
  MapContainer, TileLayer, Marker, Popup
} from 'react-leaflet';

import { useMap } from 'react-leaflet';

import { useEffect, useState } from 'react';

function MapChild(props) {

  const map = useMap()

  // Initialisiere den Zustand mit den initialen Props
  useEffect(() => {
    const updateMap = () => {
      console.log(props.location, map)
      map.setView(props.location, map.getZoom(), {
      })
    }

    updateMap();
  }, [props.location, map]);

  return null
}

function LeafMap(props) {

  const [position, setPosition] = useState([37.78, -122.45]);
  
  useEffect(() => {
    const updateMap = () => {
      setPosition([props.location.lat, props.location.lng])
    }

    updateMap();
  }, [props.location]);




  return (
    <MapContainer center={position} zoom={12} scrollWheelZoom={true}>
      { props.locationName !== '' && <Marker position={position}>
        <Popup>{props.locationName}</Popup>
      </Marker>}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapChild location={props.location}></MapChild>
    </MapContainer>
  );
}

export default LeafMap;