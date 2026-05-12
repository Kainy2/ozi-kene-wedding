const BASE62_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function generateInviteToken(length: number = 8): string {
  let token = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    token += BASE62_CHARS[array[i] % BASE62_CHARS.length];
  }

  return token;
}

export function isValidTokenFormat(token: string): boolean {
  return /^[A-Za-z0-9]{8}$/.test(token);
}
