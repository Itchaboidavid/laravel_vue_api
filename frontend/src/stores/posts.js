import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const usePostsStore = defineStore("postsStore", {
  state: () => {
    return {
      errors: {},
    };
  },
  getters: {},
  actions: {
    //CREATE POST
    async createPost(formData) {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.router.push({ name: "home" });
      }
    },

    //GET ALL POSTS
    async getAllPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();

      return data.data;
    },

    //GET POST
    async getPost(post) {
      const res = await fetch(`/api/posts/${post}`);

      if (res.ok) {
        const data = await res.json();
        return data.post;
      }
    },

    //DELETE POST
    async deletePost(post) {
      const authStore = useAuthStore();

      if (authStore.user.id === post.user_id) {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.ok) {
          this.router.push({ name: "home" });
        }
      } else {
        console.log("You don't own this post");
      }
    },

    //UPDATE POST
    async updatePost(post, formData) {
      const authStore = useAuthStore();

      if (authStore.user.id === post.user_id) {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
          this.errors = data.errors;
        } else {
          this.router.push({ name: "home" });
          this.errors = {};
        }
      }
    },
  },
});
