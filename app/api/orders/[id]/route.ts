/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/configs/prisma";
import { jwtGuard } from "../../actions";

export const dynamic = "force-dynamic";

export async function GET(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    try {
        await jwtGuard(request);

        const order = await prisma.order.findUnique({ where: { id: id } });

        return NextResponse.json(
            {
                data: order,
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
    { params: { id } }: { params: { id: string } }
) {
    try {
        await jwtGuard(request);

        const formData: FormData = await request.formData();

        const order = await prisma.order.update({
            where: { id },
            data: {
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                phoneNumber: formData.get("phoneNumber") as string,
                description: formData.get("description") as string,
                city: formData.get("city") as string,
                address: formData.get("address") as string,
            },
        });

        return NextResponse.json(
            {
                data: order,
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
    { params: { id } }: { params: { id: string } }
) {
    try {
        await jwtGuard(request);

        const order = await prisma.order.delete({ where: { id: id } });

        return NextResponse.json(
            {
                data: order,
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
