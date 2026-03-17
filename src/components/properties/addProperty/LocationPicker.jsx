import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAuth } from "../../../store/auth";

// ── Custom violet-themed marker icon ─────────────────────────────────────────
const markerIcon = new L.DivIcon({
  className: "custom-marker",
  html: `
    <div style="
      position: relative;
      width: 30px;
      height: 30px;
      background: #5323DC;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(83,35,220,0.45);
    ">
      <div style="
        width: 12px;
        height: 12px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "></div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// ── Geocode cache ─────────────────────────────────────────────────────────────
const geocodeCache = {};

// ── Smooth fly-to on state/city/pincode change ────────────────────────────────
function FlyToLocation({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 13, { animate: true, duration: 1.2 });
  }, [coords, map]);
  return null;
}

// ── Click handler + reverse geocode ──────────────────────────────────────────
function LocationMarker({ onLocationSelect, URI }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);

      try {
        const key = `${lat},${lng}`;
        if (geocodeCache[key]) {
          onLocationSelect({ latitude: lat, longitude: lng, pincode: geocodeCache[key] });
          return;
        }
        const res  = await fetch(`${URI}/api/map/reverse?lat=${lat}&lon=${lng}`);
        const data = await res.json();
        const pin  = data?.address?.postcode || "";
        geocodeCache[key] = pin;
        onLocationSelect({ latitude: lat, longitude: lng, pincode: pin });
      } catch (err) {
        console.error("Reverse geocoding error:", err);
        onLocationSelect({ latitude: lat, longitude: lng, pincode: "" });
      }
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

/**
 * LocationPicker
 * Your real Leaflet map — styled with the violet project theme.
 *
 * Props:
 *   onChange  : fn({ latitude, longitude, pincode })
 *   state     : string
 *   city      : string
 *   pincode   : string
 *   latitude  : string | number
 *   longitude : string | number
 */
export default function LocationPicker({
  onChange, state, city, pincode, latitude, longitude,
}) {
  const { URI } = useAuth();
  const [coords,     setCoords]     = useState(null);
  const isFetching = useRef(false);

  // Pre-set marker if lat/lng already provided
  useEffect(() => {
    if (latitude && longitude) {
      setCoords([parseFloat(latitude), parseFloat(longitude)]);
    }
  }, [latitude, longitude]);

  // Auto-geocode from state/city/pincode when no coords yet
  useEffect(() => {
    if (coords || (!city && !state && !pincode)) return;

    const query = `${pincode ? pincode + "," : ""} ${city ? city + "," : ""} ${
      state ? state + "," : ""
    } India`.trim();

    if (geocodeCache[query]) {
      setCoords(geocodeCache[query]);
      return;
    }

    if (isFetching.current) return;

    const controller = new AbortController();
    const timeoutId  = setTimeout(() => {
      isFetching.current = true;
      fetch(`${URI}/api/map/geocode?q=${encodeURIComponent(query)}`)
        .then(r => r.json())
        .then(data => {
          if (data?.length > 0) {
            const c = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            setCoords(c);
            geocodeCache[query] = c;
          }
        })
        .catch(err => { if (err.name !== "AbortError") console.error("Geocoding:", err); })
        .finally(() => { isFetching.current = false; });
    }, 400);

    return () => { clearTimeout(timeoutId); controller.abort(); };
  }, [city, state, pincode, URI, coords]);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      {/* Map label */}
      <div className="px-3 py-2 bg-violet-50 border-b border-violet-100 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-violet-600 flex-shrink-0" />
        <span className="text-xs font-medium text-violet-700">
          Click on the map to pin your property location
        </span>
      </div>

      {/* Map */}
      <div style={{ height: 280 }}>
        <MapContainer
          center={coords || [20.5937, 78.9629]}
          zoom={coords ? 13 : 5}
          style={{ height: "100%", width: "100%" }}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Street Map">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                subdomains={["a", "b", "c", "d"]}
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Satellite">
              <TileLayer
                attribution="Tiles &copy; Esri"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay checked name="Labels">
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">Carto</a>'
                url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}.png"
                subdomains={["a", "b", "c", "d"]}
              />
            </LayersControl.Overlay>
          </LayersControl>

          <FlyToLocation coords={coords} />
          {coords && <Marker position={coords} icon={markerIcon} />}
          <LocationMarker onLocationSelect={onChange} URI={URI} />
        </MapContainer>
      </div>

      {/* Footer: show pinned coords */}
      {latitude && longitude && (
        <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center gap-2">
          <span className="text-xs text-gray-400">Pinned:</span>
          <span className="text-xs font-mono text-gray-600">
            {parseFloat(latitude).toFixed(5)}, {parseFloat(longitude).toFixed(5)}
          </span>
          {pincode && (
            <span className="ml-auto text-xs font-medium text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full">
              📍 {pincode}
            </span>
          )}
        </div>
      )}
    </div>
  );
}