# Bracket Vue Tool

A Vue 3 component for creating and managing tournament brackets with support for both Single and Double Elimination formats.

## Installation

```bash
npm install bracket-vue-tool
```

## Usage

### Global Registration

```javascript
import { createApp } from 'vue'
import { install } from 'bracket-vue-tool'
import 'bracket-vue-tool/dist/style.css'

const app = createApp(App)
app.use({ install })
```

### Component Registration

```javascript
import { TournamentBracket } from 'bracket-vue-tool'
import 'bracket-vue-tool/dist/style.css'

export default {
  components: {
    TournamentBracket
  }
}
```

### Basic Usage

```vue
<template>
  <TournamentBracket
    :size="8"
    :is-double-elimination="true"
    :default-best-of="3"
    @update:teams="handleTeamsUpdate"
    @update:scores="handleScoresUpdate"
  />
</template>

<script setup>
const handleTeamsUpdate = (teams) => {
  console.log('Teams updated:', teams)
}

const handleScoresUpdate = (scores) => {
  console.log('Scores updated:', scores)
}
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | Number | 8 | Number of teams in the tournament (must be a power of 2) |
| isDoubleElimination | Boolean | false | Whether to use Double Elimination format |
| defaultBestOf | Number | 1 | Default number of games in a match (1, 3, 5, 7, or 9) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| update:teams | Array | Emitted when teams are updated |
| update:scores | Array | Emitted when scores are updated |

## Features

- Single and Double Elimination formats
- Customizable number of games per match
- Team selection and score management
- Responsive design
- Dark mode support
- State persistence

## License

MIT

---

## ⚙ How It Works

The `<TournamentBracket />` component accepts the following props:
- **initial-state** — the initial tournament state (array of rounds and matches)
- **available-teams** — array of available teams (`{id, name}`)
- **default-best-of** — Best of value (e.g., `3` means Best of 3)
- **@update:tournament-state** — event emitted with updated state when changes happen

---

## 💻 Example Usage

```vue
<template>
  <div class="min-h-screen bg-[#27272b] text-white">
    <div class="p-4">
      <select v-model="selectedSize">
        <option v-for="size in availableSizes" :key="size" :value="size">
          {{ size }} Teams
        </option>
      </select>

      <select v-model="defaultBestOf">
        <option v-for="value in bestOfValues" :key="value" :value="value">
          Best of {{ value }}
        </option>
      </select>

      <TournamentBracket 
        :initial-state="tournamentState"
        :available-teams="teams"
        :default-best-of="defaultBestOf"
        @update:tournament-state="updateTournamentState"
      />
    </div>
  </div>
</template>