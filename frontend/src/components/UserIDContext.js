import React, { createContext, useState } from "react";

const UserIDContext = createContext(null);

export const UserIDProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userSearch, setUserSearch] = useState("search");

  return (
    <UserIDContext.Provider value={{ userID, setUserID, userSearch, setUserSearch }}>
      {children}
    </UserIDContext.Provider>
  );
};

export default UserIDContext;