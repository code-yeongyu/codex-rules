#!/usr/bin/env node
import { createRequire } from "node:module"; const require = createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "node_modules/picomatch/lib/constants.js"(exports, module) {
    "use strict";
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DEFAULT_MAX_EXTGLOB_RECURSION = 0;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var SEP = "/";
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR,
      SEP
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`,
      SEP: "\\"
    };
    var POSIX_REGEX_SOURCE = {
      __proto__: null,
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module.exports = {
      DEFAULT_MAX_EXTGLOB_RECURSION,
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        __proto__: null,
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// node_modules/picomatch/lib/utils.js
var require_utils = __commonJS({
  "node_modules/picomatch/lib/utils.js"(exports) {
    "use strict";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants();
    exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports.isWindows = () => {
      if (typeof navigator !== "undefined" && navigator.platform) {
        const platform = navigator.platform.toLowerCase();
        return platform === "win32" || platform === "windows";
      }
      if (typeof process !== "undefined" && process.platform) {
        return process.platform === "win32";
      }
      return false;
    };
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1) return input;
      if (input[idx - 1] === "\\") return exports.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
    exports.basename = (path, { windows } = {}) => {
      const segs = path.split(windows ? /[\\/]/ : "/");
      const last = segs[segs.length - 1];
      if (last === "") {
        return segs[segs.length - 2];
      }
      return last;
    };
  }
});

// node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "node_modules/picomatch/lib/scan.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET
      /* ] */
    } = require_constants();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true) continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob) glob = utils.removeBackslashes(glob);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module.exports = scan;
  }
});

// node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({
  "node_modules/picomatch/lib/parse.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var utils = require_utils();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var splitTopLevel = (input) => {
      const parts = [];
      let bracket = 0;
      let paren = 0;
      let quote = 0;
      let value = "";
      let escaped = false;
      for (const ch of input) {
        if (escaped === true) {
          value += ch;
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          value += ch;
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote = quote === 1 ? 0 : 1;
          value += ch;
          continue;
        }
        if (quote === 0) {
          if (ch === "[") {
            bracket++;
          } else if (ch === "]" && bracket > 0) {
            bracket--;
          } else if (bracket === 0) {
            if (ch === "(") {
              paren++;
            } else if (ch === ")" && paren > 0) {
              paren--;
            } else if (ch === "|" && paren === 0) {
              parts.push(value);
              value = "";
              continue;
            }
          }
        }
        value += ch;
      }
      parts.push(value);
      return parts;
    };
    var isPlainBranch = (branch) => {
      let escaped = false;
      for (const ch of branch) {
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (/[?*+@!()[\]{}]/.test(ch)) {
          return false;
        }
      }
      return true;
    };
    var normalizeSimpleBranch = (branch) => {
      let value = branch.trim();
      let changed = true;
      while (changed === true) {
        changed = false;
        if (/^@\([^\\()[\]{}|]+\)$/.test(value)) {
          value = value.slice(2, -1);
          changed = true;
        }
      }
      if (!isPlainBranch(value)) {
        return;
      }
      return value.replace(/\\(.)/g, "$1");
    };
    var hasRepeatedCharPrefixOverlap = (branches) => {
      const values = branches.map(normalizeSimpleBranch).filter(Boolean);
      for (let i = 0; i < values.length; i++) {
        for (let j = i + 1; j < values.length; j++) {
          const a = values[i];
          const b = values[j];
          const char = a[0];
          if (!char || a !== char.repeat(a.length) || b !== char.repeat(b.length)) {
            continue;
          }
          if (a === b || a.startsWith(b) || b.startsWith(a)) {
            return true;
          }
        }
      }
      return false;
    };
    var parseRepeatedExtglob = (pattern, requireEnd = true) => {
      if (pattern[0] !== "+" && pattern[0] !== "*" || pattern[1] !== "(") {
        return;
      }
      let bracket = 0;
      let paren = 0;
      let quote = 0;
      let escaped = false;
      for (let i = 1; i < pattern.length; i++) {
        const ch = pattern[i];
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote = quote === 1 ? 0 : 1;
          continue;
        }
        if (quote === 1) {
          continue;
        }
        if (ch === "[") {
          bracket++;
          continue;
        }
        if (ch === "]" && bracket > 0) {
          bracket--;
          continue;
        }
        if (bracket > 0) {
          continue;
        }
        if (ch === "(") {
          paren++;
          continue;
        }
        if (ch === ")") {
          paren--;
          if (paren === 0) {
            if (requireEnd === true && i !== pattern.length - 1) {
              return;
            }
            return {
              type: pattern[0],
              body: pattern.slice(2, i),
              end: i
            };
          }
        }
      }
    };
    var buildCharClassStar = (chars) => {
      const source = chars.length === 1 ? utils.escapeRegex(chars[0]) : `[${chars.map((ch) => utils.escapeRegex(ch)).join("")}]`;
      return `${source}*`;
    };
    var getStarExtglobSequenceChars = (pattern) => {
      let index = 0;
      const chars = [];
      while (index < pattern.length) {
        const match = parseRepeatedExtglob(pattern.slice(index), false);
        if (!match || match.type !== "*") {
          return;
        }
        const branches = splitTopLevel(match.body).map((branch2) => branch2.trim());
        if (branches.length !== 1) {
          return;
        }
        const branch = normalizeSimpleBranch(branches[0]);
        if (!branch || branch.length !== 1) {
          return;
        }
        chars.push(branch);
        index += match.end + 1;
      }
      if (chars.length < 1) {
        return;
      }
      return chars;
    };
    var repeatedExtglobRecursion = (pattern) => {
      let depth = 0;
      let value = pattern.trim();
      let match = parseRepeatedExtglob(value);
      while (match) {
        depth++;
        value = match.body.trim();
        match = parseRepeatedExtglob(value);
      }
      return depth;
    };
    var analyzeRepeatedExtglob = (body, options) => {
      if (options.maxExtglobRecursion === false) {
        return { risky: false };
      }
      const max = typeof options.maxExtglobRecursion === "number" ? options.maxExtglobRecursion : constants.DEFAULT_MAX_EXTGLOB_RECURSION;
      const branches = splitTopLevel(body).map((branch) => branch.trim());
      if (branches.length > 1) {
        if (branches.some((branch) => branch === "") || branches.some((branch) => /^[*?]+$/.test(branch)) || hasRepeatedCharPrefixOverlap(branches)) {
          return { risky: true };
        }
      }
      const safeChars = [];
      let sawStarSequence = false;
      let combinable = true;
      for (const branch of branches) {
        const chars = getStarExtglobSequenceChars(branch);
        if (chars) {
          sawStarSequence = true;
          safeChars.push(...chars);
          continue;
        }
        const literal = normalizeSimpleBranch(branch);
        if (literal && literal.length === 1) {
          safeChars.push(literal);
          continue;
        }
        combinable = false;
        if (repeatedExtglobRecursion(branch) > max) {
          return { risky: true };
        }
      }
      if (sawStarSequence) {
        return combinable ? { risky: true, safeOutput: buildCharClassStar([...new Set(safeChars)]) } : { risky: true };
      }
      return { risky: false };
    };
    var parse = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const PLATFORM_CHARS = constants.globChars(opts.windows);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n = 1) => input[state.index + n];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output) append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.output = (prev.output || prev.value) + tok.value;
          prev.value += tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        token.startIndex = state.index;
        token.tokensIndex = tokens.length;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        const literal = input.slice(token.startIndex, state.index + 1);
        const body = input.slice(token.startIndex + 2, state.index);
        const analysis = analyzeRepeatedExtglob(body, opts);
        if ((token.type === "plus" || token.type === "star") && analysis.risky) {
          const safeOutput = analysis.safeOutput ? (token.output ? "" : ONE_CHAR) + (opts.capture ? `(${analysis.safeOutput})` : analysis.safeOutput) : void 0;
          const open = tokens[token.tokensIndex];
          open.type = "text";
          open.value = literal;
          open.output = safeOutput || utils.escapeRegex(literal);
          for (let i = token.tokensIndex + 1; i < tokens.length; i++) {
            tokens[i].value = "";
            tokens[i].output = "";
            delete tokens[i].suffix;
          }
          state.output = token.output + open.output;
          state.backtrack = true;
          push({ type: "paren", extglob: true, value, output: "" });
          decrement("parens");
          return;
        }
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse(rest, { ...options, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m : `\\${m}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix2 = POSIX_REGEX_SOURCE[rest2];
                if (posix2) {
                  prev.value = pre + posix2;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".") prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse.fastpaths = (input, options) => {
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(opts.windows);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true) return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match) return;
            const source2 = create(match[1]);
            if (!source2) return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module.exports = parse;
  }
});

// node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "node_modules/picomatch/lib/picomatch.js"(exports, module) {
    "use strict";
    var scan = require_scan();
    var parse = require_parse();
    var utils = require_utils();
    var constants = require_constants();
    var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch2 = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch2(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2) return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix2 = opts.windows;
      const regex = isState ? picomatch2.compileRe(glob, options) : picomatch2.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch2(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch2.test(input, regex, options, { glob, posix: posix2 });
        const result = { glob, state, regex, posix: posix2, input, output, match, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch2.test = (input, regex, options, { glob, posix: posix2 } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix2 ? utils.toPosixSlashes : null);
      let match = input === glob;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch2.matchBase(input, regex, options, posix2);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch2.matchBase = (input, glob, options, posix2 = options && options.windows) => {
      const regex = glob instanceof RegExp ? glob : picomatch2.makeRe(glob, options);
      return regex.test(utils.basename(input, { windows: posix2 }));
    };
    picomatch2.isMatch = (str, patterns, options) => picomatch2(patterns, options)(str);
    picomatch2.parse = (pattern, options) => {
      if (Array.isArray(pattern)) return pattern.map((p) => picomatch2.parse(p, options));
      return parse(pattern, { ...options, fastpaths: false });
    };
    picomatch2.scan = (input, options) => scan(input, options);
    picomatch2.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch2.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch2.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse(input, options);
      }
      return picomatch2.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch2.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true) throw err;
        return /$^/;
      }
    };
    picomatch2.constants = constants;
    module.exports = picomatch2;
  }
});

// node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "node_modules/picomatch/index.js"(exports, module) {
    "use strict";
    var pico = require_picomatch();
    var utils = require_utils();
    function picomatch2(glob, options, returnState = false) {
      if (options && (options.windows === null || options.windows === void 0)) {
        options = { ...options, windows: utils.isWindows() };
      }
      return pico(glob, options, returnState);
    }
    Object.assign(picomatch2, pico);
    module.exports = picomatch2;
  }
});

