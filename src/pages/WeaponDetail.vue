<template>
  <div class="weapon-detail-page" v-if="weapon">
    <!-- TOP SECTION -->
    <div class="top-section">
      <!-- LEFT PANEL -->
      <div class="left-panel">
        <h1>{{ activeChroma.displayName || activeSkin.displayName }}</h1>
        <img :src="activeChroma.fullRender || activeSkin.displayIcon || weapon.displayIcon" :alt="activeSkin.displayName" />
      </div>

      <!-- RIGHT PANEL: Chromas -->
      <div class="right-panel">
        <div class="chromas-section" v-if="activeSkin.chromas?.length">
          <div class="chroma-list">
            <div
              v-for="chroma in activeSkin.chromas"
              :key="chroma.uuid"
              class="chroma-card"
              @click="setActiveChroma(chroma)"
              :class="{ active: activeChroma.uuid === chroma.uuid }"
            >
              <img :src="chroma.swatch || chroma.fullRender || '/default-chroma.png'" :alt="chroma.displayName" />
              <p>{{ chroma.displayName }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No chromas available.</p>
        </div>
      </div>
    </div>

    <!-- SKINS SECTION -->
    <div v-if="weapon.skins?.length" class="skins-section">
      <h2>Available Skins</h2>
      <div class="skins-slider-container">
        <button class="slider-arrow left" @click="scrollSlider('left')">◀</button>
        <div ref="slider" class="skins-slider">
          <div
            v-for="skin in weapon.skins"
            :key="skin.uuid"
            class="skin-card"
            @click="setActiveSkin(skin)"
            :class="{ active: activeSkin.uuid === skin.uuid }"
          >
            <img :src="skin.displayIcon || '/default-skin.png'" :alt="skin.displayName" />
            <p>{{ skin.displayName }}</p>
          </div>
        </div>
        <button class="slider-arrow right" @click="scrollSlider('right')">▶</button>
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
const activeSkin = ref({})
const activeChroma = ref({})
const slider = ref(null)

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await getWeaponById(id)
    weapon.value = response
    activeSkin.value = response.skins?.[0] || {}
    activeChroma.value = activeSkin.value.chromas?.[0] || {}
  } catch (error) {
    console.error('Error fetching weapon:', error)
  }
})

function setActiveSkin(skin) {
  activeSkin.value = skin
  activeChroma.value = skin.chromas?.[0] || {}
}

function setActiveChroma(chroma) {
  activeChroma.value = chroma
}

function scrollSlider(direction) {
  const sliderEl = slider.value
  const scrollAmount = 300
  if (direction === 'left') {
    sliderEl.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  } else {
    sliderEl.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.weapon-detail-page {
  padding: 40px;
  color: white;
  min-height: 100vh;
}

/* TOP SECTION */
.top-section {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.left-panel,
.right-panel {
  width: 50%;
}

/* LEFT PANEL */
.left-panel {
  text-align: center;
}

.left-panel img {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.2);
  margin-bottom: 15px;
}

.left-panel h1 {
  font-size: 2rem;
  color: #f55353;
}

/* RIGHT PANEL */
.chromas-section {
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
}

.chromas-section h2 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #f55353;
}

.chroma-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chroma-card {
  display: flex;
  align-items: center;
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.chroma-card.active {
  border: 2px solid #f55353;
}

.chroma-card:hover {
  background-color: #333;
}

.chroma-card img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-right: 10px;
  border-radius: 4px;
}

.chroma-card p {
  color: white;
  font-size: 1rem;
}

/* SKINS SECTION */
.skins-section {
  margin-top: 30px;
}

.skins-section h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #f55353;
}

.skins-slider-container {
  position: relative;
}

.skins-slider {
  display: flex;
  overflow-x: auto;
  gap: 15px;
  padding: 10px 0;
  scrollbar-width: none;
}

.skins-slider::-webkit-scrollbar {
  display: none;
}

.skin-card {
  background-color: #2a2a2a;
  padding: 10px;
  border-radius: 10px;
  min-width: 150px;
  text-align: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.skin-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
}

.skin-card.active {
  border: 2px solid #f55353;
}

.skin-card img {
  width: 100%;
  height: 100px;
  object-fit: contain;
  margin-bottom: 5px;
}

.skin-card p {
  font-size: 0.9rem;
  color: #fff;
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #2a2a2a;
  border: none;
  color: #f55353;
  font-size: 1.8rem;
  padding: 5px 10px;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s;
}

.slider-arrow:hover {
  background-color: #444;
}

.slider-arrow.left {
  left: 0;
}

.slider-arrow.right {
  right: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .top-section {
    flex-direction: column;
  }

  .left-panel,
  .right-panel {
    width: 100%;
  }

  .chroma-list {
    flex-direction: row;
    overflow-x: auto;
  }

  .chroma-card {
    min-width: 120px;
    flex-direction: column;
    align-items: center;
  }

  .chroma-card img {
    margin: 0 0 5px 0;
  }
}
</style>
