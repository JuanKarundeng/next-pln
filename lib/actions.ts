"use server";
import { RegisterSchema, SignInSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// Sign up Credentials action
export const signUpCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error); // Log the error for debugging
    return { message: "Failed to create user" }; // Optional message to return
  }
  redirect("/login");
};

// Sign in Credential action
// Sign in Credential action
export const signInCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = SignInSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/masuk-data" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid Credentials." };
        default:
          return { message: "Something went wrong." };
      }
    }
    throw error;
  }
};

// Reject user action (delete user)
export const TolakUser = async (
  userId: string
): Promise<{ message: string }> => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    if (deletedUser) {
      return { message: "User successfully deleted" };
    } else {
      return { message: "User not found" };
    }
  } catch (error) {
    console.error("Failed to delete user:", error); // Log the error
    return { message: "Failed to delete user" }; // Optional message
  }
};

// Update user status action
export const updateUserStatus = async (
  userId: string
): Promise<{ message: string }> => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isUser: true },
    });

    if (updatedUser) {
      return { message: "User status has been updated successfully." };
    } else {
      return { message: "User not found." };
    }
  } catch (error) {
    console.error("Failed to update user status:", error); // Log the error
    return { message: "Failed to update user status." };
  }
};

// Reset password action
export const resetPassword = async (
  userId: string
): Promise<{ message: string }> => {
  try {
    const defaultPassword = "12345678"; // Default password
    const hashedPassword = hashSync(defaultPassword, 10); // Hash default password

    // Update password in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }, // Update hashed password
    });

    if (updatedUser) {
      return { message: "Password has been reset to 12345678" };
    } else {
      return { message: "User not found" };
    }
  } catch (error) {
    console.error("Failed to reset password:", error); // Log the error
    return { message: "Password reset failed" }; // Optional message
  }
};

// Change password action
export const ubahSandi = async (
  userId: string,
  newPassword: string
): Promise<{ message: string }> => {
  // Validate if new password is not provided
  if (!newPassword) {
    return { message: "New password must be provided." };
  }

  try {
    // Hash the new password
    const hashedPassword = hashSync(newPassword, 10);

    // Update password in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    // Check if the password update was successful
    if (updatedUser) {
      return { message: "Password successfully updated." };
    } else {
      return { message: "User not found." };
    }
  } catch (error) {
    console.error("Error changing password:", error); // Log the error
    return { message: "An error occurred while changing the password." };
  }
};
