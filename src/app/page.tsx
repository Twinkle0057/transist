"use client";

import { useEffect, useState } from "react";
import RouteEditor from "./components/RouteEditor";
import Sidebar from "./components/SideBar";
import { BusRoute } from "./types";
import { APIProvider } from "@vis.gl/react-google-maps";
import MapView from "./components/MapView";
import { v4 as uuidv4 } from 'uuid';

const generateRouteTemplate = (): BusRoute => {
  return {
    id: "",
    name: "",
    stops: [
    ],
    direction: "UP",
    status: "Active",
  }
}

const routeList: BusRoute[] = [
  {
    id: "f91509bf-a977-45aa-8fa3-a36659a1eae3",
    name: "Bangalore to Chennai",
    stops: [
      { name: "Bangalore", latitude: 12.9716, longitude: 77.5946 },
      { name: "Vellore", latitude: 12.9165, longitude: 79.1325 },
      { name: "Chennai", latitude: 13.0827, longitude: 80.2707 },
    ],
    direction: "UP",
    status: "Active",
  },
  {
    id: "fc1b4a82-c5cd-43bb-a463-c382b95d1eb5",
    name: "Mumbai to Pune",
    stops: [
      { name: "Mumbai", latitude: 19.076, longitude: 72.8777 },
      { name: "Lonavala", latitude: 18.7501, longitude: 73.4072 },
      { name: "Pune", latitude: 18.5204, longitude: 73.8567 },
    ],
    direction: "UP",
    status: "Active",
  },
  {
    id: "b52aa27d-b137-4971-beea-07b4cd545097",
    name: "Delhi to Agra",
    stops: [
      { name: "Delhi", latitude: 28.6139, longitude: 77.209 },
      { name: "Faridabad", latitude: 28.4089, longitude: 77.3178 },
      { name: "Mathura", latitude: 27.4924, longitude: 77.6737 },
      { name: "Agra", latitude: 27.1767, longitude: 78.0081 },
    ],
    status: "Active",
    direction: "UP",
  },
];

const Home = () => {
  const [routes, setRoutes] = useState<BusRoute[]>([]);
  const [currentRoute, setCurrentRoute] = useState<BusRoute>(generateRouteTemplate())

  const [createRoute, setCreateRoute] = useState<boolean>(true);

  useEffect(() => {
    let str1 = localStorage.getItem("routes");
    let str2 = localStorage.getItem("route");
    let list;
    let rt;
    if(str1) {
      list = JSON.parse(str1);
      setRoutes(list);
    }
    if(str2) {
      rt = JSON.parse(str2);
      setCurrentRoute(rt)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("routes", JSON.stringify(routes));
    localStorage.setItem("route", JSON.stringify(currentRoute));
  }, [routes, currentRoute]);

  // const saveRoute = (route: BusRoute) => {
  //   setRoutes((prevRoutes) => {
  //     const exists = prevRoutes.some((r) => r.id === route.id);
  //     return exists
  //       ? prevRoutes.map((r) => (r.id === route.id ? route : r))
  //       : [...prevRoutes, route];
  //   });
  //   setSelectedRouteId(-1);
  // };

  // const deleteRoute = (id: number) => {
  //   setRoutes((prevRoutes) => prevRoutes.filter((r) => r.id !== id));
  //   setSelectedRouteId(-1);
  // };

  const createNewRoute = () => {
    setCreateRoute(true);
    let newRoute = generateRouteTemplate();
    newRoute.id = uuidv4();
    setCurrentRoute(newRoute);
  };

  const handleSubmit = (value: BusRoute[], route: BusRoute) => {
    // setRoutes((prev) => {
    //   const exists = prev.some((r) => r.id === value.id);
    //   return exists ? prev.map((r) => (r.id === value.id ? value : r)) : [...prev, value];
    // });
    setRoutes(value);
    setCurrentRoute(route);
  }

  const deleteRoute = (route: BusRoute) => {
    setRoutes(prev => {
      return prev.filter((r) => r.id !== route.id);
    });
  }

  return (
    <APIProvider apiKey={"AIzaSyAZmU1lNtvRhLH-kJsv8o74Dv8pyEAwmIg"}>
      <div className="flex">
        <Sidebar
          routes={routes}
          selectRoute={setCurrentRoute}
          createNewRoute={createNewRoute} deleteRoute={deleteRoute} />
          {currentRoute.id && (<MapView route={currentRoute} isCreateRoute={createRoute} />)}
        
        <RouteEditor
          editRoute={currentRoute}
          onSubmit={(value: BusRoute[], route: BusRoute) => handleSubmit(value, route)} routes={routes}/>
      </div>
    </APIProvider>
  );
};

export default Home;
