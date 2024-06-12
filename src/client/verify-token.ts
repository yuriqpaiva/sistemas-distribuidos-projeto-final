import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function verifyToken(): string {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/acessar");
  }

  return token.value;
}