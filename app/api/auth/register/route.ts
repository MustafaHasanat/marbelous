import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const formData: FormData = await request.formData();

        const secret = formData.get("secret") as string;
        const password = formData.get("password") as string;

        if (process.env.ADMIN_SECRET !== secret)
            return NextResponse.json(
                { error: "Admins only entry" },
                { status: 401 }
            );

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                password: hashedPassword,
            },
        });

        return NextResponse.json({
            data: user,
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