// src/cli.ts
import { stdin as processStdin, stdout as processStdout } from "node:process";

// src/codex-hook.ts
import { readFileSync as readFileSync2, statSync as statSync5 } from "node:fs";
import { isAbsolute as isAbsolute4, relative as relative3, resolve as resolve6 } from "node:path";

// src/rules/constants.ts
var PROJECT_MARKERS = [
  ".git",
  "pnpm-workspace.yaml",
  "package.json",
  "pyproject.toml",
  "Cargo.toml",
  "go.mod",
  ".venv"
];
var PROJECT_RULE_SUBDIRS = [
  [".omo", "rules"],
  [".claude", "rules"],
  [".cursor", "rules"],
  [".github", "instructions"]
];
var PROJECT_SINGLE_FILES = [
  ".github/copilot-instructions.md",
  "AGENTS.md",
  "CLAUDE.md",
  "CONTEXT.md"
];
var USER_HOME_RULE_SUBDIRS = [".omo/rules", ".opencode/rules", ".claude/rules"];
var USER_HOME_SINGLE_FILES = [".config/opencode/AGENTS.md", ".claude/CLAUDE.md"];
var RULE_FILE_EXTENSIONS = [".md", ".mdc"];
var SOURCE_PRIORITY = /* @__PURE__ */ new Map([
  [".omo/rules", 0],
  [".claude/rules", 1],
  [".cursor/rules", 2],
  [".github/instructions", 3],
  [".github/copilot-instructions.md", 4],
  ["AGENTS.md", 5],
  ["CLAUDE.md", 6],
  ["CONTEXT.md", 7],
  ["~/.omo/rules", 100],
  ["~/.opencode/rules", 101],
  ["~/.claude/rules", 102],
  ["~/.config/opencode/AGENTS.md", 103],
  ["~/.claude/CLAUDE.md", 104]
]);
var GLOBAL_DISTANCE = 9999;
var DEFAULT_MAX_RULE_CHARS = 12e3;
var DEFAULT_MAX_SCAN_FILES = 1e3;
var DEFAULT_MAX_RESULT_CHARS = 4e4;
var TRUNCATION_NOTICE = "\n\n[Rule truncated. Read full rule: {path}]";
var SCANNER_EXCLUDED_DIRS = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".turbo",
  ".next",
  "coverage"
];

// src/rules/engine.ts
import { realpathSync as realpathSync3 } from "node:fs";
import { basename, dirname as dirname2, isAbsolute as isAbsolute2, join as join3, relative as relative2, resolve as resolve3 } from "node:path";

// src/rules/cache.ts
var DYNAMIC_SESSION_KEY = "__pi-rules-session__";
function createSessionState(cwd) {
  return {
    cwd,
    staticDedup: /* @__PURE__ */ new Set(),
    dynamicDedup: /* @__PURE__ */ new Map(),
    dynamicTargetFingerprints: /* @__PURE__ */ new Map(),
    loadedRules: [],
    diagnostics: []
  };
}
function staticDedupKey(cwd, rulePath, contentHash) {
  return `${cwd}::${rulePath}::${contentHash}`;
}
function dynamicDedupKey(rulePath, contentHash) {
  return `${rulePath}::${contentHash}`;
}
function markStaticInjected(state, rule) {
  const key = staticDedupKey(state.cwd ?? "", rule.realPath, rule.contentHash);
  if (state.staticDedup.has(key)) {
    return false;
  }
  state.staticDedup.add(key);
  return true;
}
function markDynamicInjected(state, rule) {
  let keys = state.dynamicDedup.get(DYNAMIC_SESSION_KEY);
  if (keys === void 0) {
    keys = /* @__PURE__ */ new Set();
    state.dynamicDedup.set(DYNAMIC_SESSION_KEY, keys);
  }
  const key = dynamicDedupKey(rule.realPath, rule.contentHash);
  if (keys.has(key)) {
    return false;
  }
  keys.add(key);
  return true;
}
function isStaticInjected(state, rule) {
  return state.staticDedup.has(staticDedupKey(state.cwd ?? "", rule.realPath, rule.contentHash));
}
function isDynamicInjected(state, rule) {
  return state.dynamicDedup.get(DYNAMIC_SESSION_KEY)?.has(dynamicDedupKey(rule.realPath, rule.contentHash)) === true;
}
function clearSession(state) {
  state.staticDedup.clear();
  state.dynamicDedup.clear();
  state.dynamicTargetFingerprints.clear();
  state.loadedRules.length = 0;
  state.diagnostics.length = 0;
}

// src/rules/finder.ts
import { existsSync as existsSync2, realpathSync as realpathSync2, statSync as statSync2 } from "node:fs";
import { homedir } from "node:os";
import { dirname, join as join2, posix, relative, resolve as resolve2 } from "node:path";

// src/rules/errors.ts
var UnsupportedRuleSourceError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "UnsupportedRuleSourceError";
  }
};
var RuleFrontmatterParseError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "RuleFrontmatterParseError";
  }
};

// src/rules/scanner.ts
import { existsSync, lstatSync, readdirSync, realpathSync, statSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";
function scanRuleFiles(options) {
  const rootPath = toAbsolutePath(options.rootDir);
  if (!existsSync(rootPath)) {
    return [];
  }
  let rootStats;
  try {
    rootStats = statSync(rootPath);
  } catch {
    return [];
  }
  if (!rootStats.isDirectory()) {
    return [];
  }
  const results = [];
  const visitedDirectories = /* @__PURE__ */ new Set();
  const excludedDirs = new Set(options.excludedDirs ?? SCANNER_EXCLUDED_DIRS);
  const maxDepth = options.maxDepth ?? 10;
  const maxFiles = normalizeMaxFiles(options.maxFiles);
  scanDirectory(rootPath, 0, maxDepth, maxFiles, excludedDirs, visitedDirectories, results);
  return results;
}
function normalizeMaxFiles(maxFiles) {
  const value = maxFiles ?? DEFAULT_MAX_SCAN_FILES;
  if (!Number.isFinite(value) || value < 0) return DEFAULT_MAX_SCAN_FILES;
  return Math.floor(value);
}
function toAbsolutePath(filePath) {
  return isAbsolute(filePath) ? filePath : resolve(filePath);
}
function scanDirectory(directoryPath, depth, maxDepth, maxFiles, excludedDirs, visitedDirectories, results) {
  if (results.length >= maxFiles) {
    return;
  }
  let realDirectoryPath;
  try {
    realDirectoryPath = realpathSync.native(directoryPath);
  } catch {
    return;
  }
  if (visitedDirectories.has(realDirectoryPath)) {
    return;
  }
  visitedDirectories.add(realDirectoryPath);
  let entries;
  try {
    entries = readdirSync(directoryPath, { withFileTypes: true }).sort(
      (leftEntry, rightEntry) => leftEntry.name.localeCompare(rightEntry.name)
    );
  } catch {
    return;
  }
  for (const entry of entries) {
    if (results.length >= maxFiles) {
      return;
    }
    const entryPath = join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      if (!excludedDirs.has(entry.name) && depth < maxDepth) {
        scanDirectory(entryPath, depth + 1, maxDepth, maxFiles, excludedDirs, visitedDirectories, results);
      }
      continue;
    }
    if (entry.isSymbolicLink()) {
      scanSymbolicLink(entryPath, entry.name, depth, maxDepth, maxFiles, excludedDirs, visitedDirectories, results);
      continue;
    }
    if (entry.isFile() && isRuleFile(entry.name)) {
      results.push({ path: entryPath, realPath: resolveRealPath(entryPath) });
    }
  }
}
function scanSymbolicLink(linkPath, linkName, depth, maxDepth, maxFiles, excludedDirs, visitedDirectories, results) {
  if (results.length >= maxFiles) {
    return;
  }
  let targetStats;
  try {
    targetStats = statSync(linkPath);
  } catch {
    return;
  }
  if (targetStats.isDirectory()) {
    if (!excludedDirs.has(linkName) && depth < maxDepth) {
      scanDirectory(linkPath, depth + 1, maxDepth, maxFiles, excludedDirs, visitedDirectories, results);
    }
    return;
  }
  if (targetStats.isFile() && isRuleFile(linkName)) {
    results.push({ path: linkPath, realPath: resolveRealPath(linkPath) });
  }
}
function isRuleFile(fileName) {
  return RULE_FILE_EXTENSIONS.some((extension) => fileName.endsWith(extension));
}
function resolveRealPath(filePath) {
  try {
    const realPath = realpathSync.native(filePath);
    const fileStats = lstatSync(filePath);
    return fileStats.isSymbolicLink() ? realPath : filePath;
  } catch {
    return filePath;
  }
}

