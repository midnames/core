import type { IssuanceSession, ISessionStore } from "../types/issuer-client.js";

/**
 * In-memory session store with automatic TTL expiration.
 *
 * Suitable for development and single-instance deployments.
 * For production with multiple server instances, use a Redis-backed store.
 */
export class InMemorySessionStore<TSubject = unknown> implements ISessionStore<TSubject> {
  private sessions = new Map<string, IssuanceSession<TSubject>>();
  private sweepInterval: ReturnType<typeof setInterval>;

  constructor(sweepIntervalMs = 60_000) {
    this.sweepInterval = setInterval(() => this.sweep(), sweepIntervalMs);
  }

  private sweep(): void {
    const now = Date.now();
    for (const [id, session] of this.sessions) {
      if (now > session.expiresAt) this.sessions.delete(id);
    }
  }

  destroy(): void {
    clearInterval(this.sweepInterval);
  }

  get(id: string): IssuanceSession<TSubject> | undefined {
    const session = this.sessions.get(id);
    if (!session) return undefined;

    if (Date.now() > session.expiresAt && session.state === "pending") {
      const expired = { ...session, state: "expired" as const, updatedAt: Date.now() };
      this.sessions.set(id, expired);
      return expired;
    }

    return session;
  }

  create(session: IssuanceSession<TSubject>): void {
    this.sessions.set(session.id, session);
  }

  update(id: string, updates: Partial<IssuanceSession<TSubject>>): boolean {
    const session = this.sessions.get(id);
    if (!session) return false;
    this.sessions.set(id, { ...session, ...updates, updatedAt: Date.now() });
    return true;
  }
}
