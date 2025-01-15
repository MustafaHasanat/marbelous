import { NextResponse } from "next/server";
import { prisma } from "@/lib/configs/prisma";
import { generateToken } from "@/lib/configs/jwt";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const formData: FormData = await request.formData();

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Find user in the database
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Generate a token
        const token = generateToken({ userId: user.id });

        return NextResponse.json({
            data: {
                token,
                user,
            },
            error: null,
            status: true,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
