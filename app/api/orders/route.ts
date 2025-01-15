/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/configs/prisma";
import { jwtGuard } from "../actions";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        await jwtGuard(request);

        const orders = await prisma.order.findMany();

        return NextResponse.json(
            {
                data: orders,
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

export async function POST(request: NextRequest) {
    try {
        await jwtGuard(request);

        const formData: FormData = await request.formData();
        const itemId = formData.get("itemId") as string;

        const order = await prisma.order.create({
            data: {
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                phoneNumber: formData.get("phoneNumber") as string,
                description: formData.get("description") as string,
                city: formData.get("city") as string,
                address: formData.get("address") as string,
                ...(itemId ? { itemId } : {}),
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
