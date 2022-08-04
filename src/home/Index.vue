<script setup>
import Headers from './Header.vue'
import { ref } from 'vue'
import spf from './../index'
const activeName = ref('web3')
const spfWeb3WalletJson = JSON.parse(localStorage.getItem('spf-web3-wallet')) || []
const dynamicTags = ref([...spfWeb3WalletJson])
const handleClose = (index) => {
    dynamicTags.value.splice(index, 1)
}

const newWallet = () => {
    const wallet = spf.web3NewWallet()
    console.log(wallet)
    dynamicTags.value.push(wallet)
    localStorage.setItem('spf-web3-wallet', JSON.stringify(dynamicTags.value))
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
                                    <el-descriptions-item
                                        label-align="right" align="center">
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
                <el-tab-pane label="polkadot" name="polkadot">polkadot</el-tab-pane>
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
    max-width: 350px;
    margin-bottom: 8px;
    justify-content: space-between;
}

.button-new-tag {
    width: 350px;
}

.descriptions-label-class {
    width: 100px;
}
</style>
