/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/configs/prisma";
import { jwtGuard } from "../../actions";

export const dynamic = "force-dynamic";

export async function GET(
    request: NextRequest,
    { params: { identifier } }: { params: { identifier: string } }
) {
    try {
        await jwtGuard(request);

        const record = await prisma.marbelous.findUnique({
            where: { identifier },
        });

        return NextResponse.json(
            {
                data: record,
                error: null,
                status: true,
            },
            { status: 200 }
        );
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

export async function PATCH(
    request: NextRequest,
    { params: { identifier } }: { params: { identifier: string } }
) {
    try {
        await jwtGuard(request);

        const data = await request.json();

        const record = await prisma.marbelous.update({
            where: { identifier },
            data,
        });

        return NextResponse.json(
            {
                data: record,
                error: null,
                status: true,
            },
            { status: 200 }
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

export async function DELETE(
    request: NextRequest,
    { params: { identifier } }: { params: { identifier: string } }
) {
    try {
        await jwtGuard(request);

        const record = await prisma.marbelous.delete({ where: { identifier } });

        return NextResponse.json(
            {
                data: record,
                error: null,
                status: true,
            },
            { status: 200 }
        );
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
