import { createElementBlock as y, openBlock as f, normalizeClass as H, createCommentVNode as q, withDirectives as J, createElementVNode as h, Fragment as U, renderList as W, toDisplayString as B, vModelSelect as oe, ref as D, computed as A, watch as M, onMounted as R, vModelText as Z, createVNode as L, createBlock as $ } from "vue";
const j = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination",
  SWISS: "swiss",
  ROUND_ROBIN: "round_robin"
}, k = "TBD", O = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, E = {
  CAN_SELECT_TEAM: "can_select_team",
  CAN_EDIT_DATE: "can_edit_date",
  CAN_EDIT_SCOPE: "can_edit_scope",
  CAN_EDIT_ROUND_NAME: "can_edit_round_name",
  CAN_EDIT_BEST_OF: "can_edit_best_of"
}, C = (i, a) => {
  const t = i.__vccOpts || i;
  for (const [e, s] of a)
    t[e] = s;
  return t;
}, re = {
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
      default: () => ({
        [E.CAN_SELECT_TEAM]: !0
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
  setup(i, { expose: a, emit: t }) {
    a();
    const e = i, s = t, n = D(e.team.name), o = A(() => {
      var d;
      return n.value === k ? null : ((d = e.availableTeams.find((b) => b.name === n.value)) == null ? void 0 : d.logo) || null;
    });
    M(
      () => e.team,
      (d) => {
        n.value = d.name;
      },
      { immediate: !0 }
    ), R(() => {
      console.log("TeamSelect mounted:", {
        team: e.team,
        availableTeams: e.availableTeams
      });
    });
    const r = (d) => d === k ? !1 : e.selectedTeams.includes(d) && d !== e.team.name || d === e.team.name && e.team.name !== k, c = A(() => e.availableTeams ? e.availableTeams.filter((d) => d.name === k || d.name === e.team.name ? !0 : !r(d.name)) : []), m = { props: e, emit: s, selectedTeam: n, selectedTeamLogo: o, isTeamSelected: r, availableTeamsForSelection: c, highlightTeam: () => {
      e.team.name !== k && s("highlight-team", e.team.name);
    }, unhighlightTeam: () => {
      s("unhighlight-team");
    }, updateTeam: () => {
      const d = e.availableTeams.find(
        (b) => b.name === n.value
      );
      console.log("Updating team:", {
        selectedTeam: n.value,
        selectedTeamData: d
      }), s("update:team", {
        position: e.teamPosition,
        team: {
          id: (d == null ? void 0 : d.id) || null,
          name: n.value,
          logo: (d == null ? void 0 : d.logo) || null,
          score: 0
        }
      });
    }, ref: D, computed: A, onMounted: R, watch: M, get TBD() {
      return k;
    }, get PERMISSIONS() {
      return E;
    } };
    return Object.defineProperty(m, "__isScriptSetup", { enumerable: !1, value: !0 }), m;
  }
}, le = {
  key: 0,
  class: "flex items-center gap-2"
}, ce = ["src", "alt"], de = ["value", "disabled"], me = {
  key: 1,
  class: "flex items-center gap-2"
}, ue = ["src", "alt"], he = { class: "text-gray-900 dark:text-white" };
function ge(i, a, t, e, s, n) {
  return f(), y(
    "div",
    {
      class: H(["flex-grow p-2.5 hover:bg-gray-200/30 dark:hover:bg-gray-950/20", {
        "hover:bg-green-500/20 dark:hover:bg-green-500/20": t.isWinner,
        "hover:bg-red-500/20 dark:hover:bg-red-500/20": t.isLoser,
        "bg-green-500/20 dark:bg-green-500/20": t.shouldHighlight && t.isWinner,
        "bg-red-500/20 dark:bg-red-500/20": t.shouldHighlight && t.isLoser
      }]),
      onMouseenter: e.highlightTeam,
      onMouseleave: e.unhighlightTeam
    },
    [
      t.canEdit && t.permissions[e.PERMISSIONS.CAN_SELECT_TEAM] ? (f(), y("div", le, [
        e.selectedTeamLogo ? (f(), y("img", {
          key: 0,
          src: e.selectedTeamLogo,
          alt: e.selectedTeam,
          class: "w-6 h-6 rounded-full"
        }, null, 8, ce)) : q("v-if", !0),
        J(h(
          "select",
          {
            "onUpdate:modelValue": a[0] || (a[0] = (o) => e.selectedTeam = o),
            class: "select select-ghost w-full select-xs",
            onChange: e.updateTeam
          },
          [
            a[1] || (a[1] = h(
              "option",
              { value: "TBD" },
              "TBD",
              -1
              /* CACHED */
            )),
            (f(!0), y(
              U,
              null,
              W(e.availableTeamsForSelection, (o) => (f(), y("option", {
                key: o.id,
                value: o.name,
                disabled: e.isTeamSelected(o.name)
              }, B(o.name), 9, de))),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [oe, e.selectedTeam]
        ])
      ])) : (f(), y("div", me, [
        t.team.logo ? (f(), y("img", {
          key: 0,
          src: t.team.logo,
          alt: t.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, ue)) : q("v-if", !0),
        h(
          "span",
          he,
          B(t.team.name),
          1
          /* TEXT */
        )
      ]))
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
const fe = /* @__PURE__ */ C(re, [["render", ge], ["__file", "/app/src/components/team/TeamSelect.vue"]]), _e = {
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
  setup(i, { expose: a, emit: t }) {
    a();
    const e = i, s = t, n = D(!1), o = D(e.team.score ?? 0), r = () => {
      e.canEditScore && (n.value = !0);
    }, c = () => {
      const l = parseInt(o.value) || 0;
      s("update:score", {
        position: e.teamPosition,
        score: l
      });
    };
    M(
      () => e.team,
      (l) => {
        o.value = l.score ?? 0;
      },
      { deep: !0 }
    );
    const _ = { props: e, emit: s, isEditing: n, score: o, selectScore: r, updateScore: c, ref: D, watch: M };
    return Object.defineProperty(_, "__isScriptSetup", { enumerable: !1, value: !0 }), _;
  }
}, Te = {
  key: 1,
  class: "text-white"
};
function pe(i, a, t, e, s, n) {
  return f(), y(
    "div",
    {
      class: H(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", {
        "border-b border-orange-600 dark:border-orange-700": t.isFirstTeam
      }]),
      onClick: e.selectScore
    },
    [
      e.isEditing ? J((f(), y(
        "input",
        {
          key: 0,
          "onUpdate:modelValue": a[0] || (a[0] = (o) => e.score = o),
          type: "number",
          class: "input input-xs",
          required: "",
          min: "0",
          onChange: e.updateScore,
          onBlur: a[1] || (a[1] = (o) => e.isEditing = !1)
        },
        null,
        544
        /* NEED_HYDRATION, NEED_PATCH */
      )), [
        [Z, e.score]
      ]) : (f(), y(
        "span",
        Te,
        B(t.team.score),
        1
        /* TEXT */
      ))
    ],
    2
    /* CLASS */
  );
}
const ye = /* @__PURE__ */ C(_e, [["render", pe], ["__file", "/app/src/components/team/TeamScoreInput.vue"]]), be = {
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
      default: () => ({
        [E.CAN_SELECT_TEAM]: !0,
        [E.CAN_EDIT_SCOPE]: !0
      })
    }
  },
  emits: [
    "update:team",
    "update:score",
    "highlight-team",
    "unhighlight-team"
  ],
  setup(i, { expose: a }) {
    a();
    const e = { props: i, TeamSelect: fe, TeamScoreInput: ye, get PERMISSIONS() {
      return E;
    } };
    return Object.defineProperty(e, "__isScriptSetup", { enumerable: !1, value: !0 }), e;
  }
}, ve = { class: "flex" };
function Se(i, a, t, e, s, n) {
  return f(), y("div", ve, [
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
      "onUpdate:team": a[0] || (a[0] = (o) => i.$emit("update:team", o)),
      onHighlightTeam: a[1] || (a[1] = (o) => i.$emit("highlight-team", o)),
      onUnhighlightTeam: a[2] || (a[2] = (o) => i.$emit("unhighlight-team"))
    }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "highlighted-team", "permissions", "can-edit", "is-winner", "is-loser", "should-highlight", "is-first-team"]),
    L(e.TeamScoreInput, {
      team: t.team,
      "team-position": t.teamPosition,
      "can-edit-score": t.canEditScore,
      "is-first-team": t.isFirstTeam,
      "onUpdate:score": a[3] || (a[3] = (o) => i.$emit("update:score", o))
    }, null, 8, ["team", "team-position", "can-edit-score", "is-first-team"])
  ]);
}
const Ee = /* @__PURE__ */ C(be, [["render", Se], ["__file", "/app/src/components/team/TeamRow.vue"]]), we = {
  __name: "BracketMatch",
  props: {
    match: {
      type: Object,
      default: () => ({
        teamOne: { name: k, score: 0 },
        teamTwo: { name: k, score: 0 },
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
      default: () => ({
        [E.CAN_SELECT_TEAM]: !0,
        [E.CAN_EDIT_DATE]: !0,
        [E.CAN_EDIT_SCOPE]: !0
      })
    }
  },
  emits: [
    "update:match",
    "highlight-team",
    "unhighlight-team",
    "click-match"
  ],
  setup(i, { expose: a, emit: t }) {
    a();
    const e = i, s = t, n = A(() => e.roundIndex === 0 && e.permissions[E.CAN_SELECT_TEAM]), o = A(() => e.match[O.ONE].name !== k && e.match[O.TWO].name !== k && e.permissions[E.CAN_EDIT_SCOPE]), I = { props: e, emit: s, canEdit: n, canEditScore: o, isWinner: (g) => e.match.winner === g, isLoser: (g) => e.match.winner && e.match.winner !== g, shouldHighlight: (g) => {
      const p = e.match[g].name;
      return e.highlightedTeam === p;
    }, highlightTeam: (g) => {
      s("highlight-team", g);
    }, unhighlightTeam: () => {
      s("unhighlight-team");
    }, updateTeam: ({ position: g, team: p }) => {
      const N = {
        ...e.match,
        [g]: p
      };
      s("update:match", N);
    }, updateScore: ({ position: g, score: p }) => {
      const N = {
        ...e.match,
        [g]: {
          ...e.match[g],
          score: p
        }
      }, S = N[O.ONE].score, w = N[O.TWO].score;
      S > w && (N.winner = O.ONE), w > S && (N.winner = O.TWO), S === w && (N.winner = null), s("update:match", N);
    }, formatDateTimeForInput: (g) => g ? new Date(g).toISOString().slice(0, 16) : "", updateDate: (g) => {
      const p = {
        ...e.match,
        date: g.target.value
      };
      s("update:match", p);
    }, formatDate: (g) => g ? new Date(g).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }) : "", onMatchClick: (g) => {
      const p = g.target.tagName.toLowerCase();
      p === "input" || p === "select" || p === "option" || p === "button" || g.target.closest("input,select,option,button") || !(!e.permissions[E.CAN_SELECT_TEAM] && !e.permissions[E.CAN_EDIT_DATE] && !e.permissions[E.CAN_EDIT_SCOPE]) || s("click-match", {
        match: e.match,
        roundIndex: e.roundIndex,
        matchIndex: e.index,
        id: e.match.id ?? null
      });
    }, computed: A, TeamRow: Ee, get TBD() {
      return k;
    }, get TEAM_POSITION() {
      return O;
    }, get PERMISSIONS() {
      return E;
    } };
    return Object.defineProperty(I, "__isScriptSetup", { enumerable: !1, value: !0 }), I;
  }
}, Oe = { class: "flex flex-col w-full" }, ke = { class: "px-3 py-1 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center" }, xe = ["value", "disabled"], Ne = {
  key: 0,
  class: "absolute top-1/2 left-full w-2.5 h-[calc(100%+10px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[-10px] ml-[15px] mx-2 transition-colors duration-200"
};
function Be(i, a, t, e, s, n) {
  return f(), y(
    "div",
    {
      class: H(["relative text-[0.8em] flex items-center", { group: t.index % 2 == 0 && t.totalMatches > 1 }])
    },
    [
      h("div", Oe, [
        h("div", ke, [
          h("input", {
            type: "datetime-local",
            value: e.formatDateTimeForInput(t.match.date),
            class: "input input-ghost input-sm",
            disabled: !t.permissions[e.PERMISSIONS.CAN_EDIT_DATE],
            onInput: e.updateDate
          }, null, 40, xe)
        ]),
        h("div", {
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
            "can-select-team": i.canSelectTeam,
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
            "can-select-team": i.canSelectTeam,
            "highlighted-team": t.highlightedTeam,
            permissions: t.permissions,
            "onUpdate:team": e.updateTeam,
            "onUpdate:score": e.updateScore,
            onHighlightTeam: e.highlightTeam,
            onUnhighlightTeam: e.unhighlightTeam
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"])
        ])
      ]),
      t.index % 2 == 0 && t.totalMatches > 1 ? (f(), y("div", Ne, a[0] || (a[0] = [
        h(
          "span",
          { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" },
          null,
          -1
          /* CACHED */
        )
      ]))) : q("v-if", !0)
    ],
    2
    /* CLASS */
  );
}
const Ie = /* @__PURE__ */ C(we, [["render", Be], ["__file", "/app/src/components/bracket/BracketMatch.vue"]]), De = {
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
      default: () => ({
        [E.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: [
    "update:match",
    "highlight-team",
    "unhighlight-team",
    "click-match"
  ],
  setup(i, { expose: a, emit: t }) {
    a();
    const e = i, s = t, r = { props: e, emit: s, updateMatch: (c, _) => {
      s("update:match", e.columnIndex, c, _);
    }, onClickMatch: (c, _) => {
      s("click-match", {
        ..._,
        roundIndex: e.columnIndex,
        matchIndex: c
      });
    }, BracketMatch: Ie, get PERMISSIONS() {
      return E;
    } };
    return Object.defineProperty(r, "__isScriptSetup", { enumerable: !1, value: !0 }), r;
  }
}, Ae = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, Me = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50 mt-[23px]" };
function Ce(i, a, t, e, s, n) {
  return f(), y("div", Ae, [
    (f(!0), y(
      U,
      null,
      W(t.column.matches, (o, r) => (f(), y(
        U,
        {
          key: o.id
        },
        [
          h(
            "div",
            Me,
            B(o.number),
            1
            /* TEXT */
          ),
          L(e.BracketMatch, {
            match: o,
            index: r,
            "total-matches": t.column.matches.length,
            "round-index": t.columnIndex,
            "available-teams": t.availableTeams,
            "selected-teams": t.selectedTeams,
            "highlighted-team": t.highlightedTeam,
            permissions: t.permissions,
            "onUpdate:match": (c) => e.updateMatch(r, c),
            onHighlightTeam: a[0] || (a[0] = (c) => i.$emit("highlight-team", c)),
            onUnhighlightTeam: a[1] || (a[1] = (c) => i.$emit("unhighlight-team")),
            onClickMatch: (c) => e.onClickMatch(r, c)
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
const ee = /* @__PURE__ */ C(De, [["render", Ce], ["__file", "/app/src/components/bracket/BracketColumn.vue"]]), Le = {
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
  setup(i, { expose: a, emit: t }) {
    a();
    const e = i, s = t, n = [1, 3, 5, 7, 9], o = D(e.columns.map((l) => l.name));
    M(
      () => e.columns,
      (l) => {
        o.value = l.map((u) => u.name);
      },
      { deep: !0 }
    );
    const _ = { props: e, emit: s, bestOfValues: n, localColumnNames: o, updateColumnName: (l, u) => {
      o.value[l] = u;
      const m = [...e.columns];
      m[l] = {
        ...m[l],
        name: u
      }, s("update:columns", m);
    }, updateColumnBestOf: (l, u) => {
      const m = [...e.columns];
      m[l] = {
        ...m[l],
        bestOf: Number(u)
      }, s("update:columns", m);
    }, ref: D, watch: M, get PERMISSIONS() {
      return E;
    } };
    return Object.defineProperty(_, "__isScriptSetup", { enumerable: !1, value: !0 }), _;
  }
}, Ue = { class: "flex justify-between px-5" }, qe = { class: "flex flex-col items-center gap-2" }, We = { class: "mt-2" }, je = { class: "flex items-center rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600" }, Pe = { class: "join" }, Re = ["onUpdate:modelValue", "disabled", "onBlur"], He = ["value", "disabled", "onChange"], Fe = ["value"];
function ze(i, a, t, e, s, n) {
  return f(), y("div", Ue, [
    (f(!0), y(
      U,
      null,
      W(t.columns, (o, r) => (f(), y("div", {
        key: o.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
      }, [
        h("div", qe, [
          h("div", We, [
            h("div", je, [
              h("div", Pe, [
                J(h("input", {
                  "onUpdate:modelValue": (c) => e.localColumnNames[r] = c,
                  disabled: !t.permissions[e.PERMISSIONS.CAN_EDIT_ROUND_NAME],
                  type: "text",
                  class: "input input-bordered join-item",
                  onBlur: (c) => e.updateColumnName(r, c.target.value)
                }, null, 40, Re), [
                  [Z, e.localColumnNames[r]]
                ]),
                h("select", {
                  value: o.bestOf,
                  disabled: !t.permissions[e.PERMISSIONS.CAN_EDIT_BEST_OF],
                  class: "select select-bordered join-item",
                  onChange: (c) => e.updateColumnBestOf(r, c.target.value)
                }, [
                  (f(), y(
                    U,
                    null,
                    W(e.bestOfValues, (c) => h("option", {
                      key: c,
                      value: c
                    }, " Best of " + B(c), 9, Fe)),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ], 40, He)
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
const te = /* @__PURE__ */ C(Le, [["render", ze], ["__file", "/app/src/components/bracket/BracketRoundHeaders.vue"]]), Ve = {
  __name: "BracketSection",
  props: {
    title: {
      type: String,
      required: !0
    },
    columns: {
      type: Array,
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
      required: !0
    },
    bordered: {
      type: Boolean,
      default: !1
    },
    onMatchUpdate: {
      type: Function,
      required: !0
    },
    onColumnsUpdate: {
      type: Function,
      required: !0
    },
    onHighlight: {
      type: Function,
      required: !0
    },
    onUnhighlight: {
      type: Function,
      required: !0
    },
    onClickMatch: {
      type: Function,
      required: !1,
      default: () => {
      }
    }
  },
  setup(i, { expose: a }) {
    a();
    const e = { props: i, BracketColumn: ee, BracketRoundHeaders: te };
    return Object.defineProperty(e, "__isScriptSetup", { enumerable: !1, value: !0 }), e;
  }
}, Je = { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, Ge = { class: "flex flex-col" }, Ke = { class: "overflow-x-auto" }, Ye = { class: "min-w-max" }, Qe = { class: "flex flex-1 p-5" };
function Xe(i, a, t, e, s, n) {
  return f(), y(
    "div",
    {
      class: H(["flex flex-col mt-8", {
        "border-t-2 border-gray-300 dark:border-gray-600 pt-8": t.bordered
      }])
    },
    [
      h(
        "div",
        Je,
        B(t.title),
        1
        /* TEXT */
      ),
      h("div", Ge, [
        h("div", Ke, [
          h("div", Ye, [
            L(e.BracketRoundHeaders, {
              columns: t.columns,
              permissions: t.permissions,
              "onUpdate:columns": t.onColumnsUpdate
            }, null, 8, ["columns", "permissions", "onUpdate:columns"]),
            h("div", Qe, [
              (f(!0), y(
                U,
                null,
                W(t.columns, (o, r) => (f(), $(e.BracketColumn, {
                  key: o.id,
                  column: o,
                  "column-index": r,
                  "available-teams": t.availableTeams,
                  "selected-teams": t.selectedTeams,
                  "highlighted-team": t.highlightedTeam,
                  permissions: t.permissions,
                  "onUpdate:match": t.onMatchUpdate,
                  onHighlightTeam: t.onHighlight,
                  onUnhighlightTeam: t.onUnhighlight,
                  onClickMatch: t.onClickMatch
                }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team", "permissions", "onUpdate:match", "onHighlightTeam", "onUnhighlightTeam", "onClickMatch"]))),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ])
        ])
      ])
    ],
    2
    /* CLASS */
  );
}
const Ze = /* @__PURE__ */ C(Ve, [["render", Xe], ["__file", "/app/src/components/bracket/BracketSection.vue"]]), G = () => ({
  id: null,
  name: k,
  logo: null,
  score: 0
}), ae = (i) => ({
  id: `match-${i}`,
  number: i,
  [O.ONE]: G(),
  [O.TWO]: G(),
  winner: null,
  date: null
});
function ne(i, a) {
  return Array.from({ length: i }, (t, e) => a(e));
}
const wt = (i, a = 3) => {
  const t = Math.log2(i);
  let e = 1;
  return Array.from({ length: t }, (s, n) => {
    const o = Math.pow(2, t - n - 1), r = ne(
      o,
      () => ae(e++)
    );
    return {
      id: `upper-round-${n + 1}`,
      name: `Round ${n + 1}`,
      matches: r,
      bestOf: a
    };
  });
}, z = (i, a) => {
  const t = i - 1;
  let e = 1;
  return Array.from({ length: t }, (s, n) => {
    const o = Math.pow(2, i - n - 2), r = ne(
      o,
      () => ae(e++)
    );
    return {
      id: `lower-round-${n + 1}`,
      name: `Lower Round ${n + 1}`,
      matches: r,
      bestOf: a
    };
  });
}, $e = {
  __name: "StandingsTable",
  props: {
    standings: {
      type: Array,
      required: !0
    },
    format: {
      type: String,
      required: !0
    },
    tournamentFormat: {
      type: Object,
      required: !0
    }
  },
  setup(i, { expose: a }) {
    a();
    const t = {};
    return Object.defineProperty(t, "__isScriptSetup", { enumerable: !1, value: !0 }), t;
  }
}, et = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, tt = { class: "relative overflow-x-auto shadow-md sm:rounded-lg mt-8" }, at = { class: "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" }, nt = { class: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" }, it = {
  key: 0,
  scope: "col",
  class: "px-6 py-3"
}, st = {
  scope: "row",
  class: "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
}, ot = { class: "px-6 py-4" }, rt = { class: "px-6 py-4" }, lt = { class: "px-6 py-4" }, ct = {
  key: 0,
  class: "px-6 py-4"
}, dt = { class: "px-6 py-4" };
function mt(i, a, t, e, s, n) {
  return f(), y("div", et, [
    a[5] || (a[5] = h(
      "div",
      { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" },
      " Standings ",
      -1
      /* CACHED */
    )),
    h("div", tt, [
      h("table", at, [
        h("thead", nt, [
          h("tr", null, [
            a[0] || (a[0] = h(
              "th",
              {
                scope: "col",
                class: "px-6 py-3"
              },
              "Place",
              -1
              /* CACHED */
            )),
            a[1] || (a[1] = h(
              "th",
              {
                scope: "col",
                class: "px-6 py-3"
              },
              "Team",
              -1
              /* CACHED */
            )),
            a[2] || (a[2] = h(
              "th",
              {
                scope: "col",
                class: "px-6 py-3"
              },
              "W-L-T",
              -1
              /* CACHED */
            )),
            a[3] || (a[3] = h(
              "th",
              {
                scope: "col",
                class: "px-6 py-3"
              },
              "Points",
              -1
              /* CACHED */
            )),
            t.format === t.tournamentFormat.SWISS ? (f(), y("th", it, " Buchholz ")) : q("v-if", !0),
            a[4] || (a[4] = h(
              "th",
              {
                scope: "col",
                class: "px-6 py-3"
              },
              "Pts Diff",
              -1
              /* CACHED */
            ))
          ])
        ]),
        h("tbody", null, [
          (f(!0), y(
            U,
            null,
            W(t.standings, (o) => (f(), y("tr", {
              key: o.id,
              class: "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            }, [
              h(
                "th",
                st,
                B(o.place),
                1
                /* TEXT */
              ),
              h(
                "td",
                ot,
                B(o.name),
                1
                /* TEXT */
              ),
              h(
                "td",
                rt,
                B(o.wins) + "-" + B(o.losses) + "-" + B(o.ties),
                1
                /* TEXT */
              ),
              h(
                "td",
                lt,
                B(o.score),
                1
                /* TEXT */
              ),
              t.format === t.tournamentFormat.SWISS ? (f(), y(
                "td",
                ct,
                B(o.buchholz),
                1
                /* TEXT */
              )) : q("v-if", !0),
              h(
                "td",
                dt,
                B(o.ptsDiff),
                1
                /* TEXT */
              )
            ]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ])
  ]);
}
const ut = /* @__PURE__ */ C($e, [["render", mt], ["__file", "/app/src/components/StandingsTable.vue"]]);
function ht(i) {
  const a = {}, t = {};
  i.forEach((s) => {
    s.matches.forEach((n) => {
      if (["teamOne", "teamTwo"].forEach((o) => {
        const r = n[o];
        r && (a[r.id] || (a[r.id] = {
          ...r,
          wins: 0,
          losses: 0,
          ties: 0,
          score: 0,
          ptsDiff: 0,
          buchholz: 0
        }), t[r.id] || (t[r.id] = []));
      }), n.teamOne && n.teamTwo) {
        const o = n.teamOne, r = n.teamTwo, c = o.score || 0, _ = r.score || 0;
        n.winner === "teamOne" ? (a[o.id].wins++, a[o.id].score += 1, a[r.id].losses++) : n.winner === "teamTwo" ? (a[r.id].wins++, a[r.id].score += 1, a[o.id].losses++) : n.winner === null && (c > 0 || _ > 0) && (a[o.id].ties++, a[r.id].ties++, a[o.id].score += 0.5, a[r.id].score += 0.5), a[o.id].ptsDiff += c - _, a[r.id].ptsDiff += _ - c, t[o.id].push(r.id), t[r.id].push(o.id);
      } else n.teamOne && !n.teamTwo ? (a[n.teamOne.id].wins++, a[n.teamOne.id].score += 1) : !n.teamOne && n.teamTwo && (a[n.teamTwo.id].wins++, a[n.teamTwo.id].score += 1);
    });
  }), Object.values(a).forEach((s) => {
    s.buchholz = (t[s.id] || []).reduce(
      (n, o) => {
        var r;
        return n + (((r = a[o]) == null ? void 0 : r.score) || 0);
      },
      0
    );
  });
  const e = Object.values(a).sort(
    (s, n) => n.score - s.score || n.wins - s.wins || n.buchholz - s.buchholz || n.ptsDiff - s.ptsDiff
  );
  return e.forEach((s, n) => {
    s.place = n + 1;
  }), e;
}
function F(i, a) {
  return i.filter((t) => !!t.id && t.name !== a);
}
function V(i, a, t, e, s, n) {
  const o = a.score || 0, r = t.score || 0;
  e === s ? (i[a.id].wins++, i[a.id].score += 1, i[t.id].losses++) : e === n ? (i[t.id].wins++, i[t.id].score += 1, i[a.id].losses++) : e === null && (o > 0 || r > 0) && (i[a.id].ties++, i[t.id].ties++, i[a.id].score += 0.5, i[t.id].score += 0.5), i[a.id].ptsDiff += o - r, i[t.id].ptsDiff += r - o;
}
function K({
  upperColumns: i,
  lowerColumns: a,
  format: t,
  TOURNAMENT_FORMAT: e,
  TEAM_POSITION: s,
  TBD: n
}) {
  switch (t) {
    case e.SWISS:
      return F(gt(i), n);
    case e.ROUND_ROBIN:
      return F(
        ft(i, s),
        n
      );
    case e.SINGLE_ELIMINATION:
    case e.DOUBLE_ELIMINATION:
    default:
      return F(
        _t(
          i,
          a,
          t,
          e,
          s
        ),
        n
      );
  }
}
function gt(i) {
  return ht(i);
}
function ft(i, a) {
  const t = {};
  for (const e of i)
    for (const s of e.matches) {
      for (const r of [a.ONE, a.TWO]) {
        const c = s[r];
        !c || !c.id || t[c.id] || (t[c.id] = {
          ...c,
          wins: 0,
          losses: 0,
          ties: 0,
          score: 0,
          ptsDiff: 0
        });
      }
      const n = s[a.ONE], o = s[a.TWO];
      n && o && n.id && o.id && V(
        t,
        n,
        o,
        s.winner,
        a.ONE,
        a.TWO
      );
    }
  return ie(t, ["score", "wins", "ptsDiff"]);
}
function _t(i, a, t, e, s) {
  const n = {};
  for (const o of i)
    for (const r of o.matches) {
      for (const l of [s.ONE, s.TWO]) {
        const u = r[l];
        !u || !u.id || n[u.id] || (n[u.id] = {
          ...u,
          wins: 0,
          losses: 0,
          ties: 0,
          score: 0,
          ptsDiff: 0
        });
      }
      const c = r[s.ONE], _ = r[s.TWO];
      c && _ && c.id && _.id && V(
        n,
        c,
        _,
        r.winner,
        s.ONE,
        s.TWO
      );
    }
  if (t === e.DOUBLE_ELIMINATION && a)
    for (const o of a)
      for (const r of o.matches) {
        for (const l of [s.ONE, s.TWO]) {
          const u = r[l];
          !u || !u.id || n[u.id] || (n[u.id] = {
            ...u,
            wins: 0,
            losses: 0,
            ties: 0,
            score: 0,
            ptsDiff: 0
          });
        }
        const c = r[s.ONE], _ = r[s.TWO];
        c && _ && c.id && _.id && V(
          n,
          c,
          _,
          r.winner,
          s.ONE,
          s.TWO
        );
      }
  return ie(n, ["score", "wins", "ptsDiff"]);
}
function ie(i, a) {
  const t = Object.values(i).sort((e, s) => {
    for (const n of a)
      if (s[n] !== e[n]) return s[n] - e[n];
    return 0;
  });
  return t.forEach((e, s) => {
    e.place = s + 1;
  }), t;
}
function Tt(i, a = []) {
  const t = {};
  i.forEach((l) => {
    t[l.score] || (t[l.score] = []), t[l.score].push(l);
  });
  const e = Object.keys(t).map(Number).sort((l, u) => u - l), s = [], n = /* @__PURE__ */ new Set(), o = i.map((l) => l.id), r = new Set(a.map(([l, u]) => `${l}-${u}`));
  function c(l) {
    const u = [], m = /* @__PURE__ */ new Set();
    for (let d = 0; d < l.length; d++) {
      if (m.has(l[d].id)) continue;
      let b = !1;
      for (let T = d + 1; T < l.length; T++)
        if (!m.has(l[T].id) && !r.has(`${l[d].id}-${l[T].id}`) && !r.has(`${l[T].id}-${l[d].id}`)) {
          u.push([l[d], l[T]]), m.add(l[d].id), m.add(l[T].id), n.add(l[d].id), n.add(l[T].id), b = !0;
          break;
        }
      if (!b) {
        for (let T of e)
          if (T !== l[d].score) {
            for (let v of t[T] || [])
              if (!n.has(v.id) && !r.has(`${l[d].id}-${v.id}`) && !r.has(`${v.id}-${l[d].id}`))
                return u.push([l[d], v]), m.add(l[d].id), m.add(v.id), n.add(l[d].id), n.add(v.id), u;
          }
      }
    }
    return u;
  }
  for (let l of e) {
    const u = t[l].filter((b) => !n.has(b.id)), m = c(u);
    s.push(...m);
    const d = u.filter((b) => !n.has(b.id));
    if (d.length === 1) {
      let b = !1;
      for (let T of e)
        if (T !== l) {
          for (let v of t[T] || [])
            if (!n.has(v.id) && !r.has(`${d[0].id}-${v.id}`) && !r.has(`${v.id}-${d[0].id}`)) {
              s.push([d[0], v]), n.add(d[0].id), n.add(v.id), b = !0;
              break;
            }
          if (b) break;
        }
      b || (s.push([d[0], null]), n.add(d[0].id));
    }
  }
  const _ = o.filter((l) => !n.has(l));
  for (let l of _) {
    const u = i.find((m) => m.id === l);
    s.push([u, null]);
  }
  return s;
}
function Y({
  upperColumns: i,
  lowerColumns: a,
  props: t,
  emit: e,
  TOURNAMENT_FORMAT: s,
  TEAM_POSITION: n,
  TBD: o
}) {
  function r(m, d, b) {
    if (i.value[m] && i.value[m].matches) {
      if (i.value[m].matches[d] = b, b.winner && m < i.value.length - 1) {
        const T = m + 1, v = Math.floor(d / 2);
        if (i.value[T] && i.value[T].matches[v]) {
          const x = i.value[T].matches[v], I = d % 2 === 0 ? n.ONE : n.TWO, g = b[b.winner];
          i.value[T].matches[v] = {
            ...x,
            [I]: {
              id: g.id,
              name: g.name,
              logo: g.logo,
              score: 0
            }
          };
        }
      }
      if (t.format === s.DOUBLE_ELIMINATION && b.winner) {
        const T = b[b.winner === n.ONE ? n.TWO : n.ONE];
        if (T.name !== o) {
          const v = Math.floor(m / 2), x = Math.floor(d / 2);
          if (a.value[v] && a.value[v].matches[x]) {
            const I = a.value[v].matches[x], g = d % 2 === 0 ? n.ONE : n.TWO;
            a.value[v].matches[x] = {
              ...I,
              [g]: {
                id: T.id,
                name: T.name,
                logo: T.logo,
                score: 0
              }
            };
          }
        }
      }
      l();
    }
    if (t.format === s.SWISS && i.value[m].matches.every((x) => x.winner) && m < i.value.length - 1) {
      const x = {};
      for (let S = 0; S <= m; S++)
        i.value[S].matches.forEach((w) => {
          ["teamOne", "teamTwo"].forEach((se) => {
            const P = w[se];
            P && (x[P.id] || (x[P.id] = { ...P, score: 0 }));
          }), w.winner && w.teamOne && w.teamTwo && (w.winner === "teamOne" && (x[w.teamOne.id].score += 1), w.winner === "teamTwo" && (x[w.teamTwo.id].score += 1));
        });
      const I = [];
      for (let S = 0; S <= m; S++)
        i.value[S].matches.forEach((w) => {
          w.teamOne && w.teamTwo && I.push([w.teamOne.id, w.teamTwo.id]);
        });
      const g = Object.values(x), p = Tt(g, I), N = i.value[m + 1];
      N.matches = p.map((S, w) => ({
        id: `swiss-match-${m + 2}-${w + 1}`,
        number: w + 1,
        teamOne: S[0],
        teamTwo: S[1],
        winner: null,
        date: null
      }));
    }
  }
  function c(m) {
    i.value = m, l();
  }
  function _(m) {
    a.value = m, l();
  }
  function l() {
    e("update:state", {
      upper: i.value,
      lower: t.format === s.DOUBLE_ELIMINATION ? a.value : null
    });
  }
  function u() {
    if (t.initialState) {
      if (Array.isArray(t.initialState)) {
        if (i.value = JSON.parse(JSON.stringify(t.initialState)), t.format === s.DOUBLE_ELIMINATION) {
          a.value = z(
            i.value.length,
            t.defaultBestOf
          );
          return;
        }
        if (t.format === s.SWISS) {
          a.value = [];
          return;
        }
        return;
      }
      i.value = JSON.parse(
        JSON.stringify(t.initialState.upper || [])
      ), a.value = JSON.parse(
        JSON.stringify(t.initialState.lower || [])
      );
    }
  }
  return {
    updateUpperMatch: r,
    updateUpperColumns: c,
    updateLowerState: _,
    emitTournamentState: l,
    initializeTournament: u
  };
}
class pt {
  /**
   * @param {string} id
   * @returns {Promise<Tournament>}
   */
  async getTournament(a) {
    throw new Error("Not implemented");
  }
  /**
   * @param {Tournament} data
   * @returns {Promise<void>}
   */
  async saveTournament(a) {
    throw new Error("Not implemented");
  }
  /**
   * @param {string} tournamentId
   * @param {string} matchId
   * @param {Match} matchData
   * @returns {Promise<void>}
   */
  async updateMatch(a, t, e) {
    throw new Error("Not implemented");
  }
  /**
   * @returns {Promise<TournamentSummary[]>}
   */
  async listTournaments() {
    throw new Error("Not implemented");
  }
  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteTournament(a) {
    throw new Error("Not implemented");
  }
}
const Q = "tournaments";
class X extends pt {
  /** @returns {Object} */
  _getAll() {
    return JSON.parse(localStorage.getItem(Q) || "{}");
  }
  /** @param {Object} all */
  _setAll(a) {
    localStorage.setItem(Q, JSON.stringify(a));
  }
  /** @param {string} id */
  async getTournament(a) {
    return this._getAll()[a] || null;
  }
  /** @param {Tournament} data */
  async saveTournament(a) {
    const t = this._getAll();
    t[a.id] = a, this._setAll(t);
  }
  /** @param {string} tournamentId, @param {string} matchId, @param {Match} matchData */
  async updateMatch(a, t, e) {
    const s = this._getAll(), n = s[a];
    if (!n) throw new Error("Tournament not found");
    let o = !1;
    for (const r of n.rounds)
      for (let c = 0; c < r.matches.length; c++)
        r.matches[c].id === t && (r.matches[c] = { ...r.matches[c], ...e }, o = !0);
    if (!o) throw new Error("Match not found");
    s[a] = n, this._setAll(s);
  }
  /** @returns {Promise<TournamentSummary[]>} */
  async listTournaments() {
    const a = this._getAll();
    return Object.values(a).map((t) => ({ id: t.id, name: t.name }));
  }
  /** @param {string} id */
  async deleteTournament(a) {
    const t = this._getAll();
    delete t[a], this._setAll(t);
  }
}
const yt = {
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
      default: () => ({
        [E.CAN_SELECT_TEAM]: !0,
        [E.CAN_EDIT_ROUND_NAME]: !0,
        [E.CAN_EDIT_BEST_OF]: !0
      })
    }
  },
  emits: ["update:state", "click-match"],
  setup(i, { expose: a, emit: t }) {
    a();
    const e = t, s = i, n = D([]), o = D([]), r = D(null), c = A(() => {
      const p = /* @__PURE__ */ new Set();
      return n.value.forEach((N) => {
        N.matches.forEach((S) => {
          S[O.ONE].name !== k && p.add(S[O.ONE].name), S[O.TWO].name !== k && p.add(S[O.TWO].name);
        });
      }), s.format === j.DOUBLE_ELIMINATION && o.value.forEach((N) => {
        N.matches.forEach((S) => {
          S[O.ONE].name !== k && p.add(S[O.ONE].name), S[O.TWO].name !== k && p.add(S[O.TWO].name);
        });
      }), Array.from(p);
    }), _ = A(() => K({
      upperColumns: n.value,
      lowerColumns: o.value,
      format: s.format,
      TOURNAMENT_FORMAT: j,
      TEAM_POSITION: O,
      TBD: k
    })), l = (p) => {
      r.value = p;
    }, u = () => {
      r.value = null;
    }, m = (p) => {
      e("click-match", p);
    }, d = new X(), {
      updateUpperMatch: b,
      updateUpperColumns: T,
      updateLowerState: v,
      emitTournamentState: x,
      initializeTournament: I
    } = Y({
      upperColumns: n,
      lowerColumns: o,
      props: s,
      emit: e,
      TOURNAMENT_FORMAT: j,
      TEAM_POSITION: O,
      TBD: k
    });
    M(
      () => s.initialState,
      () => {
        I();
      },
      { deep: !0 }
    ), M(
      () => s.format,
      (p) => {
        p === j.DOUBLE_ELIMINATION && (!o.value || o.value.length === 0) && (o.value = z(
          n.value.length,
          s.defaultBestOf
        ), x());
      }
    ), R(() => {
      I();
    });
    const g = { emit: e, props: s, upperColumns: n, lowerColumns: o, highlightedTeam: r, selectedTeams: c, standingsData: _, highlightTeam: l, unhighlightTeam: u, onMatchClick: m, storage: d, updateUpperMatch: b, updateUpperColumns: T, updateLowerState: v, emitTournamentState: x, initializeTournament: I, ref: D, onMounted: R, watch: M, computed: A, BracketColumn: ee, BracketRoundHeaders: te, BracketSection: Ze, get createLowerBracketStructure() {
      return z;
    }, get TOURNAMENT_FORMAT() {
      return j;
    }, get TBD() {
      return k;
    }, get TEAM_POSITION() {
      return O;
    }, get PERMISSIONS() {
      return E;
    }, StandingsTable: ut, get useStandings() {
      return K;
    }, get useBracket() {
      return Y;
    }, get LocalStorageTournament() {
      return X;
    } };
    return Object.defineProperty(g, "__isScriptSetup", { enumerable: !1, value: !0 }), g;
  }
}, bt = { class: "flex flex-col" };
function vt(i, a, t, e, s, n) {
  return f(), y("div", bt, [
    L(e.BracketSection, {
      title: "Upper Bracket",
      columns: e.upperColumns,
      "available-teams": t.availableTeams,
      "selected-teams": e.selectedTeams,
      "highlighted-team": e.highlightedTeam,
      permissions: t.permissions,
      "on-match-update": e.updateUpperMatch,
      "on-columns-update": e.updateUpperColumns,
      "on-highlight": e.highlightTeam,
      "on-unhighlight": e.unhighlightTeam,
      "on-click-match": e.onMatchClick
    }, null, 8, ["columns", "available-teams", "selected-teams", "highlighted-team", "permissions", "on-match-update", "on-columns-update"]),
    t.format === e.TOURNAMENT_FORMAT.DOUBLE_ELIMINATION ? (f(), $(e.BracketSection, {
      key: 0,
      title: "Lower Bracket",
      columns: e.lowerColumns,
      "available-teams": t.availableTeams,
      "selected-teams": e.selectedTeams,
      "highlighted-team": e.highlightedTeam,
      permissions: t.permissions,
      bordered: "",
      "on-match-update": e.updateLowerState,
      "on-columns-update": e.updateLowerState,
      "on-highlight": e.highlightTeam,
      "on-unhighlight": e.unhighlightTeam
    }, null, 8, ["columns", "available-teams", "selected-teams", "highlighted-team", "permissions", "on-match-update", "on-columns-update"])) : q("v-if", !0),
    L(e.StandingsTable, {
      standings: e.standingsData,
      format: t.format,
      "tournament-format": e.TOURNAMENT_FORMAT
    }, null, 8, ["standings", "format", "tournament-format"])
  ]);
}
const St = /* @__PURE__ */ C(yt, [["render", vt], ["__file", "/app/src/components/TournamentBracket.vue"]]), Ot = (i) => {
  i.component("TournamentBracket", St);
};
export {
  E as PERMISSIONS,
  St as TournamentBracket,
  z as createLowerBracketStructure,
  wt as createTournamentState,
  Ot as install
};
