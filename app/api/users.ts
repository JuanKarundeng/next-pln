// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await prisma.user.findMany(); // Fetch users from the database
    res.status(200).json(users); // Return the users as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" }); // Handle any errors
  }
}
