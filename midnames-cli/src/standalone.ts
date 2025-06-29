import { createLogger } from './logger-utils.js';
import path from 'node:path';
import { run } from './cli.js';
import { DockerComposeEnvironment, Wait } from 'testcontainers';
import { currentDir, StandaloneConfig } from './config.js';

const config = new StandaloneConfig();
const dockerEnv = new DockerComposeEnvironment(path.resolve(currentDir, '..'), 'standalone.yml')
  .withWaitStrategy('midnames-proof-server', Wait.forLogMessage('Actix runtime found; starting in Actix runtime', 1))
  .withWaitStrategy('midnames-indexer', Wait.forLogMessage(/starting indexing/, 1));
const logger = await createLogger(config.logDir);
await run(config, logger, dockerEnv);
