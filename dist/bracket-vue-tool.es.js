import { ref as A, computed as L, watch as U, onMounted as H, createElementBlock as T, openBlock as h, normalizeClass as P, unref as E, createCommentVNode as D, withDirectives as _, createElementVNode as v, Fragment as M, renderList as q, toDisplayString as C, vModelSelect as Q, vModelText as z, createVNode as $, createBlock as j } from "vue";
const B = {
  SINGLE_ELIMINATION: "single_elimination",
  DOUBLE_ELIMINATION: "double_elimination"
}, w = "TBD", r = {
  ONE: "teamOne",
  TWO: "teamTwo"
}, k = {
  CAN_SELECT_TEAM: "can_select_team",
  CAN_EDIT_DATE: "can_edit_date"
}, X = {
  key: 0,
  class: "flex items-center gap-2"
}, Y = ["src", "alt"], Z = ["value", "disabled"], ee = {
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
        [k.CAN_SELECT_TEAM]: !0
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
  setup(e, { emit: p }) {
    const t = e, n = p, a = A(t.team.name), l = L(() => {
      var s;
      return a.value === w ? null : ((s = t.availableTeams.find((f) => f.name === a.value)) == null ? void 0 : s.logo) || null;
    });
    U(() => t.team, (s) => {
      a.value = s.name;
    }, { immediate: !0 }), H(() => {
      console.log("TeamSelect mounted:", {
        team: t.team,
        availableTeams: t.availableTeams
      });
    });
    const g = (s) => s === w ? !1 : t.selectedTeams.includes(s) && s !== t.team.name || s === t.team.name && t.team.name !== w, y = L(() => t.availableTeams ? t.availableTeams.filter((s) => s.name === w || s.name === t.team.name ? !0 : !g(s.name)) : []), m = () => {
      t.team.name !== w && n("highlight-team", t.team.name);
    }, d = () => {
      n("unhighlight-team");
    }, b = () => {
      const s = t.availableTeams.find((f) => f.name === a.value);
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
    return (s, f) => (h(), T("div", {
      class: P(["flex-grow p-2.5 hover:bg-gray-200/30 dark:hover:bg-gray-950/20", {
        "hover:bg-green-500/20 dark:hover:bg-green-500/20": e.isWinner,
        "hover:bg-red-500/20 dark:hover:bg-red-500/20": e.isLoser,
        "bg-green-500/20 dark:bg-green-500/20": e.shouldHighlight && e.isWinner,
        "bg-red-500/20 dark:bg-red-500/20": e.shouldHighlight && e.isLoser
      }]),
      onMouseenter: m,
      onMouseleave: d
    }, [
      e.canEdit && e.permissions[E(k).CAN_SELECT_TEAM] ? (h(), T("div", X, [
        l.value ? (h(), T("img", {
          key: 0,
          src: l.value,
          alt: a.value,
          class: "w-6 h-6 rounded-full"
        }, null, 8, Y)) : D("", !0),
        _(v("select", {
          "onUpdate:modelValue": f[0] || (f[0] = (c) => a.value = c),
          class: "fi-select-input p-0 w-full border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900 hover:cursor-pointer",
          onChange: b
        }, [
          f[1] || (f[1] = v("option", { value: "TBD" }, "TBD", -1)),
          (h(!0), T(M, null, q(y.value, (c) => (h(), T("option", {
            key: c.id,
            value: c.name,
            disabled: g(c.name)
          }, C(c.name), 9, Z))), 128))
        ], 544), [
          [Q, a.value]
        ])
      ])) : (h(), T("div", ee, [
        e.team.logo ? (h(), T("img", {
          key: 0,
          src: e.team.logo,
          alt: e.team.name,
          class: "w-6 h-6 rounded-full"
        }, null, 8, te)) : D("", !0),
        v("span", ae, C(e.team.name), 1)
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
  setup(e, { emit: p }) {
    const t = e, n = p, a = A(!1), l = A(t.team.score ?? 0), g = () => {
      t.canEditScore && (a.value = !0);
    }, y = () => {
      const m = parseInt(l.value) || 0;
      n("update:score", {
        position: t.teamPosition,
        score: m
      });
    };
    return U(() => t.team, (m) => {
      l.value = m.score ?? 0;
    }, { deep: !0 }), (m, d) => (h(), T("div", {
      class: P(["p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center", { "border-b border-orange-600 dark:border-orange-700": e.isFirstTeam }]),
      onClick: g
    }, [
      a.value ? _((h(), T("input", {
        key: 0,
        type: "number",
        "onUpdate:modelValue": d[0] || (d[0] = (b) => l.value = b),
        class: "w-12 border-none bg-orange-500 dark:bg-orange-600 text-center text-white text-base transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900",
        min: "0",
        onChange: y,
        onBlur: d[1] || (d[1] = (b) => a.value = !1)
      }, null, 544)), [
        [z, l.value]
      ]) : (h(), T("span", ne, C(e.team.score), 1))
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
        [k.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:team", "update:score", "highlight-team", "unhighlight-team"],
  setup(e) {
    return (p, t) => (h(), T("div", se, [
      $(ie, {
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
        "onUpdate:team": t[0] || (t[0] = (n) => p.$emit("update:team", n)),
        onHighlightTeam: t[1] || (t[1] = (n) => p.$emit("highlight-team", n)),
        onUnhighlightTeam: t[2] || (t[2] = (n) => p.$emit("unhighlight-team"))
      }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "highlighted-team", "permissions", "can-edit", "is-winner", "is-loser", "should-highlight", "is-first-team"]),
      $(le, {
        team: e.team,
        "team-position": e.teamPosition,
        "can-edit-score": e.canEditScore,
        "is-first-team": e.isFirstTeam,
        "onUpdate:score": t[3] || (t[3] = (n) => p.$emit("update:score", n))
      }, null, 8, ["team", "team-position", "can-edit-score", "is-first-team"])
    ]));
  }
}, oe = { class: "flex flex-col w-full" }, re = { class: "px-3 py-1 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center" }, me = ["value", "disabled"], ue = { class: "my-1.5 ml-2.5 bg-white dark:bg-gray-900 rounded overflow-hidden w-full min-w-[200px] shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10" }, ce = {
  key: 0,
  class: "absolute top-1/2 left-full w-2.5 h-[calc(100%+2px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[-10px] ml-[15px] mx-2 transition-colors duration-200"
}, de = {
  __name: "BracketMatch",
  props: {
    match: {
      type: Object,
      required: !0,
      default: () => ({
        teamOne: { name: w, score: 0 },
        teamTwo: { name: w, score: 0 },
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
        [k.CAN_SELECT_TEAM]: !0,
        [k.CAN_EDIT_DATE]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team"],
  setup(e, { emit: p }) {
    const t = e, n = p, a = L(() => t.roundIndex === 0), l = L(() => t.match[r.ONE].name !== w && t.match[r.TWO].name !== w), g = (i) => t.match.winner === i, y = (i) => t.match.winner && t.match.winner !== i, m = (i) => {
      const u = t.match[i].name;
      return t.highlightedTeam === u;
    }, d = (i) => {
      n("highlight-team", i);
    }, b = () => {
      n("unhighlight-team");
    }, s = ({ position: i, team: u }) => {
      const o = {
        ...t.match,
        [i]: u
      };
      n("update:match", o);
    }, f = ({ position: i, score: u }) => {
      const o = {
        ...t.match,
        [i]: {
          ...t.match[i],
          score: u
        }
      };
      o.teamOne.score > 0 || o.teamTwo.score > 0 ? o.winner = o.teamOne.score > o.teamTwo.score ? r.ONE : r.TWO : o.winner = null, n("update:match", o);
    }, c = (i) => i ? new Date(i).toISOString().slice(0, 16) : "", x = (i) => {
      const u = {
        ...t.match,
        date: i.target.value
      };
      n("update:match", u);
    };
    return (i, u) => (h(), T("div", {
      class: P(["relative text-[0.8em] flex items-center", { group: e.index % 2 == 0 && e.totalMatches > 1 }])
    }, [
      v("div", oe, [
        v("div", re, [
          v("input", {
            type: "datetime-local",
            value: c(e.match.date),
            onInput: x,
            class: "bg-transparent border-none focus:ring-0 p-0 text-xs",
            disabled: !e.permissions[E(k).CAN_EDIT_DATE]
          }, null, 40, me)
        ]),
        v("div", ue, [
          $(F, {
            team: e.match.teamOne,
            "team-position": E(r).ONE,
            "available-teams": e.availableTeams,
            "selected-teams": e.selectedTeams,
            "can-edit": a.value,
            "can-edit-score": l.value,
            "is-winner": g(E(r).ONE),
            "is-loser": y(E(r).ONE),
            "should-highlight": m(E(r).ONE),
            "is-first-team": !0,
            "can-select-team": i.canSelectTeam,
            "highlighted-team": e.highlightedTeam,
            permissions: e.permissions,
            "onUpdate:team": s,
            "onUpdate:score": f,
            onHighlightTeam: d,
            onUnhighlightTeam: b
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"]),
          $(F, {
            team: e.match.teamTwo,
            "team-position": E(r).TWO,
            "available-teams": e.availableTeams,
            "selected-teams": e.selectedTeams,
            "can-edit": a.value,
            "can-edit-score": l.value,
            "is-winner": g(E(r).TWO),
            "is-loser": y(E(r).TWO),
            "should-highlight": m(E(r).TWO),
            "can-select-team": i.canSelectTeam,
            "highlighted-team": e.highlightedTeam,
            permissions: e.permissions,
            "onUpdate:team": s,
            "onUpdate:score": f,
            onHighlightTeam: d,
            onUnhighlightTeam: b
          }, null, 8, ["team", "team-position", "available-teams", "selected-teams", "can-edit", "can-edit-score", "is-winner", "is-loser", "should-highlight", "can-select-team", "highlighted-team", "permissions"])
        ])
      ]),
      e.index % 2 == 0 && e.totalMatches > 1 ? (h(), T("div", ce, u[0] || (u[0] = [
        v("span", { class: "w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block" }, null, -1)
      ]))) : D("", !0)
    ], 2));
  }
}, he = { class: "flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]" }, ge = { class: "text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50 mt-[23px]" }, G = {
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
        [k.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:match", "highlight-team", "unhighlight-team"],
  setup(e, { emit: p }) {
    const t = e, n = p, a = (l, g) => {
      n("update:match", t.columnIndex, l, g);
    };
    return (l, g) => (h(), T("div", he, [
      (h(!0), T(M, null, q(e.column.items, (y, m) => (h(), T(M, {
        key: y.number
      }, [
        v("div", ge, C(y.number), 1),
        $(de, {
          match: y,
          index: m,
          "total-matches": e.column.items.length,
          "round-index": e.columnIndex,
          "available-teams": e.availableTeams,
          "selected-teams": e.selectedTeams,
          "highlighted-team": e.highlightedTeam,
          permissions: e.permissions,
          "onUpdate:match": (d) => a(m, d),
          onHighlightTeam: g[0] || (g[0] = (d) => l.$emit("highlight-team", d)),
          onUnhighlightTeam: g[1] || (g[1] = (d) => l.$emit("unhighlight-team"))
        }, null, 8, ["match", "index", "total-matches", "round-index", "available-teams", "selected-teams", "highlighted-team", "permissions", "onUpdate:match"])
      ], 64))), 128))
    ]));
  }
}, fe = { class: "flex justify-between px-5" }, ve = { class: "flex flex-col items-center gap-2" }, pe = { class: "mt-2" }, Te = { class: "flex items-center rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600" }, be = ["onUpdate:modelValue", "onBlur"], ye = { class: "grid shrink-0 grid-cols-1 focus-within:relative" }, we = ["value", "onChange"], xe = ["value"], K = {
  __name: "BracketRoundHeaders",
  props: {
    columns: {
      type: Array,
      required: !0
    }
  },
  emits: ["update:columns"],
  setup(e, { emit: p }) {
    const t = e, n = p, a = [1, 3, 5, 7, 9], l = A(t.columns.map((m) => m.name));
    U(() => t.columns, (m) => {
      l.value = m.map((d) => d.name);
    }, { deep: !0 });
    const g = (m, d) => {
      l.value[m] = d;
      const b = [...t.columns];
      b[m] = {
        ...b[m],
        name: d
      }, n("update:columns", b);
    }, y = (m, d) => {
      const b = [...t.columns];
      b[m] = {
        ...b[m],
        bestOf: Number(d)
      }, n("update:columns", b);
    };
    return (m, d) => (h(), T("div", fe, [
      (h(!0), T(M, null, q(e.columns, (b, s) => (h(), T("div", {
        key: b.name,
        class: "flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
      }, [
        v("div", ve, [
          v("div", pe, [
            v("div", Te, [
              _(v("input", {
                type: "text",
                "onUpdate:modelValue": (f) => l.value[s] = f,
                onBlur: (f) => g(s, f.target.value),
                class: "block min-w-0 grow py-1.5 pr-3 text-gray-800 dark:text-white border-none pl-1 text-base text-gray-900 bg-white dark:bg-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              }, null, 40, be), [
                [z, l.value[s]]
              ]),
              v("div", ye, [
                v("select", {
                  value: b.bestOf,
                  onChange: (f) => y(s, f.target.value),
                  class: "col-start-1 row-start-1 w-full text-gray-800 dark:text-white border-none appearance-none py-1.5 bg-white dark:bg-gray-900 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                }, [
                  (h(), T(M, null, q(a, (f) => v("option", {
                    key: f,
                    value: f
                  }, " Best of " + C(f), 9, xe)), 64))
                ], 40, we)
              ])
            ])
          ])
        ])
      ]))), 128))
    ]));
  }
}, Oe = { class: "flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8" }, Ee = { class: "flex flex-col" }, Ne = { class: "overflow-x-auto" }, ke = { class: "min-w-max" }, Se = { class: "flex flex-1 p-5" }, Ae = {
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
        [k.CAN_SELECT_TEAM]: !0,
        [k.CAN_EDIT_DATE]: !0
      })
    }
  },
  emits: ["update:state"],
  setup(e, { emit: p }) {
    const t = p, n = e, a = A([]), l = A(null), g = L(() => {
      const c = /* @__PURE__ */ new Set();
      return a.value.forEach((x) => {
        x.items.forEach((i) => {
          i[r.ONE].name !== w && c.add(i[r.ONE].name), i[r.TWO].name !== w && c.add(i[r.TWO].name);
        });
      }), Array.from(c);
    }), y = (c) => {
      l.value = c;
    }, m = () => {
      l.value = null;
    }, d = (c, x, i) => {
      if (console.log("Updating lower match:", { roundIndex: c, matchIndex: x, updatedMatch: i }), a.value[c] && a.value[c].items) {
        if (a.value[c].items[x] = i, i.winner && c < a.value.length - 1) {
          const u = c + 1, o = Math.floor(x / 2);
          if (a.value[u] && a.value[u].items[o]) {
            const O = a.value[u].items[o], N = x % 2 === 0 ? r.ONE : r.TWO, S = i[i.winner];
            a.value[u].items[o] = {
              ...O,
              [N]: {
                id: S.id,
                name: S.name,
                logo: S.logo,
                score: 0
              }
            };
          }
        }
        s();
      }
    }, b = (c) => {
      console.log("Updating lower columns:", c), a.value = c, s();
    }, s = () => {
      console.log("Emitting lower tournament state:", a.value), t("update:state", a.value);
    }, f = () => {
      console.log("Initializing lower tournament with state:", n.initialState), n.initialState && n.initialState.length > 0 && (a.value = JSON.parse(JSON.stringify(n.initialState)));
    };
    return U(() => n.initialState, () => {
      f();
    }, { deep: !0 }), H(() => {
      f();
    }), (c, x) => (h(), T("div", Oe, [
      x[0] || (x[0] = v("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, "Lower Bracket", -1)),
      v("div", Ee, [
        v("div", Ne, [
          v("div", ke, [
            $(K, {
              columns: a.value,
              "onUpdate:columns": b
            }, null, 8, ["columns"]),
            v("div", Se, [
              (h(!0), T(M, null, q(a.value, (i, u) => (h(), j(G, {
                key: i.name,
                column: i,
                "column-index": u,
                "available-teams": e.availableTeams,
                "selected-teams": g.value,
                "highlighted-team": l.value,
                permissions: e.permissions,
                "onUpdate:match": d,
                onHighlightTeam: y,
                onUnhighlightTeam: m
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team", "permissions"]))), 128))
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
  winner: null,
  date: null
}), Ce = (e, p = 3) => {
  const t = [], n = Math.log2(e);
  let a = 1;
  for (let l = 0; l < n; l++) {
    const g = Math.pow(2, n - l - 1), y = [];
    for (let m = 0; m < g; m++)
      y.push(W(a++));
    t.push({
      name: `Round ${l + 1}`,
      items: y,
      bestOf: p
    });
  }
  return t;
}, V = (e, p) => {
  const t = [];
  let n = 1;
  const a = Math.pow(2, e - 2), l = {
    name: "Lower Round 1",
    bestOf: p,
    items: Array(a).fill(null).map(() => W(n++))
  };
  t.push(l);
  const g = Math.pow(2, e - 3), y = {
    name: "Lower Round 2",
    bestOf: p,
    items: Array(g).fill(null).map(() => W(n++))
  };
  if (t.push(y), e > 3) {
    const m = Math.pow(2, e - 4), d = {
      name: "Lower Round 3",
      bestOf: p,
      items: Array(m).fill(null).map(() => W(n++))
    };
    t.push(d);
  }
  return t;
}, Be = { class: "flex flex-col" }, Me = { class: "flex flex-col" }, $e = { class: "overflow-x-auto" }, Le = { class: "min-w-max" }, Ue = { class: "flex flex-1 p-5" }, qe = {
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
        [k.CAN_SELECT_TEAM]: !0
      })
    }
  },
  emits: ["update:state"],
  setup(e, { emit: p }) {
    const t = p, n = e, a = A([]), l = A([]), g = A(null), y = L(() => {
      const i = /* @__PURE__ */ new Set();
      return a.value.forEach((u) => {
        u.items.forEach((o) => {
          o[r.ONE].name !== w && i.add(o[r.ONE].name), o[r.TWO].name !== w && i.add(o[r.TWO].name);
        });
      }), n.format === B.DOUBLE_ELIMINATION && l.value.forEach((u) => {
        u.items.forEach((o) => {
          o[r.ONE].name !== w && i.add(o[r.ONE].name), o[r.TWO].name !== w && i.add(o[r.TWO].name);
        });
      }), Array.from(i);
    }), m = (i) => {
      g.value = i;
    }, d = () => {
      g.value = null;
    }, b = (i, u, o) => {
      if (console.log("Updating upper match:", { roundIndex: i, matchIndex: u, updatedMatch: o }), a.value[i] && a.value[i].items) {
        if (a.value[i].items[u] = o, o.winner && i < a.value.length - 1) {
          const O = i + 1, N = Math.floor(u / 2);
          if (a.value[O] && a.value[O].items[N]) {
            const S = a.value[O].items[N], R = u % 2 === 0 ? r.ONE : r.TWO, I = o[o.winner];
            a.value[O].items[N] = {
              ...S,
              [R]: {
                id: I.id,
                name: I.name,
                logo: I.logo,
                score: 0
              }
            };
          }
        }
        if (n.format === B.DOUBLE_ELIMINATION && o.winner) {
          const O = o[o.winner === r.ONE ? r.TWO : r.ONE];
          if (O.name !== w) {
            const N = Math.floor(i / 2), S = Math.floor(u / 2);
            if (l.value[N] && l.value[N].items[S]) {
              const R = l.value[N].items[S], I = u % 2 === 0 ? r.ONE : r.TWO;
              l.value[N].items[S] = {
                ...R,
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
        c();
      }
    }, s = (i) => {
      console.log("Updating upper columns:", i), a.value = i, c();
    }, f = (i) => {
      console.log("Updating lower state:", i), l.value = i, c();
    }, c = () => {
      console.log("Emitting tournament state:", {
        upper: a.value,
        lower: n.format === B.DOUBLE_ELIMINATION ? l.value : null
      }), t("update:state", {
        upper: a.value,
        lower: n.format === B.DOUBLE_ELIMINATION ? l.value : null
      });
    }, x = () => {
      console.log("Initializing tournament with state:", n.initialState), n.initialState && (Array.isArray(n.initialState) ? (a.value = JSON.parse(JSON.stringify(n.initialState)), n.format === B.DOUBLE_ELIMINATION && (l.value = V(a.value.length, n.defaultBestOf))) : (a.value = JSON.parse(JSON.stringify(n.initialState.upper || [])), l.value = JSON.parse(JSON.stringify(n.initialState.lower || []))));
    };
    return U(() => n.initialState, () => {
      x();
    }, { deep: !0 }), U(() => n.format, (i) => {
      i === B.DOUBLE_ELIMINATION && (!l.value || l.value.length === 0) && (l.value = V(a.value.length, n.defaultBestOf), c());
    }), H(() => {
      x();
    }), (i, u) => (h(), T("div", Be, [
      u[0] || (u[0] = v("div", { class: "text-xl font-bold text-gray-800 dark:text-white mb-4" }, "Upper Bracket", -1)),
      v("div", Me, [
        v("div", $e, [
          v("div", Le, [
            $(K, {
              columns: a.value,
              "onUpdate:columns": s
            }, null, 8, ["columns"]),
            v("div", Ue, [
              (h(!0), T(M, null, q(a.value, (o, O) => (h(), j(G, {
                key: o.name,
                column: o,
                "column-index": O,
                "available-teams": e.availableTeams,
                "selected-teams": y.value,
                "highlighted-team": g.value,
                permissions: e.permissions,
                "onUpdate:match": b,
                onHighlightTeam: m,
                onUnhighlightTeam: d
              }, null, 8, ["column", "column-index", "available-teams", "selected-teams", "highlighted-team", "permissions"]))), 128))
            ])
          ])
        ])
      ]),
      e.format === E(B).DOUBLE_ELIMINATION ? (h(), j(Ae, {
        key: 0,
        "initial-state": l.value,
        "available-teams": e.availableTeams,
        "default-best-of": e.defaultBestOf,
        permissions: e.permissions,
        "onUpdate:state": f
      }, null, 8, ["initial-state", "available-teams", "default-best-of", "permissions"])) : D("", !0)
    ]));
  }
}, We = (e) => {
  e.component("TournamentBracket", qe);
};
export {
  k as PERMISSIONS,
  qe as TournamentBracket,
  V as createLowerBracketStructure,
  Ce as createTournamentState,
  We as install
};
