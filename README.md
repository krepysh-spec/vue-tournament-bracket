# 🏆 Tournament Vue Tool

[![npm version](https://img.shields.io/npm/v/bracket-vue-tool.svg?style=flat-square)](https://www.npmjs.com/package/bracket-vue-tool)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Downloads](https://img.shields.io/npm/dt/bracket-vue-tool.svg?style=flat-square)](https://www.npmjs.com/package/bracket-vue-tool)
[![Storybook](https://img.shields.io/badge/storybook-online-ff4785?style=flat-square&logo=storybook)](https://krepysh-spec.github.io/vue-tournament-bracket/storybook)
[![Docs](https://img.shields.io/badge/docs-available-blue?logo=gitbook)](https://krepysh-spec.github.io/vue-tournament-bracket/documentation/)
[![Vue 3](https://img.shields.io/badge/vue-3.x-brightgreen.svg?logo=vue.js)](https://vuejs.org/)
[![Code Style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![CI](https://github.com/krepysh-spec/vue-tournament-bracket/actions/workflows/ci-release.yml/badge.svg)](https://github.com/krepysh-spec/vue-tournament-bracket/actions/workflows/ci-release.yml)

**Tournament Vue Tool** is a powerful and flexible Vue 3 component for building interactive tournament brackets. It supports both Single and Double Elimination formats, customizable match settings, responsive layout, dark mode, and state persistence — all with zero external dependencies.

## 🔗 Useful links

- [Life demo (Storybook)](https://krepysh-spec.github.io/vue-tournament-bracket/storybook) 
- [Read documentation](https://krepysh-spec.github.io/vue-tournament-bracket/documentation)

## ⚡ Features

- Supported Tournament Formats
- Customizable number of games per match
- Team selection and score management
- Responsive design
- Dark mode support
- State persistence
- Permissions System

## 🧩 Supported Tournament Formats
bracket-vue-tool supports multiple bracket formats out of the box:
```JS
export const TOURNAMENT_FORMAT = {
  SINGLE_ELIMINATION: 'single_elimination',
  DOUBLE_ELIMINATION: 'double_elimination',
  SWISS: 'swiss',
  ROUND_ROBIN: 'round_robin',
};
```
## 🔐 Permissions System
You can control user actions in the bracket using a flexible permission system:
```JS
export const PERMISSIONS = {
    CAN_SELECT_TEAM: 'can_select_team',
    CAN_EDIT_DATE: 'can_edit_date',
    CAN_EDIT_SCOPE: 'can_edit_scope',
    CAN_EDIT_ROUND_NAME: 'can_edit_round_name',
    CAN_EDIT_BEST_OF: 'can_edit_best_of',
};
```

## 📦 Zero Dependencies

**Tournament Vue Tool** is built with modern Vue 3 and includes:

- ❌ **No runtime dependencies**
- 🎨 **Fully styled with Tailwind CSS**
- ⚡ **Lightweight and framework-native**

## 🚀 Installation

```bash
npm install bracket-vue-tool
```

## Usage

### Global Registration

```javascript
import { createApp } from "vue";
import { install } from "bracket-vue-tool";
import "bracket-vue-tool/dist/style.css";

const app = createApp(App);
app.use({ install });
```

### Component Registration

```javascript
import { TournamentBracket } from "bracket-vue-tool";
import "bracket-vue-tool/style.css";

export default {
  components: {
    TournamentBracket,
  },
};
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
  console.log("Teams updated:", teams);
};

const handleScoresUpdate = (scores) => {
  console.log("Scores updated:", scores);
};
</script>
```

## Props

| Prop                | Type    | Default | Description                                              |
| ------------------- | ------- | ------- | -------------------------------------------------------- |
| size                | Number  | 8       | Number of teams in the tournament (must be a power of 2) |
| isDoubleElimination | Boolean | false   | Whether to use Double Elimination format                 |
| defaultBestOf       | Number  | 1       | Default number of games in a match (1, 3, 5, 7, or 9)    |

## Events

| Event         | Payload | Description                     |
| ------------- | ------- | ------------------------------- |
| update:teams  | Array   | Emitted when teams are updated  |
| update:scores | Array   | Emitted when scores are updated |


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
```
