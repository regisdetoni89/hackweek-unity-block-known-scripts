"use server";

import { revalidatePath } from "next/cache";

interface VerifyScriptResponse {
  success: boolean;
  error?: string;
}

export async function verifyScript(id: number, isMalicious: boolean) {
  if (!process.env.API_URL) {
    throw new Error("API_URL environment variable is not set");
  }

  try {
    const response = await fetch(`${process.env.API_URL}/api/scripts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isMalicious }),
      cache: "no-store",
    });

    const data: VerifyScriptResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to verify script");
    }

    revalidatePath("/dashboard/script-review/queue");

    return { success: true };
  } catch (error) {
    console.error("Error verifying script:", error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
