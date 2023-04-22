<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormRules, FormInstance } from 'element-plus';
import type { IAddCategoryForm } from '@/models/wallet-category';

const emit = defineEmits<{
    (e: 'submit', item: IAddCategoryForm): void;
}>();

const ruleFormRef = ref<FormInstance>();
const form = reactive<IAddCategoryForm>({
    title: '',
});

const rules = reactive<FormRules>({
    title: [{ required: true, message: 'Please input title', trigger: 'blur' }],
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
        <el-form-item>
            <el-button type="primary" @click="submitForm">Create</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>
