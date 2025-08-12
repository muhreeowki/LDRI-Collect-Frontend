'use server';

import { cookies } from 'next/headers';

export async function submitBridgeForm(data: any) {
  try {
    const cookieStore = await cookies();
    const delegateJSON = cookieStore.get('delegate')?.value;
    const delegate = delegateJSON ? JSON.parse(delegateJSON) : undefined;
    if (delegate === undefined) {
      return { success: false, error: 'No User Signed In' };
    }
    const response = await fetch(
      `${process.env.API_URL}/forms/${delegate.formSubmissionCode}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );

    console.log('Response:', await response.json());

    if (!response.ok) {
      throw new Error(`Failed to submit: ${response.statusText}`);
    }

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}

export async function getForms() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    if (accessToken === undefined) {
      return { success: false, error: 'No User Signed In' };
    }
    const response = await fetch(`${process.env.API_URL}/forms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const jsonResp = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    console.log('Response:', jsonResp);

    return jsonResp;
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}
