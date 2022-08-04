import Web3 from "web3"
import { ApiPromise, Keyring } from '@polkadot/api'
const web3NewWallet = () => {
    const web3 = new Web3();
    const account = web3.eth.accounts.create();
    return {
        account: {
            address: account.address,
            privateKey: account.privateKey
        },
        keyStore: account.encrypt(account.privateKey)
    }
}
const polkadotNewWallet = () => {
    const polkadot = new Keyring();
    const alice = polkadot.addFromUri('//Alice', { name: 'Alice default' });
    return {
        alice
    }
}
export default { Web3, Polkadot: ApiPromise, web3NewWallet, polkadotNewWallet}