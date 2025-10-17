"use server";

import { cookies } from "next/headers";

export async function submitBridgeForm(data: any) {
  const cookieStore = await cookies();
  const delegateJSON = cookieStore.get("delegate")?.value;
  const delegate = delegateJSON ? JSON.parse(delegateJSON) : undefined;
  if (delegate === undefined) {
    return { success: false, error: "No User Signed In" };
  }
  try {
    const response = await fetch(
      `${process.env.API_URL}/forms/${delegate.formSubmissionCode}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    console.log("Response:", await response.json());

    if (!response.ok) {
      throw new Error(`Failed to submit: ${response.statusText}`);
    }

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}

export async function getUserForms() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (accessToken === undefined) {
    return { success: false, forms: null, message: "Not Authorized" };
  }
  try {
    const response = await fetch(`${process.env.API_URL}/users/forms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const jsonResp = await response.json();
    console.log(jsonResp);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return { success: true, forms: jsonResp, message: "Success" };
  } catch (err: any) {
    console.error(err);
    return { success: false, forms: null, message: err.message };
  }
}

export async function getFormById(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (accessToken === undefined) {
    return { success: false, form: null, message: "Not Authorized" };
  }
  try {
    const response = await fetch(`${process.env.API_URL}/forms/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const jsonResp = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch form");
    }

    return { success: true, form: jsonResp, message: "Success" };
  } catch (err: any) {
    console.error(err);
    return { success: false, form: null, message: err.message };
  }
}

export async function getAdminFormById(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isAdmin = cookieStore.get("isAdmin")?.value === "true";
  if (!accessToken || !isAdmin) {
    return { success: false, error: "Not Authorized" };
  }
  try {
    const response = await fetch(`${process.env.API_URL}/forms/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const jsonResp = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch form");
    }

    return { success: true, form: jsonResp, message: "Success" };
  } catch (err: any) {
    console.error(err);
    return { success: false, form: null, message: err.message };
  }
}
