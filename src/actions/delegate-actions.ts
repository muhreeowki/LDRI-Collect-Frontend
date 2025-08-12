'use server';

import { delegateListSchema } from '@/lib/validation-schemas';
// import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function createDelegates(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');
    if (accessToken === undefined) {
      return { success: false, error: 'No User Signed In' };
    }
    console.log('Access Token:', accessToken.value);
    // Extract the delegates data from FormData
    const rawData = formData.get('delegates');
    if (!rawData) {
      throw new Error('No delegates data provided');
    }
    const delegates = JSON.parse(rawData as string);
    const validatedData = delegateListSchema.parse({ delegates });
    console.log('Creating delegates:', validatedData.delegates);
    const response = await fetch(`${process.env.API_URL}/delegates/many`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(validatedData.delegates),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to create delegates');
    }
    // TODO: You might want to redirect to a success page or return success response
    return { success: true, message: 'Delegates created successfully!' };
  } catch (error) {
    console.error('Error creating delegates:', error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function verifyDelegate(formData: FormData) {
  const cookieStore = await cookies();

  const data = { formSubmissionCode: formData.get('formSubmissionCode') };

  const response = await fetch(`${process.env.API_URL}/delegates/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    console.error('Error verifying delegate:', json);
    return {
      success: false,
      error: json.message || 'Failed to verify delegates',
    };
  }

  console.log('Delegate verification response:', json);
  if (json.formSubmissionCode != undefined) {
    cookieStore.set('delegate', JSON.stringify(json), {
      expires: new Date(Date.now() + 60 * 60 * 10000000),
    });
  } // Set the access token cookie with a long expiration time
  return { success: true, message: 'Delegate verified successfully!' };
}
