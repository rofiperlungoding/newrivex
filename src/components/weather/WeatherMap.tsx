import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface WeatherMapProps {
    lat: number;
    lon: number;
    locationName: string;
}

function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    map.setView(center, 10);
    return null;
}

export function WeatherMap({ lat, lon, locationName }: WeatherMapProps) {
    return (
        <div className="h-[400px] w-full rounded-3xl overflow-hidden border border-white/10 relative z-0">
            <MapContainer
                center={[lat, lon]}
                zoom={10}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
                attributionControl={false}
            >
                <ChangeView center={[lat, lon]} />

                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Smart Dark">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            className="map-tiles-smart-dark"
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Midnight Dark">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Satellite">
                        <TileLayer
                            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                <Marker position={[lat, lon]}>
                    <Popup>
                        {locationName}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
