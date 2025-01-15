/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface UserRequestBody {
    name: string;
    email: string;
}

export async function GET() {
    try {
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

export async function POST(request: NextRequest) {
    try {
        const formData: FormData = await request.formData();

        const user = await prisma.user.create({
            data: {
                name: formData.get("name") as string,
                email: formData.get("email") as string,
            },
        });

        return NextResponse.json(
            {
                data: user,
                error: null,
                status: true,
            },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                data: null,
                error: error.message || "An unexpected error occurred.",
                status: false,
            },
            { status: 500 }
        );
    }
}
