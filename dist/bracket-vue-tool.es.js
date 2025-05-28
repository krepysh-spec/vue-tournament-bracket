import { ref as B, computed as L, watch as I, onMounted as D, createElementBlock as f, openBlock as m, normalizeClass as P, withDirectives as z, createCommentVNode as R, createElementVNode as y, Fragment as U, renderList as M, toDisplayString as q, vModelSelect as _, vModelText as K, createVNode as $, unref as S, createBlock as H } from "vue";
const k = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination"
}, w = "TBD", r = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, Q = {
  key: 0,
  class: "relative"
}, X = ["value", "disabled"], Y = ["src", "alt"], Z = {
  key: 1,
  class: "flex items-center gap-2"
}, ee = ["src", "alt"], te = { class: "text-gray-900 dark:text-white" }, ae = {
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
    const t = e, n = v, a = B(t.team.name), l = L(() => {
      var s;
      return a.value === w ? null : ((s = t.availableTeams.find((T) => T.name === a.value)) == null ? void 0 : s.logo) || null;
    });
    I(() => t.team, (s) => {
      a.value = s.name;
    }, { immediate: !0 }), D(() => {
      console.log("TeamSelect mounted:", {
        team: t.team,
        availableTeams: t.availableTeams
      });
    });
    const c = (s) => s === w ? !1 : t.selectedTeams.includes(s) && s !== t.team.name || s === t.team.name && t.team.name !== w, d = L(() => t.availableTeams ? t.availableTeams.filter((s) => s.name === w || s.name === t.team.name ? !0 : !c(s.name)) : []), h = () => {
      t.team.name !== w && n("highlight-team", t.team.name);
    }, u = () => {
      n("unhighlight-team");
    }, O = () => {
      const s = t.availableTeams.find((T) => T.name === a.value);
      console.log("Updating team:", { selectedTeam: a.value, selectedTeamData: s }), n("update:team", {
        position: t.teamPosition,
        team: {
          id: (s == null ? void 0 : s.id) || null,
          name: a.value,
          logo: (s == null ? void 0 : s.logo) || null,
          score: 0
        }
      });
    };
    return (s, T) => (m(), f("div", {
      class: P(["flex-grow p-2.5 hover:bg-gray-200 dark:hover:bg-gray-700", {
        "hover:bg-green-900/30 dark:hover:bg-green-900/30": e.isWinner,
        "hover:bg-red-900/30 dark:hover:bg-red-900/30": e.isLoser,
        "bg-green-900/30 dark:bg-green-900/30": e.shouldHighlight && e.isWinner,
        "bg-red-900/30 dark:bg-red-900/30": e.shouldHighlight && e.isLoser
      }]),
      onMouseenter: h,
      onMouseleave: u
    }, [
      e.canEdit ? (m(), f("div", Q, [
        z(y("select", {
          "onUpdate:modelValue": T[0] || (T[0] = (o) => a.value = o),
          class: "fi-select-input pl-8 w-full border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900",
          onChange: O
        }, [
          T[1] || (T[1] = y("option", { value: "TBD" }, "TBD", -1)),
          (m(!0), f(U, null, M(d.value, (o) => (m(), f("option", {
            key: o.id,
            value: o.name,
            disabled: c(o.name)
          }, q(o.name), 9, X))), 128))
        ], 544), [
          [_, a.value]
        ]),
        l.value ? (m(), f("img", {
          key: 0,
          src: l.value,
          alt: a.value,
          class: "absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
        }, null, 8, Y)) : R("", !0)
      ])) : (m(), f("div", Z, [
        e.team.logo ? (m(), f("img", {
          key: 0,
          src: e.team.logo,
          alt: e.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, ee)) : R("", !0),
        y("span", te, q(e.team.name), 1)
      ]))
    ], 34));
  }
}, ne = {
  key: 1,
  class: "text-white"
}, ie = {
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
    const t = e, n = v, a = B(!1), l = B(t.team.score ?? 0), c = () => {
      t.canEditScore && (a.value = !0);
    }, d = () => {
      const h = parseInt(l.value) || 0;
      n("update:score", {
        position: t.teamPosition,
        score: h
      });
    };
    return I(() => t.team, (h) => {
      l.value = h.score ?? 0;
    }, { deep: !0 }), (h, u) => (m(), f("div", {
      class: P(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", { "border-b border-orange-600 dark:border-orange-700": e.isFirstTeam }]),
      onClick: c
    }, [
      a.value ? z((m(), f("input", {
        key: 0,
        type: "number",
        "onUpdate:modelValue": u[0] || (u[0] = (O) => l.value = O),
        class: "w-12 bg-orange-500 dark:bg-orange-600 text-center text-white",
        min: "0",
        onChange: d,
        onBlur: u[1] || (u[1] = (O) => a.value = !1)
      }, null, 544)), [
        [K, l.value]
      ]) : (m(), f("span", ne, q(e.team.score), 1))
    ], 2));
  }
}, le = { class: "flex" }, j = {
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
    }
  },
  emits: ["update:team", "update:score", "highlight-team", "unhighlight-team"],
  setup(e) {
    return (v, t) => (m(), f("div", le, [
      $(ae, {
        team: e.team,
        "team-position": e.teamPosition,
        "available-teams": e.availableTeams,
        "selected-teams": e.selectedTeams,
        "can-edit": e.canEdit,
        "is-winner": e.isWinner,
        "is-loser": e.isLoser,
        "should-highlight": e.shouldHighlight,
        "onUpdate:team": t[0] || (t[0] = (n) => v.$emit("update:team", n)),
        onHighlightTeam: t[1] || (t[1] = (n) => v.$emit("highlight-team", n)),
        onUnhighlightTeam: t[2] || (t[2] = (n) => v.$emit("unhighlight-team"))
      }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "is-winner", "is-loser", "should-highlight"]),
      $(ie, {
        team: e.team,
        "team-position": e.teamPosition,
        "can-edit-score": e.canEditScore,
        "is-first-team": e.isFirstTeam,
        "onUpdate:score": t[3] || (t[3] = (n) => v.$emit("update:score", n))
      }, null, 8, ["team", "team-position", "can-edit-score", "is-first-team"])
    ]));
  }
}, oe = { class: "my-1.5 ml-2.5 bg-white dark:bg-gray-800 rounded overflow-hidden w-full min-w-[200px] shadow" }, se = {
  key: 0,
  class: "absolute top-1/2 left-full w-2.5 h-[calc(100%+2px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[1px] mx-2 transition-colors duration-200"
}, re = {
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
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team"],
  setup(e, { emit: v }) {
    const t = e, n = v, a = L(() => t.roundIndex === 0), l = L(() => t.match[r.ONE].name !== w && t.match[r.TWO].name !== w), c = (o) => t.match.winner === o, d = (o) => t.match.winner && t.match.winner !== o, h = (o) => {
      const b = t.match[o].name;
      return t.highlightedTeam === b;
    }, u = (o) => {
      n("highlight-team", o);
    }, O = () => {
      n("unhighlight-team");
    }, s = ({ position: o, team: b }) => {
      const i = {
        ...t.match,
        [o]: b
      };
      n("update:match", i);
    }, T = ({ position: o, score: b }) => {
      const i = {
        ...t.match,
        [o]: {
          ...t.match[o],
          score: b
        }
      };
      i.teamOne.score > 0 || i.teamTwo.score > 0 ? i.winner = i.teamOne.score > i.teamTwo.score ? r.ONE : r.TWO : i.winner = null, n("update:match", i);
    };
    return (o, b) => (m(), f("div", {
      class: P(["relative text-[0.8em] flex items-center", { group: e.index % 2 == 0 && e.totalMatches > 1 }])
    }, [
      y("div", oe, [
        $(j, {
          team: e.match.teamOne,
          "team-position": S(r).ONE,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "can-edit": a.value,
          "can-edit-score": l.value,
          "is-winner": c(S(r).ONE),
          "is-loser": d(S(r).ONE),
          "should-highlight": h(S(r).ONE),
          "is-first-team": !0,
          "onUpdate:team": s,
          "onUpdate:score": T,
          onHighlightTeam: u,
          onUnhighlightTeam: O
        }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight"]),
        $(j, {
          team: e.match.teamTwo,
          "team-position": S(r).TWO,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "can-edit": a.value,
          "can-edit-score": l.value,
          "is-winner": c(S(r).TWO),
          "is-loser": d(S(r).TWO),
          "should-highlight": h(S(r).TWO),
          "onUpdate:team": s,
          "onUpdate:score": T,
          onHighlightTeam: u,
          onUnhighlightTeam: O
        }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight"])
      ]),
      e.index % 2 == 0 && e.totalMatches > 1 ? (m(), f("div", se, b[0] || (b[0] = [
        y("span", { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" }, null, -1)
      ]))) : R("", !0)
    ], 2));
  }
}, ue = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, me = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50" }, V = {
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
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team"],
  setup(e, { emit: v }) {
    const t = e, n = v, a = (l, c) => {
      n("update:match", t.columnIndex, l, c);
    };
    return (l, c) => (m(), f("div", ue, [
      (m(!0), f(U, null, M(e.column.items, (d, h) => (m(), f(U, {
        key: d.number
      }, [
        y("div", me, q(d.number), 1),
        $(re, {
          match: d,
          index: h,
          "total-matches": e.column.items.length,
          "round-index": e.columnIndex,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "highlighted-team": e.highlightedTeam,
          "onUpdate:match": (u) => a(h, u),
          onHighlightTeam: c[0] || (c[0] = (u) => l.$emit("highlight-team", u)),
          onUnhighlightTeam: c[1] || (c[1] = (u) => l.$emit("unhighlight-team"))
        }, null, 8, ["match", "index", "total-matches", "round-index", "available-teams", "selected-teams", "highlighted-team", "onUpdate:match"])
      ], 64))), 128))
    ]));
  }
}, ce = { class: "flex justify-between px-5" }, de = { class: "flex flex-col items-center gap-2" }, he = ["value", "onInput"], ge = ["value", "onChange"], ve = ["value"], G = {
  __name: "BracketRoundHeaders",
  props: {
    columns: {
      type: Array,
      required: !0
    }
  },
  emits: ["update:columns"],
  setup(e, { emit: v }) {
    const t = e, n = v, a = [1, 3, 5, 7, 9], l = (d, h) => {
      const u = [...t.columns];
      u[d] = {
        ...u[d],
        name: h
      }, n("update:columns", u);
    }, c = (d, h) => {
      const u = [...t.columns];
      u[d] = {
        ...u[d],
        bestOf: Number(h)
      }, n("update:columns", u);
    };
    return (d, h) => (m(), f("div", ce, [
      (m(!0), f(U, null, M(e.columns, (u, O) => (m(), f("div", {
        key: u.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 bg-white dark:bg-gray-800 rounded overflow-hidden shadow"
      }, [
        y("div", de, [
          y("input", {
            value: u.name,
            onInput: (s) => l(O, s.target.value),
            class: "bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-center w-32 text-gray-900 dark:text-white"
          }, null, 40, he),
          y("select", {
            value: u.bestOf,
            onChange: (s) => c(O, s.target.value),
            class: "fi-select-input w-32border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900"
          }, [
            (m(), f(U, null, M(a, (s) => y("option", {
              key: s,
              value: s
            }, " Best of " + q(s), 9, ve)), 64))
          ], 40, ge)
        ])
      ]))), 128))
    ]));
  }
}, fe = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, be = { class: "flex flex-col" }, pe = { class: "overflow-x-auto" }, ye = { class: "min-w-max" }, Te = { class: "flex flex-1 p-5" }, we = {
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
    const t = v, n = e, a = B([]), l = B(null), c = L(() => {
      const o = /* @__PURE__ */ new Set();
      return a.value.forEach((b) => {
        b.items.forEach((i) => {
          i[r.ONE].name !== w && o.add(i[r.ONE].name), i[r.TWO].name !== w && o.add(i[r.TWO].name);
        });
      }), Array.from(o);
    }), d = (o) => {
      l.value = o;
    }, h = () => {
      l.value = null;
    }, u = (o, b, i) => {
      if (console.log("Updating lower match:", { roundIndex: o, matchIndex: b, updatedMatch: i }), a.value[o] && a.value[o].items) {
        if (a.value[o].items[b] = i, i.winner && o < a.value.length - 1) {
          const p = o + 1, g = Math.floor(b / 2);
          if (a.value[p] && a.value[p].items[g]) {
            const x = a.value[p].items[g], E = b % 2 === 0 ? r.ONE : r.TWO, N = i[i.winner];
            a.value[p].items[g] = {
              ...x,
              [E]: {
                id: N.id,
                name: N.name,
                logo: N.logo,
                score: 0
              }
            };
          }
        }
        s();
      }
    }, O = (o) => {
      console.log("Updating lower columns:", o), a.value = o, s();
    }, s = () => {
      console.log("Emitting lower tournament state:", a.value), t("update:state", a.value);
    }, T = () => {
      console.log("Initializing lower tournament with state:", n.initialState), n.initialState && n.initialState.length > 0 && (a.value = JSON.parse(JSON.stringify(n.initialState)));
    };
    return I(() => n.initialState, () => {
      T();
    }, { deep: !0 }), D(() => {
      T();
    }), (o, b) => (m(), f("div", fe, [
      b[0] || (b[0] = y("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4 px-5" }, "Lower Bracket", -1)),
      y("div", be, [
        y("div", pe, [
          y("div", ye, [
            $(G, {
              columns: a.value,
              "onUpdate:columns": O
            }, null, 8, ["columns"]),
            y("div", Te, [
              (m(!0), f(U, null, M(a.value, (i, p) => (m(), H(V, {
                key: i.name,
                column: i,
                "column-index": p,
                "available-teams": e.availableTeams,
                "selected-teams": c.value,
                "highlighted-team": l.value,
                "onUpdate:match": u,
                onHighlightTeam: d,
                onUnhighlightTeam: h
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team"]))), 128))
            ])
          ])
        ])
      ])
    ]));
  }
}, J = () => ({
  id: null,
  name: w,
  logo: null,
  score: 0
}), W = (e) => ({
  number: e,
  [r.ONE]: J(),
  [r.TWO]: J(),
  winner: null
}), Ue = (e, v = 3) => {
  const t = [], n = Math.log2(e);
  let a = 1;
  for (let l = 0; l < n; l++) {
    const c = Math.pow(2, n - l - 1), d = [];
    for (let h = 0; h < c; h++)
      d.push(W(a++));
    t.push({
      name: `Round ${l + 1}`,
      items: d,
      bestOf: v
    });
  }
  return t;
}, F = (e, v) => {
  const t = [];
  let n = 1;
  const a = Math.pow(2, e - 2), l = {
    name: "Lower Round 1",
    bestOf: v,
    items: Array(a).fill(null).map(() => W(n++))
  };
  t.push(l);
  const c = Math.pow(2, e - 3), d = {
    name: "Lower Round 2",
    bestOf: v,
    items: Array(c).fill(null).map(() => W(n++))
  };
  if (t.push(d), e > 3) {
    const h = Math.pow(2, e - 4), u = {
      name: "Lower Round 3",
      bestOf: v,
      items: Array(h).fill(null).map(() => W(n++))
    };
    t.push(u);
  }
  return t;
}, Oe = { class: "flex flex-col" }, xe = { class: "flex flex-col" }, Ee = { class: "overflow-x-auto" }, Ne = { class: "min-w-max" }, ke = { class: "flex flex-1 p-5" }, Se = {
  __name: "TournamentBracket",
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
    format: {
      type: String,
      default: k.SINGLE_ELIMINATION,
      validator: (e) => Object.values(k).includes(e)
    }
  },
  emits: ["update:state"],
  setup(e, { emit: v }) {
    const t = v, n = e, a = B([]), l = B([]), c = B(null), d = L(() => {
      const i = /* @__PURE__ */ new Set();
      return a.value.forEach((p) => {
        p.items.forEach((g) => {
          g[r.ONE].name !== w && i.add(g[r.ONE].name), g[r.TWO].name !== w && i.add(g[r.TWO].name);
        });
      }), n.format === k.DOUBLE_ELIMINATION && l.value.forEach((p) => {
        p.items.forEach((g) => {
          g[r.ONE].name !== w && i.add(g[r.ONE].name), g[r.TWO].name !== w && i.add(g[r.TWO].name);
        });
      }), Array.from(i);
    }), h = (i) => {
      c.value = i;
    }, u = () => {
      c.value = null;
    }, O = (i, p, g) => {
      if (console.log("Updating upper match:", { roundIndex: i, matchIndex: p, updatedMatch: g }), a.value[i] && a.value[i].items) {
        if (a.value[i].items[p] = g, g.winner && i < a.value.length - 1) {
          const x = i + 1, E = Math.floor(p / 2);
          if (a.value[x] && a.value[x].items[E]) {
            const N = a.value[x].items[E], C = p % 2 === 0 ? r.ONE : r.TWO, A = g[g.winner];
            a.value[x].items[E] = {
              ...N,
              [C]: {
                id: A.id,
                name: A.name,
                logo: A.logo,
                score: 0
              }
            };
          }
        }
        if (n.format === k.DOUBLE_ELIMINATION && g.winner) {
          const x = g[g.winner === r.ONE ? r.TWO : r.ONE];
          if (x.name !== w) {
            const E = Math.floor(i / 2), N = Math.floor(p / 2);
            if (l.value[E] && l.value[E].items[N]) {
              const C = l.value[E].items[N], A = p % 2 === 0 ? r.ONE : r.TWO;
              l.value[E].items[N] = {
                ...C,
                [A]: {
                  id: x.id,
                  name: x.name,
                  logo: x.logo,
                  score: 0
                }
              };
            }
          }
        }
        o();
      }
    }, s = (i) => {
      console.log("Updating upper columns:", i), a.value = i, o();
    }, T = (i) => {
      console.log("Updating lower state:", i), l.value = i, o();
    }, o = () => {
      console.log("Emitting tournament state:", {
        upper: a.value,
        lower: n.format === k.DOUBLE_ELIMINATION ? l.value : null
      }), t("update:state", {
        upper: a.value,
        lower: n.format === k.DOUBLE_ELIMINATION ? l.value : null
      });
    }, b = () => {
      console.log("Initializing tournament with state:", n.initialState), n.initialState && (Array.isArray(n.initialState) ? (a.value = JSON.parse(JSON.stringify(n.initialState)), n.format === k.DOUBLE_ELIMINATION && (l.value = F(a.value.length, n.defaultBestOf))) : (a.value = JSON.parse(JSON.stringify(n.initialState.upper || [])), l.value = JSON.parse(JSON.stringify(n.initialState.lower || []))));
    };
    return I(() => n.initialState, () => {
      b();
    }, { deep: !0 }), I(() => n.format, (i) => {
      i === k.DOUBLE_ELIMINATION && (!l.value || l.value.length === 0) && (l.value = F(a.value.length, n.defaultBestOf), o());
    }), D(() => {
      b();
    }), (i, p) => (m(), f("div", Oe, [
      p[0] || (p[0] = y("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4 px-5" }, "Upper Bracket", -1)),
      y("div", xe, [
        y("div", Ee, [
          y("div", Ne, [
            $(G, {
              columns: a.value,
              "onUpdate:columns": s
            }, null, 8, ["columns"]),
            y("div", ke, [
              (m(!0), f(U, null, M(a.value, (g, x) => (m(), H(V, {
                key: g.name,
                column: g,
                "column-index": x,
                "available-teams": e.availableTeams,
                "selected-teams": d.value,
                "highlighted-team": c.value,
                "onUpdate:match": O,
                onHighlightTeam: h,
                onUnhighlightTeam: u
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team"]))), 128))
            ])
          ])
        ])
      ]),
      e.format === S(k).DOUBLE_ELIMINATION ? (m(), H(we, {
        key: 0,
        "initial-state": l.value,
        "available-teams": e.availableTeams,
        "default-best-of": e.defaultBestOf,
        "onUpdate:state": T
      }, null, 8, ["initial-state", "available-teams", "default-best-of"])) : R("", !0)
    ]));
  }
}, $e = (e) => {
  e.component("TournamentBracket", Se);
};
export {
  Se as TournamentBracket,
  F as createLowerBracketStructure,
  Ue as createTournamentState,
  $e as install
};
