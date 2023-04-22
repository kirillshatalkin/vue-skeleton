<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import type { FormRules, FormInstance } from 'element-plus';
import type { IWalletAddItemForm } from '@/models/wallet-item';
import type { ICategory } from '@/models/wallet-category';
import type { IWalletItemWithCategory } from '@/models/wallet-item';

const props = defineProps<{
    categories: ICategory[];
    item?: IWalletItemWithCategory;
}>();

const emit = defineEmits<{
    (e: 'submit', item: IWalletAddItemForm): void;
}>();

const submitText = computed(() => (props.item ? 'Edit' : 'Create'));

const ruleFormRef = ref<FormInstance>();
const form = reactive<IWalletAddItemForm>({
    id: props.item?.id,
    title: props.item?.title ?? '',
    categoryId: props.item?.categoryId,
    date: props.item?.date ?? new Date(),
    price: props.item?.price,
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
    <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
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
            <el-button type="primary" @click="submitForm">{{ submitText }}</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>
