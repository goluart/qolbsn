<template>
  <aside class="sidebar">
    <h2 class="logo">Boss Tracker</h2>

    <nav>
      <NuxtLink to="/" class="nav-item">Field Boss Timers</NuxtLink>
      <NuxtLink to="/submit" class="nav-item">Submit Timers</NuxtLink>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  height: 100vh;
  background: #0f172a;
  padding: 20px;
  border-right: 1px solid rgba(255,255,255,0.05);
}

.logo {
  font-size: 1.4rem;
  margin-bottom: 2rem;
}

.nav-item {
  display: block;
  margin-bottom: 12px;
  color: white;
  text-decoration: none;
}

.nav-item:hover {
  color: #00d4ff;
}
</style>