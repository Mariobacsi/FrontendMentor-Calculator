
const defaultExport = {
  name: "ThemeSelector",
  data() {
    return {
      theme: 1,
      nThemes: 3,
    };
  },
};

import { createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString } from "../../../_snowpack/pkg/vue.js"

const _hoisted_1 = { class: "grid grid-cols-3" }
const _hoisted_2 = /*#__PURE__*/_createElementVNode("div", { class: "col-span-2" }, null, -1)
const _hoisted_3 = { class: "flex px-1" }
const _hoisted_4 = ["onClick"]
const _hoisted_5 = /*#__PURE__*/_createElementVNode("h2", { class: "text-white uppercase mr-4 text-sm font-semibold text-right col-span-2" }, " Theme ", -1)
const _hoisted_6 = ["value"]

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    _createElementVNode("div", _hoisted_3, [
      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.nThemes, (n) => {
        return (_openBlock(), _createElementBlock("button", {
          class: "text-white text-sm font-semibold flex-1",
          key: n,
          onClick: $event => (_ctx.theme = n)
        }, _toDisplayString(n), 9, _hoisted_4))
      }), 128))
    ]),
    _hoisted_5,
    _createElementVNode("input", {
      type: "range",
      value: _ctx.theme,
      min: "1",
      max: "3",
      step: "1"
    }, null, 8, _hoisted_6)
  ]))
};

defaultExport.render = render;

export default defaultExport;