// src/rules/finder.ts
function createRuleDiscoveryCache() {
  return { scannedRuleFiles: /* @__PURE__ */ new Map(), singleFileInfo: /* @__PURE__ */ new Map() };
}
function findRuleCandidates(options) {
  const skipUserHome = options.skipUserHome ?? false;
  if (options.projectRoot === null && skipUserHome) {
    return [];
  }
  const disabledSources = options.disabledSources ?? /* @__PURE__ */ new Set();
  const candidates = [];
  const homeDirectory = resolve2(options.homeDir ?? homedir());
  if (options.projectRoot !== null) {
    candidates.push(
      ...findProjectCandidates(options.projectRoot, options.targetFile, disabledSources, options.cache)
    );
  }
  if (!skipUserHome) {
    candidates.push(...findUserHomeCandidates(homeDirectory, disabledSources, options.cache));
  }
  return candidates;
}
function findProjectCandidates(projectRoot, targetFile, disabledSources, cache) {
  const rootDirectory = resolve2(projectRoot);
  const walkDirectories = getWalkDirectories(rootDirectory, targetFile);
  const candidates = [];
  for (const walkDirectory of walkDirectories) {
    for (const [parentDirectory, subDirectory] of PROJECT_RULE_SUBDIRS) {
      const source = toProjectRuleSource(parentDirectory, subDirectory);
      if (disabledSources.has(source)) {
        continue;
      }
      const ruleDirectory = join2(walkDirectory.directory, parentDirectory, subDirectory);
      for (const scannedFile of scanRuleFilesCached(ruleDirectory, cache)) {
        candidates.push({
          path: scannedFile.path,
          realPath: scannedFile.realPath,
          source,
          distance: targetFile === null ? 0 : walkDirectory.distance,
          isGlobal: false,
          isSingleFile: false,
          relativePath: toRelativePath(rootDirectory, scannedFile.path)
        });
      }
    }
  }
  for (const walkDirectory of walkDirectories) {
    for (const ruleFile of PROJECT_SINGLE_FILES) {
      const source = toProjectSingleFileSource(ruleFile);
      if (disabledSources.has(source)) {
        continue;
      }
      const filePath = join2(walkDirectory.directory, ruleFile);
      const fileInfo = singleFileInfoCached(filePath, cache);
      if (fileInfo === null) {
        continue;
      }
      candidates.push({
        path: fileInfo.path,
        realPath: fileInfo.realPath,
        source,
        distance: targetFile === null ? 0 : walkDirectory.distance,
        isGlobal: false,
        isSingleFile: true,
        relativePath: toRelativePath(rootDirectory, filePath)
      });
    }
  }
  return candidates;
}
function findUserHomeCandidates(homeDirectory, disabledSources, cache) {
  const candidates = [];
  for (const ruleSubdir of USER_HOME_RULE_SUBDIRS) {
    const source = toUserHomeRuleSource(ruleSubdir);
    if (disabledSources.has(source)) {
      continue;
    }
    const ruleDirectory = join2(homeDirectory, ruleSubdir);
    for (const scannedFile of scanRuleFilesCached(ruleDirectory, cache)) {
      candidates.push({
        path: scannedFile.path,
        realPath: scannedFile.realPath,
        source,
        distance: GLOBAL_DISTANCE,
        isGlobal: true,
        isSingleFile: false,
        relativePath: toRelativePath(homeDirectory, scannedFile.path)
      });
    }
  }
  for (const ruleFile of USER_HOME_SINGLE_FILES) {
    const source = toUserHomeSingleFileSource(ruleFile);
    if (disabledSources.has(source)) {
      continue;
    }
    const filePath = join2(homeDirectory, ruleFile);
    const fileInfo = singleFileInfoCached(filePath, cache);
    if (fileInfo === null) {
      continue;
    }
    candidates.push({
      path: fileInfo.path,
      realPath: fileInfo.realPath,
      source,
      distance: GLOBAL_DISTANCE,
      isGlobal: true,
      isSingleFile: true,
      relativePath: toRelativePath(homeDirectory, filePath)
    });
  }
  return candidates;
}
function scanRuleFilesCached(rootDir, cache) {
  if (cache === void 0) {
    return scanRuleFiles({ rootDir });
  }
  const cached = cache.scannedRuleFiles.get(rootDir);
  if (cached !== void 0) {
    return cached;
  }
  const scannedFiles = scanRuleFiles({ rootDir });
  cache.scannedRuleFiles.set(rootDir, scannedFiles);
  return scannedFiles;
}
function singleFileInfoCached(filePath, cache) {
  if (cache === void 0) {
    return readSingleFileInfo(filePath);
  }
  const cached = cache.singleFileInfo.get(filePath);
  if (cached !== void 0) {
    return cached;
  }
  const fileInfo = readSingleFileInfo(filePath);
  cache.singleFileInfo.set(filePath, fileInfo);
  return fileInfo;
}
function getWalkDirectories(projectRoot, targetFile) {
  if (targetFile === null) {
    return [{ directory: projectRoot, distance: 0 }];
  }
  const startDirectory = dirname(resolve2(targetFile));
  if (!isSameOrChildPath(startDirectory, projectRoot)) {
    return [{ directory: projectRoot, distance: 0 }];
  }
  const walkDirectories = [];
  let currentDirectory = startDirectory;
  let distance = 0;
  while (true) {
    walkDirectories.push({ directory: currentDirectory, distance });
    if (currentDirectory === projectRoot) {
      break;
    }
    const parentDirectory = dirname(currentDirectory);
    if (parentDirectory === currentDirectory) {
      break;
    }
    currentDirectory = parentDirectory;
    distance += 1;
  }
  return walkDirectories;
}
function isSameOrChildPath(childPath, parentPath) {
  const childRelativePath = relative(parentPath, childPath);
  return childRelativePath === "" || !childRelativePath.startsWith("..") && !childRelativePath.startsWith("/");
}
function readSingleFileInfo(filePath) {
  if (!existsSync2(filePath)) {
    return null;
  }
  try {
    if (!statSync2(filePath).isFile()) {
      return null;
    }
    return { path: filePath, realPath: resolveRealPath2(filePath) };
  } catch {
    return null;
  }
}
function resolveRealPath2(filePath) {
  try {
    return realpathSync2.native(filePath);
  } catch {
    return filePath;
  }
}
function toRelativePath(rootDirectory, filePath) {
  return posix.normalize(relative(rootDirectory, filePath).replace(/\\/g, "/"));
}
function toProjectRuleSource(parentDirectory, subDirectory) {
  const source = `${parentDirectory}/${subDirectory}`;
  switch (source) {
    case ".omo/rules":
    case ".claude/rules":
    case ".cursor/rules":
    case ".github/instructions":
      return source;
    default:
      throw new UnsupportedRuleSourceError(`Unsupported project rule source: ${source}`);
  }
}
function toProjectSingleFileSource(ruleFile) {
  switch (ruleFile) {
    case ".github/copilot-instructions.md":
    case "AGENTS.md":
    case "CLAUDE.md":
    case "CONTEXT.md":
      return ruleFile;
    default:
      throw new UnsupportedRuleSourceError(`Unsupported project single-file source: ${ruleFile}`);
  }
}
function toUserHomeRuleSource(ruleSubdir) {
  const source = `~/${ruleSubdir}`;
  switch (source) {
    case "~/.omo/rules":
    case "~/.opencode/rules":
    case "~/.claude/rules":
      return source;
    default:
      throw new UnsupportedRuleSourceError(`Unsupported user-home rule source: ${source}`);
  }
}
function toUserHomeSingleFileSource(ruleFile) {
  const source = `~/${ruleFile}`;
  switch (source) {
    case "~/.config/opencode/AGENTS.md":
    case "~/.claude/CLAUDE.md":
      return source;
    default:
      throw new UnsupportedRuleSourceError(`Unsupported user-home single-file source: ${source}`);
  }
}

// src/rules/truncator.ts
function truncationNotice(relativePath) {
  return TRUNCATION_NOTICE.replace("{path}", relativePath);
}
function safeSliceEnd(body, end) {
  if (end <= 0) {
    return 0;
  }
  const lastCodeUnit = body.charCodeAt(end - 1);
  if (lastCodeUnit >= 55296 && lastCodeUnit <= 56319) {
    return end - 1;
  }
  return end;
}
function truncateRule(body, options) {
  if (body.length <= options.maxChars) {
    return { body, truncated: false, originalLength: body.length };
  }
  const notice = truncationNotice(options.relativePath);
  if (options.maxChars < notice.length) {
    return { body: notice, truncated: true, originalLength: body.length };
  }
  const sliceEnd = safeSliceEnd(body, options.maxChars - notice.length);
  return { body: `${body.slice(0, sliceEnd)}${notice}`, truncated: true, originalLength: body.length };
}
function truncateBudget(input) {
  const results = [];
  let remainingBudget = input.maxResultChars;
  for (const rule of input.rules) {
    if (remainingBudget >= rule.body.length) {
      results.push({ body: rule.body, truncated: false, relativePath: rule.relativePath });
      remainingBudget -= rule.body.length;
      continue;
    }
    const notice = truncationNotice(rule.relativePath);
    if (remainingBudget <= notice.length) {
      break;
    }
    const sliceEnd = safeSliceEnd(rule.body, remainingBudget - notice.length);
    const body = `${rule.body.slice(0, sliceEnd)}${notice}`;
    results.push({ body, truncated: true, relativePath: rule.relativePath });
    remainingBudget -= body.length;
  }
  return results;
}

// src/rules/formatter.ts
function formatRule(rule) {
  return `Instructions from: ${rule.path}
${rule.body}`;
}
function truncateRules(rules, options) {
  const perRuleTruncated = rules.map((rule) => ({
    path: rule.path,
    relativePath: rule.relativePath,
    body: truncateRule(rule.body, { maxChars: options.maxRuleChars, relativePath: rule.relativePath }).body
  }));
  const budgetedRules = truncateBudget({
    rules: perRuleTruncated.map((rule) => ({ body: rule.body, relativePath: rule.relativePath })),
    maxResultChars: options.maxResultChars
  });
  const truncatedRules = [];
  for (let index = 0; index < budgetedRules.length; index += 1) {
    const sourceRule = perRuleTruncated[index];
    const budgetedRule = budgetedRules[index];
    if (sourceRule === void 0 || budgetedRule === void 0) {
      continue;
    }
    truncatedRules.push({
      path: sourceRule.path,
      relativePath: budgetedRule.relativePath,
      body: budgetedRule.body
    });
  }
  return truncatedRules;
}
function formatStaticBlock(rules, options) {
  if (rules.length === 0) {
    return "";
  }
  return `

## Project Instructions
${truncateRules(rules, options).map(formatRule).join("\n\n")}`;
}
function formatDynamicBlock(rules, targetRelativePath, options) {
  if (rules.length === 0) {
    return "";
  }
  return `

Additional project instructions matched for ${targetRelativePath}:

${truncateRules(rules, options).map(formatRule).join("\n\n")}`;
}

// src/rules/matcher.ts
var import_picomatch = __toESM(require_picomatch2(), 1);
import { createHash } from "node:crypto";
var compiledPatternSets = /* @__PURE__ */ new Map();
function matchRule(input) {
  if (input.isSingleFile) {
    return { matched: true, reason: "single-file" };
  }
  if (input.frontmatter.alwaysApply === true) {
    return { matched: true, reason: "alwaysApply" };
  }
  const patterns = normalizeGlobs(input.frontmatter);
  if (patterns.length === 0) {
    return noMatch();
  }
  const pathBases = normalizedPathBases(input.pathBases);
  const { positivePatterns, negativeMatchers } = compiledPatternSetFor(patterns);
  for (const { pattern, isMatch } of positivePatterns) {
    for (const pathBase of pathBases) {
      if (!isMatch(pathBase)) {
        continue;
      }
      if (isExcluded(pathBase, negativeMatchers)) {
        return noMatch();
      }
      return { matched: true, reason: { kind: "glob", pattern } };
    }
  }
  return noMatch();
}
function normalizeGlobs(frontmatter) {
  const patterns = [
    ...normalizePatternList(frontmatter.globs),
    ...normalizePatternList(frontmatter.paths),
    ...normalizePatternList(frontmatter.applyTo)
  ];
  return [...new Set(patterns.map(normalizePath))];
}
function hashContent(body) {
  return createHash("sha256").update(body).digest("hex");
}
function normalizePatternList(patterns) {
  if (patterns === void 0) {
    return [];
  }
  return Array.isArray(patterns) ? patterns : [patterns];
}
function normalizePath(path) {
  return path.replaceAll("\\", "/");
}
function normalizedPathBases(pathBases) {
  const normalizedBases = [normalizePath(pathBases.projectRelative)];
  if (pathBases.scopeRelative !== void 0) {
    normalizedBases.push(normalizePath(pathBases.scopeRelative));
  }
  normalizedBases.push(normalizePath(pathBases.basename));
  return normalizedBases;
}
function compiledPatternSetFor(patterns) {
  const cacheKey = JSON.stringify(patterns);
  const cached = compiledPatternSets.get(cacheKey);
  if (cached !== void 0) {
    return cached;
  }
  const compiled = compilePatternSet(patterns);
  compiledPatternSets.set(cacheKey, compiled);
  return compiled;
}
function compilePatternSet(patterns) {
  const positivePatterns = [];
  const negativeMatchers = [];
  for (const pattern of patterns) {
    if (pattern.startsWith("!")) {
      negativeMatchers.push(createGlobMatcher(pattern.slice(1)));
      continue;
    }
    positivePatterns.push({ pattern, isMatch: createGlobMatcher(pattern) });
  }
  return { positivePatterns, negativeMatchers };
}
function createGlobMatcher(pattern) {
  return (0, import_picomatch.default)(normalizePath(pattern), { bash: true, dot: true });
}
function isExcluded(pathBase, negativeMatchers) {
  for (const isMatch of negativeMatchers) {
    if (isMatch(pathBase)) {
      return true;
    }
  }
  return false;
}
function noMatch() {
  return { matched: false, reason: { kind: "no-match" } };
}

