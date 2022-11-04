import Web3 from "web3"
import { ApiPromise, Keyring } from '@polkadot/api'
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto'
const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/3398e48e733d4b9bb337702c05a77c2d'))

const web3NewWallet = () => {
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
    console.log(keyring.encodeAddress(pair.publicKey))
    const ss58Address = {
        address: pair.address,
        publicKey: pair.publicKey.join(',')
    }
    return {
        ss58Address,
        mnemonic
    }
}
const web3Wallet = async (address) => {
    const account = await web3.eth.getBalance(address)
    return web3.utils.fromWei(account, 'ether')
}
const web3SendTransaction = async ({ from, to, value }) => {
    const account = web3.eth.accounts.wallet.add(from)
    const gasPrice = 30 * 1e9
    const signed = await account.signTransaction({
        from: account.address,
        to,
        value: web3.utils.toWei(value, 'ether'),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: gasPrice
    })
    const hash = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    return hash
}
export default { Web3, Polkadot: ApiPromise, web3NewWallet, polkadotNewWallet, web3Wallet, web3SendTransaction }