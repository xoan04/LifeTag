import { NextRequest, NextResponse } from 'next/server';

/** Destino real del backend (misma variable que documenta la URL en .env). */
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://apilifetag.kodelabs.dev').replace(/\/$/, '');

function upstreamUrl(pathSegments: string[], search: string) {
    const path = pathSegments.length ? pathSegments.join('/') : '';
    const base = path ? `${API_BASE}/api/${path}` : `${API_BASE}/api`;
    return search ? `${base}${search}` : base;
}

async function proxy(req: NextRequest, pathSegments: string[]) {
    const target = upstreamUrl(pathSegments, req.nextUrl.search);
    const headers = new Headers();
    req.headers.forEach((value, key) => {
        const lower = key.toLowerCase();
        if (['host', 'connection', 'keep-alive', 'transfer-encoding'].includes(lower)) return;
        if (lower === 'content-length') return;
        headers.set(key, value);
    });

    const init: RequestInit = {
        method: req.method,
        headers,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
        const buf = await req.arrayBuffer();
        if (buf.byteLength > 0) init.body = buf;
    }

    const res = await fetch(target, init);
    const outHeaders = new Headers();
    res.headers.forEach((value, key) => {
        const lower = key.toLowerCase();
        if (['content-encoding', 'transfer-encoding', 'connection'].includes(lower)) return;
        outHeaders.set(key, value);
    });
    return new NextResponse(res.body, {
        status: res.status,
        statusText: res.statusText,
        headers: outHeaders,
    });
}

type RouteCtx = { params: { path?: string[] } };

export async function GET(req: NextRequest, ctx: RouteCtx) {
    return proxy(req, ctx.params.path ?? []);
}

export async function POST(req: NextRequest, ctx: RouteCtx) {
    return proxy(req, ctx.params.path ?? []);
}

export async function PUT(req: NextRequest, ctx: RouteCtx) {
    return proxy(req, ctx.params.path ?? []);
}

export async function PATCH(req: NextRequest, ctx: RouteCtx) {
    return proxy(req, ctx.params.path ?? []);
}

export async function DELETE(req: NextRequest, ctx: RouteCtx) {
    return proxy(req, ctx.params.path ?? []);
}

export async function OPTIONS(req: NextRequest, ctx: RouteCtx) {
    return proxy(req, ctx.params.path ?? []);
}
