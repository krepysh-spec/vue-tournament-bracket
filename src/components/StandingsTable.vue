<template>
  <div
    class="flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8"
  >
    <div class="text-xl font-bold text-gray-800 dark:text-white mb-4">
      Standings
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Place</th>
            <th scope="col" class="px-6 py-3">Team</th>
            <th scope="col" class="px-6 py-3">W-L-T</th>
            <th scope="col" class="px-6 py-3">Points</th>
            <th
              v-if="format === tournamentFormat.SWISS"
              scope="col"
              class="px-6 py-3"
            >
              Buchholz
            </th>
            <th scope="col" class="px-6 py-3">Pts Diff</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in standings"
            :key="p.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ p.place }}
            </th>
            <td class="px-6 py-4">
              {{ p.name }}
            </td>
            <td class="px-6 py-4">{{ p.wins }}-{{ p.losses }}-{{ p.ties }}</td>
            <td class="px-6 py-4">
              {{ p.score }}
            </td>
            <td v-if="format === tournamentFormat.SWISS" class="px-6 py-4">
              {{ p.buchholz }}
            </td>
            <td class="px-6 py-4">
              {{ p.ptsDiff }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  standings: {
    type: Array,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  tournamentFormat: {
    type: Object,
    required: true,
  },
});
</script>
