// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

// Update the User type to match the shape of the data returned by Prisma
type User = {
  id: string; // Change from number to string to match Prisma return type
  name: string | null;
  email: string | null;
  role: string;
  image: string | null;
  isUser: boolean | null;
  emailVerified: Date | null;
  password: string | null;
  // Add other user fields as needed based on your schema
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | { message: string }>
) {
  try {
    const users = await prisma.user.findMany(); // Fetch users from the database using Prisma
    res.status(200).json(users); // Return the users as a JSON response
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error for debugging
    res.status(500).json({ message: "Failed to fetch users" }); // Return a generic error message
  }
}
