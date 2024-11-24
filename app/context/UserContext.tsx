"use client";

import { createContext, useContext, useState, useMemo, SetStateAction, Dispatch } from "react";

interface UserContextProps {
  userId: number;
  updateUserId: Dispatch<SetStateAction<number>>;
}

const UserContext = createContext<UserContextProps>({
  userId: 0,
  updateUserId: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState(0);
  
  const value = useMemo(() => ({
    userId,
    updateUserId: setUserId
  }), [userId]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
