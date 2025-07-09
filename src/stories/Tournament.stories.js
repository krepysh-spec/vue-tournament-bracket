import { fn } from "storybook/test";

import Tournament from "./Tournament.vue";
import { PERMISSIONS, TOURNAMENT_FORMAT } from "../constants/tournament";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: "Tournament",
  component: Tournament,
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: { type: "select" },
      options: ["dark", "lite"],
    },
    format: {
      control: { type: "select" },
      options: [
        TOURNAMENT_FORMAT.SINGLE_ELIMINATION,
        TOURNAMENT_FORMAT.DOUBLE_ELIMINATION,
        TOURNAMENT_FORMAT.SWISS,
        TOURNAMENT_FORMAT.ROUND_ROBIN,
      ],
    },
    size: {
      control: { type: "select" },
      options: [2, 4, 8, 16, 32, 64],
    },
    defaultBestOf: {
      control: { type: "select" },
      options: [1, 3, 5, 7, 9],
    },
    permissions: {
      control: "object",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    format: TOURNAMENT_FORMAT.SINGLE_ELIMINATION,
    size: 16,
    defaultBestOf: 3,
    theme: "lite",
    permissions: {
      [PERMISSIONS.CAN_SELECT_TEAM]: true,
      [PERMISSIONS.CAN_EDIT_DATE]: true,
      [PERMISSIONS.CAN_EDIT_SCOPE]: true,
      [PERMISSIONS.CAN_EDIT_ROUND_NAME]: true,
      [PERMISSIONS.CAN_EDIT_BEST_OF]: true,
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SingleElimination = {
  args: {
    format: TOURNAMENT_FORMAT.SINGLE_ELIMINATION,
    size: 16,
    defaultBestOf: 3,
    theme: "lite",
    permissions: {
      [PERMISSIONS.CAN_SELECT_TEAM]: true,
      [PERMISSIONS.CAN_EDIT_DATE]: true,
      [PERMISSIONS.CAN_EDIT_SCOPE]: true,
      [PERMISSIONS.CAN_EDIT_ROUND_NAME]: true,
      [PERMISSIONS.CAN_EDIT_BEST_OF]: true,
    },
  },
};

export const DoubleElimination = {
  args: {
    format: TOURNAMENT_FORMAT.DOUBLE_ELIMINATION,
    size: 16,
    defaultBestOf: 3,
    theme: "lite",
    permissions: {
      [PERMISSIONS.CAN_SELECT_TEAM]: true,
      [PERMISSIONS.CAN_EDIT_DATE]: true,
      [PERMISSIONS.CAN_EDIT_SCOPE]: true,
      [PERMISSIONS.CAN_EDIT_ROUND_NAME]: true,
      [PERMISSIONS.CAN_EDIT_BEST_OF]: true,
    },
  },
};

export const Swiss = {
  args: {
    format: TOURNAMENT_FORMAT.SWISS,
    size: 16,
    defaultBestOf: 3,
    theme: "lite",
    permissions: {
      [PERMISSIONS.CAN_SELECT_TEAM]: true,
      [PERMISSIONS.CAN_EDIT_DATE]: true,
      [PERMISSIONS.CAN_EDIT_SCOPE]: true,
      [PERMISSIONS.CAN_EDIT_ROUND_NAME]: true,
      [PERMISSIONS.CAN_EDIT_BEST_OF]: true,
    },
  },
};

export const RoundRobin = {
  args: {
    format: TOURNAMENT_FORMAT.ROUND_ROBIN,
    size: 16,
    defaultBestOf: 3,
    theme: "lite",
    permissions: {
      [PERMISSIONS.CAN_SELECT_TEAM]: true,
      [PERMISSIONS.CAN_EDIT_DATE]: true,
      [PERMISSIONS.CAN_EDIT_SCOPE]: true,
      [PERMISSIONS.CAN_EDIT_ROUND_NAME]: true,
      [PERMISSIONS.CAN_EDIT_BEST_OF]: true,
    },
  },
};
