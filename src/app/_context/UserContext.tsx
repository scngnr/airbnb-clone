"use client"

import { createContext, useContext } from "react";
import { SafeUser } from "@/app/types";

type UserContextType = {
  currentUser: SafeUser | null;
}

const UserDataContext = createContext<UserContextType>({ currentUser: null });

interface UserDataProviderProps {
  children: React.ReactNode;
  currentUser: SafeUser | null;
}

export const UserDataProvider = ({ children, currentUser }: UserDataProviderProps) => {
  return (
    <UserDataContext.Provider value={{ currentUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserDataContext);
  
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserDataProvider');
  }
  return context;
};

export { UserDataContext };