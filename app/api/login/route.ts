import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { username, password } = await request.json();

    // Example: Hardcoded credentials for demonstration
    const validUsername = 'admin';
    const validPassword = 'h@reKr!$hn@108';

    if (username === validUsername && password === validPassword) {
        return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } else {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
}

// ... existing code ...
