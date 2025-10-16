"use server";

import { cookies } from "next/headers";

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

// export async function getDashboardStats() {
//   return {
//     totalUsers: 24,
//     pendingUsers: 2,
//     totalForms: 156,
//     completedForms: 142,
//     totalDelegates: 48,
//     avgFormScore: 78.5,
//   };
// }

// export async function validateUser(userId: number) {
//   // This would call your backend to validate the user
//   console.log("[v0] Validating user:", userId)
//   // Simulate API call
//   await new Promise((resolve) => setTimeout(resolve, 500))
//   return { success: true, message: "User validated successfully" }
// }
