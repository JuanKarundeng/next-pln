import { object, string } from "zod";

export const SignInSchema = object({
  email: string().email("Alamat Surel Tidak Valid"),
  password: string()
    .min(8, "Kata Sandi Harus Lebih Dari 8 Karakter")
    .max(32, "Kata Sandi Harus Kurang Dari 32 Karakter"),
});

export const RegisterSchema = object({
  name: string().min(1, "Nama Harus Lebih Dari 1 Karakter"),
  email: string().email("Alamat Surel Tidak Valid"),
  password: string()
    .min(8, "Kata Sandi Harus Lebih Dari 8 Karakter")
    .max(32, "Kata Sandi Harus Kurang Dari 32 Karakter"),
  ConfirmPassword: string()
    .min(8, "Kata Sandi Harus Lebih Dari 8 Karakter")
    .max(32, "Kata Sandi Harus Kurang Dari 32 Karakter"),
}).refine((data) => data.password === data.ConfirmPassword, {
  message: "Kata Sandi Tidak Sama",
  path: ["ConfirmPassword"],
});
