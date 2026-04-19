"use server";

import { cookies } from 'next/headers';

export async function authenticateAdmin(username: string, pass: string) {
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'monalisa2026';

  if (username === adminUser && pass === adminPass) {
    const cookieStore = cookies();
    cookieStore.set('admin_session', 'true', {
      path: '/',
      maxAge: 86400,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return { success: true };
  }

  return { success: false, error: 'PROTOCOLE ÉCHOUÉ : IDENTIFIANTS INVALIDES' };
}
