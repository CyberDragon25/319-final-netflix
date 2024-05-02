import React, { createContext, useState } from "react";

const UserIDContext = createContext(null);

export const UserIDProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);

  return (
    <UserIDContext.Provider value={{ userID, setUserID }}>
      {children}
    </UserIDContext.Provider>
  );
};

export default UserIDContext;