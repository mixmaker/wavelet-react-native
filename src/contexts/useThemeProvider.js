import { createContext, useContext } from "react";

export const ThemeProvider = createContext({});

export default function useThemeProvider() {
  return useContext(ThemeProvider);
}
