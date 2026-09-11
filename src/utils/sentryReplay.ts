import { getClient, replayIntegration } from '@sentry/vue'

/**
 * Attaches Sentry's session replay recorder to the running client.
 *
 * The rrweb recorder behind `replayIntegration` is the heaviest part of the Sentry SDK, so it
 * belongs in a chunk that loads once the app is on screen rather than in the one that gates
 * mounting. Sampling stays where `Sentry.init` declares it: the integration reads
 * `replaysSessionSampleRate` and `replaysOnErrorSampleRate` from the client's options.
 */
export function startSessionReplay(): void {
  getClient()?.addIntegration(replayIntegration({ maskAllText: true, blockAllMedia: true }))
}
