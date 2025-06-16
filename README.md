# Midnames

> [!NOTE]
> This repo uses `bun`. Look up how to install it [here](https://bun.sh/).

## Contract

To build the contract, `bun run compact && bun run build`

The main file is `midnames.compact`. It contains the top level exports and some functions used everywhere in the project.
For update and retrieval simplicity, each key of the `Document` is saved in an individual `Map<DID, DocumentKey>` in the `ledger.compact` file.
The types of each `DocumentKey` are defined in `types.compact` file.
The witnesses are defined in the `witnesses.compact` file.
All circuits regarding creation and updating of the DID Document are defined in the `circuits.compact` file.

### Exported circuits

- `create_did`
- `update_did_authentication_methods`
- `update_did_authorized_controllers_from_multiple_sk`
- `update_did_authorized_controllers_from_pk`
- `update_did_authorized_controllers_from_sk`
- `update_did_context`
- `update_did_credentials`
- `update_did_services`
- `update_did_verification_methods`

Right now, the update methods modify in-place the Document. This is not the definitive behaviour, but we are waiting for timestamp support in Midnight.

## CLI

The CLI package provides commands for local and testnet deployment and usage. The `bun run standalone` and the `bun run testnet-remote-ps` commands allow the user to deploy and interact with the contract. If the user wants to interact with an already deployed contract, an address can be provided and the CLI will connect to that one.

## Utils

The `utils` folder works as a “proto-sdk”: it contains functions that will be in the Midnames SDK in the future.
