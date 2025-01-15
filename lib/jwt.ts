/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Generate a JWT token
export function generateToken(payload: object, expiresIn: string = "1h") {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify a JWT token
export function verifyToken(token: string) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error: any) {
        console.error(error);
        return null;
    }
}
