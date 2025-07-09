import { ref as L, computed as U, watch as I, onMounted as G, createElementBlock as p, openBlock as y, normalizeClass as H, unref as O, createCommentVNode as W, withDirectives as V, createElementVNode as v, Fragment as q, renderList as A, toDisplayString as $, vModelSelect as ae, vModelText as K, createVNode as D, createBlock as Q } from "vue";
const C = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination",
  SWISS: "swiss",
  ROUND_ROBIN: "round_robin"
}, N = "TBD", T = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, S = {
  CAN_SELECT_TEAM: "can_select_team",
  CAN_EDIT_DATE: "can_edit_date",
  CAN_EDIT_SCOPE: "can_edit_scope",
  CAN_EDIT_ROUND_NAME: "can_edit_round_name",
  CAN_EDIT_BEST_OF: "can_edit_best_of"
}, ie = {
  key: 0,
  class: "flex items-center gap-2"
}, ne = ["src", "alt"], se = ["value", "disabled"], oe = {
  key: 1,
  class: "flex items-center gap-2"
}, le = ["src", "alt"], re = { class: "text-gray-900 dark:text-white" }, ce = {
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
        [S.CAN_SELECT_TEAM]: !0
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
  setup(e, { emit: i }) {
    const t = e, s = i, n = L(t.team.name), a = U(() => {
      var r;
      return n.value === N ? null : ((r = t.availableTeams.find((d) => d.name === n.value)) == null ? void 0 : r.logo) || null;
    });
    I(
      () => t.team,
      (r) => {
        n.value = r.name;
      },
      { immediate: !0 }
    ), G(() => {
      console.log("TeamSelect mounted:", {
        team: t.team,
        availableTeams: t.availableTeams
      });
    });
    const c = (r) => r === N ? !1 : t.selectedTeams.includes(r) && r !== t.team.name || r === t.team.name && t.team.name !== N, l = U(() => t.availableTeams ? t.availableTeams.filter((r) => r.name === N || r.name === t.team.name ? !0 : !c(r.name)) : []), u = () => {
      t.team.name !== N && s("highlight-team", t.team.name);
    }, f = () => {
      s("unhighlight-team");
    }, o = () => {
      const r = t.availableTeams.find(
        (d) => d.name === n.value
      );
      console.log("Updating team:", {
        selectedTeam: n.value,
        selectedTeamData: r
      }), s("update:team", {
        position: t.teamPosition,
        team: {
          id: (r == null ? void 0 : r.id) || null,
          name: n.value,
          logo: (r == null ? void 0 : r.logo) || null,
          score: 0
        }
      });
    };
    return (r, d) => (y(), p("div", {
      class: H(["flex-grow p-2.5 hover:bg-gray-200/30 dark:hover:bg-gray-950/20", {
        "hover:bg-green-500/20 dark:hover:bg-green-500/20": e.isWinner,
        "hover:bg-red-500/20 dark:hover:bg-red-500/20": e.isLoser,
        "bg-green-500/20 dark:bg-green-500/20": e.shouldHighlight && e.isWinner,
        "bg-red-500/20 dark:bg-red-500/20": e.shouldHighlight && e.isLoser
      }]),
      onMouseenter: u,
      onMouseleave: f
    }, [
      e.canEdit && e.permissions[O(S).CAN_SELECT_TEAM] ? (y(), p("div", ie, [
        a.value ? (y(), p("img", {
          key: 0,
          src: a.value,
          alt: n.value,
          class: "w-6 h-6 rounded-full"
        }, null, 8, ne)) : W("", !0),
        V(v("select", {
          "onUpdate:modelValue": d[0] || (d[0] = (g) => n.value = g),
          class: "select select-ghost w-full select-xs",
          onChange: o
        }, [
          d[1] || (d[1] = v("option", { value: "TBD" }, "TBD", -1)),
          (y(!0), p(q, null, A(l.value, (g) => (y(), p("option", {
            key: g.id,
            value: g.name,
            disabled: c(g.name)
          }, $(g.name), 9, se))), 128))
        ], 544), [
          [ae, n.value]
        ])
      ])) : (y(), p("div", oe, [
        e.team.logo ? (y(), p("img", {
          key: 0,
          src: e.team.logo,
          alt: e.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, le)) : W("", !0),
        v("span", re, $(e.team.name), 1)
      ]))
    ], 34));
  }
}, de = {
  key: 1,
  class: "text-white"
}, ue = {
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
  setup(e, { emit: i }) {
    const t = e, s = i, n = L(!1), a = L(t.team.score ?? 0), c = () => {
      t.canEditScore && (n.value = !0);
    }, l = () => {
      const u = parseInt(a.value) || 0;
      s("update:score", {
        position: t.teamPosition,
        score: u
      });
    };
    return I(
      () => t.team,
      (u) => {
        a.value = u.score ?? 0;
      },
      { deep: !0 }
    ), (u, f) => (y(), p("div", {
      class: H(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", {
        "border-b border-orange-600 dark:border-orange-700": e.isFirstTeam
      }]),
      onClick: c
    }, [
      n.value ? V((y(), p("input", {
        key: 0,
        "onUpdate:modelValue": f[0] || (f[0] = (o) => a.value = o),
        type: "number",
        class: "input input-xs",
        required: "",
        min: "0",
        onChange: l,
        onBlur: f[1] || (f[1] = (o) => n.value = !1)
      }, null, 544)), [
        [K, a.value]
      ]) : (y(), p("span", de, $(e.team.score), 1))
    ], 2));
  }
}, me = { class: "flex" }, R = {
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
        [S.CAN_SELECT_TEAM]: !0,
        [S.CAN_EDIT_SCOPE]: !0
      })
    }
  },
  emits: [
    "update:team",
    "update:score",
    "highlight-team",
    "unhighlight-team"
  ],
  setup(e) {
    return (i, t) => (y(), p("div", me, [
      D(ce, {
        team: e.team,
        "team-position": e.teamPosition,
        "available-teams": e.availableTeams,
        "selected-teams": e.selectedTeams,
        "highlighted-team": e.highlightedTeam,
        permissions: e.permissions,
        "can-edit": e.canEdit,
        "is-winner": e.isWinner,
        "is-loser": e.isLoser,
        "should-highlight": e.shouldHighlight,
        "is-first-team": e.isFirstTeam,
        "onUpdate:team": t[0] || (t[0] = (s) => i.$emit("update:team", s)),
        onHighlightTeam: t[1] || (t[1] = (s) => i.$emit("highlight-team", s)),
        onUnhighlightTeam: t[2] || (t[2] = (s) => i.$emit("unhighlight-team"))
      }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "highlighted-team", "permissions", "can-edit", "is-winner", "is-loser", "should-highlight", "is-first-team"]),
      D(ue, {
        team: e.team,
        "team-position": e.teamPosition,
        "can-edit-score": e.canEditScore,
        "is-first-team": e.isFirstTeam,
        "onUpdate:score": t[3] || (t[3] = (s) => i.$emit("update:score", s))
      }, null, 8, ["team", "team-position", "can-edit-score", "is-first-team"])
    ]));
  }
}, he = { class: "flex flex-col w-full" }, fe = { class: "px-3 py-1 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center" }, ge = ["value", "disabled"], ve = {
  key: 0,
  class: "absolute top-1/2 left-full w-2.5 h-[calc(100%+10px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[-10px] ml-[15px] mx-2 transition-colors duration-200"
}, ye = {
  __name: "BracketMatch",
  props: {
    match: {
      type: Object,
      default: () => ({
        teamOne: { name: N, score: 0 },
        teamTwo: { name: N, score: 0 },
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
        [S.CAN_SELECT_TEAM]: !0,
        [S.CAN_EDIT_DATE]: !0,
        [S.CAN_EDIT_SCOPE]: !0
      })
    }
  },
  emits: [
    "update:match",
    "highlight-team",
    "unhighlight-team",
    "click-match"
  ],
  setup(e, { emit: i }) {
    const t = e, s = i, n = U(() => t.roundIndex === 0 && t.permissions[S.CAN_SELECT_TEAM]), a = U(() => t.match[T.ONE].name !== N && t.match[T.TWO].name !== N && t.permissions[S.CAN_EDIT_SCOPE]), c = (m) => t.match.winner === m, l = (m) => t.match.winner && t.match.winner !== m, u = (m) => {
      const h = t.match[m].name;
      return t.highlightedTeam === h;
    }, f = (m) => {
      s("highlight-team", m);
    }, o = () => {
      s("unhighlight-team");
    }, r = ({ position: m, team: h }) => {
      const E = {
        ...t.match,
        [m]: h
      };
      s("update:match", E);
    }, d = ({ position: m, score: h }) => {
      const E = {
        ...t.match,
        [m]: {
          ...t.match[m],
          score: h
        }
      }, x = E[T.ONE].score, j = E[T.TWO].score;
      x > j && (E.winner = T.ONE), j > x && (E.winner = T.TWO), x === j && (E.winner = null), s("update:match", E);
    }, g = (m) => m ? new Date(m).toISOString().slice(0, 16) : "", w = (m) => {
      const h = {
        ...t.match,
        date: m.target.value
      };
      s("update:match", h);
    }, b = (m) => {
      const h = m.target.tagName.toLowerCase();
      h === "input" || h === "select" || h === "option" || h === "button" || m.target.closest("input,select,option,button") || !(!t.permissions[S.CAN_SELECT_TEAM] && !t.permissions[S.CAN_EDIT_DATE] && !t.permissions[S.CAN_EDIT_SCOPE]) || s("click-match", {
        match: t.match,
        roundIndex: t.roundIndex,
        matchIndex: t.index,
        id: t.match.id ?? null
      });
    };
    return (m, h) => (y(), p("div", {
      class: H(["relative text-[0.8em] flex items-center", { group: e.index % 2 == 0 && e.totalMatches > 1 }])
    }, [
      v("div", he, [
        v("div", fe, [
          v("input", {
            type: "datetime-local",
            value: g(e.match.date),
            class: "input input-ghost input-sm",
            disabled: !e.permissions[O(S).CAN_EDIT_DATE],
            onInput: w
          }, null, 40, ge)
        ]),
        v("div", {
          class: "my-1.5 ml-2.5 bg-white dark:bg-gray-900 rounded overflow-hidden w-full min-w-[200px] shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10",
          onClick: b
        }, [
          D(R, {
            team: e.match.teamOne,
            "team-position": O(T).ONE,
            "available-teams": e.availableTeams,
            "selected-teams": e.selectedTeams,
            "can-edit": n.value,
            "can-edit-score": a.value,
            "is-winner": c(O(T).ONE),
            "is-loser": l(O(T).ONE),
            "should-highlight": u(O(T).ONE),
            "is-first-team": !0,
            "can-select-team": m.canSelectTeam,
            "highlighted-team": e.highlightedTeam,
            permissions: e.permissions,
            "onUpdate:team": r,
            "onUpdate:score": d,
            onHighlightTeam: f,
            onUnhighlightTeam: o
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"]),
          D(R, {
            team: e.match.teamTwo,
            "team-position": O(T).TWO,
            "available-teams": e.availableTeams,
            "selected-teams": e.selectedTeams,
            "can-edit": n.value,
            "can-edit-score": a.value,
            "is-winner": c(O(T).TWO),
            "is-loser": l(O(T).TWO),
            "should-highlight": u(O(T).TWO),
            "can-select-team": m.canSelectTeam,
            "highlighted-team": e.highlightedTeam,
            permissions: e.permissions,
            "onUpdate:team": r,
            "onUpdate:score": d,
            onHighlightTeam: f,
            onUnhighlightTeam: o
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"])
        ])
      ]),
      e.index % 2 == 0 && e.totalMatches > 1 ? (y(), p("div", ve, h[0] || (h[0] = [
        v("span", { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" }, null, -1)
      ]))) : W("", !0)
    ], 2));
  }
}, be = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, pe = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50 mt-[23px]" }, Te = {
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
        [S.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: [
    "update:match",
    "highlight-team",
    "unhighlight-team",
    "click-match"
  ],
  setup(e, { emit: i }) {
    const t = e, s = i, n = (c, l) => {
      s("update:match", t.columnIndex, c, l);
    }, a = (c, l) => {
      s("click-match", {
        ...l,
        roundIndex: t.columnIndex,
        matchIndex: c
      });
    };
    return (c, l) => (y(), p("div", be, [
      (y(!0), p(q, null, A(e.column.matches, (u, f) => (y(), p(q, {
        key: u.id
      }, [
        v("div", pe, $(u.number), 1),
        D(ye, {
          match: u,
          index: f,
          "total-matches": e.column.matches.length,
          "round-index": e.columnIndex,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "highlighted-team": e.highlightedTeam,
          permissions: e.permissions,
          "onUpdate:match": (o) => n(f, o),
          onHighlightTeam: l[0] || (l[0] = (o) => c.$emit("highlight-team", o)),
          onUnhighlightTeam: l[1] || (l[1] = (o) => c.$emit("unhighlight-team")),
          onClickMatch: (o) => a(f, o)
        }, null, 8, ["match", "index", "total-matches", "round-index", "available-teams", "selected-teams", "highlighted-team", "permissions", "onUpdate:match", "onClickMatch"])
      ], 64))), 128))
    ]));
  }
}, we = { class: "flex justify-between px-5" }, Ee = { class: "flex flex-col items-center gap-2" }, xe = { class: "mt-2" }, Se = { class: "flex items-center rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600" }, Oe = { class: "join" }, ke = ["onUpdate:modelValue", "disabled", "onBlur"], Ne = ["value", "disabled", "onChange"], $e = ["value"], Be = {
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
  setup(e, { emit: i }) {
    const t = e, s = i, n = [1, 3, 5, 7, 9], a = L(t.columns.map((u) => u.name));
    I(
      () => t.columns,
      (u) => {
        a.value = u.map((f) => f.name);
      },
      { deep: !0 }
    );
    const c = (u, f) => {
      a.value[u] = f;
      const o = [...t.columns];
      o[u] = {
        ...o[u],
        name: f
      }, s("update:columns", o);
    }, l = (u, f) => {
      const o = [...t.columns];
      o[u] = {
        ...o[u],
        bestOf: Number(f)
      }, s("update:columns", o);
    };
    return (u, f) => (y(), p("div", we, [
      (y(!0), p(q, null, A(e.columns, (o, r) => (y(), p("div", {
        key: o.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
      }, [
        v("div", Ee, [
          v("div", xe, [
            v("div", Se, [
              v("div", Oe, [
                V(v("input", {
                  "onUpdate:modelValue": (d) => a.value[r] = d,
                  disabled: !e.permissions[O(S).CAN_EDIT_ROUND_NAME],
                  type: "text",
                  class: "input input-bordered join-item",
                  onBlur: (d) => c(r, d.target.value)
                }, null, 40, ke), [
                  [K, a.value[r]]
                ]),
                v("select", {
                  value: o.bestOf,
                  disabled: !e.permissions[O(S).CAN_EDIT_BEST_OF],
                  class: "select select-bordered join-item",
                  onChange: (d) => l(r, d.target.value)
                }, [
                  (y(), p(q, null, A(n, (d) => v("option", {
                    key: d,
                    value: d
                  }, " Best of " + $(d), 9, $e)), 64))
                ], 40, Ne)
              ])
            ])
          ])
        ])
      ]))), 128))
    ]));
  }
}, De = { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, Le = { class: "flex flex-col" }, qe = { class: "overflow-x-auto" }, Ce = { class: "min-w-max" }, Ue = { class: "flex flex-1 p-5" }, J = {
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
  setup(e) {
    return (i, t) => (y(), p("div", {
      class: H(["flex flex-col mt-8", {
        "border-t-2 border-gray-300 dark:border-gray-600 pt-8": e.bordered
      }])
    }, [
      v("div", De, $(e.title), 1),
      v("div", Le, [
        v("div", qe, [
          v("div", Ce, [
            D(Be, {
              columns: e.columns,
              permissions: e.permissions,
              "onUpdate:columns": e.onColumnsUpdate
            }, null, 8, ["columns", "permissions", "onUpdate:columns"]),
            v("div", Ue, [
              (y(!0), p(q, null, A(e.columns, (s, n) => (y(), Q(Te, {
                key: s.id,
                column: s,
                "column-index": n,
                "available-teams": e.availableTeams,
                "selected-teams": e.selectedTeams,
                "highlighted-team": e.highlightedTeam,
                permissions: e.permissions,
                "onUpdate:match": e.onMatchUpdate,
                onHighlightTeam: e.onHighlight,
                onUnhighlightTeam: e.onUnhighlight,
                onClickMatch: e.onClickMatch
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team", "permissions", "onUpdate:match", "onHighlightTeam", "onUnhighlightTeam", "onClickMatch"]))), 128))
            ])
          ])
        ])
      ])
    ], 2));
  }
}, P = () => ({
  id: null,
  name: N,
  logo: null,
  score: 0
}), X = (e) => ({
  id: `match-${e}`,
  number: e,
  [T.ONE]: P(),
  [T.TWO]: P(),
  winner: null,
  date: null
});
function Y(e, i) {
  return Array.from({ length: e }, (t, s) => i(s));
}
const it = (e, i = 3) => {
  const t = Math.log2(e);
  let s = 1;
  return Array.from({ length: t }, (n, a) => {
    const c = Math.pow(2, t - a - 1), l = Y(
      c,
      () => X(s++)
    );
    return {
      id: `upper-round-${a + 1}`,
      name: `Round ${a + 1}`,
      matches: l,
      bestOf: i
    };
  });
}, Z = (e, i) => {
  const t = e - 1;
  let s = 1;
  return Array.from({ length: t }, (n, a) => {
    const c = Math.pow(2, e - a - 2), l = Y(
      c,
      () => X(s++)
    );
    return {
      id: `lower-round-${a + 1}`,
      name: `Lower Round ${a + 1}`,
      matches: l,
      bestOf: i
    };
  });
}, We = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, Ae = { class: "relative overflow-x-auto shadow-md sm:rounded-lg mt-8" }, je = { class: "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" }, Ie = { class: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" }, Me = {
  key: 0,
  scope: "col",
  class: "px-6 py-3"
}, He = {
  scope: "row",
  class: "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
}, Fe = { class: "px-6 py-4" }, ze = { class: "px-6 py-4" }, Ve = { class: "px-6 py-4" }, Re = {
  key: 0,
  class: "px-6 py-4"
}, Je = { class: "px-6 py-4" }, Pe = {
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
  setup(e) {
    return (i, t) => (y(), p("div", We, [
      t[5] || (t[5] = v("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, " Standings ", -1)),
      v("div", Ae, [
        v("table", je, [
          v("thead", Ie, [
            v("tr", null, [
              t[0] || (t[0] = v("th", {
                scope: "col",
                class: "px-6 py-3"
              }, "Place", -1)),
              t[1] || (t[1] = v("th", {
                scope: "col",
                class: "px-6 py-3"
              }, "Team", -1)),
              t[2] || (t[2] = v("th", {
                scope: "col",
                class: "px-6 py-3"
              }, "W-L-T", -1)),
              t[3] || (t[3] = v("th", {
                scope: "col",
                class: "px-6 py-3"
              }, "Points", -1)),
              e.format === e.tournamentFormat.SWISS ? (y(), p("th", Me, " Buchholz ")) : W("", !0),
              t[4] || (t[4] = v("th", {
                scope: "col",
                class: "px-6 py-3"
              }, "Pts Diff", -1))
            ])
          ]),
          v("tbody", null, [
            (y(!0), p(q, null, A(e.standings, (s) => (y(), p("tr", {
              key: s.id,
              class: "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            }, [
              v("th", He, $(s.place), 1),
              v("td", Fe, $(s.name), 1),
              v("td", ze, $(s.wins) + "-" + $(s.losses) + "-" + $(s.ties), 1),
              v("td", Ve, $(s.score), 1),
              e.format === e.tournamentFormat.SWISS ? (y(), p("td", Re, $(s.buchholz), 1)) : W("", !0),
              v("td", Je, $(s.ptsDiff), 1)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
};
function Ge(e) {
  const i = {}, t = {};
  e.forEach((n) => {
    n.matches.forEach((a) => {
      if (["teamOne", "teamTwo"].forEach((c) => {
        const l = a[c];
        l && (i[l.id] || (i[l.id] = {
          ...l,
          wins: 0,
          losses: 0,
          ties: 0,
          score: 0,
          ptsDiff: 0,
          buchholz: 0
        }), t[l.id] || (t[l.id] = []));
      }), a.teamOne && a.teamTwo) {
        const c = a.teamOne, l = a.teamTwo, u = c.score || 0, f = l.score || 0;
        a.winner === "teamOne" ? (i[c.id].wins++, i[c.id].score += 1, i[l.id].losses++) : a.winner === "teamTwo" ? (i[l.id].wins++, i[l.id].score += 1, i[c.id].losses++) : a.winner === null && (u > 0 || f > 0) && (i[c.id].ties++, i[l.id].ties++, i[c.id].score += 0.5, i[l.id].score += 0.5), i[c.id].ptsDiff += u - f, i[l.id].ptsDiff += f - u, t[c.id].push(l.id), t[l.id].push(c.id);
      } else a.teamOne && !a.teamTwo ? (i[a.teamOne.id].wins++, i[a.teamOne.id].score += 1) : !a.teamOne && a.teamTwo && (i[a.teamTwo.id].wins++, i[a.teamTwo.id].score += 1);
    });
  }), Object.values(i).forEach((n) => {
    n.buchholz = (t[n.id] || []).reduce(
      (a, c) => {
        var l;
        return a + (((l = i[c]) == null ? void 0 : l.score) || 0);
      },
      0
    );
  });
  const s = Object.values(i).sort(
    (n, a) => a.score - n.score || a.wins - n.wins || a.buchholz - n.buchholz || a.ptsDiff - n.ptsDiff
  );
  return s.forEach((n, a) => {
    n.place = a + 1;
  }), s;
}
function F(e, i) {
  return e.filter((t) => !!t.id && t.name !== i);
}
function z(e, i, t, s, n, a) {
  const c = i.score || 0, l = t.score || 0;
  s === n ? (e[i.id].wins++, e[i.id].score += 1, e[t.id].losses++) : s === a ? (e[t.id].wins++, e[t.id].score += 1, e[i.id].losses++) : s === null && (c > 0 || l > 0) && (e[i.id].ties++, e[t.id].ties++, e[i.id].score += 0.5, e[t.id].score += 0.5), e[i.id].ptsDiff += c - l, e[t.id].ptsDiff += l - c;
}
function Ke({
  upperColumns: e,
  lowerColumns: i,
  format: t,
  TOURNAMENT_FORMAT: s,
  TEAM_POSITION: n,
  TBD: a
}) {
  switch (t) {
    case s.SWISS:
      return F(Qe(e), a);
    case s.ROUND_ROBIN:
      return F(
        Xe(e, n),
        a
      );
    case s.SINGLE_ELIMINATION:
    case s.DOUBLE_ELIMINATION:
    default:
      return F(
        Ye(
          e,
          i,
          t,
          s,
          n
        ),
        a
      );
  }
}
function Qe(e) {
  return Ge(e);
}
function Xe(e, i) {
  const t = {};
  for (const s of e)
    for (const n of s.matches) {
      for (const l of [i.ONE, i.TWO]) {
        const u = n[l];
        !u || !u.id || t[u.id] || (t[u.id] = {
          ...u,
          wins: 0,
          losses: 0,
          ties: 0,
          score: 0,
          ptsDiff: 0
        });
      }
      const a = n[i.ONE], c = n[i.TWO];
      a && c && a.id && c.id && z(
        t,
        a,
        c,
        n.winner,
        i.ONE,
        i.TWO
      );
    }
  return _(t, ["score", "wins", "ptsDiff"]);
}
function Ye(e, i, t, s, n) {
  const a = {};
  for (const c of e)
    for (const l of c.matches) {
      for (const o of [n.ONE, n.TWO]) {
        const r = l[o];
        !r || !r.id || a[r.id] || (a[r.id] = {
          ...r,
          wins: 0,
          losses: 0,
          ties: 0,
          score: 0,
          ptsDiff: 0
        });
      }
      const u = l[n.ONE], f = l[n.TWO];
      u && f && u.id && f.id && z(
        a,
        u,
        f,
        l.winner,
        n.ONE,
        n.TWO
      );
    }
  if (t === s.DOUBLE_ELIMINATION && i)
    for (const c of i)
      for (const l of c.matches) {
        for (const o of [n.ONE, n.TWO]) {
          const r = l[o];
          !r || !r.id || a[r.id] || (a[r.id] = {
            ...r,
            wins: 0,
            losses: 0,
            ties: 0,
            score: 0,
            ptsDiff: 0
          });
        }
        const u = l[n.ONE], f = l[n.TWO];
        u && f && u.id && f.id && z(
          a,
          u,
          f,
          l.winner,
          n.ONE,
          n.TWO
        );
      }
  return _(a, ["score", "wins", "ptsDiff"]);
}
function _(e, i) {
  const t = Object.values(e).sort((s, n) => {
    for (const a of i)
      if (n[a] !== s[a]) return n[a] - s[a];
    return 0;
  });
  return t.forEach((s, n) => {
    s.place = n + 1;
  }), t;
}
function Ze(e, i = []) {
  const t = {};
  e.forEach((o) => {
    t[o.score] || (t[o.score] = []), t[o.score].push(o);
  });
  const s = Object.keys(t).map(Number).sort((o, r) => r - o), n = [], a = /* @__PURE__ */ new Set(), c = e.map((o) => o.id), l = new Set(i.map(([o, r]) => `${o}-${r}`));
  function u(o) {
    const r = [], d = /* @__PURE__ */ new Set();
    for (let g = 0; g < o.length; g++) {
      if (d.has(o[g].id)) continue;
      let w = !1;
      for (let b = g + 1; b < o.length; b++)
        if (!d.has(o[b].id) && !l.has(`${o[g].id}-${o[b].id}`) && !l.has(`${o[b].id}-${o[g].id}`)) {
          r.push([o[g], o[b]]), d.add(o[g].id), d.add(o[b].id), a.add(o[g].id), a.add(o[b].id), w = !0;
          break;
        }
      if (!w) {
        for (let b of s)
          if (b !== o[g].score) {
            for (let m of t[b] || [])
              if (!a.has(m.id) && !l.has(`${o[g].id}-${m.id}`) && !l.has(`${m.id}-${o[g].id}`))
                return r.push([o[g], m]), d.add(o[g].id), d.add(m.id), a.add(o[g].id), a.add(m.id), r;
          }
      }
    }
    return r;
  }
  for (let o of s) {
    const r = t[o].filter((w) => !a.has(w.id)), d = u(r);
    n.push(...d);
    const g = r.filter((w) => !a.has(w.id));
    if (g.length === 1) {
      let w = !1;
      for (let b of s)
        if (b !== o) {
          for (let m of t[b] || [])
            if (!a.has(m.id) && !l.has(`${g[0].id}-${m.id}`) && !l.has(`${m.id}-${g[0].id}`)) {
              n.push([g[0], m]), a.add(g[0].id), a.add(m.id), w = !0;
              break;
            }
          if (w) break;
        }
      w || (n.push([g[0], null]), a.add(g[0].id));
    }
  }
  const f = c.filter((o) => !a.has(o));
  for (let o of f) {
    const r = e.find((d) => d.id === o);
    n.push([r, null]);
  }
  return n;
}
function _e({
  upperColumns: e,
  lowerColumns: i,
  props: t,
  emit: s,
  TOURNAMENT_FORMAT: n,
  TEAM_POSITION: a,
  TBD: c
}) {
  function l(d, g, w) {
    if (e.value[d] && e.value[d].matches) {
      if (e.value[d].matches[g] = w, w.winner && d < e.value.length - 1) {
        const b = d + 1, m = Math.floor(g / 2);
        if (e.value[b] && e.value[b].matches[m]) {
          const h = e.value[b].matches[m], E = g % 2 === 0 ? a.ONE : a.TWO, x = w[w.winner];
          e.value[b].matches[m] = {
            ...h,
            [E]: {
              id: x.id,
              name: x.name,
              logo: x.logo,
              score: 0
            }
          };
        }
      }
      if (t.format === n.DOUBLE_ELIMINATION && w.winner) {
        const b = w[w.winner === a.ONE ? a.TWO : a.ONE];
        if (b.name !== c) {
          const m = Math.floor(d / 2), h = Math.floor(g / 2);
          if (i.value[m] && i.value[m].matches[h]) {
            const E = i.value[m].matches[h], x = g % 2 === 0 ? a.ONE : a.TWO;
            i.value[m].matches[h] = {
              ...E,
              [x]: {
                id: b.id,
                name: b.name,
                logo: b.logo,
                score: 0
              }
            };
          }
        }
      }
      o();
    }
    if (t.format === n.SWISS && e.value[d].matches.every((h) => h.winner) && d < e.value.length - 1) {
      const h = {};
      for (let B = 0; B <= d; B++)
        e.value[B].matches.forEach((k) => {
          ["teamOne", "teamTwo"].forEach((te) => {
            const M = k[te];
            M && (h[M.id] || (h[M.id] = { ...M, score: 0 }));
          }), k.winner && k.teamOne && k.teamTwo && (k.winner === "teamOne" && (h[k.teamOne.id].score += 1), k.winner === "teamTwo" && (h[k.teamTwo.id].score += 1));
        });
      const E = [];
      for (let B = 0; B <= d; B++)
        e.value[B].matches.forEach((k) => {
          k.teamOne && k.teamTwo && E.push([k.teamOne.id, k.teamTwo.id]);
        });
      const x = Object.values(h), j = Ze(x, E), ee = e.value[d + 1];
      ee.matches = j.map((B, k) => ({
        id: `swiss-match-${d + 2}-${k + 1}`,
        number: k + 1,
        teamOne: B[0],
        teamTwo: B[1],
        winner: null,
        date: null
      }));
    }
  }
  function u(d) {
    e.value = d, o();
  }
  function f(d) {
    i.value = d, o();
  }
  function o() {
    s("update:state", {
      upper: e.value,
      lower: t.format === n.DOUBLE_ELIMINATION ? i.value : null
    });
  }
  function r() {
    if (t.initialState) {
      if (Array.isArray(t.initialState)) {
        if (e.value = JSON.parse(JSON.stringify(t.initialState)), t.format === n.DOUBLE_ELIMINATION) {
          i.value = Z(
            e.value.length,
            t.defaultBestOf
          );
          return;
        }
        if (t.format === n.SWISS) {
          i.value = [];
          return;
        }
        return;
      }
      e.value = JSON.parse(
        JSON.stringify(t.initialState.upper || [])
      ), i.value = JSON.parse(
        JSON.stringify(t.initialState.lower || [])
      );
    }
  }
  return {
    updateUpperMatch: l,
    updateUpperColumns: u,
    updateLowerState: f,
    emitTournamentState: o,
    initializeTournament: r
  };
}
const et = { class: "flex flex-col" }, tt = {
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
        [S.CAN_SELECT_TEAM]: !0,
        [S.CAN_EDIT_ROUND_NAME]: !0,
        [S.CAN_EDIT_BEST_OF]: !0
      })
    }
  },
  emits: ["update:state", "click-match"],
  setup(e, { emit: i }) {
    const t = i, s = e, n = L([]), a = L([]), c = L(null), l = U(() => {
      const h = /* @__PURE__ */ new Set();
      return n.value.forEach((E) => {
        E.matches.forEach((x) => {
          x[T.ONE].name !== N && h.add(x[T.ONE].name), x[T.TWO].name !== N && h.add(x[T.TWO].name);
        });
      }), s.format === C.DOUBLE_ELIMINATION && a.value.forEach((E) => {
        E.matches.forEach((x) => {
          x[T.ONE].name !== N && h.add(x[T.ONE].name), x[T.TWO].name !== N && h.add(x[T.TWO].name);
        });
      }), Array.from(h);
    }), u = U(() => Ke({
      upperColumns: n.value,
      lowerColumns: a.value,
      format: s.format,
      TOURNAMENT_FORMAT: C,
      TEAM_POSITION: T,
      TBD: N
    })), f = (h) => {
      c.value = h;
    }, o = () => {
      c.value = null;
    }, r = (h) => {
      t("click-match", h);
    }, {
      updateUpperMatch: d,
      updateUpperColumns: g,
      updateLowerState: w,
      emitTournamentState: b,
      initializeTournament: m
    } = _e({
      upperColumns: n,
      lowerColumns: a,
      props: s,
      emit: t,
      TOURNAMENT_FORMAT: C,
      TEAM_POSITION: T,
      TBD: N
    });
    return I(
      () => s.initialState,
      () => {
        m();
      },
      { deep: !0 }
    ), I(
      () => s.format,
      (h) => {
        h === C.DOUBLE_ELIMINATION && (!a.value || a.value.length === 0) && (a.value = Z(
          n.value.length,
          s.defaultBestOf
        ), b());
      }
    ), G(() => {
      m();
    }), (h, E) => (y(), p("div", et, [
      D(J, {
        title: "Upper Bracket",
        columns: n.value,
        "available-teams": e.availableTeams,
        "selected-teams": l.value,
        "highlighted-team": c.value,
        permissions: e.permissions,
        "on-match-update": O(d),
        "on-columns-update": O(g),
        "on-highlight": f,
        "on-unhighlight": o,
        "on-click-match": r
      }, null, 8, ["columns", "available-teams", "selected-teams", "highlighted-team", "permissions", "on-match-update", "on-columns-update"]),
      e.format === O(C).DOUBLE_ELIMINATION ? (y(), Q(J, {
        key: 0,
        title: "Lower Bracket",
        columns: a.value,
        "available-teams": e.availableTeams,
        "selected-teams": l.value,
        "highlighted-team": c.value,
        permissions: e.permissions,
        bordered: "",
        "on-match-update": O(w),
        "on-columns-update": O(w),
        "on-highlight": f,
        "on-unhighlight": o
      }, null, 8, ["columns", "available-teams", "selected-teams", "highlighted-team", "permissions", "on-match-update", "on-columns-update"])) : W("", !0),
      D(Pe, {
        standings: u.value,
        format: e.format,
        "tournament-format": O(C)
      }, null, 8, ["standings", "format", "tournament-format"])
    ]));
  }
}, nt = (e) => {
  e.component("TournamentBracket", tt);
};
export {
  S as PERMISSIONS,
  tt as TournamentBracket,
  Z as createLowerBracketStructure,
  it as createTournamentState,
  nt as install
};
