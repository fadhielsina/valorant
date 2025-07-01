<template>
  <div class="weapons-page">
    <div v-for="(weaponsList, category) in groupedWeapons" :key="category" class="weapon-category-section">
      <h2 class="category-title">{{ category }}</h2>
      <div class="weapons-grid">
        <router-link
          v-for="weapon in weaponsList"
          :key="weapon.uuid"
          :to="{ name: 'weapon-detail', params: { id: weapon.uuid } }"
          class="weapon-card"
          :style="getWeaponGradientStyle(weapon)"
        >
          <img :src="weapon.displayIcon" :alt="weapon.displayName" />
          <div class="weapon-name">{{ weapon.displayName }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { fetchWeapons } from '@/api/valorant'

const weapons = ref([])

fetchWeapons().then((data) => {
  weapons.value = data
})

// Format kategori dari API menjadi nama bersih
const formatCategory = (category) => category?.replace('EEquippableCategory::', '') || 'Other'

// Group weapons by category
const groupedWeapons = computed(() => {
  const grouped = {}
  weapons.value.forEach((weapon) => {
    const category = formatCategory(weapon.shopData?.category)
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(weapon)
  })
  return grouped
})

// Mapping gradient background berdasarkan kategori
const getWeaponGradientStyle = (weapon) => {
  const categoryGradientMap = {
'Heavy Weapons': ['#5e3c36', '#7e5b4c'],    // redupkan oranye
    'Rifles': ['#2b4e4a', '#143248'],           // redupkan hijau-biru
    'Pistols': ['#642c22', '#702843'],          // redupkan merah-ungu
    'Sniper Rifles': ['#1b4b5e', '#2f2e57'],    // redupkan biru gelap
    'Shotguns': ['#73501a', '#8a6d1f'],         // redupkan kuning-coklat
    'SMGs': ['#631c1a', '#6d2e33'],             // redupkan merah tua
    'Other': ['#4a3b69', '#2a1c4c'],            // ungu gelap
  }

  const category = formatCategory(weapon.shopData?.category)
  const gradient = categoryGradientMap[category] || categoryGradientMap['Other']

  return {
    background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
  }
}
</script>

<style scoped>
.weapons-page {
  padding: 40px;
  color: white;
  min-height: 100vh;
}

.weapon-category-section {
  margin-bottom: 50px;
}

.category-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #ff4444;
  border-bottom: 2px solid #ff4444;
  padding-bottom: 5px;
}

.weapons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
}

.weapon-card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  text-decoration: none;
  color: inherit;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.weapon-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
}

.weapon-card img {
  width: 100%;
  height: 140px;
  object-fit: contain;
  margin-bottom: 10px;
}

.weapon-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
}
</style>
