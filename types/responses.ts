import { NextResponse } from 'next/server'
export const ok = <T>(data: T, s = 200) => NextResponse.json({ data, error: null }, { status: s })
export const err = (msg: string, s = 500) => NextResponse.json({ data: null, error: msg }, { status: s })
export const notFound = (r = 'Resource') => err(r + ' not found', 404)
export const unauthorized = () => err('Unauthorized', 401)