// src/rules/ordering.ts
function sortCandidates(candidates) {
  return candidates.map((candidate, index) => ({ candidate, index })).sort((left, right) => compareCandidates(left.candidate, right.candidate) || left.index - right.index).map(({ candidate }) => candidate);
}
function compareCandidates(a, b) {
  return compareBoolean(a.isGlobal, b.isGlobal) || compareNumber(a.distance, b.distance) || compareNumber(SOURCE_PRIORITY.get(a.source) ?? Infinity, SOURCE_PRIORITY.get(b.source) ?? Infinity) || compareString(a.relativePath, b.relativePath) || compareString(a.realPath, b.realPath);
}
function compareBoolean(a, b) {
  return Number(a) - Number(b);
}
function compareNumber(a, b) {
  return a - b;
}
function compareString(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

// src/rules/parser.ts
var FRONTMATTER_OPENING = "---\n";
var FRONTMATTER_OPENING_CRLF = "---\r\n";
function parseRule(content) {
  const normalizedContent = stripBom(content);
  const openingLength = getOpeningDelimiterLength(normalizedContent);
  if (openingLength === 0) {
    return { frontmatter: {}, body: normalizedContent };
  }
  const closingDelimiter = findClosingDelimiter(normalizedContent, openingLength);
  if (closingDelimiter === null) {
    return {
      frontmatter: {},
      body: normalizedContent,
      diagnostic: "Missing closing frontmatter delimiter"
    };
  }
  const yamlContent = normalizedContent.slice(openingLength, closingDelimiter.start);
  const body = normalizedContent.slice(closingDelimiter.bodyStart);
  try {
    return { frontmatter: parseYamlFrontmatter(yamlContent), body };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid YAML frontmatter";
    return {
      frontmatter: {},
      body: normalizedContent,
      diagnostic: `Malformed frontmatter: ${message}`
    };
  }
}
function stripBom(content) {
  return content.startsWith("\uFEFF") ? content.slice(1) : content;
}
function getOpeningDelimiterLength(content) {
  if (content.startsWith(FRONTMATTER_OPENING_CRLF)) return FRONTMATTER_OPENING_CRLF.length;
  if (content.startsWith(FRONTMATTER_OPENING)) return FRONTMATTER_OPENING.length;
  return 0;
}
function findClosingDelimiter(content, openingLength) {
  let lineStart = openingLength;
  while (lineStart <= content.length) {
    const nextNewline = content.indexOf("\n", lineStart);
    const lineEnd = nextNewline === -1 ? content.length : nextNewline;
    const line = content.slice(lineStart, lineEnd).replace(/\r$/, "");
    if (line === "---") {
      return {
        start: lineStart,
        bodyStart: nextNewline === -1 ? content.length : nextNewline + 1
      };
    }
    if (nextNewline === -1) break;
    lineStart = nextNewline + 1;
  }
  return null;
}
function parseYamlFrontmatter(yamlContent) {
  const lines = yamlContent.replace(/\r\n/g, "\n").split("\n");
  const frontmatter = {};
  const globValues = [];
  let lineIndex = 0;
  while (lineIndex < lines.length) {
    const rawLine = lines[lineIndex];
    if (rawLine === void 0) break;
    const line = stripComment(rawLine).trim();
    if (line.length === 0) {
      lineIndex += 1;
      continue;
    }
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) {
      throw new RuleFrontmatterParseError(`Expected key-value pair on line ${lineIndex + 1}`);
    }
    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1).trim();
    if (key === "description") {
      frontmatter.description = parseStringValue(rawValue);
      lineIndex += 1;
      continue;
    }
    if (key === "alwaysApply") {
      frontmatter.alwaysApply = parseBooleanValue(rawValue, lineIndex + 1);
      lineIndex += 1;
      continue;
    }
    if (key === "globs" || key === "paths" || key === "applyTo") {
      const parsed = parseGlobValue(rawValue, lines, lineIndex);
      for (const glob of parsed.values) {
        if (!globValues.includes(glob)) globValues.push(glob);
      }
      lineIndex += parsed.consumed;
      continue;
    }
    lineIndex += 1;
  }
  const singleGlob = globValues[0];
  if (globValues.length === 1 && singleGlob !== void 0) {
    frontmatter.globs = singleGlob;
  } else if (globValues.length > 1) {
    frontmatter.globs = globValues;
  }
  return frontmatter;
}
function parseBooleanValue(value, lineNumber) {
  if (value === "true") return true;
  if (value === "false") return false;
  throw new RuleFrontmatterParseError(`Expected boolean on line ${lineNumber}`);
}
function parseGlobValue(rawValue, lines, lineIndex) {
  if (rawValue.startsWith("[")) {
    return { values: parseInlineArray(rawValue), consumed: 1 };
  }
  if (rawValue.length === 0) {
    return parseMultilineArray(lines, lineIndex);
  }
  const value = parseStringValue(rawValue);
  if (value.includes(",")) {
    return {
      values: value.split(",").map((item) => item.trim()).filter(Boolean),
      consumed: 1
    };
  }
  return { values: [value], consumed: 1 };
}
function parseMultilineArray(lines, lineIndex) {
  const values = [];
  let consumed = 1;
  for (let index = lineIndex + 1; index < lines.length; index += 1) {
    const rawLine = lines[index];
    if (rawLine === void 0) break;
    const lineWithoutComment = stripComment(rawLine);
    if (lineWithoutComment.trim().length === 0) {
      consumed += 1;
      continue;
    }
    const arrayItem = lineWithoutComment.match(/^\s+-\s*(.*)$/);
    if (arrayItem === null) break;
    values.push(parseStringValue(arrayItem[1] ?? ""));
    consumed += 1;
  }
  return { values: values.filter(Boolean), consumed };
}
function parseInlineArray(value) {
  const closingBracketIndex = findClosingBracket(value);
  if (closingBracketIndex === -1) {
    throw new RuleFrontmatterParseError("Unclosed inline array");
  }
  const trailing = value.slice(closingBracketIndex + 1).trim();
  if (trailing.length > 0) {
    throw new RuleFrontmatterParseError("Unexpected content after inline array");
  }
  const content = value.slice(1, closingBracketIndex).trim();
  if (content.length === 0) return [];
  return splitCommaSeparated(content).map(parseStringValue).filter(Boolean);
}
function findClosingBracket(value) {
  let quote = null;
  let escaped = false;
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (character === void 0) continue;
    if (escaped) {
      escaped = false;
      continue;
    }
    if (quote !== null && character === "\\") {
      escaped = true;
      continue;
    }
    if (character === '"' || character === "'") {
      if (quote === null) quote = character;
      else if (quote === character) quote = null;
      continue;
    }
    if (quote === null && character === "]") return index;
  }
  return -1;
}
function splitCommaSeparated(value) {
  const values = [];
  let current = "";
  let quote = null;
  let escaped = false;
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (character === void 0) continue;
    if (escaped) {
      current += character;
      escaped = false;
      continue;
    }
    if (quote !== null && character === "\\") {
      current += character;
      escaped = true;
      continue;
    }
    if (character === '"' || character === "'") {
      if (quote === null) quote = character;
      else if (quote === character) quote = null;
      current += character;
      continue;
    }
    if (quote === null && character === ",") {
      values.push(current.trim());
      current = "";
      continue;
    }
    current += character;
  }
  if (quote !== null) {
    throw new RuleFrontmatterParseError("Unclosed quoted value");
  }
  values.push(current.trim());
  return values.filter(Boolean);
}
function parseStringValue(value) {
  if (value.length === 0) return "";
  if (value.startsWith('"')) return parseJsonString(value);
  if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1);
  if (value.startsWith("'")) throw new RuleFrontmatterParseError("Unclosed quoted value");
  return value;
}
function parseJsonString(value) {
  let parsedValue;
  try {
    parsedValue = JSON.parse(value);
  } catch {
    throw new RuleFrontmatterParseError("Invalid JSON-quoted string");
  }
  if (typeof parsedValue !== "string") {
    throw new RuleFrontmatterParseError("Expected JSON-quoted string");
  }
  return parsedValue;
}
function stripComment(line) {
  let quote = null;
  let escaped = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === void 0) continue;
    if (escaped) {
      escaped = false;
      continue;
    }
    if (quote !== null && character === "\\") {
      escaped = true;
      continue;
    }
    if (character === '"' || character === "'") {
      if (quote === null) quote = character;
      else if (quote === character) quote = null;
      continue;
    }
    if (quote === null && character === "#") return line.slice(0, index);
  }
  return line;
}

