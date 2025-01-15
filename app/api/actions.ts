import { verifyToken } from "@/lib/configs/jwt";
import { NextRequest } from "next/server";

export const jwtGuard = async (request: NextRequest) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Unauthorized access");
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        throw new Error("Invalid or expired token");
    }
};
