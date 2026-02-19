<!-- pages/index.vue -->
<template>
  <div>
    <div class="container">
      <div class="info-banner">
        <p>
          Field boss spawn times are tracked and updated by the community. If
          you notice incorrect times, please use the "Report Time" feature!
        </p>
      </div>

      <div class="timer-grid">
        <div v-for="boss in bossData" :key="boss.name" class="boss-card">
          <div class="boss-header">
            <h3 class="boss-name">{{ boss.name }}</h3>
            <span class="boss-region">{{ boss.region }}</span>
          </div>

          <div class="timer-display">
            <div style="margin-bottom: 0.5rem">
              <span
                class="status-indicator"
                :class="getStatusClass(getNextSpawn(boss.schedule).minutesUntil)"
              ></span>
              {{ getStatusText(getNextSpawn(boss.schedule).minutesUntil) }}
            </div>
            <div class="time-remaining">
              {{ formatTimeRemaining(getNextSpawn(boss.schedule).minutesUntil) }}
            </div>
            <div class="next-spawn">
              {{ getNextSpawn(boss.schedule).day }} at
              {{ getNextSpawn(boss.schedule).time }}
            </div>
          </div>

          <div class="schedule-list">
            <div
              v-for="spawn in boss.schedule"
              :key="spawn.day + spawn.time"
              class="schedule-item"
            >
              <span class="schedule-day">{{ spawn.day }}</span>
              <span class="schedule-time">{{ spawn.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const bossData = ref([
  {
    name: "Blackram Supply Chain",
    region: "Cinderlands",
    schedule: [
      { day: "Monday", time: "14:00" },
      { day: "Wednesday", time: "18:00" },
      { day: "Friday", time: "20:00" },
      { day: "Sunday", time: "16:00" }
    ]
  },
  {
    name: "Hogshead Pastures",
    region: "Cinderlands",
    schedule: [
      { day: "Tuesday", time: "15:00" },
      { day: "Thursday", time: "19:00" },
      { day: "Saturday", time: "21:00" }
    ]
  },
  {
    name: "Sapphire Basin",
    region: "Moonwater Plains",
    schedule: [
      { day: "Monday", time: "17:00" },
      { day: "Wednesday", time: "20:00" },
      { day: "Friday", time: "22:00" }
    ]
  },
  {
    name: "Misty Woods",
    region: "Moonwater Plains",
    schedule: [
      { day: "Tuesday", time: "16:00" },
      { day: "Thursday", time: "18:00" },
      { day: "Saturday", time: "20:00" },
      { day: "Sunday", time: "14:00" }
    ]
  },
  {
    name: "Frostscale Basin",
    region: "Silverfrost Mountains",
    schedule: [
      { day: "Monday", time: "19:00" },
      { day: "Wednesday", time: "21:00" },
      { day: "Saturday", time: "15:00" }
    ]
  }
])

function getNextSpawn(schedule) {
  const now = new Date()
  const serverTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }))
  
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentDay = daysOfWeek[serverTime.getDay()]
  const currentTime = serverTime.getHours() * 60 + serverTime.getMinutes()
  
  let nextSpawn = null
  let minDiff = Infinity
  
  schedule.forEach(spawn => {
    const spawnDayIndex = daysOfWeek.indexOf(spawn.day)
    const currentDayIndex = daysOfWeek.indexOf(currentDay)
    const [spawnHour, spawnMinute] = spawn.time.split(':').map(Number)
    const spawnTime = spawnHour * 60 + spawnMinute
    
    let dayDiff = spawnDayIndex - currentDayIndex
    if (dayDiff < 0) dayDiff += 7
    if (dayDiff === 0 && spawnTime <= currentTime) dayDiff = 7
    
    const totalMinutesDiff = dayDiff * 24 * 60 + (spawnTime - currentTime)
    
    if (totalMinutesDiff > 0 && totalMinutesDiff < minDiff) {
      minDiff = totalMinutesDiff
      nextSpawn = { ...spawn, minutesUntil: totalMinutesDiff }
    }
  })

  // Fallback: return first schedule item with a safe minutesUntil
  return nextSpawn || { ...schedule[0], minutesUntil: 0 }
}

function formatTimeRemaining(minutes) {
  if (!minutes) return '0m'
  const days = Math.floor(minutes / (24 * 60))
  const hours = Math.floor((minutes % (24 * 60)) / 60)
  const mins = Math.floor(minutes % 60)
  
  const parts = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0) parts.push(`${hours}h`)
  if (mins > 0 || parts.length === 0) parts.push(`${mins}m`)
  
  return parts.join(' ')
}

function getStatusClass(minutes) {
  if (!minutes || minutes < 15) return 'status-spawned'
  if (minutes < 60) return 'status-upcoming'
  return 'status-active'
}

function getStatusText(minutes) {
  if (!minutes || minutes < 15) return 'SPAWNING NOW!'
  if (minutes < 60) return 'UPCOMING SOON'
  return 'Next Spawn In'
}

let updateInterval = null

onMounted(() => {
  updateInterval = setInterval(() => {
    bossData.value = [...bossData.value]
  }, 60000)
})

onUnmounted(() => {
  if (updateInterval) clearInterval(updateInterval)
})
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.info-banner {
  background: rgba(0, 212, 255, 0.1);
  border-left: 4px solid var(--accent-primary);
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  border-radius: 4px;
}

.info-banner p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.timer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.boss-card {
  background: linear-gradient(135deg, var(--secondary-bg), var(--accent-bg));
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.boss-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.boss-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-primary);
  box-shadow: 0 10px 40px rgba(0, 212, 255, 0.2);
}

.boss-card:hover::before {
  opacity: 1;
}

.boss-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.boss-name {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.boss-region {
  font-size: 0.8rem;
  color: var(--text-secondary);
  background: rgba(0, 212, 255, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  border: 1px solid rgba(0, 212, 255, 0.3);
}

.timer-display {
  background: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 6px;
  text-align: center;
  margin: 1rem 0;
  border: 1px solid rgba(0, 212, 255, 0.1);
}

.time-remaining {
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.next-spawn {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.schedule-list {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 212, 255, 0.1);
}

.schedule-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.9rem;
}

.schedule-day {
  color: var(--text-secondary);
  font-weight: 600;
}

.schedule-time {
  color: var(--accent-primary);
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
}

.status-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
  animation: pulse 2s infinite;
}

.status-active {
  background: var(--success);
  box-shadow: 0 0 10px var(--success);
}

.status-upcoming {
  background: var(--warning);
  box-shadow: 0 0 10px var(--warning);
}

.status-spawned {
  background: var(--danger);
  box-shadow: 0 0 10px var(--danger);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@media (max-width: 768px) {
  .timer-grid {
    grid-template-columns: 1fr;
  }
}
</style>