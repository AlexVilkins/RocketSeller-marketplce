import { AES, mode as _mode, enc, lib } from 'crypto-js';

// Генерация ключа и IV (вектор инициализации)
const key = lib.WordArray.random(32); // 256-битный ключ
const iv = lib.WordArray.random(16); // 128-битный IV

export function hashStatus(status) {
  const encryptedStatus = AES.encrypt(status, key, {
    iv: iv,
    mode: _mode.CFB,
  });
  return encryptedStatus.toString();
}

export function unhashStatus(encryptedStatus) {
  const decryptedBytes = AES.decrypt(encryptedStatus, key, {
    iv: iv,
    mode: _mode.CFB,
  });
  const decryptedStatus = decryptedBytes.toString(enc.Utf8);
  return decryptedStatus;
}
