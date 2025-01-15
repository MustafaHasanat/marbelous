/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/configs/prisma";
import { jwtGuard } from "@/app/api/actions";

export const dynamic = "force-dynamic";

export async function GET(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    try {
        await jwtGuard(request);

        const ordersCount = await prisma.order.count({
            where: {
                itemId: id,
            },
        });

        return NextResponse.json(
            {
                data: ordersCount,
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
