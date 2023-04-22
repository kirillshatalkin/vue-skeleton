<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormRules, FormInstance } from 'element-plus';
import type { IWalletAddItemForm } from '@/models/wallet-item';
import type { ICategory } from '@/models/wallet-category';

defineProps<{
    categories: ICategory[];
}>();

const emit = defineEmits<{
    (e: 'submit', item: IWalletAddItemForm): void;
}>();

const ruleFormRef = ref<FormInstance>();
const form = reactive<IWalletAddItemForm>({
    title: '',
    categoryId: '',
    date: new Date(),
    price: '',
});

const rules = reactive<FormRules>({
    title: [{ required: true, message: 'Please input title', trigger: 'blur' }],
    categoryId: [
        {
            required: true,
            message: 'Please select category',
            trigger: 'change',
        },
    ],
    price: [
        {
            required: true,
            message: 'Please input price',
            trigger: 'blur',
        },
        { type: 'number', message: 'Price must be a number' },
    ],
    date: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
        },
    ],
});

const submitForm = () => {
    ruleFormRef.value?.validate(valid => {
        if (valid) {
            emit('submit', form);
        }
    });
};
</script>

<template>
    <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef" v-loading="showLoader">
        <el-form-item label="Title" prop="title">
            <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="Price" prop="price">
            <el-input v-model.number="form.price" />
        </el-form-item>
        <el-form-item label="Categories" prop="categoryId">
            <el-select v-model.number="form.categoryId" placeholder="Select your category">
                <el-option :label="item.title" :value="item.id" v-for="item in categories" :key="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="date">
            <el-col>
                <el-date-picker v-model="form.date" type="date" placeholder="Pick a date" style="width: 100%" />
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">Create</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>
