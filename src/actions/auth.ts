'use server';

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
  }).then((res) => res.json());
  console.log(response);
}

export async function login(form: FormData) {
  const data = JSON.stringify({
    email: form.get('email') as string,
    password: form.get('password') as string,
  });
  console.log(data);

  const response = await fetch(`${process.env.API_URL}/auth/login`, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  console.log(response);
}
