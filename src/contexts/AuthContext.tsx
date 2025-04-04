
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface User {
  email: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  
  // Check local storage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedAuth = localStorage.getItem("isAuthenticated");
    
    if (savedUser && savedAuth === "true") {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);
  
  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call/validation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          // Create a mock user
          const user = {
            email,
            name: email.split('@')[0] // Use part before @ as the name
          };
          
          setUser(user);
          setIsAuthenticated(true);
          
          // Store in localStorage for persistent login
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("isAuthenticated", "true");
          
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 800); // Simulate network delay
    });
  };
  
  const signup = async (name: string, email: string, password: string): Promise<void> => {
    // Simulate API call/validation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          // Create a user
          const user = {
            email,
            name
          };
          
          setUser(user);
          setIsAuthenticated(true);
          
          // Store in localStorage for persistent login
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("isAuthenticated", "true");
          
          resolve();
        } else {
          reject(new Error("Please fill in all fields"));
        }
      }, 800); // Simulate network delay
    });
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };
  
  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
