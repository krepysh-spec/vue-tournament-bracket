import { ref as q, computed as W, watch as F, onMounted as G, createElementBlock as S, openBlock as b, normalizeClass as K, unref as B, createCommentVNode as H, withDirectives as Q, createElementVNode as p, Fragment as R, renderList as j, toDisplayString as U, vModelSelect as le, vModelText as ee, createVNode as P, createBlock as V } from "vue";
const I = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination",
  SWISS: "swiss",
  ROUND_ROBIN: "round_robin"
}, C = "TBD", l = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, $ = {
  CAN_SELECT_TEAM: "can_select_team",
  CAN_EDIT_DATE: "can_edit_date",
  CAN_EDIT_SCOPE: "can_edit_scope",
  CAN_EDIT_ROUND_NAME: "can_edit_round_name",
  CAN_EDIT_BEST_OF: "can_edit_best_of"
}, re = {
  key: 0,
  class: "flex items-center gap-2"
}, ce = ["src", "alt"], ue = ["value", "disabled"], de = {
  key: 1,
  class: "flex items-center gap-2"
}, me = ["src", "alt"], he = { class: "text-gray-900 dark:text-white" }, fe = {
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
        [$.CAN_SELECT_TEAM]: !0
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
  setup(e, { emit: d }) {
    const t = e, n = d, i = q(t.team.name), s = W(() => {
      var u;
      return i.value === C ? null : ((u = t.availableTeams.find((E) => E.name === i.value)) == null ? void 0 : u.logo) || null;
    });
    F(() => t.team, (u) => {
      i.value = u.name;
    }, { immediate: !0 }), G(() => {
      console.log("TeamSelect mounted:", {
        team: t.team,
        availableTeams: t.availableTeams
      });
    });
    const g = (u) => u === C ? !1 : t.selectedTeams.includes(u) && u !== t.team.name || u === t.team.name && t.team.name !== C, r = W(() => t.availableTeams ? t.availableTeams.filter((u) => u.name === C || u.name === t.team.name ? !0 : !g(u.name)) : []), T = () => {
      t.team.name !== C && n("highlight-team", t.team.name);
    }, N = () => {
      n("unhighlight-team");
    }, o = () => {
      const u = t.availableTeams.find((E) => E.name === i.value);
      console.log("Updating team:", { selectedTeam: i.value, selectedTeamData: u }), n("update:team", {
        position: t.teamPosition,
        team: {
          id: (u == null ? void 0 : u.id) || null,
          name: i.value,
          logo: (u == null ? void 0 : u.logo) || null,
          score: 0
        }
      });
    };
    return (u, E) => (b(), S("div", {
      class: K(["flex-grow p-2.5 hover:bg-gray-200/30 dark:hover:bg-gray-950/20", {
        "hover:bg-green-500/20 dark:hover:bg-green-500/20": e.isWinner,
        "hover:bg-red-500/20 dark:hover:bg-red-500/20": e.isLoser,
        "bg-green-500/20 dark:bg-green-500/20": e.shouldHighlight && e.isWinner,
        "bg-red-500/20 dark:bg-red-500/20": e.shouldHighlight && e.isLoser
      }]),
      onMouseenter: T,
      onMouseleave: N
    }, [
      e.canEdit && e.permissions[B($).CAN_SELECT_TEAM] ? (b(), S("div", re, [
        s.value ? (b(), S("img", {
          key: 0,
          src: s.value,
          alt: i.value,
          class: "w-6 h-6 rounded-full"
        }, null, 8, ce)) : H("", !0),
        Q(p("select", {
          "onUpdate:modelValue": E[0] || (E[0] = (c) => i.value = c),
          class: "select select-ghost w-full select-xs",
          onChange: o
        }, [
          E[1] || (E[1] = p("option", { value: "TBD" }, "TBD", -1)),
          (b(!0), S(R, null, j(r.value, (c) => (b(), S("option", {
            key: c.id,
            value: c.name,
            disabled: g(c.name)
          }, U(c.name), 9, ue))), 128))
        ], 544), [
          [le, i.value]
        ])
      ])) : (b(), S("div", de, [
        e.team.logo ? (b(), S("img", {
          key: 0,
          src: e.team.logo,
          alt: e.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, me)) : H("", !0),
        p("span", he, U(e.team.name), 1)
      ]))
    ], 34));
  }
}, ge = {
  key: 1,
  class: "text-white"
}, pe = {
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
  setup(e, { emit: d }) {
    const t = e, n = d, i = q(!1), s = q(t.team.score ?? 0), g = () => {
      t.canEditScore && (i.value = !0);
    }, r = () => {
      const T = parseInt(s.value) || 0;
      n("update:score", {
        position: t.teamPosition,
        score: T
      });
    };
    return F(() => t.team, (T) => {
      s.value = T.score ?? 0;
    }, { deep: !0 }), (T, N) => (b(), S("div", {
      class: K(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", { "border-b border-orange-600 dark:border-orange-700": e.isFirstTeam }]),
      onClick: g
    }, [
      i.value ? Q((b(), S("input", {
        key: 0,
        type: "number",
        "onUpdate:modelValue": N[0] || (N[0] = (o) => s.value = o),
        class: "input input-xs",
        required: "",
        min: "0",
        onChange: r,
        onBlur: N[1] || (N[1] = (o) => i.value = !1)
      }, null, 544)), [
        [ee, s.value]
      ]) : (b(), S("span", ge, U(e.team.score), 1))
    ], 2));
  }
}, Te = { class: "flex" }, X = {
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
        [$.CAN_SELECT_TEAM]: !0,
        [$.CAN_EDIT_SCOPE]: !0
      })
    }
  },
  emits: ["update:team", "update:score", "highlight-team", "unhighlight-team"],
  setup(e) {
    return (d, t) => (b(), S("div", Te, [
      P(fe, {
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
        "onUpdate:team": t[0] || (t[0] = (n) => d.$emit("update:team", n)),
        onHighlightTeam: t[1] || (t[1] = (n) => d.$emit("highlight-team", n)),
        onUnhighlightTeam: t[2] || (t[2] = (n) => d.$emit("unhighlight-team"))
      }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "highlighted-team", "permissions", "can-edit", "is-winner", "is-loser", "should-highlight", "is-first-team"]),
      P(pe, {
        team: e.team,
        "team-position": e.teamPosition,
        "can-edit-score": e.canEditScore,
        "is-first-team": e.isFirstTeam,
        "onUpdate:score": t[3] || (t[3] = (n) => d.$emit("update:score", n))
      }, null, 8, ["team", "team-position", "can-edit-score", "is-first-team"])
    ]));
  }
}, ve = { class: "flex flex-col w-full" }, Oe = { class: "px-3 py-1 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center" }, Ee = ["value", "disabled"], ye = {
  key: 0,
  class: "absolute top-1/2 left-full w-2.5 h-[calc(100%+10px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[-10px] ml-[15px] mx-2 transition-colors duration-200"
}, we = {
  __name: "BracketMatch",
  props: {
    match: {
      type: Object,
      required: !0,
      default: () => ({
        teamOne: { name: C, score: 0 },
        teamTwo: { name: C, score: 0 },
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
        [$.CAN_SELECT_TEAM]: !0,
        [$.CAN_EDIT_DATE]: !0,
        [$.CAN_EDIT_SCOPE]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team", "click-match"],
  setup(e, { emit: d }) {
    const t = e, n = d, i = W(() => t.roundIndex === 0 && t.permissions[$.CAN_SELECT_TEAM]), s = W(() => t.match[l.ONE].name !== C && t.match[l.TWO].name !== C && t.permissions[$.CAN_EDIT_SCOPE]), g = (m) => t.match.winner === m, r = (m) => t.match.winner && t.match.winner !== m, T = (m) => {
      const x = t.match[m].name;
      return t.highlightedTeam === x;
    }, N = (m) => {
      n("highlight-team", m);
    }, o = () => {
      n("unhighlight-team");
    }, u = ({ position: m, team: x }) => {
      const M = {
        ...t.match,
        [m]: x
      };
      n("update:match", M);
    }, E = ({ position: m, score: x }) => {
      const M = {
        ...t.match,
        [m]: {
          ...t.match[m],
          score: x
        }
      };
      M[l.ONE].score > M[l.TWO].score ? M.winner = l.ONE : M[l.TWO].score > M[l.ONE].score ? M.winner = l.TWO : M.winner = null, n("update:match", M);
    }, c = (m) => m ? new Date(m).toISOString().slice(0, 16) : "", A = (m) => {
      const x = {
        ...t.match,
        date: m.target.value
      };
      n("update:match", x);
    }, w = (m) => {
      const x = m.target.tagName.toLowerCase();
      x === "input" || x === "select" || x === "option" || x === "button" || m.target.closest("input,select,option,button") || !(!t.permissions[$.CAN_SELECT_TEAM] && !t.permissions[$.CAN_EDIT_DATE] && !t.permissions[$.CAN_EDIT_SCOPE]) || n("click-match", {
        match: t.match,
        roundIndex: t.roundIndex,
        matchIndex: t.index,
        id: t.match.id ?? null
      });
    };
    return (m, x) => (b(), S("div", {
      class: K(["relative text-[0.8em] flex items-center", { group: e.index % 2 == 0 && e.totalMatches > 1 }])
    }, [
      p("div", ve, [
        p("div", Oe, [
          p("input", {
            type: "datetime-local",
            value: c(e.match.date),
            onInput: A,
            class: "input input-ghost input-sm",
            disabled: !e.permissions[B($).CAN_EDIT_DATE]
          }, null, 40, Ee)
        ]),
        p("div", {
          class: "my-1.5 ml-2.5 bg-white dark:bg-gray-900 rounded overflow-hidden w-full min-w-[200px] shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10",
          onClick: w
        }, [
          P(X, {
            team: e.match.teamOne,
            "team-position": B(l).ONE,
            "available-teams": e.availableTeams,
            "selected-teams": e.selectedTeams,
            "can-edit": i.value,
            "can-edit-score": s.value,
            "is-winner": g(B(l).ONE),
            "is-loser": r(B(l).ONE),
            "should-highlight": T(B(l).ONE),
            "is-first-team": !0,
            "can-select-team": m.canSelectTeam,
            "highlighted-team": e.highlightedTeam,
            permissions: e.permissions,
            "onUpdate:team": u,
            "onUpdate:score": E,
            onHighlightTeam: N,
            onUnhighlightTeam: o
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"]),
          P(X, {
            team: e.match.teamTwo,
            "team-position": B(l).TWO,
            "available-teams": e.availableTeams,
            "selected-teams": e.selectedTeams,
            "can-edit": i.value,
            "can-edit-score": s.value,
            "is-winner": g(B(l).TWO),
            "is-loser": r(B(l).TWO),
            "should-highlight": T(B(l).TWO),
            "can-select-team": m.canSelectTeam,
            "highlighted-team": e.highlightedTeam,
            permissions: e.permissions,
            "onUpdate:team": u,
            "onUpdate:score": E,
            onHighlightTeam: N,
            onUnhighlightTeam: o
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"])
        ])
      ]),
      e.index % 2 == 0 && e.totalMatches > 1 ? (b(), S("div", ye, x[0] || (x[0] = [
        p("span", { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" }, null, -1)
      ]))) : H("", !0)
    ], 2));
  }
}, be = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, Ne = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50 mt-[23px]" }, te = {
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
        [$.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team", "click-match"],
  setup(e, { emit: d }) {
    const t = e, n = d, i = (g, r) => {
      n("update:match", t.columnIndex, g, r);
    }, s = (g, r) => {
      n("click-match", {
        ...r,
        roundIndex: t.columnIndex,
        matchIndex: g
      });
    };
    return (g, r) => (b(), S("div", be, [
      (b(!0), S(R, null, j(e.column.matches, (T, N) => (b(), S(R, {
        key: T.id
      }, [
        p("div", Ne, U(T.number), 1),
        P(we, {
          match: T,
          index: N,
          "total-matches": e.column.matches.length,
          "round-index": e.columnIndex,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "highlighted-team": e.highlightedTeam,
          permissions: e.permissions,
          "onUpdate:match": (o) => i(N, o),
          onHighlightTeam: r[0] || (r[0] = (o) => g.$emit("highlight-team", o)),
          onUnhighlightTeam: r[1] || (r[1] = (o) => g.$emit("unhighlight-team")),
          onClickMatch: (o) => s(N, o)
        }, null, 8, ["match", "index", "total-matches", "round-index", "available-teams", "selected-teams", "highlighted-team", "permissions", "onUpdate:match", "onClickMatch"])
      ], 64))), 128))
    ]));
  }
}, Se = { class: "flex justify-between px-5" }, xe = { class: "flex flex-col items-center gap-2" }, Ae = { class: "mt-2" }, ke = { class: "flex items-center rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600" }, $e = { class: "join" }, De = ["onBlur", "disabled", "onUpdate:modelValue"], Ie = ["value", "onChange", "disabled"], Ce = ["value"], se = {
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
  setup(e, { emit: d }) {
    const t = e, n = d, i = [1, 3, 5, 7, 9], s = q(t.columns.map((T) => T.name));
    F(() => t.columns, (T) => {
      s.value = T.map((N) => N.name);
    }, { deep: !0 });
    const g = (T, N) => {
      s.value[T] = N;
      const o = [...t.columns];
      o[T] = {
        ...o[T],
        name: N
      }, n("update:columns", o);
    }, r = (T, N) => {
      const o = [...t.columns];
      o[T] = {
        ...o[T],
        bestOf: Number(N)
      }, n("update:columns", o);
    };
    return (T, N) => (b(), S("div", Se, [
      (b(!0), S(R, null, j(e.columns, (o, u) => (b(), S("div", {
        key: o.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
      }, [
        p("div", xe, [
          p("div", Ae, [
            p("div", ke, [
              p("div", $e, [
                Q(p("input", {
                  onBlur: (E) => g(u, E.target.value),
                  disabled: !e.permissions[B($).CAN_EDIT_ROUND_NAME],
                  "onUpdate:modelValue": (E) => s.value[u] = E,
                  type: "text",
                  class: "input input-bordered join-item"
                }, null, 40, De), [
                  [ee, s.value[u]]
                ]),
                p("select", {
                  value: o.bestOf,
                  onChange: (E) => r(u, E.target.value),
                  disabled: !e.permissions[B($).CAN_EDIT_BEST_OF],
                  class: "select select-bordered join-item"
                }, [
                  (b(), S(R, null, j(i, (E) => p("option", {
                    key: E,
                    value: E
                  }, " Best of " + U(E), 9, Ce)), 64))
                ], 40, Ie)
              ])
            ])
          ])
        ])
      ]))), 128))
    ]));
  }
}, Me = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, _e = { class: "flex flex-col" }, Be = { class: "overflow-x-auto" }, Ue = { class: "min-w-max" }, Le = { class: "flex flex-1 p-5" }, We = {
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
      validator: (e) => [1, 3, 5, 7, 9].includes(e)
    },
    permissions: {
      type: Object,
      required: !0,
      default: () => ({
        [$.CAN_SELECT_TEAM]: !0,
        [$.CAN_EDIT_DATE]: !0,
        [$.CAN_EDIT_SCOPE]: !0,
        [$.CAN_EDIT_ROUND_NAME]: !0,
        [$.CAN_EDIT_BEST_OF]: !0
      })
    }
  },
  emits: ["update:state"],
  setup(e, { emit: d }) {
    const t = d, n = e, i = q([]), s = q(null), g = W(() => {
      const c = /* @__PURE__ */ new Set();
      return i.value.forEach((A) => {
        A.matches.forEach((w) => {
          w[l.ONE].name !== C && c.add(w[l.ONE].name), w[l.TWO].name !== C && c.add(w[l.TWO].name);
        });
      }), Array.from(c);
    }), r = (c) => {
      s.value = c;
    }, T = () => {
      s.value = null;
    }, N = (c, A, w) => {
      if (console.log("Updating lower match:", { roundIndex: c, matchIndex: A, updatedMatch: w }), i.value[c] && i.value[c].matches) {
        if (i.value[c].matches[A] = w, w.winner && c < i.value.length - 1) {
          const m = c + 1, x = Math.floor(A / 2);
          if (i.value[m] && i.value[m].matches[x]) {
            const M = i.value[m].matches[x], J = A % 2 === 0 ? l.ONE : l.TWO, a = w[w.winner];
            i.value[m].matches[x] = {
              ...M,
              [J]: {
                id: a.id,
                name: a.name,
                logo: a.logo,
                score: 0
              }
            };
          }
        }
        u();
      }
    }, o = (c) => {
      console.log("Updating lower columns:", c), i.value = c, u();
    }, u = () => {
      console.log("Emitting lower tournament state:", i.value), t("update:state", i.value);
    }, E = () => {
      console.log("Initializing lower tournament with state:", n.initialState), n.initialState && n.initialState.length > 0 && (i.value = JSON.parse(JSON.stringify(n.initialState)));
    };
    return F(() => n.initialState, () => {
      E();
    }, { deep: !0 }), G(() => {
      E();
    }), (c, A) => (b(), S("div", Me, [
      A[0] || (A[0] = p("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, "Lower Bracket", -1)),
      p("div", _e, [
        p("div", Be, [
          p("div", Ue, [
            P(se, {
              columns: i.value,
              "onUpdate:columns": o,
              permissions: e.permissions
            }, null, 8, ["columns", "permissions"]),
            p("div", Le, [
              (b(!0), S(R, null, j(i.value, (w, m) => (b(), V(te, {
                key: w.id,
                column: w,
                "column-index": m,
                "available-teams": e.availableTeams,
                "selected-teams": g.value,
                "highlighted-team": s.value,
                permissions: e.permissions,
                "onUpdate:match": N,
                onHighlightTeam: r,
                onUnhighlightTeam: T
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team", "permissions"]))), 128))
            ])
          ])
        ])
      ])
    ]));
  }
}, Y = () => ({
  id: null,
  name: C,
  logo: null,
  score: 0
}), ie = (e) => ({
  id: `match-${e}`,
  number: e,
  [l.ONE]: Y(),
  [l.TWO]: Y(),
  winner: null,
  date: null
}), ot = (e, d = 3) => {
  const t = [], n = Math.log2(e);
  let i = 1;
  for (let s = 0; s < n; s++) {
    const g = Math.pow(2, n - s - 1), r = [];
    for (let T = 0; T < g; T++)
      r.push(ie(i++));
    t.push({
      id: `upper-round-${s + 1}`,
      name: `Round ${s + 1}`,
      matches: r,
      bestOf: d
    });
  }
  return t;
}, Z = (e, d) => {
  const t = [];
  let n = 1;
  const i = e - 1;
  for (let s = 0; s < i; s++) {
    const g = Math.pow(2, e - s - 2), r = [];
    for (let T = 0; T < g; T++)
      r.push(ie(n++));
    t.push({
      id: `lower-round-${s + 1}`,
      name: `Lower Round ${s + 1}`,
      matches: r,
      bestOf: d
    });
  }
  return t;
};
function qe(e, d = []) {
  const t = {};
  e.forEach((o) => {
    t[o.score] || (t[o.score] = []), t[o.score].push(o);
  });
  const n = Object.keys(t).map(Number).sort((o, u) => u - o), i = [], s = /* @__PURE__ */ new Set(), g = e.map((o) => o.id), r = new Set(d.map(([o, u]) => `${o}-${u}`));
  function T(o) {
    const u = [], E = /* @__PURE__ */ new Set();
    for (let c = 0; c < o.length; c++) {
      if (E.has(o[c].id)) continue;
      let A = !1;
      for (let w = c + 1; w < o.length; w++)
        if (!E.has(o[w].id) && !r.has(`${o[c].id}-${o[w].id}`) && !r.has(`${o[w].id}-${o[c].id}`)) {
          u.push([o[c], o[w]]), E.add(o[c].id), E.add(o[w].id), s.add(o[c].id), s.add(o[w].id), A = !0;
          break;
        }
      if (!A) {
        for (let w of n)
          if (w !== o[c].score) {
            for (let m of t[w] || [])
              if (!s.has(m.id) && !r.has(`${o[c].id}-${m.id}`) && !r.has(`${m.id}-${o[c].id}`))
                return u.push([o[c], m]), E.add(o[c].id), E.add(m.id), s.add(o[c].id), s.add(m.id), u;
          }
      }
    }
    return u;
  }
  for (let o of n) {
    const u = t[o].filter((A) => !s.has(A.id)), E = T(u);
    i.push(...E);
    const c = u.filter((A) => !s.has(A.id));
    if (c.length === 1) {
      let A = !1;
      for (let w of n)
        if (w !== o) {
          for (let m of t[w] || [])
            if (!s.has(m.id) && !r.has(`${c[0].id}-${m.id}`) && !r.has(`${m.id}-${c[0].id}`)) {
              i.push([c[0], m]), s.add(c[0].id), s.add(m.id), A = !0;
              break;
            }
          if (A) break;
        }
      A || (i.push([c[0], null]), s.add(c[0].id));
    }
  }
  const N = g.filter((o) => !s.has(o));
  for (let o of N) {
    const u = e.find((E) => E.id === o);
    i.push([u, null]);
  }
  return i;
}
function Re(e) {
  const d = {}, t = {};
  e.forEach((i) => {
    i.matches.forEach((s) => {
      if (["teamOne", "teamTwo"].forEach((g) => {
        const r = s[g];
        r && (d[r.id] || (d[r.id] = { ...r, wins: 0, losses: 0, ties: 0, score: 0, ptsDiff: 0, buchholz: 0 }), t[r.id] || (t[r.id] = []));
      }), s.teamOne && s.teamTwo) {
        const g = s.teamOne, r = s.teamTwo, T = g.score || 0, N = r.score || 0;
        s.winner === "teamOne" ? (d[g.id].wins++, d[g.id].score += 1, d[r.id].losses++) : s.winner === "teamTwo" ? (d[r.id].wins++, d[r.id].score += 1, d[g.id].losses++) : s.winner === null && (T > 0 || N > 0) && (d[g.id].ties++, d[r.id].ties++, d[g.id].score += 0.5, d[r.id].score += 0.5), d[g.id].ptsDiff += T - N, d[r.id].ptsDiff += N - T, t[g.id].push(r.id), t[r.id].push(g.id);
      } else s.teamOne && !s.teamTwo ? (d[s.teamOne.id].wins++, d[s.teamOne.id].score += 1) : !s.teamOne && s.teamTwo && (d[s.teamTwo.id].wins++, d[s.teamTwo.id].score += 1);
    });
  }), Object.values(d).forEach((i) => {
    i.buchholz = (t[i.id] || []).reduce((s, g) => {
      var r;
      return s + (((r = d[g]) == null ? void 0 : r.score) || 0);
    }, 0);
  });
  const n = Object.values(d).sort(
    (i, s) => s.score - i.score || s.wins - i.wins || s.buchholz - i.buchholz || s.ptsDiff - i.ptsDiff
  );
  return n.forEach((i, s) => {
    i.place = s + 1;
  }), n;
}
const Pe = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, je = { class: "relative overflow-x-auto shadow-md sm:rounded-lg mt-8" }, Fe = { class: "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" }, He = { class: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" }, ze = {
  key: 0,
  scope: "col",
  class: "px-6 py-3"
}, Je = {
  scope: "row",
  class: "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
}, Ve = { class: "px-6 py-4" }, Ge = { class: "px-6 py-4" }, Ke = { class: "px-6 py-4" }, Qe = {
  key: 0,
  class: "px-6 py-4"
}, Xe = { class: "px-6 py-4" }, Ye = {
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
    TOURNAMENT_FORMAT: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    return (d, t) => (b(), S("div", Pe, [
      t[5] || (t[5] = p("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, "Standings", -1)),
      p("div", je, [
        p("table", Fe, [
          p("thead", He, [
            p("tr", null, [
              t[0] || (t[0] = p("th", {
                scope: "col",
                class: "px-6 py-3"
              }, "Place", -1)),
              t[1] || (t[1] = p("th", {
                scope: "col",
                class: "px-6 py-3"
              }, "Team", -1)),
              t[2] || (t[2] = p("th", {
                scope: "col",
                class: "px-6 py-3"
              }, "W-L-T", -1)),
              t[3] || (t[3] = p("th", {
                scope: "col",
                class: "px-6 py-3"
              }, "Points", -1)),
              e.format === e.TOURNAMENT_FORMAT.SWISS ? (b(), S("th", ze, "Buchholz")) : H("", !0),
              t[4] || (t[4] = p("th", {
                scope: "col",
                class: "px-6 py-3"
              }, "Pts Diff", -1))
            ])
          ]),
          p("tbody", null, [
            (b(!0), S(R, null, j(e.standings, (n) => (b(), S("tr", {
              key: n.id,
              class: "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            }, [
              p("th", Je, U(n.place), 1),
              p("td", Ve, U(n.name), 1),
              p("td", Ge, U(n.wins) + "-" + U(n.losses) + "-" + U(n.ties), 1),
              p("td", Ke, U(n.score), 1),
              e.format === e.TOURNAMENT_FORMAT.SWISS ? (b(), S("td", Qe, U(n.buchholz), 1)) : H("", !0),
              p("td", Xe, U(n.ptsDiff), 1)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}, Ze = { class: "flex flex-col" }, et = { class: "flex flex-col" }, tt = { class: "overflow-x-auto" }, st = { class: "min-w-max" }, it = { class: "flex flex-1 p-5" }, at = {
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
        [$.CAN_SELECT_TEAM]: !0,
        [$.CAN_EDIT_ROUND_NAME]: !0,
        [$.CAN_EDIT_BEST_OF]: !0
      })
    }
  },
  emits: ["update:state", "click-match"],
  setup(e, { emit: d }) {
    const t = d, n = e, i = q([]), s = q([]), g = q(null), r = W(() => {
      const a = /* @__PURE__ */ new Set();
      return i.value.forEach((D) => {
        D.matches.forEach((v) => {
          v[l.ONE].name !== C && a.add(v[l.ONE].name), v[l.TWO].name !== C && a.add(v[l.TWO].name);
        });
      }), n.format === I.DOUBLE_ELIMINATION && s.value.forEach((D) => {
        D.matches.forEach((v) => {
          v[l.ONE].name !== C && a.add(v[l.ONE].name), v[l.TWO].name !== C && a.add(v[l.TWO].name);
        });
      }), Array.from(a);
    }), T = W(() => n.format !== I.SWISS ? [] : Re(i.value)), N = W(() => {
      if (n.format !== I.ROUND_ROBIN) return [];
      const a = {};
      i.value.forEach((v) => {
        v.matches.forEach((h) => {
          [l.ONE, l.TWO].forEach((k) => {
            const y = h[k];
            !y || !y.id || a[y.id] || (a[y.id] = { ...y, wins: 0, losses: 0, ties: 0, score: 0, ptsDiff: 0 });
          });
          const O = h[l.ONE], f = h[l.TWO];
          if (O && f && O.id && f.id) {
            const k = O.score || 0, y = f.score || 0;
            h.winner === l.ONE ? (a[O.id].wins++, a[O.id].score += 1, a[f.id].losses++) : h.winner === l.TWO ? (a[f.id].wins++, a[f.id].score += 1, a[O.id].losses++) : h.winner === null && (k > 0 || y > 0) && (a[O.id].ties++, a[f.id].ties++, a[O.id].score += 0.5, a[f.id].score += 0.5), a[O.id].ptsDiff += k - y, a[f.id].ptsDiff += y - k;
          }
        });
      });
      const D = Object.values(a).sort(
        (v, h) => h.score - v.score || h.wins - v.wins || h.ptsDiff - v.ptsDiff
      );
      return D.forEach((v, h) => {
        v.place = h + 1;
      }), D;
    }), o = W(() => {
      if (n.format === I.SWISS || n.format === I.ROUND_ROBIN) return [];
      const a = {};
      i.value.forEach((v) => {
        v.matches.forEach((h) => {
          [l.ONE, l.TWO].forEach((k) => {
            const y = h[k];
            !y || !y.id || a[y.id] || (a[y.id] = { ...y, wins: 0, losses: 0, ties: 0, score: 0, ptsDiff: 0 });
          });
          const O = h[l.ONE], f = h[l.TWO];
          if (O && f && O.id && f.id) {
            const k = O.score || 0, y = f.score || 0;
            h.winner === l.ONE ? (a[O.id].wins++, a[O.id].score += 1, a[f.id].losses++) : h.winner === l.TWO ? (a[f.id].wins++, a[f.id].score += 1, a[O.id].losses++) : h.winner === null && (k > 0 || y > 0) && (a[O.id].ties++, a[f.id].ties++, a[O.id].score += 0.5, a[f.id].score += 0.5), a[O.id].ptsDiff += k - y, a[f.id].ptsDiff += y - k;
          }
        });
      }), n.format === I.DOUBLE_ELIMINATION && s.value && s.value.forEach((v) => {
        v.matches.forEach((h) => {
          [l.ONE, l.TWO].forEach((k) => {
            const y = h[k];
            !y || !y.id || a[y.id] || (a[y.id] = { ...y, wins: 0, losses: 0, ties: 0, score: 0, ptsDiff: 0 });
          });
          const O = h[l.ONE], f = h[l.TWO];
          if (O && f && O.id && f.id) {
            const k = O.score || 0, y = f.score || 0;
            h.winner === l.ONE ? (a[O.id].wins++, a[O.id].score += 1, a[f.id].losses++) : h.winner === l.TWO ? (a[f.id].wins++, a[f.id].score += 1, a[O.id].losses++) : h.winner === null && (k > 0 || y > 0) && (a[O.id].ties++, a[f.id].ties++, a[O.id].score += 0.5, a[f.id].score += 0.5), a[O.id].ptsDiff += k - y, a[f.id].ptsDiff += y - k;
          }
        });
      });
      const D = Object.values(a).sort(
        (v, h) => h.score - v.score || h.wins - v.wins || h.ptsDiff - v.ptsDiff
      );
      return D.forEach((v, h) => {
        v.place = h + 1;
      }), D;
    }), u = W(() => n.format === I.SWISS ? T.value : n.format === I.ROUND_ROBIN ? N.value : o.value), E = (a) => {
      g.value = a;
    }, c = () => {
      g.value = null;
    }, A = (a, D, v) => {
      if (console.log("Updating upper match:", { roundIndex: a, matchIndex: D, updatedMatch: v }), i.value[a] && i.value[a].matches) {
        if (i.value[a].matches[D] = v, v.winner && a < i.value.length - 1) {
          const h = a + 1, O = Math.floor(D / 2);
          if (i.value[h] && i.value[h].matches[O]) {
            const f = i.value[h].matches[O], k = D % 2 === 0 ? l.ONE : l.TWO, y = v[v.winner];
            i.value[h].matches[O] = {
              ...f,
              [k]: {
                id: y.id,
                name: y.name,
                logo: y.logo,
                score: 0
              }
            };
          }
        }
        if (n.format === I.DOUBLE_ELIMINATION && v.winner) {
          const h = v[v.winner === l.ONE ? l.TWO : l.ONE];
          if (h.name !== C) {
            const O = Math.floor(a / 2), f = Math.floor(D / 2);
            if (s.value[O] && s.value[O].matches[f]) {
              const k = s.value[O].matches[f], y = D % 2 === 0 ? l.ONE : l.TWO;
              s.value[O].matches[f] = {
                ...k,
                [y]: {
                  id: h.id,
                  name: h.name,
                  logo: h.logo,
                  score: 0
                }
              };
            }
          }
        }
        x();
      }
      if (n.format === I.SWISS && i.value[a].matches.every((f) => f.winner) && a < i.value.length - 1) {
        const f = {};
        for (let L = 0; L <= a; L++)
          i.value[L].matches.forEach((_) => {
            ["teamOne", "teamTwo"].forEach((oe) => {
              const z = _[oe];
              z && (f[z.id] || (f[z.id] = { ...z, score: 0 }));
            }), _.winner && _.teamOne && _.teamTwo && (_.winner === "teamOne" && (f[_.teamOne.id].score += 1), _.winner === "teamTwo" && (f[_.teamTwo.id].score += 1));
          });
        const k = [];
        for (let L = 0; L <= a; L++)
          i.value[L].matches.forEach((_) => {
            _.teamOne && _.teamTwo && k.push([_.teamOne.id, _.teamTwo.id]);
          });
        const y = Object.values(f), ae = qe(y, k), ne = i.value[a + 1];
        ne.matches = ae.map((L, _) => ({
          id: `swiss-match-${a + 2}-${_ + 1}`,
          number: _ + 1,
          teamOne: L[0],
          teamTwo: L[1],
          winner: null,
          date: null
        }));
      }
    }, w = (a) => {
      console.log("Updating upper columns:", a), i.value = a, x();
    }, m = (a) => {
      console.log("Updating lower state:", a), s.value = a, x();
    }, x = () => {
      console.log("Emitting tournament state:", {
        upper: i.value,
        lower: n.format === I.DOUBLE_ELIMINATION ? s.value : null
      }), t("update:state", {
        upper: i.value,
        lower: n.format === I.DOUBLE_ELIMINATION ? s.value : null
      });
    }, M = () => {
      console.log("Initializing tournament with state:", n.initialState), n.initialState && (Array.isArray(n.initialState) ? (i.value = JSON.parse(JSON.stringify(n.initialState)), n.format === I.DOUBLE_ELIMINATION ? s.value = Z(i.value.length, n.defaultBestOf) : n.format === I.SWISS && (s.value = [])) : (i.value = JSON.parse(JSON.stringify(n.initialState.upper || [])), s.value = JSON.parse(JSON.stringify(n.initialState.lower || []))));
    };
    F(() => n.initialState, () => {
      M();
    }, { deep: !0 }), F(() => n.format, (a) => {
      a === I.DOUBLE_ELIMINATION && (!s.value || s.value.length === 0) && (s.value = Z(i.value.length, n.defaultBestOf), x());
    });
    const J = (a) => {
      t("click-match", a);
    };
    return G(() => {
      M();
    }), (a, D) => (b(), S("div", Ze, [
      D[0] || (D[0] = p("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, "Upper Bracket", -1)),
      p("div", et, [
        p("div", tt, [
          p("div", st, [
            P(se, {
              columns: i.value,
              "onUpdate:columns": w,
              permissions: e.permissions
            }, null, 8, ["columns", "permissions"]),
            p("div", it, [
              (b(!0), S(R, null, j(i.value, (v, h) => (b(), V(te, {
                key: v.id,
                column: v,
                "column-index": h,
                "available-teams": e.availableTeams,
                "selected-teams": r.value,
                "highlighted-team": g.value,
                permissions: e.permissions,
                "onUpdate:match": A,
                onHighlightTeam: E,
                onUnhighlightTeam: c,
                onClickMatch: J
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team", "permissions"]))), 128))
            ])
          ])
        ])
      ]),
      e.format === B(I).DOUBLE_ELIMINATION ? (b(), V(We, {
        key: 0,
        "initial-state": s.value,
        "available-teams": e.availableTeams,
        "default-best-of": e.defaultBestOf,
        permissions: e.permissions,
        "onUpdate:state": m
      }, null, 8, ["initial-state", "available-teams", "default-best-of", "permissions"])) : H("", !0),
      P(Ye, {
        standings: u.value,
        format: e.format,
        TOURNAMENT_FORMAT: B(I)
      }, null, 8, ["standings", "format", "TOURNAMENT_FORMAT"])
    ]));
  }
}, lt = (e) => {
  e.component("TournamentBracket", at);
};
export {
  $ as PERMISSIONS,
  at as TournamentBracket,
  Z as createLowerBracketStructure,
  ot as createTournamentState,
  lt as install
};
