import crypto from "crypto";

export function generateOTP(length = 6) {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[crypto.randomInt(0, digits.length)];
  }
  return otp;
}

export function otpExpiryDate(minutes = 10) {
  return new Date(Date.now() + minutes * 60 * 1000);
}

export function isOtpExpired(expiry) {
  if (!expiry) return true;
  return new Date(expiry).getTime() < Date.now();
}
