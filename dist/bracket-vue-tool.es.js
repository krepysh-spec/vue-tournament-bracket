import { ref as S, computed as U, watch as L, onMounted as P, createElementBlock as v, openBlock as c, normalizeClass as D, unref as N, createCommentVNode as R, withDirectives as F, createElementVNode as p, Fragment as B, renderList as $, toDisplayString as C, vModelSelect as X, vModelText as G, createVNode as M, createBlock as H } from "vue";
const A = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination"
}, O = "TBD", r = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, q = {
  CAN_SELECT_TEAM: "can-select-team"
}, Y = {
  key: 0,
  class: "flex items-center gap-2"
}, Z = ["src", "alt"], _ = ["value", "disabled"], ee = {
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
  setup(e, { emit: f }) {
    const t = e, i = f, a = S(t.team.name), l = U(() => {
      var o;
      return a.value === O ? null : ((o = t.availableTeams.find((h) => h.name === a.value)) == null ? void 0 : o.logo) || null;
    });
    L(() => t.team, (o) => {
      a.value = o.name;
    }, { immediate: !0 }), P(() => {
      console.log("TeamSelect mounted:", {
        team: t.team,
        availableTeams: t.availableTeams
      });
    });
    const d = (o) => o === O ? !1 : t.selectedTeams.includes(o) && o !== t.team.name || o === t.team.name && t.team.name !== O, T = U(() => t.availableTeams ? t.availableTeams.filter((o) => o.name === O || o.name === t.team.name ? !0 : !d(o.name)) : []), m = () => {
      t.team.name !== O && i("highlight-team", t.team.name);
    }, u = () => {
      i("unhighlight-team");
    }, b = () => {
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
    return (o, h) => (c(), v("div", {
      class: D(["flex-grow p-2.5 hover:bg-gray-200/30 dark:hover:bg-gray-950/20", {
        "hover:bg-green-500/20 dark:hover:bg-green-500/20": e.isWinner,
        "hover:bg-red-500/20 dark:hover:bg-red-500/20": e.isLoser,
        "bg-green-500/20 dark:bg-green-500/20": e.shouldHighlight && e.isWinner,
        "bg-red-500/20 dark:bg-red-500/20": e.shouldHighlight && e.isLoser
      }]),
      onMouseenter: m,
      onMouseleave: u
    }, [
      e.canEdit && e.permissions[N(q).CAN_SELECT_TEAM] ? (c(), v("div", Y, [
        l.value ? (c(), v("img", {
          key: 0,
          src: l.value,
          alt: a.value,
          class: "w-6 h-6 rounded-full"
        }, null, 8, Z)) : R("", !0),
        F(p("select", {
          "onUpdate:modelValue": h[0] || (h[0] = (s) => a.value = s),
          class: "fi-select-input p-0 w-full border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900 hover:cursor-pointer",
          onChange: b
        }, [
          h[1] || (h[1] = p("option", { value: "TBD" }, "TBD", -1)),
          (c(!0), v(B, null, $(T.value, (s) => (c(), v("option", {
            key: s.id,
            value: s.name,
            disabled: d(s.name)
          }, C(s.name), 9, _))), 128))
        ], 544), [
          [X, a.value]
        ])
      ])) : (c(), v("div", ee, [
        e.team.logo ? (c(), v("img", {
          key: 0,
          src: e.team.logo,
          alt: e.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, te)) : R("", !0),
        p("span", ae, C(e.team.name), 1)
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
  setup(e, { emit: f }) {
    const t = e, i = f, a = S(!1), l = S(t.team.score ?? 0), d = () => {
      t.canEditScore && (a.value = !0);
    }, T = () => {
      const m = parseInt(l.value) || 0;
      i("update:score", {
        position: t.teamPosition,
        score: m
      });
    };
    return L(() => t.team, (m) => {
      l.value = m.score ?? 0;
    }, { deep: !0 }), (m, u) => (c(), v("div", {
      class: D(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", { "border-b border-orange-600 dark:border-orange-700": e.isFirstTeam }]),
      onClick: d
    }, [
      a.value ? F((c(), v("input", {
        key: 0,
        type: "number",
        "onUpdate:modelValue": u[0] || (u[0] = (b) => l.value = b),
        class: "w-12 border-none bg-orange-500 dark:bg-orange-600 text-center text-white text-base transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900",
        min: "0",
        onChange: T,
        onBlur: u[1] || (u[1] = (b) => a.value = !1)
      }, null, 544)), [
        [G, l.value]
      ]) : (c(), v("span", ne, C(e.team.score), 1))
    ], 2));
  }
}, se = { class: "flex" }, J = {
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
    return (f, t) => (c(), v("div", se, [
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
        "onUpdate:team": t[0] || (t[0] = (i) => f.$emit("update:team", i)),
        onHighlightTeam: t[1] || (t[1] = (i) => f.$emit("highlight-team", i)),
        onUnhighlightTeam: t[2] || (t[2] = (i) => f.$emit("unhighlight-team"))
      }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "highlighted-team", "permissions", "can-edit", "is-winner", "is-loser", "should-highlight", "is-first-team"]),
      M(le, {
        team: e.team,
        "team-position": e.teamPosition,
        "can-edit-score": e.canEditScore,
        "is-first-team": e.isFirstTeam,
        "onUpdate:score": t[3] || (t[3] = (i) => f.$emit("update:score", i))
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
  setup(e, { emit: f }) {
    const t = e, i = f, a = U(() => t.roundIndex === 0), l = U(() => t.match[r.ONE].name !== O && t.match[r.TWO].name !== O), d = (s) => t.match.winner === s, T = (s) => t.match.winner && t.match.winner !== s, m = (s) => {
      const y = t.match[s].name;
      return t.highlightedTeam === y;
    }, u = (s) => {
      i("highlight-team", s);
    }, b = () => {
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
    return (s, y) => (c(), v("div", {
      class: D(["relative text-[0.8em] flex items-center", { group: e.index % 2 == 0 && e.totalMatches > 1 }])
    }, [
      p("div", oe, [
        M(J, {
          team: e.match.teamOne,
          "team-position": N(r).ONE,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "can-edit": a.value,
          "can-edit-score": l.value,
          "is-winner": d(N(r).ONE),
          "is-loser": T(N(r).ONE),
          "should-highlight": m(N(r).ONE),
          "is-first-team": !0,
          "can-select-team": s.canSelectTeam,
          "highlighted-team": e.highlightedTeam,
          permissions: e.permissions,
          "onUpdate:team": o,
          "onUpdate:score": h,
          onHighlightTeam: u,
          onUnhighlightTeam: b
        }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"]),
        M(J, {
          team: e.match.teamTwo,
          "team-position": N(r).TWO,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "can-edit": a.value,
          "can-edit-score": l.value,
          "is-winner": d(N(r).TWO),
          "is-loser": T(N(r).TWO),
          "should-highlight": m(N(r).TWO),
          "can-select-team": s.canSelectTeam,
          "highlighted-team": e.highlightedTeam,
          permissions: e.permissions,
          "onUpdate:team": o,
          "onUpdate:score": h,
          onHighlightTeam: u,
          onUnhighlightTeam: b
        }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"])
      ]),
      e.index % 2 == 0 && e.totalMatches > 1 ? (c(), v("div", re, y[0] || (y[0] = [
        p("span", { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" }, null, -1)
      ]))) : R("", !0)
    ], 2));
  }
}, ue = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, ce = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50" }, K = {
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
  setup(e, { emit: f }) {
    const t = e, i = f, a = (l, d) => {
      i("update:match", t.columnIndex, l, d);
    };
    return (l, d) => (c(), v("div", ue, [
      (c(!0), v(B, null, $(e.column.items, (T, m) => (c(), v(B, {
        key: T.number
      }, [
        p("div", ce, C(T.number), 1),
        M(me, {
          match: T,
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
}, de = { class: "flex justify-between px-5" }, he = { class: "flex flex-col items-center gap-2" }, ge = { class: "mt-2" }, fe = { class: "flex items-center rounded-md bg-white dark:bg-gray-900" }, ve = ["onUpdate:modelValue", "onBlur"], pe = { class: "grid shrink-0 grid-cols-1 focus-within:relative" }, be = ["value", "onChange"], Te = ["value"], Q = {
  __name: "BracketRoundHeaders",
  props: {
    columns: {
      type: Array,
      required: !0
    }
  },
  emits: ["update:columns"],
  setup(e, { emit: f }) {
    const t = e, i = f, a = [1, 3, 5, 7, 9], l = S(t.columns.map((m) => m.name));
    L(() => t.columns, (m) => {
      l.value = m.map((u) => u.name);
    }, { deep: !0 });
    const d = (m, u) => {
      l.value[m] = u;
      const b = [...t.columns];
      b[m] = {
        ...b[m],
        name: u
      }, i("update:columns", b);
    }, T = (m, u) => {
      const b = [...t.columns];
      b[m] = {
        ...b[m],
        bestOf: Number(u)
      }, i("update:columns", b);
    };
    return (m, u) => (c(), v("div", de, [
      (c(!0), v(B, null, $(e.columns, (b, o) => (c(), v("div", {
        key: b.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
      }, [
        p("div", he, [
          p("div", ge, [
            p("div", fe, [
              F(p("input", {
                type: "text",
                "onUpdate:modelValue": (h) => l.value[o] = h,
                onBlur: (h) => d(o, h.target.value),
                class: "block min-w-0 grow py-1.5 pr-3 text-gray-800 dark:text-white border-none pl-1 text-base text-gray-900 bg-white dark:bg-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              }, null, 40, ve), [
                [G, l.value[o]]
              ]),
              p("div", pe, [
                p("select", {
                  value: b.bestOf,
                  onChange: (h) => T(o, h.target.value),
                  class: "col-start-1 row-start-1 w-full text-gray-800 dark:text-white appearance-none py-1.5 bg-white dark:bg-gray-900 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                }, [
                  (c(), v(B, null, $(a, (h) => p("option", {
                    key: h,
                    value: h
                  }, " Best of " + C(h), 9, Te)), 64))
                ], 40, be)
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
  setup(e, { emit: f }) {
    const t = f, i = e, a = S([]), l = S(null), d = U(() => {
      const s = /* @__PURE__ */ new Set();
      return a.value.forEach((y) => {
        y.items.forEach((n) => {
          n[r.ONE].name !== O && s.add(n[r.ONE].name), n[r.TWO].name !== O && s.add(n[r.TWO].name);
        });
      }), Array.from(s);
    }), T = (s) => {
      l.value = s;
    }, m = () => {
      l.value = null;
    }, u = (s, y, n) => {
      if (console.log("Updating lower match:", { roundIndex: s, matchIndex: y, updatedMatch: n }), a.value[s] && a.value[s].items) {
        if (a.value[s].items[y] = n, n.winner && s < a.value.length - 1) {
          const w = s + 1, g = Math.floor(y / 2);
          if (a.value[w] && a.value[w].items[g]) {
            const x = a.value[w].items[g], E = y % 2 === 0 ? r.ONE : r.TWO, k = n[n.winner];
            a.value[w].items[g] = {
              ...x,
              [E]: {
                id: k.id,
                name: k.name,
                logo: k.logo,
                score: 0
              }
            };
          }
        }
        o();
      }
    }, b = (s) => {
      console.log("Updating lower columns:", s), a.value = s, o();
    }, o = () => {
      console.log("Emitting lower tournament state:", a.value), t("update:state", a.value);
    }, h = () => {
      console.log("Initializing lower tournament with state:", i.initialState), i.initialState && i.initialState.length > 0 && (a.value = JSON.parse(JSON.stringify(i.initialState)));
    };
    return L(() => i.initialState, () => {
      h();
    }, { deep: !0 }), P(() => {
      h();
    }), (s, y) => (c(), v("div", ye, [
      y[0] || (y[0] = p("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, "Lower Bracket", -1)),
      p("div", we, [
        p("div", Oe, [
          p("div", xe, [
            M(Q, {
              columns: a.value,
              "onUpdate:columns": b
            }, null, 8, ["columns"]),
            p("div", Ee, [
              (c(!0), v(B, null, $(a.value, (n, w) => (c(), H(K, {
                key: n.name,
                column: n,
                "column-index": w,
                "available-teams": e.availableTeams,
                "selected-teams": d.value,
                "highlighted-team": l.value,
                "onUpdate:match": u,
                onHighlightTeam: T,
                onUnhighlightTeam: m
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team"]))), 128))
            ])
          ])
        ])
      ])
    ]));
  }
}, V = () => ({
  id: null,
  name: O,
  logo: null,
  score: 0
}), W = (e) => ({
  number: e,
  [r.ONE]: V(),
  [r.TWO]: V(),
  winner: null
}), $e = (e, f = 3) => {
  const t = [], i = Math.log2(e);
  let a = 1;
  for (let l = 0; l < i; l++) {
    const d = Math.pow(2, i - l - 1), T = [];
    for (let m = 0; m < d; m++)
      T.push(W(a++));
    t.push({
      name: `Round ${l + 1}`,
      items: T,
      bestOf: f
    });
  }
  return t;
}, z = (e, f) => {
  const t = [];
  let i = 1;
  const a = Math.pow(2, e - 2), l = {
    name: "Lower Round 1",
    bestOf: f,
    items: Array(a).fill(null).map(() => W(i++))
  };
  t.push(l);
  const d = Math.pow(2, e - 3), T = {
    name: "Lower Round 2",
    bestOf: f,
    items: Array(d).fill(null).map(() => W(i++))
  };
  if (t.push(T), e > 3) {
    const m = Math.pow(2, e - 4), u = {
      name: "Lower Round 3",
      bestOf: f,
      items: Array(m).fill(null).map(() => W(i++))
    };
    t.push(u);
  }
  return t;
}, ke = { class: "flex flex-col" }, Se = { class: "flex flex-col" }, Ae = { class: "overflow-x-auto" }, Be = { class: "min-w-max" }, Me = { class: "flex flex-1 p-5" }, Ue = {
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
  setup(e, { emit: f }) {
    const t = f, i = e, a = S([]), l = S([]), d = S(null), T = U(() => {
      const n = /* @__PURE__ */ new Set();
      return a.value.forEach((w) => {
        w.items.forEach((g) => {
          g[r.ONE].name !== O && n.add(g[r.ONE].name), g[r.TWO].name !== O && n.add(g[r.TWO].name);
        });
      }), i.format === A.DOUBLE_ELIMINATION && l.value.forEach((w) => {
        w.items.forEach((g) => {
          g[r.ONE].name !== O && n.add(g[r.ONE].name), g[r.TWO].name !== O && n.add(g[r.TWO].name);
        });
      }), Array.from(n);
    }), m = (n) => {
      d.value = n;
    }, u = () => {
      d.value = null;
    }, b = (n, w, g) => {
      if (console.log("Updating upper match:", { roundIndex: n, matchIndex: w, updatedMatch: g }), a.value[n] && a.value[n].items) {
        if (a.value[n].items[w] = g, g.winner && n < a.value.length - 1) {
          const x = n + 1, E = Math.floor(w / 2);
          if (a.value[x] && a.value[x].items[E]) {
            const k = a.value[x].items[E], j = w % 2 === 0 ? r.ONE : r.TWO, I = g[g.winner];
            a.value[x].items[E] = {
              ...k,
              [j]: {
                id: I.id,
                name: I.name,
                logo: I.logo,
                score: 0
              }
            };
          }
        }
        if (i.format === A.DOUBLE_ELIMINATION && g.winner) {
          const x = g[g.winner === r.ONE ? r.TWO : r.ONE];
          if (x.name !== O) {
            const E = Math.floor(n / 2), k = Math.floor(w / 2);
            if (l.value[E] && l.value[E].items[k]) {
              const j = l.value[E].items[k], I = w % 2 === 0 ? r.ONE : r.TWO;
              l.value[E].items[k] = {
                ...j,
                [I]: {
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
        lower: i.format === A.DOUBLE_ELIMINATION ? l.value : null
      }), t("update:state", {
        upper: a.value,
        lower: i.format === A.DOUBLE_ELIMINATION ? l.value : null
      });
    }, y = () => {
      console.log("Initializing tournament with state:", i.initialState), i.initialState && (Array.isArray(i.initialState) ? (a.value = JSON.parse(JSON.stringify(i.initialState)), i.format === A.DOUBLE_ELIMINATION && (l.value = z(a.value.length, i.defaultBestOf))) : (a.value = JSON.parse(JSON.stringify(i.initialState.upper || [])), l.value = JSON.parse(JSON.stringify(i.initialState.lower || []))));
    };
    return L(() => i.initialState, () => {
      y();
    }, { deep: !0 }), L(() => i.format, (n) => {
      n === A.DOUBLE_ELIMINATION && (!l.value || l.value.length === 0) && (l.value = z(a.value.length, i.defaultBestOf), s());
    }), P(() => {
      y();
    }), (n, w) => (c(), v("div", ke, [
      w[0] || (w[0] = p("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, "Upper Bracket", -1)),
      p("div", Se, [
        p("div", Ae, [
          p("div", Be, [
            M(Q, {
              columns: a.value,
              "onUpdate:columns": o
            }, null, 8, ["columns"]),
            p("div", Me, [
              (c(!0), v(B, null, $(a.value, (g, x) => (c(), H(K, {
                key: g.name,
                column: g,
                "column-index": x,
                "available-teams": e.availableTeams,
                "selected-teams": T.value,
                "highlighted-team": d.value,
                permissions: e.permissions,
                "onUpdate:match": b,
                onHighlightTeam: m,
                onUnhighlightTeam: u
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team", "permissions"]))), 128))
            ])
          ])
        ])
      ]),
      e.format === N(A).DOUBLE_ELIMINATION ? (c(), H(Ne, {
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
  e.component("TournamentBracket", Ue);
};
export {
  q as PERMISSIONS,
  Ue as TournamentBracket,
  z as createLowerBracketStructure,
  $e as createTournamentState,
  qe as install
};
