// File: /pages/api/update-password.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { hashSync } from "bcrypt-ts";

const updatePassword = async (req: NextApiRequest, res: NextApiResponse) => {
  // Hanya mendukung metode POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed~" });
  }

  // Mendapatkan session
  const session = await auth();

  // Validasi sesi dan peran pengguna
  if (!session || !session.user || session.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { userId, newPassword } = req.body;

  // Validasi input
  if (!userId || !newPassword) {
    return res
      .status(400)
      .json({ message: "User ID dan password baru harus disediakan." });
  }

  try {
    // Hash password baru
    const hashedPassword = hashSync(newPassword, 10);

    // Update password di database
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return res.status(200).json({ message: "Password berhasil diperbarui." });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Gagal memperbarui password." });
  }
};

export default updatePassword;
