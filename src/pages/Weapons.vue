<template>
  <div class="weapons-page">
    <h1>Our Weapons</h1>
    <div class="weapons-grid">
      <router-link
        v-for="weapon in weapons"
        :key="weapon.uuid"
        :to="{ name: 'weapon-detail', params: { id: weapon.uuid } }"
        class="weapon-card"
      >
        <img :src="weapon.displayIcon" :alt="weapon.displayName" />
        <div class="weapon-name">{{ weapon.displayName }}</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { fetchWeapons } from '@/api/valorant'

const weapons = ref([])
fetchWeapons().then((data) => {
    weapons.value = data
})
</script>

<style scoped>
.weapons-page {
  padding: 40px;
  color: white;
  min-height: 100vh;
}

.weapons-page h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  color: #ff4444;
}

.weapons-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.weapon-card {
  background-color: #1c1c1c;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  text-decoration: none;
  color: inherit;
}

.weapon-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(255, 0, 0, 0.4);
}

.weapon-card img {
  width: 90%;         /* gambar lebar */
  height: 140px;      /* gambar cukup tinggi */
  object-fit: contain;
  display: block;
}

.weapon-name {
  padding: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
}
</style>
