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


const Home = () => {
  const [routes, setRoutes] = useState<BusRoute[]>([]);
  const [currentRoute, setCurrentRoute] = useState<BusRoute>(generateRouteTemplate())

  const [createRoute, setCreateRoute] = useState<boolean>(true);

  useEffect(() => {
    const str1 = localStorage.getItem("routes");
    const str2 = localStorage.getItem("route");
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
    const newRoute = generateRouteTemplate();
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