// src/rules/engine.ts
var MAX_DYNAMIC_MATCH_CACHE_ENTRIES = 4096;
var ROOT_SINGLE_FILE_SOURCES = new Set(PROJECT_SINGLE_FILES.filter((source) => !source.includes("/")));
function defaultConfig() {
  return {
    disabled: false,
    mode: "both",
    maxRuleChars: DEFAULT_MAX_RULE_CHARS,
    maxResultChars: DEFAULT_MAX_RESULT_CHARS,
    enabledSources: "auto"
  };
}
function createEngine(config, deps) {
  const state = createSessionState();
  const dynamicMatchCache = /* @__PURE__ */ new Map();
  function loadStaticRules(cwd) {
    state.cwd = cwd;
    if (config.disabled || config.mode === "off" || config.mode === "dynamic") {
      return emptyLoadResult(state);
    }
    const projectRoot = deps.findProjectRoot(cwd);
    const findOptions = {
      projectRoot,
      targetFile: null
    };
    const disabledSources = disabledSourcesFor(config);
    if (disabledSources !== void 0) {
      findOptions.disabledSources = disabledSources;
    }
    const candidates = deps.findCandidates(findOptions);
    const result = loadStaticCandidates(candidates, deps, projectRoot);
    storeLastLoad(state, result.rules, result.diagnostics);
    return result;
  }
  function loadDynamicRules(cwd, targetPaths) {
    state.cwd = cwd;
    if (config.disabled || config.mode === "off" || config.mode === "static" || targetPaths.length === 0) {
      return emptyLoadResult(state);
    }
    const rules = [];
    const diagnostics = [];
    const seenRules = /* @__PURE__ */ new Set();
    const loadedRuleContent = /* @__PURE__ */ new Map();
    const projectMembership = /* @__PURE__ */ new Map();
    const disabledSources = disabledSourcesFor(config);
    const discoveryCache = createRuleDiscoveryCache();
    const candidateDiscoveryCache = /* @__PURE__ */ new Map();
    const cwdProjectRoot = deps.findProjectRoot(cwd);
    for (const targetFile of uniqueStrings(targetPaths)) {
      const projectRoot = cwdProjectRoot !== null && isSameOrChildPath2(targetFile, cwdProjectRoot) ? cwdProjectRoot : deps.findProjectRoot(targetFile);
      const findOptions = {
        projectRoot,
        targetFile,
        cache: discoveryCache
      };
      if (disabledSources !== void 0) {
        findOptions.disabledSources = disabledSources;
      }
      const candidates = findSortedCandidatesCached(candidateDiscoveryCache, deps.findCandidates, findOptions);
      for (const candidate of candidates) {
        const loadedRule = loadCandidate(
          candidate,
          deps,
          diagnostics,
          projectRoot,
          loadedRuleContent,
          projectMembership
        );
        if (loadedRule === null) {
          continue;
        }
        const matchReason = matchDynamicRuleCached(
          dynamicMatchCache,
          projectRoot,
          targetFile,
          candidate,
          loadedRule,
          deps.matchRule ?? matchRule
        );
        if (matchReason === null) {
          continue;
        }
        const dedupKey = ruleDedupKey(loadedRule);
        if (seenRules.has(dedupKey)) {
          continue;
        }
        seenRules.add(dedupKey);
        rules.push({ ...loadedRule, matchReason });
      }
    }
    const sortedRules = sortCandidates(rules);
    storeLastLoad(state, sortedRules, diagnostics);
    return { rules: sortedRules, diagnostics };
  }
  return {
    state,
    config,
    loadStaticRules,
    loadDynamicRules,
    formatStatic: (rules) => formatStaticBlock(rules, { maxRuleChars: config.maxRuleChars, maxResultChars: config.maxResultChars }),
    formatDynamic: (rules, target) => formatDynamicBlock(rules, target, {
      maxRuleChars: config.maxRuleChars,
      maxResultChars: config.maxResultChars
    }),
    resetSession: (cwd) => {
      clearSession(state);
      dynamicMatchCache.clear();
      if (cwd !== void 0) {
        state.cwd = cwd;
      }
    },
    isStaticInjected: (rule) => isStaticInjected(state, rule),
    isDynamicInjected: (rule) => isDynamicInjected(state, rule),
    markStaticInjected: (rule) => markStaticInjected(state, rule),
    markDynamicInjected: (rule) => markDynamicInjected(state, rule)
  };
}
function matchDynamicRuleCached(cache, projectRoot, targetFile, candidate, loadedRule, matchRuleImpl) {
  const cacheKey = dynamicMatchCacheKey(projectRoot, targetFile, candidate, loadedRule.contentHash);
  if (cache.has(cacheKey)) {
    const cachedReason = cache.get(cacheKey) ?? null;
    cache.delete(cacheKey);
    cache.set(cacheKey, cachedReason);
    return cachedReason;
  }
  const matchResult = matchRuleImpl({
    frontmatter: loadedRule.frontmatter,
    isSingleFile: candidate.isSingleFile,
    pathBases: pathBasesForTarget(projectRoot, targetFile, candidate)
  });
  const reason = matchResult.matched ? matchResult.reason : null;
  setDynamicMatchCacheEntry(cache, cacheKey, reason);
  return reason;
}
function setDynamicMatchCacheEntry(cache, cacheKey, reason) {
  if (cache.size >= MAX_DYNAMIC_MATCH_CACHE_ENTRIES) {
    const oldestCacheKey = cache.keys().next().value;
    if (oldestCacheKey !== void 0) {
      cache.delete(oldestCacheKey);
    }
  }
  cache.set(cacheKey, reason);
}
function dynamicMatchCacheKey(projectRoot, targetFile, candidate, contentHash) {
  return [
    projectRoot ?? "",
    toPosixPath(resolve3(targetFile)),
    candidate.realPath,
    candidate.relativePath,
    candidate.source,
    candidate.isGlobal ? "global" : "project",
    candidate.isSingleFile ? "single" : "multi",
    String(candidate.distance),
    contentHash
  ].join("\0");
}
function loadStaticCandidates(candidates, deps, projectRoot) {
  const rules = [];
  const diagnostics = [];
  let rootSingleFileSelected = false;
  for (const candidate of sortCandidates(candidates)) {
    if (isDedupedRootSingleFile(candidate, rootSingleFileSelected)) {
      continue;
    }
    const loadedRule = loadCandidate(candidate, deps, diagnostics, projectRoot);
    if (loadedRule === null) {
      continue;
    }
    const matchReason = staticMatchReason(loadedRule);
    if (matchReason === null) {
      continue;
    }
    if (isRootSingleFile(candidate)) {
      rootSingleFileSelected = true;
    }
    rules.push({ ...loadedRule, matchReason });
  }
  return { rules: sortCandidates(rules), diagnostics };
}
function loadCandidate(candidate, deps, diagnostics, projectRoot, loadedRuleContent, projectMembership) {
  if (!isCandidateWithinProjectCached(candidate, projectRoot, projectMembership)) {
    diagnostics.push({
      severity: "warning",
      source: candidate.path,
      message: "Rule file resolves outside project root"
    });
    return null;
  }
  const cachedContent = loadedRuleContent?.get(candidate.realPath);
  if (cachedContent !== void 0) {
    return loadedRuleFromContent(candidate, cachedContent, diagnostics);
  }
  const content = deps.readFile(candidate.path);
  if (content === null) {
    loadedRuleContent?.set(candidate.realPath, null);
    diagnostics.push({ severity: "warning", source: candidate.path, message: "Unable to read rule file" });
    return null;
  }
  const parsed = parseRule(content);
  const loadedContent = {
    frontmatter: parsed.frontmatter,
    body: parsed.body,
    contentHash: hashContent(content),
    ...parsed.diagnostic === void 0 ? {} : { diagnostic: parsed.diagnostic }
  };
  loadedRuleContent?.set(candidate.realPath, loadedContent);
  return loadedRuleFromContent(candidate, loadedContent, diagnostics);
}
function loadedRuleFromContent(candidate, content, diagnostics) {
  if (content === null) {
    diagnostics.push({ severity: "warning", source: candidate.path, message: "Unable to read rule file" });
    return null;
  }
  if (content.diagnostic !== void 0) {
    diagnostics.push({ severity: "warning", source: candidate.path, message: content.diagnostic });
  }
  return {
    ...candidate,
    frontmatter: content.frontmatter,
    body: content.body,
    contentHash: content.contentHash,
    matchReason: { kind: "no-match" }
  };
}
function ruleDedupKey(rule) {
  return `${rule.realPath}::${rule.contentHash}`;
}
function isCandidateWithinProject(candidate, projectRoot) {
  if (candidate.isGlobal) {
    return true;
  }
  if (projectRoot === null) {
    return false;
  }
  const relativeRealPath = relative2(realPathOrResolved(projectRoot), realPathOrResolved(candidate.realPath));
  return relativeRealPath === "" || !relativeRealPath.startsWith("..") && !isAbsolute2(relativeRealPath);
}
function isCandidateWithinProjectCached(candidate, projectRoot, projectMembership) {
  if (projectMembership === void 0) {
    return isCandidateWithinProject(candidate, projectRoot);
  }
  const cacheKey = `${projectRoot ?? ""}\0${candidate.realPath}`;
  const cached = projectMembership.get(cacheKey);
  if (cached !== void 0) {
    return cached;
  }
  const isWithinProject = isCandidateWithinProject(candidate, projectRoot);
  projectMembership.set(cacheKey, isWithinProject);
  return isWithinProject;
}
function realPathOrResolved(path) {
  try {
    return realpathSync3.native(path);
  } catch {
    return resolve3(path);
  }
}
function findSortedCandidatesCached(cache, findCandidates, options) {
  const cacheKey = candidateDiscoveryCacheKey(options);
  const cached = cache.get(cacheKey);
  if (cached !== void 0) {
    return cached;
  }
  const candidates = sortCandidates(findCandidates(options));
  cache.set(cacheKey, candidates);
  return candidates;
}
function candidateDiscoveryCacheKey(options) {
  return [
    options.projectRoot ?? "",
    options.targetFile === null ? "" : dirname2(resolve3(options.targetFile)),
    ...[...options.disabledSources ?? []].sort()
  ].join("\0");
}
function isSameOrChildPath2(childPath, parentPath) {
  const childRelativePath = relative2(parentPath, resolve3(childPath));
  return childRelativePath === "" || !childRelativePath.startsWith("..") && !isAbsolute2(childRelativePath);
}
function staticMatchReason(rule) {
  if (rule.frontmatter.alwaysApply === true) {
    return "alwaysApply";
  }
  if (rule.isSingleFile) {
    return "single-file";
  }
  return null;
}
function disabledSourcesFor(config) {
  if (config.enabledSources === "auto") {
    return void 0;
  }
  const enabledSources = new Set(config.enabledSources);
  return new Set([...SOURCE_PRIORITY.keys()].filter((source) => !enabledSources.has(source)));
}
function isDedupedRootSingleFile(candidate, rootSingleFileSelected) {
  return rootSingleFileSelected && isRootSingleFile(candidate);
}
function isRootSingleFile(candidate) {
  return candidate.distance === 0 && candidate.isSingleFile && ROOT_SINGLE_FILE_SOURCES.has(candidate.source);
}
function pathBasesForTarget(projectRoot, targetFile, candidate) {
  const targetBasename = basename(targetFile);
  if (projectRoot === null) {
    return { projectRelative: targetBasename, basename: targetBasename };
  }
  const projectRelative = toPosixPath(relative2(projectRoot, targetFile));
  const scopeDirectory = scopeDirectoryForCandidate(projectRoot, candidate);
  if (scopeDirectory === null) {
    return { projectRelative, basename: targetBasename };
  }
  return {
    projectRelative,
    scopeRelative: toPosixPath(relative2(scopeDirectory, targetFile)),
    basename: targetBasename
  };
}
function scopeDirectoryForCandidate(projectRoot, candidate) {
  if (candidate.isGlobal) {
    return null;
  }
  if (candidate.isSingleFile) {
    return dirname2(candidate.path);
  }
  const sourceIndex = candidate.relativePath.indexOf(candidate.source);
  if (sourceIndex === -1) {
    return projectRoot;
  }
  const scopeRelativeDirectory = candidate.relativePath.slice(0, sourceIndex).replace(/\/$/, "");
  return scopeRelativeDirectory.length === 0 ? projectRoot : join3(projectRoot, scopeRelativeDirectory);
}
function toPosixPath(path) {
  return path.replaceAll("\\", "/");
}
function storeLastLoad(state, rules, diagnostics) {
  state.loadedRules.length = 0;
  state.loadedRules.push(...rules);
  state.diagnostics.length = 0;
  state.diagnostics.push(...diagnostics);
}
function emptyLoadResult(state) {
  storeLastLoad(state, [], []);
  return { rules: [], diagnostics: [] };
}
function uniqueStrings(values) {
  const uniqueValues = [];
  const seenValues = /* @__PURE__ */ new Set();
  for (const value of values) {
    if (seenValues.has(value)) {
      continue;
    }
    seenValues.add(value);
    uniqueValues.push(value);
  }
  return uniqueValues;
}

