<script setup>
import Headers from './Header.vue'
import { ref, watch } from 'vue'
import spf from './../index'
const activeName = ref('web3')
const spfWeb3WalletJson = JSON.parse(localStorage.getItem('spf-web3-wallet')) || []
const dynamicTags = ref([...spfWeb3WalletJson])
const spfPolkadotWalletJson = JSON.parse(localStorage.getItem('spf-polkadot-wallet')) || []
const polkadotTags = ref([...spfPolkadotWalletJson])
const loading = ref({
    getBalance: false,
    web3SendTransaction: false
})
watch(() => dynamicTags.value, (value) => {
    updateDynamicTags(value)
}, { deep: true })
// 0x5F245F071103BB8bcC4Dd5ee4A57F15347514f58
// 0x9b44a46e2645cb7db6e13aa8e7cf9b05f26d824375f011cfb7c98545e0ab9987
// 0xe42E69E8B2480E9fFF0Dc1Cd3afd1D1fc253Cdd4
// 0x5e67cfd304b92ecb404f204f8799dc1d5032939a939dbf638d08a1098162a198
// spf.web3SendTransaction({ from: '0x9b44a46e2645cb7db6e13aa8e7cf9b05f26d824375f011cfb7c98545e0ab9987', to: '0xe42E69E8B2480E9fFF0Dc1Cd3afd1D1fc253Cdd4', value: '0.001'})
const updateDynamicTags = (value) => {
    localStorage.setItem('spf-web3-wallet', JSON.stringify(value))
}
const updatePolkadotTags = (value) => {
    localStorage.setItem('spf-polkadot-wallet', JSON.stringify(value))
}
const handleClose = (index) => {
    dynamicTags.value.splice(index, 1)
}
const newWallet = () => {
    const wallet = spf.web3NewWallet()
    dynamicTags.value.push(wallet)
}

const handlePolkadotClose = (index) => {
    polkadotTags.value.splice(index, 1)
    updatePolkadotTags(polkadotTags.value)
}

const newPolkadotWallet = async () => {
    const wallet = await spf.polkadotNewWallet()
    polkadotTags.value.push(wallet)
    updatePolkadotTags(polkadotTags.value)
}
const getBalance = async (address, index) => {
    loading.value.getBalance = true
    const balance = await spf.web3Wallet(address)
    dynamicTags.value[index].balance = balance
    loading.value.getBalance = false
}
const web3SendTransaction = async (from, to, value, address, index) => {
    loading.value.web3SendTransaction = true
    const res = await spf.web3SendTransaction({ from, to, value})
    loading.value.web3SendTransaction = false
    getBalance(address, index)
    dynamicTags.value[index].value = ''
}

</script>

<template>
    <div class="home-wrapper">
        <Headers />
        <div class="home-body">
            <el-tabs v-model="activeName">
                <el-tab-pane label="web3" name="web3">
                    <div v-for="tag, index in dynamicTags" :key="tag.account.address">
                        <el-popover placement="right" :width="700" trigger="hover">
                            <template #reference>
                                <el-tag closable :disable-transitions="false" @close="handleClose(index)">
                                    {{ tag.account.address }}
                                </el-tag>
                            </template>
                            <template #default>
                                <el-descriptions :column="1" border>
                                    <el-descriptions-item label-align="right" align="center">
                                        <template #label>
                                            <div class="descriptions-label-class">
                                                address
                                            </div>
                                        </template>
                                        {{ tag.account.address }}
                                    </el-descriptions-item>
                                    <el-descriptions-item label="privateKey" label-align="right" align="center">
                                        {{ tag.account.privateKey }}</el-descriptions-item>
                                    <el-descriptions-item label="keyStore" label-align="right" align="center"> {{
                                            tag.keyStore
                                    }}
                                    </el-descriptions-item>
                                    <el-descriptions-item label="balance" label-align="right" align="center">
                                        <div class="descriptions-tag-balance">
                                            <template v-if="tag.balance">
                                                <div style="margin-right: 10px;"> {{ tag.balance }}</div>
                                            </template>
                                            <el-button :loading="loading.getBalance"
                                                @click="getBalance(tag.account.address, index)" type="primary">{{
                                                        tag.balance ? `Update` : `Gain`
                                                }}</el-button>
                                        </div>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="operation" label-align="right" align="center">
                                        <div class="descriptions-tag-balance">
                                            <el-input style="margin-right: 10px;" v-model="tag.to" placeholder="address" />
                                            <el-input style="margin-right: 10px; width: 200px;" v-model="tag.value" placeholder="value" />
                                            <el-button :loading="loading.web3SendTransaction" type="primary" @click="web3SendTransaction(tag.account.privateKey, tag.to, tag.value, tag.account.address, index)">Transaction</el-button>
                                        </div>
                                    </el-descriptions-item>
                                </el-descriptions>
                            </template>
                        </el-popover>
                    </div>
                    <el-button class="button-new-tag ml-1" size="small" @click="newWallet()">
                        + New Wallet
                    </el-button>
                </el-tab-pane>
                <el-tab-pane label="polkadot" name="polkadot">
                    <div v-for="tag, index in polkadotTags" :key="tag.ss58Address.address">
                        <el-popover placement="right" :width="700" trigger="hover">
                            <template #reference>
                                <el-tag closable :disable-transitions="false" @close="handlePolkadotClose(index)">
                                    {{ tag.ss58Address.address }}
                                </el-tag>
                            </template>
                            <template #default>
                                <el-descriptions :column="1" border>
                                    <el-descriptions-item label-align="right" align="center">
                                        <template #label>
                                            <div class="descriptions-label-class">
                                                address
                                            </div>
                                        </template>
                                        {{ tag.ss58Address.address }}
                                    </el-descriptions-item>
                                    <el-descriptions-item label="publicKey" label-align="right" align="center">
                                        {{ tag.ss58Address.publicKey }}</el-descriptions-item>
                                    <el-descriptions-item label="mnemonic" label-align="right" align="center"> {{
                                            tag.mnemonic
                                    }}
                                    </el-descriptions-item>
                                </el-descriptions>
                            </template>
                        </el-popover>
                    </div>
                    <el-button class="button-new-tag ml-1" size="small" @click="newPolkadotWallet()">
                        + New Wallet
                    </el-button>
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>

<style scoped>
.home-body {
    padding: 0 24px;
}

.el-tab-pane>div {
    display: flex;
    flex-direction: column;
}

.el-tab-pane>div .el-tag {
    width: 100%;
    max-width: 400px;
    margin-bottom: 8px;
    justify-content: space-between;
}

.button-new-tag {
    width: 400px;
}

.descriptions-label-class {
    width: 100px;
}

.descriptions-tag-balance {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
