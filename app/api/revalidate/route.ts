import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
    const startTime = Date.now();
    console.log(`[Revalidate] Request received at ${new Date(startTime).toISOString()}`);

    const secret = request.nextUrl.searchParams.get('secret');
    const tagParam = request.nextUrl.searchParams.get('tag');

    // 1. Secret Validation
    console.log(`[Revalidate] Checking secret...`);
    if (secret !== process.env.REVALIDATE_SECRET) {
        console.error(`[Revalidate] Invalid secret provided.`);
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }
    console.log(`[Revalidate] Secret valid.`);

    // 2. Extract Tags
    let tagsToRevalidate: string[] = [];

    // Check query param first
    if (tagParam) {
        tagsToRevalidate = tagParam.split(',').map(t => t.trim()).filter(Boolean);
    } else {
        // Check body
        try {
            const body = await request.json();
            if (body.tag) {
                if (Array.isArray(body.tag)) {
                    tagsToRevalidate = body.tag;
                } else if (typeof body.tag === 'string') {
                    tagsToRevalidate = body.tag.split(',').map((t: string) => t.trim()).filter(Boolean);
                }
            }
        } catch (e) {
            // ignore error
            console.log(`[Revalidate] No body or invalid JSON body.`);
        }
    }

    if (tagsToRevalidate.length === 0) {
        console.warn(`[Revalidate] No tags provided to revalidate.`);
        return NextResponse.json({ message: 'Missing tag param' }, { status: 400 });
    }

    // 3. Revalidate
    console.log(`[Revalidate] revalidating tags: ${tagsToRevalidate.join(', ')}`);
    try {
        for (const tag of tagsToRevalidate) {
            // @ts-ignore - The linter expects a second argument, likely due to Next.js 16 beta/canary types
            revalidateTag(tag, 'max');
        }
        console.log(`[Revalidate] Success.`);
        return NextResponse.json({
            revalidated: true,
            tags: tagsToRevalidate,
            now: Date.now()
        });
    } catch (err) {
        console.error(`[Revalidate] Error during revalidation:`, err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
