<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="2">
                    <img alt="Logo" class="logo" src="@/assets/logo.svg" />
                </el-col>
                <el-col :span="22">
                    <h1>Skeleton. {{ route.name }}</h1>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <RouterView />
        </el-main>
    </el-container>
</template>

<style scoped>
.logo {
    width: 56px;
    height: 56px;
}
</style>
