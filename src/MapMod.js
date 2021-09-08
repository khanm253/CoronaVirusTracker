import React from 'react'
import './Map.css'
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { showDataOnMap } from './util';

function MapMod({countries, casesType, center, zoom}) {
    
    function ChangeView({ mapCenter, mapZoom }) {
        const thisMap = useMap();
        thisMap.setView(mapCenter, mapZoom);
        return null;
    }
    
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
                <ChangeView mapCenter={center} mapZoom={zoom} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {/*Loop through countries and draw circles*/}
                {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    )
}

export default MapMod
