import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/auth";

interface Session {
  user: {
    name: string;
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
      const sessionData = await auth(); // Memanggil auth untuk mendapatkan data session
      setSession(sessionData);
    };

    getSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};
