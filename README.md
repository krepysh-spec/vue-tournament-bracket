# 🏆 Vue Tournament Bracket

**Vue Tournament Bracket** is a Vue 3 component for building, displaying, and saving interactive tournament brackets.

It allows you to:
✅ Select number of teams (2, 4, 8, 16, 32)  
✅ Set up series as **Best of N**  
✅ Add custom teams  
✅ Save and load the tournament state via localStorage  
✅ Automatically recalculate matches when settings change  

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