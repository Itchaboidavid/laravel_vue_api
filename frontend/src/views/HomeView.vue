<script setup>
import { onMounted, ref } from 'vue';
import { usePostsStore } from '@/stores/posts';

const { getAllPosts } = usePostsStore();
const posts = ref([]);

onMounted(async () => posts.value = await getAllPosts());
</script>

<template>
  <main>
    <h1 class="title">Hello</h1>

    <div v-if="posts.length > 0">
      <div v-for="post in posts" :key="post.id" class="border-l-4 border-blue-500 pl-4 mb-12">
        <h2 class="font-bold text-xl">{{ post.title }}</h2>
        <p class="text-xs text-slate-600 mb-4">Posted by {{ post.user.name }}</p>
        <p>
          {{ post.body }}
          <RouterLink :to="{ name: 'showPost', params: { id: post.id } }"
            class="text-blue-500 text-xs block py-1 hover:underline">
            Read more &rAarr;
          </RouterLink>
        </p>
      </div>
    </div>
    <div v-else>
      <p>There's no available post</p>
    </div>
  </main>
</template>
