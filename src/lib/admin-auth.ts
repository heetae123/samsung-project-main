import { createHash, timingSafeEqual } from 'crypto';

import { cookies } from 'next/headers';

const ADMIN_SESSION_COOKIE = 'samsung_admin_session';

function getAdminPassword() {
  return process.env.ADMIN_DASHBOARD_PASSWORD ?? 'demo-admin';
}

function hashValue(value: string) {
  return createHash('sha256').update(`samsung-admin:${value}`).digest('hex');
}

function toBuffer(value: string) {
  return Buffer.from(value, 'utf8');
}

export function verifyAdminPassword(candidate: string) {
  const expected = getAdminPassword();
  const candidateBuffer = toBuffer(candidate);
  const expectedBuffer = toBuffer(expected);

  if (candidateBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(candidateBuffer, expectedBuffer);
}

export function getAdminSessionValue() {
  return hashValue(getAdminPassword());
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === getAdminSessionValue();
}

export function hasAdminSession(sessionValue?: string) {
  return sessionValue === getAdminSessionValue();
}

export function getAdminSessionCookieName() {
  return ADMIN_SESSION_COOKIE;
}

export function isAdminPasswordUsingDemoDefault() {
  return !process.env.ADMIN_DASHBOARD_PASSWORD;
}
