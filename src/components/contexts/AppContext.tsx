"use client";
import React, { createContext, ReactNode, useContext } from "react";
import StoreFactory from "@/bll/CreateStore";
import Inventory from "@/bll/Inventory";

interface AppContextInterface {
  storeFactory: StoreFactory;
  inventory: Inventory;
}

const AppContext = createContext<AppContextInterface | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storeFactory = StoreFactory.getInstance();
  const inventory = new Inventory();

  const contextValue: AppContextInterface = {
    storeFactory,
    inventory,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextInterface => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
