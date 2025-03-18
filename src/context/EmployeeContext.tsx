"use client";

import { createContext, useContext, ReactNode } from "react";
import { useEmployees, Employee } from "@/hooks/useEmployees";

type EmployeeContextType = {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const { employees, loading, error, refetch } = useEmployees();

  return (
    <EmployeeContext.Provider value={{ employees, loading, error, refetch }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider"
    );
  }
  return context;
};
