import { NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';

export async function middleware(request: Request) {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
            { error: 'Unauthorized access' },
            { status: 401 }
        );
    }

    const token = authHeader.split(' ')[1];
    const verified = verifyToken(token);

    if (!verified) {
        return NextResponse.json(
            { error: 'Invalid or expired token' },
            { status: 401 }
        );
    }

    return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
    matcher: '/api/:path*',
};
