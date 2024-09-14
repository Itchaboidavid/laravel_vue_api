<script setup>
import { useAuthStore } from '@/stores/auth';
import { usePostsStore } from '@/stores/posts';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { getPost, deletePost } = usePostsStore();
const post = ref(null);

const authStore = useAuthStore();

onMounted(async () => post.value = await getPost(route.params.id))
</script>

<template>
    <main class="p-10">
        <div v-if="post">
            <div class="border-l-4 border-blue-500 pl-4 mb-12">
                <h2 class="font-bold text-xl">{{ post.title }}</h2>
                <p class="text-xs text-slate-600 mb-4">Posted by {{ post.user.name }}</p>
                <p>
                    {{ post.body }}
                </p>
                <div class="flex items-center gap-6 mt-6" v-if="authStore.user && authStore.user.id === post.user_id">
                    <form @submit.prevent="deletePost(post)">
                        <button type="submit" class="text-red-500 font-bold px-2 py-1 border border-red-300">
                            Delete
                        </button>
                    </form>
                    <RouterLink :to="{ name: 'updatePost', params: { id: post.id } }"
                        class="text-green-500 font-bold px-2 py-1 border border-green-300">
                        Update
                    </RouterLink>
                </div>
            </div>
        </div>
        <div v-else>
            <p>There's no available post</p>
        </div>
    </main>
</template>