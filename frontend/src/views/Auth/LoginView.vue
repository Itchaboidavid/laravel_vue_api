<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, toRef } from 'vue';

const { authenticate } = useAuthStore();
const { errors } = storeToRefs(useAuthStore());

const formData = reactive({
    email: '',
    password: '',
});

onMounted(() => errors.value = {});
</script>

<template>
    <main>
        <h1 class="title">Welcome back!</h1>
        <p v-if="errors.credentials" class="error text-center my-3">{{ errors.credentials[0] }}</p>
        <!-- FORM -->
        <form class="w-1/2 mx-auto space-y-4" @submit.prevent="authenticate('login', formData)">
            <div>
                <input type="text" placeholder="Email" v-model="formData.email">
                <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
            </div>
            <div>
                <input type="password" placeholder="Password" v-model="formData.password">
                <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
            </div>
            <button class="primary-btn">Login</button>
        </form>
    </main>
</template>
