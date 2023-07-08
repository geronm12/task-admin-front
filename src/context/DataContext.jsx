import React, { createContext, useState } from "react";

export const DataProvider = createContext();

const initialUserInfo = {
  user: null,
  isLogged: false,
};

export const DataContext = ({ children }) => {
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const initialValues = {
    userInfo,
    setUserInfo,
  };

  return (
    <DataProvider.Provider value={initialValues}>
      {children}
    </DataProvider.Provider>
  );
};
