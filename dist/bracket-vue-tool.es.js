import { createElementBlock as T, openBlock as _, normalizeClass as z, createCommentVNode as W, withDirectives as J, createElementVNode as f, Fragment as D, renderList as P, toDisplayString as j, vModelSelect as Y, ref as N, computed as A, watch as I, onMounted as U, vModelText as Z, createVNode as L, createBlock as V } from "vue";
const B = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination"
}, v = "TBD", u = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, g = {
  CAN_SELECT_TEAM: "can_select_team",
  CAN_EDIT_DATE: "can_edit_date",
  CAN_EDIT_SCOPE: "can_edit_scope",
  CAN_EDIT_ROUND_NAME: "can_edit_round_name",
  CAN_EDIT_BEST_OF: "can_edit_best_of"
}, C = (o, r) => {
  const t = o.__vccOpts || o;
  for (const [e, i] of r)
    t[e] = i;
  return t;
}, $ = {
  __name: "TeamSelect",
  props: {
    team: {
      type: Object,
      required: !0
    },
    teamPosition: {
      type: String,
      required: !0
    },
    availableTeams: {
      type: Array,
      required: !0
    },
    selectedTeams: {
      type: Array,
      required: !0
    },
    canEdit: {
      type: Boolean,
      required: !0
    },
    highlightedTeam: {
      type: Number,
      default: null
    },
    permissions: {
      type: Object,
      required: !0,
      default: () => ({
        [g.CAN_SELECT_TEAM]: !0
      })
    },
    isWinner: {
      type: Boolean,
      default: !1
    },
    isLoser: {
      type: Boolean,
      default: !1
    },
    shouldHighlight: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:team", "highlight-team", "unhighlight-team"],
  setup(o, { expose: r, emit: t }) {
    r();
    const e = o, i = t, a = N(e.team.name), n = A(() => {
      var h;
      return a.value === v ? null : ((h = e.availableTeams.find((x) => x.name === a.value)) == null ? void 0 : h.logo) || null;
    });
    I(() => e.team, (h) => {
      a.value = h.name;
    }, { immediate: !0 }), U(() => {
      console.log("TeamSelect mounted:", {
        team: e.team,
        availableTeams: e.availableTeams
      });
    });
    const m = (h) => h === v ? !1 : e.selectedTeams.includes(h) && h !== e.team.name || h === e.team.name && e.team.name !== v, l = A(() => e.availableTeams ? e.availableTeams.filter((h) => h.name === v || h.name === e.team.name ? !0 : !m(h.name)) : []), E = { props: e, emit: i, selectedTeam: a, selectedTeamLogo: n, isTeamSelected: m, availableTeamsForSelection: l, highlightTeam: () => {
      e.team.name !== v && i("highlight-team", e.team.name);
    }, unhighlightTeam: () => {
      i("unhighlight-team");
    }, updateTeam: () => {
      const h = e.availableTeams.find((x) => x.name === a.value);
      console.log("Updating team:", { selectedTeam: a.value, selectedTeamData: h }), i("update:team", {
        position: e.teamPosition,
        team: {
          id: (h == null ? void 0 : h.id) || null,
          name: a.value,
          logo: (h == null ? void 0 : h.logo) || null,
          score: 0
        }
      });
    }, ref: N, computed: A, onMounted: U, watch: I, get TBD() {
      return v;
    }, get PERMISSIONS() {
      return g;
    } };
    return Object.defineProperty(E, "__isScriptSetup", { enumerable: !1, value: !0 }), E;
  }
}, ee = {
  key: 0,
  class: "flex items-center gap-2"
}, te = ["src", "alt"], ae = ["value", "disabled"], ne = {
  key: 1,
  class: "flex items-center gap-2"
}, ie = ["src", "alt"], re = { class: "text-gray-900 dark:text-white" };
function oe(o, r, t, e, i, a) {
  return _(), T(
    "div",
    {
      class: z(["flex-grow p-2.5 hover:bg-gray-200/30 dark:hover:bg-gray-950/20", {
        "hover:bg-green-500/20 dark:hover:bg-green-500/20": t.isWinner,
        "hover:bg-red-500/20 dark:hover:bg-red-500/20": t.isLoser,
        "bg-green-500/20 dark:bg-green-500/20": t.shouldHighlight && t.isWinner,
        "bg-red-500/20 dark:bg-red-500/20": t.shouldHighlight && t.isLoser
      }]),
      onMouseenter: e.highlightTeam,
      onMouseleave: e.unhighlightTeam
    },
    [
      t.canEdit && t.permissions[e.PERMISSIONS.CAN_SELECT_TEAM] ? (_(), T("div", ee, [
        e.selectedTeamLogo ? (_(), T("img", {
          key: 0,
          src: e.selectedTeamLogo,
          alt: e.selectedTeam,
          class: "w-6 h-6 rounded-full"
        }, null, 8, te)) : W("v-if", !0),
        J(f(
          "select",
          {
            "onUpdate:modelValue": r[0] || (r[0] = (n) => e.selectedTeam = n),
            class: "fi-select-input p-0 w-full border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900 hover:cursor-pointer",
            onChange: e.updateTeam
          },
          [
            r[1] || (r[1] = f(
              "option",
              { value: "TBD" },
              "TBD",
              -1
              /* CACHED */
            )),
            (_(!0), T(
              D,
              null,
              P(e.availableTeamsForSelection, (n) => (_(), T("option", {
                key: n.id,
                value: n.name,
                disabled: e.isTeamSelected(n.name)
              }, j(n.name), 9, ae))),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [Y, e.selectedTeam]
        ])
      ])) : (_(), T("div", ne, [
        t.team.logo ? (_(), T("img", {
          key: 0,
          src: t.team.logo,
          alt: t.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, ie)) : W("v-if", !0),
        f(
          "span",
          re,
          j(t.team.name),
          1
          /* TEXT */
        )
      ]))
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
const se = /* @__PURE__ */ C($, [["render", oe], ["__file", "/app/src/components/team/TeamSelect.vue"]]), le = {
  __name: "TeamScoreInput",
  props: {
    team: {
      type: Object,
      required: !0
    },
    teamPosition: {
      type: String,
      required: !0
    },
    canEditScore: {
      type: Boolean,
      required: !0
    },
    isFirstTeam: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:score"],
  setup(o, { expose: r, emit: t }) {
    r();
    const e = o, i = t, a = N(!1), n = N(e.team.score ?? 0), m = () => {
      e.canEditScore && (a.value = !0);
    }, l = () => {
      const b = parseInt(n.value) || 0;
      i("update:score", {
        position: e.teamPosition,
        score: b
      });
    };
    I(() => e.team, (b) => {
      n.value = b.score ?? 0;
    }, { deep: !0 });
    const S = { props: e, emit: i, isEditing: a, score: n, selectScore: m, updateScore: l, ref: N, watch: I };
    return Object.defineProperty(S, "__isScriptSetup", { enumerable: !1, value: !0 }), S;
  }
}, ce = {
  key: 1,
  class: "text-white"
};
function me(o, r, t, e, i, a) {
  return _(), T(
    "div",
    {
      class: z(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", { "border-b border-orange-600 dark:border-orange-700": t.isFirstTeam }]),
      onClick: e.selectScore
    },
    [
      e.isEditing ? J((_(), T(
        "input",
        {
          key: 0,
          type: "number",
          "onUpdate:modelValue": r[0] || (r[0] = (n) => e.score = n),
          class: "w-12 border-none bg-orange-500 dark:bg-orange-600 text-center text-white text-base transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900",
          min: "0",
          onChange: e.updateScore,
          onBlur: r[1] || (r[1] = (n) => e.isEditing = !1)
        },
        null,
        544
        /* NEED_HYDRATION, NEED_PATCH */
      )), [
        [Z, e.score]
      ]) : (_(), T(
        "span",
        ce,
        j(t.team.score),
        1
        /* TEXT */
      ))
    ],
    2
    /* CLASS */
  );
}
const ue = /* @__PURE__ */ C(le, [["render", me], ["__file", "/app/src/components/team/TeamScoreInput.vue"]]), de = {
  __name: "TeamRow",
  props: {
    team: {
      type: Object,
      required: !0
    },
    teamPosition: {
      type: String,
      required: !0
    },
    availableTeams: {
      type: Array,
      required: !0
    },
    selectedTeams: {
      type: Array,
      required: !0
    },
    canEdit: {
      type: Boolean,
      required: !0
    },
    canEditScore: {
      type: Boolean,
      required: !0
    },
    isWinner: {
      type: Boolean,
      default: !1
    },
    isLoser: {
      type: Boolean,
      default: !1
    },
    shouldHighlight: {
      type: Boolean,
      default: !1
    },
    isFirstTeam: {
      type: Boolean,
      default: !1
    },
    highlightedTeam: {
      type: Number,
      default: null
    },
    permissions: {
      type: Object,
      required: !0,
      default: () => ({
        [g.CAN_SELECT_TEAM]: !0,
        [g.CAN_EDIT_SCOPE]: !0
      })
    }
  },
  emits: ["update:team", "update:score", "highlight-team", "unhighlight-team"],
  setup(o, { expose: r }) {
    r();
    const e = { props: o, TeamSelect: se, TeamScoreInput: ue, get PERMISSIONS() {
      return g;
    } };
    return Object.defineProperty(e, "__isScriptSetup", { enumerable: !1, value: !0 }), e;
  }
}, he = { class: "flex" };
function ge(o, r, t, e, i, a) {
  return _(), T("div", he, [
    L(e.TeamSelect, {
      team: t.team,
      "team-position": t.teamPosition,
      "available-teams": t.availableTeams,
      "selected-teams": t.selectedTeams,
      "highlighted-team": t.highlightedTeam,
      permissions: t.permissions,
      "can-edit": t.canEdit,
      "is-winner": t.isWinner,
      "is-loser": t.isLoser,
      "should-highlight": t.shouldHighlight,
      "is-first-team": t.isFirstTeam,
      "onUpdate:team": r[0] || (r[0] = (n) => o.$emit("update:team", n)),
      onHighlightTeam: r[1] || (r[1] = (n) => o.$emit("highlight-team", n)),
      onUnhighlightTeam: r[2] || (r[2] = (n) => o.$emit("unhighlight-team"))
    }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "highlighted-team", "permissions", "can-edit", "is-winner", "is-loser", "should-highlight", "is-first-team"]),
    L(e.TeamScoreInput, {
      team: t.team,
      "team-position": t.teamPosition,
      "can-edit-score": t.canEditScore,
      "is-first-team": t.isFirstTeam,
      "onUpdate:score": r[3] || (r[3] = (n) => o.$emit("update:score", n))
    }, null, 8, ["team", "team-position", "can-edit-score", "is-first-team"])
  ]);
}
const _e = /* @__PURE__ */ C(de, [["render", ge], ["__file", "/app/src/components/team/TeamRow.vue"]]), fe = {
  __name: "BracketMatch",
  props: {
    match: {
      type: Object,
      required: !0,
      default: () => ({
        teamOne: { name: v, score: 0 },
        teamTwo: { name: v, score: 0 },
        winner: null,
        date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
        // Default to today's date
      })
    },
    index: {
      type: Number,
      required: !0
    },
    totalMatches: {
      type: Number,
      required: !0
    },
    availableTeams: {
      type: Array,
      required: !0
    },
    selectedTeams: {
      type: Array,
      required: !0
    },
    roundIndex: {
      type: Number,
      required: !0
    },
    highlightedTeam: {
      type: String,
      default: null
    },
    permissions: {
      type: Object,
      required: !0,
      default: () => ({
        [g.CAN_SELECT_TEAM]: !0,
        [g.CAN_EDIT_DATE]: !0,
        [g.CAN_EDIT_SCOPE]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team", "click-match"],
  setup(o, { expose: r, emit: t }) {
    r();
    const e = o, i = t, a = A(() => e.roundIndex === 0 && e.permissions[g.CAN_SELECT_TEAM]), n = A(() => e.match[u.ONE].name !== v && e.match[u.TWO].name !== v && e.permissions[g.CAN_EDIT_SCOPE]), d = { props: e, emit: i, canEdit: a, canEditScore: n, isWinner: (s) => e.match.winner === s, isLoser: (s) => e.match.winner && e.match.winner !== s, shouldHighlight: (s) => {
      const c = e.match[s].name;
      return e.highlightedTeam === c;
    }, highlightTeam: (s) => {
      i("highlight-team", s);
    }, unhighlightTeam: () => {
      i("unhighlight-team");
    }, updateTeam: ({ position: s, team: c }) => {
      const p = {
        ...e.match,
        [s]: c
      };
      i("update:match", p);
    }, updateScore: ({ position: s, score: c }) => {
      const p = {
        ...e.match,
        [s]: {
          ...e.match[s],
          score: c
        }
      };
      p[u.ONE].score > p[u.TWO].score ? p.winner = u.ONE : p[u.TWO].score > p[u.ONE].score ? p.winner = u.TWO : p.winner = null, i("update:match", p);
    }, formatDateTimeForInput: (s) => s ? new Date(s).toISOString().slice(0, 16) : "", updateDate: (s) => {
      const c = {
        ...e.match,
        date: s.target.value
      };
      i("update:match", c);
    }, formatDate: (s) => s ? new Date(s).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }) : "", onMatchClick: (s) => {
      const c = s.target.tagName.toLowerCase();
      c === "input" || c === "select" || c === "option" || c === "button" || s.target.closest("input,select,option,button") || !(!e.permissions[g.CAN_SELECT_TEAM] && !e.permissions[g.CAN_EDIT_DATE] && !e.permissions[g.CAN_EDIT_SCOPE]) || i("click-match", {
        match: e.match,
        roundIndex: e.roundIndex,
        matchIndex: e.index,
        id: e.match.id ?? null
      });
    }, computed: A, TeamRow: _e, get TBD() {
      return v;
    }, get TEAM_POSITION() {
      return u;
    }, get PERMISSIONS() {
      return g;
    } };
    return Object.defineProperty(d, "__isScriptSetup", { enumerable: !1, value: !0 }), d;
  }
}, Te = { class: "flex flex-col w-full" }, pe = { class: "px-3 py-1 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center" }, ve = ["value", "disabled"], be = {
  key: 0,
  class: "absolute top-1/2 left-full w-2.5 h-[calc(100%+2px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[-10px] ml-[15px] mx-2 transition-colors duration-200"
};
function Oe(o, r, t, e, i, a) {
  return _(), T(
    "div",
    {
      class: z(["relative text-[0.8em] flex items-center", { group: t.index % 2 == 0 && t.totalMatches > 1 }])
    },
    [
      f("div", Te, [
        f("div", pe, [
          f("input", {
            type: "datetime-local",
            value: e.formatDateTimeForInput(t.match.date),
            onInput: e.updateDate,
            class: "bg-transparent border-none focus:ring-0 p-0 text-xs",
            disabled: !t.permissions[e.PERMISSIONS.CAN_EDIT_DATE]
          }, null, 40, ve)
        ]),
        f("div", {
          class: "my-1.5 ml-2.5 bg-white dark:bg-gray-900 rounded overflow-hidden w-full min-w-[200px] shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10",
          onClick: e.onMatchClick
        }, [
          L(e.TeamRow, {
            team: t.match.teamOne,
            "team-position": e.TEAM_POSITION.ONE,
            "available-teams": t.availableTeams,
            "selected-teams": t.selectedTeams,
            "can-edit": e.canEdit,
            "can-edit-score": e.canEditScore,
            "is-winner": e.isWinner(e.TEAM_POSITION.ONE),
            "is-loser": e.isLoser(e.TEAM_POSITION.ONE),
            "should-highlight": e.shouldHighlight(e.TEAM_POSITION.ONE),
            "is-first-team": !0,
            "can-select-team": o.canSelectTeam,
            "highlighted-team": t.highlightedTeam,
            permissions: t.permissions,
            "onUpdate:team": e.updateTeam,
            "onUpdate:score": e.updateScore,
            onHighlightTeam: e.highlightTeam,
            onUnhighlightTeam: e.unhighlightTeam
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"]),
          L(e.TeamRow, {
            team: t.match.teamTwo,
            "team-position": e.TEAM_POSITION.TWO,
            "available-teams": t.availableTeams,
            "selected-teams": t.selectedTeams,
            "can-edit": e.canEdit,
            "can-edit-score": e.canEditScore,
            "is-winner": e.isWinner(e.TEAM_POSITION.TWO),
            "is-loser": e.isLoser(e.TEAM_POSITION.TWO),
            "should-highlight": e.shouldHighlight(e.TEAM_POSITION.TWO),
            "can-select-team": o.canSelectTeam,
            "highlighted-team": t.highlightedTeam,
            permissions: t.permissions,
            "onUpdate:team": e.updateTeam,
            "onUpdate:score": e.updateScore,
            onHighlightTeam: e.highlightTeam,
            onUnhighlightTeam: e.unhighlightTeam
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"])
        ])
      ]),
      t.index % 2 == 0 && t.totalMatches > 1 ? (_(), T("div", be, r[0] || (r[0] = [
        f(
          "span",
          { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" },
          null,
          -1
          /* CACHED */
        )
      ]))) : W("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const Ee = /* @__PURE__ */ C(fe, [["render", Oe], ["__file", "/app/src/components/bracket/BracketMatch.vue"]]), Se = {
  __name: "BracketColumn",
  props: {
    column: {
      type: Object,
      required: !0
    },
    columnIndex: {
      type: Number,
      required: !0
    },
    availableTeams: {
      type: Array,
      required: !0
    },
    selectedTeams: {
      type: Array,
      required: !0
    },
    highlightedTeam: {
      type: String,
      default: null
    },
    permissions: {
      type: Object,
      required: !0,
      default: () => ({
        [g.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team", "click-match"],
  setup(o, { expose: r, emit: t }) {
    r();
    const e = o, i = t, m = { props: e, emit: i, updateMatch: (l, S) => {
      i("update:match", e.columnIndex, l, S);
    }, onClickMatch: (l, S) => {
      i("click-match", {
        ...S,
        roundIndex: e.columnIndex,
        matchIndex: l
      });
    }, BracketMatch: Ee, get PERMISSIONS() {
      return g;
    } };
    return Object.defineProperty(m, "__isScriptSetup", { enumerable: !1, value: !0 }), m;
  }
}, ye = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, Ne = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50 mt-[23px]" };
function xe(o, r, t, e, i, a) {
  return _(), T("div", ye, [
    (_(!0), T(
      D,
      null,
      P(t.column.matches, (n, m) => (_(), T(
        D,
        {
          key: n.id
        },
        [
          f(
            "div",
            Ne,
            j(n.number),
            1
            /* TEXT */
          ),
          L(e.BracketMatch, {
            match: n,
            index: m,
            "total-matches": t.column.matches.length,
            "round-index": t.columnIndex,
            "available-teams": t.availableTeams,
            "selected-teams": t.selectedTeams,
            "highlighted-team": t.highlightedTeam,
            permissions: t.permissions,
            "onUpdate:match": (l) => e.updateMatch(m, l),
            onHighlightTeam: r[0] || (r[0] = (l) => o.$emit("highlight-team", l)),
            onUnhighlightTeam: r[1] || (r[1] = (l) => o.$emit("unhighlight-team")),
            onClickMatch: (l) => e.onClickMatch(m, l)
          }, null, 8, ["match", "index", "total-matches", "round-index", "available-teams", "selected-teams", "highlighted-team", "permissions", "onUpdate:match", "onClickMatch"])
        ],
        64
        /* STABLE_FRAGMENT */
      ))),
      128
      /* KEYED_FRAGMENT */
    ))
  ]);
}
const K = /* @__PURE__ */ C(Se, [["render", xe], ["__file", "/app/src/components/bracket/BracketColumn.vue"]]), we = {
  __name: "BracketRoundHeaders",
  props: {
    columns: {
      type: Array,
      required: !0
    },
    permissions: {
      type: Object,
      required: !0
    }
  },
  emits: ["update:columns"],
  setup(o, { expose: r, emit: t }) {
    r();
    const e = o, i = t, a = [1, 3, 5, 7, 9], n = N(e.columns.map((b) => b.name));
    I(() => e.columns, (b) => {
      n.value = b.map((w) => w.name);
    }, { deep: !0 });
    const S = { props: e, emit: i, bestOfValues: a, localColumnNames: n, updateColumnName: (b, w) => {
      n.value[b] = w;
      const E = [...e.columns];
      E[b] = {
        ...E[b],
        name: w
      }, i("update:columns", E);
    }, updateColumnBestOf: (b, w) => {
      const E = [...e.columns];
      E[b] = {
        ...E[b],
        bestOf: Number(w)
      }, i("update:columns", E);
    }, ref: N, watch: I, get PERMISSIONS() {
      return g;
    } };
    return Object.defineProperty(S, "__isScriptSetup", { enumerable: !1, value: !0 }), S;
  }
}, ke = { class: "flex justify-between px-5" }, Ie = { class: "flex flex-col items-center gap-2" }, Ae = { class: "mt-2" }, Me = { class: "flex items-center rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600" }, Ce = ["onUpdate:modelValue", "onBlur", "disabled"], Be = { class: "grid shrink-0 grid-cols-1 focus-within:relative" }, De = ["value", "onChange", "disabled"], Le = ["value"];
function Pe(o, r, t, e, i, a) {
  return _(), T("div", ke, [
    (_(!0), T(
      D,
      null,
      P(t.columns, (n, m) => (_(), T("div", {
        key: n.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
      }, [
        f("div", Ie, [
          f("div", Ae, [
            f("div", Me, [
              J(f("input", {
                type: "text",
                "onUpdate:modelValue": (l) => e.localColumnNames[m] = l,
                onBlur: (l) => e.updateColumnName(m, l.target.value),
                disabled: !t.permissions[e.PERMISSIONS.CAN_EDIT_ROUND_NAME],
                class: "block min-w-0 grow py-1.5 pr-3 text-gray-800 dark:text-white border-none pl-1 text-base text-gray-900 bg-white dark:bg-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              }, null, 40, Ce), [
                [Z, e.localColumnNames[m]]
              ]),
              f("div", Be, [
                f("select", {
                  value: n.bestOf,
                  onChange: (l) => e.updateColumnBestOf(m, l.target.value),
                  disabled: !t.permissions[e.PERMISSIONS.CAN_EDIT_BEST_OF],
                  class: "col-start-1 row-start-1 w-full text-gray-800 dark:text-white border-none appearance-none py-1.5 bg-white dark:bg-gray-900 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                }, [
                  (_(), T(
                    D,
                    null,
                    P(e.bestOfValues, (l) => f("option", {
                      key: l,
                      value: l
                    }, " Best of " + j(l), 9, Le)),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ], 40, De),
                W(` <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
          <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg> `)
              ])
            ])
          ])
        ])
      ]))),
      128
      /* KEYED_FRAGMENT */
    ))
  ]);
}
const Q = /* @__PURE__ */ C(we, [["render", Pe], ["__file", "/app/src/components/bracket/BracketRoundHeaders.vue"]]), Ue = {
  __name: "BracketLower",
  props: {
    initialState: {
      type: Array,
      required: !0
    },
    availableTeams: {
      type: Array,
      required: !0
    },
    defaultBestOf: {
      type: Number,
      default: 3,
      validator: (o) => [1, 3, 5, 7, 9].includes(o)
    },
    permissions: {
      type: Object,
      required: !0,
      default: () => ({
        [g.CAN_SELECT_TEAM]: !0,
        [g.CAN_EDIT_DATE]: !0,
        [g.CAN_EDIT_SCOPE]: !0,
        [g.CAN_EDIT_ROUND_NAME]: !0,
        [g.CAN_EDIT_BEST_OF]: !0
      })
    }
  },
  emits: ["update:state"],
  setup(o, { expose: r, emit: t }) {
    r();
    const e = t, i = o, a = N([]), n = N(null), m = A(() => {
      const O = /* @__PURE__ */ new Set();
      return a.value.forEach((M) => {
        M.matches.forEach((y) => {
          y[u.ONE].name !== v && O.add(y[u.ONE].name), y[u.TWO].name !== v && O.add(y[u.TWO].name);
        });
      }), Array.from(O);
    }), l = (O) => {
      n.value = O;
    }, S = () => {
      n.value = null;
    }, b = (O, M, y) => {
      if (console.log("Updating lower match:", { roundIndex: O, matchIndex: M, updatedMatch: y }), a.value[O] && a.value[O].matches) {
        if (a.value[O].matches[M] = y, y.winner && O < a.value.length - 1) {
          const d = O + 1, s = Math.floor(M / 2);
          if (a.value[d] && a.value[d].matches[s]) {
            const c = a.value[d].matches[s], p = M % 2 === 0 ? u.ONE : u.TWO, k = y[y.winner];
            a.value[d].matches[s] = {
              ...c,
              [p]: {
                id: k.id,
                name: k.name,
                logo: k.logo,
                score: 0
              }
            };
          }
        }
        E();
      }
    }, w = (O) => {
      console.log("Updating lower columns:", O), a.value = O, E();
    }, E = () => {
      console.log("Emitting lower tournament state:", a.value), e("update:state", a.value);
    }, h = () => {
      console.log("Initializing lower tournament with state:", i.initialState), i.initialState && i.initialState.length > 0 && (a.value = JSON.parse(JSON.stringify(i.initialState)));
    };
    I(() => i.initialState, () => {
      h();
    }, { deep: !0 }), U(() => {
      h();
    });
    const x = { emit: e, props: i, columns: a, highlightedTeam: n, selectedTeams: m, highlightTeam: l, unhighlightTeam: S, updateMatch: b, updateColumns: w, emitTournamentState: E, initializeTournament: h, ref: N, onMounted: U, watch: I, computed: A, BracketColumn: K, BracketRoundHeaders: Q, get TBD() {
      return v;
    }, get TEAM_POSITION() {
      return u;
    }, get PERMISSIONS() {
      return g;
    } };
    return Object.defineProperty(x, "__isScriptSetup", { enumerable: !1, value: !0 }), x;
  }
}, Re = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, qe = { class: "flex flex-col" }, We = { class: "overflow-x-auto" }, je = { class: "min-w-max" }, He = { class: "flex flex-1 p-5" };
function Fe(o, r, t, e, i, a) {
  return _(), T("div", Re, [
    r[0] || (r[0] = f(
      "div",
      { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" },
      "Lower Bracket",
      -1
      /* CACHED */
    )),
    f("div", qe, [
      f("div", We, [
        f("div", je, [
          L(e.BracketRoundHeaders, {
            columns: e.columns,
            "onUpdate:columns": e.updateColumns,
            permissions: t.permissions
          }, null, 8, ["columns", "permissions"]),
          f("div", He, [
            (_(!0), T(
              D,
              null,
              P(e.columns, (n, m) => (_(), V(e.BracketColumn, {
                key: n.id,
                column: n,
                "column-index": m,
                "available-teams": t.availableTeams,
                "selected-teams": e.selectedTeams,
                "highlighted-team": e.highlightedTeam,
                permissions: t.permissions,
                "onUpdate:match": e.updateMatch,
                onHighlightTeam: e.highlightTeam,
                onUnhighlightTeam: e.unhighlightTeam
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team", "permissions"]))),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ])
    ])
  ]);
}
const Ve = /* @__PURE__ */ C(Ue, [["render", Fe], ["__file", "/app/src/components/bracket/BracketLower.vue"]]), G = () => ({
  id: null,
  name: v,
  logo: null,
  score: 0
}), X = (o) => ({
  id: `match-${o}`,
  number: o,
  [u.ONE]: G(),
  [u.TWO]: G(),
  winner: null,
  date: null
}), et = (o, r = 3) => {
  const t = [], e = Math.log2(o);
  let i = 1;
  for (let a = 0; a < e; a++) {
    const n = Math.pow(2, e - a - 1), m = [];
    for (let l = 0; l < n; l++)
      m.push(X(i++));
    t.push({
      id: `upper-round-${a + 1}`,
      name: `Round ${a + 1}`,
      matches: m,
      bestOf: r
    });
  }
  return t;
}, F = (o, r) => {
  const t = [];
  let e = 1;
  const i = o - 1;
  for (let a = 0; a < i; a++) {
    const n = Math.pow(2, o - a - 2), m = [];
    for (let l = 0; l < n; l++)
      m.push(X(e++));
    t.push({
      id: `lower-round-${a + 1}`,
      name: `Lower Round ${a + 1}`,
      matches: m,
      bestOf: r
    });
  }
  return t;
}, ze = {
  __name: "TournamentBracket",
  props: {
    initialState: {
      type: Object,
      required: !0
    },
    availableTeams: {
      type: Array,
      required: !0
    },
    defaultBestOf: {
      type: Number,
      required: !0
    },
    format: {
      type: String,
      required: !0
    },
    permissions: {
      type: Object,
      required: !0,
      default: () => ({
        [g.CAN_SELECT_TEAM]: !0,
        [g.CAN_EDIT_ROUND_NAME]: !0,
        [g.CAN_EDIT_BEST_OF]: !0
      })
    }
  },
  emits: ["update:state", "click-match"],
  setup(o, { expose: r, emit: t }) {
    r();
    const e = t, i = o, a = N([]), n = N([]), m = N(null), l = A(() => {
      const d = /* @__PURE__ */ new Set();
      return a.value.forEach((s) => {
        s.matches.forEach((c) => {
          c[u.ONE].name !== v && d.add(c[u.ONE].name), c[u.TWO].name !== v && d.add(c[u.TWO].name);
        });
      }), i.format === B.DOUBLE_ELIMINATION && n.value.forEach((s) => {
        s.matches.forEach((c) => {
          c[u.ONE].name !== v && d.add(c[u.ONE].name), c[u.TWO].name !== v && d.add(c[u.TWO].name);
        });
      }), Array.from(d);
    }), S = (d) => {
      m.value = d;
    }, b = () => {
      m.value = null;
    }, w = (d, s, c) => {
      if (console.log("Updating upper match:", { roundIndex: d, matchIndex: s, updatedMatch: c }), a.value[d] && a.value[d].matches) {
        if (a.value[d].matches[s] = c, c.winner && d < a.value.length - 1) {
          const p = d + 1, k = Math.floor(s / 2);
          if (a.value[p] && a.value[p].matches[k]) {
            const R = a.value[p].matches[k], H = s % 2 === 0 ? u.ONE : u.TWO, q = c[c.winner];
            a.value[p].matches[k] = {
              ...R,
              [H]: {
                id: q.id,
                name: q.name,
                logo: q.logo,
                score: 0
              }
            };
          }
        }
        if (i.format === B.DOUBLE_ELIMINATION && c.winner) {
          const p = c[c.winner === u.ONE ? u.TWO : u.ONE];
          if (p.name !== v) {
            const k = Math.floor(d / 2), R = Math.floor(s / 2);
            if (n.value[k] && n.value[k].matches[R]) {
              const H = n.value[k].matches[R], q = s % 2 === 0 ? u.ONE : u.TWO;
              n.value[k].matches[R] = {
                ...H,
                [q]: {
                  id: p.id,
                  name: p.name,
                  logo: p.logo,
                  score: 0
                }
              };
            }
          }
        }
        x();
      }
    }, E = (d) => {
      console.log("Updating upper columns:", d), a.value = d, x();
    }, h = (d) => {
      console.log("Updating lower state:", d), n.value = d, x();
    }, x = () => {
      console.log("Emitting tournament state:", {
        upper: a.value,
        lower: i.format === B.DOUBLE_ELIMINATION ? n.value : null
      }), e("update:state", {
        upper: a.value,
        lower: i.format === B.DOUBLE_ELIMINATION ? n.value : null
      });
    }, O = () => {
      console.log("Initializing tournament with state:", i.initialState), i.initialState && (Array.isArray(i.initialState) ? (a.value = JSON.parse(JSON.stringify(i.initialState)), i.format === B.DOUBLE_ELIMINATION && (n.value = F(a.value.length, i.defaultBestOf))) : (a.value = JSON.parse(JSON.stringify(i.initialState.upper || [])), n.value = JSON.parse(JSON.stringify(i.initialState.lower || []))));
    };
    I(() => i.initialState, () => {
      O();
    }, { deep: !0 }), I(() => i.format, (d) => {
      d === B.DOUBLE_ELIMINATION && (!n.value || n.value.length === 0) && (n.value = F(a.value.length, i.defaultBestOf), x());
    });
    const M = (d) => {
      e("click-match", d);
    };
    U(() => {
      O();
    });
    const y = { emit: e, props: i, upperColumns: a, lowerColumns: n, highlightedTeam: m, selectedTeams: l, highlightTeam: S, unhighlightTeam: b, updateUpperMatch: w, updateUpperColumns: E, updateLowerState: h, emitTournamentState: x, initializeTournament: O, onMatchClick: M, ref: N, onMounted: U, watch: I, computed: A, BracketColumn: K, BracketRoundHeaders: Q, BracketLower: Ve, get createLowerBracketStructure() {
      return F;
    }, get TOURNAMENT_FORMAT() {
      return B;
    }, get TBD() {
      return v;
    }, get TEAM_POSITION() {
      return u;
    }, get PERMISSIONS() {
      return g;
    } };
    return Object.defineProperty(y, "__isScriptSetup", { enumerable: !1, value: !0 }), y;
  }
}, Je = { class: "flex flex-col" }, Ge = { class: "flex flex-col" }, Ze = { class: "overflow-x-auto" }, Ke = { class: "min-w-max" }, Qe = { class: "flex flex-1 p-5" };
function Xe(o, r, t, e, i, a) {
  return _(), T("div", Je, [
    r[0] || (r[0] = f(
      "div",
      { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" },
      "Upper Bracket",
      -1
      /* CACHED */
    )),
    f("div", Ge, [
      f("div", Ze, [
        f("div", Ke, [
          L(e.BracketRoundHeaders, {
            columns: e.upperColumns,
            "onUpdate:columns": e.updateUpperColumns,
            permissions: t.permissions
          }, null, 8, ["columns", "permissions"]),
          f("div", Qe, [
            (_(!0), T(
              D,
              null,
              P(e.upperColumns, (n, m) => (_(), V(e.BracketColumn, {
                key: n.id,
                column: n,
                "column-index": m,
                "available-teams": t.availableTeams,
                "selected-teams": e.selectedTeams,
                "highlighted-team": e.highlightedTeam,
                permissions: t.permissions,
                "onUpdate:match": e.updateUpperMatch,
                onHighlightTeam: e.highlightTeam,
                onUnhighlightTeam: e.unhighlightTeam,
                onClickMatch: e.onMatchClick
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team", "permissions"]))),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ])
    ]),
    t.format === e.TOURNAMENT_FORMAT.DOUBLE_ELIMINATION ? (_(), V(e.BracketLower, {
      key: 0,
      "initial-state": e.lowerColumns,
      "available-teams": t.availableTeams,
      "default-best-of": t.defaultBestOf,
      permissions: t.permissions,
      "onUpdate:state": e.updateLowerState
    }, null, 8, ["initial-state", "available-teams", "default-best-of", "permissions"])) : W("v-if", !0)
  ]);
}
const Ye = /* @__PURE__ */ C(ze, [["render", Xe], ["__file", "/app/src/components/TournamentBracket.vue"]]), tt = (o) => {
  o.component("TournamentBracket", Ye);
};
export {
  g as PERMISSIONS,
  Ye as TournamentBracket,
  F as createLowerBracketStructure,
  et as createTournamentState,
  tt as install
};
