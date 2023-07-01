/* eslint-disable complexity */
import { authenticator, totp } from 'otplib';

export default function generateOtpToken(timeLength: number) {
  totp.options = {
    digits: 4,
    window: 0,
    step: timeLength,
  };

  let secretCode = '';
  let generatedPin = '';
  while (generatedPin.charAt(0) === '0' || generatedPin === '') {
    secretCode = authenticator.generateSecret();
    generatedPin = totp.generate(secretCode);
  }

  return {
    secretCode,
    generatedPin,
  };
}
