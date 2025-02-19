import React, { createContext, useContext, useReducer, FC, ReactNode, useEffect } from "react";
import { AppState, Action, } from "./types";
import { appReducer } from "./app-reducer";

const initialState: AppState = {
  rows: {},
  columns: {},
  contents: {},
  selectedContainer: undefined,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

const saveStateToLocalStorage = (state: AppState) => {
  localStorage.setItem("appState", JSON.stringify(state));
};

const loadStateFromLocalStorage = (): AppState => {
  const state = localStorage.getItem("appState");
  return state ? JSON.parse(state) : initialState;
};

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, loadStateFromLocalStorage());

  useEffect(() => {
    saveStateToLocalStorage(state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};