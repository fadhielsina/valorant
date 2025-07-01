<template>
  <div class="agents-page">
    <!-- <h1>Our Agents</h1> -->

    <div v-for="(group, role) in agentsByRole" :key="role" class="role-section">
      <h2 class="role-title">
         <img
            :src="group[0].role.displayIcon"
            :alt="role"
            class="role-icon"
          />
        {{ role }}
      </h2>
      <div class="agents-grid">
        <div
          v-for="agent in group"
          :key="agent.uuid"
          class="agent-card"
          @click="openModal(agent)"
          :style="getAgentCardStyle(agent)"
        >
          <img :src="agent.displayIcon" :alt="agent.displayName" />
          <div class="agent-name">{{ agent.displayName }}</div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <!-- KIRI -->
        <div class="modal-left" :style="getAgentCardStyle(selectedAgent)">
          <img :src="selectedAgent.fullPortrait" :alt="selectedAgent.displayName" />
          <h2>{{ selectedAgent.displayName }}</h2>
        </div>

        <!-- KANAN -->
        <div class="modal-right">
          <p>{{ selectedAgent.description }}</p>
          <h3>Abilities</h3>
          <div class="abilities">
            <div
              v-for="ability in selectedAgent.abilities"
              :key="ability.slot"
              class="ability"
              :class="{ active: selectedAbility?.slot === ability.slot }"
              @click="selectAbility(ability)"
            >
              <img :src="ability.displayIcon" :alt="ability.displayName" v-if="ability.displayIcon" />
              <span>{{ ability.displayName }}</span>
            </div>
          </div>

          <div v-if="selectedAbility" class="ability-description">
            <h4>{{ selectedAbility.displayName }}</h4>
            <p>{{ selectedAbility.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { fetchAgents } from '@/api/valorant'

const agents = ref([])
const showModal = ref(false)
const selectedAgent = ref(null)
const selectedAbility = ref(null)

fetchAgents().then((data) => {
  // filter agent yang playable dan punya role
  agents.value = data.filter(agent => agent.isPlayableCharacter && agent.role)
})

// Grouped by role
const agentsByRole = computed(() => {
  const grouped = {}
  for (const agent of agents.value) {
    const role = agent.role.displayName
    if (!grouped[role]) {
      grouped[role] = []
    }
    grouped[role].push(agent)
  }
  return grouped
})

function getAgentCardStyle(agent) {
  const colors = agent.backgroundGradientColors || []
  const backgroundImage = agent.background

  if (colors.length >= 2 && backgroundImage) {
    return {
      backgroundImage: `
        linear-gradient(135deg, #${colors[0]}, #${colors[1]}),
        url(${backgroundImage})
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  }

  // fallback
  return {
    backgroundColor: '#1c1c1c'
  }
}

const openModal = (agent) => {
  selectedAgent.value = agent
  showModal.value = true
}

function selectAbility(ability) {
  selectedAbility.value = ability
}

const closeModal = () => {
  showModal.value = false
  selectedAgent.value = null
}
</script>

<style scoped>
/* Role */
.role-section {
  margin-bottom: 50px;
}

.role-icon {
  width: 28px;
  height: 28px;
  vertical-align: middle;
  margin-right: 10px;
}

.role-title {
  font-size: 2rem;
  color: #ffa500;
  margin-bottom: 20px;
  text-transform: uppercase;
  text-align: center;
}

/* List Agent */
.agents-page {
  padding: 40px;
  color: white;
  min-height: 100vh;
}

.agents-page h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  color: #ff4444;
}

.agents-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.agent-card {
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  cursor: pointer;
  color: white;
  position: relative;
}

.agent-name {
  padding: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.7);
  background: rgba(0, 0, 0, 0.3);
}

.agent-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(255, 0, 0, 0.4);
}

.agent-card img {
  /* width: 100%; */
  height: 200px;
  object-fit: cover;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  display: flex;
  width: 80%;
  max-width: 1000px;
  background-color: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  color: white;
}

.modal-left {
  width: 40%;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-size: cover;
  background-position: center;
}

.modal-left img {
  max-height: 300px;
  object-fit: contain;
  margin-bottom: 20px;
}

.modal-left h2 {
  margin-top: 15px;
  font-size: 1.8rem;
  color: white;
}

.modal-right {
  width: 60%;
  padding: 20px;
  overflow-y: auto;
}

.modal-right h3 {
  margin-top: 20px;
  font-size: 1.5rem;
  color: #ff8888;
}

.abilities {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
}

.ability {
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #2c2c2c;
  padding: 10px;
  border-radius: 8px;
}

.ability:hover {
  background-color: #3a3a3a;
}

.ability.active {
  background-color: #555;
  border: 1px solid #ff4444;
}

.ability-description {
  margin-top: 20px;
  padding: 15px;
  background-color: #2a2a2a;
  border-radius: 8px;
}

.ability img {
  width: 30px;
  height: 30px;
}


</style>