// src/config.ts
var MODE_VALUES = /* @__PURE__ */ new Set(["static", "dynamic", "both", "off"]);
function configFromEnvironment(env = process.env) {
  const config = defaultConfig();
  config.disabled = isTruthy(firstEnv(env, "CODEX_RULES_DISABLED", "PI_RULES_DISABLED"));
  config.mode = parseMode(firstEnv(env, "CODEX_RULES_MODE", "PI_RULES_MODE")) ?? config.mode;
  config.maxRuleChars = parsePositiveInteger(firstEnv(env, "CODEX_RULES_MAX_RULE_CHARS", "PI_RULES_MAX_RULE_CHARS")) ?? config.maxRuleChars;
  config.maxResultChars = parsePositiveInteger(firstEnv(env, "CODEX_RULES_MAX_RESULT_CHARS", "PI_RULES_MAX_RESULT_CHARS")) ?? config.maxResultChars;
  config.enabledSources = parseEnabledSources(
    firstEnv(env, "CODEX_RULES_ENABLED_SOURCES", "PI_RULES_ENABLED_SOURCES")
  );
  return config;
}
function firstEnv(env, ...names) {
  for (const name of names) {
    const value = env[name];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }
  return void 0;
}
function isTruthy(value) {
  if (value === void 0) return false;
  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}
function parseMode(value) {
  if (value === void 0) return void 0;
  const normalized = value.trim().toLowerCase();
  return MODE_VALUES.has(normalized) ? normalized : void 0;
}
function parsePositiveInteger(value) {
  if (value === void 0) return void 0;
  const parsed = Number.parseInt(value.trim(), 10);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : void 0;
}
function parseEnabledSources(value) {
  if (value === void 0 || value.trim().toLowerCase() === "auto") {
    return "auto";
  }
  const validSources = new Set(SOURCE_PRIORITY.keys());
  const sources = [];
  for (const rawSource of value.split(",")) {
    const source = rawSource.trim();
    if (!validSources.has(source)) {
      continue;
    }
    sources.push(source);
  }
  return sources.length > 0 ? sources : "auto";
}

// src/debug-log.ts
import { performance } from "node:perf_hooks";
import { debuglog } from "node:util";
var debug = debuglog("codex-rules");
var noopTimer = {
  lap: () => {
  },
  done: () => {
  }
};
function createHookDebugTimer(hookName) {
  if (!debug.enabled) {
    return noopTimer;
  }
  const startMs = performance.now();
  let lastMs = startMs;
  return {
    lap: (phase, fields = {}) => {
      const nowMs = performance.now();
      writeDebugLine(hookName, phase, nowMs - lastMs, nowMs - startMs, fields);
      lastMs = nowMs;
    },
    done: (fields = {}) => {
      const nowMs = performance.now();
      writeDebugLine(hookName, "done", nowMs - lastMs, nowMs - startMs, fields);
      lastMs = nowMs;
    }
  };
}
function writeDebugLine(hookName, phase, durationMs, totalMs, fields) {
  debug(
    "%s phase=%s ms=%s total_ms=%s%s",
    hookName,
    phase,
    durationMs.toFixed(3),
    totalMs.toFixed(3),
    formatFields(fields)
  );
}
function formatFields(fields) {
  const entries = Object.entries(fields);
  if (entries.length === 0) {
    return "";
  }
  return ` ${entries.map(([key, value]) => `${key}=${String(value)}`).join(" ")}`;
}

