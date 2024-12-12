import { hashStatus, unhashStatus } from '../utils/session/hashStatus';

// hashStatus.test.js
hashStatus;
describe('hashStatus and unhashStatus', () => {
  it('should encrypt and decrypt status correctly', () => {
    const status = 'user';
    const encryptedStatus = hashStatus(status);
    const decryptedStatus = unhashStatus(encryptedStatus);

    expect(decryptedStatus).toBe(status);
  });

  it('should return the same status after decryption', () => {
    const status = 'admin';
    const encryptedStatus = hashStatus(status);
    const decryptedStatus = unhashStatus(encryptedStatus);

    expect(decryptedStatus).toBe(status);
  });
});
