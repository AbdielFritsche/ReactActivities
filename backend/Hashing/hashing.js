import crypto from "crypto";

const hashing = (algorithm) => crypto.createHash(algorithm);
const secondaryhashing = (algorithm) => crypto.createHash(algorithm);
const pepper = process.env.PEPPER;

export const securePassword = (password,salt=crypto.randomBytes(32).toString("base64url")) => {
    const mid = Math.floor(password.length / 2);

    const firsthalf = password.substring(0, mid);
    const secondhalf = password.substring(mid);

    const firstHalfHash = secondaryhashing(process.env.SECONDHASHING).update(firsthalf).digest("base64url");
    const firstHalffinalHash = hashing(process.env.HASHING).update(firstHalfHash).digest("base64url");

    const secondHalfHash = secondaryhashing(process.env.SECONDHASHING).update(secondhalf).digest("base64url");
    const secondHalffinalHash = hashing(process.env.HASHING).update(secondHalfHash).digest("base64url");

    const combined = pepper + firstHalffinalHash + salt + secondHalffinalHash;

    const finalHash = crypto.pbkdf2Sync(combined, salt, 100000, 64, process.env.HASHING).toString("base64url");

    return { salt, finalHash };  
};

export const verifyPassword = (password, salt, hashStored) => {
    const { finalHash } = securePassword(password, salt);
    return finalHash === hashStored;
};
