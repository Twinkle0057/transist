import React from "react";
import { BusRoute } from "../types";

type SidebarProps = {
  routes: BusRoute[];
  selectRoute: (route: BusRoute) => void;
  createNewRoute: () => void;
  deleteRoute: (route: BusRoute) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ routes, selectRoute, createNewRoute, deleteRoute }) => {
  return (
    <div className="w-1/4 bg-gray-800 text-white p-4 h-screen">
      <h2 className="text-lg font-bold mb-4">Routes</h2>
      <button
        onClick={createNewRoute}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 w-full rounded"
      >
        + Create
      </button>
      <ul>
        {routes.map((route) => (
          <li
            key={route.id}
            className="mb-2 p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600v flex"
            onClick={() => selectRoute(route)}
          >
            {route.name}
            <div className="place-items-end" onClick={() => deleteRoute(route)}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
