import type { IncomingMessage, ServerResponse } from "node:http";
import { timingSafeEqual } from "node:crypto";
import * as MidnamesServerConstants from "../constants.js";

export function setCorsHeaders(res: ServerResponse): void {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, ngrok-skip-browser-warning");
}

export function json(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

export function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let totalSize = 0;
    req.on("data", (chunk: Buffer) => {
      totalSize += chunk.length;
      if (totalSize > MidnamesServerConstants.MAX_BODY_SIZE) {
        req.destroy();
        reject(new Error("Request body too large"));
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString()));
    req.on("error", reject);
  });
}

export function requireAuth(req: IncomingMessage, res: ServerResponse): boolean {
  const auth = req.headers.authorization;
  if (!auth) { json(res, 401, { error: "Unauthorized" }); return false; }
  const expected = `Bearer ${MidnamesServerConstants.API_KEY}`;
  const authBuf = Buffer.from(auth);
  const expectedBuf = Buffer.from(expected);
  if (authBuf.length !== expectedBuf.length || !timingSafeEqual(authBuf, expectedBuf)) {
    json(res, 401, { error: "Unauthorized" });
    return false;
  }
  return true;
}

export function validateBody<T>(
  res: ServerResponse,
  schema: { safeParse(data: unknown): { success: true; data: T } | { success: false; error: { errors: unknown[] } } },
  data: unknown,
): T | null {
  const result = schema.safeParse(data);
  if (!result.success) {
    json(res, 400, { error: "Validation failed", details: result.error.errors });
    return null;
  }
  return result.data;
}
