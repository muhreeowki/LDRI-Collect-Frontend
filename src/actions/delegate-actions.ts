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
