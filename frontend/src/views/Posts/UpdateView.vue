<script setup>
import { useAuthStore } from '@/stores/auth';
import { usePostsStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { updatePost, getPost } = usePostsStore();
const { errors } = storeToRefs(usePostsStore());
const { user } = storeToRefs(useAuthStore());

const route = useRoute();
const router = useRouter();

const post = ref(null);

const formData = reactive({
    title: '',
    body: ''
});

onMounted(async () => {
    post.value = await getPost(route.params.id);

    if (user.value.id === post.value.user_id) {
        formData.title = post.value.title;
        formData.body = post.value.body;
    } else {
        router.push({ name: 'home' });
    }
});
</script>

<template>
    <main>
        <h1 class="title">Update Post</h1>

        <form class="w-1/2 mx-auto space-y-4" @submit.prevent="updatePost(post, formData)">
            <div>
                <input type="text" placeholder="Post Title" v-model="formData.title">
                <p class="error" v-if="errors.title">{{ errors.title[0] }}</p>
            </div>
            <div>
                <textarea placeholder="Enter your content here..." rows="6" v-model="formData.body"></textarea>
                <p class="error" v-if="errors.body">{{ errors.body[0] }}</p>
            </div>
            <button class="primary-btn" type="submit">Save</button>
        </form>
    </main>
</template>