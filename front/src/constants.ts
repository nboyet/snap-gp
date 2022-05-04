export const API_URL = `http://${window.location.hostname}:5000/`;

export const RoutesBase = {
  HOME: "/",
  MANAGE: "/manage",
};

export const RoutesAPI = {
  TOPOLOGY: "topology",
  HOSTS: "hosts",
  SWITCH: "switch"
};

export interface DraggableItemType {
  id: number;
  name: string;
}

export interface Hosts {
  [key: string] : Array<DraggableItemType>
}