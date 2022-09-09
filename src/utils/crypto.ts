import crypto from "crypto";

export const cryptoPassword = (payload: String) => {
  return crypto
    .createHash("sha256")
    .update(payload + process.env.PASSWORD_SECRET_KEY)
    .digest("hex");
};
