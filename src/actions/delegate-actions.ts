"use server";

import { delegateListSchema } from "@/lib/validation-schemas";
import { revalidatePath } from "next/cache";
// import { redirect } from 'next/navigation';
import { cookies } from "next/headers";

export async function createDelegates(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (accessToken === undefined) {
      return { success: false, error: "No User Signed In" };
    }
    // Extract the delegates data from FormData
    const rawData = formData.get("delegates");
    if (!rawData) {
      throw new Error("No delegates data provided");
    }
    const delegates = JSON.parse(rawData as string);
    const validatedData = delegateListSchema.parse({ delegates });
    const response = await fetch(`${process.env.API_URL}/delegates/many`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(validatedData.delegates),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || "Failed to create delegates");
    }
    revalidatePath("/delegates");
    return { success: true, message: "Delegates created successfully!" };
  } catch (error) {
    console.error("Error creating delegates:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getDelegate(formSubmissionCode: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (accessToken === undefined) {
      return { success: false, delegate: null, message: "No User Signed In" };
    }
    const response = await fetch(
      `${process.env.API_URL}/delegates/${formSubmissionCode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || "Failed to fetch delegate");
    }
    return { success: true, delegate: json, message: "Success" };
  } catch (error) {
    console.error("Error fetching delegate:", error);
    if (error instanceof Error) {
      return { success: false, delegate: null, message: error.message };
    }
    return {
      success: false,
      delegate: null,
      message: "An unexpected error occurred",
    };
  }
}

export async function getUsersDelegates() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (accessToken === undefined) {
      return { success: false, delegates: null, message: "No User Signed In" };
    }

    const response = await fetch(`${process.env.API_URL}/users/delegates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || "Failed to fetch delegates");
    }

    return { success: true, delegates: json, message: "Success" };
  } catch (error) {
    console.error("Error fetching delegates:", error);
    if (error instanceof Error) {
      return { success: false, delegates: null, message: error.message };
    }
    return {
      success: false,
      delegates: null,
      message: "Error feting Delegates.",
    };
  }
}

export async function verifyDelegate(formData: FormData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (accessToken === undefined) {
    return { success: false, error: "No User Signed In" };
  }

  const data = { formSubmissionCode: formData.get("formSubmissionCode") };

  const response = await fetch(`${process.env.API_URL}/delegates/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    console.error("Error verifying delegate:", json);
    return {
      success: false,
      error: json.message || "Failed to verify delegates",
    };
  }

  console.log("Delegate verification response:", json);
  if (json.formSubmissionCode != undefined) {
    cookieStore.set("delegate", JSON.stringify(json), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 60 * 60 * 10000000),
    });
  } // Set the access token cookie with a long expiration time
  return { success: true, message: "Delegate verified successfully!" };
}

export async function deleteDelegate(formSubmissionCode: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (accessToken === undefined) {
      return { success: false, error: "No User Signed In" };
    }
    const response = await fetch(
      `${process.env.API_URL}/delegates/${formSubmissionCode}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const json = await response.json();
    console.log("Delete response:", json);
    if (!response.ok) {
      throw new Error(json.message || "Failed to fetch delegate");
    }
    revalidatePath("/delegates");
    return { success: true, message: "Delegate deleted successfully" };
  } catch (error) {
    console.error("Error fetching delegate:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}
