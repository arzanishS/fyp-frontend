
import React, { useRef, useState, forwardRef } from 'react'
import { InfoWindow, Map, Marker } from 'google-maps-react'
import { EnvironmentOutlined } from '@ant-design/icons'
import Geocode from "react-geocode";
import './styles.scss'

Geocode.setApiKey('AIzaSyCjj_sEOdMWKxHX-EntH6gf-L0beRa9Ubo')
    // set response language. Defaults to english.
    Geocode.setLanguage("en");

const Maps = forwardRef((props, ref) => {
  const { google, styles, setValue } = props
  const [showingInfoWindow, setShowingInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState({})
  const [selectedPlace, setSelectedPlace] = useState({})
  const mapRef = useRef(null)
  const [position] = useState({ lat: 53.1424, lng: 7.6921 })
  const [zoom] = useState(7)

  const onMarkerClick = (props, marker) => {
    setActiveMarker(marker)
    setSelectedPlace(props)
    setShowingInfoWindow(true)
  }

  const onInfoWindowClose = () => {
    setActiveMarker(null)
    setShowingInfoWindow(false)
  }

  const onMapClicked = () => {
    if (!showingInfoWindow) return
    setActiveMarker(null)
    setShowingInfoWindow(false)
  }

  const onMarkerDragEnd = (coord) => {

    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setValue(address)
      },
      (error) => {
        console.error(error);
      }
    );
    //console.log(lat, lng)
  };

  return (
    <div className='Map' style={styles}>
      <Map
        scrollwheel={false}
        panControl
        zoomControl
        ref={mapRef}
        google={google}
        onClick={onMapClicked}
        center={position}
        initialCenter={position}
        zoom={zoom}
      >
          <Marker
            onClick={onMarkerClick}
            draggable={true}
            onDragend={(t, map, coord) => onMarkerDragEnd(coord)}
          />
        <InfoWindow
          marker={activeMarker}
          onClose={onInfoWindowClose}
          visible={showingInfoWindow}
        >
          <div className='info-box'>
            {selectedPlace.perkName && <p className='bold'>{selectedPlace.perkName}</p>}
            {selectedPlace.companyName && <p>{selectedPlace.companyName}</p>}
            {selectedPlace.name &&
              <p>
                <span className='mr-5'>
                  <EnvironmentOutlined />
                </span>
                {selectedPlace.name}
              </p>}
            <div className='text-center'>
              <button type='button' className='direction-btn'><a href={`https://www.google.com/maps/search/?api=1&query=${selectedPlace.name}`} target='_blank' rel='noopener noreferrer'>Get Direction</a></button>
            </div>
          </div>
        </InfoWindow>
      </Map>
    </div>
  )
})

export default Maps
