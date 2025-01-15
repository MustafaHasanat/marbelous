/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const orders = await prisma.order.findMany();

        return Response.json({
            data: orders,
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

        const order = await prisma.order.create({
            data: {
                name: formData.get("name") as string,
            },
        });

        return NextResponse.json(
            {
                data: order,
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
