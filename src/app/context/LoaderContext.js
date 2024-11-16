"use client";
const { createContext, useContext, useState } = require("react");

export const LoaderContext = createContext();

export default function LoaderContextProvider({ children }) {
  const [loader, setLoader] = useState(false);
  const showLoader = () => {
    setLoader(true);
    console.log("showLoader at context=>", loader);
  };
  const hideLoader = () => {
    setLoader(false);
    console.log("hideLoader at context=>", loader);
  };
  return (
    <LoaderContext.Provider
      value={{ loader, setLoader, hideLoader, showLoader }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}
