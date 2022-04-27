import { createContext, useContext } from "react";

export const GlobalContext = createContext({});

export default function useAppContext() {
  return useContext(GlobalContext);
}
