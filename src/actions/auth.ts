'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function onboard(form: FormData) {
  const data = JSON.stringify({
    name: form.get('name') as string,
    sex: form.get('sex') as string,
    email: form.get('email') as string,
    phone: form.get('phone') as string,
    nationalId: form.get('nationalId') as string,
    county: form.get('county') as string,
    position: form.get('position') as string,
    department: form.get('department') as string,
    password: form.get('password') as string,
  });
  console.log(data);

  const response = await fetch(`${process.env.API_URL}/users`, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status !== 201) {
    return { success: false, error: 'Invalid credentials' };
  }
  return { success: true, message: 'Onboarded successfully!' };
}

export async function login(form: FormData) {
  const cookieStore = await cookies();
  const data = JSON.stringify({
    email: form.get('email') as string,
    password: form.get('password') as string,
  });
  const response = await fetch(`${process.env.API_URL}/auth/login`, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);
  if (response.status !== 200) {
    return { success: false, error: 'Invalid credentials' };
  }
  const json = await response.json();
  cookieStore.set('accessToken', json.accessToken);
  cookieStore.set('isAdmin', json.isAdmin ? 'true' : 'false');

  if (json.isAdmin == true) {
    redirect('/admin');
  } else {
    redirect('/dashboard');
  }
}
