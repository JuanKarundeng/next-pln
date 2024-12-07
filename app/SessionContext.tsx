import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/auth";

// Update the Session interface to make 'name' optional
interface Session {
  user: {
    name?: string | null; // Make name optional
    email: string;
    image: string | null;
    role: string;
  };
  expires: string;
}

interface SessionContextProps {
  session: Session | null;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const sessionData = await auth(); // Get session data
        setSession(sessionData as Session); // Cast to Session type
      } catch (error) {
        console.error("Failed to get session:", error);
      }
    };

    getSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};
