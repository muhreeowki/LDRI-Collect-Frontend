"use server";

import { cookies } from "next/headers";

export async function getUser(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isAdmin = cookieStore.get("isAdmin")?.value === "true";
  if (!accessToken || !isAdmin) {
    return { success: false, user: null, message: "No User Signed In" };
  }
  const response = await fetch(`${process.env.API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const jsonResp = await response.json();
  if (!response.ok) {
    return {
      success: false,
      user: null,
      message: "Failed to fetch dashboard data",
    };
  }
  return { success: true, user: jsonResp, message: "Success" };
}

export async function getUserProfile() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (accessToken === undefined) {
    return { success: false, profile: null, message: "No User Signed In" };
  }
  const response = await fetch(`${process.env.API_URL}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const jsonResp = await response.json();
  if (!response.ok) {
    return {
      success: false,
      profile: null,
      message: "Failed to fetch dashboard data",
    };
  }
  return { success: true, profile: jsonResp, message: "Success" };
}

export async function getUserDashboard() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (accessToken === undefined) {
    return {
      success: false,
      summary: null,
      error: "No User Signed In",
    };
  }
  const response = await fetch(`${process.env.API_URL}/users/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const jsonResp = await response.json();
  if (!response.ok) {
    return {
      success: false,
      summary: null,
      message: "Failed to fetch dashboard data",
    };
  }
  return { success: true, summary: jsonResp, message: "Success" };
}
