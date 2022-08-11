<script setup>
import Headers from './Header.vue'
import { ref } from 'vue'
import spf from './../index'
const activeName = ref('web3')
const spfWeb3WalletJson = JSON.parse(localStorage.getItem('spf-web3-wallet')) || []
const dynamicTags = ref([...spfWeb3WalletJson])
const spfPolkadotWalletJson = JSON.parse(localStorage.getItem('spf-polkadot-wallet')) || []
const polkadotTags = ref([...spfPolkadotWalletJson])

const updateDynamicTags = (value) => {
    localStorage.setItem('spf-web3-wallet', JSON.stringify(value))
}
const updatePolkadotTags = (value) => {
    localStorage.setItem('spf-polkadot-wallet', JSON.stringify(value))
}
const handleClose = (index) => {
    dynamicTags.value.splice(index, 1)
    updateDynamicTags(dynamicTags.value)
}
const newWallet = () => {
    const wallet = spf.web3NewWallet()
    dynamicTags.value.push(wallet)
    updateDynamicTags(dynamicTags.value)
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
</style>
