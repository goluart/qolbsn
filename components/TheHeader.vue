<!-- components/TheHeader.vue -->
 <template>
    <header class="header">
        <div class="header-content">
            <div>
                <h1>⚔️ Blade & Soul NEO</h1>
                <div class="subtitle">⏰ All times shown are EU Server Time (UTC+1)</div>
            </div>
            <nav class="nav">
                <NuxtLink to="/" class="nav-btn">Boss Timers</NuxtLink>
                <NuxtLink to="/report" class="nav-btn">Report Time</NuxtLink>
                <NuxtLink to="/calculator" class="nav-btn">Calculator</NuxtLink>
            </nav>
        </div>
    </header>
 </template>

 <style scoped>
/* scoped = only applies to this component */
</style>