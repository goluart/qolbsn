<template>
  <div class="app-layout">
    <Sidebar />

    <main class="page-content">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
.app-layout {
  display: flex;
}

.page-content {
  flex: 1;
}
</style>