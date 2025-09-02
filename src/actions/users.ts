'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function getUsers() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  if (accessToken === undefined) {
    return { success: false, error: 'No User Signed In' };
  }

  const response = await fetch(`${process.env.API_URL}/users`, {
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

  for (const user of jsonResp) {
    // Convert valid field to boolean
    user.valid = user.valid === 'true' || user.valid === true;
    // Convert _count fields to numbers
    user._count.Delegates = Number(user._count.Delegates);
    user._count.FormSubmissions = Number(user._count.FormSubmissions);
  }

  return jsonResp;
}

export async function validateUser(form: FormData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  if (accessToken === undefined) {
    return { success: false, error: 'No User Signed In' };
  }
  const userId = form.get('id');

  console.log('accessToken: ', accessToken);
  const response = await fetch(
    `${process.env.API_URL}/users/validate/${userId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log('Response:', response);
  const jsonResp = await response.json();
  console.log('JsonResp:', jsonResp);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  revalidatePath('/admin');
  return jsonResp;
}

export async function getUserDashboard() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  if (accessToken === undefined) {
    return { success: false, error: 'No User Signed In' };
  }
  const response = await fetch(`${process.env.API_URL}/users/dashboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const jsonResp = await response.json();
  if (!response.ok) {
    return { success: false, error: 'Failed to fetch dashboard data' };
  }
  return { success: true, summary: jsonResp };
}

export async function getAdminStats() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const isAdmin = cookieStore.get('isAdmin')?.value === 'true';
  if (!accessToken || !isAdmin) {
    return { success: false, error: 'Not Authorized' };
  }
  // Fetch users
  const [usersResp, formsResp] = await Promise.all([
    fetch(`${process.env.API_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),
    fetch(`${process.env.API_URL}/forms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  ]);

  const [usersJson, formsJson] = await Promise.all([
    usersResp.json(),
    formsResp.json(),
  ]);

  if (!usersResp.ok || !formsResp.ok) {
    return { success: false, error: 'Failed to fetch stats' };
  }

  const totalUsers = usersJson.length ?? 0;
  const validUsers = usersJson.filter((u: any) => u.valid === true || u.valid === 'true').length;
  const totalDelegates = usersJson.reduce(
    (sum: number, u: any) => sum + (Number(u?._count?.Delegates ?? 0) || 0),
    0
  );
  const totalForms = formsJson.length ?? 0;

  return {
    success: true,
    stats: { totalUsers, validUsers, totalDelegates, totalForms },
  };
}
