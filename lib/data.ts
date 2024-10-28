import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { hashSync } from "bcrypt-ts";
import { NextApiRequest, NextApiResponse } from "next";

export const getUsers = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin")
    redirect("/dashboard");

  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getProductByUser = async () => {
  const session = await auth();
  if (!session || !session.user) redirect("/dashboard");
  const role = session.user.role;

  if (role === "admin") {
    try {
      const products = await prisma.product.findMany({
        include: { user: { select: { name: true } } },
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const products = await prisma.product.findMany({
        where: { userId: session.user.id },
        include: { user: { select: { name: true } } },
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getUsersByIsUserTrue = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin")
    redirect("/dashboard");

  try {
    const users = await prisma.user.findMany({
      where: { isUser: true }, // Mengambil pengguna dengan isUser = true
    });
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersByIsUserFalse = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin")
    redirect("/dashboard");

  try {
    const users = await prisma.user.findMany({
      where: { isUser: false }, // Mengambil pengguna dengan isUser = false
    });
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, newPassword } = req.body;

  // Validasi input
  if (!userId || !newPassword) {
    return res
      .status(400)
      .json({ message: "User ID and new password are required." });
  }

  try {
    // Hash password baru sebelum menyimpannya
    const hashedPassword = hashSync(newPassword, 10);

    // Perbarui password pengguna di database
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return res
      .status(200)
      .json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Failed to reset password:", error);
    return res.status(500).json({ message: "Failed to reset password." });
  }
};
