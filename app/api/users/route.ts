/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/configs/prisma";
import { jwtGuard } from "../actions";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        await jwtGuard(request);

        const users = await prisma.user.findMany();

        return Response.json({
            data: users,
            error: null,
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                data: [],
                error: error.message || "An unexpected error occurred.",
                status: false,
            },
            { status: 500 }
        );
    }
}
