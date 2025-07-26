import { createElementBlock as p, openBlock as f, normalizeClass as H, createCommentVNode as q, withDirectives as J, createElementVNode as h, Fragment as U, renderList as W, toDisplayString as B, vModelSelect as se, ref as D, computed as A, watch as M, onMounted as R, vModelText as Z, createVNode as L, createBlock as $ } from "vue";
const j = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination",
  SWISS: "swiss",
  ROUND_ROBIN: "round_robin"
}, k = "TBD", O = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, w = {
  CAN_SELECT_TEAM: "can_select_team",
  CAN_EDIT_DATE: "can_edit_date",
  CAN_EDIT_SCOPE: "can_edit_scope",
  CAN_EDIT_ROUND_NAME: "can_edit_round_name",
  CAN_EDIT_BEST_OF: "can_edit_best_of"
}, C = (i, a) => {
  const t = i.__vccOpts || i;
  for (const [e, r] of a)
    t[e] = r;
  return t;
}, oe = {
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
        [w.CAN_SELECT_TEAM]: !0
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
    const e = i, r = t, n = D(e.team.name), s = A(() => {
      var d;
      return n.value === k ? null : ((d = e.availableTeams.find((y) => y.name === n.value)) == null ? void 0 : d.logo) || null;
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
    const o = (d) => d === k ? !1 : e.selectedTeams.includes(d) && d !== e.team.name || d === e.team.name && e.team.name !== k, c = A(() => e.availableTeams ? e.availableTeams.filter((d) => d.name === k || d.name === e.team.name ? !0 : !o(d.name)) : []), u = { props: e, emit: r, selectedTeam: n, selectedTeamLogo: s, isTeamSelected: o, availableTeamsForSelection: c, highlightTeam: () => {
      e.team.name !== k && r("highlight-team", e.team.name);
    }, unhighlightTeam: () => {
      r("unhighlight-team");
    }, updateTeam: () => {
      const d = e.availableTeams.find(
        (y) => y.name === n.value
      );
      console.log("Updating team:", {
        selectedTeam: n.value,
        selectedTeamData: d
      }), r("update:team", {
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
      return w;
    } };
    return Object.defineProperty(u, "__isScriptSetup", { enumerable: !1, value: !0 }), u;
  }
}, le = {
  key: 0,
  class: "flex items-center gap-2"
}, ce = ["src", "alt"], de = ["value", "disabled"], ue = {
  key: 1,
  class: "flex items-center gap-2"
}, me = ["src", "alt"], he = { class: "text-gray-900 dark:text-white" };
function ge(i, a, t, e, r, n) {
  return f(), p(
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
      t.canEdit && t.permissions[e.PERMISSIONS.CAN_SELECT_TEAM] ? (f(), p("div", le, [
        e.selectedTeamLogo ? (f(), p("img", {
          key: 0,
          src: e.selectedTeamLogo,
          alt: e.selectedTeam,
          class: "w-6 h-6 rounded-full"
        }, null, 8, ce)) : q("v-if", !0),
        J(h(
          "select",
          {
            "onUpdate:modelValue": a[0] || (a[0] = (s) => e.selectedTeam = s),
            class: "form-input max-w-sm block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
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
            (f(!0), p(
              U,
              null,
              W(e.availableTeamsForSelection, (s) => (f(), p("option", {
                key: s.id,
                value: s.name,
                disabled: e.isTeamSelected(s.name)
              }, B(s.name), 9, de))),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [se, e.selectedTeam]
        ])
      ])) : (f(), p("div", ue, [
        t.team.logo ? (f(), p("img", {
          key: 0,
          src: t.team.logo,
          alt: t.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, me)) : q("v-if", !0),
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
const fe = /* @__PURE__ */ C(oe, [["render", ge], ["__file", "/app/src/components/team/TeamSelect.vue"]]), _e = {
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
    const e = i, r = t, n = D(!1), s = D(e.team.score ?? 0), o = () => {
      e.canEditScore && (n.value = !0);
    }, c = () => {
      const l = parseInt(s.value) || 0;
      r("update:score", {
        position: e.teamPosition,
        score: l
      });
    };
    M(
      () => e.team,
      (l) => {
        s.value = l.score ?? 0;
      },
      { deep: !0 }
    );
    const _ = { props: e, emit: r, isEditing: n, score: s, selectScore: o, updateScore: c, ref: D, watch: M };
    return Object.defineProperty(_, "__isScriptSetup", { enumerable: !1, value: !0 }), _;
  }
}, Te = {
  key: 1,
  class: "text-white"
};
function be(i, a, t, e, r, n) {
  return f(), p(
    "div",
    {
      class: H(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", {
        "border-b border-orange-600 dark:border-orange-700": t.isFirstTeam
      }]),
      onClick: e.selectScore
    },
    [
      e.isEditing ? J((f(), p(
        "input",
        {
          key: 0,
          "onUpdate:modelValue": a[0] || (a[0] = (s) => e.score = s),
          type: "number",
          class: "form-input",
          required: "",
          min: "0",
          onChange: e.updateScore,
          onBlur: a[1] || (a[1] = (s) => e.isEditing = !1)
        },
        null,
        544
        /* NEED_HYDRATION, NEED_PATCH */
      )), [
        [Z, e.score]
      ]) : (f(), p(
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
const pe = /* @__PURE__ */ C(_e, [["render", be], ["__file", "/app/src/components/team/TeamScoreInput.vue"]]), ye = {
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
        [w.CAN_SELECT_TEAM]: !0,
        [w.CAN_EDIT_SCOPE]: !0
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
    const e = { props: i, TeamSelect: fe, TeamScoreInput: pe, get PERMISSIONS() {
      return w;
    } };
    return Object.defineProperty(e, "__isScriptSetup", { enumerable: !1, value: !0 }), e;
  }
}, ve = { class: "flex" };
function Se(i, a, t, e, r, n) {
  return f(), p("div", ve, [
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
      "onUpdate:team": a[0] || (a[0] = (s) => i.$emit("update:team", s)),
      onHighlightTeam: a[1] || (a[1] = (s) => i.$emit("highlight-team", s)),
      onUnhighlightTeam: a[2] || (a[2] = (s) => i.$emit("unhighlight-team"))
    }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "highlighted-team", "permissions", "can-edit", "is-winner", "is-loser", "should-highlight", "is-first-team"]),
    L(e.TeamScoreInput, {
      team: t.team,
      "team-position": t.teamPosition,
      "can-edit-score": t.canEditScore,
      "is-first-team": t.isFirstTeam,
      "onUpdate:score": a[3] || (a[3] = (s) => i.$emit("update:score", s))
    }, null, 8, ["team", "team-position", "can-edit-score", "is-first-team"])
  ]);
}
const we = /* @__PURE__ */ C(ye, [["render", Se], ["__file", "/app/src/components/team/TeamRow.vue"]]), Ee = {
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
        [w.CAN_SELECT_TEAM]: !0,
        [w.CAN_EDIT_DATE]: !0,
        [w.CAN_EDIT_SCOPE]: !0
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
    const e = i, r = t, n = A(() => e.roundIndex === 0 && e.permissions[w.CAN_SELECT_TEAM]), s = A(() => e.match[O.ONE].name !== k && e.match[O.TWO].name !== k && e.permissions[w.CAN_EDIT_SCOPE]), I = { props: e, emit: r, canEdit: n, canEditScore: s, isWinner: (g) => e.match.winner === g, isLoser: (g) => e.match.winner && e.match.winner !== g, shouldHighlight: (g) => {
      const b = e.match[g].name;
      return e.highlightedTeam === b;
    }, highlightTeam: (g) => {
      r("highlight-team", g);
    }, unhighlightTeam: () => {
      r("unhighlight-team");
    }, updateTeam: ({ position: g, team: b }) => {
      const N = {
        ...e.match,
        [g]: b
      };
      r("update:match", N);
    }, updateScore: ({ position: g, score: b }) => {
      const N = {
        ...e.match,
        [g]: {
          ...e.match[g],
          score: b
        }
      }, S = N[O.ONE].score, E = N[O.TWO].score;
      S > E && (N.winner = O.ONE), E > S && (N.winner = O.TWO), S === E && (N.winner = null), r("update:match", N);
    }, formatDateTimeForInput: (g) => g ? new Date(g).toISOString().slice(0, 16) : "", updateDate: (g) => {
      const b = {
        ...e.match,
        date: g.target.value
      };
      r("update:match", b);
    }, formatDate: (g) => g ? new Date(g).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }) : "", onMatchClick: (g) => {
      const b = g.target.tagName.toLowerCase();
      b === "input" || b === "select" || b === "option" || b === "button" || g.target.closest("input,select,option,button") || !(!e.permissions[w.CAN_SELECT_TEAM] && !e.permissions[w.CAN_EDIT_DATE] && !e.permissions[w.CAN_EDIT_SCOPE]) || r("click-match", {
        match: e.match,
        roundIndex: e.roundIndex,
        matchIndex: e.index,
        id: e.match.id ?? null
      });
    }, computed: A, TeamRow: we, get TBD() {
      return k;
    }, get TEAM_POSITION() {
      return O;
    }, get PERMISSIONS() {
      return w;
    } };
    return Object.defineProperty(I, "__isScriptSetup", { enumerable: !1, value: !0 }), I;
  }
}, Oe = { class: "flex flex-col w-full" }, ke = { class: "px-3 py-1 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center" }, xe = ["value", "disabled"], Ne = {
  key: 0,
  class: "absolute top-1/2 left-full w-2.5 h-[calc(100%+10px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[-10px] ml-[15px] mx-2 transition-colors duration-200"
};
function Be(i, a, t, e, r, n) {
  return f(), p(
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
            class: "form-input ml-[15px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            disabled: !t.permissions[e.PERMISSIONS.CAN_EDIT_DATE],
            onInput: e.updateDate
          }, null, 40, xe)
        ]),
        h("div", {
          class: "my-1.5 ml-2.5 bg-white rounded overflow-hidden w-full min-w-[200px] shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10",
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
      t.index % 2 == 0 && t.totalMatches > 1 ? (f(), p("div", Ne, a[0] || (a[0] = [
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
const Ie = /* @__PURE__ */ C(Ee, [["render", Be], ["__file", "/app/src/components/bracket/BracketMatch.vue"]]), De = {
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
        [w.CAN_SELECT_TEAM]: !0
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
    const e = i, r = t, o = { props: e, emit: r, updateMatch: (c, _) => {
      r("update:match", e.columnIndex, c, _);
    }, onClickMatch: (c, _) => {
      r("click-match", {
        ..._,
        roundIndex: e.columnIndex,
        matchIndex: c
      });
    }, BracketMatch: Ie, get PERMISSIONS() {
      return w;
    } };
    return Object.defineProperty(o, "__isScriptSetup", { enumerable: !1, value: !0 }), o;
  }
}, Ae = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, Me = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50 mt-[23px]" };
function Ce(i, a, t, e, r, n) {
  return f(), p("div", Ae, [
    (f(!0), p(
      U,
      null,
      W(t.column.matches, (s, o) => (f(), p(
        U,
        {
          key: s.id
        },
        [
          h(
            "div",
            Me,
            B(s.number),
            1
            /* TEXT */
          ),
          L(e.BracketMatch, {
            match: s,
            index: o,
            "total-matches": t.column.matches.length,
            "round-index": t.columnIndex,
            "available-teams": t.availableTeams,
            "selected-teams": t.selectedTeams,
            "highlighted-team": t.highlightedTeam,
            permissions: t.permissions,
            "onUpdate:match": (c) => e.updateMatch(o, c),
            onHighlightTeam: a[0] || (a[0] = (c) => i.$emit("highlight-team", c)),
            onUnhighlightTeam: a[1] || (a[1] = (c) => i.$emit("unhighlight-team")),
            onClickMatch: (c) => e.onClickMatch(o, c)
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
    const e = i, r = t, n = [1, 3, 5, 7, 9], s = D(e.columns.map((l) => l.name));
    M(
      () => e.columns,
      (l) => {
        s.value = l.map((m) => m.name);
      },
      { deep: !0 }
    );
    const _ = { props: e, emit: r, bestOfValues: n, localColumnNames: s, updateColumnName: (l, m) => {
      s.value[l] = m;
      const u = [...e.columns];
      u[l] = {
        ...u[l],
        name: m
      }, r("update:columns", u);
    }, updateColumnBestOf: (l, m) => {
      const u = [...e.columns];
      u[l] = {
        ...u[l],
        bestOf: Number(m)
      }, r("update:columns", u);
    }, ref: D, watch: M, get PERMISSIONS() {
      return w;
    } };
    return Object.defineProperty(_, "__isScriptSetup", { enumerable: !1, value: !0 }), _;
  }
}, Ue = { class: "flex justify-between px-5" }, qe = { class: "flex flex-col items-center gap-2" }, We = { class: "mt-2" }, je = { class: "flex items-center rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600" }, Pe = { class: "join" }, Re = ["onUpdate:modelValue", "disabled", "onBlur"], He = ["value", "disabled", "onChange"], Fe = ["value"];
function ze(i, a, t, e, r, n) {
  return f(), p("div", Ue, [
    (f(!0), p(
      U,
      null,
      W(t.columns, (s, o) => (f(), p("div", {
        key: s.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
      }, [
        h("div", qe, [
          h("div", We, [
            h("div", je, [
              h("div", Pe, [
                J(h("input", {
                  "onUpdate:modelValue": (c) => e.localColumnNames[o] = c,
                  disabled: !t.permissions[e.PERMISSIONS.CAN_EDIT_ROUND_NAME],
                  type: "text",
                  class: "input rounded-md border-transparent focus:border-gray-500 focus:bg-white join-item text-sm text-gray-700 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                  onBlur: (c) => e.updateColumnName(o, c.target.value)
                }, null, 40, Re), [
                  [Z, e.localColumnNames[o]]
                ]),
                h("select", {
                  value: s.bestOf,
                  disabled: !t.permissions[e.PERMISSIONS.CAN_EDIT_BEST_OF],
                  class: "select rounded-md border-transparent focus:border-gray-500 focus:bg-white join-item text-sm text-gray-700 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                  onChange: (c) => e.updateColumnBestOf(o, c.target.value)
                }, [
                  (f(), p(
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
function Xe(i, a, t, e, r, n) {
  return f(), p(
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
              (f(!0), p(
                U,
                null,
                W(t.columns, (s, o) => (f(), $(e.BracketColumn, {
                  key: s.id,
                  column: s,
                  "column-index": o,
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
const Et = (i, a = 3) => {
  const t = Math.log2(i);
  let e = 1;
  return Array.from({ length: t }, (r, n) => {
    const s = Math.pow(2, t - n - 1), o = ne(
      s,
      () => ae(e++)
    );
    return {
      id: `upper-round-${n + 1}`,
      name: `Round ${n + 1}`,
      matches: o,
      bestOf: a
    };
  });
}, z = (i, a) => {
  const t = i - 1;
  let e = 1;
  return Array.from({ length: t }, (r, n) => {
    const s = Math.pow(2, i - n - 2), o = ne(
      s,
      () => ae(e++)
    );
    return {
      id: `lower-round-${n + 1}`,
      name: `Lower Round ${n + 1}`,
      matches: o,
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
}, rt = {
  scope: "row",
  class: "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
}, st = { class: "px-6 py-4" }, ot = { class: "px-6 py-4" }, lt = { class: "px-6 py-4" }, ct = {
  key: 0,
  class: "px-6 py-4"
}, dt = { class: "px-6 py-4" };
function ut(i, a, t, e, r, n) {
  return f(), p("div", et, [
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
            t.format === t.tournamentFormat.SWISS ? (f(), p("th", it, " Buchholz ")) : q("v-if", !0),
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
          (f(!0), p(
            U,
            null,
            W(t.standings, (s) => (f(), p("tr", {
              key: s.id,
              class: "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            }, [
              h(
                "th",
                rt,
                B(s.place),
                1
                /* TEXT */
              ),
              h(
                "td",
                st,
                B(s.name),
                1
                /* TEXT */
              ),
              h(
                "td",
                ot,
                B(s.wins) + "-" + B(s.losses) + "-" + B(s.ties),
                1
                /* TEXT */
              ),
              h(
                "td",
                lt,
                B(s.score),
                1
                /* TEXT */
              ),
              t.format === t.tournamentFormat.SWISS ? (f(), p(
                "td",
                ct,
                B(s.buchholz),
                1
                /* TEXT */
              )) : q("v-if", !0),
              h(
                "td",
                dt,
                B(s.ptsDiff),
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
const mt = /* @__PURE__ */ C($e, [["render", ut], ["__file", "/app/src/components/StandingsTable.vue"]]);
function ht(i) {
  const a = {}, t = {};
  i.forEach((r) => {
    r.matches.forEach((n) => {
      if (["teamOne", "teamTwo"].forEach((s) => {
        const o = n[s];
        o && (a[o.id] || (a[o.id] = {
          ...o,
          wins: 0,
          losses: 0,
          ties: 0,
          score: 0,
          ptsDiff: 0,
          buchholz: 0
        }), t[o.id] || (t[o.id] = []));
      }), n.teamOne && n.teamTwo) {
        const s = n.teamOne, o = n.teamTwo, c = s.score || 0, _ = o.score || 0;
        n.winner === "teamOne" ? (a[s.id].wins++, a[s.id].score += 1, a[o.id].losses++) : n.winner === "teamTwo" ? (a[o.id].wins++, a[o.id].score += 1, a[s.id].losses++) : n.winner === null && (c > 0 || _ > 0) && (a[s.id].ties++, a[o.id].ties++, a[s.id].score += 0.5, a[o.id].score += 0.5), a[s.id].ptsDiff += c - _, a[o.id].ptsDiff += _ - c, t[s.id].push(o.id), t[o.id].push(s.id);
      } else n.teamOne && !n.teamTwo ? (a[n.teamOne.id].wins++, a[n.teamOne.id].score += 1) : !n.teamOne && n.teamTwo && (a[n.teamTwo.id].wins++, a[n.teamTwo.id].score += 1);
    });
  }), Object.values(a).forEach((r) => {
    r.buchholz = (t[r.id] || []).reduce(
      (n, s) => {
        var o;
        return n + (((o = a[s]) == null ? void 0 : o.score) || 0);
      },
      0
    );
  });
  const e = Object.values(a).sort(
    (r, n) => n.score - r.score || n.wins - r.wins || n.buchholz - r.buchholz || n.ptsDiff - r.ptsDiff
  );
  return e.forEach((r, n) => {
    r.place = n + 1;
  }), e;
}
function F(i, a) {
  return i.filter((t) => !!t.id && t.name !== a);
}
function V(i, a, t, e, r, n) {
  const s = a.score || 0, o = t.score || 0;
  e === r ? (i[a.id].wins++, i[a.id].score += 1, i[t.id].losses++) : e === n ? (i[t.id].wins++, i[t.id].score += 1, i[a.id].losses++) : e === null && (s > 0 || o > 0) && (i[a.id].ties++, i[t.id].ties++, i[a.id].score += 0.5, i[t.id].score += 0.5), i[a.id].ptsDiff += s - o, i[t.id].ptsDiff += o - s;
}
function K({
  upperColumns: i,
  lowerColumns: a,
  format: t,
  TOURNAMENT_FORMAT: e,
  TEAM_POSITION: r,
  TBD: n
}) {
  switch (t) {
    case e.SWISS:
      return F(gt(i), n);
    case e.ROUND_ROBIN:
      return F(
        ft(i, r),
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
          r
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
    for (const r of e.matches) {
      for (const o of [a.ONE, a.TWO]) {
        const c = r[o];
        !c || !c.id || t[c.id] || (t[c.id] = {
          ...c,
          wins: 0,
          losses: 0,
          ties: 0,
          score: 0,
          ptsDiff: 0
        });
      }
      const n = r[a.ONE], s = r[a.TWO];
      n && s && n.id && s.id && V(
        t,
        n,
        s,
        r.winner,
        a.ONE,
        a.TWO
      );
    }
  return ie(t, ["score", "wins", "ptsDiff"]);
}
function _t(i, a, t, e, r) {
  const n = {};
  for (const s of i)
    for (const o of s.matches) {
      for (const l of [r.ONE, r.TWO]) {
        const m = o[l];
        !m || !m.id || n[m.id] || (n[m.id] = {
          ...m,
          wins: 0,
          losses: 0,
          ties: 0,
          score: 0,
          ptsDiff: 0
        });
      }
      const c = o[r.ONE], _ = o[r.TWO];
      c && _ && c.id && _.id && V(
        n,
        c,
        _,
        o.winner,
        r.ONE,
        r.TWO
      );
    }
  if (t === e.DOUBLE_ELIMINATION && a)
    for (const s of a)
      for (const o of s.matches) {
        for (const l of [r.ONE, r.TWO]) {
          const m = o[l];
          !m || !m.id || n[m.id] || (n[m.id] = {
            ...m,
            wins: 0,
            losses: 0,
            ties: 0,
            score: 0,
            ptsDiff: 0
          });
        }
        const c = o[r.ONE], _ = o[r.TWO];
        c && _ && c.id && _.id && V(
          n,
          c,
          _,
          o.winner,
          r.ONE,
          r.TWO
        );
      }
  return ie(n, ["score", "wins", "ptsDiff"]);
}
function ie(i, a) {
  const t = Object.values(i).sort((e, r) => {
    for (const n of a)
      if (r[n] !== e[n]) return r[n] - e[n];
    return 0;
  });
  return t.forEach((e, r) => {
    e.place = r + 1;
  }), t;
}
function Tt(i, a = []) {
  const t = {};
  i.forEach((l) => {
    t[l.score] || (t[l.score] = []), t[l.score].push(l);
  });
  const e = Object.keys(t).map(Number).sort((l, m) => m - l), r = [], n = /* @__PURE__ */ new Set(), s = i.map((l) => l.id), o = new Set(a.map(([l, m]) => `${l}-${m}`));
  function c(l) {
    const m = [], u = /* @__PURE__ */ new Set();
    for (let d = 0; d < l.length; d++) {
      if (u.has(l[d].id)) continue;
      let y = !1;
      for (let T = d + 1; T < l.length; T++)
        if (!u.has(l[T].id) && !o.has(`${l[d].id}-${l[T].id}`) && !o.has(`${l[T].id}-${l[d].id}`)) {
          m.push([l[d], l[T]]), u.add(l[d].id), u.add(l[T].id), n.add(l[d].id), n.add(l[T].id), y = !0;
          break;
        }
      if (!y) {
        for (let T of e)
          if (T !== l[d].score) {
            for (let v of t[T] || [])
              if (!n.has(v.id) && !o.has(`${l[d].id}-${v.id}`) && !o.has(`${v.id}-${l[d].id}`))
                return m.push([l[d], v]), u.add(l[d].id), u.add(v.id), n.add(l[d].id), n.add(v.id), m;
          }
      }
    }
    return m;
  }
  for (let l of e) {
    const m = t[l].filter((y) => !n.has(y.id)), u = c(m);
    r.push(...u);
    const d = m.filter((y) => !n.has(y.id));
    if (d.length === 1) {
      let y = !1;
      for (let T of e)
        if (T !== l) {
          for (let v of t[T] || [])
            if (!n.has(v.id) && !o.has(`${d[0].id}-${v.id}`) && !o.has(`${v.id}-${d[0].id}`)) {
              r.push([d[0], v]), n.add(d[0].id), n.add(v.id), y = !0;
              break;
            }
          if (y) break;
        }
      y || (r.push([d[0], null]), n.add(d[0].id));
    }
  }
  const _ = s.filter((l) => !n.has(l));
  for (let l of _) {
    const m = i.find((u) => u.id === l);
    r.push([m, null]);
  }
  return r;
}
function Y({
  upperColumns: i,
  lowerColumns: a,
  props: t,
  emit: e,
  TOURNAMENT_FORMAT: r,
  TEAM_POSITION: n,
  TBD: s
}) {
  function o(u, d, y) {
    if (i.value[u] && i.value[u].matches) {
      if (i.value[u].matches[d] = y, y.winner && u < i.value.length - 1) {
        const T = u + 1, v = Math.floor(d / 2);
        if (i.value[T] && i.value[T].matches[v]) {
          const x = i.value[T].matches[v], I = d % 2 === 0 ? n.ONE : n.TWO, g = y[y.winner];
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
      if (t.format === r.DOUBLE_ELIMINATION && y.winner) {
        const T = y[y.winner === n.ONE ? n.TWO : n.ONE];
        if (T.name !== s) {
          const v = Math.floor(u / 2), x = Math.floor(d / 2);
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
    if (t.format === r.SWISS && i.value[u].matches.every((x) => x.winner) && u < i.value.length - 1) {
      const x = {};
      for (let S = 0; S <= u; S++)
        i.value[S].matches.forEach((E) => {
          ["teamOne", "teamTwo"].forEach((re) => {
            const P = E[re];
            P && (x[P.id] || (x[P.id] = { ...P, score: 0 }));
          }), E.winner && E.teamOne && E.teamTwo && (E.winner === "teamOne" && (x[E.teamOne.id].score += 1), E.winner === "teamTwo" && (x[E.teamTwo.id].score += 1));
        });
      const I = [];
      for (let S = 0; S <= u; S++)
        i.value[S].matches.forEach((E) => {
          E.teamOne && E.teamTwo && I.push([E.teamOne.id, E.teamTwo.id]);
        });
      const g = Object.values(x), b = Tt(g, I), N = i.value[u + 1];
      N.matches = b.map((S, E) => ({
        id: `swiss-match-${u + 2}-${E + 1}`,
        number: E + 1,
        teamOne: S[0],
        teamTwo: S[1],
        winner: null,
        date: null
      }));
    }
  }
  function c(u) {
    i.value = u, l();
  }
  function _(u) {
    a.value = u, l();
  }
  function l() {
    e("update:state", {
      upper: i.value,
      lower: t.format === r.DOUBLE_ELIMINATION ? a.value : null
    });
  }
  function m() {
    if (t.initialState) {
      if (Array.isArray(t.initialState)) {
        if (i.value = JSON.parse(JSON.stringify(t.initialState)), t.format === r.DOUBLE_ELIMINATION) {
          a.value = z(
            i.value.length,
            t.defaultBestOf
          );
          return;
        }
        if (t.format === r.SWISS) {
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
    updateUpperMatch: o,
    updateUpperColumns: c,
    updateLowerState: _,
    emitTournamentState: l,
    initializeTournament: m
  };
}
class bt {
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
class X extends bt {
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
    const r = this._getAll(), n = r[a];
    if (!n) throw new Error("Tournament not found");
    let s = !1;
    for (const o of n.rounds)
      for (let c = 0; c < o.matches.length; c++)
        o.matches[c].id === t && (o.matches[c] = { ...o.matches[c], ...e }, s = !0);
    if (!s) throw new Error("Match not found");
    r[a] = n, this._setAll(r);
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
const pt = {
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
        [w.CAN_SELECT_TEAM]: !0,
        [w.CAN_EDIT_ROUND_NAME]: !0,
        [w.CAN_EDIT_BEST_OF]: !0
      })
    }
  },
  emits: ["update:state", "click-match"],
  setup(i, { expose: a, emit: t }) {
    a();
    const e = t, r = i, n = D([]), s = D([]), o = D(null), c = A(() => {
      const b = /* @__PURE__ */ new Set();
      return n.value.forEach((N) => {
        N.matches.forEach((S) => {
          S[O.ONE].name !== k && b.add(S[O.ONE].name), S[O.TWO].name !== k && b.add(S[O.TWO].name);
        });
      }), r.format === j.DOUBLE_ELIMINATION && s.value.forEach((N) => {
        N.matches.forEach((S) => {
          S[O.ONE].name !== k && b.add(S[O.ONE].name), S[O.TWO].name !== k && b.add(S[O.TWO].name);
        });
      }), Array.from(b);
    }), _ = A(() => K({
      upperColumns: n.value,
      lowerColumns: s.value,
      format: r.format,
      TOURNAMENT_FORMAT: j,
      TEAM_POSITION: O,
      TBD: k
    })), l = (b) => {
      o.value = b;
    }, m = () => {
      o.value = null;
    }, u = (b) => {
      e("click-match", b);
    }, d = new X(), {
      updateUpperMatch: y,
      updateUpperColumns: T,
      updateLowerState: v,
      emitTournamentState: x,
      initializeTournament: I
    } = Y({
      upperColumns: n,
      lowerColumns: s,
      props: r,
      emit: e,
      TOURNAMENT_FORMAT: j,
      TEAM_POSITION: O,
      TBD: k
    });
    M(
      () => r.initialState,
      () => {
        I();
      },
      { deep: !0 }
    ), M(
      () => r.format,
      (b) => {
        b === j.DOUBLE_ELIMINATION && (!s.value || s.value.length === 0) && (s.value = z(
          n.value.length,
          r.defaultBestOf
        ), x());
      }
    ), R(() => {
      I();
    });
    const g = { emit: e, props: r, upperColumns: n, lowerColumns: s, highlightedTeam: o, selectedTeams: c, standingsData: _, highlightTeam: l, unhighlightTeam: m, onMatchClick: u, storage: d, updateUpperMatch: y, updateUpperColumns: T, updateLowerState: v, emitTournamentState: x, initializeTournament: I, ref: D, onMounted: R, watch: M, computed: A, BracketColumn: ee, BracketRoundHeaders: te, BracketSection: Ze, get createLowerBracketStructure() {
      return z;
    }, get TOURNAMENT_FORMAT() {
      return j;
    }, get TBD() {
      return k;
    }, get TEAM_POSITION() {
      return O;
    }, get PERMISSIONS() {
      return w;
    }, StandingsTable: mt, get useStandings() {
      return K;
    }, get useBracket() {
      return Y;
    }, get LocalStorageTournament() {
      return X;
    } };
    return Object.defineProperty(g, "__isScriptSetup", { enumerable: !1, value: !0 }), g;
  }
}, yt = { class: "flex flex-col" };
function vt(i, a, t, e, r, n) {
  return f(), p("div", yt, [
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
const St = /* @__PURE__ */ C(pt, [["render", vt], ["__file", "/app/src/components/TournamentBracket.vue"]]), Ot = (i) => {
  i.component("TournamentBracket", St);
};
export {
  w as PERMISSIONS,
  St as TournamentBracket,
  z as createLowerBracketStructure,
  Et as createTournamentState,
  Ot as install
};
