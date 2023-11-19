import { NextResponse } from "next/server";

interface Args {
  [key: string]: any;
  status?: number;
}

export function successRes(args: Args) {
  return NextResponse.json(args, { status: args?.status || 200 });
}

export function errorRes(args: Args) {
  return NextResponse.json(args, { status: args?.status || 400 });
}
