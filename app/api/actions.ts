import { verifyToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export const jwtGuard = async (request: NextRequest) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
            { error: "Unauthorized access" },
            { status: 401 }
        );
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return NextResponse.json(
            { error: "Invalid or expired token" },
            { status: 401 }
        );
    }
};
