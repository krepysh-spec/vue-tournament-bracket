import { createElementBlock as T, openBlock as f, normalizeClass as Q, createCommentVNode as z, withDirectives as X, createElementVNode as c, Fragment as j, renderList as F, toDisplayString as I, vModelSelect as le, ref as D, computed as L, watch as R, onMounted as J, vModelText as te, createVNode as V, createBlock as K } from "vue";
const U = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination",
  SWISS: "swiss",
  ROUND_ROBIN: "round_robin"
}, x = "TBD", h = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, v = {
  CAN_SELECT_TEAM: "can_select_team",
  CAN_EDIT_DATE: "can_edit_date",
  CAN_EDIT_SCOPE: "can_edit_scope",
  CAN_EDIT_ROUND_NAME: "can_edit_round_name",
  CAN_EDIT_BEST_OF: "can_edit_best_of"
}, H = (d, n) => {
  const a = d.__vccOpts || d;
  for (const [e, s] of n)
    a[e] = s;
  return a;
}, ce = {
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
        [v.CAN_SELECT_TEAM]: !0
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
  setup(d, { expose: n, emit: a }) {
    n();
    const e = d, s = a, t = D(e.team.name), i = L(() => {
      var m;
      return t.value === x ? null : ((m = e.availableTeams.find((k) => k.name === t.value)) == null ? void 0 : m.logo) || null;
    });
    R(() => e.team, (m) => {
      t.value = m.name;
    }, { immediate: !0 }), J(() => {
      console.log("TeamSelect mounted:", {
        team: e.team,
        availableTeams: e.availableTeams
      });
    });
    const r = (m) => m === x ? !1 : e.selectedTeams.includes(m) && m !== e.team.name || m === e.team.name && e.team.name !== x, u = L(() => e.availableTeams ? e.availableTeams.filter((m) => m.name === x || m.name === e.team.name ? !0 : !r(m.name)) : []), b = { props: e, emit: s, selectedTeam: t, selectedTeamLogo: i, isTeamSelected: r, availableTeamsForSelection: u, highlightTeam: () => {
      e.team.name !== x && s("highlight-team", e.team.name);
    }, unhighlightTeam: () => {
      s("unhighlight-team");
    }, updateTeam: () => {
      const m = e.availableTeams.find((k) => k.name === t.value);
      console.log("Updating team:", { selectedTeam: t.value, selectedTeamData: m }), s("update:team", {
        position: e.teamPosition,
        team: {
          id: (m == null ? void 0 : m.id) || null,
          name: t.value,
          logo: (m == null ? void 0 : m.logo) || null,
          score: 0
        }
      });
    }, ref: D, computed: L, onMounted: J, watch: R, get TBD() {
      return x;
    }, get PERMISSIONS() {
      return v;
    } };
    return Object.defineProperty(b, "__isScriptSetup", { enumerable: !1, value: !0 }), b;
  }
}, de = {
  key: 0,
  class: "flex items-center gap-2"
}, me = ["src", "alt"], ue = ["value", "disabled"], he = {
  key: 1,
  class: "flex items-center gap-2"
}, ge = ["src", "alt"], fe = { class: "text-gray-900 dark:text-white" };
function _e(d, n, a, e, s, t) {
  return f(), T(
    "div",
    {
      class: Q(["flex-grow p-2.5 hover:bg-gray-200/30 dark:hover:bg-gray-950/20", {
        "hover:bg-green-500/20 dark:hover:bg-green-500/20": a.isWinner,
        "hover:bg-red-500/20 dark:hover:bg-red-500/20": a.isLoser,
        "bg-green-500/20 dark:bg-green-500/20": a.shouldHighlight && a.isWinner,
        "bg-red-500/20 dark:bg-red-500/20": a.shouldHighlight && a.isLoser
      }]),
      onMouseenter: e.highlightTeam,
      onMouseleave: e.unhighlightTeam
    },
    [
      a.canEdit && a.permissions[e.PERMISSIONS.CAN_SELECT_TEAM] ? (f(), T("div", de, [
        e.selectedTeamLogo ? (f(), T("img", {
          key: 0,
          src: e.selectedTeamLogo,
          alt: e.selectedTeam,
          class: "w-6 h-6 rounded-full"
        }, null, 8, me)) : z("v-if", !0),
        X(c(
          "select",
          {
            "onUpdate:modelValue": n[0] || (n[0] = (i) => e.selectedTeam = i),
            class: "fi-select-input p-0 w-full border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900 hover:cursor-pointer",
            onChange: e.updateTeam
          },
          [
            n[1] || (n[1] = c(
              "option",
              { value: "TBD" },
              "TBD",
              -1
              /* CACHED */
            )),
            (f(!0), T(
              j,
              null,
              F(e.availableTeamsForSelection, (i) => (f(), T("option", {
                key: i.id,
                value: i.name,
                disabled: e.isTeamSelected(i.name)
              }, I(i.name), 9, ue))),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [le, e.selectedTeam]
        ])
      ])) : (f(), T("div", he, [
        a.team.logo ? (f(), T("img", {
          key: 0,
          src: a.team.logo,
          alt: a.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, ge)) : z("v-if", !0),
        c(
          "span",
          fe,
          I(a.team.name),
          1
          /* TEXT */
        )
      ]))
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
const pe = /* @__PURE__ */ H(ce, [["render", _e], ["__file", "/app/src/components/team/TeamSelect.vue"]]), Te = {
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
  setup(d, { expose: n, emit: a }) {
    n();
    const e = d, s = a, t = D(!1), i = D(e.team.score ?? 0), r = () => {
      e.canEditScore && (t.value = !0);
    }, u = () => {
      const l = parseInt(i.value) || 0;
      s("update:score", {
        position: e.teamPosition,
        score: l
      });
    };
    R(() => e.team, (l) => {
      i.value = l.score ?? 0;
    }, { deep: !0 });
    const N = { props: e, emit: s, isEditing: t, score: i, selectScore: r, updateScore: u, ref: D, watch: R };
    return Object.defineProperty(N, "__isScriptSetup", { enumerable: !1, value: !0 }), N;
  }
}, be = {
  key: 1,
  class: "text-white"
};
function Oe(d, n, a, e, s, t) {
  return f(), T(
    "div",
    {
      class: Q(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", { "border-b border-orange-600 dark:border-orange-700": a.isFirstTeam }]),
      onClick: e.selectScore
    },
    [
      e.isEditing ? X((f(), T(
        "input",
        {
          key: 0,
          type: "number",
          "onUpdate:modelValue": n[0] || (n[0] = (i) => e.score = i),
          class: "w-12 border-none bg-orange-500 dark:bg-orange-600 text-center text-white text-base transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900",
          min: "0",
          onChange: e.updateScore,
          onBlur: n[1] || (n[1] = (i) => e.isEditing = !1)
        },
        null,
        544
        /* NEED_HYDRATION, NEED_PATCH */
      )), [
        [te, e.score]
      ]) : (f(), T(
        "span",
        be,
        I(a.team.score),
        1
        /* TEXT */
      ))
    ],
    2
    /* CLASS */
  );
}
const ve = /* @__PURE__ */ H(Te, [["render", Oe], ["__file", "/app/src/components/team/TeamScoreInput.vue"]]), ye = {
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
        [v.CAN_SELECT_TEAM]: !0,
        [v.CAN_EDIT_SCOPE]: !0
      })
    }
  },
  emits: ["update:team", "update:score", "highlight-team", "unhighlight-team"],
  setup(d, { expose: n }) {
    n();
    const e = { props: d, TeamSelect: pe, TeamScoreInput: ve, get PERMISSIONS() {
      return v;
    } };
    return Object.defineProperty(e, "__isScriptSetup", { enumerable: !1, value: !0 }), e;
  }
}, Se = { class: "flex" };
function Ee(d, n, a, e, s, t) {
  return f(), T("div", Se, [
    V(e.TeamSelect, {
      team: a.team,
      "team-position": a.teamPosition,
      "available-teams": a.availableTeams,
      "selected-teams": a.selectedTeams,
      "highlighted-team": a.highlightedTeam,
      permissions: a.permissions,
      "can-edit": a.canEdit,
      "is-winner": a.isWinner,
      "is-loser": a.isLoser,
      "should-highlight": a.shouldHighlight,
      "is-first-team": a.isFirstTeam,
      "onUpdate:team": n[0] || (n[0] = (i) => d.$emit("update:team", i)),
      onHighlightTeam: n[1] || (n[1] = (i) => d.$emit("highlight-team", i)),
      onUnhighlightTeam: n[2] || (n[2] = (i) => d.$emit("unhighlight-team"))
    }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "highlighted-team", "permissions", "can-edit", "is-winner", "is-loser", "should-highlight", "is-first-team"]),
    V(e.TeamScoreInput, {
      team: a.team,
      "team-position": a.teamPosition,
      "can-edit-score": a.canEditScore,
      "is-first-team": a.isFirstTeam,
      "onUpdate:score": n[3] || (n[3] = (i) => d.$emit("update:score", i))
    }, null, 8, ["team", "team-position", "can-edit-score", "is-first-team"])
  ]);
}
const we = /* @__PURE__ */ H(ye, [["render", Ee], ["__file", "/app/src/components/team/TeamRow.vue"]]), Ne = {
  __name: "BracketMatch",
  props: {
    match: {
      type: Object,
      required: !0,
      default: () => ({
        teamOne: { name: x, score: 0 },
        teamTwo: { name: x, score: 0 },
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
        [v.CAN_SELECT_TEAM]: !0,
        [v.CAN_EDIT_DATE]: !0,
        [v.CAN_EDIT_SCOPE]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team", "click-match"],
  setup(d, { expose: n, emit: a }) {
    n();
    const e = d, s = a, t = L(() => e.roundIndex === 0 && e.permissions[v.CAN_SELECT_TEAM]), i = L(() => e.match[h.ONE].name !== x && e.match[h.TWO].name !== x && e.permissions[v.CAN_EDIT_SCOPE]), q = { props: e, emit: s, canEdit: t, canEditScore: i, isWinner: (_) => e.match.winner === _, isLoser: (_) => e.match.winner && e.match.winner !== _, shouldHighlight: (_) => {
      const o = e.match[_].name;
      return e.highlightedTeam === o;
    }, highlightTeam: (_) => {
      s("highlight-team", _);
    }, unhighlightTeam: () => {
      s("unhighlight-team");
    }, updateTeam: ({ position: _, team: o }) => {
      const O = {
        ...e.match,
        [_]: o
      };
      s("update:match", O);
    }, updateScore: ({ position: _, score: o }) => {
      const O = {
        ...e.match,
        [_]: {
          ...e.match[_],
          score: o
        }
      };
      O[h.ONE].score > O[h.TWO].score ? O.winner = h.ONE : O[h.TWO].score > O[h.ONE].score ? O.winner = h.TWO : O.winner = null, s("update:match", O);
    }, formatDateTimeForInput: (_) => _ ? new Date(_).toISOString().slice(0, 16) : "", updateDate: (_) => {
      const o = {
        ...e.match,
        date: _.target.value
      };
      s("update:match", o);
    }, formatDate: (_) => _ ? new Date(_).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }) : "", onMatchClick: (_) => {
      const o = _.target.tagName.toLowerCase();
      o === "input" || o === "select" || o === "option" || o === "button" || _.target.closest("input,select,option,button") || !(!e.permissions[v.CAN_SELECT_TEAM] && !e.permissions[v.CAN_EDIT_DATE] && !e.permissions[v.CAN_EDIT_SCOPE]) || s("click-match", {
        match: e.match,
        roundIndex: e.roundIndex,
        matchIndex: e.index,
        id: e.match.id ?? null
      });
    }, computed: L, TeamRow: we, get TBD() {
      return x;
    }, get TEAM_POSITION() {
      return h;
    }, get PERMISSIONS() {
      return v;
    } };
    return Object.defineProperty(q, "__isScriptSetup", { enumerable: !1, value: !0 }), q;
  }
}, xe = { class: "flex flex-col w-full" }, ke = { class: "px-3 py-1 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center" }, Ie = ["value", "disabled"], Ae = {
  key: 0,
  class: "absolute top-1/2 left-full w-2.5 h-[calc(100%+2px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[-10px] ml-[15px] mx-2 transition-colors duration-200"
};
function Me(d, n, a, e, s, t) {
  return f(), T(
    "div",
    {
      class: Q(["relative text-[0.8em] flex items-center", { group: a.index % 2 == 0 && a.totalMatches > 1 }])
    },
    [
      c("div", xe, [
        c("div", ke, [
          c("input", {
            type: "datetime-local",
            value: e.formatDateTimeForInput(a.match.date),
            onInput: e.updateDate,
            class: "bg-transparent border-none focus:ring-0 p-0 text-xs",
            disabled: !a.permissions[e.PERMISSIONS.CAN_EDIT_DATE]
          }, null, 40, Ie)
        ]),
        c("div", {
          class: "my-1.5 ml-2.5 bg-white dark:bg-gray-900 rounded overflow-hidden w-full min-w-[200px] shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10",
          onClick: e.onMatchClick
        }, [
          V(e.TeamRow, {
            team: a.match.teamOne,
            "team-position": e.TEAM_POSITION.ONE,
            "available-teams": a.availableTeams,
            "selected-teams": a.selectedTeams,
            "can-edit": e.canEdit,
            "can-edit-score": e.canEditScore,
            "is-winner": e.isWinner(e.TEAM_POSITION.ONE),
            "is-loser": e.isLoser(e.TEAM_POSITION.ONE),
            "should-highlight": e.shouldHighlight(e.TEAM_POSITION.ONE),
            "is-first-team": !0,
            "can-select-team": d.canSelectTeam,
            "highlighted-team": a.highlightedTeam,
            permissions: a.permissions,
            "onUpdate:team": e.updateTeam,
            "onUpdate:score": e.updateScore,
            onHighlightTeam: e.highlightTeam,
            onUnhighlightTeam: e.unhighlightTeam
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"]),
          V(e.TeamRow, {
            team: a.match.teamTwo,
            "team-position": e.TEAM_POSITION.TWO,
            "available-teams": a.availableTeams,
            "selected-teams": a.selectedTeams,
            "can-edit": e.canEdit,
            "can-edit-score": e.canEditScore,
            "is-winner": e.isWinner(e.TEAM_POSITION.TWO),
            "is-loser": e.isLoser(e.TEAM_POSITION.TWO),
            "should-highlight": e.shouldHighlight(e.TEAM_POSITION.TWO),
            "can-select-team": d.canSelectTeam,
            "highlighted-team": a.highlightedTeam,
            permissions: a.permissions,
            "onUpdate:team": e.updateTeam,
            "onUpdate:score": e.updateScore,
            onHighlightTeam: e.highlightTeam,
            onUnhighlightTeam: e.unhighlightTeam
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"])
        ])
      ]),
      a.index % 2 == 0 && a.totalMatches > 1 ? (f(), T("div", Ae, n[0] || (n[0] = [
        c(
          "span",
          { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" },
          null,
          -1
          /* CACHED */
        )
      ]))) : z("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const Ce = /* @__PURE__ */ H(Ne, [["render", Me], ["__file", "/app/src/components/bracket/BracketMatch.vue"]]), Be = {
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
        [v.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team", "click-match"],
  setup(d, { expose: n, emit: a }) {
    n();
    const e = d, s = a, r = { props: e, emit: s, updateMatch: (u, N) => {
      s("update:match", e.columnIndex, u, N);
    }, onClickMatch: (u, N) => {
      s("click-match", {
        ...N,
        roundIndex: e.columnIndex,
        matchIndex: u
      });
    }, BracketMatch: Ce, get PERMISSIONS() {
      return v;
    } };
    return Object.defineProperty(r, "__isScriptSetup", { enumerable: !1, value: !0 }), r;
  }
}, De = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, Pe = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50 mt-[23px]" };
function Le(d, n, a, e, s, t) {
  return f(), T("div", De, [
    (f(!0), T(
      j,
      null,
      F(a.column.matches, (i, r) => (f(), T(
        j,
        {
          key: i.id
        },
        [
          c(
            "div",
            Pe,
            I(i.number),
            1
            /* TEXT */
          ),
          V(e.BracketMatch, {
            match: i,
            index: r,
            "total-matches": a.column.matches.length,
            "round-index": a.columnIndex,
            "available-teams": a.availableTeams,
            "selected-teams": a.selectedTeams,
            "highlighted-team": a.highlightedTeam,
            permissions: a.permissions,
            "onUpdate:match": (u) => e.updateMatch(r, u),
            onHighlightTeam: n[0] || (n[0] = (u) => d.$emit("highlight-team", u)),
            onUnhighlightTeam: n[1] || (n[1] = (u) => d.$emit("unhighlight-team")),
            onClickMatch: (u) => e.onClickMatch(r, u)
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
const ae = /* @__PURE__ */ H(Be, [["render", Le], ["__file", "/app/src/components/bracket/BracketColumn.vue"]]), Ue = {
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
  setup(d, { expose: n, emit: a }) {
    n();
    const e = d, s = a, t = [1, 3, 5, 7, 9], i = D(e.columns.map((l) => l.name));
    R(() => e.columns, (l) => {
      i.value = l.map((y) => y.name);
    }, { deep: !0 });
    const N = { props: e, emit: s, bestOfValues: t, localColumnNames: i, updateColumnName: (l, y) => {
      i.value[l] = y;
      const b = [...e.columns];
      b[l] = {
        ...b[l],
        name: y
      }, s("update:columns", b);
    }, updateColumnBestOf: (l, y) => {
      const b = [...e.columns];
      b[l] = {
        ...b[l],
        bestOf: Number(y)
      }, s("update:columns", b);
    }, ref: D, watch: R, get PERMISSIONS() {
      return v;
    } };
    return Object.defineProperty(N, "__isScriptSetup", { enumerable: !1, value: !0 }), N;
  }
}, Re = { class: "flex justify-between px-5" }, We = { class: "flex flex-col items-center gap-2" }, qe = { class: "mt-2" }, je = { class: "flex items-center rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600" }, Fe = ["onUpdate:modelValue", "onBlur", "disabled"], He = { class: "grid shrink-0 grid-cols-1 focus-within:relative" }, ze = ["value", "onChange", "disabled"], Ve = ["value"];
function Je(d, n, a, e, s, t) {
  return f(), T("div", Re, [
    (f(!0), T(
      j,
      null,
      F(a.columns, (i, r) => (f(), T("div", {
        key: i.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
      }, [
        c("div", We, [
          c("div", qe, [
            c("div", je, [
              X(c("input", {
                type: "text",
                "onUpdate:modelValue": (u) => e.localColumnNames[r] = u,
                onBlur: (u) => e.updateColumnName(r, u.target.value),
                disabled: !a.permissions[e.PERMISSIONS.CAN_EDIT_ROUND_NAME],
                class: "block min-w-0 grow py-1.5 pr-3 text-gray-800 dark:text-white border-none pl-1 text-base text-gray-900 bg-white dark:bg-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              }, null, 40, Fe), [
                [te, e.localColumnNames[r]]
              ]),
              c("div", He, [
                c("select", {
                  value: i.bestOf,
                  onChange: (u) => e.updateColumnBestOf(r, u.target.value),
                  disabled: !a.permissions[e.PERMISSIONS.CAN_EDIT_BEST_OF],
                  class: "col-start-1 row-start-1 w-full text-gray-800 dark:text-white border-none appearance-none py-1.5 bg-white dark:bg-gray-900 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                }, [
                  (f(), T(
                    j,
                    null,
                    F(e.bestOfValues, (u) => c("option", {
                      key: u,
                      value: u
                    }, " Best of " + I(u), 9, Ve)),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ], 40, ze),
                z(` <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
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
const ie = /* @__PURE__ */ H(Ue, [["render", Je], ["__file", "/app/src/components/bracket/BracketRoundHeaders.vue"]]), Ge = {
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
      validator: (d) => [1, 3, 5, 7, 9].includes(d)
    },
    permissions: {
      type: Object,
      required: !0,
      default: () => ({
        [v.CAN_SELECT_TEAM]: !0,
        [v.CAN_EDIT_DATE]: !0,
        [v.CAN_EDIT_SCOPE]: !0,
        [v.CAN_EDIT_ROUND_NAME]: !0,
        [v.CAN_EDIT_BEST_OF]: !0
      })
    }
  },
  emits: ["update:state"],
  setup(d, { expose: n, emit: a }) {
    n();
    const e = a, s = d, t = D([]), i = D(null), r = L(() => {
      const g = /* @__PURE__ */ new Set();
      return t.value.forEach((S) => {
        S.matches.forEach((B) => {
          B[h.ONE].name !== x && g.add(B[h.ONE].name), B[h.TWO].name !== x && g.add(B[h.TWO].name);
        });
      }), Array.from(g);
    }), u = (g) => {
      i.value = g;
    }, N = () => {
      i.value = null;
    }, l = (g, S, B) => {
      if (console.log("Updating lower match:", { roundIndex: g, matchIndex: S, updatedMatch: B }), t.value[g] && t.value[g].matches) {
        if (t.value[g].matches[S] = B, B.winner && g < t.value.length - 1) {
          const q = g + 1, _ = Math.floor(S / 2);
          if (t.value[q] && t.value[q].matches[_]) {
            const o = t.value[q].matches[_], O = S % 2 === 0 ? h.ONE : h.TWO, p = B[B.winner];
            t.value[q].matches[_] = {
              ...o,
              [O]: {
                id: p.id,
                name: p.name,
                logo: p.logo,
                score: 0
              }
            };
          }
        }
        b();
      }
    }, y = (g) => {
      console.log("Updating lower columns:", g), t.value = g, b();
    }, b = () => {
      console.log("Emitting lower tournament state:", t.value), e("update:state", t.value);
    }, m = () => {
      console.log("Initializing lower tournament with state:", s.initialState), s.initialState && s.initialState.length > 0 && (t.value = JSON.parse(JSON.stringify(s.initialState)));
    };
    R(() => s.initialState, () => {
      m();
    }, { deep: !0 }), J(() => {
      m();
    });
    const k = { emit: e, props: s, columns: t, highlightedTeam: i, selectedTeams: r, highlightTeam: u, unhighlightTeam: N, updateMatch: l, updateColumns: y, emitTournamentState: b, initializeTournament: m, ref: D, onMounted: J, watch: R, computed: L, BracketColumn: ae, BracketRoundHeaders: ie, get TBD() {
      return x;
    }, get TEAM_POSITION() {
      return h;
    }, get PERMISSIONS() {
      return v;
    } };
    return Object.defineProperty(k, "__isScriptSetup", { enumerable: !1, value: !0 }), k;
  }
}, Ze = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, Ke = { class: "flex flex-col" }, Qe = { class: "overflow-x-auto" }, Xe = { class: "min-w-max" }, Ye = { class: "flex flex-1 p-5" };
function $e(d, n, a, e, s, t) {
  return f(), T("div", Ze, [
    n[0] || (n[0] = c(
      "div",
      { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" },
      "Lower Bracket",
      -1
      /* CACHED */
    )),
    c("div", Ke, [
      c("div", Qe, [
        c("div", Xe, [
          V(e.BracketRoundHeaders, {
            columns: e.columns,
            "onUpdate:columns": e.updateColumns,
            permissions: a.permissions
          }, null, 8, ["columns", "permissions"]),
          c("div", Ye, [
            (f(!0), T(
              j,
              null,
              F(e.columns, (i, r) => (f(), K(e.BracketColumn, {
                key: i.id,
                column: i,
                "column-index": r,
                "available-teams": a.availableTeams,
                "selected-teams": e.selectedTeams,
                "highlighted-team": e.highlightedTeam,
                permissions: a.permissions,
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
const et = /* @__PURE__ */ H(Ge, [["render", $e], ["__file", "/app/src/components/bracket/BracketLower.vue"]]), Y = () => ({
  id: null,
  name: x,
  logo: null,
  score: 0
}), ne = (d) => ({
  id: `match-${d}`,
  number: d,
  [h.ONE]: Y(),
  [h.TWO]: Y(),
  winner: null,
  date: null
}), wt = (d, n = 3) => {
  const a = [], e = Math.log2(d);
  let s = 1;
  for (let t = 0; t < e; t++) {
    const i = Math.pow(2, e - t - 1), r = [];
    for (let u = 0; u < i; u++)
      r.push(ne(s++));
    a.push({
      id: `upper-round-${t + 1}`,
      name: `Round ${t + 1}`,
      matches: r,
      bestOf: n
    });
  }
  return a;
}, Z = (d, n) => {
  const a = [];
  let e = 1;
  const s = d - 1;
  for (let t = 0; t < s; t++) {
    const i = Math.pow(2, d - t - 2), r = [];
    for (let u = 0; u < i; u++)
      r.push(ne(e++));
    a.push({
      id: `lower-round-${t + 1}`,
      name: `Lower Round ${t + 1}`,
      matches: r,
      bestOf: n
    });
  }
  return a;
};
function $(d, n = []) {
  const a = {};
  d.forEach((l) => {
    a[l.score] || (a[l.score] = []), a[l.score].push(l);
  });
  const e = Object.keys(a).map(Number).sort((l, y) => y - l), s = [], t = /* @__PURE__ */ new Set(), i = d.map((l) => l.id), r = new Set(n.map(([l, y]) => `${l}-${y}`));
  function u(l) {
    const y = [], b = /* @__PURE__ */ new Set();
    for (let m = 0; m < l.length; m++) {
      if (b.has(l[m].id)) continue;
      let k = !1;
      for (let g = m + 1; g < l.length; g++)
        if (!b.has(l[g].id) && !r.has(`${l[m].id}-${l[g].id}`) && !r.has(`${l[g].id}-${l[m].id}`)) {
          y.push([l[m], l[g]]), b.add(l[m].id), b.add(l[g].id), t.add(l[m].id), t.add(l[g].id), k = !0;
          break;
        }
      if (!k) {
        for (let g of e)
          if (g !== l[m].score) {
            for (let S of a[g] || [])
              if (!t.has(S.id) && !r.has(`${l[m].id}-${S.id}`) && !r.has(`${S.id}-${l[m].id}`))
                return y.push([l[m], S]), b.add(l[m].id), b.add(S.id), t.add(l[m].id), t.add(S.id), y;
          }
      }
    }
    return y;
  }
  for (let l of e) {
    const y = a[l].filter((k) => !t.has(k.id)), b = u(y);
    s.push(...b);
    const m = y.filter((k) => !t.has(k.id));
    if (m.length === 1) {
      let k = !1;
      for (let g of e)
        if (g !== l) {
          for (let S of a[g] || [])
            if (!t.has(S.id) && !r.has(`${m[0].id}-${S.id}`) && !r.has(`${S.id}-${m[0].id}`)) {
              s.push([m[0], S]), t.add(m[0].id), t.add(S.id), k = !0;
              break;
            }
          if (k) break;
        }
      k || (s.push([m[0], null]), t.add(m[0].id));
    }
  }
  const N = i.filter((l) => !t.has(l));
  for (let l of N) {
    const y = d.find((b) => b.id === l);
    s.push([y, null]);
  }
  return s;
}
function ee(d) {
  const n = {}, a = {};
  d.forEach((s) => {
    s.matches.forEach((t) => {
      if (["teamOne", "teamTwo"].forEach((i) => {
        const r = t[i];
        r && (n[r.id] || (n[r.id] = { ...r, wins: 0, losses: 0, ties: 0, score: 0, ptsDiff: 0, buchholz: 0 }), a[r.id] || (a[r.id] = []));
      }), t.teamOne && t.teamTwo) {
        const i = t.teamOne, r = t.teamTwo, u = i.score || 0, N = r.score || 0;
        t.winner === "teamOne" ? (n[i.id].wins++, n[i.id].score += 1, n[r.id].losses++) : t.winner === "teamTwo" ? (n[r.id].wins++, n[r.id].score += 1, n[i.id].losses++) : t.winner === null && (u > 0 || N > 0) && (n[i.id].ties++, n[r.id].ties++, n[i.id].score += 0.5, n[r.id].score += 0.5), n[i.id].ptsDiff += u - N, n[r.id].ptsDiff += N - u, a[i.id].push(r.id), a[r.id].push(i.id);
      } else t.teamOne && !t.teamTwo ? (n[t.teamOne.id].wins++, n[t.teamOne.id].score += 1) : !t.teamOne && t.teamTwo && (n[t.teamTwo.id].wins++, n[t.teamTwo.id].score += 1);
    });
  }), Object.values(n).forEach((s) => {
    s.buchholz = (a[s.id] || []).reduce((t, i) => {
      var r;
      return t + (((r = n[i]) == null ? void 0 : r.score) || 0);
    }, 0);
  });
  const e = Object.values(n).sort(
    (s, t) => t.score - s.score || t.wins - s.wins || t.buchholz - s.buchholz || t.ptsDiff - s.ptsDiff
  );
  return e.forEach((s, t) => {
    s.place = t + 1;
  }), e;
}
const tt = {
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
        [v.CAN_SELECT_TEAM]: !0,
        [v.CAN_EDIT_ROUND_NAME]: !0,
        [v.CAN_EDIT_BEST_OF]: !0
      })
    }
  },
  emits: ["update:state", "click-match"],
  setup(d, { expose: n, emit: a }) {
    n();
    const e = a, s = d, t = D([]), i = D([]), r = D(null), u = L(() => {
      const o = /* @__PURE__ */ new Set();
      return t.value.forEach((O) => {
        O.matches.forEach((p) => {
          p[h.ONE].name !== x && o.add(p[h.ONE].name), p[h.TWO].name !== x && o.add(p[h.TWO].name);
        });
      }), s.format === U.DOUBLE_ELIMINATION && i.value.forEach((O) => {
        O.matches.forEach((p) => {
          p[h.ONE].name !== x && o.add(p[h.ONE].name), p[h.TWO].name !== x && o.add(p[h.TWO].name);
        });
      }), Array.from(o);
    }), N = L(() => s.format !== U.SWISS ? [] : ee(t.value)), l = L(() => {
      if (s.format !== U.ROUND_ROBIN) return [];
      const o = {};
      t.value.forEach((p) => {
        p.matches.forEach((E) => {
          [h.ONE, h.TWO].forEach((P) => {
            const M = E[P];
            !M || !M.id || o[M.id] || (o[M.id] = { ...M, wins: 0, losses: 0, ties: 0, score: 0, ptsDiff: 0 });
          });
          const A = E[h.ONE], w = E[h.TWO];
          if (A && w && A.id && w.id) {
            const P = A.score || 0, M = w.score || 0;
            E.winner === h.ONE ? (o[A.id].wins++, o[A.id].score += 1, o[w.id].losses++) : E.winner === h.TWO ? (o[w.id].wins++, o[w.id].score += 1, o[A.id].losses++) : E.winner === null && (P > 0 || M > 0) && (o[A.id].ties++, o[w.id].ties++, o[A.id].score += 0.5, o[w.id].score += 0.5), o[A.id].ptsDiff += P - M, o[w.id].ptsDiff += M - P;
          }
        });
      });
      const O = Object.values(o).sort(
        (p, E) => E.score - p.score || E.wins - p.wins || E.ptsDiff - p.ptsDiff
      );
      return O.forEach((p, E) => {
        p.place = E + 1;
      }), O;
    }), y = (o) => {
      r.value = o;
    }, b = () => {
      r.value = null;
    }, m = (o, O, p) => {
      if (console.log("Updating upper match:", { roundIndex: o, matchIndex: O, updatedMatch: p }), t.value[o] && t.value[o].matches) {
        if (t.value[o].matches[O] = p, p.winner && o < t.value.length - 1) {
          const E = o + 1, A = Math.floor(O / 2);
          if (t.value[E] && t.value[E].matches[A]) {
            const w = t.value[E].matches[A], P = O % 2 === 0 ? h.ONE : h.TWO, M = p[p.winner];
            t.value[E].matches[A] = {
              ...w,
              [P]: {
                id: M.id,
                name: M.name,
                logo: M.logo,
                score: 0
              }
            };
          }
        }
        if (s.format === U.DOUBLE_ELIMINATION && p.winner) {
          const E = p[p.winner === h.ONE ? h.TWO : h.ONE];
          if (E.name !== x) {
            const A = Math.floor(o / 2), w = Math.floor(O / 2);
            if (i.value[A] && i.value[A].matches[w]) {
              const P = i.value[A].matches[w], M = O % 2 === 0 ? h.ONE : h.TWO;
              i.value[A].matches[w] = {
                ...P,
                [M]: {
                  id: E.id,
                  name: E.name,
                  logo: E.logo,
                  score: 0
                }
              };
            }
          }
        }
        S();
      }
      if (s.format === U.SWISS && t.value[o].matches.every((w) => w.winner) && o < t.value.length - 1) {
        const w = {};
        for (let W = 0; W <= o; W++)
          t.value[W].matches.forEach((C) => {
            ["teamOne", "teamTwo"].forEach((re) => {
              const G = C[re];
              G && (w[G.id] || (w[G.id] = { ...G, score: 0 }));
            }), C.winner && C.teamOne && C.teamTwo && (C.winner === "teamOne" && (w[C.teamOne.id].score += 1), C.winner === "teamTwo" && (w[C.teamTwo.id].score += 1));
          });
        const P = [];
        for (let W = 0; W <= o; W++)
          t.value[W].matches.forEach((C) => {
            C.teamOne && C.teamTwo && P.push([C.teamOne.id, C.teamTwo.id]);
          });
        const M = Object.values(w), se = $(M, P), oe = t.value[o + 1];
        oe.matches = se.map((W, C) => ({
          id: `swiss-match-${o + 2}-${C + 1}`,
          number: C + 1,
          teamOne: W[0],
          teamTwo: W[1],
          winner: null,
          date: null
        }));
      }
    }, k = (o) => {
      console.log("Updating upper columns:", o), t.value = o, S();
    }, g = (o) => {
      console.log("Updating lower state:", o), i.value = o, S();
    }, S = () => {
      console.log("Emitting tournament state:", {
        upper: t.value,
        lower: s.format === U.DOUBLE_ELIMINATION ? i.value : null
      }), e("update:state", {
        upper: t.value,
        lower: s.format === U.DOUBLE_ELIMINATION ? i.value : null
      });
    }, B = () => {
      console.log("Initializing tournament with state:", s.initialState), s.initialState && (Array.isArray(s.initialState) ? (t.value = JSON.parse(JSON.stringify(s.initialState)), s.format === U.DOUBLE_ELIMINATION ? i.value = Z(t.value.length, s.defaultBestOf) : s.format === U.SWISS && (i.value = [])) : (t.value = JSON.parse(JSON.stringify(s.initialState.upper || [])), i.value = JSON.parse(JSON.stringify(s.initialState.lower || []))));
    };
    R(() => s.initialState, () => {
      B();
    }, { deep: !0 }), R(() => s.format, (o) => {
      o === U.DOUBLE_ELIMINATION && (!i.value || i.value.length === 0) && (i.value = Z(t.value.length, s.defaultBestOf), S());
    });
    const q = (o) => {
      e("click-match", o);
    };
    J(() => {
      B();
    });
    const _ = { emit: e, props: s, upperColumns: t, lowerColumns: i, highlightedTeam: r, selectedTeams: u, swissStandings: N, roundRobinStandings: l, highlightTeam: y, unhighlightTeam: b, updateUpperMatch: m, updateUpperColumns: k, updateLowerState: g, emitTournamentState: S, initializeTournament: B, onMatchClick: q, ref: D, onMounted: J, watch: R, computed: L, BracketColumn: ae, BracketRoundHeaders: ie, BracketLower: et, get createLowerBracketStructure() {
      return Z;
    }, get shuffleSwissPairs() {
      return $;
    }, get getSwissStandings() {
      return ee;
    }, get TOURNAMENT_FORMAT() {
      return U;
    }, get TBD() {
      return x;
    }, get TEAM_POSITION() {
      return h;
    }, get PERMISSIONS() {
      return v;
    } };
    return Object.defineProperty(_, "__isScriptSetup", { enumerable: !1, value: !0 }), _;
  }
}, at = { class: "flex flex-col" }, it = { class: "flex flex-col" }, nt = { class: "overflow-x-auto" }, st = { class: "min-w-max" }, ot = { class: "flex flex-1 p-5" }, rt = {
  key: 1,
  class: "mt-8"
}, lt = { class: "min-w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs" }, ct = { class: "border px-2 py-1" }, dt = { class: "border px-2 py-1" }, mt = { class: "border px-2 py-1" }, ut = { class: "border px-2 py-1" }, ht = { class: "border px-2 py-1" }, gt = { class: "border px-2 py-1" }, ft = {
  key: 2,
  class: "mt-8"
}, _t = { class: "min-w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs" }, pt = { class: "border px-2 py-1" }, Tt = { class: "border px-2 py-1" }, bt = { class: "border px-2 py-1" }, Ot = { class: "border px-2 py-1" }, vt = { class: "border px-2 py-1" };
function yt(d, n, a, e, s, t) {
  return f(), T("div", at, [
    n[4] || (n[4] = c(
      "div",
      { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" },
      "Upper Bracket",
      -1
      /* CACHED */
    )),
    c("div", it, [
      c("div", nt, [
        c("div", st, [
          V(e.BracketRoundHeaders, {
            columns: e.upperColumns,
            "onUpdate:columns": e.updateUpperColumns,
            permissions: a.permissions
          }, null, 8, ["columns", "permissions"]),
          c("div", ot, [
            (f(!0), T(
              j,
              null,
              F(e.upperColumns, (i, r) => (f(), K(e.BracketColumn, {
                key: i.id,
                column: i,
                "column-index": r,
                "available-teams": a.availableTeams,
                "selected-teams": e.selectedTeams,
                "highlighted-team": e.highlightedTeam,
                permissions: a.permissions,
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
    a.format === e.TOURNAMENT_FORMAT.DOUBLE_ELIMINATION ? (f(), K(e.BracketLower, {
      key: 0,
      "initial-state": e.lowerColumns,
      "available-teams": a.availableTeams,
      "default-best-of": a.defaultBestOf,
      permissions: a.permissions,
      "onUpdate:state": e.updateLowerState
    }, null, 8, ["initial-state", "available-teams", "default-best-of", "permissions"])) : z("v-if", !0),
    a.format === e.TOURNAMENT_FORMAT.SWISS ? (f(), T("div", rt, [
      n[1] || (n[1] = c(
        "h2",
        { class: "text-lg font-bold mb-2" },
        "Standings",
        -1
        /* CACHED */
      )),
      c("table", lt, [
        n[0] || (n[0] = c(
          "thead",
          null,
          [
            c("tr", null, [
              c("th", { class: "border px-2 py-1" }, "Place"),
              c("th", { class: "border px-2 py-1" }, "Player"),
              c("th", { class: "border px-2 py-1" }, "W-L-T"),
              c("th", { class: "border px-2 py-1" }, "Points"),
              c("th", { class: "border px-2 py-1" }, "Buchholz"),
              c("th", { class: "border px-2 py-1" }, "Pts Diff")
            ])
          ],
          -1
          /* CACHED */
        )),
        c("tbody", null, [
          (f(!0), T(
            j,
            null,
            F(e.swissStandings, (i) => (f(), T("tr", {
              key: i.id
            }, [
              c(
                "td",
                ct,
                I(i.place),
                1
                /* TEXT */
              ),
              c(
                "td",
                dt,
                I(i.name),
                1
                /* TEXT */
              ),
              c(
                "td",
                mt,
                I(i.wins) + "-" + I(i.losses) + "-" + I(i.ties),
                1
                /* TEXT */
              ),
              c(
                "td",
                ut,
                I(i.score),
                1
                /* TEXT */
              ),
              c(
                "td",
                ht,
                I(i.buchholz),
                1
                /* TEXT */
              ),
              c(
                "td",
                gt,
                I(i.ptsDiff),
                1
                /* TEXT */
              )
            ]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ])) : z("v-if", !0),
    a.format === e.TOURNAMENT_FORMAT.ROUND_ROBIN ? (f(), T("div", ft, [
      n[3] || (n[3] = c(
        "h2",
        { class: "text-lg font-bold mb-2" },
        "Standings",
        -1
        /* CACHED */
      )),
      c("table", _t, [
        n[2] || (n[2] = c(
          "thead",
          null,
          [
            c("tr", null, [
              c("th", { class: "border px-2 py-1" }, "Place"),
              c("th", { class: "border px-2 py-1" }, "Player"),
              c("th", { class: "border px-2 py-1" }, "W-L-T"),
              c("th", { class: "border px-2 py-1" }, "Points"),
              c("th", { class: "border px-2 py-1" }, "Pts Diff")
            ])
          ],
          -1
          /* CACHED */
        )),
        c("tbody", null, [
          (f(!0), T(
            j,
            null,
            F(e.roundRobinStandings, (i) => (f(), T("tr", {
              key: i.id
            }, [
              c(
                "td",
                pt,
                I(i.place),
                1
                /* TEXT */
              ),
              c(
                "td",
                Tt,
                I(i.name),
                1
                /* TEXT */
              ),
              c(
                "td",
                bt,
                I(i.wins) + "-" + I(i.losses) + "-" + I(i.ties),
                1
                /* TEXT */
              ),
              c(
                "td",
                Ot,
                I(i.score),
                1
                /* TEXT */
              ),
              c(
                "td",
                vt,
                I(i.ptsDiff),
                1
                /* TEXT */
              )
            ]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ])) : z("v-if", !0)
  ]);
}
const St = /* @__PURE__ */ H(tt, [["render", yt], ["__file", "/app/src/components/TournamentBracket.vue"]]), Nt = (d) => {
  d.component("TournamentBracket", St);
};
export {
  v as PERMISSIONS,
  St as TournamentBracket,
  Z as createLowerBracketStructure,
  wt as createTournamentState,
  Nt as install
};