// src/persistent-cache.ts
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir as homedir2 } from "node:os";
import { dirname as dirname3, join as join4 } from "node:path";
function hydrateEngineState(engine, cachePath) {
  const state = readSessionState(cachePath);
  engine.state.staticDedup.clear();
  engine.state.dynamicDedup.clear();
  engine.state.dynamicTargetFingerprints.clear();
  for (const key of state.staticDedup) {
    engine.state.staticDedup.add(key);
  }
  for (const [scope, keys] of Object.entries(state.dynamicDedup)) {
    engine.state.dynamicDedup.set(scope, new Set(keys));
  }
  for (const [targetKey, fingerprint] of Object.entries(state.dynamicTargetFingerprints ?? {})) {
    engine.state.dynamicTargetFingerprints.set(targetKey, fingerprint);
  }
}
function persistEngineState(engine, cachePath, completedPostCompactKind) {
  const currentState = readSessionState(cachePath);
  const dynamicDedup = {};
  for (const [scope, keys] of engine.state.dynamicDedup.entries()) {
    dynamicDedup[scope] = [...keys];
  }
  const postCompactPending = nextPostCompactPending(currentState, completedPostCompactKind);
  writeSessionState(cachePath, {
    staticDedup: [...engine.state.staticDedup],
    dynamicDedup,
    dynamicTargetFingerprints: Object.fromEntries(engine.state.dynamicTargetFingerprints.entries()),
    ...postCompactPending === void 0 ? {} : { postCompactPending }
  });
}
function clearSessionState(cachePath) {
  rmSync(cachePath, { force: true });
}
function markSessionCompacted(cachePath) {
  writeSessionState(cachePath, { ...emptyState(), postCompactPending: { static: true, dynamic: true } });
}
function hasPostCompactPending(cachePath) {
  return postCompactPendingKinds(readSessionState(cachePath)).size > 0;
}
function isPostCompactPending(cachePath, kind) {
  return postCompactPendingKinds(readSessionState(cachePath)).has(kind);
}
function sessionCachePath(sessionId, pluginDataRoot) {
  const root = pluginDataRoot ?? process.env["PLUGIN_DATA"] ?? join4(homedir2(), ".codex", "codex-rules");
  return join4(root, "sessions", `${safePathSegment(sessionId)}.json`);
}
function readSessionState(cachePath) {
  try {
    const parsed = JSON.parse(readFileSync(cachePath, "utf8"));
    if (!isSerializedSessionState(parsed)) return emptyState();
    return parsed;
  } catch {
    return emptyState();
  }
}
function writeSessionState(cachePath, state) {
  mkdirSync(dirname3(cachePath), { recursive: true });
  writeFileSync(cachePath, `${JSON.stringify(state)}
`);
}
function emptyState() {
  return { staticDedup: [], dynamicDedup: {}, dynamicTargetFingerprints: {} };
}
function nextPostCompactPending(state, completedKind) {
  const pendingKinds = postCompactPendingKinds(state);
  if (completedKind !== void 0) {
    pendingKinds.delete(completedKind);
  }
  if (pendingKinds.size === 0) {
    return void 0;
  }
  return {
    ...pendingKinds.has("static") ? { static: true } : {},
    ...pendingKinds.has("dynamic") ? { dynamic: true } : {}
  };
}
function postCompactPendingKinds(state) {
  const pendingKinds = /* @__PURE__ */ new Set();
  if (state.compacted === true || state.postCompactPending?.static === true) {
    pendingKinds.add("static");
  }
  if (state.compacted === true || state.postCompactPending?.dynamic === true) {
    pendingKinds.add("dynamic");
  }
  return pendingKinds;
}
function safePathSegment(value) {
  return value.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 120) || "unknown-session";
}
function isSerializedSessionState(value) {
  if (!isRecord(value) || !Array.isArray(value["staticDedup"]) || !isRecord(value["dynamicDedup"])) {
    return false;
  }
  const staticDedup = value["staticDedup"];
  const dynamicDedup = value["dynamicDedup"];
  const dynamicTargetFingerprints = value["dynamicTargetFingerprints"];
  const postCompactPending = value["postCompactPending"];
  const compacted = value["compacted"];
  return staticDedup.every((item) => typeof item === "string") && Object.values(dynamicDedup).every(
    (item) => Array.isArray(item) && item.every((nestedItem) => typeof nestedItem === "string")
  ) && (dynamicTargetFingerprints === void 0 || isRecord(dynamicTargetFingerprints) && Object.entries(dynamicTargetFingerprints).every(
    ([targetKey, fingerprint]) => typeof targetKey === "string" && typeof fingerprint === "string"
  )) && (postCompactPending === void 0 || isPostCompactPendingState(postCompactPending)) && (compacted === void 0 || typeof compacted === "boolean");
}
function isPostCompactPendingState(value) {
  return isRecord(value) && (value["static"] === void 0 || typeof value["static"] === "boolean") && (value["dynamic"] === void 0 || typeof value["dynamic"] === "boolean");
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/rules/project-root.ts
import { existsSync as existsSync3, statSync as statSync3 } from "node:fs";
import { dirname as dirname4, join as join5, resolve as resolve4 } from "node:path";
function findProjectRoot(startPath, markers = PROJECT_MARKERS) {
  const resolvedStartPath = resolve4(startPath);
  if (!existsSync3(resolvedStartPath)) {
    return null;
  }
  const startStats = statSync3(resolvedStartPath);
  let currentDirectory = startStats.isDirectory() ? resolvedStartPath : dirname4(resolvedStartPath);
  const filesystemRoot = resolve4("/");
  while (true) {
    for (const marker of markers) {
      if (existsSync3(join5(currentDirectory, marker))) {
        return currentDirectory;
      }
    }
    if (currentDirectory === filesystemRoot) {
      return null;
    }
    currentDirectory = dirname4(currentDirectory);
  }
}

// src/tool-paths.ts
import { existsSync as existsSync4, statSync as statSync4 } from "node:fs";
import { isAbsolute as isAbsolute3, resolve as resolve5 } from "node:path";
var COMMAND_TOOL_NAMES = /* @__PURE__ */ new Set(["bash", "shell_command", "exec_command"]);
var TRACKED_TOOL_NAMES = /* @__PURE__ */ new Set([
  "read",
  "read_file",
  "mcp__filesystem__read_file",
  "mcp__filesystem__read_multiple_files",
  "mcp__filesystem__write_file",
  "mcp__filesystem__edit_file",
  "write",
  "edit",
  "multiedit",
  "multi_edit",
  "apply_patch",
  "bash",
  "shell_command",
  "exec_command"
]);
function extractCodexToolPaths(input, cwd) {
  const toolName = input.tool_name.toLowerCase();
  if (!TRACKED_TOOL_NAMES.has(toolName) || isFailedToolResponse(input.tool_response)) {
    return [];
  }
  const paths = /* @__PURE__ */ new Set();
  const toolInput = isRecord2(input.tool_input) ? input.tool_input : {};
  addCommonPathFields(paths, toolInput, cwd);
  addPatchPayloadPaths(paths, toolInput, cwd);
  addPatchRecordPaths(paths, toolInput["files"], cwd);
  addPatchRecordPaths(paths, toolInput["changes"], cwd);
  if (COMMAND_TOOL_NAMES.has(toolName)) {
    const command2 = stringProperty(toolInput, "command") ?? stringProperty(toolInput, "cmd");
    const workdir = stringProperty(toolInput, "workdir") ?? stringProperty(toolInput, "cwd");
    addCommandPaths(paths, command2, workdir === void 0 ? cwd : resolvePath(cwd, workdir));
  }
  return [...paths];
}
function addCommonPathFields(paths, input, cwd) {
  for (const key of ["path", "filePath", "file_path", "target", "targetPath", "target_path"]) {
    addPath(paths, input[key], cwd, false);
  }
  for (const key of ["paths", "filePaths", "file_paths"]) {
    addPathArray(paths, input[key], cwd, false);
  }
}
function addPatchPayloadPaths(paths, input, cwd) {
  for (const key of ["input", "patch", "command", "cmd"]) {
    const value = input[key];
    if (typeof value === "string") {
      addPatchHeaderPaths(paths, value, cwd);
    }
  }
}
function addPatchHeaderPaths(paths, patch, cwd) {
  for (const line of patch.split("\n")) {
    for (const prefix of ["*** Add File: ", "*** Update File: ", "*** Move to: "]) {
      if (line.startsWith(prefix)) {
        addPath(paths, line.slice(prefix.length).trim(), cwd, false);
      }
    }
  }
}
function addPatchRecordPaths(paths, value, cwd) {
  if (!Array.isArray(value)) return;
  for (const item of value) {
    if (typeof item === "string") {
      addPath(paths, item, cwd, false);
      continue;
    }
    if (!isRecord2(item)) continue;
    addCommonPathFields(paths, item, cwd);
    for (const key of ["movePath", "move_path", "to", "from"]) {
      addPath(paths, item[key], cwd, false);
    }
  }
}
function addCommandPaths(paths, command2, cwd) {
  if (command2 === void 0) return;
  for (const token of tokenizeShell(command2)) {
    if (token.length === 0 || token.startsWith("-") || token.includes("*")) {
      continue;
    }
    addPath(paths, token, cwd, true);
  }
}
function addPathArray(paths, value, cwd, mustExist) {
  if (!Array.isArray(value)) return;
  for (const item of value) {
    addPath(paths, item, cwd, mustExist);
  }
}
function addPath(paths, value, cwd, mustExist) {
  if (typeof value !== "string" || value.length === 0 || looksLikeUrl(value)) {
    return;
  }
  const path = resolvePath(cwd, value);
  if (mustExist && !isExistingFile(path)) {
    return;
  }
  paths.add(path);
}
function resolvePath(cwd, filePath) {
  return isAbsolute3(filePath) ? filePath : resolve5(cwd, filePath);
}
function isExistingFile(filePath) {
  try {
    return existsSync4(filePath) && statSync4(filePath).isFile();
  } catch {
    return false;
  }
}
function looksLikeUrl(value) {
  return /^[A-Za-z][A-Za-z0-9+.-]*:\/\//.test(value);
}
function stringProperty(value, key) {
  const property = value[key];
  return typeof property === "string" && property.length > 0 ? property : void 0;
}
function tokenizeShell(command2) {
  const tokens = [];
  let current = "";
  let quote = null;
  let escaped = false;
  for (const character of command2) {
    if (escaped) {
      current += character;
      escaped = false;
      continue;
    }
    if (character === "\\") {
      escaped = true;
      continue;
    }
    if ((character === "'" || character === '"') && quote === null) {
      quote = character;
      continue;
    }
    if (quote === character) {
      quote = null;
      continue;
    }
    if (quote === null && /\s/.test(character)) {
      if (current.length > 0) {
        tokens.push(current);
        current = "";
      }
      continue;
    }
    current += character;
  }
  if (current.length > 0) {
    tokens.push(current);
  }
  return tokens;
}
function isRecord2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isFailedToolResponse(value) {
  if (!isRecord2(value)) return false;
  return value["isError"] === true || value["is_error"] === true || value["error"] === true || value["status"] === "error";
}

// src/codex-hook.ts
async function runSessionStartHook(input, options = {}) {
  const cachePath = sessionCachePath(input.session_id, options.pluginDataRoot);
  if (input.source === "clear") {
    clearSessionState(cachePath);
  } else if (input.source !== "resume" && !hasPostCompactPending(cachePath)) {
    clearSessionState(cachePath);
  }
  const postCompactPending = input.source !== "clear" && isPostCompactPending(cachePath, "static");
  const transcriptPath = input.source === "clear" || postCompactPending ? null : input.transcript_path;
  return runStaticInjection(
    input.cwd,
    transcriptPath,
    "SessionStart",
    cachePath,
    options,
    postCompactPending ? "static" : void 0
  );
}
async function runPostCompactHook(input, options = {}) {
  markSessionCompacted(sessionCachePath(input.session_id, options.pluginDataRoot));
  return "";
}
async function runUserPromptSubmitHook(input, options = {}) {
  const cachePath = sessionCachePath(input.session_id, options.pluginDataRoot);
  const postCompactPending = isPostCompactPending(cachePath, "static");
  const transcriptPath = postCompactPending ? null : input.transcript_path;
  return runStaticInjection(
    input.cwd,
    transcriptPath,
    "UserPromptSubmit",
    cachePath,
    options,
    postCompactPending ? "static" : void 0
  );
}
async function runPostToolUseHook(input, options = {}) {
  const debugTimer = createHookDebugTimer("PostToolUse");
  const config = configFromEnvironment(options.env);
  debugTimer.lap("config", { disabled: config.disabled, mode: config.mode });
  if (config.disabled || config.mode === "off" || config.mode === "static") {
    debugTimer.done({ outputBytes: 0, reason: "disabled" });
    return "";
  }
  const targetPaths = extractCodexToolPaths(input, input.cwd);
  debugTimer.lap("extract", {
    targets: targetPaths.length,
    uniqueTargets: uniqueStrings2(targetPaths).length,
    tool: input.tool_name
  });
  const firstTargetPath = targetPaths[0];
  if (firstTargetPath === void 0) {
    debugTimer.done({ outputBytes: 0, reason: "no-target" });
    return "";
  }
  const cachePath = sessionCachePath(input.session_id, options.pluginDataRoot);
  const postCompactPending = isPostCompactPending(cachePath, "dynamic");
  const transcriptPath = postCompactPending ? null : input.transcript_path;
  const engine = createRulesEngine(options);
  hydrateEngineState(engine, cachePath);
  debugTimer.lap("hydrate", {
    dynamicDedupScopes: engine.state.dynamicDedup.size,
    dynamicTargetFingerprints: engine.state.dynamicTargetFingerprints.size,
    staticDedup: engine.state.staticDedup.size
  });
  const dynamicTargetFingerprints = fingerprintDynamicTargets(input.cwd, targetPaths, config);
  debugTimer.lap("fingerprint", { fingerprints: dynamicTargetFingerprints.length });
  const pendingTargetFingerprints = dynamicTargetFingerprints.filter(
    (target) => engine.state.dynamicTargetFingerprints.get(target.cacheKey) !== target.fingerprint
  );
  debugTimer.lap("pending", { pending: pendingTargetFingerprints.length });
  if (pendingTargetFingerprints.length === 0) {
    persistEngineState(engine, cachePath, postCompactPending ? "dynamic" : void 0);
    debugTimer.lap("persist", { reason: "no-pending" });
    debugTimer.done({ outputBytes: 0, reason: "no-pending" });
    return "";
  }
  const loaded = engine.loadDynamicRules(
    input.cwd,
    pendingTargetFingerprints.map((target) => target.targetPath)
  );
  debugTimer.lap("load", { diagnostics: loaded.diagnostics.length, loadedRules: loaded.rules.length });
  const rules = filterRulesAlreadyInTranscript(
    loaded.rules.filter((rule) => !engine.isStaticInjected(rule) && !engine.isDynamicInjected(rule)),
    transcriptPath,
    (rule) => {
      engine.markDynamicInjected(rule);
    }
  );
  debugTimer.lap("filter", { rules: rules.length });
  for (const target of pendingTargetFingerprints) {
    engine.state.dynamicTargetFingerprints.set(target.cacheKey, target.fingerprint);
  }
  if (rules.length === 0) {
    persistEngineState(engine, cachePath, postCompactPending ? "dynamic" : void 0);
    debugTimer.lap("persist", { reason: "no-rules" });
    debugTimer.done({ outputBytes: 0, reason: "no-rules" });
    return "";
  }
  const firstPendingTargetPath = pendingTargetFingerprints[0]?.targetPath ?? firstTargetPath;
  const block = engine.formatDynamic(rules, displayPath(input.cwd, firstPendingTargetPath));
  debugTimer.lap("format", { blockChars: block.length, rules: rules.length });
  for (const rule of rules) {
    engine.markDynamicInjected(rule);
  }
  persistEngineState(engine, cachePath, postCompactPending ? "dynamic" : void 0);
  debugTimer.lap("persist", { reason: "emit" });
  const output = formatAdditionalContextOutput("PostToolUse", block);
  debugTimer.done({ outputBytes: Buffer.byteLength(output), reason: "emit" });
  return output;
}
function runStaticInjection(cwd, transcriptPath, eventName, cachePath, options, completedPostCompactChannel) {
  const config = configFromEnvironment(options.env);
  if (config.disabled || config.mode === "off" || config.mode === "dynamic") {
    return "";
  }
  const engine = createRulesEngine(options);
  hydrateEngineState(engine, cachePath);
  engine.state.cwd = cwd;
  const loaded = engine.loadStaticRules(cwd);
  const rules = filterRulesAlreadyInTranscript(
    loaded.rules.filter((rule) => !engine.isStaticInjected(rule)),
    transcriptPath,
    (rule) => {
      engine.markStaticInjected(rule);
    }
  );
  if (rules.length === 0) {
    persistEngineState(engine, cachePath, completedPostCompactChannel);
    return "";
  }
  const block = engine.formatStatic(rules);
  for (const rule of rules) {
    engine.markStaticInjected(rule);
  }
  persistEngineState(engine, cachePath, completedPostCompactChannel);
  return formatAdditionalContextOutput(eventName, block);
}
function filterRulesAlreadyInTranscript(rules, transcriptPath, markInjected) {
  if (rules.length === 0 || transcriptPath === null) {
    return [...rules];
  }
  const transcriptText = readTranscriptSearchText(transcriptPath);
  if (transcriptText === null) {
    return [...rules];
  }
  const pendingRules = [];
  for (const rule of rules) {
    if (isRuleAlreadyInTranscript(rule, transcriptText)) {
      markInjected(rule);
      continue;
    }
    pendingRules.push(rule);
  }
  return pendingRules;
}
function isRuleAlreadyInTranscript(rule, transcriptText) {
  const bodyNeedle = rule.body.trim().slice(0, 2e3);
  if (bodyNeedle.length === 0 || !transcriptText.includes(bodyNeedle)) {
    return false;
  }
  const markers = [
    `Instructions from: ${rule.path}`,
    `Instructions from: ${rule.realPath}`,
    rule.relativePath.length === 0 ? null : rule.relativePath
  ].filter((marker) => marker !== null);
  return markers.some((marker) => transcriptText.includes(marker));
}
function readTranscriptSearchText(transcriptPath) {
  try {
    const rawTranscript = readFileSync2(transcriptPath, "utf8");
    return [rawTranscript, ...collectJsonLineStrings(rawTranscript)].join("\n");
  } catch {
    return null;
  }
}
function collectJsonLineStrings(rawTranscript) {
  const values = [];
  for (const line of rawTranscript.split(/\r?\n/)) {
    if (line.trim().length === 0) {
      continue;
    }
    try {
      const parsed = JSON.parse(line);
      collectStrings(parsed, values);
    } catch {
    }
  }
  return values;
}
function collectStrings(value, output) {
  if (typeof value === "string") {
    output.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      collectStrings(item, output);
    }
    return;
  }
  if (typeof value !== "object" || value === null) {
    return;
  }
  for (const item of Object.values(value)) {
    collectStrings(item, output);
  }
}
function createRulesEngine(options) {
  const config = configFromEnvironment(options.env);
  return createEngine(config, {
    findCandidates: findRuleCandidates,
    findProjectRoot,
    readFile: (path) => {
      try {
        return readFileSync2(path, "utf8");
      } catch {
        return null;
      }
    }
  });
}
function fingerprintDynamicTargets(cwd, targetPaths, config) {
  const disabledSources = disabledSourcesFor2(config);
  const discoveryCache = createRuleDiscoveryCache();
  const cwdProjectRoot = findProjectRoot(cwd);
  const fingerprints = [];
  for (const targetPath of uniqueStrings2(targetPaths)) {
    const projectRoot = cwdProjectRoot !== null && isSameOrChildPath3(targetPath, cwdProjectRoot) ? cwdProjectRoot : findProjectRoot(targetPath);
    const findOptions = {
      projectRoot,
      targetFile: targetPath,
      cache: discoveryCache
    };
    if (disabledSources !== void 0) {
      findOptions.disabledSources = disabledSources;
    }
    const candidates = findRuleCandidates(findOptions);
    const candidateFingerprint = sortCandidates(candidates).map(fingerprintCandidate).join("");
    const cacheKey = dynamicTargetCacheKey(targetPath);
    fingerprints.push({
      targetPath,
      cacheKey,
      fingerprint: hashContent(
        [
          "v1",
          config.enabledSources === "auto" ? "auto" : config.enabledSources.join(","),
          projectRoot ?? "",
          cacheKey,
          candidateFingerprint
        ].join("\0")
      )
    });
  }
  return fingerprints;
}
function fingerprintCandidate(candidate) {
  return [
    candidate.realPath,
    candidate.relativePath,
    candidate.source,
    candidate.isGlobal ? "global" : "project",
    candidate.isSingleFile ? "single" : "multi",
    String(candidate.distance),
    fileFingerprint(candidate.path)
  ].join("\0");
}
function fileFingerprint(filePath) {
  try {
    const stats = statSync5(filePath, { bigint: true });
    return `${stats.mtimeNs}:${stats.ctimeNs}:${stats.size}`;
  } catch {
    return "missing";
  }
}
function disabledSourcesFor2(config) {
  if (config.enabledSources === "auto") {
    return void 0;
  }
  const enabledSources = new Set(config.enabledSources);
  return new Set([...SOURCE_PRIORITY.keys()].filter((source) => !enabledSources.has(source)));
}
function dynamicTargetCacheKey(targetPath) {
  return toPosixPath2(resolve6(targetPath));
}
function isSameOrChildPath3(childPath, parentPath) {
  const childRelativePath = relative3(parentPath, resolve6(childPath));
  return childRelativePath === "" || !childRelativePath.startsWith("..") && !isAbsolute4(childRelativePath);
}
function uniqueStrings2(values) {
  const uniqueValues = [];
  const seenValues = /* @__PURE__ */ new Set();
  for (const value of values) {
    if (seenValues.has(value)) {
      continue;
    }
    seenValues.add(value);
    uniqueValues.push(value);
  }
  return uniqueValues;
}
function formatAdditionalContextOutput(eventName, additionalContext) {
  if (additionalContext.trim().length === 0) return "";
  return `${JSON.stringify({
    hookSpecificOutput: {
      hookEventName: eventName,
      additionalContext
    }
  })}
`;
}
function displayPath(cwd, filePath) {
  const rel = isAbsolute4(filePath) ? relative3(cwd, filePath) : filePath;
  return toPosixPath2(rel);
}
function toPosixPath2(path) {
  return path.replaceAll("\\", "/");
}

