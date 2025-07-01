<template>
  <div class="weapon-detail-page" v-if="weapon">
    <h1>{{ weapon.displayName }}</h1>
    <img :src="weapon.displayIcon" :alt="weapon.displayName" />
    <div class="weapon-info">
      <p><strong>Category:</strong> {{ weapon.category }}</p>
      <p><strong>Cost:</strong> {{ weapon.shopData?.cost || 'N/A' }}</p>
      <p><strong>Fire Rate:</strong> {{ weapon.weaponStats?.fireRate || 'N/A' }}</p>
    </div>

    <!-- Skins -->
    <div v-if="weapon.skins?.length" class="skins-section">
      <h2>Skins</h2>
      <div class="skins-grid">
        <div v-for="skin in weapon.skins" :key="skin.uuid" class="skin-card">
          <img :src="skin.displayIcon || '/default-skin.png'" :alt="skin.displayName" />
          <p>{{ skin.displayName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getWeaponById } from '@/api/valorant'

const route = useRoute()
const weapon = ref(null)

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await getWeaponById(id)
    weapon.value = response
  } catch (error) {
    console.error('Error fetching weapon:', error)
    weapon.value = null
  }
})
</script>

<style scoped>
.weapon-detail-page {
  padding: 40px;
  color: white;
  min-height: 100vh;
  text-align: center;
}

.weapon-detail-page h1 {
  font-size: 2.5rem;
  color: #ff4444;
  margin-bottom: 20px;
}

.weapon-detail-page img {
  width: 300px;
  max-width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
}

.weapon-info {
  font-size: 1.1rem;
  color: #eee;
  max-width: 600px;
  margin: 0 auto 40px;
  text-align: left;
}

/* Skins section */
.skins-section {
  margin-top: 50px;
}

.skins-section h2 {
  color: #ff4444;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.skins-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.skin-card {
  background-color: #1e1e1e;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s;
}

.skin-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
}

.skin-card img {
  width: 100%;
  height: 100px;
  object-fit: contain;
  margin-bottom: 10px;
}

.skin-card p {
  font-size: 0.9rem;
  color: #fff;
}

.not-found {
  padding: 100px;
  text-align: center;
  color: #ccc;
}
</style>
