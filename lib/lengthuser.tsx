import { useEffect, useState } from "react";

const useLengthUserFalse = () => {
  const [lengthUser, setLengthUser] = useState<number>(0);

  useEffect(() => {
    const fetchLength = async () => {
      try {
        const response = await fetch("/api/getLengthUserFalse");
        const data = await response.json();

        setLengthUser(data.length);
      } catch (error) {
        console.error("Error fetching user length:", error);
      }
    };

    fetchLength();
  }, []);

  return lengthUser;
};

export default useLengthUserFalse;
