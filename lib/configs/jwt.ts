/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

// Generate a JWT token
export function generateToken(payload: object, expiresIn: string = "1d") {
    if (!SECRET_KEY) throw new Error("No secret key was found in the env");
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify a JWT token
export function verifyToken(token: string) {
    if (!SECRET_KEY) throw new Error("No secret key was found in the env");
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error: any) {
        console.error(error);
        return null;
    }
}