// src/cli.ts
var command = process.argv[2];
var subcommand = process.argv[3];
if (command === "hook" && subcommand === "session-start") {
  await runHookCli("SessionStart");
} else if (command === "hook" && subcommand === "user-prompt-submit") {
  await runHookCli("UserPromptSubmit");
} else if (command === "hook" && subcommand === "post-tool-use") {
  await runHookCli("PostToolUse");
} else if (command === "hook" && subcommand === "post-compact") {
  await runHookCli("PostCompact");
} else {
  process.stderr.write("Usage: codex-rules hook [session-start|user-prompt-submit|post-tool-use|post-compact]\n");
  process.exitCode = 1;
}
async function runHookCli(eventName) {
  const raw = await readStdin();
  if (raw.trim().length === 0) return;
  const parsed = parseHookInput(raw);
  if (!parsed) return;
  const pluginDataRoot = process.env["PLUGIN_DATA"];
  const options = pluginDataRoot === void 0 ? {} : { pluginDataRoot };
  const output = await runHook(eventName, parsed, options);
  if (output.length > 0) {
    processStdout.write(output);
  }
}
async function runHook(eventName, parsed, options) {
  switch (eventName) {
    case "SessionStart":
      return isCodexSessionStartInput(parsed) ? await runSessionStartHook(parsed, options) : "";
    case "UserPromptSubmit":
      return isCodexUserPromptSubmitInput(parsed) ? await runUserPromptSubmitHook(parsed, options) : "";
    case "PostToolUse":
      return isCodexPostToolUseInput(parsed) ? await runPostToolUseHook(parsed, options) : "";
    case "PostCompact":
      return isCodexPostCompactInput(parsed) ? await runPostCompactHook(parsed, options) : "";
  }
}
function parseHookInput(raw) {
  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return void 0;
  }
}
function isCodexSessionStartInput(value) {
  return isRecord3(value) && value["hook_event_name"] === "SessionStart" && typeof value["session_id"] === "string" && isStringOrNull(value["transcript_path"]) && typeof value["cwd"] === "string" && typeof value["model"] === "string" && typeof value["permission_mode"] === "string" && typeof value["source"] === "string";
}
function isCodexUserPromptSubmitInput(value) {
  return isRecord3(value) && value["hook_event_name"] === "UserPromptSubmit" && typeof value["session_id"] === "string" && typeof value["turn_id"] === "string" && isStringOrNull(value["transcript_path"]) && typeof value["cwd"] === "string" && typeof value["model"] === "string" && typeof value["permission_mode"] === "string" && typeof value["prompt"] === "string";
}
function isCodexPostToolUseInput(value) {
  return isRecord3(value) && value["hook_event_name"] === "PostToolUse" && typeof value["session_id"] === "string" && typeof value["turn_id"] === "string" && isStringOrNull(value["transcript_path"]) && typeof value["cwd"] === "string" && typeof value["model"] === "string" && typeof value["permission_mode"] === "string" && typeof value["tool_name"] === "string" && typeof value["tool_use_id"] === "string";
}
function isCodexPostCompactInput(value) {
  return isRecord3(value) && value["hook_event_name"] === "PostCompact" && typeof value["session_id"] === "string" && typeof value["turn_id"] === "string" && isStringOrNull(value["transcript_path"]) && typeof value["cwd"] === "string" && typeof value["model"] === "string" && (value["trigger"] === "manual" || value["trigger"] === "auto");
}
function isStringOrNull(value) {
  return typeof value === "string" || value === null;
}
function isRecord3(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function readStdin() {
  return new Promise((resolve7, reject) => {
    let data = "";
    processStdin.setEncoding("utf8");
    processStdin.on("data", (chunk) => {
      data += chunk;
    });
    processStdin.once("error", reject);
    processStdin.once("end", () => {
      resolve7(data);
    });
  });
}
