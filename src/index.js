import Web3 from "web3"
import { ApiPromise, Keyring } from '@polkadot/api'
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto'
const web3NewWallet = () => {
    const web3 = new Web3();
    const account = web3.eth.accounts.create()
    return {
        account: {
            address: account.address,
            privateKey: account.privateKey
        },
        keyStore: account.encrypt(account.privateKey)
    }
}
const polkadotNewWallet = async () => {
    await cryptoWaitReady()
    const mnemonic = mnemonicGenerate()
    const keyring = new Keyring({ type: 'sr25519' })
    const pair = keyring.addFromUri(mnemonic);
    const ss58Address = {
        address: pair.address,
        publicKey: pair.publicKey.join(',')
    }
    return {
        ss58Address,
        mnemonic
    }
}
export default { Web3, Polkadot: ApiPromise, web3NewWallet, polkadotNewWallet}