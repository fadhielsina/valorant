<template>
  <div class="container">
    <router-link to="/agents" class="section left hover-slide">
      <div class="content">
        <h2>Agents</h2>
        <img src="/assets/images/agents-home.png" alt="agents" />
      </div>
    </router-link>

    <router-link to="/weapons" class="section right hover-slide">
      <div class="content">
        <h2>Weapons</h2>
        <img src="/assets/images/Weapon banner.png" alt="weapons" />
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.section {
  flex: 1;
  position: relative;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.content h2 {
  color: white;
  font-size: 2.5rem;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
}

.content img {
  width: 90%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
}

/* Overlay dasar */
.section::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(224, 6, 6, 0.3); /* merah transparan */
  z-index: 1;
  transition: transform 0.4s ease;
}

/* Slide in effect */
.section.left::before {
  transform: translateX(-100%);
}
.section.right::before {
  transform: translateX(100%);
}

.section.left:hover::before,
.section.right:hover::before {
  transform: translateX(0);
}
</style>
