"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getPendingUsers() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isAdmin = cookieStore.get("isAdmin")?.value === "true";
  if (!accessToken || !isAdmin) {
    return { success: false, error: "Not Authorized" };
  }
  const response = await fetch(`${process.env.API_URL}/users/pending`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const jsonResp = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  console.log("Response:", jsonResp);

  for (const user of jsonResp) {
    // Convert valid field to boolean
    user.valid = user.valid === "true" || user.valid === true;
    // Convert _count fields to numbers
    user._count.Delegates = Number(user._count.Delegates);
    user._count.FormSubmissions = Number(user._count.FormSubmissions);
  }

  return jsonResp;
}

export async function getAdminStats() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isAdmin = cookieStore.get("isAdmin")?.value === "true";
  if (!accessToken || !isAdmin) {
    return { success: false, error: "Not Authorized" };
  }
  // Fetch users
  const resp = await fetch(`${process.env.API_URL}/admin/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const dashboardStats = await resp.json();

  if (!resp) {
    return { success: false, error: "Failed to fetch stats" };
  }

  return {
    success: true,
    stats: dashboardStats,
  };
}

export async function rejectUser(userId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isAdmin = cookieStore.get("isAdmin")?.value === "true";
  if (!accessToken || !isAdmin) {
    return { success: false, error: "Not Authorized" };
  }
  const response = await fetch(`${process.env.API_URL}/users/${userId}`, {
    method: "DELETE",
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

export async function getUsers() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isAdmin = cookieStore.get("isAdmin")?.value === "true";
  if (!accessToken || !isAdmin) {
    return { success: false, error: "Not Authorized" };
  }

  const response = await fetch(`${process.env.API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const jsonResp = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  console.log("Response:", jsonResp);

  for (const user of jsonResp) {
    // Convert valid field to boolean
    user.valid = user.valid === "true" || user.valid === true;
    // Convert _count fields to numbers
    user._count.Delegates = Number(user._count.Delegates);
    user._count.FormSubmissions = Number(user._count.FormSubmissions);
  }

  return jsonResp;
}

export async function validateUser(userId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isAdmin = cookieStore.get("isAdmin")?.value === "true";
  if (!accessToken || !isAdmin) {
    return { success: false, error: "Not Authorized" };
  }

  console.log("accessToken: ", accessToken);
  const response = await fetch(
    `${process.env.API_URL}/users/validate/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  console.log("Response:", response);
  const jsonResp = await response.json();
  console.log("JsonResp:", jsonResp);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  revalidatePath("/admin");
  return {
    success: true,
    message: "User validated successfully",
    data: jsonResp,
  };
}

export async function getDelegates() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isAdmin = cookieStore.get("isAdmin")?.value === "true";
  if (!accessToken || !isAdmin) {
    return { success: false, error: "Not Authorized" };
  }

  const response = await fetch(`${process.env.API_URL}/delegates`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const jsonResp = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  console.log("Response:", jsonResp);

  // for (const user of jsonResp) {
  //   // Convert valid field to boolean
  //   user.valid = user.valid === "true" || user.valid === true;
  //   // Convert _count fields to numbers
  //   user._count.Delegates = Number(user._count.Delegates);
  //   user._count.FormSubmissions = Number(user._count.FormSubmissions);
  // }

  return jsonResp;
}

export async function getForms() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isAdmin = cookieStore.get("isAdmin")?.value === "true";
  if (!accessToken || !isAdmin) {
    return { success: false, forms: null, message: "Not Authorized" };
  }
  try {
    const response = await fetch(`${process.env.API_URL}/forms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const jsonResp = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    console.log("Response:", jsonResp);

    return { success: true, forms: jsonResp, message: "Success" };
  } catch (err: any) {
    console.error(err);
    return { success: false, forms: null, message: err.message };
  }
}
