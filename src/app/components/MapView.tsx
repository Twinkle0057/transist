import React, { useEffect, useState } from "react";
import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { BusRoute, LatLong } from "../types";
interface Waypoint {
  location: {
    lat: number;
    lng: number;
  };
}

interface MapViewProps {
  route: BusRoute;
  isCreateRoute: boolean;
}

const MapView: React.FC<MapViewProps> = ({route, isCreateRoute}) => {
  const [location, setLocation] = useState<LatLong | undefined>();
  // const [error, setError] = useState<string | null>(null);

  
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionService, setDirectionService] =
    React.useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    React.useState<google.maps.DirectionsRenderer>();

  // const markerRefs = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!map || !routesLibrary) return;
    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({ map, suppressMarkers: false })
    );
  }, [map, routesLibrary]);

  useEffect(() => {
    if((isCreateRoute && route.stops.length == 0))
      return;
    const origin: LatLong = {
      lat: route.stops[0].latitude,
      lng: route.stops[0].longitude,
    };
    const destination: LatLong = {
      lat: route.stops[route.stops.length - 1].latitude,
      lng: route.stops[route.stops.length - 1].longitude,
    };
  
    const waypoints: Waypoint[] = route.stops.slice(
      1,
      route.stops.length - 1
    ).map((stop) => {
      return {
        location: { lat: stop.latitude, lng: stop.longitude },
        stopover: true,
      };
    });
    setLocation({ lat: origin.lat, lng: origin.lng });
    if (!directionService || !directionsRenderer) {
      return;
    }

    directionService
      .route({
        origin: origin,
        destination: destination,
        waypoints: [...waypoints],
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((res) => {
        directionsRenderer.setDirections(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [directionService, directionsRenderer, route, isCreateRoute]);

  if(!route && !location)
    return <h2>Loading...</h2>

  return (
    <React.Fragment>
      <div className="border-8 border-white rounded-lg overflow-hidden w-full">
        <Map
          className="w-full h-full"
          defaultCenter={location}
          defaultZoom={9}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
      </div>
    </React.Fragment>
  );
}

export default MapView;
