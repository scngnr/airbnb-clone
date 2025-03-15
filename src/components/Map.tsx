"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

interface MapProps {
    center: number[];
}

const Map = ({ center }: MapProps) => {
    return (
        <MapContainer
            center={center as L.LatLngExpression || [51, -0.9]}
            zoom={center ? 4 : 2}
            scrollWheelZoom={false}
            className="h-[35vh] rounded-lg"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {center && (
                <Marker position={center}>
                    
                </Marker>
            )}
        </MapContainer>
    );
}

export default Map;
