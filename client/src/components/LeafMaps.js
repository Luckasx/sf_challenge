import {
  MapContainer, TileLayer, Marker, Popup
} from 'react-leaflet';

import { useMap } from 'react-leaflet';

import { useEffect } from 'react';



function MapChild(props) {
  const map = useMap()
  // console.log('map center:', map.getCenter())


  // Initialisiere den Zustand mit den initialen Props
  useEffect(() => {
    const updateMap = () => {
      console.log(props.location, map)
    }

    updateMap();
  }, [props.location, map]);

  return null
}

function LeafMap(props) {

  const position = [51.505, -0.09];

  return (
    <MapContainer center={position} zoom={12} scrollWheelZoom={false}>
      <Marker position={position}>
        <Popup>Hello World</Popup>
      </Marker>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapChild location={props.location}></MapChild>
    </MapContainer>
  );
}

export default LeafMap;