import { ref as k, computed as L, watch as U, onMounted as P, createElementBlock as p, openBlock as c, normalizeClass as D, unref as N, createCommentVNode as R, withDirectives as z, createElementVNode as f, Fragment as A, renderList as $, toDisplayString as I, vModelSelect as Q, vModelText as G, createVNode as M, createBlock as H } from "vue";
const B = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination"
}, O = "TBD", r = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, q = {
  CAN_SELECT_TEAM: "can-select-team"
}, X = {
  key: 0,
  class: "flex items-center gap-2"
}, Y = ["src", "alt"], _ = ["value", "disabled"], ee = {
  key: 1,
  class: "flex items-center gap-2"
}, te = ["src", "alt"], ae = { class: "text-gray-900 dark:text-white" }, ie = {
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
        [q.CAN_SELECT_TEAM]: !0
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
  setup(e, { emit: v }) {
    const t = e, i = v, a = k(t.team.name), l = L(() => {
      var o;
      return a.value === O ? null : ((o = t.availableTeams.find((h) => h.name === a.value)) == null ? void 0 : o.logo) || null;
    });
    U(() => t.team, (o) => {
      a.value = o.name;
    }, { immediate: !0 }), P(() => {
      console.log("TeamSelect mounted:", {
        team: t.team,
        availableTeams: t.availableTeams
      });
    });
    const d = (o) => o === O ? !1 : t.selectedTeams.includes(o) && o !== t.team.name || o === t.team.name && t.team.name !== O, b = L(() => t.availableTeams ? t.availableTeams.filter((o) => o.name === O || o.name === t.team.name ? !0 : !d(o.name)) : []), m = () => {
      t.team.name !== O && i("highlight-team", t.team.name);
    }, u = () => {
      i("unhighlight-team");
    }, T = () => {
      const o = t.availableTeams.find((h) => h.name === a.value);
      console.log("Updating team:", { selectedTeam: a.value, selectedTeamData: o }), i("update:team", {
        position: t.teamPosition,
        team: {
          id: (o == null ? void 0 : o.id) || null,
          name: a.value,
          logo: (o == null ? void 0 : o.logo) || null,
          score: 0
        }
      });
    };
    return (o, h) => (c(), p("div", {
      class: D(["flex-grow p-2.5 hover:bg-gray-200/30 dark:hover:bg-gray-950/20", {
        "hover:bg-green-500/20 dark:hover:bg-green-500/20": e.isWinner,
        "hover:bg-red-500/20 dark:hover:bg-red-500/20": e.isLoser,
        "bg-green-500/20 dark:bg-green-500/20": e.shouldHighlight && e.isWinner,
        "bg-red-500/20 dark:bg-red-500/20": e.shouldHighlight && e.isLoser
      }]),
      onMouseenter: m,
      onMouseleave: u
    }, [
      e.canEdit && e.permissions[N(q).CAN_SELECT_TEAM] ? (c(), p("div", X, [
        l.value ? (c(), p("img", {
          key: 0,
          src: l.value,
          alt: a.value,
          class: "w-6 h-6 rounded-full"
        }, null, 8, Y)) : R("", !0),
        z(f("select", {
          "onUpdate:modelValue": h[0] || (h[0] = (s) => a.value = s),
          class: "fi-select-input p-0 w-full border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900 hover:cursor-pointer",
          onChange: T
        }, [
          h[1] || (h[1] = f("option", { value: "TBD" }, "TBD", -1)),
          (c(!0), p(A, null, $(b.value, (s) => (c(), p("option", {
            key: s.id,
            value: s.name,
            disabled: d(s.name)
          }, I(s.name), 9, _))), 128))
        ], 544), [
          [Q, a.value]
        ])
      ])) : (c(), p("div", ee, [
        e.team.logo ? (c(), p("img", {
          key: 0,
          src: e.team.logo,
          alt: e.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, te)) : R("", !0),
        f("span", ae, I(e.team.name), 1)
      ]))
    ], 34));
  }
}, ne = {
  key: 1,
  class: "text-white"
}, le = {
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
  setup(e, { emit: v }) {
    const t = e, i = v, a = k(!1), l = k(t.team.score ?? 0), d = () => {
      t.canEditScore && (a.value = !0);
    }, b = () => {
      const m = parseInt(l.value) || 0;
      i("update:score", {
        position: t.teamPosition,
        score: m
      });
    };
    return U(() => t.team, (m) => {
      l.value = m.score ?? 0;
    }, { deep: !0 }), (m, u) => (c(), p("div", {
      class: D(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", { "border-b border-orange-600 dark:border-orange-700": e.isFirstTeam }]),
      onClick: d
    }, [
      a.value ? z((c(), p("input", {
        key: 0,
        type: "number",
        "onUpdate:modelValue": u[0] || (u[0] = (T) => l.value = T),
        class: "w-12 border-none bg-orange-500 dark:bg-orange-600 text-center text-white text-base transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900",
        min: "0",
        onChange: b,
        onBlur: u[1] || (u[1] = (T) => a.value = !1)
      }, null, 544)), [
        [G, l.value]
      ]) : (c(), p("span", ne, I(e.team.score), 1))
    ], 2));
  }
}, se = { class: "flex" }, F = {
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
        [q.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:team", "update:score", "highlight-team", "unhighlight-team"],
  setup(e) {
    return (v, t) => (c(), p("div", se, [
      M(ie, {
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
        "onUpdate:team": t[0] || (t[0] = (i) => v.$emit("update:team", i)),
        onHighlightTeam: t[1] || (t[1] = (i) => v.$emit("highlight-team", i)),
        onUnhighlightTeam: t[2] || (t[2] = (i) => v.$emit("unhighlight-team"))
      }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "highlighted-team", "permissions", "can-edit", "is-winner", "is-loser", "should-highlight", "is-first-team"]),
      M(le, {
        team: e.team,
        "team-position": e.teamPosition,
        "can-edit-score": e.canEditScore,
        "is-first-team": e.isFirstTeam,
        "onUpdate:score": t[3] || (t[3] = (i) => v.$emit("update:score", i))
      }, null, 8, ["team", "team-position", "can-edit-score", "is-first-team"])
    ]));
  }
}, oe = { class: "my-1.5 ml-2.5 bg-white dark:bg-gray-900 rounded overflow-hidden w-full min-w-[200px] shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10" }, re = {
  key: 0,
  class: "absolute top-1/2 left-full w-2.5 h-[calc(100%+2px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[1px] mx-2 transition-colors duration-200"
}, me = {
  __name: "BracketMatch",
  props: {
    match: {
      type: Object,
      required: !0
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
        [q.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team"],
  setup(e, { emit: v }) {
    const t = e, i = v, a = L(() => t.roundIndex === 0), l = L(() => t.match[r.ONE].name !== O && t.match[r.TWO].name !== O), d = (s) => t.match.winner === s, b = (s) => t.match.winner && t.match.winner !== s, m = (s) => {
      const y = t.match[s].name;
      return t.highlightedTeam === y;
    }, u = (s) => {
      i("highlight-team", s);
    }, T = () => {
      i("unhighlight-team");
    }, o = ({ position: s, team: y }) => {
      const n = {
        ...t.match,
        [s]: y
      };
      i("update:match", n);
    }, h = ({ position: s, score: y }) => {
      const n = {
        ...t.match,
        [s]: {
          ...t.match[s],
          score: y
        }
      };
      n.teamOne.score > 0 || n.teamTwo.score > 0 ? n.winner = n.teamOne.score > n.teamTwo.score ? r.ONE : r.TWO : n.winner = null, i("update:match", n);
    };
    return (s, y) => (c(), p("div", {
      class: D(["relative text-[0.8em] flex items-center", { group: e.index % 2 == 0 && e.totalMatches > 1 }])
    }, [
      f("div", oe, [
        M(F, {
          team: e.match.teamOne,
          "team-position": N(r).ONE,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "can-edit": a.value,
          "can-edit-score": l.value,
          "is-winner": d(N(r).ONE),
          "is-loser": b(N(r).ONE),
          "should-highlight": m(N(r).ONE),
          "is-first-team": !0,
          "can-select-team": s.canSelectTeam,
          "highlighted-team": e.highlightedTeam,
          permissions: e.permissions,
          "onUpdate:team": o,
          "onUpdate:score": h,
          onHighlightTeam: u,
          onUnhighlightTeam: T
        }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"]),
        M(F, {
          team: e.match.teamTwo,
          "team-position": N(r).TWO,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "can-edit": a.value,
          "can-edit-score": l.value,
          "is-winner": d(N(r).TWO),
          "is-loser": b(N(r).TWO),
          "should-highlight": m(N(r).TWO),
          "can-select-team": s.canSelectTeam,
          "highlighted-team": e.highlightedTeam,
          permissions: e.permissions,
          "onUpdate:team": o,
          "onUpdate:score": h,
          onHighlightTeam: u,
          onUnhighlightTeam: T
        }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"])
      ]),
      e.index % 2 == 0 && e.totalMatches > 1 ? (c(), p("div", re, y[0] || (y[0] = [
        f("span", { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" }, null, -1)
      ]))) : R("", !0)
    ], 2));
  }
}, ue = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, ce = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50" }, Z = {
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
        [q.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team"],
  setup(e, { emit: v }) {
    const t = e, i = v, a = (l, d) => {
      i("update:match", t.columnIndex, l, d);
    };
    return (l, d) => (c(), p("div", ue, [
      (c(!0), p(A, null, $(e.column.items, (b, m) => (c(), p(A, {
        key: b.number
      }, [
        f("div", ce, I(b.number), 1),
        M(me, {
          match: b,
          index: m,
          "total-matches": e.column.items.length,
          "round-index": e.columnIndex,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "highlighted-team": e.highlightedTeam,
          permissions: e.permissions,
          "onUpdate:match": (u) => a(m, u),
          onHighlightTeam: d[0] || (d[0] = (u) => l.$emit("highlight-team", u)),
          onUnhighlightTeam: d[1] || (d[1] = (u) => l.$emit("unhighlight-team"))
        }, null, 8, ["match", "index", "total-matches", "round-index", "available-teams", "selected-teams", "highlighted-team", "permissions", "onUpdate:match"])
      ], 64))), 128))
    ]));
  }
}, de = { class: "flex justify-between px-5" }, he = { class: "flex flex-col items-center gap-2" }, ge = { class: "mt-2" }, fe = { class: "flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600" }, ve = ["onUpdate:modelValue", "onBlur"], pe = { class: "grid shrink-0 grid-cols-1 focus-within:relative" }, Te = ["value", "onChange"], be = ["value"], K = {
  __name: "BracketRoundHeaders",
  props: {
    columns: {
      type: Array,
      required: !0
    }
  },
  emits: ["update:columns"],
  setup(e, { emit: v }) {
    const t = e, i = v, a = [1, 3, 5, 7, 9], l = k(t.columns.map((m) => m.name));
    U(() => t.columns, (m) => {
      l.value = m.map((u) => u.name);
    }, { deep: !0 });
    const d = (m, u) => {
      l.value[m] = u;
      const T = [...t.columns];
      T[m] = {
        ...T[m],
        name: u
      }, i("update:columns", T);
    }, b = (m, u) => {
      const T = [...t.columns];
      T[m] = {
        ...T[m],
        bestOf: Number(u)
      }, i("update:columns", T);
    };
    return (m, u) => (c(), p("div", de, [
      (c(!0), p(A, null, $(e.columns, (T, o) => (c(), p("div", {
        key: T.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
      }, [
        f("div", he, [
          f("div", ge, [
            f("div", fe, [
              z(f("input", {
                type: "text",
                "onUpdate:modelValue": (h) => l.value[o] = h,
                onBlur: (h) => d(o, h.target.value),
                class: "block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6",
                placeholder: "0.00"
              }, null, 40, ve), [
                [G, l.value[o]]
              ]),
              f("div", pe, [
                f("select", {
                  value: T.bestOf,
                  onChange: (h) => b(o, h.target.value),
                  class: "col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                }, [
                  (c(), p(A, null, $(a, (h) => f("option", {
                    key: h,
                    value: h
                  }, " Best of " + I(h), 9, be)), 64))
                ], 40, Te),
                u[0] || (u[0] = f("svg", {
                  class: "pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4",
                  viewBox: "0 0 16 16",
                  fill: "currentColor",
                  "aria-hidden": "true",
                  "data-slot": "icon"
                }, [
                  f("path", {
                    "fill-rule": "evenodd",
                    d: "M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z",
                    "clip-rule": "evenodd"
                  })
                ], -1))
              ])
            ])
          ])
        ])
      ]))), 128))
    ]));
  }
}, ye = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, we = { class: "flex flex-col" }, Oe = { class: "overflow-x-auto" }, xe = { class: "min-w-max" }, Ee = { class: "flex flex-1 p-5" }, Ne = {
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
    }
  },
  emits: ["update:state"],
  setup(e, { emit: v }) {
    const t = v, i = e, a = k([]), l = k(null), d = L(() => {
      const s = /* @__PURE__ */ new Set();
      return a.value.forEach((y) => {
        y.items.forEach((n) => {
          n[r.ONE].name !== O && s.add(n[r.ONE].name), n[r.TWO].name !== O && s.add(n[r.TWO].name);
        });
      }), Array.from(s);
    }), b = (s) => {
      l.value = s;
    }, m = () => {
      l.value = null;
    }, u = (s, y, n) => {
      if (console.log("Updating lower match:", { roundIndex: s, matchIndex: y, updatedMatch: n }), a.value[s] && a.value[s].items) {
        if (a.value[s].items[y] = n, n.winner && s < a.value.length - 1) {
          const w = s + 1, g = Math.floor(y / 2);
          if (a.value[w] && a.value[w].items[g]) {
            const x = a.value[w].items[g], E = y % 2 === 0 ? r.ONE : r.TWO, S = n[n.winner];
            a.value[w].items[g] = {
              ...x,
              [E]: {
                id: S.id,
                name: S.name,
                logo: S.logo,
                score: 0
              }
            };
          }
        }
        o();
      }
    }, T = (s) => {
      console.log("Updating lower columns:", s), a.value = s, o();
    }, o = () => {
      console.log("Emitting lower tournament state:", a.value), t("update:state", a.value);
    }, h = () => {
      console.log("Initializing lower tournament with state:", i.initialState), i.initialState && i.initialState.length > 0 && (a.value = JSON.parse(JSON.stringify(i.initialState)));
    };
    return U(() => i.initialState, () => {
      h();
    }, { deep: !0 }), P(() => {
      h();
    }), (s, y) => (c(), p("div", ye, [
      y[0] || (y[0] = f("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, "Lower Bracket", -1)),
      f("div", we, [
        f("div", Oe, [
          f("div", xe, [
            M(K, {
              columns: a.value,
              "onUpdate:columns": T
            }, null, 8, ["columns"]),
            f("div", Ee, [
              (c(!0), p(A, null, $(a.value, (n, w) => (c(), H(Z, {
                key: n.name,
                column: n,
                "column-index": w,
                "available-teams": e.availableTeams,
                "selected-teams": d.value,
                "highlighted-team": l.value,
                "onUpdate:match": u,
                onHighlightTeam: b,
                onUnhighlightTeam: m
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team"]))), 128))
            ])
          ])
        ])
      ])
    ]));
  }
}, J = () => ({
  id: null,
  name: O,
  logo: null,
  score: 0
}), W = (e) => ({
  number: e,
  [r.ONE]: J(),
  [r.TWO]: J(),
  winner: null
}), $e = (e, v = 3) => {
  const t = [], i = Math.log2(e);
  let a = 1;
  for (let l = 0; l < i; l++) {
    const d = Math.pow(2, i - l - 1), b = [];
    for (let m = 0; m < d; m++)
      b.push(W(a++));
    t.push({
      name: `Round ${l + 1}`,
      items: b,
      bestOf: v
    });
  }
  return t;
}, V = (e, v) => {
  const t = [];
  let i = 1;
  const a = Math.pow(2, e - 2), l = {
    name: "Lower Round 1",
    bestOf: v,
    items: Array(a).fill(null).map(() => W(i++))
  };
  t.push(l);
  const d = Math.pow(2, e - 3), b = {
    name: "Lower Round 2",
    bestOf: v,
    items: Array(d).fill(null).map(() => W(i++))
  };
  if (t.push(b), e > 3) {
    const m = Math.pow(2, e - 4), u = {
      name: "Lower Round 3",
      bestOf: v,
      items: Array(m).fill(null).map(() => W(i++))
    };
    t.push(u);
  }
  return t;
}, Se = { class: "flex flex-col" }, ke = { class: "flex flex-col" }, Be = { class: "overflow-x-auto" }, Ae = { class: "min-w-max" }, Me = { class: "flex flex-1 p-5" }, Le = {
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
        [q.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:state"],
  setup(e, { emit: v }) {
    const t = v, i = e, a = k([]), l = k([]), d = k(null), b = L(() => {
      const n = /* @__PURE__ */ new Set();
      return a.value.forEach((w) => {
        w.items.forEach((g) => {
          g[r.ONE].name !== O && n.add(g[r.ONE].name), g[r.TWO].name !== O && n.add(g[r.TWO].name);
        });
      }), i.format === B.DOUBLE_ELIMINATION && l.value.forEach((w) => {
        w.items.forEach((g) => {
          g[r.ONE].name !== O && n.add(g[r.ONE].name), g[r.TWO].name !== O && n.add(g[r.TWO].name);
        });
      }), Array.from(n);
    }), m = (n) => {
      d.value = n;
    }, u = () => {
      d.value = null;
    }, T = (n, w, g) => {
      if (console.log("Updating upper match:", { roundIndex: n, matchIndex: w, updatedMatch: g }), a.value[n] && a.value[n].items) {
        if (a.value[n].items[w] = g, g.winner && n < a.value.length - 1) {
          const x = n + 1, E = Math.floor(w / 2);
          if (a.value[x] && a.value[x].items[E]) {
            const S = a.value[x].items[E], j = w % 2 === 0 ? r.ONE : r.TWO, C = g[g.winner];
            a.value[x].items[E] = {
              ...S,
              [j]: {
                id: C.id,
                name: C.name,
                logo: C.logo,
                score: 0
              }
            };
          }
        }
        if (i.format === B.DOUBLE_ELIMINATION && g.winner) {
          const x = g[g.winner === r.ONE ? r.TWO : r.ONE];
          if (x.name !== O) {
            const E = Math.floor(n / 2), S = Math.floor(w / 2);
            if (l.value[E] && l.value[E].items[S]) {
              const j = l.value[E].items[S], C = w % 2 === 0 ? r.ONE : r.TWO;
              l.value[E].items[S] = {
                ...j,
                [C]: {
                  id: x.id,
                  name: x.name,
                  logo: x.logo,
                  score: 0
                }
              };
            }
          }
        }
        s();
      }
    }, o = (n) => {
      console.log("Updating upper columns:", n), a.value = n, s();
    }, h = (n) => {
      console.log("Updating lower state:", n), l.value = n, s();
    }, s = () => {
      console.log("Emitting tournament state:", {
        upper: a.value,
        lower: i.format === B.DOUBLE_ELIMINATION ? l.value : null
      }), t("update:state", {
        upper: a.value,
        lower: i.format === B.DOUBLE_ELIMINATION ? l.value : null
      });
    }, y = () => {
      console.log("Initializing tournament with state:", i.initialState), i.initialState && (Array.isArray(i.initialState) ? (a.value = JSON.parse(JSON.stringify(i.initialState)), i.format === B.DOUBLE_ELIMINATION && (l.value = V(a.value.length, i.defaultBestOf))) : (a.value = JSON.parse(JSON.stringify(i.initialState.upper || [])), l.value = JSON.parse(JSON.stringify(i.initialState.lower || []))));
    };
    return U(() => i.initialState, () => {
      y();
    }, { deep: !0 }), U(() => i.format, (n) => {
      n === B.DOUBLE_ELIMINATION && (!l.value || l.value.length === 0) && (l.value = V(a.value.length, i.defaultBestOf), s());
    }), P(() => {
      y();
    }), (n, w) => (c(), p("div", Se, [
      w[0] || (w[0] = f("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, "Upper Bracket", -1)),
      f("div", ke, [
        f("div", Be, [
          f("div", Ae, [
            M(K, {
              columns: a.value,
              "onUpdate:columns": o
            }, null, 8, ["columns"]),
            f("div", Me, [
              (c(!0), p(A, null, $(a.value, (g, x) => (c(), H(Z, {
                key: g.name,
                column: g,
                "column-index": x,
                "available-teams": e.availableTeams,
                "selected-teams": b.value,
                "highlighted-team": d.value,
                permissions: e.permissions,
                "onUpdate:match": T,
                onHighlightTeam: m,
                onUnhighlightTeam: u
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team", "permissions"]))), 128))
            ])
          ])
        ])
      ]),
      e.format === N(B).DOUBLE_ELIMINATION ? (c(), H(Ne, {
        key: 0,
        "initial-state": l.value,
        "available-teams": e.availableTeams,
        "default-best-of": e.defaultBestOf,
        permissions: e.permissions,
        "onUpdate:state": h
      }, null, 8, ["initial-state", "available-teams", "default-best-of", "permissions"])) : R("", !0)
    ]));
  }
}, qe = (e) => {
  e.component("TournamentBracket", Le);
};
export {
  q as PERMISSIONS,
  Le as TournamentBracket,
  V as createLowerBracketStructure,
  $e as createTournamentState,
  qe as install
};
