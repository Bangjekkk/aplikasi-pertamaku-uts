<script setup>
import { ref } from "vue";

const comment = ref("");
const comments = ref([]);

const commentTimestamps = new Map(); // Menyimpan waktu komentar terakhir untuk setiap pengguna

const submitComment = () => {
  const now = Date.now();

  // Menggunakan username atau ID pengguna sebagai kunci
  const userKey = "userIdentifier"; // Ganti dengan identifikasi unik pengguna

  const lastCommentTime = commentTimestamps.get(userKey) || 0;

  // Batasi satu komentar per menit
  if (now - lastCommentTime < 60000) {
    alert("Please wait before submitting another comment.");
    return;
  }

  comments.value.push(comment.value);
  commentTimestamps.set(userKey, now);
  comment.value = "";
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
