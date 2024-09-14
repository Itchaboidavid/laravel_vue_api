<script setup>
import { usePostsStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';

const { createPost } = usePostsStore();
const { errors } = storeToRefs(usePostsStore());

const formData = reactive({
    title: '',
    body: ''
});


</script>

<template>
    <main>
        <h1 class="title">Create a new post</h1>

        <form class="w-1/2 mx-auto space-y-4" @submit.prevent="createPost(formData)">
            <div>
                <input type="text" placeholder="Post Title" v-model="formData.title">
                <p class="error" v-if="errors.title">{{ errors.title[0] }}</p>
            </div>
            <div>
                <textarea placeholder="Enter your content here..." rows="6" v-model="formData.body"></textarea>
                <p class="error" v-if="errors.body">{{ errors.body[0] }}</p>
            </div>
            <button class="primary-btn" type="submit">Create Post</button>
        </form>
    </main>
</template>