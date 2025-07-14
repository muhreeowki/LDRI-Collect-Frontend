'use server';

export async function submitBridgeForm(data: any) {
  try {
    const response = await fetch(`${process.env.API_URL}/forms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

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
