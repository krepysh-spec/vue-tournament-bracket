import { ref as B, computed as L, watch as M, onMounted as D, createElementBlock as v, openBlock as c, normalizeClass as P, createCommentVNode as R, withDirectives as j, createElementVNode as w, Fragment as U, renderList as A, toDisplayString as q, vModelSelect as K, vModelText as z, createVNode as $, unref as S, createBlock as H } from "vue";
const N = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination"
}, x = "TBD", r = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, Q = {
  key: 0,
  class: "flex items-center gap-2"
}, X = ["src", "alt"], Y = ["value", "disabled"], Z = {
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
  setup(e, { emit: f }) {
    const t = e, n = f, a = B(t.team.name), i = L(() => {
      var s;
      return a.value === x ? null : ((s = t.availableTeams.find((g) => g.name === a.value)) == null ? void 0 : s.logo) || null;
    });
    M(() => t.team, (s) => {
      a.value = s.name;
    }, { immediate: !0 }), D(() => {
      console.log("TeamSelect mounted:", {
        team: t.team,
        availableTeams: t.availableTeams
      });
    });
    const d = (s) => s === x ? !1 : t.selectedTeams.includes(s) && s !== t.team.name || s === t.team.name && t.team.name !== x, p = L(() => t.availableTeams ? t.availableTeams.filter((s) => s.name === x || s.name === t.team.name ? !0 : !d(s.name)) : []), m = () => {
      t.team.name !== x && n("highlight-team", t.team.name);
    }, u = () => {
      n("unhighlight-team");
    }, b = () => {
      const s = t.availableTeams.find((g) => g.name === a.value);
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
    return (s, g) => (c(), v("div", {
      class: P(["flex-grow p-2.5 hover:bg-gray-200 dark:hover:bg-gray-700", {
        "hover:bg-green-900/30 dark:hover:bg-green-900/30": e.isWinner,
        "hover:bg-red-900/30 dark:hover:bg-red-900/30": e.isLoser,
        "bg-green-900/30 dark:bg-green-900/30": e.shouldHighlight && e.isWinner,
        "bg-red-900/30 dark:bg-red-900/30": e.shouldHighlight && e.isLoser
      }]),
      onMouseenter: m,
      onMouseleave: u
    }, [
      e.canEdit ? (c(), v("div", Q, [
        i.value ? (c(), v("img", {
          key: 0,
          src: i.value,
          alt: a.value,
          class: "w-6 h-6 rounded-full"
        }, null, 8, X)) : R("", !0),
        j(w("select", {
          "onUpdate:modelValue": g[0] || (g[0] = (o) => a.value = o),
          class: "fi-select-input p-0 w-full border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900",
          onChange: b
        }, [
          g[1] || (g[1] = w("option", { value: "TBD" }, "TBD", -1)),
          (c(!0), v(U, null, A(p.value, (o) => (c(), v("option", {
            key: o.id,
            value: o.name,
            disabled: d(o.name)
          }, q(o.name), 9, Y))), 128))
        ], 544), [
          [K, a.value]
        ])
      ])) : (c(), v("div", Z, [
        e.team.logo ? (c(), v("img", {
          key: 0,
          src: e.team.logo,
          alt: e.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, ee)) : R("", !0),
        w("span", te, q(e.team.name), 1)
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
    const t = e, n = f, a = B(!1), i = B(t.team.score ?? 0), d = () => {
      t.canEditScore && (a.value = !0);
    }, p = () => {
      const m = parseInt(i.value) || 0;
      n("update:score", {
        position: t.teamPosition,
        score: m
      });
    };
    return M(() => t.team, (m) => {
      i.value = m.score ?? 0;
    }, { deep: !0 }), (m, u) => (c(), v("div", {
      class: P(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", { "border-b border-orange-600 dark:border-orange-700": e.isFirstTeam }]),
      onClick: d
    }, [
      a.value ? j((c(), v("input", {
        key: 0,
        type: "number",
        "onUpdate:modelValue": u[0] || (u[0] = (b) => i.value = b),
        class: "w-12 border-none bg-orange-500 dark:bg-orange-600 text-center text-white text-base transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900",
        min: "0",
        onChange: p,
        onBlur: u[1] || (u[1] = (b) => a.value = !1)
      }, null, 544)), [
        [z, i.value]
      ]) : (c(), v("span", ne, q(e.team.score), 1))
    ], 2));
  }
}, ie = { class: "flex" }, J = {
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
    return (f, t) => (c(), v("div", ie, [
      $(ae, {
        team: e.team,
        "team-position": e.teamPosition,
        "available-teams": e.availableTeams,
        "selected-teams": e.selectedTeams,
        "can-edit": e.canEdit,
        "is-winner": e.isWinner,
        "is-loser": e.isLoser,
        "should-highlight": e.shouldHighlight,
        "onUpdate:team": t[0] || (t[0] = (n) => f.$emit("update:team", n)),
        onHighlightTeam: t[1] || (t[1] = (n) => f.$emit("highlight-team", n)),
        onUnhighlightTeam: t[2] || (t[2] = (n) => f.$emit("unhighlight-team"))
      }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "is-winner", "is-loser", "should-highlight"]),
      $(le, {
        team: e.team,
        "team-position": e.teamPosition,
        "can-edit-score": e.canEditScore,
        "is-first-team": e.isFirstTeam,
        "onUpdate:score": t[3] || (t[3] = (n) => f.$emit("update:score", n))
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
  setup(e, { emit: f }) {
    const t = e, n = f, a = L(() => t.roundIndex === 0), i = L(() => t.match[r.ONE].name !== x && t.match[r.TWO].name !== x), d = (o) => t.match.winner === o, p = (o) => t.match.winner && t.match.winner !== o, m = (o) => {
      const y = t.match[o].name;
      return t.highlightedTeam === y;
    }, u = (o) => {
      n("highlight-team", o);
    }, b = () => {
      n("unhighlight-team");
    }, s = ({ position: o, team: y }) => {
      const l = {
        ...t.match,
        [o]: y
      };
      n("update:match", l);
    }, g = ({ position: o, score: y }) => {
      const l = {
        ...t.match,
        [o]: {
          ...t.match[o],
          score: y
        }
      };
      l.teamOne.score > 0 || l.teamTwo.score > 0 ? l.winner = l.teamOne.score > l.teamTwo.score ? r.ONE : r.TWO : l.winner = null, n("update:match", l);
    };
    return (o, y) => (c(), v("div", {
      class: P(["relative text-[0.8em] flex items-center", { group: e.index % 2 == 0 && e.totalMatches > 1 }])
    }, [
      w("div", oe, [
        $(J, {
          team: e.match.teamOne,
          "team-position": S(r).ONE,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "can-edit": a.value,
          "can-edit-score": i.value,
          "is-winner": d(S(r).ONE),
          "is-loser": p(S(r).ONE),
          "should-highlight": m(S(r).ONE),
          "is-first-team": !0,
          "onUpdate:team": s,
          "onUpdate:score": g,
          onHighlightTeam: u,
          onUnhighlightTeam: b
        }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight"]),
        $(J, {
          team: e.match.teamTwo,
          "team-position": S(r).TWO,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "can-edit": a.value,
          "can-edit-score": i.value,
          "is-winner": d(S(r).TWO),
          "is-loser": p(S(r).TWO),
          "should-highlight": m(S(r).TWO),
          "onUpdate:team": s,
          "onUpdate:score": g,
          onHighlightTeam: u,
          onUnhighlightTeam: b
        }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight"])
      ]),
      e.index % 2 == 0 && e.totalMatches > 1 ? (c(), v("div", se, y[0] || (y[0] = [
        w("span", { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" }, null, -1)
      ]))) : R("", !0)
    ], 2));
  }
}, me = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, ue = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50" }, _ = {
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
  setup(e, { emit: f }) {
    const t = e, n = f, a = (i, d) => {
      n("update:match", t.columnIndex, i, d);
    };
    return (i, d) => (c(), v("div", me, [
      (c(!0), v(U, null, A(e.column.items, (p, m) => (c(), v(U, {
        key: p.number
      }, [
        w("div", ue, q(p.number), 1),
        $(re, {
          match: p,
          index: m,
          "total-matches": e.column.items.length,
          "round-index": e.columnIndex,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "highlighted-team": e.highlightedTeam,
          "onUpdate:match": (u) => a(m, u),
          onHighlightTeam: d[0] || (d[0] = (u) => i.$emit("highlight-team", u)),
          onUnhighlightTeam: d[1] || (d[1] = (u) => i.$emit("unhighlight-team"))
        }, null, 8, ["match", "index", "total-matches", "round-index", "available-teams", "selected-teams", "highlighted-team", "onUpdate:match"])
      ], 64))), 128))
    ]));
  }
}, ce = { class: "flex justify-between px-5" }, de = { class: "flex flex-col items-center gap-2" }, ge = ["onUpdate:modelValue", "onBlur"], he = ["value", "onChange"], fe = ["value"], G = {
  __name: "BracketRoundHeaders",
  props: {
    columns: {
      type: Array,
      required: !0
    }
  },
  emits: ["update:columns"],
  setup(e, { emit: f }) {
    const t = e, n = f, a = [1, 3, 5, 7, 9], i = B(t.columns.map((m) => m.name));
    M(() => t.columns, (m) => {
      i.value = m.map((u) => u.name);
    }, { deep: !0 });
    const d = (m, u) => {
      i.value[m] = u;
      const b = [...t.columns];
      b[m] = {
        ...b[m],
        name: u
      }, n("update:columns", b);
    }, p = (m, u) => {
      const b = [...t.columns];
      b[m] = {
        ...b[m],
        bestOf: Number(u)
      }, n("update:columns", b);
    };
    return (m, u) => (c(), v("div", ce, [
      (c(!0), v(U, null, A(e.columns, (b, s) => (c(), v("div", {
        key: b.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
      }, [
        w("div", de, [
          j(w("input", {
            "onUpdate:modelValue": (g) => i.value[s] = g,
            onBlur: (g) => d(s, g.target.value),
            class: "bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-center w-32 text-gray-900 dark:text-white"
          }, null, 40, ge), [
            [z, i.value[s]]
          ]),
          w("select", {
            value: b.bestOf,
            onChange: (g) => p(s, g.target.value),
            class: "fi-select-input w-32border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900"
          }, [
            (c(), v(U, null, A(a, (g) => w("option", {
              key: g,
              value: g
            }, " Best of " + q(g), 9, fe)), 64))
          ], 40, he)
        ])
      ]))), 128))
    ]));
  }
}, ve = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, be = { class: "flex flex-col" }, pe = { class: "overflow-x-auto" }, ye = { class: "min-w-max" }, Te = { class: "flex flex-1 p-5" }, we = {
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
    const t = f, n = e, a = B([]), i = B(null), d = L(() => {
      const o = /* @__PURE__ */ new Set();
      return a.value.forEach((y) => {
        y.items.forEach((l) => {
          l[r.ONE].name !== x && o.add(l[r.ONE].name), l[r.TWO].name !== x && o.add(l[r.TWO].name);
        });
      }), Array.from(o);
    }), p = (o) => {
      i.value = o;
    }, m = () => {
      i.value = null;
    }, u = (o, y, l) => {
      if (console.log("Updating lower match:", { roundIndex: o, matchIndex: y, updatedMatch: l }), a.value[o] && a.value[o].items) {
        if (a.value[o].items[y] = l, l.winner && o < a.value.length - 1) {
          const T = o + 1, h = Math.floor(y / 2);
          if (a.value[T] && a.value[T].items[h]) {
            const O = a.value[T].items[h], k = y % 2 === 0 ? r.ONE : r.TWO, E = l[l.winner];
            a.value[T].items[h] = {
              ...O,
              [k]: {
                id: E.id,
                name: E.name,
                logo: E.logo,
                score: 0
              }
            };
          }
        }
        s();
      }
    }, b = (o) => {
      console.log("Updating lower columns:", o), a.value = o, s();
    }, s = () => {
      console.log("Emitting lower tournament state:", a.value), t("update:state", a.value);
    }, g = () => {
      console.log("Initializing lower tournament with state:", n.initialState), n.initialState && n.initialState.length > 0 && (a.value = JSON.parse(JSON.stringify(n.initialState)));
    };
    return M(() => n.initialState, () => {
      g();
    }, { deep: !0 }), D(() => {
      g();
    }), (o, y) => (c(), v("div", ve, [
      y[0] || (y[0] = w("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4 px-5" }, "Lower Bracket", -1)),
      w("div", be, [
        w("div", pe, [
          w("div", ye, [
            $(G, {
              columns: a.value,
              "onUpdate:columns": b
            }, null, 8, ["columns"]),
            w("div", Te, [
              (c(!0), v(U, null, A(a.value, (l, T) => (c(), H(_, {
                key: l.name,
                column: l,
                "column-index": T,
                "available-teams": e.availableTeams,
                "selected-teams": d.value,
                "highlighted-team": i.value,
                "onUpdate:match": u,
                onHighlightTeam: p,
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
  name: x,
  logo: null,
  score: 0
}), W = (e) => ({
  number: e,
  [r.ONE]: V(),
  [r.TWO]: V(),
  winner: null
}), Ue = (e, f = 3) => {
  const t = [], n = Math.log2(e);
  let a = 1;
  for (let i = 0; i < n; i++) {
    const d = Math.pow(2, n - i - 1), p = [];
    for (let m = 0; m < d; m++)
      p.push(W(a++));
    t.push({
      name: `Round ${i + 1}`,
      items: p,
      bestOf: f
    });
  }
  return t;
}, F = (e, f) => {
  const t = [];
  let n = 1;
  const a = Math.pow(2, e - 2), i = {
    name: "Lower Round 1",
    bestOf: f,
    items: Array(a).fill(null).map(() => W(n++))
  };
  t.push(i);
  const d = Math.pow(2, e - 3), p = {
    name: "Lower Round 2",
    bestOf: f,
    items: Array(d).fill(null).map(() => W(n++))
  };
  if (t.push(p), e > 3) {
    const m = Math.pow(2, e - 4), u = {
      name: "Lower Round 3",
      bestOf: f,
      items: Array(m).fill(null).map(() => W(n++))
    };
    t.push(u);
  }
  return t;
}, xe = { class: "flex flex-col" }, Oe = { class: "flex flex-col" }, ke = { class: "overflow-x-auto" }, Ee = { class: "min-w-max" }, Ne = { class: "flex flex-1 p-5" }, Se = {
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
      default: N.SINGLE_ELIMINATION,
      validator: (e) => Object.values(N).includes(e)
    }
  },
  emits: ["update:state"],
  setup(e, { emit: f }) {
    const t = f, n = e, a = B([]), i = B([]), d = B(null), p = L(() => {
      const l = /* @__PURE__ */ new Set();
      return a.value.forEach((T) => {
        T.items.forEach((h) => {
          h[r.ONE].name !== x && l.add(h[r.ONE].name), h[r.TWO].name !== x && l.add(h[r.TWO].name);
        });
      }), n.format === N.DOUBLE_ELIMINATION && i.value.forEach((T) => {
        T.items.forEach((h) => {
          h[r.ONE].name !== x && l.add(h[r.ONE].name), h[r.TWO].name !== x && l.add(h[r.TWO].name);
        });
      }), Array.from(l);
    }), m = (l) => {
      d.value = l;
    }, u = () => {
      d.value = null;
    }, b = (l, T, h) => {
      if (console.log("Updating upper match:", { roundIndex: l, matchIndex: T, updatedMatch: h }), a.value[l] && a.value[l].items) {
        if (a.value[l].items[T] = h, h.winner && l < a.value.length - 1) {
          const O = l + 1, k = Math.floor(T / 2);
          if (a.value[O] && a.value[O].items[k]) {
            const E = a.value[O].items[k], C = T % 2 === 0 ? r.ONE : r.TWO, I = h[h.winner];
            a.value[O].items[k] = {
              ...E,
              [C]: {
                id: I.id,
                name: I.name,
                logo: I.logo,
                score: 0
              }
            };
          }
        }
        if (n.format === N.DOUBLE_ELIMINATION && h.winner) {
          const O = h[h.winner === r.ONE ? r.TWO : r.ONE];
          if (O.name !== x) {
            const k = Math.floor(l / 2), E = Math.floor(T / 2);
            if (i.value[k] && i.value[k].items[E]) {
              const C = i.value[k].items[E], I = T % 2 === 0 ? r.ONE : r.TWO;
              i.value[k].items[E] = {
                ...C,
                [I]: {
                  id: O.id,
                  name: O.name,
                  logo: O.logo,
                  score: 0
                }
              };
            }
          }
        }
        o();
      }
    }, s = (l) => {
      console.log("Updating upper columns:", l), a.value = l, o();
    }, g = (l) => {
      console.log("Updating lower state:", l), i.value = l, o();
    }, o = () => {
      console.log("Emitting tournament state:", {
        upper: a.value,
        lower: n.format === N.DOUBLE_ELIMINATION ? i.value : null
      }), t("update:state", {
        upper: a.value,
        lower: n.format === N.DOUBLE_ELIMINATION ? i.value : null
      });
    }, y = () => {
      console.log("Initializing tournament with state:", n.initialState), n.initialState && (Array.isArray(n.initialState) ? (a.value = JSON.parse(JSON.stringify(n.initialState)), n.format === N.DOUBLE_ELIMINATION && (i.value = F(a.value.length, n.defaultBestOf))) : (a.value = JSON.parse(JSON.stringify(n.initialState.upper || [])), i.value = JSON.parse(JSON.stringify(n.initialState.lower || []))));
    };
    return M(() => n.initialState, () => {
      y();
    }, { deep: !0 }), M(() => n.format, (l) => {
      l === N.DOUBLE_ELIMINATION && (!i.value || i.value.length === 0) && (i.value = F(a.value.length, n.defaultBestOf), o());
    }), D(() => {
      y();
    }), (l, T) => (c(), v("div", xe, [
      T[0] || (T[0] = w("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4 px-5" }, "Upper Bracket", -1)),
      w("div", Oe, [
        w("div", ke, [
          w("div", Ee, [
            $(G, {
              columns: a.value,
              "onUpdate:columns": s
            }, null, 8, ["columns"]),
            w("div", Ne, [
              (c(!0), v(U, null, A(a.value, (h, O) => (c(), H(_, {
                key: h.name,
                column: h,
                "column-index": O,
                "available-teams": e.availableTeams,
                "selected-teams": p.value,
                "highlighted-team": d.value,
                "onUpdate:match": b,
                onHighlightTeam: m,
                onUnhighlightTeam: u
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team"]))), 128))
            ])
          ])
        ])
      ]),
      e.format === S(N).DOUBLE_ELIMINATION ? (c(), H(we, {
        key: 0,
        "initial-state": i.value,
        "available-teams": e.availableTeams,
        "default-best-of": e.defaultBestOf,
        "onUpdate:state": g
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
