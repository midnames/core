/**
 * One-time bootstrap for the LOCAL bench environment (bench/local-env.yml):
 * registers the genesis wallet's NIGHT UTXOs for dust generation and waits
 * until dust is available, so the @midnames/vc server can pay tx fees.
 *
 * (The server itself assumes an already-operating wallet and has no dust
 * registration step — fine on preprod, not on a fresh dev chain.)
 *
 * Run:  set -a; . bench/local.env; set +a; node bench/bootstrap-local-wallet.mjs
 */

import * as Rx from "rxjs";
import { mnemonicToSeedSync } from "bip39";
import { initWalletWithSeed, waitForSync, closeWallet } from "../packages/vc/dist/server/providers.js";
import { loadConfig } from "../packages/vc/dist/server/config.js";

const ZERO_TYPE = "0000000000000000000000000000000000000000000000000000000000000000";

const config = loadConfig();
const seedOrMnemonic = config.walletSeed;
if (!seedOrMnemonic) throw new Error("MIDNIGHT_WALLET_SEED required");
const isHex = /^[0-9a-fA-F]+$/.test(seedOrMnemonic.trim());
const seed = isHex ? Buffer.from(seedOrMnemonic.trim(), "hex") : mnemonicToSeedSync(seedOrMnemonic.trim());

console.log(`[bootstrap] network=${config.networkId} indexer=${config.indexer}`);
const walletContext = await initWalletWithSeed(seed, config);
console.log(`[bootstrap] wallet address: ${walletContext.unshieldedKeystore.getBech32Address().asString()}`);

console.log("[bootstrap] waiting for sync ...");
await waitForSync(walletContext.wallet);

const dustBalanceOf = (s) =>
  s.dust ? s.dust.capabilities.coinsAndBalances.getWalletBalance(s.dust.state, new Date()) : 0n;
const nightBalanceOf = (s) =>
  Object.entries(s.unshielded?.balances ?? {}).reduce((acc, [, v]) => acc + v, 0n);

console.log("[bootstrap] waiting for genesis NIGHT balance to appear ...");
const state = await Rx.firstValueFrom(
  walletContext.wallet.state().pipe(
    Rx.throttleTime(2_000),
    Rx.tap((s) => console.log(`[bootstrap] synced=${s.isSynced} night=${nightBalanceOf(s)} dust=${dustBalanceOf(s)}`)),
    Rx.filter((s) => s.isSynced && (nightBalanceOf(s) > 0n || dustBalanceOf(s) > 0n)),
  ),
);
console.log(`[bootstrap] NIGHT balance: ${nightBalanceOf(state)}`);

const unregistered =
  state.unshielded?.availableCoins.filter(
    (coin) => coin.utxo.type === ZERO_TYPE && coin.meta.registeredForDustGeneration === false,
  ) ?? [];

if (unregistered.length === 0) {
  const dust = dustBalanceOf(state);
  console.log(`[bootstrap] no unregistered NIGHT UTXOs; dust balance = ${dust}`);
  if (dust === 0n) {
    console.log("[bootstrap] waiting for dust to accrue ...");
    await Rx.firstValueFrom(
      walletContext.wallet.state().pipe(
        Rx.throttleTime(5_000),
        Rx.filter((s) => dustBalanceOf(s) > 0n),
      ),
    );
  }
} else {
  console.log(`[bootstrap] registering ${unregistered.length} NIGHT UTXOs for dust generation ...`);
  const recipe = await walletContext.wallet.registerNightUtxosForDustGeneration(
    unregistered,
    walletContext.unshieldedKeystore.getPublicKey(),
    (payload) => walletContext.unshieldedKeystore.signData(payload),
  );
  const finalizedTx = await walletContext.wallet.finalizeTransaction(recipe.transaction);
  await walletContext.wallet.submitTransaction(finalizedTx);
  console.log("[bootstrap] registration tx submitted; waiting for dust > 0 ...");
  await Rx.firstValueFrom(
    walletContext.wallet.state().pipe(
      Rx.throttleTime(5_000),
      Rx.filter((s) => dustBalanceOf(s) > 0n),
    ),
  );
}

const finalState = await Rx.firstValueFrom(walletContext.wallet.state());
console.log(`[bootstrap] dust balance: ${dustBalanceOf(finalState)}`);
await closeWallet(walletContext);
console.log("[bootstrap] done (wallet cache written)");
process.exit(0);
