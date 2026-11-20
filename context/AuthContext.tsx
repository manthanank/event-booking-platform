"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "Attendee" | "Event Organizer";
  tier: string;
  avatarUrl: string;
  ticketsCount: number;
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string, role?: "Attendee" | "Event Organizer") => void;
  logout: () => void;
  switchRole: () => void;
}

const DEMO_ATTENDEE: UserSession = {
  id: "usr_att_773",
  name: "Elena Rostova",
  email: "elena.attendee@eventvibe.io",
  role: "Attendee",
  tier: "VIP All-Access Pass",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  ticketsCount: 3,
};

const DEMO_ORGANIZER: UserSession = {
  id: "usr_org_101",
  name: "David Kim",
  email: "david.organizer@eventvibe.io",
  role: "Event Organizer",
  tier: "Lead Summit Director",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  ticketsCount: 12,
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  switchRole: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("eventvibe_auth_session");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(DEMO_ATTENDEE);
      }
    } else {
      setUser(DEMO_ATTENDEE);
    }
  }, []);

  const login = (email: string, name?: string, role: "Attendee" | "Event Organizer" = "Attendee") => {
    const newUser: UserSession = {
      id: `usr_${Date.now()}`,
      name: name || email.split("@")[0],
      email,
      role,
      tier: role === "Event Organizer" ? "Summit Director" : "Standard Pass",
      avatarUrl: DEMO_ATTENDEE.avatarUrl,
      ticketsCount: 1,
    };
    setUser(newUser);
    localStorage.setItem("eventvibe_auth_session", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eventvibe_auth_session");
  };

  const switchRole = () => {
    setUser((prev) => {
      const next = prev?.role === "Event Organizer" ? DEMO_ATTENDEE : DEMO_ORGANIZER;
      localStorage.setItem("eventvibe_auth_session", JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
