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

        const item = await prisma.item.findUnique({ where: { id: id } });

        return NextResponse.json(
            {
                data: item,
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

        const item = await prisma.item.update({
            where: { id },
            data: {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                price: Number(formData.get("price") as string),
                image: formData.get("image") as string,
            },
        });

        return NextResponse.json(
            {
                data: item,
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

        const item = await prisma.item.delete({ where: { id: id } });

        return NextResponse.json(
            {
                data: item,
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
