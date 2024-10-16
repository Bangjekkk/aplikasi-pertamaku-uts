<script setup>
import { ref } from "vue";

const comment = ref("");
const comments = ref([]);

const submitComment = () => {
  comments.value.push(comment.value); // Menambahkan komentar ke array
  comment.value = ""; // Mengosongkan input setelah mengirim
};
</script>

<template>
  <div>
    <h3>Comments</h3>
    <input v-model="comment" placeholder="Leave a comment" />
    <button @click="submitComment">Submit</button>
    <div>
      <p v-for="(c, index) in comments" :key="index">{{ c }}</p>
      <!-- Menampilkan komentar sebagai teks biasa -->
    </div>
  </div>
</template>
