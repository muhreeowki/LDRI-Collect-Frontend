"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function onboard(form: FormData) {
  const data = JSON.stringify({
    name: form.get("name") as string,
    sex: form.get("sex") as string,
    email: form.get("email") as string,
    phone: form.get("phone") as string,
    nationalId: form.get("nationalId") as string,
    county: form.get("county") as string,
    position: form.get("position") as string,
    department: form.get("department") as string,
    password: form.get("password") as string,
    authorizationFormLink: form.get("authorizationFormLink") as string,
  });
  console.log(data);

  const response = await fetch(`${process.env.API_URL}/users`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 201) {
    return { success: false, error: "Failed to onboard. Please try again." };
  }
  return { success: true, message: "Onboarded successfully!" };
}

export async function login(form: FormData) {
  const cookieStore = await cookies();
  const data = JSON.stringify({
    email: form.get("email") as string,
    password: form.get("password") as string,
  });
  const response = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (response.status !== 200) {
    return { success: false, error: "Invalid credentials" };
  }
  const json = await response.json();
  // Secure cookies
  cookieStore.set("accessToken", json.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });
  cookieStore.set("isAdmin", json.isAdmin ? "true" : "false", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  if (json.isAdmin === true) {
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: "accessToken", path: "/" });
  cookieStore.delete({ name: "isAdmin", path: "/" });
  redirect("/");
}
