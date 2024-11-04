export interface Stop {
  name: string;
  latitude: number;
  longitude: number;
}

export interface BusRoute {
  id: string;
  name: string;
  stops: Stop[];
  direction: "UP" | "DOWN";
  status: "Active" | "Inactive";
}

export type LatLong = {
  lat: number;
  lng: number;
}