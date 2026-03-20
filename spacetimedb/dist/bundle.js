import * as _syscalls2_0 from "spacetime:sys@2.0";
import { moduleHooks } from "spacetime:sys@2.0";

//#region C:/Users/jorne/Documents/projects/gruppe/demo/spacetimedb/node_modules/.pnpm/headers-polyfill@4.0.3/node_modules/headers-polyfill/lib/index.mjs
var __create$1 = Object.create;
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$1 = Object.getOwnPropertyNames;
var __getProtoOf$1 = Object.getPrototypeOf;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __commonJS$1 = (cb, mod) => function __require() {
	return mod || (0, cb[__getOwnPropNames$1(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps$1 = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (let key of __getOwnPropNames$1(from)) if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$1(to, key, {
			get: () => from[key],
			enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM$1 = (mod, isNodeMode, target) => (target = mod != null ? __create$1(__getProtoOf$1(mod)) : {}, __copyProps$1(isNodeMode || !mod || !mod.__esModule ? __defProp$1(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var import_set_cookie_parser = __toESM$1(__commonJS$1({ "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
	"use strict";
	var defaultParseOptions = {
		decodeValues: true,
		map: false,
		silent: false
	};
	function isNonEmptyString(str) {
		return typeof str === "string" && !!str.trim();
	}
	function parseString(setCookieValue, options) {
		var parts = setCookieValue.split(";").filter(isNonEmptyString);
		var parsed = parseNameValuePair(parts.shift());
		var name = parsed.name;
		var value = parsed.value;
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		try {
			value = options.decodeValues ? decodeURIComponent(value) : value;
		} catch (e) {
			console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e);
		}
		var cookie = {
			name,
			value
		};
		parts.forEach(function(part) {
			var sides = part.split("=");
			var key = sides.shift().trimLeft().toLowerCase();
			var value2 = sides.join("=");
			if (key === "expires") cookie.expires = new Date(value2);
			else if (key === "max-age") cookie.maxAge = parseInt(value2, 10);
			else if (key === "secure") cookie.secure = true;
			else if (key === "httponly") cookie.httpOnly = true;
			else if (key === "samesite") cookie.sameSite = value2;
			else cookie[key] = value2;
		});
		return cookie;
	}
	function parseNameValuePair(nameValuePairStr) {
		var name = "";
		var value = "";
		var nameValueArr = nameValuePairStr.split("=");
		if (nameValueArr.length > 1) {
			name = nameValueArr.shift();
			value = nameValueArr.join("=");
		} else value = nameValuePairStr;
		return {
			name,
			value
		};
	}
	function parse(input, options) {
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		if (!input) if (!options.map) return [];
		else return {};
		if (input.headers) if (typeof input.headers.getSetCookie === "function") input = input.headers.getSetCookie();
		else if (input.headers["set-cookie"]) input = input.headers["set-cookie"];
		else {
			var sch = input.headers[Object.keys(input.headers).find(function(key) {
				return key.toLowerCase() === "set-cookie";
			})];
			if (!sch && input.headers.cookie && !options.silent) console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
			input = sch;
		}
		if (!Array.isArray(input)) input = [input];
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		if (!options.map) return input.filter(isNonEmptyString).map(function(str) {
			return parseString(str, options);
		});
		else return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
			var cookie = parseString(str, options);
			cookies2[cookie.name] = cookie;
			return cookies2;
		}, {});
	}
	function splitCookiesString2(cookiesString) {
		if (Array.isArray(cookiesString)) return cookiesString;
		if (typeof cookiesString !== "string") return [];
		var cookiesStrings = [];
		var pos = 0;
		var start;
		var ch;
		var lastComma;
		var nextStart;
		var cookiesSeparatorFound;
		function skipWhitespace() {
			while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1;
			return pos < cookiesString.length;
		}
		function notSpecialChar() {
			ch = cookiesString.charAt(pos);
			return ch !== "=" && ch !== ";" && ch !== ",";
		}
		while (pos < cookiesString.length) {
			start = pos;
			cookiesSeparatorFound = false;
			while (skipWhitespace()) {
				ch = cookiesString.charAt(pos);
				if (ch === ",") {
					lastComma = pos;
					pos += 1;
					skipWhitespace();
					nextStart = pos;
					while (pos < cookiesString.length && notSpecialChar()) pos += 1;
					if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
						cookiesSeparatorFound = true;
						pos = nextStart;
						cookiesStrings.push(cookiesString.substring(start, lastComma));
						start = pos;
					} else pos = lastComma + 1;
				} else pos += 1;
			}
			if (!cookiesSeparatorFound || pos >= cookiesString.length) cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
		}
		return cookiesStrings;
	}
	module.exports = parse;
	module.exports.parse = parse;
	module.exports.parseString = parseString;
	module.exports.splitCookiesString = splitCookiesString2;
} })());
var HEADERS_INVALID_CHARACTERS = /[^a-z0-9\-#$%&'*+.^_`|~]/i;
function normalizeHeaderName(name) {
	if (HEADERS_INVALID_CHARACTERS.test(name) || name.trim() === "") throw new TypeError("Invalid character in header field name");
	return name.trim().toLowerCase();
}
var charCodesToRemove = [
	String.fromCharCode(10),
	String.fromCharCode(13),
	String.fromCharCode(9),
	String.fromCharCode(32)
];
var HEADER_VALUE_REMOVE_REGEXP = new RegExp(`(^[${charCodesToRemove.join("")}]|$[${charCodesToRemove.join("")}])`, "g");
function normalizeHeaderValue(value) {
	return value.replace(HEADER_VALUE_REMOVE_REGEXP, "");
}
function isValidHeaderName(value) {
	if (typeof value !== "string") return false;
	if (value.length === 0) return false;
	for (let i = 0; i < value.length; i++) {
		const character = value.charCodeAt(i);
		if (character > 127 || !isToken(character)) return false;
	}
	return true;
}
function isToken(value) {
	return ![
		127,
		32,
		"(",
		")",
		"<",
		">",
		"@",
		",",
		";",
		":",
		"\\",
		"\"",
		"/",
		"[",
		"]",
		"?",
		"=",
		"{",
		"}"
	].includes(value);
}
function isValidHeaderValue(value) {
	if (typeof value !== "string") return false;
	if (value.trim() !== value) return false;
	for (let i = 0; i < value.length; i++) {
		const character = value.charCodeAt(i);
		if (character === 0 || character === 10 || character === 13) return false;
	}
	return true;
}
var NORMALIZED_HEADERS = Symbol("normalizedHeaders");
var RAW_HEADER_NAMES = Symbol("rawHeaderNames");
var HEADER_VALUE_DELIMITER = ", ";
var _a, _b, _c;
var Headers = class _Headers {
	constructor(init) {
		this[_a] = {};
		this[_b] = /* @__PURE__ */ new Map();
		this[_c] = "Headers";
		if (["Headers", "HeadersPolyfill"].includes(init?.constructor.name) || init instanceof _Headers || typeof globalThis.Headers !== "undefined" && init instanceof globalThis.Headers) init.forEach((value, name) => {
			this.append(name, value);
		}, this);
		else if (Array.isArray(init)) init.forEach(([name, value]) => {
			this.append(name, Array.isArray(value) ? value.join(HEADER_VALUE_DELIMITER) : value);
		});
		else if (init) Object.getOwnPropertyNames(init).forEach((name) => {
			const value = init[name];
			this.append(name, Array.isArray(value) ? value.join(HEADER_VALUE_DELIMITER) : value);
		});
	}
	[(_a = NORMALIZED_HEADERS, _b = RAW_HEADER_NAMES, _c = Symbol.toStringTag, Symbol.iterator)]() {
		return this.entries();
	}
	*keys() {
		for (const [name] of this.entries()) yield name;
	}
	*values() {
		for (const [, value] of this.entries()) yield value;
	}
	*entries() {
		let sortedKeys = Object.keys(this[NORMALIZED_HEADERS]).sort((a, b) => a.localeCompare(b));
		for (const name of sortedKeys) if (name === "set-cookie") for (const value of this.getSetCookie()) yield [name, value];
		else yield [name, this.get(name)];
	}
	/**
	* Returns a boolean stating whether a `Headers` object contains a certain header.
	*/
	has(name) {
		if (!isValidHeaderName(name)) throw new TypeError(`Invalid header name "${name}"`);
		return this[NORMALIZED_HEADERS].hasOwnProperty(normalizeHeaderName(name));
	}
	/**
	* Returns a `ByteString` sequence of all the values of a header with a given name.
	*/
	get(name) {
		if (!isValidHeaderName(name)) throw TypeError(`Invalid header name "${name}"`);
		return this[NORMALIZED_HEADERS][normalizeHeaderName(name)] ?? null;
	}
	/**
	* Sets a new value for an existing header inside a `Headers` object, or adds the header if it does not already exist.
	*/
	set(name, value) {
		if (!isValidHeaderName(name) || !isValidHeaderValue(value)) return;
		const normalizedName = normalizeHeaderName(name);
		const normalizedValue = normalizeHeaderValue(value);
		this[NORMALIZED_HEADERS][normalizedName] = normalizeHeaderValue(normalizedValue);
		this[RAW_HEADER_NAMES].set(normalizedName, name);
	}
	/**
	* Appends a new value onto an existing header inside a `Headers` object, or adds the header if it does not already exist.
	*/
	append(name, value) {
		if (!isValidHeaderName(name) || !isValidHeaderValue(value)) return;
		const normalizedName = normalizeHeaderName(name);
		const normalizedValue = normalizeHeaderValue(value);
		let resolvedValue = this.has(normalizedName) ? `${this.get(normalizedName)}, ${normalizedValue}` : normalizedValue;
		this.set(name, resolvedValue);
	}
	/**
	* Deletes a header from the `Headers` object.
	*/
	delete(name) {
		if (!isValidHeaderName(name)) return;
		if (!this.has(name)) return;
		const normalizedName = normalizeHeaderName(name);
		delete this[NORMALIZED_HEADERS][normalizedName];
		this[RAW_HEADER_NAMES].delete(normalizedName);
	}
	/**
	* Traverses the `Headers` object,
	* calling the given callback for each header.
	*/
	forEach(callback, thisArg) {
		for (const [name, value] of this.entries()) callback.call(thisArg, value, name, this);
	}
	/**
	* Returns an array containing the values
	* of all Set-Cookie headers associated
	* with a response
	*/
	getSetCookie() {
		const setCookieHeader = this.get("set-cookie");
		if (setCookieHeader === null) return [];
		if (setCookieHeader === "") return [""];
		return (0, import_set_cookie_parser.splitCookiesString)(setCookieHeader);
	}
};
function headersToList(headers) {
	const headersList = [];
	headers.forEach((value, name) => {
		const resolvedValue = value.includes(",") ? value.split(",").map((value2) => value2.trim()) : value;
		headersList.push([name, resolvedValue]);
	});
	return headersList;
}

//#endregion
//#region C:/Users/jorne/Documents/projects/gruppe/demo/spacetimedb/node_modules/.pnpm/spacetimedb@2.0.1/node_modules/spacetimedb/dist/server/index.mjs
typeof globalThis !== "undefined" && (globalThis.global = globalThis.global || globalThis, globalThis.window = globalThis.window || globalThis);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
	return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: () => from[key],
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(__defProp(target, "default", {
	value: mod,
	enumerable: true
}), mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var require_base64_js = __commonJS({ "../../node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js"(exports) {
	exports.byteLength = byteLength;
	exports.toByteArray = toByteArray;
	exports.fromByteArray = fromByteArray2;
	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
	var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	for (i = 0, len = code.length; i < len; ++i) {
		lookup[i] = code[i];
		revLookup[code.charCodeAt(i)] = i;
	}
	var i;
	var len;
	revLookup["-".charCodeAt(0)] = 62;
	revLookup["_".charCodeAt(0)] = 63;
	function getLens(b64) {
		var len2 = b64.length;
		if (len2 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
		var validLen = b64.indexOf("=");
		if (validLen === -1) validLen = len2;
		var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
		return [validLen, placeHoldersLen];
	}
	function byteLength(b64) {
		var lens = getLens(b64);
		var validLen = lens[0];
		var placeHoldersLen = lens[1];
		return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
	}
	function _byteLength(b64, validLen, placeHoldersLen) {
		return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
	}
	function toByteArray(b64) {
		var tmp;
		var lens = getLens(b64);
		var validLen = lens[0];
		var placeHoldersLen = lens[1];
		var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
		var curByte = 0;
		var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
		var i2;
		for (i2 = 0; i2 < len2; i2 += 4) {
			tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
			arr[curByte++] = tmp >> 16 & 255;
			arr[curByte++] = tmp >> 8 & 255;
			arr[curByte++] = tmp & 255;
		}
		if (placeHoldersLen === 2) {
			tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
			arr[curByte++] = tmp & 255;
		}
		if (placeHoldersLen === 1) {
			tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
			arr[curByte++] = tmp >> 8 & 255;
			arr[curByte++] = tmp & 255;
		}
		return arr;
	}
	function tripletToBase64(num) {
		return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
	}
	function encodeChunk(uint8, start, end) {
		var tmp;
		var output = [];
		for (var i2 = start; i2 < end; i2 += 3) {
			tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
			output.push(tripletToBase64(tmp));
		}
		return output.join("");
	}
	function fromByteArray2(uint8) {
		var tmp;
		var len2 = uint8.length;
		var extraBytes = len2 % 3;
		var parts = [];
		var maxChunkLength = 16383;
		for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
		if (extraBytes === 1) {
			tmp = uint8[len2 - 1];
			parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
		} else if (extraBytes === 2) {
			tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
			parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
		}
		return parts.join("");
	}
} });
var require_codes = __commonJS({ "../../node_modules/.pnpm/statuses@2.0.2/node_modules/statuses/codes.json"(exports, module) {
	module.exports = {
		"100": "Continue",
		"101": "Switching Protocols",
		"102": "Processing",
		"103": "Early Hints",
		"200": "OK",
		"201": "Created",
		"202": "Accepted",
		"203": "Non-Authoritative Information",
		"204": "No Content",
		"205": "Reset Content",
		"206": "Partial Content",
		"207": "Multi-Status",
		"208": "Already Reported",
		"226": "IM Used",
		"300": "Multiple Choices",
		"301": "Moved Permanently",
		"302": "Found",
		"303": "See Other",
		"304": "Not Modified",
		"305": "Use Proxy",
		"307": "Temporary Redirect",
		"308": "Permanent Redirect",
		"400": "Bad Request",
		"401": "Unauthorized",
		"402": "Payment Required",
		"403": "Forbidden",
		"404": "Not Found",
		"405": "Method Not Allowed",
		"406": "Not Acceptable",
		"407": "Proxy Authentication Required",
		"408": "Request Timeout",
		"409": "Conflict",
		"410": "Gone",
		"411": "Length Required",
		"412": "Precondition Failed",
		"413": "Payload Too Large",
		"414": "URI Too Long",
		"415": "Unsupported Media Type",
		"416": "Range Not Satisfiable",
		"417": "Expectation Failed",
		"418": "I'm a Teapot",
		"421": "Misdirected Request",
		"422": "Unprocessable Entity",
		"423": "Locked",
		"424": "Failed Dependency",
		"425": "Too Early",
		"426": "Upgrade Required",
		"428": "Precondition Required",
		"429": "Too Many Requests",
		"431": "Request Header Fields Too Large",
		"451": "Unavailable For Legal Reasons",
		"500": "Internal Server Error",
		"501": "Not Implemented",
		"502": "Bad Gateway",
		"503": "Service Unavailable",
		"504": "Gateway Timeout",
		"505": "HTTP Version Not Supported",
		"506": "Variant Also Negotiates",
		"507": "Insufficient Storage",
		"508": "Loop Detected",
		"509": "Bandwidth Limit Exceeded",
		"510": "Not Extended",
		"511": "Network Authentication Required"
	};
} });
var require_statuses = __commonJS({ "../../node_modules/.pnpm/statuses@2.0.2/node_modules/statuses/index.js"(exports, module) {
	var codes = require_codes();
	module.exports = status2;
	status2.message = codes;
	status2.code = createMessageToStatusCodeMap(codes);
	status2.codes = createStatusCodeList(codes);
	status2.redirect = {
		300: true,
		301: true,
		302: true,
		303: true,
		305: true,
		307: true,
		308: true
	};
	status2.empty = {
		204: true,
		205: true,
		304: true
	};
	status2.retry = {
		502: true,
		503: true,
		504: true
	};
	function createMessageToStatusCodeMap(codes2) {
		var map = {};
		Object.keys(codes2).forEach(function forEachCode(code) {
			var message = codes2[code];
			var status3 = Number(code);
			map[message.toLowerCase()] = status3;
		});
		return map;
	}
	function createStatusCodeList(codes2) {
		return Object.keys(codes2).map(function mapCode(code) {
			return Number(code);
		});
	}
	function getStatusCode(message) {
		var msg = message.toLowerCase();
		if (!Object.prototype.hasOwnProperty.call(status2.code, msg)) throw new Error("invalid status message: \"" + message + "\"");
		return status2.code[msg];
	}
	function getStatusMessage(code) {
		if (!Object.prototype.hasOwnProperty.call(status2.message, code)) throw new Error("invalid status code: " + code);
		return status2.message[code];
	}
	function status2(code) {
		if (typeof code === "number") return getStatusMessage(code);
		if (typeof code !== "string") throw new TypeError("code must be a number or string");
		var n = parseInt(code, 10);
		if (!isNaN(n)) return getStatusMessage(n);
		return getStatusCode(code);
	}
} });
var util_stub_exports = {};
__export(util_stub_exports, { inspect: () => inspect });
var inspect;
var init_util_stub = __esm({ "src/util-stub.ts"() {
	inspect = {};
} });
var require_util_inspect = __commonJS({ "../../node_modules/.pnpm/object-inspect@1.13.4/node_modules/object-inspect/util.inspect.js"(exports, module) {
	module.exports = (init_util_stub(), __toCommonJS(util_stub_exports)).inspect;
} });
var require_object_inspect = __commonJS({ "../../node_modules/.pnpm/object-inspect@1.13.4/node_modules/object-inspect/index.js"(exports, module) {
	var hasMap = typeof Map === "function" && Map.prototype;
	var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
	var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
	var mapForEach = hasMap && Map.prototype.forEach;
	var hasSet = typeof Set === "function" && Set.prototype;
	var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
	var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
	var setForEach = hasSet && Set.prototype.forEach;
	var weakMapHas = typeof WeakMap === "function" && WeakMap.prototype ? WeakMap.prototype.has : null;
	var weakSetHas = typeof WeakSet === "function" && WeakSet.prototype ? WeakSet.prototype.has : null;
	var weakRefDeref = typeof WeakRef === "function" && WeakRef.prototype ? WeakRef.prototype.deref : null;
	var booleanValueOf = Boolean.prototype.valueOf;
	var objectToString = Object.prototype.toString;
	var functionToString = Function.prototype.toString;
	var $match = String.prototype.match;
	var $slice = String.prototype.slice;
	var $replace = String.prototype.replace;
	var $toUpperCase = String.prototype.toUpperCase;
	var $toLowerCase = String.prototype.toLowerCase;
	var $test = RegExp.prototype.test;
	var $concat = Array.prototype.concat;
	var $join = Array.prototype.join;
	var $arrSlice = Array.prototype.slice;
	var $floor = Math.floor;
	var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
	var gOPS = Object.getOwnPropertySymbols;
	var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
	var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
	var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
		return O.__proto__;
	} : null);
	function addNumericSeparator(num, str) {
		if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) return str;
		var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
		if (typeof num === "number") {
			var int = num < 0 ? -$floor(-num) : $floor(num);
			if (int !== num) {
				var intStr = String(int);
				var dec = $slice.call(str, intStr.length + 1);
				return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
			}
		}
		return $replace.call(str, sepRegex, "$&_");
	}
	var utilInspect = require_util_inspect();
	var inspectCustom = utilInspect.custom;
	var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
	var quotes = {
		__proto__: null,
		"double": "\"",
		single: "'"
	};
	var quoteREs = {
		__proto__: null,
		"double": /(["\\])/g,
		single: /(['\\])/g
	};
	module.exports = function inspect_(obj, options, depth, seen) {
		var opts = options || {};
		if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) throw new TypeError("option \"quoteStyle\" must be \"single\" or \"double\"");
		if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) throw new TypeError("option \"maxStringLength\", if provided, must be a positive integer, Infinity, or `null`");
		var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
		if (typeof customInspect !== "boolean" && customInspect !== "symbol") throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
		if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) throw new TypeError("option \"indent\" must be \"\\t\", an integer > 0, or `null`");
		if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") throw new TypeError("option \"numericSeparator\", if provided, must be `true` or `false`");
		var numericSeparator = opts.numericSeparator;
		if (typeof obj === "undefined") return "undefined";
		if (obj === null) return "null";
		if (typeof obj === "boolean") return obj ? "true" : "false";
		if (typeof obj === "string") return inspectString(obj, opts);
		if (typeof obj === "number") {
			if (obj === 0) return Infinity / obj > 0 ? "0" : "-0";
			var str = String(obj);
			return numericSeparator ? addNumericSeparator(obj, str) : str;
		}
		if (typeof obj === "bigint") {
			var bigIntStr = String(obj) + "n";
			return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
		}
		var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
		if (typeof depth === "undefined") depth = 0;
		if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") return isArray(obj) ? "[Array]" : "[Object]";
		var indent = getIndent(opts, depth);
		if (typeof seen === "undefined") seen = [];
		else if (indexOf(seen, obj) >= 0) return "[Circular]";
		function inspect3(value, from, noIndent) {
			if (from) {
				seen = $arrSlice.call(seen);
				seen.push(from);
			}
			if (noIndent) {
				var newOpts = { depth: opts.depth };
				if (has(opts, "quoteStyle")) newOpts.quoteStyle = opts.quoteStyle;
				return inspect_(value, newOpts, depth + 1, seen);
			}
			return inspect_(value, opts, depth + 1, seen);
		}
		if (typeof obj === "function" && !isRegExp(obj)) {
			var name = nameOf(obj);
			var keys = arrObjKeys(obj, inspect3);
			return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
		}
		if (isSymbol(obj)) {
			var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
			return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
		}
		if (isElement(obj)) {
			var s = "<" + $toLowerCase.call(String(obj.nodeName));
			var attrs = obj.attributes || [];
			for (var i = 0; i < attrs.length; i++) s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
			s += ">";
			if (obj.childNodes && obj.childNodes.length) s += "...";
			s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
			return s;
		}
		if (isArray(obj)) {
			if (obj.length === 0) return "[]";
			var xs = arrObjKeys(obj, inspect3);
			if (indent && !singleLineValues(xs)) return "[" + indentedJoin(xs, indent) + "]";
			return "[ " + $join.call(xs, ", ") + " ]";
		}
		if (isError(obj)) {
			var parts = arrObjKeys(obj, inspect3);
			if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect3(obj.cause), parts), ", ") + " }";
			if (parts.length === 0) return "[" + String(obj) + "]";
			return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
		}
		if (typeof obj === "object" && customInspect) {
			if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) return utilInspect(obj, { depth: maxDepth - depth });
			else if (customInspect !== "symbol" && typeof obj.inspect === "function") return obj.inspect();
		}
		if (isMap(obj)) {
			var mapParts = [];
			if (mapForEach) mapForEach.call(obj, function(value, key) {
				mapParts.push(inspect3(key, obj, true) + " => " + inspect3(value, obj));
			});
			return collectionOf("Map", mapSize.call(obj), mapParts, indent);
		}
		if (isSet(obj)) {
			var setParts = [];
			if (setForEach) setForEach.call(obj, function(value) {
				setParts.push(inspect3(value, obj));
			});
			return collectionOf("Set", setSize.call(obj), setParts, indent);
		}
		if (isWeakMap(obj)) return weakCollectionOf("WeakMap");
		if (isWeakSet(obj)) return weakCollectionOf("WeakSet");
		if (isWeakRef(obj)) return weakCollectionOf("WeakRef");
		if (isNumber(obj)) return markBoxed(inspect3(Number(obj)));
		if (isBigInt(obj)) return markBoxed(inspect3(bigIntValueOf.call(obj)));
		if (isBoolean(obj)) return markBoxed(booleanValueOf.call(obj));
		if (isString(obj)) return markBoxed(inspect3(String(obj)));
		if (typeof window !== "undefined" && obj === window) return "{ [object Window] }";
		if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) return "{ [object globalThis] }";
		if (!isDate(obj) && !isRegExp(obj)) {
			var ys = arrObjKeys(obj, inspect3);
			var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
			var protoTag = obj instanceof Object ? "" : "null prototype";
			var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
			var tag = (isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "") + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
			if (ys.length === 0) return tag + "{}";
			if (indent) return tag + "{" + indentedJoin(ys, indent) + "}";
			return tag + "{ " + $join.call(ys, ", ") + " }";
		}
		return String(obj);
	};
	function wrapQuotes(s, defaultStyle, opts) {
		var quoteChar = quotes[opts.quoteStyle || defaultStyle];
		return quoteChar + s + quoteChar;
	}
	function quote(s) {
		return $replace.call(String(s), /"/g, "&quot;");
	}
	function canTrustToString(obj) {
		return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
	}
	function isArray(obj) {
		return toStr(obj) === "[object Array]" && canTrustToString(obj);
	}
	function isDate(obj) {
		return toStr(obj) === "[object Date]" && canTrustToString(obj);
	}
	function isRegExp(obj) {
		return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
	}
	function isError(obj) {
		return toStr(obj) === "[object Error]" && canTrustToString(obj);
	}
	function isString(obj) {
		return toStr(obj) === "[object String]" && canTrustToString(obj);
	}
	function isNumber(obj) {
		return toStr(obj) === "[object Number]" && canTrustToString(obj);
	}
	function isBoolean(obj) {
		return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
	}
	function isSymbol(obj) {
		if (hasShammedSymbols) return obj && typeof obj === "object" && obj instanceof Symbol;
		if (typeof obj === "symbol") return true;
		if (!obj || typeof obj !== "object" || !symToString) return false;
		try {
			symToString.call(obj);
			return true;
		} catch (e) {}
		return false;
	}
	function isBigInt(obj) {
		if (!obj || typeof obj !== "object" || !bigIntValueOf) return false;
		try {
			bigIntValueOf.call(obj);
			return true;
		} catch (e) {}
		return false;
	}
	var hasOwn2 = Object.prototype.hasOwnProperty || function(key) {
		return key in this;
	};
	function has(obj, key) {
		return hasOwn2.call(obj, key);
	}
	function toStr(obj) {
		return objectToString.call(obj);
	}
	function nameOf(f) {
		if (f.name) return f.name;
		var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
		if (m) return m[1];
		return null;
	}
	function indexOf(xs, x) {
		if (xs.indexOf) return xs.indexOf(x);
		for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
		return -1;
	}
	function isMap(x) {
		if (!mapSize || !x || typeof x !== "object") return false;
		try {
			mapSize.call(x);
			try {
				setSize.call(x);
			} catch (s) {
				return true;
			}
			return x instanceof Map;
		} catch (e) {}
		return false;
	}
	function isWeakMap(x) {
		if (!weakMapHas || !x || typeof x !== "object") return false;
		try {
			weakMapHas.call(x, weakMapHas);
			try {
				weakSetHas.call(x, weakSetHas);
			} catch (s) {
				return true;
			}
			return x instanceof WeakMap;
		} catch (e) {}
		return false;
	}
	function isWeakRef(x) {
		if (!weakRefDeref || !x || typeof x !== "object") return false;
		try {
			weakRefDeref.call(x);
			return true;
		} catch (e) {}
		return false;
	}
	function isSet(x) {
		if (!setSize || !x || typeof x !== "object") return false;
		try {
			setSize.call(x);
			try {
				mapSize.call(x);
			} catch (m) {
				return true;
			}
			return x instanceof Set;
		} catch (e) {}
		return false;
	}
	function isWeakSet(x) {
		if (!weakSetHas || !x || typeof x !== "object") return false;
		try {
			weakSetHas.call(x, weakSetHas);
			try {
				weakMapHas.call(x, weakMapHas);
			} catch (s) {
				return true;
			}
			return x instanceof WeakSet;
		} catch (e) {}
		return false;
	}
	function isElement(x) {
		if (!x || typeof x !== "object") return false;
		if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) return true;
		return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
	}
	function inspectString(str, opts) {
		if (str.length > opts.maxStringLength) {
			var remaining = str.length - opts.maxStringLength;
			var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
			return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
		}
		var quoteRE = quoteREs[opts.quoteStyle || "single"];
		quoteRE.lastIndex = 0;
		return wrapQuotes($replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte), "single", opts);
	}
	function lowbyte(c) {
		var n = c.charCodeAt(0);
		var x = {
			8: "b",
			9: "t",
			10: "n",
			12: "f",
			13: "r"
		}[n];
		if (x) return "\\" + x;
		return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
	}
	function markBoxed(str) {
		return "Object(" + str + ")";
	}
	function weakCollectionOf(type) {
		return type + " { ? }";
	}
	function collectionOf(type, size, entries, indent) {
		var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
		return type + " (" + size + ") {" + joinedEntries + "}";
	}
	function singleLineValues(xs) {
		for (var i = 0; i < xs.length; i++) if (indexOf(xs[i], "\n") >= 0) return false;
		return true;
	}
	function getIndent(opts, depth) {
		var baseIndent;
		if (opts.indent === "	") baseIndent = "	";
		else if (typeof opts.indent === "number" && opts.indent > 0) baseIndent = $join.call(Array(opts.indent + 1), " ");
		else return null;
		return {
			base: baseIndent,
			prev: $join.call(Array(depth + 1), baseIndent)
		};
	}
	function indentedJoin(xs, indent) {
		if (xs.length === 0) return "";
		var lineJoiner = "\n" + indent.prev + indent.base;
		return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
	}
	function arrObjKeys(obj, inspect3) {
		var isArr = isArray(obj);
		var xs = [];
		if (isArr) {
			xs.length = obj.length;
			for (var i = 0; i < obj.length; i++) xs[i] = has(obj, i) ? inspect3(obj[i], obj) : "";
		}
		var syms = typeof gOPS === "function" ? gOPS(obj) : [];
		var symMap;
		if (hasShammedSymbols) {
			symMap = {};
			for (var k = 0; k < syms.length; k++) symMap["$" + syms[k]] = syms[k];
		}
		for (var key in obj) {
			if (!has(obj, key)) continue;
			if (isArr && String(Number(key)) === key && key < obj.length) continue;
			if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) continue;
			else if ($test.call(/[^\w$]/, key)) xs.push(inspect3(key, obj) + ": " + inspect3(obj[key], obj));
			else xs.push(key + ": " + inspect3(obj[key], obj));
		}
		if (typeof gOPS === "function") {
			for (var j = 0; j < syms.length; j++) if (isEnumerable.call(obj, syms[j])) xs.push("[" + inspect3(syms[j]) + "]: " + inspect3(obj[syms[j]], obj));
		}
		return xs;
	}
} });
var TimeDuration = class _TimeDuration {
	__time_duration_micros__;
	static MICROS_PER_MILLIS = 1000n;
	/**
	* Get the algebraic type representation of the {@link TimeDuration} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__time_duration_micros__",
			algebraicType: AlgebraicType.I64
		}] });
	}
	static isTimeDuration(algebraicType) {
		if (algebraicType.tag !== "Product") return false;
		const elements = algebraicType.value.elements;
		if (elements.length !== 1) return false;
		const microsElement = elements[0];
		return microsElement.name === "__time_duration_micros__" && microsElement.algebraicType.tag === "I64";
	}
	get micros() {
		return this.__time_duration_micros__;
	}
	get millis() {
		return Number(this.micros / _TimeDuration.MICROS_PER_MILLIS);
	}
	constructor(micros) {
		this.__time_duration_micros__ = micros;
	}
	static fromMillis(millis) {
		return new _TimeDuration(BigInt(millis) * _TimeDuration.MICROS_PER_MILLIS);
	}
	/** This outputs the same string format that we use in the host and in Rust modules */
	toString() {
		const micros = this.micros;
		const sign = micros < 0 ? "-" : "+";
		const pos = micros < 0 ? -micros : micros;
		const secs = pos / 1000000n;
		const micros_remaining = pos % 1000000n;
		return `${sign}${secs}.${String(micros_remaining).padStart(6, "0")}`;
	}
};
var Timestamp = class _Timestamp {
	__timestamp_micros_since_unix_epoch__;
	static MICROS_PER_MILLIS = 1000n;
	get microsSinceUnixEpoch() {
		return this.__timestamp_micros_since_unix_epoch__;
	}
	constructor(micros) {
		this.__timestamp_micros_since_unix_epoch__ = micros;
	}
	/**
	* Get the algebraic type representation of the {@link Timestamp} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__timestamp_micros_since_unix_epoch__",
			algebraicType: AlgebraicType.I64
		}] });
	}
	static isTimestamp(algebraicType) {
		if (algebraicType.tag !== "Product") return false;
		const elements = algebraicType.value.elements;
		if (elements.length !== 1) return false;
		const microsElement = elements[0];
		return microsElement.name === "__timestamp_micros_since_unix_epoch__" && microsElement.algebraicType.tag === "I64";
	}
	/**
	* The Unix epoch, the midnight at the beginning of January 1, 1970, UTC.
	*/
	static UNIX_EPOCH = new _Timestamp(0n);
	/**
	* Get a `Timestamp` representing the execution environment's belief of the current moment in time.
	*/
	static now() {
		return _Timestamp.fromDate(/* @__PURE__ */ new Date());
	}
	/** Convert to milliseconds since Unix epoch. */
	toMillis() {
		return this.microsSinceUnixEpoch / 1000n;
	}
	/**
	* Get a `Timestamp` representing the same point in time as `date`.
	*/
	static fromDate(date) {
		const millis = date.getTime();
		return new _Timestamp(BigInt(millis) * _Timestamp.MICROS_PER_MILLIS);
	}
	/**
	* Get a `Date` representing approximately the same point in time as `this`.
	*
	* This method truncates to millisecond precision,
	* and throws `RangeError` if the `Timestamp` is outside the range representable as a `Date`.
	*/
	toDate() {
		const millis = this.__timestamp_micros_since_unix_epoch__ / _Timestamp.MICROS_PER_MILLIS;
		if (millis > BigInt(Number.MAX_SAFE_INTEGER) || millis < BigInt(Number.MIN_SAFE_INTEGER)) throw new RangeError("Timestamp is outside of the representable range of JS's Date");
		return new Date(Number(millis));
	}
	/**
	* Get an ISO 8601 / RFC 3339 formatted string representation of this timestamp with microsecond precision.
	*
	* This method preserves the full microsecond precision of the timestamp,
	* and throws `RangeError` if the `Timestamp` is outside the range representable in ISO format.
	*
	* @returns ISO 8601 formatted string with microsecond precision (e.g., '2025-02-17T10:30:45.123456Z')
	*/
	toISOString() {
		const micros = this.__timestamp_micros_since_unix_epoch__;
		const millis = micros / _Timestamp.MICROS_PER_MILLIS;
		if (millis > BigInt(Number.MAX_SAFE_INTEGER) || millis < BigInt(Number.MIN_SAFE_INTEGER)) throw new RangeError("Timestamp is outside of the representable range for ISO string formatting");
		const isoBase = new Date(Number(millis)).toISOString();
		const microsRemainder = Math.abs(Number(micros % 1000000n));
		const fractionalPart = String(microsRemainder).padStart(6, "0");
		return isoBase.replace(/\.\d{3}Z$/, `.${fractionalPart}Z`);
	}
	since(other) {
		return new TimeDuration(this.__timestamp_micros_since_unix_epoch__ - other.__timestamp_micros_since_unix_epoch__);
	}
};
var Uuid = class _Uuid {
	__uuid__;
	/**
	* The nil UUID (all zeros).
	*
	* @example
	* ```ts
	* const uuid = Uuid.NIL;
	* console.assert(
	*   uuid.toString() === "00000000-0000-0000-0000-000000000000"
	* );
	* ```
	*/
	static NIL = new _Uuid(0n);
	static MAX_UUID_BIGINT = 340282366920938463463374607431768211455n;
	/**
	* The max UUID (all ones).
	*
	* @example
	* ```ts
	* const uuid = Uuid.MAX;
	* console.assert(
	*   uuid.toString() === "ffffffff-ffff-ffff-ffff-ffffffffffff"
	* );
	* ```
	*/
	static MAX = new _Uuid(_Uuid.MAX_UUID_BIGINT);
	/**
	* Create a UUID from a raw 128-bit value.
	*
	* @param u - Unsigned 128-bit integer
	* @throws {Error} If the value is outside the valid UUID range
	*/
	constructor(u) {
		if (u < 0n || u > _Uuid.MAX_UUID_BIGINT) throw new Error("Invalid UUID: must be between 0 and `MAX_UUID_BIGINT`");
		this.__uuid__ = u;
	}
	/**
	* Create a UUID `v4` from explicit random bytes.
	*
	* This method assumes the bytes are already sufficiently random.
	* It only sets the appropriate bits for the UUID version and variant.
	*
	* @param bytes - Exactly 16 random bytes
	* @returns A UUID `v4`
	* @throws {Error} If `bytes.length !== 16`
	*
	* @example
	* ```ts
	* const randomBytes = new Uint8Array(16);
	* const uuid = Uuid.fromRandomBytesV4(randomBytes);
	*
	* console.assert(
	*   uuid.toString() === "00000000-0000-4000-8000-000000000000"
	* );
	* ```
	*/
	static fromRandomBytesV4(bytes) {
		if (bytes.length !== 16) throw new Error("UUID v4 requires 16 bytes");
		const arr = new Uint8Array(bytes);
		arr[6] = arr[6] & 15 | 64;
		arr[8] = arr[8] & 63 | 128;
		return new _Uuid(_Uuid.bytesToBigInt(arr));
	}
	/**
	* Generate a UUID `v7` using a monotonic counter from `0` to `2^31 - 1`,
	* a timestamp, and 4 random bytes.
	*
	* The counter wraps around on overflow.
	*
	* The UUID `v7` is structured as follows:
	*
	* ```ascii
	* ┌───────────────────────────────────────────────┬───────────────────┐
	* | B0  | B1  | B2  | B3  | B4  | B5              |         B6        |
	* ├───────────────────────────────────────────────┼───────────────────┤
	* |                 unix_ts_ms                    |      version 7    |
	* └───────────────────────────────────────────────┴───────────────────┘
	* ┌──────────────┬─────────┬──────────────────┬───────────────────────┐
	* | B7           | B8      | B9  | B10 | B11  | B12 | B13 | B14 | B15 |
	* ├──────────────┼─────────┼──────────────────┼───────────────────────┤
	* | counter_high | variant |    counter_low   |        random         |
	* └──────────────┴─────────┴──────────────────┴───────────────────────┘
	* ```
	*
	* @param counter - Mutable monotonic counter (31-bit)
	* @param now - Timestamp since the Unix epoch
	* @param randomBytes - Exactly 4 random bytes
	* @returns A UUID `v7`
	*
	* @throws {Error} If the `counter` is negative
	* @throws {Error} If the `timestamp` is before the Unix epoch
	* @throws {Error} If `randomBytes.length !== 4`
	*
	* @example
	* ```ts
	* const now = Timestamp.fromMillis(1_686_000_000_000n);
	* const counter = { value: 1 };
	* const randomBytes = new Uint8Array(4);
	*
	* const uuid = Uuid.fromCounterV7(counter, now, randomBytes);
	*
	* console.assert(
	*   uuid.toString() === "0000647e-5180-7000-8000-000200000000"
	* );
	* ```
	*/
	static fromCounterV7(counter, now, randomBytes) {
		if (randomBytes.length !== 4) throw new Error("`fromCounterV7` requires `randomBytes.length == 4`");
		if (counter.value < 0) throw new Error("`fromCounterV7` uuid `counter` must be non-negative");
		if (now.__timestamp_micros_since_unix_epoch__ < 0) throw new Error("`fromCounterV7` `timestamp` before unix epoch");
		const counterVal = counter.value;
		counter.value = counterVal + 1 & 2147483647;
		const tsMs = now.toMillis() & 281474976710655n;
		const bytes = new Uint8Array(16);
		bytes[0] = Number(tsMs >> 40n & 255n);
		bytes[1] = Number(tsMs >> 32n & 255n);
		bytes[2] = Number(tsMs >> 24n & 255n);
		bytes[3] = Number(tsMs >> 16n & 255n);
		bytes[4] = Number(tsMs >> 8n & 255n);
		bytes[5] = Number(tsMs & 255n);
		bytes[7] = counterVal >>> 23 & 255;
		bytes[9] = counterVal >>> 15 & 255;
		bytes[10] = counterVal >>> 7 & 255;
		bytes[11] = (counterVal & 127) << 1 & 255;
		bytes[12] |= randomBytes[0] & 127;
		bytes[13] = randomBytes[1];
		bytes[14] = randomBytes[2];
		bytes[15] = randomBytes[3];
		bytes[6] = bytes[6] & 15 | 112;
		bytes[8] = bytes[8] & 63 | 128;
		return new _Uuid(_Uuid.bytesToBigInt(bytes));
	}
	/**
	* Parse a UUID from a string representation.
	*
	* @param s - UUID string
	* @returns Parsed UUID
	* @throws {Error} If the string is not a valid UUID
	*
	* @example
	* ```ts
	* const s = "01888d6e-5c00-7000-8000-000000000000";
	* const uuid = Uuid.parse(s);
	*
	* console.assert(uuid.toString() === s);
	* ```
	*/
	static parse(s) {
		const hex = s.replace(/-/g, "");
		if (hex.length !== 32) throw new Error("Invalid hex UUID");
		let v = 0n;
		for (let i = 0; i < 32; i += 2) v = v << 8n | BigInt(parseInt(hex.slice(i, i + 2), 16));
		return new _Uuid(v);
	}
	/** Convert to string (hyphenated form). */
	toString() {
		const hex = [..._Uuid.bigIntToBytes(this.__uuid__)].map((b) => b.toString(16).padStart(2, "0")).join("");
		return hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-" + hex.slice(12, 16) + "-" + hex.slice(16, 20) + "-" + hex.slice(20);
	}
	/** Convert to bigint (u128). */
	asBigInt() {
		return this.__uuid__;
	}
	/** Return a `Uint8Array` of 16 bytes. */
	toBytes() {
		return _Uuid.bigIntToBytes(this.__uuid__);
	}
	static bytesToBigInt(bytes) {
		let result = 0n;
		for (const b of bytes) result = result << 8n | BigInt(b);
		return result;
	}
	static bigIntToBytes(value) {
		const bytes = new Uint8Array(16);
		for (let i = 15; i >= 0; i--) {
			bytes[i] = Number(value & 255n);
			value >>= 8n;
		}
		return bytes;
	}
	/**
	* Returns the version of this UUID.
	*
	* This represents the algorithm used to generate the value.
	*
	* @returns A `UuidVersion`
	* @throws {Error} If the version field is not recognized
	*/
	getVersion() {
		const version = this.toBytes()[6] >> 4 & 15;
		switch (version) {
			case 4: return "V4";
			case 7: return "V7";
			default:
				if (this == _Uuid.NIL) return "Nil";
				if (this == _Uuid.MAX) return "Max";
				throw new Error(`Unsupported UUID version: ${version}`);
		}
	}
	/**
	* Extract the monotonic counter from a UUIDv7.
	*
	* Intended for testing and diagnostics.
	* Behavior is undefined if called on a non-V7 UUID.
	*
	* @returns 31-bit counter value
	*/
	getCounter() {
		const bytes = this.toBytes();
		const high = bytes[7];
		const mid1 = bytes[9];
		const mid2 = bytes[10];
		const low = bytes[11] >>> 1;
		return high << 23 | mid1 << 15 | mid2 << 7 | low | 0;
	}
	compareTo(other) {
		if (this.__uuid__ < other.__uuid__) return -1;
		if (this.__uuid__ > other.__uuid__) return 1;
		return 0;
	}
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__uuid__",
			algebraicType: AlgebraicType.U128
		}] });
	}
};
var BinaryReader = class {
	/**
	* The DataView used to read values from the binary data.
	*
	* Note: The DataView's `byteOffset` is relative to the beginning of the
	* underlying ArrayBuffer, not the start of the provided Uint8Array input.
	* This `BinaryReader`'s `#offset` field is used to track the current read position
	* relative to the start of the provided Uint8Array input.
	*/
	view;
	/**
	* Represents the offset (in bytes) relative to the start of the DataView
	* and provided Uint8Array input.
	*
	* Note: This is *not* the absolute byte offset within the underlying ArrayBuffer.
	*/
	offset = 0;
	constructor(input) {
		this.view = input instanceof DataView ? input : new DataView(input.buffer, input.byteOffset, input.byteLength);
		this.offset = 0;
	}
	reset(view) {
		this.view = view;
		this.offset = 0;
	}
	get remaining() {
		return this.view.byteLength - this.offset;
	}
	/** Ensure we have at least `n` bytes left to read */
	#ensure(n) {
		if (this.offset + n > this.view.byteLength) throw new RangeError(`Tried to read ${n} byte(s) at relative offset ${this.offset}, but only ${this.remaining} byte(s) remain`);
	}
	readUInt8Array() {
		const length = this.readU32();
		this.#ensure(length);
		return this.readBytes(length);
	}
	readBool() {
		const value = this.view.getUint8(this.offset);
		this.offset += 1;
		return value !== 0;
	}
	readByte() {
		const value = this.view.getUint8(this.offset);
		this.offset += 1;
		return value;
	}
	readBytes(length) {
		const array = new Uint8Array(this.view.buffer, this.view.byteOffset + this.offset, length);
		this.offset += length;
		return array;
	}
	readI8() {
		const value = this.view.getInt8(this.offset);
		this.offset += 1;
		return value;
	}
	readU8() {
		return this.readByte();
	}
	readI16() {
		const value = this.view.getInt16(this.offset, true);
		this.offset += 2;
		return value;
	}
	readU16() {
		const value = this.view.getUint16(this.offset, true);
		this.offset += 2;
		return value;
	}
	readI32() {
		const value = this.view.getInt32(this.offset, true);
		this.offset += 4;
		return value;
	}
	readU32() {
		const value = this.view.getUint32(this.offset, true);
		this.offset += 4;
		return value;
	}
	readI64() {
		const value = this.view.getBigInt64(this.offset, true);
		this.offset += 8;
		return value;
	}
	readU64() {
		const value = this.view.getBigUint64(this.offset, true);
		this.offset += 8;
		return value;
	}
	readU128() {
		const lowerPart = this.view.getBigUint64(this.offset, true);
		const upperPart = this.view.getBigUint64(this.offset + 8, true);
		this.offset += 16;
		return (upperPart << BigInt(64)) + lowerPart;
	}
	readI128() {
		const lowerPart = this.view.getBigUint64(this.offset, true);
		const upperPart = this.view.getBigInt64(this.offset + 8, true);
		this.offset += 16;
		return (upperPart << BigInt(64)) + lowerPart;
	}
	readU256() {
		const p0 = this.view.getBigUint64(this.offset, true);
		const p1 = this.view.getBigUint64(this.offset + 8, true);
		const p2 = this.view.getBigUint64(this.offset + 16, true);
		const p3 = this.view.getBigUint64(this.offset + 24, true);
		this.offset += 32;
		return (p3 << BigInt(192)) + (p2 << BigInt(128)) + (p1 << BigInt(64)) + p0;
	}
	readI256() {
		const p0 = this.view.getBigUint64(this.offset, true);
		const p1 = this.view.getBigUint64(this.offset + 8, true);
		const p2 = this.view.getBigUint64(this.offset + 16, true);
		const p3 = this.view.getBigInt64(this.offset + 24, true);
		this.offset += 32;
		return (p3 << BigInt(192)) + (p2 << BigInt(128)) + (p1 << BigInt(64)) + p0;
	}
	readF32() {
		const value = this.view.getFloat32(this.offset, true);
		this.offset += 4;
		return value;
	}
	readF64() {
		const value = this.view.getFloat64(this.offset, true);
		this.offset += 8;
		return value;
	}
	readString() {
		const uint8Array = this.readUInt8Array();
		return new TextDecoder("utf-8").decode(uint8Array);
	}
};
var import_base64_js = __toESM(require_base64_js());
var ArrayBufferPrototypeTransfer = ArrayBuffer.prototype.transfer ?? function(newByteLength) {
	if (newByteLength === void 0) return this.slice();
	else if (newByteLength <= this.byteLength) return this.slice(0, newByteLength);
	else {
		const copy = new Uint8Array(newByteLength);
		copy.set(new Uint8Array(this));
		return copy.buffer;
	}
};
var ResizableBuffer = class {
	buffer;
	view;
	constructor(init) {
		this.buffer = typeof init === "number" ? new ArrayBuffer(init) : init;
		this.view = new DataView(this.buffer);
	}
	get capacity() {
		return this.buffer.byteLength;
	}
	grow(newSize) {
		if (newSize <= this.buffer.byteLength) return;
		this.buffer = ArrayBufferPrototypeTransfer.call(this.buffer, newSize);
		this.view = new DataView(this.buffer);
	}
};
var BinaryWriter = class {
	buffer;
	offset = 0;
	constructor(init) {
		this.buffer = typeof init === "number" ? new ResizableBuffer(init) : init;
	}
	reset(buffer) {
		this.buffer = buffer;
		this.offset = 0;
	}
	expandBuffer(additionalCapacity) {
		const minCapacity = this.offset + additionalCapacity + 1;
		if (minCapacity <= this.buffer.capacity) return;
		let newCapacity = this.buffer.capacity * 2;
		if (newCapacity < minCapacity) newCapacity = minCapacity;
		this.buffer.grow(newCapacity);
	}
	toBase64() {
		return (0, import_base64_js.fromByteArray)(this.getBuffer());
	}
	getBuffer() {
		return new Uint8Array(this.buffer.buffer, 0, this.offset);
	}
	get view() {
		return this.buffer.view;
	}
	writeUInt8Array(value) {
		const length = value.length;
		this.expandBuffer(4 + length);
		this.writeU32(length);
		new Uint8Array(this.buffer.buffer, this.offset).set(value);
		this.offset += length;
	}
	writeBool(value) {
		this.expandBuffer(1);
		this.view.setUint8(this.offset, value ? 1 : 0);
		this.offset += 1;
	}
	writeByte(value) {
		this.expandBuffer(1);
		this.view.setUint8(this.offset, value);
		this.offset += 1;
	}
	writeI8(value) {
		this.expandBuffer(1);
		this.view.setInt8(this.offset, value);
		this.offset += 1;
	}
	writeU8(value) {
		this.expandBuffer(1);
		this.view.setUint8(this.offset, value);
		this.offset += 1;
	}
	writeI16(value) {
		this.expandBuffer(2);
		this.view.setInt16(this.offset, value, true);
		this.offset += 2;
	}
	writeU16(value) {
		this.expandBuffer(2);
		this.view.setUint16(this.offset, value, true);
		this.offset += 2;
	}
	writeI32(value) {
		this.expandBuffer(4);
		this.view.setInt32(this.offset, value, true);
		this.offset += 4;
	}
	writeU32(value) {
		this.expandBuffer(4);
		this.view.setUint32(this.offset, value, true);
		this.offset += 4;
	}
	writeI64(value) {
		this.expandBuffer(8);
		this.view.setBigInt64(this.offset, value, true);
		this.offset += 8;
	}
	writeU64(value) {
		this.expandBuffer(8);
		this.view.setBigUint64(this.offset, value, true);
		this.offset += 8;
	}
	writeU128(value) {
		this.expandBuffer(16);
		const lowerPart = value & BigInt("0xFFFFFFFFFFFFFFFF");
		const upperPart = value >> BigInt(64);
		this.view.setBigUint64(this.offset, lowerPart, true);
		this.view.setBigUint64(this.offset + 8, upperPart, true);
		this.offset += 16;
	}
	writeI128(value) {
		this.expandBuffer(16);
		const lowerPart = value & BigInt("0xFFFFFFFFFFFFFFFF");
		const upperPart = value >> BigInt(64);
		this.view.setBigInt64(this.offset, lowerPart, true);
		this.view.setBigInt64(this.offset + 8, upperPart, true);
		this.offset += 16;
	}
	writeU256(value) {
		this.expandBuffer(32);
		const low_64_mask = BigInt("0xFFFFFFFFFFFFFFFF");
		const p0 = value & low_64_mask;
		const p1 = value >> BigInt(64) & low_64_mask;
		const p2 = value >> BigInt(128) & low_64_mask;
		const p3 = value >> BigInt(192);
		this.view.setBigUint64(this.offset + 0, p0, true);
		this.view.setBigUint64(this.offset + 8, p1, true);
		this.view.setBigUint64(this.offset + 16, p2, true);
		this.view.setBigUint64(this.offset + 24, p3, true);
		this.offset += 32;
	}
	writeI256(value) {
		this.expandBuffer(32);
		const low_64_mask = BigInt("0xFFFFFFFFFFFFFFFF");
		const p0 = value & low_64_mask;
		const p1 = value >> BigInt(64) & low_64_mask;
		const p2 = value >> BigInt(128) & low_64_mask;
		const p3 = value >> BigInt(192);
		this.view.setBigUint64(this.offset + 0, p0, true);
		this.view.setBigUint64(this.offset + 8, p1, true);
		this.view.setBigUint64(this.offset + 16, p2, true);
		this.view.setBigInt64(this.offset + 24, p3, true);
		this.offset += 32;
	}
	writeF32(value) {
		this.expandBuffer(4);
		this.view.setFloat32(this.offset, value, true);
		this.offset += 4;
	}
	writeF64(value) {
		this.expandBuffer(8);
		this.view.setFloat64(this.offset, value, true);
		this.offset += 8;
	}
	writeString(value) {
		const encodedString = new TextEncoder().encode(value);
		this.writeUInt8Array(encodedString);
	}
};
function toPascalCase(s) {
	const str = s.replace(/([-_][a-z])/gi, ($1) => {
		return $1.toUpperCase().replace("-", "").replace("_", "");
	});
	return str.charAt(0).toUpperCase() + str.slice(1);
}
function uint8ArrayToHexString(array) {
	return Array.prototype.map.call(array.reverse(), (x) => ("00" + x.toString(16)).slice(-2)).join("");
}
function uint8ArrayToU128(array) {
	if (array.length != 16) throw new Error(`Uint8Array is not 16 bytes long: ${array}`);
	return new BinaryReader(array).readU128();
}
function uint8ArrayToU256(array) {
	if (array.length != 32) throw new Error(`Uint8Array is not 32 bytes long: [${array}]`);
	return new BinaryReader(array).readU256();
}
function hexStringToUint8Array(str) {
	if (str.startsWith("0x")) str = str.slice(2);
	const matches = str.match(/.{1,2}/g) || [];
	return Uint8Array.from(matches.map((byte) => parseInt(byte, 16))).reverse();
}
function hexStringToU128(str) {
	return uint8ArrayToU128(hexStringToUint8Array(str));
}
function hexStringToU256(str) {
	return uint8ArrayToU256(hexStringToUint8Array(str));
}
function u128ToUint8Array(data) {
	const writer = new BinaryWriter(16);
	writer.writeU128(data);
	return writer.getBuffer();
}
function u128ToHexString(data) {
	return uint8ArrayToHexString(u128ToUint8Array(data));
}
function u256ToUint8Array(data) {
	const writer = new BinaryWriter(32);
	writer.writeU256(data);
	return writer.getBuffer();
}
function u256ToHexString(data) {
	return uint8ArrayToHexString(u256ToUint8Array(data));
}
function bsatnBaseSize(typespace, ty) {
	const assumedArrayLength = 4;
	while (ty.tag === "Ref") ty = typespace.types[ty.value];
	if (ty.tag === "Product") {
		let sum = 0;
		for (const { algebraicType: elem } of ty.value.elements) sum += bsatnBaseSize(typespace, elem);
		return sum;
	} else if (ty.tag === "Sum") {
		let min = Infinity;
		for (const { algebraicType: vari } of ty.value.variants) {
			const vSize = bsatnBaseSize(typespace, vari);
			if (vSize < min) min = vSize;
		}
		if (min === Infinity) min = 0;
		return 4 + min;
	} else if (ty.tag == "Array") return 4 + assumedArrayLength * bsatnBaseSize(typespace, ty.value);
	return {
		String: 4 + assumedArrayLength,
		Sum: 1,
		Bool: 1,
		I8: 1,
		U8: 1,
		I16: 2,
		U16: 2,
		I32: 4,
		U32: 4,
		F32: 4,
		I64: 8,
		U64: 8,
		F64: 8,
		I128: 16,
		U128: 16,
		I256: 32,
		U256: 32
	}[ty.tag];
}
var hasOwn = Object.hasOwn;
var ConnectionId = class _ConnectionId {
	__connection_id__;
	/**
	* Creates a new `ConnectionId`.
	*/
	constructor(data) {
		this.__connection_id__ = data;
	}
	/**
	* Get the algebraic type representation of the {@link ConnectionId} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__connection_id__",
			algebraicType: AlgebraicType.U128
		}] });
	}
	isZero() {
		return this.__connection_id__ === BigInt(0);
	}
	static nullIfZero(addr) {
		if (addr.isZero()) return null;
		else return addr;
	}
	static random() {
		function randomU8() {
			return Math.floor(Math.random() * 255);
		}
		let result = BigInt(0);
		for (let i = 0; i < 16; i++) result = result << BigInt(8) | BigInt(randomU8());
		return new _ConnectionId(result);
	}
	/**
	* Compare two connection IDs for equality.
	*/
	isEqual(other) {
		return this.__connection_id__ == other.__connection_id__;
	}
	/**
	* Check if two connection IDs are equal.
	*/
	equals(other) {
		return this.isEqual(other);
	}
	/**
	* Print the connection ID as a hexadecimal string.
	*/
	toHexString() {
		return u128ToHexString(this.__connection_id__);
	}
	/**
	* Convert the connection ID to a Uint8Array.
	*/
	toUint8Array() {
		return u128ToUint8Array(this.__connection_id__);
	}
	/**
	* Parse a connection ID from a hexadecimal string.
	*/
	static fromString(str) {
		return new _ConnectionId(hexStringToU128(str));
	}
	static fromStringOrNull(str) {
		const addr = _ConnectionId.fromString(str);
		if (addr.isZero()) return null;
		else return addr;
	}
};
var Identity = class _Identity {
	__identity__;
	/**
	* Creates a new `Identity`.
	*
	* `data` can be a hexadecimal string or a `bigint`.
	*/
	constructor(data) {
		this.__identity__ = typeof data === "string" ? hexStringToU256(data) : data;
	}
	/**
	* Get the algebraic type representation of the {@link Identity} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__identity__",
			algebraicType: AlgebraicType.U256
		}] });
	}
	/**
	* Check if two identities are equal.
	*/
	isEqual(other) {
		return this.toHexString() === other.toHexString();
	}
	/**
	* Check if two identities are equal.
	*/
	equals(other) {
		return this.isEqual(other);
	}
	/**
	* Print the identity as a hexadecimal string.
	*/
	toHexString() {
		return u256ToHexString(this.__identity__);
	}
	/**
	* Convert the address to a Uint8Array.
	*/
	toUint8Array() {
		return u256ToUint8Array(this.__identity__);
	}
	/**
	* Parse an Identity from a hexadecimal string.
	*/
	static fromString(str) {
		return new _Identity(str);
	}
	/**
	* Zero identity (0x0000000000000000000000000000000000000000000000000000000000000000)
	*/
	static zero() {
		return new _Identity(0n);
	}
	toString() {
		return this.toHexString();
	}
};
var SERIALIZERS = /* @__PURE__ */ new Map();
var DESERIALIZERS = /* @__PURE__ */ new Map();
var AlgebraicType = {
	Ref: (value) => ({
		tag: "Ref",
		value
	}),
	Sum: (value) => ({
		tag: "Sum",
		value
	}),
	Product: (value) => ({
		tag: "Product",
		value
	}),
	Array: (value) => ({
		tag: "Array",
		value
	}),
	String: { tag: "String" },
	Bool: { tag: "Bool" },
	I8: { tag: "I8" },
	U8: { tag: "U8" },
	I16: { tag: "I16" },
	U16: { tag: "U16" },
	I32: { tag: "I32" },
	U32: { tag: "U32" },
	I64: { tag: "I64" },
	U64: { tag: "U64" },
	I128: { tag: "I128" },
	U128: { tag: "U128" },
	I256: { tag: "I256" },
	U256: { tag: "U256" },
	F32: { tag: "F32" },
	F64: { tag: "F64" },
	makeSerializer(ty, typespace) {
		if (ty.tag === "Ref") {
			if (!typespace) throw new Error("cannot serialize refs without a typespace");
			while (ty.tag === "Ref") ty = typespace.types[ty.value];
		}
		switch (ty.tag) {
			case "Product": return ProductType.makeSerializer(ty.value, typespace);
			case "Sum": return SumType.makeSerializer(ty.value, typespace);
			case "Array": if (ty.value.tag === "U8") return serializeUint8Array;
			else {
				const serialize = AlgebraicType.makeSerializer(ty.value, typespace);
				return (writer, value) => {
					writer.writeU32(value.length);
					for (const elem of value) serialize(writer, elem);
				};
			}
			default: return primitiveSerializers[ty.tag];
		}
	},
	serializeValue(writer, ty, value, typespace) {
		AlgebraicType.makeSerializer(ty, typespace)(writer, value);
	},
	makeDeserializer(ty, typespace) {
		if (ty.tag === "Ref") {
			if (!typespace) throw new Error("cannot deserialize refs without a typespace");
			while (ty.tag === "Ref") ty = typespace.types[ty.value];
		}
		switch (ty.tag) {
			case "Product": return ProductType.makeDeserializer(ty.value, typespace);
			case "Sum": return SumType.makeDeserializer(ty.value, typespace);
			case "Array": if (ty.value.tag === "U8") return deserializeUint8Array;
			else {
				const deserialize = AlgebraicType.makeDeserializer(ty.value, typespace);
				return (reader) => {
					const length = reader.readU32();
					const result = Array(length);
					for (let i = 0; i < length; i++) result[i] = deserialize(reader);
					return result;
				};
			}
			default: return primitiveDeserializers[ty.tag];
		}
	},
	deserializeValue(reader, ty, typespace) {
		return AlgebraicType.makeDeserializer(ty, typespace)(reader);
	},
	intoMapKey: function(ty, value) {
		switch (ty.tag) {
			case "U8":
			case "U16":
			case "U32":
			case "U64":
			case "U128":
			case "U256":
			case "I8":
			case "I16":
			case "I32":
			case "I64":
			case "I128":
			case "I256":
			case "F32":
			case "F64":
			case "String":
			case "Bool": return value;
			case "Product": return ProductType.intoMapKey(ty.value, value);
			default: {
				const writer = new BinaryWriter(10);
				AlgebraicType.serializeValue(writer, ty, value);
				return writer.toBase64();
			}
		}
	}
};
function bindCall(f) {
	return Function.prototype.call.bind(f);
}
var primitiveSerializers = {
	Bool: bindCall(BinaryWriter.prototype.writeBool),
	I8: bindCall(BinaryWriter.prototype.writeI8),
	U8: bindCall(BinaryWriter.prototype.writeU8),
	I16: bindCall(BinaryWriter.prototype.writeI16),
	U16: bindCall(BinaryWriter.prototype.writeU16),
	I32: bindCall(BinaryWriter.prototype.writeI32),
	U32: bindCall(BinaryWriter.prototype.writeU32),
	I64: bindCall(BinaryWriter.prototype.writeI64),
	U64: bindCall(BinaryWriter.prototype.writeU64),
	I128: bindCall(BinaryWriter.prototype.writeI128),
	U128: bindCall(BinaryWriter.prototype.writeU128),
	I256: bindCall(BinaryWriter.prototype.writeI256),
	U256: bindCall(BinaryWriter.prototype.writeU256),
	F32: bindCall(BinaryWriter.prototype.writeF32),
	F64: bindCall(BinaryWriter.prototype.writeF64),
	String: bindCall(BinaryWriter.prototype.writeString)
};
Object.freeze(primitiveSerializers);
var serializeUint8Array = bindCall(BinaryWriter.prototype.writeUInt8Array);
var primitiveDeserializers = {
	Bool: bindCall(BinaryReader.prototype.readBool),
	I8: bindCall(BinaryReader.prototype.readI8),
	U8: bindCall(BinaryReader.prototype.readU8),
	I16: bindCall(BinaryReader.prototype.readI16),
	U16: bindCall(BinaryReader.prototype.readU16),
	I32: bindCall(BinaryReader.prototype.readI32),
	U32: bindCall(BinaryReader.prototype.readU32),
	I64: bindCall(BinaryReader.prototype.readI64),
	U64: bindCall(BinaryReader.prototype.readU64),
	I128: bindCall(BinaryReader.prototype.readI128),
	U128: bindCall(BinaryReader.prototype.readU128),
	I256: bindCall(BinaryReader.prototype.readI256),
	U256: bindCall(BinaryReader.prototype.readU256),
	F32: bindCall(BinaryReader.prototype.readF32),
	F64: bindCall(BinaryReader.prototype.readF64),
	String: bindCall(BinaryReader.prototype.readString)
};
Object.freeze(primitiveDeserializers);
var deserializeUint8Array = bindCall(BinaryReader.prototype.readUInt8Array);
var primitiveSizes = {
	Bool: 1,
	I8: 1,
	U8: 1,
	I16: 2,
	U16: 2,
	I32: 4,
	U32: 4,
	I64: 8,
	U64: 8,
	I128: 16,
	U128: 16,
	I256: 32,
	U256: 32,
	F32: 4,
	F64: 8
};
var fixedSizePrimitives = new Set(Object.keys(primitiveSizes));
var isFixedSizeProduct = (ty) => ty.elements.every(({ algebraicType }) => fixedSizePrimitives.has(algebraicType.tag));
var productSize = (ty) => ty.elements.reduce((acc, { algebraicType }) => acc + primitiveSizes[algebraicType.tag], 0);
var primitiveJSName = {
	Bool: "Uint8",
	I8: "Int8",
	U8: "Uint8",
	I16: "Int16",
	U16: "Uint16",
	I32: "Int32",
	U32: "Uint32",
	I64: "BigInt64",
	U64: "BigUint64",
	F32: "Float32",
	F64: "Float64"
};
var specialProductDeserializers = {
	__time_duration_micros__: (reader) => new TimeDuration(reader.readI64()),
	__timestamp_micros_since_unix_epoch__: (reader) => new Timestamp(reader.readI64()),
	__identity__: (reader) => new Identity(reader.readU256()),
	__connection_id__: (reader) => new ConnectionId(reader.readU128()),
	__uuid__: (reader) => new Uuid(reader.readU128())
};
Object.freeze(specialProductDeserializers);
var unitDeserializer = () => ({});
var getElementInitializer = (element) => {
	let init;
	switch (element.algebraicType.tag) {
		case "String":
			init = "''";
			break;
		case "Bool":
			init = "false";
			break;
		case "I8":
		case "U8":
		case "I16":
		case "U16":
		case "I32":
		case "U32":
			init = "0";
			break;
		case "I64":
		case "U64":
		case "I128":
		case "U128":
		case "I256":
		case "U256":
			init = "0n";
			break;
		case "F32":
		case "F64":
			init = "0.0";
			break;
		default: init = "undefined";
	}
	return `${element.name}: ${init}`;
};
var ProductType = {
	makeSerializer(ty, typespace) {
		let serializer = SERIALIZERS.get(ty);
		if (serializer != null) return serializer;
		if (isFixedSizeProduct(ty)) {
			const body2 = `"use strict";
writer.expandBuffer(${productSize(ty)});
const view = writer.view;
${ty.elements.map(({ name, algebraicType: { tag } }) => tag in primitiveJSName ? `view.set${primitiveJSName[tag]}(writer.offset, value.${name}, ${primitiveSizes[tag] > 1 ? "true" : ""});
writer.offset += ${primitiveSizes[tag]};` : `writer.write${tag}(value.${name});`).join("\n")}`;
			serializer = Function("writer", "value", body2);
			SERIALIZERS.set(ty, serializer);
			return serializer;
		}
		const serializers = {};
		const body = "\"use strict\";\n" + ty.elements.map((element) => `this.${element.name}(writer, value.${element.name});`).join("\n");
		serializer = Function("writer", "value", body).bind(serializers);
		SERIALIZERS.set(ty, serializer);
		for (const { name, algebraicType } of ty.elements) serializers[name] = AlgebraicType.makeSerializer(algebraicType, typespace);
		Object.freeze(serializers);
		return serializer;
	},
	serializeValue(writer, ty, value, typespace) {
		ProductType.makeSerializer(ty, typespace)(writer, value);
	},
	makeDeserializer(ty, typespace) {
		switch (ty.elements.length) {
			case 0: return unitDeserializer;
			case 1: {
				const fieldName = ty.elements[0].name;
				if (hasOwn(specialProductDeserializers, fieldName)) return specialProductDeserializers[fieldName];
			}
		}
		let deserializer = DESERIALIZERS.get(ty);
		if (deserializer != null) return deserializer;
		if (isFixedSizeProduct(ty)) {
			const body = `"use strict";
const result = { ${ty.elements.map(getElementInitializer).join(", ")} };
const view = reader.view;
${ty.elements.map(({ name, algebraicType: { tag } }) => tag in primitiveJSName ? `result.${name} = view.get${primitiveJSName[tag]}(reader.offset, ${primitiveSizes[tag] > 1 ? "true" : ""});
reader.offset += ${primitiveSizes[tag]};` : `result.${name} = reader.read${tag}();`).join("\n")}
return result;`;
			deserializer = Function("reader", body);
			DESERIALIZERS.set(ty, deserializer);
			return deserializer;
		}
		const deserializers = {};
		deserializer = Function("reader", `"use strict";
const result = { ${ty.elements.map(getElementInitializer).join(", ")} };
${ty.elements.map(({ name }) => `result.${name} = this.${name}(reader);`).join("\n")}
return result;`).bind(deserializers);
		DESERIALIZERS.set(ty, deserializer);
		for (const { name, algebraicType } of ty.elements) deserializers[name] = AlgebraicType.makeDeserializer(algebraicType, typespace);
		Object.freeze(deserializers);
		return deserializer;
	},
	deserializeValue(reader, ty, typespace) {
		return ProductType.makeDeserializer(ty, typespace)(reader);
	},
	intoMapKey(ty, value) {
		if (ty.elements.length === 1) {
			const fieldName = ty.elements[0].name;
			if (hasOwn(specialProductDeserializers, fieldName)) return value[fieldName];
		}
		const writer = new BinaryWriter(10);
		AlgebraicType.serializeValue(writer, AlgebraicType.Product(ty), value);
		return writer.toBase64();
	}
};
var SumType = {
	makeSerializer(ty, typespace) {
		if (ty.variants.length == 2 && ty.variants[0].name === "some" && ty.variants[1].name === "none") {
			const serialize = AlgebraicType.makeSerializer(ty.variants[0].algebraicType, typespace);
			return (writer, value) => {
				if (value !== null && value !== void 0) {
					writer.writeByte(0);
					serialize(writer, value);
				} else writer.writeByte(1);
			};
		} else if (ty.variants.length == 2 && ty.variants[0].name === "ok" && ty.variants[1].name === "err") {
			const serializeOk = AlgebraicType.makeSerializer(ty.variants[0].algebraicType, typespace);
			const serializeErr = AlgebraicType.makeSerializer(ty.variants[0].algebraicType, typespace);
			return (writer, value) => {
				if ("ok" in value) {
					writer.writeU8(0);
					serializeOk(writer, value.ok);
				} else if ("err" in value) {
					writer.writeU8(1);
					serializeErr(writer, value.err);
				} else throw new TypeError("could not serialize result: object had neither a `ok` nor an `err` field");
			};
		} else {
			let serializer = SERIALIZERS.get(ty);
			if (serializer != null) return serializer;
			const serializers = {};
			const body = `switch (value.tag) {
${ty.variants.map(({ name }, i) => `  case ${JSON.stringify(name)}:
    writer.writeByte(${i});
    return this.${name}(writer, value.value);`).join("\n")}
  default:
    throw new TypeError(
      \`Could not serialize sum type; unknown tag \${value.tag}\`
    )
}
`;
			serializer = Function("writer", "value", body).bind(serializers);
			SERIALIZERS.set(ty, serializer);
			for (const { name, algebraicType } of ty.variants) serializers[name] = AlgebraicType.makeSerializer(algebraicType, typespace);
			Object.freeze(serializers);
			return serializer;
		}
	},
	serializeValue(writer, ty, value, typespace) {
		SumType.makeSerializer(ty, typespace)(writer, value);
	},
	makeDeserializer(ty, typespace) {
		if (ty.variants.length == 2 && ty.variants[0].name === "some" && ty.variants[1].name === "none") {
			const deserialize = AlgebraicType.makeDeserializer(ty.variants[0].algebraicType, typespace);
			return (reader) => {
				const tag = reader.readU8();
				if (tag === 0) return deserialize(reader);
				else if (tag === 1) return;
				else throw `Can't deserialize an option type, couldn't find ${tag} tag`;
			};
		} else if (ty.variants.length == 2 && ty.variants[0].name === "ok" && ty.variants[1].name === "err") {
			const deserializeOk = AlgebraicType.makeDeserializer(ty.variants[0].algebraicType, typespace);
			const deserializeErr = AlgebraicType.makeDeserializer(ty.variants[1].algebraicType, typespace);
			return (reader) => {
				const tag = reader.readByte();
				if (tag === 0) return { ok: deserializeOk(reader) };
				else if (tag === 1) return { err: deserializeErr(reader) };
				else throw `Can't deserialize a result type, couldn't find ${tag} tag`;
			};
		} else {
			let deserializer = DESERIALIZERS.get(ty);
			if (deserializer != null) return deserializer;
			const deserializers = {};
			deserializer = Function("reader", `switch (reader.readU8()) {
${ty.variants.map(({ name }, i) => `case ${i}: return { tag: ${JSON.stringify(name)}, value: this.${name}(reader) };`).join("\n")} }`).bind(deserializers);
			DESERIALIZERS.set(ty, deserializer);
			for (const { name, algebraicType } of ty.variants) deserializers[name] = AlgebraicType.makeDeserializer(algebraicType, typespace);
			Object.freeze(deserializers);
			return deserializer;
		}
	},
	deserializeValue(reader, ty, typespace) {
		return SumType.makeDeserializer(ty, typespace)(reader);
	}
};
var Option = { getAlgebraicType(innerType) {
	return AlgebraicType.Sum({ variants: [{
		name: "some",
		algebraicType: innerType
	}, {
		name: "none",
		algebraicType: AlgebraicType.Product({ elements: [] })
	}] });
} };
var Result = { getAlgebraicType(okType, errType) {
	return AlgebraicType.Sum({ variants: [{
		name: "ok",
		algebraicType: okType
	}, {
		name: "err",
		algebraicType: errType
	}] });
} };
var ScheduleAt = {
	interval(value) {
		return Interval(value);
	},
	time(value) {
		return Time(value);
	},
	getAlgebraicType() {
		return AlgebraicType.Sum({ variants: [{
			name: "Interval",
			algebraicType: TimeDuration.getAlgebraicType()
		}, {
			name: "Time",
			algebraicType: Timestamp.getAlgebraicType()
		}] });
	},
	isScheduleAt(algebraicType) {
		if (algebraicType.tag !== "Sum") return false;
		const variants = algebraicType.value.variants;
		if (variants.length !== 2) return false;
		const intervalVariant = variants.find((v) => v.name === "Interval");
		const timeVariant = variants.find((v) => v.name === "Time");
		if (!intervalVariant || !timeVariant) return false;
		return TimeDuration.isTimeDuration(intervalVariant.algebraicType) && Timestamp.isTimestamp(timeVariant.algebraicType);
	}
};
var Interval = (micros) => ({
	tag: "Interval",
	value: new TimeDuration(micros)
});
var Time = (microsSinceUnixEpoch) => ({
	tag: "Time",
	value: new Timestamp(microsSinceUnixEpoch)
});
var schedule_at_default = ScheduleAt;
function set(x, t2) {
	return {
		...x,
		...t2
	};
}
var TypeBuilder = class {
	/**
	* The TypeScript phantom type. This is not stored at runtime,
	* but is visible to the compiler
	*/
	type;
	/**
	* The SpacetimeDB algebraic type (run‑time value). In addition to storing
	* the runtime representation of the `AlgebraicType`, it also captures
	* the TypeScript type information of the `AlgebraicType`. That is to say
	* the value is not merely an `AlgebraicType`, but is constructed to be
	* the corresponding concrete `AlgebraicType` for the TypeScript type `Type`.
	*
	* e.g. `string` corresponds to `AlgebraicType.String`
	*/
	algebraicType;
	constructor(algebraicType) {
		this.algebraicType = algebraicType;
	}
	optional() {
		return new OptionBuilder(this);
	}
	serialize(writer, value) {
		(this.serialize = AlgebraicType.makeSerializer(this.algebraicType))(writer, value);
	}
	deserialize(reader) {
		return (this.deserialize = AlgebraicType.makeDeserializer(this.algebraicType))(reader);
	}
};
var U8Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U8);
	}
	index(algorithm = "btree") {
		return new U8ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U8ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U8ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U8ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U8ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U8ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U16Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U16);
	}
	index(algorithm = "btree") {
		return new U16ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U16ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U16ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U16ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U16ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U16ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U32Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U32);
	}
	index(algorithm = "btree") {
		return new U32ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U32ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U32ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U32ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U32ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U32ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U64Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U64);
	}
	index(algorithm = "btree") {
		return new U64ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U64ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U64ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U64ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U64ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U64ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U128Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U128);
	}
	index(algorithm = "btree") {
		return new U128ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U128ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U128ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U128ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U128ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U128ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U256Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U256);
	}
	index(algorithm = "btree") {
		return new U256ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U256ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U256ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U256ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U256ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U256ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I8Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I8);
	}
	index(algorithm = "btree") {
		return new I8ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I8ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I8ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I8ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I8ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I8ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I16Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I16);
	}
	index(algorithm = "btree") {
		return new I16ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I16ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I16ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I16ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I16ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I16ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I32Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I32);
	}
	index(algorithm = "btree") {
		return new I32ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I32ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I32ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I32ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I32ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I32ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I64Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I64);
	}
	index(algorithm = "btree") {
		return new I64ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I64ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I64ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I64ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I64ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I64ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I128Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I128);
	}
	index(algorithm = "btree") {
		return new I128ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I128ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I128ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I128ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I128ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I128ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I256Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I256);
	}
	index(algorithm = "btree") {
		return new I256ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I256ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I256ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I256ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I256ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I256ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var F32Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.F32);
	}
	default(value) {
		return new F32ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new F32ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var F64Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.F64);
	}
	default(value) {
		return new F64ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new F64ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var BoolBuilder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.Bool);
	}
	index(algorithm = "btree") {
		return new BoolColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new BoolColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new BoolColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new BoolColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new BoolColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var StringBuilder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.String);
	}
	index(algorithm = "btree") {
		return new StringColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new StringColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new StringColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new StringColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new StringColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ArrayBuilder = class extends TypeBuilder {
	element;
	constructor(element) {
		super(AlgebraicType.Array(element.algebraicType));
		this.element = element;
	}
	default(value) {
		return new ArrayColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ArrayColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ByteArrayBuilder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.Array(AlgebraicType.U8));
	}
	default(value) {
		return new ByteArrayColumnBuilder(set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ByteArrayColumnBuilder(set(defaultMetadata, { name }));
	}
};
var OptionBuilder = class extends TypeBuilder {
	value;
	constructor(value) {
		super(Option.getAlgebraicType(value.algebraicType));
		this.value = value;
	}
	default(value) {
		return new OptionColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new OptionColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ProductBuilder = class extends TypeBuilder {
	typeName;
	elements;
	constructor(elements, name) {
		function elementsArrayFromElementsObj(obj) {
			return Object.keys(obj).map((key) => ({
				name: key,
				get algebraicType() {
					return obj[key].algebraicType;
				}
			}));
		}
		super(AlgebraicType.Product({ elements: elementsArrayFromElementsObj(elements) }));
		this.typeName = name;
		this.elements = elements;
	}
	default(value) {
		return new ProductColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ProductColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ResultBuilder = class extends TypeBuilder {
	ok;
	err;
	constructor(ok, err) {
		super(Result.getAlgebraicType(ok.algebraicType, err.algebraicType));
		this.ok = ok;
		this.err = err;
	}
	default(value) {
		return new ResultColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
};
var UnitBuilder = class extends TypeBuilder {
	constructor() {
		super({
			tag: "Product",
			value: { elements: [] }
		});
	}
};
var RowBuilder = class extends TypeBuilder {
	row;
	typeName;
	constructor(row, name) {
		const mappedRow = Object.fromEntries(Object.entries(row).map(([colName, builder]) => [colName, builder instanceof ColumnBuilder ? builder : new ColumnBuilder(builder, {})]));
		const elements = Object.keys(mappedRow).map((name2) => ({
			name: name2,
			get algebraicType() {
				return mappedRow[name2].typeBuilder.algebraicType;
			}
		}));
		super(AlgebraicType.Product({ elements }));
		this.row = mappedRow;
		this.typeName = name;
	}
};
var SumBuilderImpl = class extends TypeBuilder {
	variants;
	typeName;
	constructor(variants, name) {
		function variantsArrayFromVariantsObj(variants2) {
			return Object.keys(variants2).map((key) => ({
				name: key,
				get algebraicType() {
					return variants2[key].algebraicType;
				}
			}));
		}
		super(AlgebraicType.Sum({ variants: variantsArrayFromVariantsObj(variants) }));
		this.variants = variants;
		this.typeName = name;
		for (const key of Object.keys(variants)) {
			const desc = Object.getOwnPropertyDescriptor(variants, key);
			const isAccessor = !!desc && (typeof desc.get === "function" || typeof desc.set === "function");
			let isUnit2 = false;
			if (!isAccessor) isUnit2 = variants[key] instanceof UnitBuilder;
			if (isUnit2) {
				const constant = this.create(key);
				Object.defineProperty(this, key, {
					value: constant,
					writable: false,
					enumerable: true,
					configurable: false
				});
			} else {
				const fn = ((value) => this.create(key, value));
				Object.defineProperty(this, key, {
					value: fn,
					writable: false,
					enumerable: true,
					configurable: false
				});
			}
		}
	}
	create(tag, value) {
		return value === void 0 ? { tag } : {
			tag,
			value
		};
	}
	default(value) {
		return new SumColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new SumColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var SumBuilder = SumBuilderImpl;
var SimpleSumBuilderImpl = class extends SumBuilderImpl {
	index(algorithm = "btree") {
		return new SimpleSumColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	primaryKey() {
		return new SimpleSumColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
};
var ScheduleAtBuilder = class extends TypeBuilder {
	constructor() {
		super(schedule_at_default.getAlgebraicType());
	}
	default(value) {
		return new ScheduleAtColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ScheduleAtColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var IdentityBuilder = class extends TypeBuilder {
	constructor() {
		super(Identity.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ConnectionIdBuilder = class extends TypeBuilder {
	constructor() {
		super(ConnectionId.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var TimestampBuilder = class extends TypeBuilder {
	constructor() {
		super(Timestamp.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var TimeDurationBuilder = class extends TypeBuilder {
	constructor() {
		super(TimeDuration.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var UuidBuilder = class extends TypeBuilder {
	constructor() {
		super(Uuid.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new UuidColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new UuidColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new UuidColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new UuidColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new UuidColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new UuidColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var defaultMetadata = {};
var ColumnBuilder = class {
	typeBuilder;
	columnMetadata;
	constructor(typeBuilder, metadata) {
		this.typeBuilder = typeBuilder;
		this.columnMetadata = metadata;
	}
	serialize(writer, value) {
		this.typeBuilder.serialize(writer, value);
	}
	deserialize(reader) {
		return this.typeBuilder.deserialize(reader);
	}
};
var U8ColumnBuilder = class _U8ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U16ColumnBuilder = class _U16ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U32ColumnBuilder = class _U32ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U64ColumnBuilder = class _U64ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U128ColumnBuilder = class _U128ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U256ColumnBuilder = class _U256ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I8ColumnBuilder = class _I8ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I16ColumnBuilder = class _I16ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I32ColumnBuilder = class _I32ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I64ColumnBuilder = class _I64ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I128ColumnBuilder = class _I128ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I256ColumnBuilder = class _I256ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var F32ColumnBuilder = class _F32ColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _F32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _F32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var F64ColumnBuilder = class _F64ColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _F64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _F64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var BoolColumnBuilder = class _BoolColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var StringColumnBuilder = class _StringColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ArrayColumnBuilder = class _ArrayColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _ArrayColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ArrayColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ByteArrayColumnBuilder = class _ByteArrayColumnBuilder extends ColumnBuilder {
	constructor(metadata) {
		super(new TypeBuilder(AlgebraicType.Array(AlgebraicType.U8)), metadata);
	}
	default(value) {
		return new _ByteArrayColumnBuilder(set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ByteArrayColumnBuilder(set(this.columnMetadata, { name }));
	}
};
var OptionColumnBuilder = class _OptionColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _OptionColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _OptionColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ResultColumnBuilder = class _ResultColumnBuilder extends ColumnBuilder {
	constructor(typeBuilder, metadata) {
		super(typeBuilder, metadata);
	}
	default(value) {
		return new _ResultColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
};
var ProductColumnBuilder = class _ProductColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _ProductColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ProductColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var SumColumnBuilder = class _SumColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _SumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _SumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var SimpleSumColumnBuilder = class _SimpleSumColumnBuilder extends SumColumnBuilder {
	index(algorithm = "btree") {
		return new _SimpleSumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	primaryKey() {
		return new _SimpleSumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
};
var ScheduleAtColumnBuilder = class _ScheduleAtColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _ScheduleAtColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ScheduleAtColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var IdentityColumnBuilder = class _IdentityColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ConnectionIdColumnBuilder = class _ConnectionIdColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var TimestampColumnBuilder = class _TimestampColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var TimeDurationColumnBuilder = class _TimeDurationColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var UuidColumnBuilder = class _UuidColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var RefBuilder = class extends TypeBuilder {
	ref;
	/** The phantom type of the pointee of this ref. */
	__spacetimeType;
	constructor(ref) {
		super(AlgebraicType.Ref(ref));
		this.ref = ref;
	}
};
var enumImpl = ((nameOrObj, maybeObj) => {
	let obj = nameOrObj;
	let name = void 0;
	if (typeof nameOrObj === "string") {
		if (!maybeObj) throw new TypeError("When providing a name, you must also provide the variants object or array.");
		obj = maybeObj;
		name = nameOrObj;
	}
	if (Array.isArray(obj)) {
		const simpleVariantsObj = {};
		for (const variant of obj) simpleVariantsObj[variant] = new UnitBuilder();
		return new SimpleSumBuilderImpl(simpleVariantsObj, name);
	}
	return new SumBuilder(obj, name);
});
var t = {
	bool: () => new BoolBuilder(),
	string: () => new StringBuilder(),
	number: () => new F64Builder(),
	i8: () => new I8Builder(),
	u8: () => new U8Builder(),
	i16: () => new I16Builder(),
	u16: () => new U16Builder(),
	i32: () => new I32Builder(),
	u32: () => new U32Builder(),
	i64: () => new I64Builder(),
	u64: () => new U64Builder(),
	i128: () => new I128Builder(),
	u128: () => new U128Builder(),
	i256: () => new I256Builder(),
	u256: () => new U256Builder(),
	f32: () => new F32Builder(),
	f64: () => new F64Builder(),
	object: ((nameOrObj, maybeObj) => {
		if (typeof nameOrObj === "string") {
			if (!maybeObj) throw new TypeError("When providing a name, you must also provide the object.");
			return new ProductBuilder(maybeObj, nameOrObj);
		}
		return new ProductBuilder(nameOrObj, void 0);
	}),
	row: ((nameOrObj, maybeObj) => {
		const [obj, name] = typeof nameOrObj === "string" ? [maybeObj, nameOrObj] : [nameOrObj, void 0];
		return new RowBuilder(obj, name);
	}),
	array(e) {
		return new ArrayBuilder(e);
	},
	enum: enumImpl,
	unit() {
		return new UnitBuilder();
	},
	lazy(thunk) {
		let cached = null;
		const get = () => cached ??= thunk();
		return new Proxy({}, {
			get(_t, prop, recv) {
				const target = get();
				const val = Reflect.get(target, prop, recv);
				return typeof val === "function" ? val.bind(target) : val;
			},
			set(_t, prop, value, recv) {
				return Reflect.set(get(), prop, value, recv);
			},
			has(_t, prop) {
				return prop in get();
			},
			ownKeys() {
				return Reflect.ownKeys(get());
			},
			getOwnPropertyDescriptor(_t, prop) {
				return Object.getOwnPropertyDescriptor(get(), prop);
			},
			getPrototypeOf() {
				return Object.getPrototypeOf(get());
			}
		});
	},
	scheduleAt: () => {
		return new ScheduleAtBuilder();
	},
	option(value) {
		return new OptionBuilder(value);
	},
	result(ok, err) {
		return new ResultBuilder(ok, err);
	},
	identity: () => {
		return new IdentityBuilder();
	},
	connectionId: () => {
		return new ConnectionIdBuilder();
	},
	timestamp: () => {
		return new TimestampBuilder();
	},
	timeDuration: () => {
		return new TimeDurationBuilder();
	},
	uuid: () => {
		return new UuidBuilder();
	},
	byteArray: () => {
		return new ByteArrayBuilder();
	}
};
var AlgebraicType2 = t.enum("AlgebraicType", {
	Ref: t.u32(),
	get Sum() {
		return SumType2;
	},
	get Product() {
		return ProductType2;
	},
	get Array() {
		return AlgebraicType2;
	},
	String: t.unit(),
	Bool: t.unit(),
	I8: t.unit(),
	U8: t.unit(),
	I16: t.unit(),
	U16: t.unit(),
	I32: t.unit(),
	U32: t.unit(),
	I64: t.unit(),
	U64: t.unit(),
	I128: t.unit(),
	U128: t.unit(),
	I256: t.unit(),
	U256: t.unit(),
	F32: t.unit(),
	F64: t.unit()
});
var CaseConversionPolicy = t.enum("CaseConversionPolicy", {
	None: t.unit(),
	SnakeCase: t.unit()
});
var ExplicitNameEntry = t.enum("ExplicitNameEntry", {
	get Table() {
		return NameMapping;
	},
	get Function() {
		return NameMapping;
	},
	get Index() {
		return NameMapping;
	}
});
var ExplicitNames = t.object("ExplicitNames", { get entries() {
	return t.array(ExplicitNameEntry);
} });
var FunctionVisibility = t.enum("FunctionVisibility", {
	Private: t.unit(),
	ClientCallable: t.unit()
});
var HttpHeaderPair = t.object("HttpHeaderPair", {
	name: t.string(),
	value: t.byteArray()
});
var HttpHeaders = t.object("HttpHeaders", { get entries() {
	return t.array(HttpHeaderPair);
} });
var HttpMethod = t.enum("HttpMethod", {
	Get: t.unit(),
	Head: t.unit(),
	Post: t.unit(),
	Put: t.unit(),
	Delete: t.unit(),
	Connect: t.unit(),
	Options: t.unit(),
	Trace: t.unit(),
	Patch: t.unit(),
	Extension: t.string()
});
var HttpRequest = t.object("HttpRequest", {
	get method() {
		return HttpMethod;
	},
	get headers() {
		return HttpHeaders;
	},
	timeout: t.option(t.timeDuration()),
	uri: t.string(),
	get version() {
		return HttpVersion;
	}
});
var HttpResponse = t.object("HttpResponse", {
	get headers() {
		return HttpHeaders;
	},
	get version() {
		return HttpVersion;
	},
	code: t.u16()
});
var HttpVersion = t.enum("HttpVersion", {
	Http09: t.unit(),
	Http10: t.unit(),
	Http11: t.unit(),
	Http2: t.unit(),
	Http3: t.unit()
});
var IndexType = t.enum("IndexType", {
	BTree: t.unit(),
	Hash: t.unit()
});
var Lifecycle = t.enum("Lifecycle", {
	Init: t.unit(),
	OnConnect: t.unit(),
	OnDisconnect: t.unit()
});
var MiscModuleExport = t.enum("MiscModuleExport", { get TypeAlias() {
	return TypeAlias;
} });
var NameMapping = t.object("NameMapping", {
	sourceName: t.string(),
	canonicalName: t.string()
});
var ProductType2 = t.object("ProductType", { get elements() {
	return t.array(ProductTypeElement);
} });
var ProductTypeElement = t.object("ProductTypeElement", {
	name: t.option(t.string()),
	get algebraicType() {
		return AlgebraicType2;
	}
});
var RawColumnDefV8 = t.object("RawColumnDefV8", {
	colName: t.string(),
	get colType() {
		return AlgebraicType2;
	}
});
var RawColumnDefaultValueV10 = t.object("RawColumnDefaultValueV10", {
	colId: t.u16(),
	value: t.byteArray()
});
var RawColumnDefaultValueV9 = t.object("RawColumnDefaultValueV9", {
	table: t.string(),
	colId: t.u16(),
	value: t.byteArray()
});
var RawConstraintDataV9 = t.enum("RawConstraintDataV9", { get Unique() {
	return RawUniqueConstraintDataV9;
} });
var RawConstraintDefV10 = t.object("RawConstraintDefV10", {
	sourceName: t.option(t.string()),
	get data() {
		return RawConstraintDataV9;
	}
});
var RawConstraintDefV8 = t.object("RawConstraintDefV8", {
	constraintName: t.string(),
	constraints: t.u8(),
	columns: t.array(t.u16())
});
var RawConstraintDefV9 = t.object("RawConstraintDefV9", {
	name: t.option(t.string()),
	get data() {
		return RawConstraintDataV9;
	}
});
var RawIndexAlgorithm = t.enum("RawIndexAlgorithm", {
	BTree: t.array(t.u16()),
	Hash: t.array(t.u16()),
	Direct: t.u16()
});
var RawIndexDefV10 = t.object("RawIndexDefV10", {
	sourceName: t.option(t.string()),
	accessorName: t.option(t.string()),
	get algorithm() {
		return RawIndexAlgorithm;
	}
});
var RawIndexDefV8 = t.object("RawIndexDefV8", {
	indexName: t.string(),
	isUnique: t.bool(),
	get indexType() {
		return IndexType;
	},
	columns: t.array(t.u16())
});
var RawIndexDefV9 = t.object("RawIndexDefV9", {
	name: t.option(t.string()),
	accessorName: t.option(t.string()),
	get algorithm() {
		return RawIndexAlgorithm;
	}
});
var RawLifeCycleReducerDefV10 = t.object("RawLifeCycleReducerDefV10", {
	get lifecycleSpec() {
		return Lifecycle;
	},
	functionName: t.string()
});
var RawMiscModuleExportV9 = t.enum("RawMiscModuleExportV9", {
	get ColumnDefaultValue() {
		return RawColumnDefaultValueV9;
	},
	get Procedure() {
		return RawProcedureDefV9;
	},
	get View() {
		return RawViewDefV9;
	}
});
var RawModuleDef = t.enum("RawModuleDef", {
	get V8BackCompat() {
		return RawModuleDefV8;
	},
	get V9() {
		return RawModuleDefV9;
	},
	get V10() {
		return RawModuleDefV10;
	}
});
var RawModuleDefV10 = t.object("RawModuleDefV10", { get sections() {
	return t.array(RawModuleDefV10Section);
} });
var RawModuleDefV10Section = t.enum("RawModuleDefV10Section", {
	get Typespace() {
		return Typespace;
	},
	get Types() {
		return t.array(RawTypeDefV10);
	},
	get Tables() {
		return t.array(RawTableDefV10);
	},
	get Reducers() {
		return t.array(RawReducerDefV10);
	},
	get Procedures() {
		return t.array(RawProcedureDefV10);
	},
	get Views() {
		return t.array(RawViewDefV10);
	},
	get Schedules() {
		return t.array(RawScheduleDefV10);
	},
	get LifeCycleReducers() {
		return t.array(RawLifeCycleReducerDefV10);
	},
	get RowLevelSecurity() {
		return t.array(RawRowLevelSecurityDefV9);
	},
	get CaseConversionPolicy() {
		return CaseConversionPolicy;
	},
	get ExplicitNames() {
		return ExplicitNames;
	}
});
var RawModuleDefV8 = t.object("RawModuleDefV8", {
	get typespace() {
		return Typespace;
	},
	get tables() {
		return t.array(TableDesc);
	},
	get reducers() {
		return t.array(ReducerDef);
	},
	get miscExports() {
		return t.array(MiscModuleExport);
	}
});
var RawModuleDefV9 = t.object("RawModuleDefV9", {
	get typespace() {
		return Typespace;
	},
	get tables() {
		return t.array(RawTableDefV9);
	},
	get reducers() {
		return t.array(RawReducerDefV9);
	},
	get types() {
		return t.array(RawTypeDefV9);
	},
	get miscExports() {
		return t.array(RawMiscModuleExportV9);
	},
	get rowLevelSecurity() {
		return t.array(RawRowLevelSecurityDefV9);
	}
});
var RawProcedureDefV10 = t.object("RawProcedureDefV10", {
	sourceName: t.string(),
	get params() {
		return ProductType2;
	},
	get returnType() {
		return AlgebraicType2;
	},
	get visibility() {
		return FunctionVisibility;
	}
});
var RawProcedureDefV9 = t.object("RawProcedureDefV9", {
	name: t.string(),
	get params() {
		return ProductType2;
	},
	get returnType() {
		return AlgebraicType2;
	}
});
var RawReducerDefV10 = t.object("RawReducerDefV10", {
	sourceName: t.string(),
	get params() {
		return ProductType2;
	},
	get visibility() {
		return FunctionVisibility;
	},
	get okReturnType() {
		return AlgebraicType2;
	},
	get errReturnType() {
		return AlgebraicType2;
	}
});
var RawReducerDefV9 = t.object("RawReducerDefV9", {
	name: t.string(),
	get params() {
		return ProductType2;
	},
	get lifecycle() {
		return t.option(Lifecycle);
	}
});
var RawRowLevelSecurityDefV9 = t.object("RawRowLevelSecurityDefV9", { sql: t.string() });
var RawScheduleDefV10 = t.object("RawScheduleDefV10", {
	sourceName: t.option(t.string()),
	tableName: t.string(),
	scheduleAtCol: t.u16(),
	functionName: t.string()
});
var RawScheduleDefV9 = t.object("RawScheduleDefV9", {
	name: t.option(t.string()),
	reducerName: t.string(),
	scheduledAtColumn: t.u16()
});
var RawScopedTypeNameV10 = t.object("RawScopedTypeNameV10", {
	scope: t.array(t.string()),
	sourceName: t.string()
});
var RawScopedTypeNameV9 = t.object("RawScopedTypeNameV9", {
	scope: t.array(t.string()),
	name: t.string()
});
var RawSequenceDefV10 = t.object("RawSequenceDefV10", {
	sourceName: t.option(t.string()),
	column: t.u16(),
	start: t.option(t.i128()),
	minValue: t.option(t.i128()),
	maxValue: t.option(t.i128()),
	increment: t.i128()
});
var RawSequenceDefV8 = t.object("RawSequenceDefV8", {
	sequenceName: t.string(),
	colPos: t.u16(),
	increment: t.i128(),
	start: t.option(t.i128()),
	minValue: t.option(t.i128()),
	maxValue: t.option(t.i128()),
	allocated: t.i128()
});
var RawSequenceDefV9 = t.object("RawSequenceDefV9", {
	name: t.option(t.string()),
	column: t.u16(),
	start: t.option(t.i128()),
	minValue: t.option(t.i128()),
	maxValue: t.option(t.i128()),
	increment: t.i128()
});
var RawTableDefV10 = t.object("RawTableDefV10", {
	sourceName: t.string(),
	productTypeRef: t.u32(),
	primaryKey: t.array(t.u16()),
	get indexes() {
		return t.array(RawIndexDefV10);
	},
	get constraints() {
		return t.array(RawConstraintDefV10);
	},
	get sequences() {
		return t.array(RawSequenceDefV10);
	},
	get tableType() {
		return TableType;
	},
	get tableAccess() {
		return TableAccess;
	},
	get defaultValues() {
		return t.array(RawColumnDefaultValueV10);
	},
	isEvent: t.bool()
});
var RawTableDefV8 = t.object("RawTableDefV8", {
	tableName: t.string(),
	get columns() {
		return t.array(RawColumnDefV8);
	},
	get indexes() {
		return t.array(RawIndexDefV8);
	},
	get constraints() {
		return t.array(RawConstraintDefV8);
	},
	get sequences() {
		return t.array(RawSequenceDefV8);
	},
	tableType: t.string(),
	tableAccess: t.string(),
	scheduled: t.option(t.string())
});
var RawTableDefV9 = t.object("RawTableDefV9", {
	name: t.string(),
	productTypeRef: t.u32(),
	primaryKey: t.array(t.u16()),
	get indexes() {
		return t.array(RawIndexDefV9);
	},
	get constraints() {
		return t.array(RawConstraintDefV9);
	},
	get sequences() {
		return t.array(RawSequenceDefV9);
	},
	get schedule() {
		return t.option(RawScheduleDefV9);
	},
	get tableType() {
		return TableType;
	},
	get tableAccess() {
		return TableAccess;
	}
});
var RawTypeDefV10 = t.object("RawTypeDefV10", {
	get sourceName() {
		return RawScopedTypeNameV10;
	},
	ty: t.u32(),
	customOrdering: t.bool()
});
var RawTypeDefV9 = t.object("RawTypeDefV9", {
	get name() {
		return RawScopedTypeNameV9;
	},
	ty: t.u32(),
	customOrdering: t.bool()
});
var RawUniqueConstraintDataV9 = t.object("RawUniqueConstraintDataV9", { columns: t.array(t.u16()) });
var RawViewDefV10 = t.object("RawViewDefV10", {
	sourceName: t.string(),
	index: t.u32(),
	isPublic: t.bool(),
	isAnonymous: t.bool(),
	get params() {
		return ProductType2;
	},
	get returnType() {
		return AlgebraicType2;
	}
});
var RawViewDefV9 = t.object("RawViewDefV9", {
	name: t.string(),
	index: t.u32(),
	isPublic: t.bool(),
	isAnonymous: t.bool(),
	get params() {
		return ProductType2;
	},
	get returnType() {
		return AlgebraicType2;
	}
});
var ReducerDef = t.object("ReducerDef", {
	name: t.string(),
	get args() {
		return t.array(ProductTypeElement);
	}
});
var SumType2 = t.object("SumType", { get variants() {
	return t.array(SumTypeVariant);
} });
var SumTypeVariant = t.object("SumTypeVariant", {
	name: t.option(t.string()),
	get algebraicType() {
		return AlgebraicType2;
	}
});
var TableAccess = t.enum("TableAccess", {
	Public: t.unit(),
	Private: t.unit()
});
var TableDesc = t.object("TableDesc", {
	get schema() {
		return RawTableDefV8;
	},
	data: t.u32()
});
var TableType = t.enum("TableType", {
	System: t.unit(),
	User: t.unit()
});
var TypeAlias = t.object("TypeAlias", {
	name: t.string(),
	ty: t.u32()
});
var Typespace = t.object("Typespace", { get types() {
	return t.array(AlgebraicType2);
} });
var ViewResultHeader = t.enum("ViewResultHeader", {
	RowData: t.unit(),
	RawSql: t.string()
});
function tableToSchema(accName, schema2, tableDef) {
	const getColName = (i) => schema2.rowType.algebraicType.value.elements[i].name;
	return {
		sourceName: accName,
		accessorName: accName,
		columns: schema2.rowType.row,
		rowType: schema2.rowSpacetimeType,
		constraints: tableDef.constraints.map((c) => ({
			name: c.sourceName,
			constraint: "unique",
			columns: c.data.value.columns.map(getColName)
		})),
		indexes: tableDef.indexes.map((idx) => {
			const columnIds = idx.algorithm.tag === "Direct" ? [idx.algorithm.value] : idx.algorithm.value;
			return {
				name: idx.accessorName,
				unique: tableDef.constraints.some((c) => c.data.value.columns.every((col) => columnIds.includes(col))),
				algorithm: idx.algorithm.tag.toLowerCase(),
				columns: columnIds.map(getColName)
			};
		}),
		tableDef,
		...tableDef.isEvent ? { isEvent: true } : {}
	};
}
var ModuleContext = class {
	#compoundTypes = /* @__PURE__ */ new Map();
	/**
	* The global module definition that gets populated by calls to `reducer()` and lifecycle hooks.
	*/
	#moduleDef = {
		typespace: { types: [] },
		tables: [],
		reducers: [],
		types: [],
		rowLevelSecurity: [],
		schedules: [],
		procedures: [],
		views: [],
		lifeCycleReducers: [],
		caseConversionPolicy: { tag: "SnakeCase" },
		explicitNames: { entries: [] }
	};
	get moduleDef() {
		return this.#moduleDef;
	}
	rawModuleDefV10() {
		const sections = [];
		const push = (s) => {
			if (s) sections.push(s);
		};
		const module = this.#moduleDef;
		push(module.typespace && {
			tag: "Typespace",
			value: module.typespace
		});
		push(module.types && {
			tag: "Types",
			value: module.types
		});
		push(module.tables && {
			tag: "Tables",
			value: module.tables
		});
		push(module.reducers && {
			tag: "Reducers",
			value: module.reducers
		});
		push(module.procedures && {
			tag: "Procedures",
			value: module.procedures
		});
		push(module.views && {
			tag: "Views",
			value: module.views
		});
		push(module.schedules && {
			tag: "Schedules",
			value: module.schedules
		});
		push(module.lifeCycleReducers && {
			tag: "LifeCycleReducers",
			value: module.lifeCycleReducers
		});
		push(module.rowLevelSecurity && {
			tag: "RowLevelSecurity",
			value: module.rowLevelSecurity
		});
		push(module.explicitNames && {
			tag: "ExplicitNames",
			value: module.explicitNames
		});
		push(module.caseConversionPolicy && {
			tag: "CaseConversionPolicy",
			value: module.caseConversionPolicy
		});
		return { sections };
	}
	/**
	* Set the case conversion policy for this module.
	* Called by the settings mechanism.
	*/
	setCaseConversionPolicy(policy) {
		this.#moduleDef.caseConversionPolicy = policy;
	}
	get typespace() {
		return this.#moduleDef.typespace;
	}
	/**
	* Resolves the actual type of a TypeBuilder by following its references until it reaches a non-ref type.
	* @param typespace The typespace to resolve types against.
	* @param typeBuilder The TypeBuilder to resolve.
	* @returns The resolved algebraic type.
	*/
	resolveType(typeBuilder) {
		let ty = typeBuilder.algebraicType;
		while (ty.tag === "Ref") ty = this.typespace.types[ty.value];
		return ty;
	}
	/**
	* Adds a type to the module definition's typespace as a `Ref` if it is a named compound type (Product or Sum).
	* Otherwise, returns the type as is.
	* @param name
	* @param ty
	* @returns
	*/
	registerTypesRecursively(typeBuilder) {
		if (typeBuilder instanceof ProductBuilder && !isUnit(typeBuilder) || typeBuilder instanceof SumBuilder || typeBuilder instanceof RowBuilder) return this.#registerCompoundTypeRecursively(typeBuilder);
		else if (typeBuilder instanceof OptionBuilder) return new OptionBuilder(this.registerTypesRecursively(typeBuilder.value));
		else if (typeBuilder instanceof ResultBuilder) return new ResultBuilder(this.registerTypesRecursively(typeBuilder.ok), this.registerTypesRecursively(typeBuilder.err));
		else if (typeBuilder instanceof ArrayBuilder) return new ArrayBuilder(this.registerTypesRecursively(typeBuilder.element));
		else return typeBuilder;
	}
	#registerCompoundTypeRecursively(typeBuilder) {
		const ty = typeBuilder.algebraicType;
		const name = typeBuilder.typeName;
		if (name === void 0) throw new Error(`Missing type name for ${typeBuilder.constructor.name ?? "TypeBuilder"} ${JSON.stringify(typeBuilder)}`);
		let r = this.#compoundTypes.get(ty);
		if (r != null) return r;
		const newTy = typeBuilder instanceof RowBuilder || typeBuilder instanceof ProductBuilder ? {
			tag: "Product",
			value: { elements: [] }
		} : {
			tag: "Sum",
			value: { variants: [] }
		};
		r = new RefBuilder(this.#moduleDef.typespace.types.length);
		this.#moduleDef.typespace.types.push(newTy);
		this.#compoundTypes.set(ty, r);
		if (typeBuilder instanceof RowBuilder) for (const [name2, elem] of Object.entries(typeBuilder.row)) newTy.value.elements.push({
			name: name2,
			algebraicType: this.registerTypesRecursively(elem.typeBuilder).algebraicType
		});
		else if (typeBuilder instanceof ProductBuilder) for (const [name2, elem] of Object.entries(typeBuilder.elements)) newTy.value.elements.push({
			name: name2,
			algebraicType: this.registerTypesRecursively(elem).algebraicType
		});
		else if (typeBuilder instanceof SumBuilder) for (const [name2, variant] of Object.entries(typeBuilder.variants)) newTy.value.variants.push({
			name: name2,
			algebraicType: this.registerTypesRecursively(variant).algebraicType
		});
		this.#moduleDef.types.push({
			sourceName: splitName(name),
			ty: r.ref,
			customOrdering: true
		});
		return r;
	}
};
function isUnit(typeBuilder) {
	return typeBuilder.typeName == null && typeBuilder.algebraicType.value.elements.length === 0;
}
function splitName(name) {
	const scope = name.split(".");
	return {
		sourceName: scope.pop(),
		scope
	};
}
var import_statuses = __toESM(require_statuses());
var Range = class {
	#from;
	#to;
	constructor(from, to) {
		this.#from = from ?? { tag: "unbounded" };
		this.#to = to ?? { tag: "unbounded" };
	}
	get from() {
		return this.#from;
	}
	get to() {
		return this.#to;
	}
};
function table(opts, row, ..._) {
	const { name, public: isPublic = false, indexes: userIndexes = [], scheduled, event: isEvent = false } = opts;
	const colIds = /* @__PURE__ */ new Map();
	const colNameList = [];
	if (!(row instanceof RowBuilder)) row = new RowBuilder(row);
	row.algebraicType.value.elements.forEach((elem, i) => {
		colIds.set(elem.name, i);
		colNameList.push(elem.name);
	});
	const pk = [];
	const indexes = [];
	const constraints = [];
	const sequences = [];
	let scheduleAtCol;
	const defaultValues = [];
	for (const [name2, builder] of Object.entries(row.row)) {
		const meta = builder.columnMetadata;
		if (meta.isPrimaryKey) pk.push(colIds.get(name2));
		const isUnique = meta.isUnique || meta.isPrimaryKey;
		if (meta.indexType || isUnique) {
			const algo = meta.indexType ?? "btree";
			const id = colIds.get(name2);
			let algorithm;
			switch (algo) {
				case "btree":
					algorithm = RawIndexAlgorithm.BTree([id]);
					break;
				case "hash":
					algorithm = RawIndexAlgorithm.Hash([id]);
					break;
				case "direct":
					algorithm = RawIndexAlgorithm.Direct(id);
					break;
			}
			indexes.push({
				sourceName: void 0,
				accessorName: name2,
				algorithm
			});
		}
		if (isUnique) constraints.push({
			sourceName: void 0,
			data: {
				tag: "Unique",
				value: { columns: [colIds.get(name2)] }
			}
		});
		if (meta.isAutoIncrement) sequences.push({
			sourceName: void 0,
			start: void 0,
			minValue: void 0,
			maxValue: void 0,
			column: colIds.get(name2),
			increment: 1n
		});
		if (meta.defaultValue) {
			const writer = new BinaryWriter(16);
			builder.serialize(writer, meta.defaultValue);
			defaultValues.push({
				colId: colIds.get(name2),
				value: writer.getBuffer()
			});
		}
		if (scheduled) {
			const algebraicType = builder.typeBuilder.algebraicType;
			if (schedule_at_default.isScheduleAt(algebraicType)) scheduleAtCol = colIds.get(name2);
		}
	}
	for (const indexOpts of userIndexes ?? []) {
		let algorithm;
		switch (indexOpts.algorithm) {
			case "btree":
				algorithm = {
					tag: "BTree",
					value: indexOpts.columns.map((c) => colIds.get(c))
				};
				break;
			case "hash":
				algorithm = {
					tag: "Hash",
					value: indexOpts.columns.map((c) => colIds.get(c))
				};
				break;
			case "direct":
				algorithm = {
					tag: "Direct",
					value: colIds.get(indexOpts.column)
				};
				break;
		}
		indexes.push({
			sourceName: void 0,
			accessorName: indexOpts.accessor,
			algorithm,
			canonicalName: indexOpts.name
		});
	}
	for (const constraintOpts of opts.constraints ?? []) if (constraintOpts.constraint === "unique") {
		const data = {
			tag: "Unique",
			value: { columns: constraintOpts.columns.map((c) => colIds.get(c)) }
		};
		constraints.push({
			sourceName: constraintOpts.name,
			data
		});
		continue;
	}
	const productType = row.algebraicType.value;
	return {
		rowType: row,
		tableName: name,
		rowSpacetimeType: productType,
		tableDef: (ctx, accName) => {
			const tableName = name ?? accName;
			if (row.typeName === void 0) row.typeName = toPascalCase(tableName);
			for (const index of indexes) {
				const sourceName = index.sourceName = `${accName}_${(index.algorithm.tag === "Direct" ? [index.algorithm.value] : index.algorithm.value).map((i) => colNameList[i]).join("_")}_idx_${index.algorithm.tag.toLowerCase()}`;
				const { canonicalName } = index;
				if (canonicalName !== void 0) ctx.moduleDef.explicitNames.entries.push(ExplicitNameEntry.Index({
					sourceName,
					canonicalName
				}));
			}
			return {
				sourceName: accName,
				productTypeRef: ctx.registerTypesRecursively(row).ref,
				primaryKey: pk,
				indexes,
				constraints,
				sequences,
				tableType: { tag: "User" },
				tableAccess: { tag: isPublic ? "Public" : "Private" },
				defaultValues,
				isEvent
			};
		},
		idxs: {},
		constraints,
		schedule: scheduled && scheduleAtCol !== void 0 ? {
			scheduleAtCol,
			reducer: scheduled
		} : void 0
	};
}
var QueryBrand = Symbol("QueryBrand");
var isRowTypedQuery = (val) => !!val && typeof val === "object" && QueryBrand in val;
function toSql(q) {
	return q.toSql();
}
var SemijoinImpl = class _SemijoinImpl {
	constructor(sourceQuery, filterQuery, joinCondition) {
		this.sourceQuery = sourceQuery;
		this.filterQuery = filterQuery;
		this.joinCondition = joinCondition;
		if (sourceQuery.table.sourceName === filterQuery.table.sourceName) throw new Error("Cannot semijoin a table to itself");
	}
	[QueryBrand] = true;
	type = "semijoin";
	build() {
		return this;
	}
	where(predicate) {
		return new _SemijoinImpl(this.sourceQuery.where(predicate), this.filterQuery, this.joinCondition);
	}
	toSql() {
		const left = this.filterQuery;
		const right = this.sourceQuery;
		const leftTable = quoteIdentifier(left.table.sourceName);
		const rightTable = quoteIdentifier(right.table.sourceName);
		let sql = `SELECT ${rightTable}.* FROM ${leftTable} JOIN ${rightTable} ON ${booleanExprToSql(this.joinCondition)}`;
		const clauses = [];
		if (left.whereClause) clauses.push(booleanExprToSql(left.whereClause));
		if (right.whereClause) clauses.push(booleanExprToSql(right.whereClause));
		if (clauses.length > 0) {
			const whereSql = clauses.length === 1 ? clauses[0] : clauses.map(wrapInParens).join(" AND ");
			sql += ` WHERE ${whereSql}`;
		}
		return sql;
	}
};
var FromBuilder = class _FromBuilder {
	constructor(table2, whereClause) {
		this.table = table2;
		this.whereClause = whereClause;
	}
	[QueryBrand] = true;
	where(predicate) {
		const newCondition = predicate(this.table.cols);
		const nextWhere = this.whereClause ? this.whereClause.and(newCondition) : newCondition;
		return new _FromBuilder(this.table, nextWhere);
	}
	rightSemijoin(right, on) {
		const sourceQuery = new _FromBuilder(right);
		const joinCondition = on(this.table.indexedCols, right.indexedCols);
		return new SemijoinImpl(sourceQuery, this, joinCondition);
	}
	leftSemijoin(right, on) {
		const filterQuery = new _FromBuilder(right);
		const joinCondition = on(this.table.indexedCols, right.indexedCols);
		return new SemijoinImpl(this, filterQuery, joinCondition);
	}
	toSql() {
		return renderSelectSqlWithJoins(this.table, this.whereClause);
	}
	build() {
		return this;
	}
};
var TableRefImpl = class {
	[QueryBrand] = true;
	type = "table";
	sourceName;
	accessorName;
	cols;
	indexedCols;
	tableDef;
	get columns() {
		return this.tableDef.columns;
	}
	get indexes() {
		return this.tableDef.indexes;
	}
	get rowType() {
		return this.tableDef.rowType;
	}
	get constraints() {
		return this.tableDef.constraints;
	}
	constructor(tableDef) {
		this.sourceName = tableDef.sourceName;
		this.accessorName = tableDef.accessorName;
		this.cols = createRowExpr(tableDef);
		this.indexedCols = this.cols;
		this.tableDef = tableDef;
		Object.freeze(this);
	}
	asFrom() {
		return new FromBuilder(this);
	}
	rightSemijoin(other, on) {
		return this.asFrom().rightSemijoin(other, on);
	}
	leftSemijoin(other, on) {
		return this.asFrom().leftSemijoin(other, on);
	}
	build() {
		return this.asFrom().build();
	}
	toSql() {
		return this.asFrom().toSql();
	}
	where(predicate) {
		return this.asFrom().where(predicate);
	}
};
function createTableRefFromDef(tableDef) {
	return new TableRefImpl(tableDef);
}
function makeQueryBuilder(schema2) {
	const qb = /* @__PURE__ */ Object.create(null);
	for (const table2 of Object.values(schema2.tables)) {
		const ref = createTableRefFromDef(table2);
		qb[table2.accessorName] = ref;
	}
	return Object.freeze(qb);
}
function createRowExpr(tableDef) {
	const row = {};
	for (const columnName of Object.keys(tableDef.columns)) {
		const columnBuilder = tableDef.columns[columnName];
		const column = new ColumnExpression(tableDef.sourceName, columnName, columnBuilder.typeBuilder.algebraicType);
		row[columnName] = Object.freeze(column);
	}
	return Object.freeze(row);
}
function renderSelectSqlWithJoins(table2, where, extraClauses = []) {
	const sql = `SELECT * FROM ${quoteIdentifier(table2.sourceName)}`;
	const clauses = [];
	if (where) clauses.push(booleanExprToSql(where));
	clauses.push(...extraClauses);
	if (clauses.length === 0) return sql;
	return `${sql} WHERE ${clauses.length === 1 ? clauses[0] : clauses.map(wrapInParens).join(" AND ")}`;
}
var ColumnExpression = class {
	type = "column";
	column;
	table;
	tsValueType;
	spacetimeType;
	constructor(table2, column, spacetimeType) {
		this.table = table2;
		this.column = column;
		this.spacetimeType = spacetimeType;
	}
	eq(x) {
		return new BooleanExpr({
			type: "eq",
			left: this,
			right: normalizeValue(x)
		});
	}
	ne(x) {
		return new BooleanExpr({
			type: "ne",
			left: this,
			right: normalizeValue(x)
		});
	}
	lt(x) {
		return new BooleanExpr({
			type: "lt",
			left: this,
			right: normalizeValue(x)
		});
	}
	lte(x) {
		return new BooleanExpr({
			type: "lte",
			left: this,
			right: normalizeValue(x)
		});
	}
	gt(x) {
		return new BooleanExpr({
			type: "gt",
			left: this,
			right: normalizeValue(x)
		});
	}
	gte(x) {
		return new BooleanExpr({
			type: "gte",
			left: this,
			right: normalizeValue(x)
		});
	}
};
function literal(value) {
	return {
		type: "literal",
		value
	};
}
function normalizeValue(val) {
	if (val.type === "literal") return val;
	if (typeof val === "object" && val != null && "type" in val && val.type === "column") return val;
	return literal(val);
}
var BooleanExpr = class _BooleanExpr {
	constructor(data) {
		this.data = data;
	}
	and(other) {
		return new _BooleanExpr({
			type: "and",
			clauses: [this.data, other.data]
		});
	}
	or(other) {
		return new _BooleanExpr({
			type: "or",
			clauses: [this.data, other.data]
		});
	}
	not() {
		return new _BooleanExpr({
			type: "not",
			clause: this.data
		});
	}
};
function booleanExprToSql(expr, tableAlias) {
	const data = expr instanceof BooleanExpr ? expr.data : expr;
	switch (data.type) {
		case "eq": return `${valueExprToSql(data.left)} = ${valueExprToSql(data.right)}`;
		case "ne": return `${valueExprToSql(data.left)} <> ${valueExprToSql(data.right)}`;
		case "gt": return `${valueExprToSql(data.left)} > ${valueExprToSql(data.right)}`;
		case "gte": return `${valueExprToSql(data.left)} >= ${valueExprToSql(data.right)}`;
		case "lt": return `${valueExprToSql(data.left)} < ${valueExprToSql(data.right)}`;
		case "lte": return `${valueExprToSql(data.left)} <= ${valueExprToSql(data.right)}`;
		case "and": return data.clauses.map((c) => booleanExprToSql(c)).map(wrapInParens).join(" AND ");
		case "or": return data.clauses.map((c) => booleanExprToSql(c)).map(wrapInParens).join(" OR ");
		case "not": return `NOT ${wrapInParens(booleanExprToSql(data.clause))}`;
	}
}
function wrapInParens(sql) {
	return `(${sql})`;
}
function valueExprToSql(expr, tableAlias) {
	if (isLiteralExpr(expr)) return literalValueToSql(expr.value);
	const table2 = expr.table;
	return `${quoteIdentifier(table2)}.${quoteIdentifier(expr.column)}`;
}
function literalValueToSql(value) {
	if (value === null || value === void 0) return "NULL";
	if (value instanceof Identity || value instanceof ConnectionId) return `0x${value.toHexString()}`;
	if (value instanceof Timestamp) return `'${value.toISOString()}'`;
	switch (typeof value) {
		case "number":
		case "bigint": return String(value);
		case "boolean": return value ? "TRUE" : "FALSE";
		case "string": return `'${value.replace(/'/g, "''")}'`;
		default: return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
	}
}
function quoteIdentifier(name) {
	return `"${name.replace(/"/g, "\"\"")}"`;
}
function isLiteralExpr(expr) {
	return expr.type === "literal";
}
function makeViewExport(ctx, opts, params, ret, fn) {
	const viewExport = fn.bind();
	viewExport[exportContext] = ctx;
	viewExport[registerExport] = (ctx2, exportName) => {
		registerView(ctx2, opts, exportName, false, params, ret, fn);
	};
	return viewExport;
}
function makeAnonViewExport(ctx, opts, params, ret, fn) {
	const viewExport = fn.bind();
	viewExport[exportContext] = ctx;
	viewExport[registerExport] = (ctx2, exportName) => {
		registerView(ctx2, opts, exportName, true, params, ret, fn);
	};
	return viewExport;
}
function registerView(ctx, opts, exportName, anon, params, ret, fn) {
	const paramsBuilder = new RowBuilder(params, toPascalCase(exportName));
	let returnType = ctx.registerTypesRecursively(ret).algebraicType;
	const { typespace } = ctx;
	const { value: paramType } = ctx.resolveType(ctx.registerTypesRecursively(paramsBuilder));
	ctx.moduleDef.views.push({
		sourceName: exportName,
		index: (anon ? ctx.anonViews : ctx.views).length,
		isPublic: opts.public,
		isAnonymous: anon,
		params: paramType,
		returnType
	});
	if (opts.name != null) ctx.moduleDef.explicitNames.entries.push({
		tag: "Function",
		value: {
			sourceName: exportName,
			canonicalName: opts.name
		}
	});
	if (returnType.tag == "Sum") {
		const originalFn = fn;
		fn = ((ctx2, args) => {
			const ret2 = originalFn(ctx2, args);
			return ret2 == null ? [] : [ret2];
		});
		returnType = AlgebraicType.Array(returnType.value.variants[0].algebraicType);
	}
	(anon ? ctx.anonViews : ctx.views).push({
		fn,
		deserializeParams: ProductType.makeDeserializer(paramType, typespace),
		serializeReturn: AlgebraicType.makeSerializer(returnType, typespace),
		returnTypeBaseSize: bsatnBaseSize(typespace, returnType)
	});
}
var SenderError = class extends Error {
	constructor(message) {
		super(message);
	}
	get name() {
		return "SenderError";
	}
};
var SpacetimeHostError = class extends Error {
	constructor(message) {
		super(message);
	}
	get name() {
		return "SpacetimeHostError";
	}
};
var errorData = {
	HostCallFailure: 1,
	NotInTransaction: 2,
	BsatnDecodeError: 3,
	NoSuchTable: 4,
	NoSuchIndex: 5,
	NoSuchIter: 6,
	NoSuchConsoleTimer: 7,
	NoSuchBytes: 8,
	NoSpace: 9,
	BufferTooSmall: 11,
	UniqueAlreadyExists: 12,
	ScheduleAtDelayTooLong: 13,
	IndexNotUnique: 14,
	NoSuchRow: 15,
	AutoIncOverflow: 16,
	WouldBlockTransaction: 17,
	TransactionNotAnonymous: 18,
	TransactionIsReadOnly: 19,
	TransactionIsMut: 20,
	HttpError: 21
};
function mapEntries(x, f) {
	return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, f(k, v)]));
}
var errnoToClass = /* @__PURE__ */ new Map();
var errors = Object.freeze(mapEntries(errorData, (name, code) => {
	const cls = Object.defineProperty(class extends SpacetimeHostError {
		get name() {
			return name;
		}
	}, "name", {
		value: name,
		writable: false
	});
	errnoToClass.set(code, cls);
	return cls;
}));
function getErrorConstructor(code) {
	return errnoToClass.get(code) ?? SpacetimeHostError;
}
var SBigInt = typeof BigInt !== "undefined" ? BigInt : void 0;
var One = typeof BigInt !== "undefined" ? BigInt(1) : void 0;
var ThirtyTwo = typeof BigInt !== "undefined" ? BigInt(32) : void 0;
var NumValues = typeof BigInt !== "undefined" ? BigInt(4294967296) : void 0;
function unsafeUniformBigIntDistribution(from, to, rng) {
	var diff = to - from + One;
	var FinalNumValues = NumValues;
	var NumIterations = 1;
	while (FinalNumValues < diff) {
		FinalNumValues <<= ThirtyTwo;
		++NumIterations;
	}
	var value = generateNext(NumIterations, rng);
	if (value < diff) return value + from;
	if (value + diff < FinalNumValues) return value % diff + from;
	var MaxAcceptedRandom = FinalNumValues - FinalNumValues % diff;
	while (value >= MaxAcceptedRandom) value = generateNext(NumIterations, rng);
	return value % diff + from;
}
function generateNext(NumIterations, rng) {
	var value = SBigInt(rng.unsafeNext() + 2147483648);
	for (var num = 1; num < NumIterations; ++num) {
		var out = rng.unsafeNext();
		value = (value << ThirtyTwo) + SBigInt(out + 2147483648);
	}
	return value;
}
function unsafeUniformIntDistributionInternal(rangeSize, rng) {
	var MaxAllowed = rangeSize > 2 ? ~~(4294967296 / rangeSize) * rangeSize : 4294967296;
	var deltaV = rng.unsafeNext() + 2147483648;
	while (deltaV >= MaxAllowed) deltaV = rng.unsafeNext() + 2147483648;
	return deltaV % rangeSize;
}
function fromNumberToArrayInt64(out, n) {
	if (n < 0) {
		var posN = -n;
		out.sign = -1;
		out.data[0] = ~~(posN / 4294967296);
		out.data[1] = posN >>> 0;
	} else {
		out.sign = 1;
		out.data[0] = ~~(n / 4294967296);
		out.data[1] = n >>> 0;
	}
	return out;
}
function substractArrayInt64(out, arrayIntA, arrayIntB) {
	var lowA = arrayIntA.data[1];
	var highA = arrayIntA.data[0];
	var signA = arrayIntA.sign;
	var lowB = arrayIntB.data[1];
	var highB = arrayIntB.data[0];
	var signB = arrayIntB.sign;
	out.sign = 1;
	if (signA === 1 && signB === -1) {
		var low_1 = lowA + lowB;
		var high = highA + highB + (low_1 > 4294967295 ? 1 : 0);
		out.data[0] = high >>> 0;
		out.data[1] = low_1 >>> 0;
		return out;
	}
	var lowFirst = lowA;
	var highFirst = highA;
	var lowSecond = lowB;
	var highSecond = highB;
	if (signA === -1) {
		lowFirst = lowB;
		highFirst = highB;
		lowSecond = lowA;
		highSecond = highA;
	}
	var reminderLow = 0;
	var low = lowFirst - lowSecond;
	if (low < 0) {
		reminderLow = 1;
		low = low >>> 0;
	}
	out.data[0] = highFirst - highSecond - reminderLow;
	out.data[1] = low;
	return out;
}
function unsafeUniformArrayIntDistributionInternal(out, rangeSize, rng) {
	var rangeLength = rangeSize.length;
	while (true) {
		for (var index = 0; index !== rangeLength; ++index) out[index] = unsafeUniformIntDistributionInternal(index === 0 ? rangeSize[0] + 1 : 4294967296, rng);
		for (var index = 0; index !== rangeLength; ++index) {
			var current = out[index];
			var currentInRange = rangeSize[index];
			if (current < currentInRange) return out;
			else if (current > currentInRange) break;
		}
	}
}
var safeNumberMaxSafeInteger = Number.MAX_SAFE_INTEGER;
var sharedA = {
	sign: 1,
	data: [0, 0]
};
var sharedB = {
	sign: 1,
	data: [0, 0]
};
var sharedC = {
	sign: 1,
	data: [0, 0]
};
var sharedData = [0, 0];
function uniformLargeIntInternal(from, to, rangeSize, rng) {
	var rangeSizeArrayIntValue = rangeSize <= safeNumberMaxSafeInteger ? fromNumberToArrayInt64(sharedC, rangeSize) : substractArrayInt64(sharedC, fromNumberToArrayInt64(sharedA, to), fromNumberToArrayInt64(sharedB, from));
	if (rangeSizeArrayIntValue.data[1] === 4294967295) {
		rangeSizeArrayIntValue.data[0] += 1;
		rangeSizeArrayIntValue.data[1] = 0;
	} else rangeSizeArrayIntValue.data[1] += 1;
	unsafeUniformArrayIntDistributionInternal(sharedData, rangeSizeArrayIntValue.data, rng);
	return sharedData[0] * 4294967296 + sharedData[1] + from;
}
function unsafeUniformIntDistribution(from, to, rng) {
	var rangeSize = to - from;
	if (rangeSize <= 4294967295) return unsafeUniformIntDistributionInternal(rangeSize + 1, rng) + from;
	return uniformLargeIntInternal(from, to, rangeSize, rng);
}
var XoroShiro128Plus = (function() {
	function XoroShiro128Plus2(s01, s00, s11, s10) {
		this.s01 = s01;
		this.s00 = s00;
		this.s11 = s11;
		this.s10 = s10;
	}
	XoroShiro128Plus2.prototype.clone = function() {
		return new XoroShiro128Plus2(this.s01, this.s00, this.s11, this.s10);
	};
	XoroShiro128Plus2.prototype.next = function() {
		var nextRng = new XoroShiro128Plus2(this.s01, this.s00, this.s11, this.s10);
		return [nextRng.unsafeNext(), nextRng];
	};
	XoroShiro128Plus2.prototype.unsafeNext = function() {
		var out = this.s00 + this.s10 | 0;
		var a0 = this.s10 ^ this.s00;
		var a1 = this.s11 ^ this.s01;
		var s00 = this.s00;
		var s01 = this.s01;
		this.s00 = s00 << 24 ^ s01 >>> 8 ^ a0 ^ a0 << 16;
		this.s01 = s01 << 24 ^ s00 >>> 8 ^ a1 ^ (a1 << 16 | a0 >>> 16);
		this.s10 = a1 << 5 ^ a0 >>> 27;
		this.s11 = a0 << 5 ^ a1 >>> 27;
		return out;
	};
	XoroShiro128Plus2.prototype.jump = function() {
		var nextRng = new XoroShiro128Plus2(this.s01, this.s00, this.s11, this.s10);
		nextRng.unsafeJump();
		return nextRng;
	};
	XoroShiro128Plus2.prototype.unsafeJump = function() {
		var ns01 = 0;
		var ns00 = 0;
		var ns11 = 0;
		var ns10 = 0;
		var jump = [
			3639956645,
			3750757012,
			1261568508,
			386426335
		];
		for (var i = 0; i !== 4; ++i) for (var mask = 1; mask; mask <<= 1) {
			if (jump[i] & mask) {
				ns01 ^= this.s01;
				ns00 ^= this.s00;
				ns11 ^= this.s11;
				ns10 ^= this.s10;
			}
			this.unsafeNext();
		}
		this.s01 = ns01;
		this.s00 = ns00;
		this.s11 = ns11;
		this.s10 = ns10;
	};
	XoroShiro128Plus2.prototype.getState = function() {
		return [
			this.s01,
			this.s00,
			this.s11,
			this.s10
		];
	};
	return XoroShiro128Plus2;
})();
function fromState(state) {
	if (!(state.length === 4)) throw new Error("The state must have been produced by a xoroshiro128plus RandomGenerator");
	return new XoroShiro128Plus(state[0], state[1], state[2], state[3]);
}
var xoroshiro128plus = Object.assign(function(seed) {
	return new XoroShiro128Plus(-1, ~seed, seed | 0, 0);
}, { fromState });
var { asUintN } = BigInt;
function pcg32(state) {
	state = asUintN(64, state * 6364136223846793005n + 11634580027462260723n);
	const xorshifted = Number(asUintN(32, (state >> 18n ^ state) >> 27n));
	const rot = Number(asUintN(32, state >> 59n));
	return xorshifted >> rot | xorshifted << 32 - rot;
}
function generateFloat64(rng) {
	const g1 = unsafeUniformIntDistribution(0, (1 << 26) - 1, rng);
	const g2 = unsafeUniformIntDistribution(0, (1 << 27) - 1, rng);
	return (g1 * Math.pow(2, 27) + g2) * Math.pow(2, -53);
}
function makeRandom(seed) {
	const rng = xoroshiro128plus(pcg32(seed.microsSinceUnixEpoch));
	const random = () => generateFloat64(rng);
	random.fill = (array) => {
		const elem = array.at(0);
		if (typeof elem === "bigint") {
			const upper = (1n << BigInt(array.BYTES_PER_ELEMENT * 8)) - 1n;
			for (let i = 0; i < array.length; i++) array[i] = unsafeUniformBigIntDistribution(0n, upper, rng);
		} else if (typeof elem === "number") {
			const upper = (1 << array.BYTES_PER_ELEMENT * 8) - 1;
			for (let i = 0; i < array.length; i++) array[i] = unsafeUniformIntDistribution(0, upper, rng);
		}
		return array;
	};
	random.uint32 = () => rng.unsafeNext();
	random.integerInRange = (min, max) => unsafeUniformIntDistribution(min, max, rng);
	random.bigintInRange = (min, max) => unsafeUniformBigIntDistribution(min, max, rng);
	return random;
}
var { freeze } = Object;
var sys = _syscalls2_0;
function parseJsonObject(json) {
	let value;
	try {
		value = JSON.parse(json);
	} catch {
		throw new Error("Invalid JSON: failed to parse string");
	}
	if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error("Expected a JSON object at the top level");
	return value;
}
var JwtClaimsImpl = class {
	/**
	* Creates a new JwtClaims instance.
	* @param rawPayload The JWT payload as a raw JSON string.
	* @param identity The identity for this JWT. We are only taking this because we don't have a blake3 implementation (which we need to compute it).
	*/
	constructor(rawPayload, identity) {
		this.rawPayload = rawPayload;
		this.fullPayload = parseJsonObject(rawPayload);
		this._identity = identity;
	}
	fullPayload;
	_identity;
	get identity() {
		return this._identity;
	}
	get subject() {
		return this.fullPayload["sub"];
	}
	get issuer() {
		return this.fullPayload["iss"];
	}
	get audience() {
		const aud = this.fullPayload["aud"];
		if (aud == null) return [];
		return typeof aud === "string" ? [aud] : aud;
	}
};
var AuthCtxImpl = class _AuthCtxImpl {
	isInternal;
	_jwtSource;
	_initializedJWT = false;
	_jwtClaims;
	_senderIdentity;
	constructor(opts) {
		this.isInternal = opts.isInternal;
		this._jwtSource = opts.jwtSource;
		this._senderIdentity = opts.senderIdentity;
	}
	_initializeJWT() {
		if (this._initializedJWT) return;
		this._initializedJWT = true;
		const token = this._jwtSource();
		if (!token) this._jwtClaims = null;
		else this._jwtClaims = new JwtClaimsImpl(token, this._senderIdentity);
		Object.freeze(this);
	}
	/** Lazily compute whether a JWT exists and is parseable. */
	get hasJWT() {
		this._initializeJWT();
		return this._jwtClaims !== null;
	}
	/** Lazily parse the JwtClaims only when accessed. */
	get jwt() {
		this._initializeJWT();
		return this._jwtClaims;
	}
	/** Create a context representing internal (non-user) requests. */
	static internal() {
		return new _AuthCtxImpl({
			isInternal: true,
			jwtSource: () => null,
			senderIdentity: Identity.zero()
		});
	}
	/** If there is a connection id, look up the JWT payload from the system tables. */
	static fromSystemTables(connectionId, sender) {
		if (connectionId === null) return new _AuthCtxImpl({
			isInternal: false,
			jwtSource: () => null,
			senderIdentity: sender
		});
		return new _AuthCtxImpl({
			isInternal: false,
			jwtSource: () => {
				const payloadBuf = sys.get_jwt_payload(connectionId.__connection_id__);
				if (payloadBuf.length === 0) return null;
				return new TextDecoder().decode(payloadBuf);
			},
			senderIdentity: sender
		});
	}
};
var ReducerCtxImpl = class ReducerCtx {
	#identity;
	#senderAuth;
	#uuidCounter;
	#random;
	sender;
	timestamp;
	connectionId;
	db;
	constructor(sender, timestamp, connectionId, dbView) {
		Object.seal(this);
		this.sender = sender;
		this.timestamp = timestamp;
		this.connectionId = connectionId;
		this.db = dbView;
	}
	/** Reset the `ReducerCtx` to be used for a new transaction */
	static reset(me, sender, timestamp, connectionId) {
		me.sender = sender;
		me.timestamp = timestamp;
		me.connectionId = connectionId;
		me.#uuidCounter = void 0;
		me.#senderAuth = void 0;
	}
	get identity() {
		return this.#identity ??= new Identity(sys.identity());
	}
	get senderAuth() {
		return this.#senderAuth ??= AuthCtxImpl.fromSystemTables(this.connectionId, this.sender);
	}
	get random() {
		return this.#random ??= makeRandom(this.timestamp);
	}
	/**
	* Create a new random {@link Uuid} `v4` using this `ReducerCtx`'s RNG.
	*/
	newUuidV4() {
		const bytes = this.random.fill(new Uint8Array(16));
		return Uuid.fromRandomBytesV4(bytes);
	}
	/**
	* Create a new sortable {@link Uuid} `v7` using this `ReducerCtx`'s RNG, counter,
	* and timestamp.
	*/
	newUuidV7() {
		const bytes = this.random.fill(new Uint8Array(4));
		const counter = this.#uuidCounter ??= { value: 0 };
		return Uuid.fromCounterV7(counter, this.timestamp, bytes);
	}
};
var callUserFunction = function __spacetimedb_end_short_backtrace(fn, ...args) {
	return fn(...args);
};
var makeHooks = (schema2) => new ModuleHooksImpl(schema2);
var ModuleHooksImpl = class {
	#schema;
	#dbView_;
	#reducerArgsDeserializers;
	/** Cache the `ReducerCtx` object to avoid allocating anew for ever reducer call. */
	#reducerCtx_;
	constructor(schema2) {
		this.#schema = schema2;
		this.#reducerArgsDeserializers = schema2.moduleDef.reducers.map(({ params }) => ProductType.makeDeserializer(params, schema2.typespace));
	}
	get #dbView() {
		return this.#dbView_ ??= freeze(Object.fromEntries(Object.values(this.#schema.schemaType.tables).map((table2) => [table2.accessorName, makeTableView(this.#schema.typespace, table2.tableDef)])));
	}
	get #reducerCtx() {
		return this.#reducerCtx_ ??= new ReducerCtxImpl(Identity.zero(), Timestamp.UNIX_EPOCH, null, this.#dbView);
	}
	__describe_module__() {
		const writer = new BinaryWriter(128);
		RawModuleDef.serialize(writer, RawModuleDef.V10(this.#schema.rawModuleDefV10()));
		return writer.getBuffer();
	}
	__get_error_constructor__(code) {
		return getErrorConstructor(code);
	}
	get __sender_error_class__() {
		return SenderError;
	}
	__call_reducer__(reducerId, sender, connId, timestamp, argsBuf) {
		const moduleCtx = this.#schema;
		const deserializeArgs = this.#reducerArgsDeserializers[reducerId];
		BINARY_READER.reset(argsBuf);
		const args = deserializeArgs(BINARY_READER);
		const senderIdentity = new Identity(sender);
		const ctx = this.#reducerCtx;
		ReducerCtxImpl.reset(ctx, senderIdentity, new Timestamp(timestamp), ConnectionId.nullIfZero(new ConnectionId(connId)));
		callUserFunction(moduleCtx.reducers[reducerId], ctx, args);
	}
	__call_view__(id, sender, argsBuf) {
		const moduleCtx = this.#schema;
		const { fn, deserializeParams, serializeReturn, returnTypeBaseSize } = moduleCtx.views[id];
		const ret = callUserFunction(fn, freeze({
			sender: new Identity(sender),
			db: this.#dbView,
			from: makeQueryBuilder(moduleCtx.schemaType)
		}), deserializeParams(new BinaryReader(argsBuf)));
		const retBuf = new BinaryWriter(returnTypeBaseSize);
		if (isRowTypedQuery(ret)) {
			const query = toSql(ret);
			ViewResultHeader.serialize(retBuf, ViewResultHeader.RawSql(query));
		} else {
			ViewResultHeader.serialize(retBuf, ViewResultHeader.RowData);
			serializeReturn(retBuf, ret);
		}
		return { data: retBuf.getBuffer() };
	}
	__call_view_anon__(id, argsBuf) {
		const moduleCtx = this.#schema;
		const { fn, deserializeParams, serializeReturn, returnTypeBaseSize } = moduleCtx.anonViews[id];
		const ret = callUserFunction(fn, freeze({
			db: this.#dbView,
			from: makeQueryBuilder(moduleCtx.schemaType)
		}), deserializeParams(new BinaryReader(argsBuf)));
		const retBuf = new BinaryWriter(returnTypeBaseSize);
		if (isRowTypedQuery(ret)) {
			const query = toSql(ret);
			ViewResultHeader.serialize(retBuf, ViewResultHeader.RawSql(query));
		} else {
			ViewResultHeader.serialize(retBuf, ViewResultHeader.RowData);
			serializeReturn(retBuf, ret);
		}
		return { data: retBuf.getBuffer() };
	}
	__call_procedure__(id, sender, connection_id, timestamp, args) {
		return callProcedure(this.#schema, id, new Identity(sender), ConnectionId.nullIfZero(new ConnectionId(connection_id)), new Timestamp(timestamp), args, () => this.#dbView);
	}
};
var BINARY_WRITER = new BinaryWriter(0);
var BINARY_READER = new BinaryReader(new Uint8Array());
function makeTableView(typespace, table2) {
	const table_id = sys.table_id_from_name(table2.sourceName);
	const rowType = typespace.types[table2.productTypeRef];
	if (rowType.tag !== "Product") throw "impossible";
	const serializeRow = AlgebraicType.makeSerializer(rowType, typespace);
	const deserializeRow = AlgebraicType.makeDeserializer(rowType, typespace);
	const sequences = table2.sequences.map((seq) => {
		const col = rowType.value.elements[seq.column];
		const colType = col.algebraicType;
		let sequenceTrigger;
		switch (colType.tag) {
			case "U8":
			case "I8":
			case "U16":
			case "I16":
			case "U32":
			case "I32":
				sequenceTrigger = 0;
				break;
			case "U64":
			case "I64":
			case "U128":
			case "I128":
			case "U256":
			case "I256":
				sequenceTrigger = 0n;
				break;
			default: throw new TypeError("invalid sequence type");
		}
		return {
			colName: col.name,
			sequenceTrigger,
			deserialize: AlgebraicType.makeDeserializer(colType, typespace)
		};
	});
	const hasAutoIncrement = sequences.length > 0;
	const iter = () => tableIterator(sys.datastore_table_scan_bsatn(table_id), deserializeRow);
	const integrateGeneratedColumns = hasAutoIncrement ? (row, ret_buf) => {
		BINARY_READER.reset(ret_buf);
		for (const { colName, deserialize, sequenceTrigger } of sequences) if (row[colName] === sequenceTrigger) row[colName] = deserialize(BINARY_READER);
	} : null;
	const tableMethods = {
		count: () => sys.datastore_table_row_count(table_id),
		iter,
		[Symbol.iterator]: () => iter(),
		insert: (row) => {
			const buf = LEAF_BUF;
			BINARY_WRITER.reset(buf);
			serializeRow(BINARY_WRITER, row);
			sys.datastore_insert_bsatn(table_id, buf.buffer, BINARY_WRITER.offset);
			const ret = { ...row };
			integrateGeneratedColumns?.(ret, buf.view);
			return ret;
		},
		delete: (row) => {
			const buf = LEAF_BUF;
			BINARY_WRITER.reset(buf);
			BINARY_WRITER.writeU32(1);
			serializeRow(BINARY_WRITER, row);
			return sys.datastore_delete_all_by_eq_bsatn(table_id, buf.buffer, BINARY_WRITER.offset) > 0;
		}
	};
	const tableView = Object.assign(/* @__PURE__ */ Object.create(null), tableMethods);
	for (const indexDef of table2.indexes) {
		const index_id = sys.index_id_from_name(indexDef.sourceName);
		let column_ids;
		let isHashIndex = false;
		switch (indexDef.algorithm.tag) {
			case "Hash":
				isHashIndex = true;
				column_ids = indexDef.algorithm.value;
				break;
			case "BTree":
				column_ids = indexDef.algorithm.value;
				break;
			case "Direct":
				column_ids = [indexDef.algorithm.value];
				break;
		}
		const numColumns = column_ids.length;
		const columnSet = new Set(column_ids);
		const isUnique = table2.constraints.filter((x) => x.data.tag === "Unique").some((x) => columnSet.isSubsetOf(new Set(x.data.value.columns)));
		const isPrimaryKey = isUnique && column_ids.length === table2.primaryKey.length && column_ids.every((id, i) => table2.primaryKey[i] === id);
		const indexSerializers = column_ids.map((id) => AlgebraicType.makeSerializer(rowType.value.elements[id].algebraicType, typespace));
		const serializePoint = (buffer, colVal) => {
			BINARY_WRITER.reset(buffer);
			for (let i = 0; i < numColumns; i++) indexSerializers[i](BINARY_WRITER, colVal[i]);
			return BINARY_WRITER.offset;
		};
		const serializeSingleElement = numColumns === 1 ? indexSerializers[0] : null;
		const serializeSinglePoint = serializeSingleElement && ((buffer, colVal) => {
			BINARY_WRITER.reset(buffer);
			serializeSingleElement(BINARY_WRITER, colVal);
			return BINARY_WRITER.offset;
		});
		let index;
		if (isUnique && serializeSinglePoint) {
			const base = {
				find: (colVal) => {
					const buf = LEAF_BUF;
					const point_len = serializeSinglePoint(buf, colVal);
					return tableIterateOne(sys.datastore_index_scan_point_bsatn(index_id, buf.buffer, point_len), deserializeRow);
				},
				delete: (colVal) => {
					const buf = LEAF_BUF;
					const point_len = serializeSinglePoint(buf, colVal);
					return sys.datastore_delete_by_index_scan_point_bsatn(index_id, buf.buffer, point_len) > 0;
				}
			};
			if (isPrimaryKey) base.update = (row) => {
				const buf = LEAF_BUF;
				BINARY_WRITER.reset(buf);
				serializeRow(BINARY_WRITER, row);
				sys.datastore_update_bsatn(table_id, index_id, buf.buffer, BINARY_WRITER.offset);
				integrateGeneratedColumns?.(row, buf.view);
				return row;
			};
			index = base;
		} else if (isUnique) {
			const base = {
				find: (colVal) => {
					if (colVal.length !== numColumns) throw new TypeError("wrong number of elements");
					const buf = LEAF_BUF;
					const point_len = serializePoint(buf, colVal);
					return tableIterateOne(sys.datastore_index_scan_point_bsatn(index_id, buf.buffer, point_len), deserializeRow);
				},
				delete: (colVal) => {
					if (colVal.length !== numColumns) throw new TypeError("wrong number of elements");
					const buf = LEAF_BUF;
					const point_len = serializePoint(buf, colVal);
					return sys.datastore_delete_by_index_scan_point_bsatn(index_id, buf.buffer, point_len) > 0;
				}
			};
			if (isPrimaryKey) base.update = (row) => {
				const buf = LEAF_BUF;
				BINARY_WRITER.reset(buf);
				serializeRow(BINARY_WRITER, row);
				sys.datastore_update_bsatn(table_id, index_id, buf.buffer, BINARY_WRITER.offset);
				integrateGeneratedColumns?.(row, buf.view);
				return row;
			};
			index = base;
		} else if (serializeSinglePoint) {
			const rawIndex = {
				filter: (range) => {
					const buf = LEAF_BUF;
					const point_len = serializeSinglePoint(buf, range);
					return tableIterator(sys.datastore_index_scan_point_bsatn(index_id, buf.buffer, point_len), deserializeRow);
				},
				delete: (range) => {
					const buf = LEAF_BUF;
					const point_len = serializeSinglePoint(buf, range);
					return sys.datastore_delete_by_index_scan_point_bsatn(index_id, buf.buffer, point_len);
				}
			};
			if (isHashIndex) index = rawIndex;
			else index = rawIndex;
		} else if (isHashIndex) index = {
			filter: (range) => {
				const buf = LEAF_BUF;
				const point_len = serializePoint(buf, range);
				return tableIterator(sys.datastore_index_scan_point_bsatn(index_id, buf.buffer, point_len), deserializeRow);
			},
			delete: (range) => {
				const buf = LEAF_BUF;
				const point_len = serializePoint(buf, range);
				return sys.datastore_delete_by_index_scan_point_bsatn(index_id, buf.buffer, point_len);
			}
		};
		else {
			const serializeRange = (buffer, range) => {
				if (range.length > numColumns) throw new TypeError("too many elements");
				BINARY_WRITER.reset(buffer);
				const writer = BINARY_WRITER;
				const prefix_elems = range.length - 1;
				for (let i = 0; i < prefix_elems; i++) indexSerializers[i](writer, range[i]);
				const rstartOffset = writer.offset;
				const term = range[range.length - 1];
				const serializeTerm = indexSerializers[range.length - 1];
				if (term instanceof Range) {
					const writeBound = (bound) => {
						writer.writeU8({
							included: 0,
							excluded: 1,
							unbounded: 2
						}[bound.tag]);
						if (bound.tag !== "unbounded") serializeTerm(writer, bound.value);
					};
					writeBound(term.from);
					const rstartLen = writer.offset - rstartOffset;
					writeBound(term.to);
					return [
						rstartOffset,
						prefix_elems,
						rstartLen,
						writer.offset - rstartLen
					];
				} else {
					writer.writeU8(0);
					serializeTerm(writer, term);
					return [
						rstartOffset,
						prefix_elems,
						writer.offset,
						0
					];
				}
			};
			index = {
				filter: (range) => {
					if (range.length === numColumns) {
						const buf = LEAF_BUF;
						const point_len = serializePoint(buf, range);
						return tableIterator(sys.datastore_index_scan_point_bsatn(index_id, buf.buffer, point_len), deserializeRow);
					} else {
						const buf = LEAF_BUF;
						const args = serializeRange(buf, range);
						return tableIterator(sys.datastore_index_scan_range_bsatn(index_id, buf.buffer, ...args), deserializeRow);
					}
				},
				delete: (range) => {
					if (range.length === numColumns) {
						const buf = LEAF_BUF;
						const point_len = serializePoint(buf, range);
						return sys.datastore_delete_by_index_scan_point_bsatn(index_id, buf.buffer, point_len);
					} else {
						const buf = LEAF_BUF;
						const args = serializeRange(buf, range);
						return sys.datastore_delete_by_index_scan_range_bsatn(index_id, buf.buffer, ...args);
					}
				}
			};
		}
		if (Object.hasOwn(tableView, indexDef.accessorName)) freeze(Object.assign(tableView[indexDef.accessorName], index));
		else tableView[indexDef.accessorName] = freeze(index);
	}
	return freeze(tableView);
}
function* tableIterator(id, deserialize) {
	using iter = new IteratorHandle(id);
	const iterBuf = takeBuf();
	try {
		let amt;
		while (amt = iter.advance(iterBuf)) {
			const reader = new BinaryReader(iterBuf.view);
			while (reader.offset < amt) yield deserialize(reader);
		}
	} finally {
		returnBuf(iterBuf);
	}
}
function tableIterateOne(id, deserialize) {
	const buf = LEAF_BUF;
	if (advanceIterRaw(id, buf) !== 0) {
		BINARY_READER.reset(buf.view);
		return deserialize(BINARY_READER);
	}
	return null;
}
function advanceIterRaw(id, buf) {
	while (true) try {
		return 0 | sys.row_iter_bsatn_advance(id, buf.buffer);
	} catch (e) {
		if (e && typeof e === "object" && hasOwn(e, "__buffer_too_small__")) {
			buf.grow(e.__buffer_too_small__);
			continue;
		}
		throw e;
	}
}
var DEFAULT_BUFFER_CAPACITY = 32 * 1024 * 2;
var ITER_BUFS = [new ResizableBuffer(DEFAULT_BUFFER_CAPACITY)];
var ITER_BUF_COUNT = 1;
function takeBuf() {
	return ITER_BUF_COUNT ? ITER_BUFS[--ITER_BUF_COUNT] : new ResizableBuffer(DEFAULT_BUFFER_CAPACITY);
}
function returnBuf(buf) {
	ITER_BUFS[ITER_BUF_COUNT++] = buf;
}
var LEAF_BUF = new ResizableBuffer(DEFAULT_BUFFER_CAPACITY);
var IteratorHandle = class _IteratorHandle {
	#id;
	static #finalizationRegistry = new FinalizationRegistry(sys.row_iter_bsatn_close);
	constructor(id) {
		this.#id = id;
		_IteratorHandle.#finalizationRegistry.register(this, id, this);
	}
	/** Unregister this object with the finalization registry and return the id */
	#detach() {
		const id = this.#id;
		this.#id = -1;
		_IteratorHandle.#finalizationRegistry.unregister(this);
		return id;
	}
	/** Call `row_iter_bsatn_advance`, returning 0 if this iterator has been exhausted. */
	advance(buf) {
		if (this.#id === -1) return 0;
		const ret = advanceIterRaw(this.#id, buf);
		if (ret <= 0) this.#detach();
		return ret < 0 ? -ret : ret;
	}
	[Symbol.dispose]() {
		if (this.#id >= 0) {
			const id = this.#detach();
			sys.row_iter_bsatn_close(id);
		}
	}
};
var { freeze: freeze2 } = Object;
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder("utf-8");
var makeResponse = Symbol("makeResponse");
var SyncResponse = class _SyncResponse {
	#body;
	#inner;
	constructor(body, init) {
		if (body == null) this.#body = null;
		else if (typeof body === "string") this.#body = body;
		else this.#body = new Uint8Array(body).buffer;
		this.#inner = {
			headers: new Headers(init?.headers),
			status: init?.status ?? 200,
			statusText: init?.statusText ?? "",
			type: "default",
			url: null,
			aborted: false
		};
	}
	static [makeResponse](body, inner) {
		const me = new _SyncResponse(body);
		me.#inner = inner;
		return me;
	}
	get headers() {
		return this.#inner.headers;
	}
	get status() {
		return this.#inner.status;
	}
	get statusText() {
		return this.#inner.statusText;
	}
	get ok() {
		return 200 <= this.#inner.status && this.#inner.status <= 299;
	}
	get url() {
		return this.#inner.url ?? "";
	}
	get type() {
		return this.#inner.type;
	}
	arrayBuffer() {
		return this.bytes().buffer;
	}
	bytes() {
		if (this.#body == null) return new Uint8Array();
		else if (typeof this.#body === "string") return textEncoder.encode(this.#body);
		else return new Uint8Array(this.#body);
	}
	json() {
		return JSON.parse(this.text());
	}
	text() {
		if (this.#body == null) return "";
		else if (typeof this.#body === "string") return this.#body;
		else return textDecoder.decode(this.#body);
	}
};
var requestBaseSize = bsatnBaseSize({ types: [] }, HttpRequest.algebraicType);
var methods = /* @__PURE__ */ new Map([
	["GET", { tag: "Get" }],
	["HEAD", { tag: "Head" }],
	["POST", { tag: "Post" }],
	["PUT", { tag: "Put" }],
	["DELETE", { tag: "Delete" }],
	["CONNECT", { tag: "Connect" }],
	["OPTIONS", { tag: "Options" }],
	["TRACE", { tag: "Trace" }],
	["PATCH", { tag: "Patch" }]
]);
function fetch(url, init = {}) {
	const method = methods.get(init.method?.toUpperCase() ?? "GET") ?? {
		tag: "Extension",
		value: init.method
	};
	const headers = { entries: headersToList(new Headers(init.headers)).flatMap(([k, v]) => Array.isArray(v) ? v.map((v2) => [k, v2]) : [[k, v]]).map(([name, value]) => ({
		name,
		value: textEncoder.encode(value)
	})) };
	const uri = "" + url;
	const request = freeze2({
		method,
		headers,
		timeout: init.timeout,
		uri,
		version: { tag: "Http11" }
	});
	const requestBuf = new BinaryWriter(requestBaseSize);
	HttpRequest.serialize(requestBuf, request);
	const body = init.body == null ? new Uint8Array() : typeof init.body === "string" ? init.body : new Uint8Array(init.body);
	const [responseBuf, responseBody] = sys.procedure_http_request(requestBuf.getBuffer(), body);
	const response = HttpResponse.deserialize(new BinaryReader(responseBuf));
	return SyncResponse[makeResponse](responseBody, {
		type: "basic",
		url: uri,
		status: response.code,
		statusText: (0, import_statuses.default)(response.code),
		headers: new Headers(),
		aborted: false
	});
}
freeze2(fetch);
var httpClient = freeze2({ fetch });
function makeProcedureExport(ctx, opts, params, ret, fn) {
	const name = opts?.name;
	const procedureExport = (...args) => fn(...args);
	procedureExport[exportContext] = ctx;
	procedureExport[registerExport] = (ctx2, exportName) => {
		registerProcedure(ctx2, name ?? exportName, params, ret, fn);
		ctx2.functionExports.set(procedureExport, name ?? exportName);
	};
	return procedureExport;
}
var TransactionCtxImpl = class TransactionCtx extends ReducerCtxImpl {};
function registerProcedure(ctx, exportName, params, ret, fn, opts) {
	ctx.defineFunction(exportName);
	const paramsType = { elements: Object.entries(params).map(([n, c]) => ({
		name: n,
		algebraicType: ctx.registerTypesRecursively("typeBuilder" in c ? c.typeBuilder : c).algebraicType
	})) };
	const returnType = ctx.registerTypesRecursively(ret).algebraicType;
	ctx.moduleDef.procedures.push({
		sourceName: exportName,
		params: paramsType,
		returnType,
		visibility: FunctionVisibility.ClientCallable
	});
	const { typespace } = ctx;
	ctx.procedures.push({
		fn,
		deserializeArgs: ProductType.makeDeserializer(paramsType, typespace),
		serializeReturn: AlgebraicType.makeSerializer(returnType, typespace),
		returnTypeBaseSize: bsatnBaseSize(typespace, returnType)
	});
}
function callProcedure(moduleCtx, id, sender, connectionId, timestamp, argsBuf, dbView) {
	const { fn, deserializeArgs, serializeReturn, returnTypeBaseSize } = moduleCtx.procedures[id];
	const args = deserializeArgs(new BinaryReader(argsBuf));
	const ret = callUserFunction(fn, new ProcedureCtxImpl(sender, timestamp, connectionId, dbView), args);
	const retBuf = new BinaryWriter(returnTypeBaseSize);
	serializeReturn(retBuf, ret);
	return retBuf.getBuffer();
}
var ProcedureCtxImpl = class ProcedureCtx {
	constructor(sender, timestamp, connectionId, dbView) {
		this.sender = sender;
		this.timestamp = timestamp;
		this.connectionId = connectionId;
		this.#dbView = dbView;
	}
	#identity;
	#uuidCounter;
	#random;
	#dbView;
	get identity() {
		return this.#identity ??= new Identity(sys.identity());
	}
	get random() {
		return this.#random ??= makeRandom(this.timestamp);
	}
	get http() {
		return httpClient;
	}
	withTx(body) {
		const run = () => {
			const timestamp = sys.procedure_start_mut_tx();
			try {
				return body(new TransactionCtxImpl(this.sender, new Timestamp(timestamp), this.connectionId, this.#dbView()));
			} catch (e) {
				sys.procedure_abort_mut_tx();
				throw e;
			}
		};
		let res = run();
		try {
			sys.procedure_commit_mut_tx();
			return res;
		} catch {}
		console.warn("committing anonymous transaction failed");
		res = run();
		try {
			sys.procedure_commit_mut_tx();
			return res;
		} catch (e) {
			throw new Error("transaction retry failed again", { cause: e });
		}
	}
	newUuidV4() {
		const bytes = this.random.fill(new Uint8Array(16));
		return Uuid.fromRandomBytesV4(bytes);
	}
	newUuidV7() {
		const bytes = this.random.fill(new Uint8Array(4));
		const counter = this.#uuidCounter ??= { value: 0 };
		return Uuid.fromCounterV7(counter, this.timestamp, bytes);
	}
};
function makeReducerExport(ctx, opts, params, fn, lifecycle) {
	const reducerExport = (...args) => fn(...args);
	reducerExport[exportContext] = ctx;
	reducerExport[registerExport] = (ctx2, exportName) => {
		registerReducer(ctx2, exportName, params, fn, opts, lifecycle);
		ctx2.functionExports.set(reducerExport, exportName);
	};
	return reducerExport;
}
function registerReducer(ctx, exportName, params, fn, opts, lifecycle) {
	ctx.defineFunction(exportName);
	if (!(params instanceof RowBuilder)) params = new RowBuilder(params);
	if (params.typeName === void 0) params.typeName = toPascalCase(exportName);
	const ref = ctx.registerTypesRecursively(params);
	const paramsType = ctx.resolveType(ref).value;
	const isLifecycle = lifecycle != null;
	ctx.moduleDef.reducers.push({
		sourceName: exportName,
		params: paramsType,
		visibility: FunctionVisibility.ClientCallable,
		okReturnType: AlgebraicType.Product({ elements: [] }),
		errReturnType: AlgebraicType.String
	});
	if (opts?.name != null) ctx.moduleDef.explicitNames.entries.push({
		tag: "Function",
		value: {
			sourceName: exportName,
			canonicalName: opts.name
		}
	});
	if (isLifecycle) ctx.moduleDef.lifeCycleReducers.push({
		lifecycleSpec: lifecycle,
		functionName: exportName
	});
	if (!fn.name) Object.defineProperty(fn, "name", {
		value: exportName,
		writable: false
	});
	ctx.reducers.push(fn);
}
var SchemaInner = class extends ModuleContext {
	schemaType;
	existingFunctions = /* @__PURE__ */ new Set();
	reducers = [];
	procedures = [];
	views = [];
	anonViews = [];
	/**
	* Maps ReducerExport objects to the name of the reducer.
	* Used for resolving the reducers of scheduled tables.
	*/
	functionExports = /* @__PURE__ */ new Map();
	pendingSchedules = [];
	constructor(getSchemaType) {
		super();
		this.schemaType = getSchemaType(this);
	}
	defineFunction(name) {
		if (this.existingFunctions.has(name)) throw new TypeError(`There is already a reducer or procedure with the name '${name}'`);
		this.existingFunctions.add(name);
	}
	resolveSchedules() {
		for (const { reducer, scheduleAtCol, tableName } of this.pendingSchedules) {
			const functionName = this.functionExports.get(reducer());
			if (functionName === void 0) {
				const msg = `Table ${tableName} defines a schedule, but it seems like the associated function was not exported.`;
				throw new TypeError(msg);
			}
			this.moduleDef.schedules.push({
				sourceName: void 0,
				tableName,
				scheduleAtCol,
				functionName
			});
		}
	}
};
var Schema = class {
	#ctx;
	constructor(ctx) {
		this.#ctx = ctx;
	}
	[moduleHooks](exports) {
		const registeredSchema = this.#ctx;
		for (const [name, moduleExport] of Object.entries(exports)) {
			if (name === "default") continue;
			if (!isModuleExport(moduleExport)) throw new TypeError("exporting something that is not a spacetime export");
			checkExportContext(moduleExport, registeredSchema);
			moduleExport[registerExport](registeredSchema, name);
		}
		registeredSchema.resolveSchedules();
		return makeHooks(registeredSchema);
	}
	get schemaType() {
		return this.#ctx.schemaType;
	}
	get moduleDef() {
		return this.#ctx.moduleDef;
	}
	get typespace() {
		return this.#ctx.typespace;
	}
	reducer(...args) {
		let opts, params = {}, fn;
		switch (args.length) {
			case 1:
				[fn] = args;
				break;
			case 2: {
				let arg1;
				[arg1, fn] = args;
				if (typeof arg1.name === "string") opts = arg1;
				else params = arg1;
				break;
			}
			case 3:
				[opts, params, fn] = args;
				break;
		}
		return makeReducerExport(this.#ctx, opts, params, fn);
	}
	init(...args) {
		let opts, fn;
		switch (args.length) {
			case 1:
				[fn] = args;
				break;
			case 2:
				[opts, fn] = args;
				break;
		}
		return makeReducerExport(this.#ctx, opts, {}, fn, Lifecycle.Init);
	}
	clientConnected(...args) {
		let opts, fn;
		switch (args.length) {
			case 1:
				[fn] = args;
				break;
			case 2:
				[opts, fn] = args;
				break;
		}
		return makeReducerExport(this.#ctx, opts, {}, fn, Lifecycle.OnConnect);
	}
	clientDisconnected(...args) {
		let opts, fn;
		switch (args.length) {
			case 1:
				[fn] = args;
				break;
			case 2:
				[opts, fn] = args;
				break;
		}
		return makeReducerExport(this.#ctx, opts, {}, fn, Lifecycle.OnDisconnect);
	}
	view(opts, ret, fn) {
		return makeViewExport(this.#ctx, opts, {}, ret, fn);
	}
	anonymousView(opts, ret, fn) {
		return makeAnonViewExport(this.#ctx, opts, {}, ret, fn);
	}
	procedure(...args) {
		let opts, params = {}, ret, fn;
		switch (args.length) {
			case 2:
				[ret, fn] = args;
				break;
			case 3: {
				let arg1;
				[arg1, ret, fn] = args;
				if (typeof arg1.name === "string") opts = arg1;
				else params = arg1;
				break;
			}
			case 4:
				[opts, params, ret, fn] = args;
				break;
		}
		return makeProcedureExport(this.#ctx, opts, params, ret, fn);
	}
	/**
	* Bundle multiple reducers, procedures, etc into one value to export.
	* The name they will be exported with is their corresponding key in the `exports` argument.
	*/
	exportGroup(exports) {
		return {
			[exportContext]: this.#ctx,
			[registerExport](ctx, _exportName) {
				for (const [exportName, moduleExport] of Object.entries(exports)) {
					checkExportContext(moduleExport, ctx);
					moduleExport[registerExport](ctx, exportName);
				}
			}
		};
	}
	clientVisibilityFilter = { sql: (filter) => ({
		[exportContext]: this.#ctx,
		[registerExport](ctx, _exportName) {
			ctx.moduleDef.rowLevelSecurity.push({ sql: filter });
		}
	}) };
};
var registerExport = Symbol("SpacetimeDB.registerExport");
var exportContext = Symbol("SpacetimeDB.exportContext");
function isModuleExport(x) {
	return (typeof x === "function" || typeof x === "object") && x !== null && registerExport in x;
}
function checkExportContext(exp, schema2) {
	if (exp[exportContext] != null && exp[exportContext] !== schema2) throw new TypeError("multiple schemas are not supported");
}
function schema(tables, moduleSettings) {
	return new Schema(new SchemaInner((ctx2) => {
		if (moduleSettings?.CASE_CONVERSION_POLICY != null) ctx2.setCaseConversionPolicy(moduleSettings.CASE_CONVERSION_POLICY);
		const tableSchemas = {};
		for (const [accName, table2] of Object.entries(tables)) {
			const tableDef = table2.tableDef(ctx2, accName);
			tableSchemas[accName] = tableToSchema(accName, table2, tableDef);
			ctx2.moduleDef.tables.push(tableDef);
			if (table2.schedule) ctx2.pendingSchedules.push({
				...table2.schedule,
				tableName: tableDef.sourceName
			});
			if (table2.tableName) ctx2.moduleDef.explicitNames.entries.push({
				tag: "Table",
				value: {
					sourceName: accName,
					canonicalName: table2.tableName
				}
			});
		}
		return { tables: tableSchemas };
	}));
}
var import_object_inspect = __toESM(require_object_inspect());
var fmtLog = (...data) => data.map((x) => typeof x === "string" ? x : (0, import_object_inspect.default)(x)).join(" ");
var console_level_error = 0;
var console_level_warn = 1;
var console_level_info = 2;
var console_level_debug = 3;
var console_level_trace = 4;
var timerMap = /* @__PURE__ */ new Map();
var console2 = {
	__proto__: {},
	[Symbol.toStringTag]: "console",
	assert: (condition = false, ...data) => {
		if (!condition) sys.console_log(console_level_error, fmtLog(...data));
	},
	clear: () => {},
	debug: (...data) => {
		sys.console_log(console_level_debug, fmtLog(...data));
	},
	error: (...data) => {
		sys.console_log(console_level_error, fmtLog(...data));
	},
	info: (...data) => {
		sys.console_log(console_level_info, fmtLog(...data));
	},
	log: (...data) => {
		sys.console_log(console_level_info, fmtLog(...data));
	},
	table: (tabularData, _properties) => {
		sys.console_log(console_level_info, fmtLog(tabularData));
	},
	trace: (...data) => {
		sys.console_log(console_level_trace, fmtLog(...data));
	},
	warn: (...data) => {
		sys.console_log(console_level_warn, fmtLog(...data));
	},
	dir: (_item, _options) => {},
	dirxml: (..._data) => {},
	count: (_label = "default") => {},
	countReset: (_label = "default") => {},
	group: (..._data) => {},
	groupCollapsed: (..._data) => {},
	groupEnd: () => {},
	time: (label = "default") => {
		if (timerMap.has(label)) {
			sys.console_log(console_level_warn, `Timer '${label}' already exists.`);
			return;
		}
		timerMap.set(label, sys.console_timer_start(label));
	},
	timeLog: (label = "default", ...data) => {
		sys.console_log(console_level_info, fmtLog(label, ...data));
	},
	timeEnd: (label = "default") => {
		const spanId = timerMap.get(label);
		if (spanId === void 0) {
			sys.console_log(console_level_warn, `Timer '${label}' does not exist.`);
			return;
		}
		sys.console_timer_end(spanId);
		timerMap.delete(label);
	},
	timeStamp: () => {},
	profile: () => {},
	profileEnd: () => {}
};
globalThis.console = console2;

//#endregion
//#region C:/Users/jorne/Documents/projects/gruppe/demo/spacetimedb/src/schemas.ts
const spacetimedb = schema({
	person: table({ public: true }, { name: t.string() }),
	user: table({ public: true }, {
		identity: t.identity().primaryKey(),
		clerkId: t.string(),
		name: t.string().optional(),
		createdAt: t.timestamp()
	})
});

//#endregion
//#region C:/Users/jorne/Documents/projects/gruppe/demo/spacetimedb/src/index.ts
const init = spacetimedb.init((_ctx) => {});
const onConnect = spacetimedb.clientConnected((ctx) => {
	const jwt = ctx.senderAuth.jwt;
	if (jwt == null) throw new SenderError("Unauthorized: JWT is required to connect");
	if (!jwt.issuer.startsWith("https://clerk.")) throw new SenderError(`Unauthorized: unexpected issuer ${jwt.issuer}`);
	if (!ctx.db.user.identity.find(ctx.sender)) ctx.db.user.insert({
		identity: ctx.sender,
		clerkId: jwt.subject,
		name: void 0,
		createdAt: ctx.timestamp
	});
});
const onDisconnect = spacetimedb.clientDisconnected((_ctx) => {});
const add = spacetimedb.reducer({ name: t.string() }, (ctx, { name }) => {
	ctx.db.person.insert({ name });
});
const set_user_profile = spacetimedb.reducer({ name: t.string() }, (ctx, { name }) => {
	const existing = ctx.db.user.identity.find(ctx.sender);
	if (!existing) throw new SenderError("User not found");
	ctx.db.user.identity.update({
		...existing,
		name
	});
});
const sayHello = spacetimedb.reducer((ctx) => {
	for (const person of ctx.db.person.iter()) console.info(`Hello, ${person.name}!`);
	console.info("Hello, World!");
});
var src_default = spacetimedb;

//#endregion
export { add, src_default as default, init, onConnect, onDisconnect, sayHello, set_user_profile };
//# debugId=d771ebc2-82e2-4ace-85e0-7ceaa1e63be3
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibmFtZXMiOlsiX19jcmVhdGUiLCJfX2RlZlByb3AiLCJfX2dldE93blByb3BEZXNjIiwiX19nZXRPd25Qcm9wTmFtZXMiLCJfX2dldFByb3RvT2YiLCJfX2hhc093blByb3AiLCJfX2NvbW1vbkpTIiwiX19jb3B5UHJvcHMiLCJfX3RvRVNNIiwiI2Vuc3VyZSIsIiNtb2R1bGVEZWYiLCIjcmVnaXN0ZXJDb21wb3VuZFR5cGVSZWN1cnNpdmVseSIsIiNjb21wb3VuZFR5cGVzIiwiI2Zyb20iLCIjdG8iLCIjdXVpZENvdW50ZXIiLCIjc2VuZGVyQXV0aCIsIiNpZGVudGl0eSIsIiNyYW5kb20iLCIjc2NoZW1hIiwiI3JlZHVjZXJBcmdzRGVzZXJpYWxpemVycyIsIiNkYlZpZXciLCIjZGJWaWV3XyIsIiNyZWR1Y2VyQ3R4IiwiI3JlZHVjZXJDdHhfIiwiI2ZpbmFsaXphdGlvblJlZ2lzdHJ5IiwiI2lkIiwiI2RldGFjaCIsIiNib2R5IiwiI2lubmVyIiwiI2N0eCJdLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2pvcm5lL0RvY3VtZW50cy9wcm9qZWN0cy9ncnVwcGUvZGVtby9zcGFjZXRpbWVkYi9ub2RlX21vZHVsZXMvLnBucG0vaGVhZGVycy1wb2x5ZmlsbEA0LjAuMy9ub2RlX21vZHVsZXMvaGVhZGVycy1wb2x5ZmlsbC9saWIvaW5kZXgubWpzIiwiQzovVXNlcnMvam9ybmUvRG9jdW1lbnRzL3Byb2plY3RzL2dydXBwZS9kZW1vL3NwYWNldGltZWRiL25vZGVfbW9kdWxlcy8ucG5wbS9zcGFjZXRpbWVkYkAyLjAuMS9ub2RlX21vZHVsZXMvc3BhY2V0aW1lZGIvZGlzdC9zZXJ2ZXIvaW5kZXgubWpzIiwiQzovVXNlcnMvam9ybmUvRG9jdW1lbnRzL3Byb2plY3RzL2dydXBwZS9kZW1vL3NwYWNldGltZWRiL3NyYy9zY2hlbWFzLnRzIiwiQzovVXNlcnMvam9ybmUvRG9jdW1lbnRzL3Byb2plY3RzL2dydXBwZS9kZW1vL3NwYWNldGltZWRiL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19jcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2dldE93blByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfX2dldE93blByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIF9fZ2V0UHJvdG9PZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbnZhciBfX2hhc093blByb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIF9fY29tbW9uSlMgPSAoY2IsIG1vZCkgPT4gZnVuY3Rpb24gX19yZXF1aXJlKCkge1xuICByZXR1cm4gbW9kIHx8ICgwLCBjYltfX2dldE93blByb3BOYW1lcyhjYilbMF1dKSgobW9kID0geyBleHBvcnRzOiB7fSB9KS5leHBvcnRzLCBtb2QpLCBtb2QuZXhwb3J0cztcbn07XG52YXIgX19jb3B5UHJvcHMgPSAodG8sIGZyb20sIGV4Y2VwdCwgZGVzYykgPT4ge1xuICBpZiAoZnJvbSAmJiB0eXBlb2YgZnJvbSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgZnJvbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZm9yIChsZXQga2V5IG9mIF9fZ2V0T3duUHJvcE5hbWVzKGZyb20pKVxuICAgICAgaWYgKCFfX2hhc093blByb3AuY2FsbCh0bywga2V5KSAmJiBrZXkgIT09IGV4Y2VwdClcbiAgICAgICAgX19kZWZQcm9wKHRvLCBrZXksIHsgZ2V0OiAoKSA9PiBmcm9tW2tleV0sIGVudW1lcmFibGU6ICEoZGVzYyA9IF9fZ2V0T3duUHJvcERlc2MoZnJvbSwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICB9XG4gIHJldHVybiB0bztcbn07XG52YXIgX190b0VTTSA9IChtb2QsIGlzTm9kZU1vZGUsIHRhcmdldCkgPT4gKHRhcmdldCA9IG1vZCAhPSBudWxsID8gX19jcmVhdGUoX19nZXRQcm90b09mKG1vZCkpIDoge30sIF9fY29weVByb3BzKFxuICAvLyBJZiB0aGUgaW1wb3J0ZXIgaXMgaW4gbm9kZSBjb21wYXRpYmlsaXR5IG1vZGUgb3IgdGhpcyBpcyBub3QgYW4gRVNNXG4gIC8vIGZpbGUgdGhhdCBoYXMgYmVlbiBjb252ZXJ0ZWQgdG8gYSBDb21tb25KUyBmaWxlIHVzaW5nIGEgQmFiZWwtXG4gIC8vIGNvbXBhdGlibGUgdHJhbnNmb3JtIChpLmUuIFwiX19lc01vZHVsZVwiIGhhcyBub3QgYmVlbiBzZXQpLCB0aGVuIHNldFxuICAvLyBcImRlZmF1bHRcIiB0byB0aGUgQ29tbW9uSlMgXCJtb2R1bGUuZXhwb3J0c1wiIGZvciBub2RlIGNvbXBhdGliaWxpdHkuXG4gIGlzTm9kZU1vZGUgfHwgIW1vZCB8fCAhbW9kLl9fZXNNb2R1bGUgPyBfX2RlZlByb3AodGFyZ2V0LCBcImRlZmF1bHRcIiwgeyB2YWx1ZTogbW9kLCBlbnVtZXJhYmxlOiB0cnVlIH0pIDogdGFyZ2V0LFxuICBtb2RcbikpO1xuXG4vLyBub2RlX21vZHVsZXMvc2V0LWNvb2tpZS1wYXJzZXIvbGliL3NldC1jb29raWUuanNcbnZhciByZXF1aXJlX3NldF9jb29raWUgPSBfX2NvbW1vbkpTKHtcbiAgXCJub2RlX21vZHVsZXMvc2V0LWNvb2tpZS1wYXJzZXIvbGliL3NldC1jb29raWUuanNcIihleHBvcnRzLCBtb2R1bGUpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgZGVmYXVsdFBhcnNlT3B0aW9ucyA9IHtcbiAgICAgIGRlY29kZVZhbHVlczogdHJ1ZSxcbiAgICAgIG1hcDogZmFsc2UsXG4gICAgICBzaWxlbnQ6IGZhbHNlXG4gICAgfTtcbiAgICBmdW5jdGlvbiBpc05vbkVtcHR5U3RyaW5nKHN0cikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBzdHIgPT09IFwic3RyaW5nXCIgJiYgISFzdHIudHJpbSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZVN0cmluZyhzZXRDb29raWVWYWx1ZSwgb3B0aW9ucykge1xuICAgICAgdmFyIHBhcnRzID0gc2V0Q29va2llVmFsdWUuc3BsaXQoXCI7XCIpLmZpbHRlcihpc05vbkVtcHR5U3RyaW5nKTtcbiAgICAgIHZhciBuYW1lVmFsdWVQYWlyU3RyID0gcGFydHMuc2hpZnQoKTtcbiAgICAgIHZhciBwYXJzZWQgPSBwYXJzZU5hbWVWYWx1ZVBhaXIobmFtZVZhbHVlUGFpclN0cik7XG4gICAgICB2YXIgbmFtZSA9IHBhcnNlZC5uYW1lO1xuICAgICAgdmFyIHZhbHVlID0gcGFyc2VkLnZhbHVlO1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgPyBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0UGFyc2VPcHRpb25zLCBvcHRpb25zKSA6IGRlZmF1bHRQYXJzZU9wdGlvbnM7XG4gICAgICB0cnkge1xuICAgICAgICB2YWx1ZSA9IG9wdGlvbnMuZGVjb2RlVmFsdWVzID8gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSA6IHZhbHVlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIFwic2V0LWNvb2tpZS1wYXJzZXIgZW5jb3VudGVyZWQgYW4gZXJyb3Igd2hpbGUgZGVjb2RpbmcgYSBjb29raWUgd2l0aCB2YWx1ZSAnXCIgKyB2YWx1ZSArIFwiJy4gU2V0IG9wdGlvbnMuZGVjb2RlVmFsdWVzIHRvIGZhbHNlIHRvIGRpc2FibGUgdGhpcyBmZWF0dXJlLlwiLFxuICAgICAgICAgIGVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHZhciBjb29raWUgPSB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIHZhbHVlXG4gICAgICB9O1xuICAgICAgcGFydHMuZm9yRWFjaChmdW5jdGlvbihwYXJ0KSB7XG4gICAgICAgIHZhciBzaWRlcyA9IHBhcnQuc3BsaXQoXCI9XCIpO1xuICAgICAgICB2YXIga2V5ID0gc2lkZXMuc2hpZnQoKS50cmltTGVmdCgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciB2YWx1ZTIgPSBzaWRlcy5qb2luKFwiPVwiKTtcbiAgICAgICAgaWYgKGtleSA9PT0gXCJleHBpcmVzXCIpIHtcbiAgICAgICAgICBjb29raWUuZXhwaXJlcyA9IG5ldyBEYXRlKHZhbHVlMik7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm1heC1hZ2VcIikge1xuICAgICAgICAgIGNvb2tpZS5tYXhBZ2UgPSBwYXJzZUludCh2YWx1ZTIsIDEwKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwic2VjdXJlXCIpIHtcbiAgICAgICAgICBjb29raWUuc2VjdXJlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwiaHR0cG9ubHlcIikge1xuICAgICAgICAgIGNvb2tpZS5odHRwT25seSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcInNhbWVzaXRlXCIpIHtcbiAgICAgICAgICBjb29raWUuc2FtZVNpdGUgPSB2YWx1ZTI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29va2llW2tleV0gPSB2YWx1ZTI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNvb2tpZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VOYW1lVmFsdWVQYWlyKG5hbWVWYWx1ZVBhaXJTdHIpIHtcbiAgICAgIHZhciBuYW1lID0gXCJcIjtcbiAgICAgIHZhciB2YWx1ZSA9IFwiXCI7XG4gICAgICB2YXIgbmFtZVZhbHVlQXJyID0gbmFtZVZhbHVlUGFpclN0ci5zcGxpdChcIj1cIik7XG4gICAgICBpZiAobmFtZVZhbHVlQXJyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgbmFtZSA9IG5hbWVWYWx1ZUFyci5zaGlmdCgpO1xuICAgICAgICB2YWx1ZSA9IG5hbWVWYWx1ZUFyci5qb2luKFwiPVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gbmFtZVZhbHVlUGFpclN0cjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IG5hbWUsIHZhbHVlIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlKGlucHV0LCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyA/IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRQYXJzZU9wdGlvbnMsIG9wdGlvbnMpIDogZGVmYXVsdFBhcnNlT3B0aW9ucztcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLm1hcCkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpbnB1dC5oZWFkZXJzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQuaGVhZGVycy5nZXRTZXRDb29raWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGlucHV0ID0gaW5wdXQuaGVhZGVycy5nZXRTZXRDb29raWUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5oZWFkZXJzW1wic2V0LWNvb2tpZVwiXSkge1xuICAgICAgICAgIGlucHV0ID0gaW5wdXQuaGVhZGVyc1tcInNldC1jb29raWVcIl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHNjaCA9IGlucHV0LmhlYWRlcnNbT2JqZWN0LmtleXMoaW5wdXQuaGVhZGVycykuZmluZChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJzZXQtY29va2llXCI7XG4gICAgICAgICAgfSldO1xuICAgICAgICAgIGlmICghc2NoICYmIGlucHV0LmhlYWRlcnMuY29va2llICYmICFvcHRpb25zLnNpbGVudCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBcIldhcm5pbmc6IHNldC1jb29raWUtcGFyc2VyIGFwcGVhcnMgdG8gaGF2ZSBiZWVuIGNhbGxlZCBvbiBhIHJlcXVlc3Qgb2JqZWN0LiBJdCBpcyBkZXNpZ25lZCB0byBwYXJzZSBTZXQtQ29va2llIGhlYWRlcnMgZnJvbSByZXNwb25zZXMsIG5vdCBDb29raWUgaGVhZGVycyBmcm9tIHJlcXVlc3RzLiBTZXQgdGhlIG9wdGlvbiB7c2lsZW50OiB0cnVlfSB0byBzdXBwcmVzcyB0aGlzIHdhcm5pbmcuXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlucHV0ID0gc2NoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICAgIGlucHV0ID0gW2lucHV0XTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zID8gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFBhcnNlT3B0aW9ucywgb3B0aW9ucykgOiBkZWZhdWx0UGFyc2VPcHRpb25zO1xuICAgICAgaWYgKCFvcHRpb25zLm1hcCkge1xuICAgICAgICByZXR1cm4gaW5wdXQuZmlsdGVyKGlzTm9uRW1wdHlTdHJpbmcpLm1hcChmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VTdHJpbmcoc3RyLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY29va2llcyA9IHt9O1xuICAgICAgICByZXR1cm4gaW5wdXQuZmlsdGVyKGlzTm9uRW1wdHlTdHJpbmcpLnJlZHVjZShmdW5jdGlvbihjb29raWVzMiwgc3RyKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IHBhcnNlU3RyaW5nKHN0ciwgb3B0aW9ucyk7XG4gICAgICAgICAgY29va2llczJbY29va2llLm5hbWVdID0gY29va2llO1xuICAgICAgICAgIHJldHVybiBjb29raWVzMjtcbiAgICAgICAgfSwgY29va2llcyk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNwbGl0Q29va2llc1N0cmluZzIoY29va2llc1N0cmluZykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29va2llc1N0cmluZykpIHtcbiAgICAgICAgcmV0dXJuIGNvb2tpZXNTdHJpbmc7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGNvb2tpZXNTdHJpbmcgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgdmFyIGNvb2tpZXNTdHJpbmdzID0gW107XG4gICAgICB2YXIgcG9zID0gMDtcbiAgICAgIHZhciBzdGFydDtcbiAgICAgIHZhciBjaDtcbiAgICAgIHZhciBsYXN0Q29tbWE7XG4gICAgICB2YXIgbmV4dFN0YXJ0O1xuICAgICAgdmFyIGNvb2tpZXNTZXBhcmF0b3JGb3VuZDtcbiAgICAgIGZ1bmN0aW9uIHNraXBXaGl0ZXNwYWNlKCkge1xuICAgICAgICB3aGlsZSAocG9zIDwgY29va2llc1N0cmluZy5sZW5ndGggJiYgL1xccy8udGVzdChjb29raWVzU3RyaW5nLmNoYXJBdChwb3MpKSkge1xuICAgICAgICAgIHBvcyArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb3MgPCBjb29raWVzU3RyaW5nLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG5vdFNwZWNpYWxDaGFyKCkge1xuICAgICAgICBjaCA9IGNvb2tpZXNTdHJpbmcuY2hhckF0KHBvcyk7XG4gICAgICAgIHJldHVybiBjaCAhPT0gXCI9XCIgJiYgY2ggIT09IFwiO1wiICYmIGNoICE9PSBcIixcIjtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChwb3MgPCBjb29raWVzU3RyaW5nLmxlbmd0aCkge1xuICAgICAgICBzdGFydCA9IHBvcztcbiAgICAgICAgY29va2llc1NlcGFyYXRvckZvdW5kID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChza2lwV2hpdGVzcGFjZSgpKSB7XG4gICAgICAgICAgY2ggPSBjb29raWVzU3RyaW5nLmNoYXJBdChwb3MpO1xuICAgICAgICAgIGlmIChjaCA9PT0gXCIsXCIpIHtcbiAgICAgICAgICAgIGxhc3RDb21tYSA9IHBvcztcbiAgICAgICAgICAgIHBvcyArPSAxO1xuICAgICAgICAgICAgc2tpcFdoaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIG5leHRTdGFydCA9IHBvcztcbiAgICAgICAgICAgIHdoaWxlIChwb3MgPCBjb29raWVzU3RyaW5nLmxlbmd0aCAmJiBub3RTcGVjaWFsQ2hhcigpKSB7XG4gICAgICAgICAgICAgIHBvcyArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBvcyA8IGNvb2tpZXNTdHJpbmcubGVuZ3RoICYmIGNvb2tpZXNTdHJpbmcuY2hhckF0KHBvcykgPT09IFwiPVwiKSB7XG4gICAgICAgICAgICAgIGNvb2tpZXNTZXBhcmF0b3JGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgIHBvcyA9IG5leHRTdGFydDtcbiAgICAgICAgICAgICAgY29va2llc1N0cmluZ3MucHVzaChjb29raWVzU3RyaW5nLnN1YnN0cmluZyhzdGFydCwgbGFzdENvbW1hKSk7XG4gICAgICAgICAgICAgIHN0YXJ0ID0gcG9zO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcG9zID0gbGFzdENvbW1hICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9zICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY29va2llc1NlcGFyYXRvckZvdW5kIHx8IHBvcyA+PSBjb29raWVzU3RyaW5nLmxlbmd0aCkge1xuICAgICAgICAgIGNvb2tpZXNTdHJpbmdzLnB1c2goY29va2llc1N0cmluZy5zdWJzdHJpbmcoc3RhcnQsIGNvb2tpZXNTdHJpbmcubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjb29raWVzU3RyaW5ncztcbiAgICB9XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBwYXJzZTtcbiAgICBtb2R1bGUuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuICAgIG1vZHVsZS5leHBvcnRzLnBhcnNlU3RyaW5nID0gcGFyc2VTdHJpbmc7XG4gICAgbW9kdWxlLmV4cG9ydHMuc3BsaXRDb29raWVzU3RyaW5nID0gc3BsaXRDb29raWVzU3RyaW5nMjtcbiAgfVxufSk7XG5cbi8vIHNyYy9IZWFkZXJzLnRzXG52YXIgaW1wb3J0X3NldF9jb29raWVfcGFyc2VyID0gX190b0VTTShyZXF1aXJlX3NldF9jb29raWUoKSk7XG5cbi8vIHNyYy91dGlscy9ub3JtYWxpemVIZWFkZXJOYW1lLnRzXG52YXIgSEVBREVSU19JTlZBTElEX0NIQVJBQ1RFUlMgPSAvW15hLXowLTlcXC0jJCUmJyorLl5fYHx+XS9pO1xuZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShuYW1lKSB7XG4gIGlmIChIRUFERVJTX0lOVkFMSURfQ0hBUkFDVEVSUy50ZXN0KG5hbWUpIHx8IG5hbWUudHJpbSgpID09PSBcIlwiKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lXCIpO1xuICB9XG4gIHJldHVybiBuYW1lLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufVxuXG4vLyBzcmMvdXRpbHMvbm9ybWFsaXplSGVhZGVyVmFsdWUudHNcbnZhciBjaGFyQ29kZXNUb1JlbW92ZSA9IFtcbiAgU3RyaW5nLmZyb21DaGFyQ29kZSgxMCksXG4gIFN0cmluZy5mcm9tQ2hhckNvZGUoMTMpLFxuICBTdHJpbmcuZnJvbUNoYXJDb2RlKDkpLFxuICBTdHJpbmcuZnJvbUNoYXJDb2RlKDMyKVxuXTtcbnZhciBIRUFERVJfVkFMVUVfUkVNT1ZFX1JFR0VYUCA9IG5ldyBSZWdFeHAoXG4gIGAoXlske2NoYXJDb2Rlc1RvUmVtb3ZlLmpvaW4oXCJcIil9XXwkWyR7Y2hhckNvZGVzVG9SZW1vdmUuam9pbihcIlwiKX1dKWAsXG4gIFwiZ1wiXG4pO1xuZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyVmFsdWUodmFsdWUpIHtcbiAgY29uc3QgbmV4dFZhbHVlID0gdmFsdWUucmVwbGFjZShIRUFERVJfVkFMVUVfUkVNT1ZFX1JFR0VYUCwgXCJcIik7XG4gIHJldHVybiBuZXh0VmFsdWU7XG59XG5cbi8vIHNyYy91dGlscy9pc1ZhbGlkSGVhZGVyTmFtZS50c1xuZnVuY3Rpb24gaXNWYWxpZEhlYWRlck5hbWUodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyYWN0ZXIgPSB2YWx1ZS5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjaGFyYWN0ZXIgPiAxMjcgfHwgIWlzVG9rZW4oY2hhcmFjdGVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGlzVG9rZW4odmFsdWUpIHtcbiAgcmV0dXJuICFbXG4gICAgMTI3LFxuICAgIDMyLFxuICAgIFwiKFwiLFxuICAgIFwiKVwiLFxuICAgIFwiPFwiLFxuICAgIFwiPlwiLFxuICAgIFwiQFwiLFxuICAgIFwiLFwiLFxuICAgIFwiO1wiLFxuICAgIFwiOlwiLFxuICAgIFwiXFxcXFwiLFxuICAgICdcIicsXG4gICAgXCIvXCIsXG4gICAgXCJbXCIsXG4gICAgXCJdXCIsXG4gICAgXCI/XCIsXG4gICAgXCI9XCIsXG4gICAgXCJ7XCIsXG4gICAgXCJ9XCJcbiAgXS5pbmNsdWRlcyh2YWx1ZSk7XG59XG5cbi8vIHNyYy91dGlscy9pc1ZhbGlkSGVhZGVyVmFsdWUudHNcbmZ1bmN0aW9uIGlzVmFsaWRIZWFkZXJWYWx1ZSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh2YWx1ZS50cmltKCkgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyYWN0ZXIgPSB2YWx1ZS5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChcbiAgICAgIC8vIE5VTC5cbiAgICAgIGNoYXJhY3RlciA9PT0gMCB8fCAvLyBIVFRQIG5ld2xpbmUgYnl0ZXMuXG4gICAgICBjaGFyYWN0ZXIgPT09IDEwIHx8IGNoYXJhY3RlciA9PT0gMTNcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIHNyYy9IZWFkZXJzLnRzXG52YXIgTk9STUFMSVpFRF9IRUFERVJTID0gU3ltYm9sKFwibm9ybWFsaXplZEhlYWRlcnNcIik7XG52YXIgUkFXX0hFQURFUl9OQU1FUyA9IFN5bWJvbChcInJhd0hlYWRlck5hbWVzXCIpO1xudmFyIEhFQURFUl9WQUxVRV9ERUxJTUlURVIgPSBcIiwgXCI7XG52YXIgX2EsIF9iLCBfYztcbnZhciBIZWFkZXJzID0gY2xhc3MgX0hlYWRlcnMge1xuICBjb25zdHJ1Y3Rvcihpbml0KSB7XG4gICAgLy8gTm9ybWFsaXplZCBoZWFkZXIge1wibmFtZVwiOlwiYSwgYlwifSBzdG9yYWdlLlxuICAgIHRoaXNbX2FdID0ge307XG4gICAgLy8gS2VlcHMgdGhlIG1hcHBpbmcgYmV0d2VlbiB0aGUgcmF3IGhlYWRlciBuYW1lXG4gICAgLy8gYW5kIHRoZSBub3JtYWxpemVkIGhlYWRlciBuYW1lIHRvIGVhc2UgdGhlIGxvb2t1cC5cbiAgICB0aGlzW19iXSA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gICAgdGhpc1tfY10gPSBcIkhlYWRlcnNcIjtcbiAgICBpZiAoW1wiSGVhZGVyc1wiLCBcIkhlYWRlcnNQb2x5ZmlsbFwiXS5pbmNsdWRlcyhpbml0Py5jb25zdHJ1Y3Rvci5uYW1lKSB8fCBpbml0IGluc3RhbmNlb2YgX0hlYWRlcnMgfHwgdHlwZW9mIGdsb2JhbFRoaXMuSGVhZGVycyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpbml0IGluc3RhbmNlb2YgZ2xvYmFsVGhpcy5IZWFkZXJzKSB7XG4gICAgICBjb25zdCBpbml0aWFsSGVhZGVycyA9IGluaXQ7XG4gICAgICBpbml0aWFsSGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwgbmFtZSkgPT4ge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaW5pdCkpIHtcbiAgICAgIGluaXQuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT4ge1xuICAgICAgICB0aGlzLmFwcGVuZChcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbihIRUFERVJfVkFMVUVfREVMSU1JVEVSKSA6IHZhbHVlXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGluaXQpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGluaXQpLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBpbml0W25hbWVdO1xuICAgICAgICB0aGlzLmFwcGVuZChcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbihIRUFERVJfVkFMVUVfREVMSU1JVEVSKSA6IHZhbHVlXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgWyhfYSA9IE5PUk1BTElaRURfSEVBREVSUywgX2IgPSBSQVdfSEVBREVSX05BTUVTLCBfYyA9IFN5bWJvbC50b1N0cmluZ1RhZywgU3ltYm9sLml0ZXJhdG9yKV0oKSB7XG4gICAgcmV0dXJuIHRoaXMuZW50cmllcygpO1xuICB9XG4gICprZXlzKCkge1xuICAgIGZvciAoY29uc3QgW25hbWVdIG9mIHRoaXMuZW50cmllcygpKSB7XG4gICAgICB5aWVsZCBuYW1lO1xuICAgIH1cbiAgfVxuICAqdmFsdWVzKCkge1xuICAgIGZvciAoY29uc3QgWywgdmFsdWVdIG9mIHRoaXMuZW50cmllcygpKSB7XG4gICAgICB5aWVsZCB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgKmVudHJpZXMoKSB7XG4gICAgbGV0IHNvcnRlZEtleXMgPSBPYmplY3Qua2V5cyh0aGlzW05PUk1BTElaRURfSEVBREVSU10pLnNvcnQoXG4gICAgICAoYSwgYikgPT4gYS5sb2NhbGVDb21wYXJlKGIpXG4gICAgKTtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2Ygc29ydGVkS2V5cykge1xuICAgICAgaWYgKG5hbWUgPT09IFwic2V0LWNvb2tpZVwiKSB7XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdGhpcy5nZXRTZXRDb29raWUoKSkge1xuICAgICAgICAgIHlpZWxkIFtuYW1lLCB2YWx1ZV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHlpZWxkIFtuYW1lLCB0aGlzLmdldChuYW1lKV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYm9vbGVhbiBzdGF0aW5nIHdoZXRoZXIgYSBgSGVhZGVyc2Agb2JqZWN0IGNvbnRhaW5zIGEgY2VydGFpbiBoZWFkZXIuXG4gICAqL1xuICBoYXMobmFtZSkge1xuICAgIGlmICghaXNWYWxpZEhlYWRlck5hbWUobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgaGVhZGVyIG5hbWUgXCIke25hbWV9XCJgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNbTk9STUFMSVpFRF9IRUFERVJTXS5oYXNPd25Qcm9wZXJ0eShub3JtYWxpemVIZWFkZXJOYW1lKG5hbWUpKTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBhIGBCeXRlU3RyaW5nYCBzZXF1ZW5jZSBvZiBhbGwgdGhlIHZhbHVlcyBvZiBhIGhlYWRlciB3aXRoIGEgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIGdldChuYW1lKSB7XG4gICAgaWYgKCFpc1ZhbGlkSGVhZGVyTmFtZShuYW1lKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGBJbnZhbGlkIGhlYWRlciBuYW1lIFwiJHtuYW1lfVwiYCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzW05PUk1BTElaRURfSEVBREVSU11bbm9ybWFsaXplSGVhZGVyTmFtZShuYW1lKV0gPz8gbnVsbDtcbiAgfVxuICAvKipcbiAgICogU2V0cyBhIG5ldyB2YWx1ZSBmb3IgYW4gZXhpc3RpbmcgaGVhZGVyIGluc2lkZSBhIGBIZWFkZXJzYCBvYmplY3QsIG9yIGFkZHMgdGhlIGhlYWRlciBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0LlxuICAgKi9cbiAgc2V0KG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKCFpc1ZhbGlkSGVhZGVyTmFtZShuYW1lKSB8fCAhaXNWYWxpZEhlYWRlclZhbHVlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBub3JtYWxpemVkTmFtZSA9IG5vcm1hbGl6ZUhlYWRlck5hbWUobmFtZSk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFZhbHVlID0gbm9ybWFsaXplSGVhZGVyVmFsdWUodmFsdWUpO1xuICAgIHRoaXNbTk9STUFMSVpFRF9IRUFERVJTXVtub3JtYWxpemVkTmFtZV0gPSBub3JtYWxpemVIZWFkZXJWYWx1ZShub3JtYWxpemVkVmFsdWUpO1xuICAgIHRoaXNbUkFXX0hFQURFUl9OQU1FU10uc2V0KG5vcm1hbGl6ZWROYW1lLCBuYW1lKTtcbiAgfVxuICAvKipcbiAgICogQXBwZW5kcyBhIG5ldyB2YWx1ZSBvbnRvIGFuIGV4aXN0aW5nIGhlYWRlciBpbnNpZGUgYSBgSGVhZGVyc2Agb2JqZWN0LCBvciBhZGRzIHRoZSBoZWFkZXIgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdC5cbiAgICovXG4gIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuICAgIGlmICghaXNWYWxpZEhlYWRlck5hbWUobmFtZSkgfHwgIWlzVmFsaWRIZWFkZXJWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgbm9ybWFsaXplZE5hbWUgPSBub3JtYWxpemVIZWFkZXJOYW1lKG5hbWUpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRWYWx1ZSA9IG5vcm1hbGl6ZUhlYWRlclZhbHVlKHZhbHVlKTtcbiAgICBsZXQgcmVzb2x2ZWRWYWx1ZSA9IHRoaXMuaGFzKG5vcm1hbGl6ZWROYW1lKSA/IGAke3RoaXMuZ2V0KG5vcm1hbGl6ZWROYW1lKX0sICR7bm9ybWFsaXplZFZhbHVlfWAgOiBub3JtYWxpemVkVmFsdWU7XG4gICAgdGhpcy5zZXQobmFtZSwgcmVzb2x2ZWRWYWx1ZSk7XG4gIH1cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSBoZWFkZXIgZnJvbSB0aGUgYEhlYWRlcnNgIG9iamVjdC5cbiAgICovXG4gIGRlbGV0ZShuYW1lKSB7XG4gICAgaWYgKCFpc1ZhbGlkSGVhZGVyTmFtZShuYW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaGFzKG5hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gbm9ybWFsaXplSGVhZGVyTmFtZShuYW1lKTtcbiAgICBkZWxldGUgdGhpc1tOT1JNQUxJWkVEX0hFQURFUlNdW25vcm1hbGl6ZWROYW1lXTtcbiAgICB0aGlzW1JBV19IRUFERVJfTkFNRVNdLmRlbGV0ZShub3JtYWxpemVkTmFtZSk7XG4gIH1cbiAgLyoqXG4gICAqIFRyYXZlcnNlcyB0aGUgYEhlYWRlcnNgIG9iamVjdCxcbiAgICogY2FsbGluZyB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGVhY2ggaGVhZGVyLlxuICAgKi9cbiAgZm9yRWFjaChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiB0aGlzLmVudHJpZXMoKSkge1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwgbmFtZSwgdGhpcyk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHZhbHVlc1xuICAgKiBvZiBhbGwgU2V0LUNvb2tpZSBoZWFkZXJzIGFzc29jaWF0ZWRcbiAgICogd2l0aCBhIHJlc3BvbnNlXG4gICAqL1xuICBnZXRTZXRDb29raWUoKSB7XG4gICAgY29uc3Qgc2V0Q29va2llSGVhZGVyID0gdGhpcy5nZXQoXCJzZXQtY29va2llXCIpO1xuICAgIGlmIChzZXRDb29raWVIZWFkZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgaWYgKHNldENvb2tpZUhlYWRlciA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuIFtcIlwiXTtcbiAgICB9XG4gICAgcmV0dXJuICgwLCBpbXBvcnRfc2V0X2Nvb2tpZV9wYXJzZXIuc3BsaXRDb29raWVzU3RyaW5nKShzZXRDb29raWVIZWFkZXIpO1xuICB9XG59O1xuXG4vLyBzcmMvZ2V0UmF3SGVhZGVycy50c1xuZnVuY3Rpb24gZ2V0UmF3SGVhZGVycyhoZWFkZXJzKSB7XG4gIGNvbnN0IHJhd0hlYWRlcnMgPSB7fTtcbiAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIGhlYWRlcnMuZW50cmllcygpKSB7XG4gICAgcmF3SGVhZGVyc1toZWFkZXJzW1JBV19IRUFERVJfTkFNRVNdLmdldChuYW1lKV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gcmF3SGVhZGVycztcbn1cblxuLy8gc3JjL3RyYW5zZm9ybWVycy9oZWFkZXJzVG9MaXN0LnRzXG5mdW5jdGlvbiBoZWFkZXJzVG9MaXN0KGhlYWRlcnMpIHtcbiAgY29uc3QgaGVhZGVyc0xpc3QgPSBbXTtcbiAgaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwgbmFtZSkgPT4ge1xuICAgIGNvbnN0IHJlc29sdmVkVmFsdWUgPSB2YWx1ZS5pbmNsdWRlcyhcIixcIikgPyB2YWx1ZS5zcGxpdChcIixcIikubWFwKCh2YWx1ZTIpID0+IHZhbHVlMi50cmltKCkpIDogdmFsdWU7XG4gICAgaGVhZGVyc0xpc3QucHVzaChbbmFtZSwgcmVzb2x2ZWRWYWx1ZV0pO1xuICB9KTtcbiAgcmV0dXJuIGhlYWRlcnNMaXN0O1xufVxuXG4vLyBzcmMvdHJhbnNmb3JtZXJzL2hlYWRlcnNUb1N0cmluZy50c1xuZnVuY3Rpb24gaGVhZGVyc1RvU3RyaW5nKGhlYWRlcnMpIHtcbiAgY29uc3QgbGlzdCA9IGhlYWRlcnNUb0xpc3QoaGVhZGVycyk7XG4gIGNvbnN0IGxpbmVzID0gbGlzdC5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+IHtcbiAgICBjb25zdCB2YWx1ZXMgPSBbXS5jb25jYXQodmFsdWUpO1xuICAgIHJldHVybiBgJHtuYW1lfTogJHt2YWx1ZXMuam9pbihcIiwgXCIpfWA7XG4gIH0pO1xuICByZXR1cm4gbGluZXMuam9pbihcIlxcclxcblwiKTtcbn1cblxuLy8gc3JjL3RyYW5zZm9ybWVycy9oZWFkZXJzVG9PYmplY3QudHNcbnZhciBzaW5nbGVWYWx1ZUhlYWRlcnMgPSBbXCJ1c2VyLWFnZW50XCJdO1xuZnVuY3Rpb24gaGVhZGVyc1RvT2JqZWN0KGhlYWRlcnMpIHtcbiAgY29uc3QgaGVhZGVyc09iamVjdCA9IHt9O1xuICBoZWFkZXJzLmZvckVhY2goKHZhbHVlLCBuYW1lKSA9PiB7XG4gICAgY29uc3QgaXNNdWx0aVZhbHVlID0gIXNpbmdsZVZhbHVlSGVhZGVycy5pbmNsdWRlcyhuYW1lLnRvTG93ZXJDYXNlKCkpICYmIHZhbHVlLmluY2x1ZGVzKFwiLFwiKTtcbiAgICBoZWFkZXJzT2JqZWN0W25hbWVdID0gaXNNdWx0aVZhbHVlID8gdmFsdWUuc3BsaXQoXCIsXCIpLm1hcCgocykgPT4gcy50cmltKCkpIDogdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gaGVhZGVyc09iamVjdDtcbn1cblxuLy8gc3JjL3RyYW5zZm9ybWVycy9zdHJpbmdUb0hlYWRlcnMudHNcbmZ1bmN0aW9uIHN0cmluZ1RvSGVhZGVycyhzdHIpIHtcbiAgY29uc3QgbGluZXMgPSBzdHIudHJpbSgpLnNwbGl0KC9bXFxyXFxuXSsvKTtcbiAgcmV0dXJuIGxpbmVzLnJlZHVjZSgoaGVhZGVycywgbGluZSkgPT4ge1xuICAgIGlmIChsaW5lLnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfVxuICAgIGNvbnN0IHBhcnRzID0gbGluZS5zcGxpdChcIjogXCIpO1xuICAgIGNvbnN0IG5hbWUgPSBwYXJ0cy5zaGlmdCgpO1xuICAgIGNvbnN0IHZhbHVlID0gcGFydHMuam9pbihcIjogXCIpO1xuICAgIGhlYWRlcnMuYXBwZW5kKG5hbWUsIHZhbHVlKTtcbiAgICByZXR1cm4gaGVhZGVycztcbiAgfSwgbmV3IEhlYWRlcnMoKSk7XG59XG5cbi8vIHNyYy90cmFuc2Zvcm1lcnMvbGlzdFRvSGVhZGVycy50c1xuZnVuY3Rpb24gbGlzdFRvSGVhZGVycyhsaXN0KSB7XG4gIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICBsaXN0LmZvckVhY2goKFtuYW1lLCB2YWx1ZV0pID0+IHtcbiAgICBjb25zdCB2YWx1ZXMgPSBbXS5jb25jYXQodmFsdWUpO1xuICAgIHZhbHVlcy5mb3JFYWNoKCh2YWx1ZTIpID0+IHtcbiAgICAgIGhlYWRlcnMuYXBwZW5kKG5hbWUsIHZhbHVlMik7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gaGVhZGVycztcbn1cblxuLy8gc3JjL3RyYW5zZm9ybWVycy9yZWR1Y2VIZWFkZXJzT2JqZWN0LnRzXG5mdW5jdGlvbiByZWR1Y2VIZWFkZXJzT2JqZWN0KGhlYWRlcnMsIHJlZHVjZXIsIGluaXRpYWxTdGF0ZSkge1xuICByZXR1cm4gT2JqZWN0LmtleXMoaGVhZGVycykucmVkdWNlKChuZXh0SGVhZGVycywgbmFtZSkgPT4ge1xuICAgIHJldHVybiByZWR1Y2VyKG5leHRIZWFkZXJzLCBuYW1lLCBoZWFkZXJzW25hbWVdKTtcbiAgfSwgaW5pdGlhbFN0YXRlKTtcbn1cblxuLy8gc3JjL3RyYW5zZm9ybWVycy9vYmplY3RUb0hlYWRlcnMudHNcbmZ1bmN0aW9uIG9iamVjdFRvSGVhZGVycyhoZWFkZXJzT2JqZWN0KSB7XG4gIHJldHVybiByZWR1Y2VIZWFkZXJzT2JqZWN0KFxuICAgIGhlYWRlcnNPYmplY3QsXG4gICAgKGhlYWRlcnMsIG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZXMgPSBbXS5jb25jYXQodmFsdWUpLmZpbHRlcihCb29sZWFuKTtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKCh2YWx1ZTIpID0+IHtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQobmFtZSwgdmFsdWUyKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfSxcbiAgICBuZXcgSGVhZGVycygpXG4gICk7XG59XG5cbi8vIHNyYy90cmFuc2Zvcm1lcnMvZmxhdHRlbkhlYWRlcnNMaXN0LnRzXG5mdW5jdGlvbiBmbGF0dGVuSGVhZGVyc0xpc3QobGlzdCkge1xuICByZXR1cm4gbGlzdC5tYXAoKFtuYW1lLCB2YWx1ZXNdKSA9PiB7XG4gICAgcmV0dXJuIFtuYW1lLCBbXS5jb25jYXQodmFsdWVzKS5qb2luKFwiLCBcIildO1xuICB9KTtcbn1cblxuLy8gc3JjL3RyYW5zZm9ybWVycy9mbGF0dGVuSGVhZGVyc09iamVjdC50c1xuZnVuY3Rpb24gZmxhdHRlbkhlYWRlcnNPYmplY3QoaGVhZGVyc09iamVjdCkge1xuICByZXR1cm4gcmVkdWNlSGVhZGVyc09iamVjdChcbiAgICBoZWFkZXJzT2JqZWN0LFxuICAgIChoZWFkZXJzLCBuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgaGVhZGVyc1tuYW1lXSA9IFtdLmNvbmNhdCh2YWx1ZSkuam9pbihcIiwgXCIpO1xuICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfSxcbiAgICB7fVxuICApO1xufVxuZXhwb3J0IHtcbiAgSGVhZGVycyxcbiAgZmxhdHRlbkhlYWRlcnNMaXN0LFxuICBmbGF0dGVuSGVhZGVyc09iamVjdCxcbiAgZ2V0UmF3SGVhZGVycyxcbiAgaGVhZGVyc1RvTGlzdCxcbiAgaGVhZGVyc1RvT2JqZWN0LFxuICBoZWFkZXJzVG9TdHJpbmcsXG4gIGxpc3RUb0hlYWRlcnMsXG4gIG9iamVjdFRvSGVhZGVycyxcbiAgcmVkdWNlSGVhZGVyc09iamVjdCxcbiAgc3RyaW5nVG9IZWFkZXJzXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcCIsImltcG9ydCAqIGFzIF9zeXNjYWxsczJfMCBmcm9tICdzcGFjZXRpbWU6c3lzQDIuMCc7XG5pbXBvcnQgeyBtb2R1bGVIb29rcyB9IGZyb20gJ3NwYWNldGltZTpzeXNAMi4wJztcbmltcG9ydCB7IGhlYWRlcnNUb0xpc3QsIEhlYWRlcnMgfSBmcm9tICdoZWFkZXJzLXBvbHlmaWxsJztcblxudHlwZW9mIGdsb2JhbFRoaXMhPT1cInVuZGVmaW5lZFwiJiYoKGdsb2JhbFRoaXMuZ2xvYmFsPWdsb2JhbFRoaXMuZ2xvYmFsfHxnbG9iYWxUaGlzKSwoZ2xvYmFsVGhpcy53aW5kb3c9Z2xvYmFsVGhpcy53aW5kb3d8fGdsb2JhbFRoaXMpKTtcbnZhciBfX2NyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19nZXRQcm90b09mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19lc20gPSAoZm4sIHJlcykgPT4gZnVuY3Rpb24gX19pbml0KCkge1xuICByZXR1cm4gZm4gJiYgKHJlcyA9ICgwLCBmbltfX2dldE93blByb3BOYW1lcyhmbilbMF1dKShmbiA9IDApKSwgcmVzO1xufTtcbnZhciBfX2NvbW1vbkpTID0gKGNiLCBtb2QpID0+IGZ1bmN0aW9uIF9fcmVxdWlyZSgpIHtcbiAgcmV0dXJuIG1vZCB8fCAoMCwgY2JbX19nZXRPd25Qcm9wTmFtZXMoY2IpWzBdXSkoKG1vZCA9IHsgZXhwb3J0czoge30gfSkuZXhwb3J0cywgbW9kKSwgbW9kLmV4cG9ydHM7XG59O1xudmFyIF9fZXhwb3J0ID0gKHRhcmdldCwgYWxsKSA9PiB7XG4gIGZvciAodmFyIG5hbWUgaW4gYWxsKVxuICAgIF9fZGVmUHJvcCh0YXJnZXQsIG5hbWUsIHsgZ2V0OiBhbGxbbmFtZV0sIGVudW1lcmFibGU6IHRydWUgfSk7XG59O1xudmFyIF9fY29weVByb3BzID0gKHRvLCBmcm9tLCBleGNlcHQsIGRlc2MpID0+IHtcbiAgaWYgKGZyb20gJiYgdHlwZW9mIGZyb20gPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGZyb20gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGZvciAobGV0IGtleSBvZiBfX2dldE93blByb3BOYW1lcyhmcm9tKSlcbiAgICAgIGlmICghX19oYXNPd25Qcm9wLmNhbGwodG8sIGtleSkgJiYga2V5ICE9PSBleGNlcHQpXG4gICAgICAgIF9fZGVmUHJvcCh0bywga2V5LCB7IGdldDogKCkgPT4gZnJvbVtrZXldLCBlbnVtZXJhYmxlOiAhKGRlc2MgPSBfX2dldE93blByb3BEZXNjKGZyb20sIGtleSkpIHx8IGRlc2MuZW51bWVyYWJsZSB9KTtcbiAgfVxuICByZXR1cm4gdG87XG59O1xudmFyIF9fdG9FU00gPSAobW9kLCBpc05vZGVNb2RlLCB0YXJnZXQpID0+ICh0YXJnZXQgPSBtb2QgIT0gbnVsbCA/IF9fY3JlYXRlKF9fZ2V0UHJvdG9PZihtb2QpKSA6IHt9LCBfX2NvcHlQcm9wcyhcbiAgLy8gSWYgdGhlIGltcG9ydGVyIGlzIGluIG5vZGUgY29tcGF0aWJpbGl0eSBtb2RlIG9yIHRoaXMgaXMgbm90IGFuIEVTTVxuICAvLyBmaWxlIHRoYXQgaGFzIGJlZW4gY29udmVydGVkIHRvIGEgQ29tbW9uSlMgZmlsZSB1c2luZyBhIEJhYmVsLVxuICAvLyBjb21wYXRpYmxlIHRyYW5zZm9ybSAoaS5lLiBcIl9fZXNNb2R1bGVcIiBoYXMgbm90IGJlZW4gc2V0KSwgdGhlbiBzZXRcbiAgLy8gXCJkZWZhdWx0XCIgdG8gdGhlIENvbW1vbkpTIFwibW9kdWxlLmV4cG9ydHNcIiBmb3Igbm9kZSBjb21wYXRpYmlsaXR5LlxuICBfX2RlZlByb3AodGFyZ2V0LCBcImRlZmF1bHRcIiwgeyB2YWx1ZTogbW9kLCBlbnVtZXJhYmxlOiB0cnVlIH0pICxcbiAgbW9kXG4pKTtcbnZhciBfX3RvQ29tbW9uSlMgPSAobW9kKSA9PiBfX2NvcHlQcm9wcyhfX2RlZlByb3Aoe30sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pLCBtb2QpO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vYmFzZTY0LWpzQDEuNS4xL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvaW5kZXguanNcbnZhciByZXF1aXJlX2Jhc2U2NF9qcyA9IF9fY29tbW9uSlMoe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9iYXNlNjQtanNAMS41LjEvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qc1wiKGV4cG9ydHMpIHtcbiAgICBleHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoO1xuICAgIGV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheTtcbiAgICBleHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5MjtcbiAgICB2YXIgbG9va3VwID0gW107XG4gICAgdmFyIHJldkxvb2t1cCA9IFtdO1xuICAgIHZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gXCJ1bmRlZmluZWRcIiA/IFVpbnQ4QXJyYXkgOiBBcnJheTtcbiAgICB2YXIgY29kZSA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIGxvb2t1cFtpXSA9IGNvZGVbaV07XG4gICAgICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGk7XG4gICAgfVxuICAgIHZhciBpO1xuICAgIHZhciBsZW47XG4gICAgcmV2TG9va3VwW1wiLVwiLmNoYXJDb2RlQXQoMCldID0gNjI7XG4gICAgcmV2TG9va3VwW1wiX1wiLmNoYXJDb2RlQXQoMCldID0gNjM7XG4gICAgZnVuY3Rpb24gZ2V0TGVucyhiNjQpIHtcbiAgICAgIHZhciBsZW4yID0gYjY0Lmxlbmd0aDtcbiAgICAgIGlmIChsZW4yICUgNCA+IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNFwiKTtcbiAgICAgIH1cbiAgICAgIHZhciB2YWxpZExlbiA9IGI2NC5pbmRleE9mKFwiPVwiKTtcbiAgICAgIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuMjtcbiAgICAgIHZhciBwbGFjZUhvbGRlcnNMZW4gPSB2YWxpZExlbiA9PT0gbGVuMiA/IDAgOiA0IC0gdmFsaWRMZW4gJSA0O1xuICAgICAgcmV0dXJuIFt2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYnl0ZUxlbmd0aChiNjQpIHtcbiAgICAgIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpO1xuICAgICAgdmFyIHZhbGlkTGVuID0gbGVuc1swXTtcbiAgICAgIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdO1xuICAgICAgcmV0dXJuICh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCAtIHBsYWNlSG9sZGVyc0xlbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gX2J5dGVMZW5ndGgoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XG4gICAgICByZXR1cm4gKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzTGVuO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0b0J5dGVBcnJheShiNjQpIHtcbiAgICAgIHZhciB0bXA7XG4gICAgICB2YXIgbGVucyA9IGdldExlbnMoYjY0KTtcbiAgICAgIHZhciB2YWxpZExlbiA9IGxlbnNbMF07XG4gICAgICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXTtcbiAgICAgIHZhciBhcnIgPSBuZXcgQXJyKF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikpO1xuICAgICAgdmFyIGN1ckJ5dGUgPSAwO1xuICAgICAgdmFyIGxlbjIgPSBwbGFjZUhvbGRlcnNMZW4gPiAwID8gdmFsaWRMZW4gLSA0IDogdmFsaWRMZW47XG4gICAgICB2YXIgaTI7XG4gICAgICBmb3IgKGkyID0gMDsgaTIgPCBsZW4yOyBpMiArPSA0KSB7XG4gICAgICAgIHRtcCA9IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpMildIDw8IDE4IHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkyICsgMSldIDw8IDEyIHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkyICsgMildIDw8IDYgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIgKyAzKV07XG4gICAgICAgIGFycltjdXJCeXRlKytdID0gdG1wID4+IDE2ICYgMjU1O1xuICAgICAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCA+PiA4ICYgMjU1O1xuICAgICAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDI1NTtcbiAgICAgIH1cbiAgICAgIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcbiAgICAgICAgdG1wID0gcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkyKV0gPDwgMiB8IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpMiArIDEpXSA+PiA0O1xuICAgICAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDI1NTtcbiAgICAgIH1cbiAgICAgIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDEpIHtcbiAgICAgICAgdG1wID0gcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkyKV0gPDwgMTAgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIgKyAxKV0gPDwgNCB8IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpMiArIDIpXSA+PiAyO1xuICAgICAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCA+PiA4ICYgMjU1O1xuICAgICAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDI1NTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NChudW0pIHtcbiAgICAgIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgNjNdICsgbG9va3VwW251bSA+PiAxMiAmIDYzXSArIGxvb2t1cFtudW0gPj4gNiAmIDYzXSArIGxvb2t1cFtudW0gJiA2M107XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVuY29kZUNodW5rKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gICAgICB2YXIgdG1wO1xuICAgICAgdmFyIG91dHB1dCA9IFtdO1xuICAgICAgZm9yICh2YXIgaTIgPSBzdGFydDsgaTIgPCBlbmQ7IGkyICs9IDMpIHtcbiAgICAgICAgdG1wID0gKHVpbnQ4W2kyXSA8PCAxNiAmIDE2NzExNjgwKSArICh1aW50OFtpMiArIDFdIDw8IDggJiA2NTI4MCkgKyAodWludDhbaTIgKyAyXSAmIDI1NSk7XG4gICAgICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXQuam9pbihcIlwiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZnJvbUJ5dGVBcnJheTIodWludDgpIHtcbiAgICAgIHZhciB0bXA7XG4gICAgICB2YXIgbGVuMiA9IHVpbnQ4Lmxlbmd0aDtcbiAgICAgIHZhciBleHRyYUJ5dGVzID0gbGVuMiAlIDM7XG4gICAgICB2YXIgcGFydHMgPSBbXTtcbiAgICAgIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzO1xuICAgICAgZm9yICh2YXIgaTIgPSAwLCBsZW4yMiA9IGxlbjIgLSBleHRyYUJ5dGVzOyBpMiA8IGxlbjIyOyBpMiArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKHVpbnQ4LCBpMiwgaTIgKyBtYXhDaHVua0xlbmd0aCA+IGxlbjIyID8gbGVuMjIgOiBpMiArIG1heENodW5rTGVuZ3RoKSk7XG4gICAgICB9XG4gICAgICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgICAgICB0bXAgPSB1aW50OFtsZW4yIC0gMV07XG4gICAgICAgIHBhcnRzLnB1c2goXG4gICAgICAgICAgbG9va3VwW3RtcCA+PiAyXSArIGxvb2t1cFt0bXAgPDwgNCAmIDYzXSArIFwiPT1cIlxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgICAgIHRtcCA9ICh1aW50OFtsZW4yIC0gMl0gPDwgOCkgKyB1aW50OFtsZW4yIC0gMV07XG4gICAgICAgIHBhcnRzLnB1c2goXG4gICAgICAgICAgbG9va3VwW3RtcCA+PiAxMF0gKyBsb29rdXBbdG1wID4+IDQgJiA2M10gKyBsb29rdXBbdG1wIDw8IDIgJiA2M10gKyBcIj1cIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oXCJcIik7XG4gICAgfVxuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3N0YXR1c2VzQDIuMC4yL25vZGVfbW9kdWxlcy9zdGF0dXNlcy9jb2Rlcy5qc29uXG52YXIgcmVxdWlyZV9jb2RlcyA9IF9fY29tbW9uSlMoe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9zdGF0dXNlc0AyLjAuMi9ub2RlX21vZHVsZXMvc3RhdHVzZXMvY29kZXMuanNvblwiKGV4cG9ydHMsIG1vZHVsZSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgXCIxMDBcIjogXCJDb250aW51ZVwiLFxuICAgICAgXCIxMDFcIjogXCJTd2l0Y2hpbmcgUHJvdG9jb2xzXCIsXG4gICAgICBcIjEwMlwiOiBcIlByb2Nlc3NpbmdcIixcbiAgICAgIFwiMTAzXCI6IFwiRWFybHkgSGludHNcIixcbiAgICAgIFwiMjAwXCI6IFwiT0tcIixcbiAgICAgIFwiMjAxXCI6IFwiQ3JlYXRlZFwiLFxuICAgICAgXCIyMDJcIjogXCJBY2NlcHRlZFwiLFxuICAgICAgXCIyMDNcIjogXCJOb24tQXV0aG9yaXRhdGl2ZSBJbmZvcm1hdGlvblwiLFxuICAgICAgXCIyMDRcIjogXCJObyBDb250ZW50XCIsXG4gICAgICBcIjIwNVwiOiBcIlJlc2V0IENvbnRlbnRcIixcbiAgICAgIFwiMjA2XCI6IFwiUGFydGlhbCBDb250ZW50XCIsXG4gICAgICBcIjIwN1wiOiBcIk11bHRpLVN0YXR1c1wiLFxuICAgICAgXCIyMDhcIjogXCJBbHJlYWR5IFJlcG9ydGVkXCIsXG4gICAgICBcIjIyNlwiOiBcIklNIFVzZWRcIixcbiAgICAgIFwiMzAwXCI6IFwiTXVsdGlwbGUgQ2hvaWNlc1wiLFxuICAgICAgXCIzMDFcIjogXCJNb3ZlZCBQZXJtYW5lbnRseVwiLFxuICAgICAgXCIzMDJcIjogXCJGb3VuZFwiLFxuICAgICAgXCIzMDNcIjogXCJTZWUgT3RoZXJcIixcbiAgICAgIFwiMzA0XCI6IFwiTm90IE1vZGlmaWVkXCIsXG4gICAgICBcIjMwNVwiOiBcIlVzZSBQcm94eVwiLFxuICAgICAgXCIzMDdcIjogXCJUZW1wb3JhcnkgUmVkaXJlY3RcIixcbiAgICAgIFwiMzA4XCI6IFwiUGVybWFuZW50IFJlZGlyZWN0XCIsXG4gICAgICBcIjQwMFwiOiBcIkJhZCBSZXF1ZXN0XCIsXG4gICAgICBcIjQwMVwiOiBcIlVuYXV0aG9yaXplZFwiLFxuICAgICAgXCI0MDJcIjogXCJQYXltZW50IFJlcXVpcmVkXCIsXG4gICAgICBcIjQwM1wiOiBcIkZvcmJpZGRlblwiLFxuICAgICAgXCI0MDRcIjogXCJOb3QgRm91bmRcIixcbiAgICAgIFwiNDA1XCI6IFwiTWV0aG9kIE5vdCBBbGxvd2VkXCIsXG4gICAgICBcIjQwNlwiOiBcIk5vdCBBY2NlcHRhYmxlXCIsXG4gICAgICBcIjQwN1wiOiBcIlByb3h5IEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkXCIsXG4gICAgICBcIjQwOFwiOiBcIlJlcXVlc3QgVGltZW91dFwiLFxuICAgICAgXCI0MDlcIjogXCJDb25mbGljdFwiLFxuICAgICAgXCI0MTBcIjogXCJHb25lXCIsXG4gICAgICBcIjQxMVwiOiBcIkxlbmd0aCBSZXF1aXJlZFwiLFxuICAgICAgXCI0MTJcIjogXCJQcmVjb25kaXRpb24gRmFpbGVkXCIsXG4gICAgICBcIjQxM1wiOiBcIlBheWxvYWQgVG9vIExhcmdlXCIsXG4gICAgICBcIjQxNFwiOiBcIlVSSSBUb28gTG9uZ1wiLFxuICAgICAgXCI0MTVcIjogXCJVbnN1cHBvcnRlZCBNZWRpYSBUeXBlXCIsXG4gICAgICBcIjQxNlwiOiBcIlJhbmdlIE5vdCBTYXRpc2ZpYWJsZVwiLFxuICAgICAgXCI0MTdcIjogXCJFeHBlY3RhdGlvbiBGYWlsZWRcIixcbiAgICAgIFwiNDE4XCI6IFwiSSdtIGEgVGVhcG90XCIsXG4gICAgICBcIjQyMVwiOiBcIk1pc2RpcmVjdGVkIFJlcXVlc3RcIixcbiAgICAgIFwiNDIyXCI6IFwiVW5wcm9jZXNzYWJsZSBFbnRpdHlcIixcbiAgICAgIFwiNDIzXCI6IFwiTG9ja2VkXCIsXG4gICAgICBcIjQyNFwiOiBcIkZhaWxlZCBEZXBlbmRlbmN5XCIsXG4gICAgICBcIjQyNVwiOiBcIlRvbyBFYXJseVwiLFxuICAgICAgXCI0MjZcIjogXCJVcGdyYWRlIFJlcXVpcmVkXCIsXG4gICAgICBcIjQyOFwiOiBcIlByZWNvbmRpdGlvbiBSZXF1aXJlZFwiLFxuICAgICAgXCI0MjlcIjogXCJUb28gTWFueSBSZXF1ZXN0c1wiLFxuICAgICAgXCI0MzFcIjogXCJSZXF1ZXN0IEhlYWRlciBGaWVsZHMgVG9vIExhcmdlXCIsXG4gICAgICBcIjQ1MVwiOiBcIlVuYXZhaWxhYmxlIEZvciBMZWdhbCBSZWFzb25zXCIsXG4gICAgICBcIjUwMFwiOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgXCI1MDFcIjogXCJOb3QgSW1wbGVtZW50ZWRcIixcbiAgICAgIFwiNTAyXCI6IFwiQmFkIEdhdGV3YXlcIixcbiAgICAgIFwiNTAzXCI6IFwiU2VydmljZSBVbmF2YWlsYWJsZVwiLFxuICAgICAgXCI1MDRcIjogXCJHYXRld2F5IFRpbWVvdXRcIixcbiAgICAgIFwiNTA1XCI6IFwiSFRUUCBWZXJzaW9uIE5vdCBTdXBwb3J0ZWRcIixcbiAgICAgIFwiNTA2XCI6IFwiVmFyaWFudCBBbHNvIE5lZ290aWF0ZXNcIixcbiAgICAgIFwiNTA3XCI6IFwiSW5zdWZmaWNpZW50IFN0b3JhZ2VcIixcbiAgICAgIFwiNTA4XCI6IFwiTG9vcCBEZXRlY3RlZFwiLFxuICAgICAgXCI1MDlcIjogXCJCYW5kd2lkdGggTGltaXQgRXhjZWVkZWRcIixcbiAgICAgIFwiNTEwXCI6IFwiTm90IEV4dGVuZGVkXCIsXG4gICAgICBcIjUxMVwiOiBcIk5ldHdvcmsgQXV0aGVudGljYXRpb24gUmVxdWlyZWRcIlxuICAgIH07XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vc3RhdHVzZXNAMi4wLjIvbm9kZV9tb2R1bGVzL3N0YXR1c2VzL2luZGV4LmpzXG52YXIgcmVxdWlyZV9zdGF0dXNlcyA9IF9fY29tbW9uSlMoe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9zdGF0dXNlc0AyLjAuMi9ub2RlX21vZHVsZXMvc3RhdHVzZXMvaW5kZXguanNcIihleHBvcnRzLCBtb2R1bGUpIHtcbiAgICB2YXIgY29kZXMgPSByZXF1aXJlX2NvZGVzKCk7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBzdGF0dXMyO1xuICAgIHN0YXR1czIubWVzc2FnZSA9IGNvZGVzO1xuICAgIHN0YXR1czIuY29kZSA9IGNyZWF0ZU1lc3NhZ2VUb1N0YXR1c0NvZGVNYXAoY29kZXMpO1xuICAgIHN0YXR1czIuY29kZXMgPSBjcmVhdGVTdGF0dXNDb2RlTGlzdChjb2Rlcyk7XG4gICAgc3RhdHVzMi5yZWRpcmVjdCA9IHtcbiAgICAgIDMwMDogdHJ1ZSxcbiAgICAgIDMwMTogdHJ1ZSxcbiAgICAgIDMwMjogdHJ1ZSxcbiAgICAgIDMwMzogdHJ1ZSxcbiAgICAgIDMwNTogdHJ1ZSxcbiAgICAgIDMwNzogdHJ1ZSxcbiAgICAgIDMwODogdHJ1ZVxuICAgIH07XG4gICAgc3RhdHVzMi5lbXB0eSA9IHtcbiAgICAgIDIwNDogdHJ1ZSxcbiAgICAgIDIwNTogdHJ1ZSxcbiAgICAgIDMwNDogdHJ1ZVxuICAgIH07XG4gICAgc3RhdHVzMi5yZXRyeSA9IHtcbiAgICAgIDUwMjogdHJ1ZSxcbiAgICAgIDUwMzogdHJ1ZSxcbiAgICAgIDUwNDogdHJ1ZVxuICAgIH07XG4gICAgZnVuY3Rpb24gY3JlYXRlTWVzc2FnZVRvU3RhdHVzQ29kZU1hcChjb2RlczIpIHtcbiAgICAgIHZhciBtYXAgPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKGNvZGVzMikuZm9yRWFjaChmdW5jdGlvbiBmb3JFYWNoQ29kZShjb2RlKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gY29kZXMyW2NvZGVdO1xuICAgICAgICB2YXIgc3RhdHVzMyA9IE51bWJlcihjb2RlKTtcbiAgICAgICAgbWFwW21lc3NhZ2UudG9Mb3dlckNhc2UoKV0gPSBzdGF0dXMzO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWFwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVTdGF0dXNDb2RlTGlzdChjb2RlczIpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb2RlczIpLm1hcChmdW5jdGlvbiBtYXBDb2RlKGNvZGUpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcihjb2RlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRTdGF0dXNDb2RlKG1lc3NhZ2UpIHtcbiAgICAgIHZhciBtc2cgPSBtZXNzYWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdGF0dXMyLmNvZGUsIG1zZykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHN0YXR1cyBtZXNzYWdlOiBcIicgKyBtZXNzYWdlICsgJ1wiJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdHVzMi5jb2RlW21zZ107XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFN0YXR1c01lc3NhZ2UoY29kZSkge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RhdHVzMi5tZXNzYWdlLCBjb2RlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHN0YXR1cyBjb2RlOiBcIiArIGNvZGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXR1czIubWVzc2FnZVtjb2RlXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3RhdHVzMihjb2RlKSB7XG4gICAgICBpZiAodHlwZW9mIGNvZGUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgcmV0dXJuIGdldFN0YXR1c01lc3NhZ2UoY29kZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGNvZGUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNvZGUgbXVzdCBiZSBhIG51bWJlciBvciBzdHJpbmdcIik7XG4gICAgICB9XG4gICAgICB2YXIgbiA9IHBhcnNlSW50KGNvZGUsIDEwKTtcbiAgICAgIGlmICghaXNOYU4obikpIHtcbiAgICAgICAgcmV0dXJuIGdldFN0YXR1c01lc3NhZ2Uobik7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0U3RhdHVzQ29kZShjb2RlKTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBzcmMvdXRpbC1zdHViLnRzXG52YXIgdXRpbF9zdHViX2V4cG9ydHMgPSB7fTtcbl9fZXhwb3J0KHV0aWxfc3R1Yl9leHBvcnRzLCB7XG4gIGluc3BlY3Q6ICgpID0+IGluc3BlY3Rcbn0pO1xudmFyIGluc3BlY3Q7XG52YXIgaW5pdF91dGlsX3N0dWIgPSBfX2VzbSh7XG4gIFwic3JjL3V0aWwtc3R1Yi50c1wiKCkge1xuICAgIGluc3BlY3QgPSB7fTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9vYmplY3QtaW5zcGVjdEAxLjEzLjQvbm9kZV9tb2R1bGVzL29iamVjdC1pbnNwZWN0L3V0aWwuaW5zcGVjdC5qc1xudmFyIHJlcXVpcmVfdXRpbF9pbnNwZWN0ID0gX19jb21tb25KUyh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL29iamVjdC1pbnNwZWN0QDEuMTMuNC9ub2RlX21vZHVsZXMvb2JqZWN0LWluc3BlY3QvdXRpbC5pbnNwZWN0LmpzXCIoZXhwb3J0cywgbW9kdWxlKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSAoaW5pdF91dGlsX3N0dWIoKSwgX190b0NvbW1vbkpTKHV0aWxfc3R1Yl9leHBvcnRzKSkuaW5zcGVjdDtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9vYmplY3QtaW5zcGVjdEAxLjEzLjQvbm9kZV9tb2R1bGVzL29iamVjdC1pbnNwZWN0L2luZGV4LmpzXG52YXIgcmVxdWlyZV9vYmplY3RfaW5zcGVjdCA9IF9fY29tbW9uSlMoe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9vYmplY3QtaW5zcGVjdEAxLjEzLjQvbm9kZV9tb2R1bGVzL29iamVjdC1pbnNwZWN0L2luZGV4LmpzXCIoZXhwb3J0cywgbW9kdWxlKSB7XG4gICAgdmFyIGhhc01hcCA9IHR5cGVvZiBNYXAgPT09IFwiZnVuY3Rpb25cIiAmJiBNYXAucHJvdG90eXBlO1xuICAgIHZhciBtYXBTaXplRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgaGFzTWFwID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihNYXAucHJvdG90eXBlLCBcInNpemVcIikgOiBudWxsO1xuICAgIHZhciBtYXBTaXplID0gaGFzTWFwICYmIG1hcFNpemVEZXNjcmlwdG9yICYmIHR5cGVvZiBtYXBTaXplRGVzY3JpcHRvci5nZXQgPT09IFwiZnVuY3Rpb25cIiA/IG1hcFNpemVEZXNjcmlwdG9yLmdldCA6IG51bGw7XG4gICAgdmFyIG1hcEZvckVhY2ggPSBoYXNNYXAgJiYgTWFwLnByb3RvdHlwZS5mb3JFYWNoO1xuICAgIHZhciBoYXNTZXQgPSB0eXBlb2YgU2V0ID09PSBcImZ1bmN0aW9uXCIgJiYgU2V0LnByb3RvdHlwZTtcbiAgICB2YXIgc2V0U2l6ZURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmIGhhc1NldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoU2V0LnByb3RvdHlwZSwgXCJzaXplXCIpIDogbnVsbDtcbiAgICB2YXIgc2V0U2l6ZSA9IGhhc1NldCAmJiBzZXRTaXplRGVzY3JpcHRvciAmJiB0eXBlb2Ygc2V0U2l6ZURlc2NyaXB0b3IuZ2V0ID09PSBcImZ1bmN0aW9uXCIgPyBzZXRTaXplRGVzY3JpcHRvci5nZXQgOiBudWxsO1xuICAgIHZhciBzZXRGb3JFYWNoID0gaGFzU2V0ICYmIFNldC5wcm90b3R5cGUuZm9yRWFjaDtcbiAgICB2YXIgaGFzV2Vha01hcCA9IHR5cGVvZiBXZWFrTWFwID09PSBcImZ1bmN0aW9uXCIgJiYgV2Vha01hcC5wcm90b3R5cGU7XG4gICAgdmFyIHdlYWtNYXBIYXMgPSBoYXNXZWFrTWFwID8gV2Vha01hcC5wcm90b3R5cGUuaGFzIDogbnVsbDtcbiAgICB2YXIgaGFzV2Vha1NldCA9IHR5cGVvZiBXZWFrU2V0ID09PSBcImZ1bmN0aW9uXCIgJiYgV2Vha1NldC5wcm90b3R5cGU7XG4gICAgdmFyIHdlYWtTZXRIYXMgPSBoYXNXZWFrU2V0ID8gV2Vha1NldC5wcm90b3R5cGUuaGFzIDogbnVsbDtcbiAgICB2YXIgaGFzV2Vha1JlZiA9IHR5cGVvZiBXZWFrUmVmID09PSBcImZ1bmN0aW9uXCIgJiYgV2Vha1JlZi5wcm90b3R5cGU7XG4gICAgdmFyIHdlYWtSZWZEZXJlZiA9IGhhc1dlYWtSZWYgPyBXZWFrUmVmLnByb3RvdHlwZS5kZXJlZiA6IG51bGw7XG4gICAgdmFyIGJvb2xlYW5WYWx1ZU9mID0gQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZjtcbiAgICB2YXIgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICAgIHZhciBmdW5jdGlvblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuICAgIHZhciAkbWF0Y2ggPSBTdHJpbmcucHJvdG90eXBlLm1hdGNoO1xuICAgIHZhciAkc2xpY2UgPSBTdHJpbmcucHJvdG90eXBlLnNsaWNlO1xuICAgIHZhciAkcmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcbiAgICB2YXIgJHRvVXBwZXJDYXNlID0gU3RyaW5nLnByb3RvdHlwZS50b1VwcGVyQ2FzZTtcbiAgICB2YXIgJHRvTG93ZXJDYXNlID0gU3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZTtcbiAgICB2YXIgJHRlc3QgPSBSZWdFeHAucHJvdG90eXBlLnRlc3Q7XG4gICAgdmFyICRjb25jYXQgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0O1xuICAgIHZhciAkam9pbiA9IEFycmF5LnByb3RvdHlwZS5qb2luO1xuICAgIHZhciAkYXJyU2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG4gICAgdmFyICRmbG9vciA9IE1hdGguZmxvb3I7XG4gICAgdmFyIGJpZ0ludFZhbHVlT2YgPSB0eXBlb2YgQmlnSW50ID09PSBcImZ1bmN0aW9uXCIgPyBCaWdJbnQucHJvdG90eXBlLnZhbHVlT2YgOiBudWxsO1xuICAgIHZhciBnT1BTID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiAgICB2YXIgc3ltVG9TdHJpbmcgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcgOiBudWxsO1xuICAgIHZhciBoYXNTaGFtbWVkU3ltYm9scyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcIm9iamVjdFwiO1xuICAgIHZhciB0b1N0cmluZ1RhZyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wudG9TdHJpbmdUYWcgJiYgKHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09IGhhc1NoYW1tZWRTeW1ib2xzID8gXCJvYmplY3RcIiA6IFwic3ltYm9sXCIpID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogbnVsbDtcbiAgICB2YXIgaXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgICB2YXIgZ1BPID0gKHR5cGVvZiBSZWZsZWN0ID09PSBcImZ1bmN0aW9uXCIgPyBSZWZsZWN0LmdldFByb3RvdHlwZU9mIDogT2JqZWN0LmdldFByb3RvdHlwZU9mKSB8fCAoW10uX19wcm90b19fID09PSBBcnJheS5wcm90b3R5cGUgPyBmdW5jdGlvbihPKSB7XG4gICAgICByZXR1cm4gTy5fX3Byb3RvX187XG4gICAgfSA6IG51bGwpO1xuICAgIGZ1bmN0aW9uIGFkZE51bWVyaWNTZXBhcmF0b3IobnVtLCBzdHIpIHtcbiAgICAgIGlmIChudW0gPT09IEluZmluaXR5IHx8IG51bSA9PT0gLUluZmluaXR5IHx8IG51bSAhPT0gbnVtIHx8IG51bSAmJiBudW0gPiAtMWUzICYmIG51bSA8IDFlMyB8fCAkdGVzdC5jYWxsKC9lLywgc3RyKSkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgfVxuICAgICAgdmFyIHNlcFJlZ2V4ID0gL1swLTldKD89KD86WzAtOV17M30pKyg/IVswLTldKSkvZztcbiAgICAgIGlmICh0eXBlb2YgbnVtID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHZhciBpbnQgPSBudW0gPCAwID8gLSRmbG9vcigtbnVtKSA6ICRmbG9vcihudW0pO1xuICAgICAgICBpZiAoaW50ICE9PSBudW0pIHtcbiAgICAgICAgICB2YXIgaW50U3RyID0gU3RyaW5nKGludCk7XG4gICAgICAgICAgdmFyIGRlYyA9ICRzbGljZS5jYWxsKHN0ciwgaW50U3RyLmxlbmd0aCArIDEpO1xuICAgICAgICAgIHJldHVybiAkcmVwbGFjZS5jYWxsKGludFN0ciwgc2VwUmVnZXgsIFwiJCZfXCIpICsgXCIuXCIgKyAkcmVwbGFjZS5jYWxsKCRyZXBsYWNlLmNhbGwoZGVjLCAvKFswLTldezN9KS9nLCBcIiQmX1wiKSwgL18kLywgXCJcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAkcmVwbGFjZS5jYWxsKHN0ciwgc2VwUmVnZXgsIFwiJCZfXCIpO1xuICAgIH1cbiAgICB2YXIgdXRpbEluc3BlY3QgPSByZXF1aXJlX3V0aWxfaW5zcGVjdCgpO1xuICAgIHZhciBpbnNwZWN0Q3VzdG9tID0gdXRpbEluc3BlY3QuY3VzdG9tO1xuICAgIHZhciBpbnNwZWN0U3ltYm9sID0gaXNTeW1ib2woaW5zcGVjdEN1c3RvbSkgPyBpbnNwZWN0Q3VzdG9tIDogbnVsbDtcbiAgICB2YXIgcXVvdGVzID0ge1xuICAgICAgX19wcm90b19fOiBudWxsLFxuICAgICAgXCJkb3VibGVcIjogJ1wiJyxcbiAgICAgIHNpbmdsZTogXCInXCJcbiAgICB9O1xuICAgIHZhciBxdW90ZVJFcyA9IHtcbiAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgIFwiZG91YmxlXCI6IC8oW1wiXFxcXF0pL2csXG4gICAgICBzaW5nbGU6IC8oWydcXFxcXSkvZ1xuICAgIH07XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbnNwZWN0XyhvYmosIG9wdGlvbnMsIGRlcHRoLCBzZWVuKSB7XG4gICAgICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gICAgICBpZiAoaGFzKG9wdHMsIFwicXVvdGVTdHlsZVwiKSAmJiAhaGFzKHF1b3Rlcywgb3B0cy5xdW90ZVN0eWxlKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gXCJxdW90ZVN0eWxlXCIgbXVzdCBiZSBcInNpbmdsZVwiIG9yIFwiZG91YmxlXCInKTtcbiAgICAgIH1cbiAgICAgIGlmIChoYXMob3B0cywgXCJtYXhTdHJpbmdMZW5ndGhcIikgJiYgKHR5cGVvZiBvcHRzLm1heFN0cmluZ0xlbmd0aCA9PT0gXCJudW1iZXJcIiA/IG9wdHMubWF4U3RyaW5nTGVuZ3RoIDwgMCAmJiBvcHRzLm1heFN0cmluZ0xlbmd0aCAhPT0gSW5maW5pdHkgOiBvcHRzLm1heFN0cmluZ0xlbmd0aCAhPT0gbnVsbCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIFwibWF4U3RyaW5nTGVuZ3RoXCIsIGlmIHByb3ZpZGVkLCBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlciwgSW5maW5pdHksIG9yIGBudWxsYCcpO1xuICAgICAgfVxuICAgICAgdmFyIGN1c3RvbUluc3BlY3QgPSBoYXMob3B0cywgXCJjdXN0b21JbnNwZWN0XCIpID8gb3B0cy5jdXN0b21JbnNwZWN0IDogdHJ1ZTtcbiAgICAgIGlmICh0eXBlb2YgY3VzdG9tSW5zcGVjdCAhPT0gXCJib29sZWFuXCIgJiYgY3VzdG9tSW5zcGVjdCAhPT0gXCJzeW1ib2xcIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9uIFxcXCJjdXN0b21JbnNwZWN0XFxcIiwgaWYgcHJvdmlkZWQsIG11c3QgYmUgYHRydWVgLCBgZmFsc2VgLCBvciBgJ3N5bWJvbCdgXCIpO1xuICAgICAgfVxuICAgICAgaWYgKGhhcyhvcHRzLCBcImluZGVudFwiKSAmJiBvcHRzLmluZGVudCAhPT0gbnVsbCAmJiBvcHRzLmluZGVudCAhPT0gXCJcdFwiICYmICEocGFyc2VJbnQob3B0cy5pbmRlbnQsIDEwKSA9PT0gb3B0cy5pbmRlbnQgJiYgb3B0cy5pbmRlbnQgPiAwKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gXCJpbmRlbnRcIiBtdXN0IGJlIFwiXFxcXHRcIiwgYW4gaW50ZWdlciA+IDAsIG9yIGBudWxsYCcpO1xuICAgICAgfVxuICAgICAgaWYgKGhhcyhvcHRzLCBcIm51bWVyaWNTZXBhcmF0b3JcIikgJiYgdHlwZW9mIG9wdHMubnVtZXJpY1NlcGFyYXRvciAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIFwibnVtZXJpY1NlcGFyYXRvclwiLCBpZiBwcm92aWRlZCwgbXVzdCBiZSBgdHJ1ZWAgb3IgYGZhbHNlYCcpO1xuICAgICAgfVxuICAgICAgdmFyIG51bWVyaWNTZXBhcmF0b3IgPSBvcHRzLm51bWVyaWNTZXBhcmF0b3I7XG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gXCJ1bmRlZmluZWRcIjtcbiAgICAgIH1cbiAgICAgIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwibnVsbFwiO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgIHJldHVybiBvYmogPyBcInRydWVcIiA6IFwiZmFsc2VcIjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBpbnNwZWN0U3RyaW5nKG9iaiwgb3B0cyk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBpZiAob2JqID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIEluZmluaXR5IC8gb2JqID4gMCA/IFwiMFwiIDogXCItMFwiO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdHIgPSBTdHJpbmcob2JqKTtcbiAgICAgICAgcmV0dXJuIG51bWVyaWNTZXBhcmF0b3IgPyBhZGROdW1lcmljU2VwYXJhdG9yKG9iaiwgc3RyKSA6IHN0cjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcImJpZ2ludFwiKSB7XG4gICAgICAgIHZhciBiaWdJbnRTdHIgPSBTdHJpbmcob2JqKSArIFwiblwiO1xuICAgICAgICByZXR1cm4gbnVtZXJpY1NlcGFyYXRvciA/IGFkZE51bWVyaWNTZXBhcmF0b3Iob2JqLCBiaWdJbnRTdHIpIDogYmlnSW50U3RyO1xuICAgICAgfVxuICAgICAgdmFyIG1heERlcHRoID0gdHlwZW9mIG9wdHMuZGVwdGggPT09IFwidW5kZWZpbmVkXCIgPyA1IDogb3B0cy5kZXB0aDtcbiAgICAgIGlmICh0eXBlb2YgZGVwdGggPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgZGVwdGggPSAwO1xuICAgICAgfVxuICAgICAgaWYgKGRlcHRoID49IG1heERlcHRoICYmIG1heERlcHRoID4gMCAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5KG9iaikgPyBcIltBcnJheV1cIiA6IFwiW09iamVjdF1cIjtcbiAgICAgIH1cbiAgICAgIHZhciBpbmRlbnQgPSBnZXRJbmRlbnQob3B0cywgZGVwdGgpO1xuICAgICAgaWYgKHR5cGVvZiBzZWVuID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHNlZW4gPSBbXTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXhPZihzZWVuLCBvYmopID49IDApIHtcbiAgICAgICAgcmV0dXJuIFwiW0NpcmN1bGFyXVwiO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gaW5zcGVjdDModmFsdWUsIGZyb20sIG5vSW5kZW50KSB7XG4gICAgICAgIGlmIChmcm9tKSB7XG4gICAgICAgICAgc2VlbiA9ICRhcnJTbGljZS5jYWxsKHNlZW4pO1xuICAgICAgICAgIHNlZW4ucHVzaChmcm9tKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9JbmRlbnQpIHtcbiAgICAgICAgICB2YXIgbmV3T3B0cyA9IHtcbiAgICAgICAgICAgIGRlcHRoOiBvcHRzLmRlcHRoXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoaGFzKG9wdHMsIFwicXVvdGVTdHlsZVwiKSkge1xuICAgICAgICAgICAgbmV3T3B0cy5xdW90ZVN0eWxlID0gb3B0cy5xdW90ZVN0eWxlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaW5zcGVjdF8odmFsdWUsIG5ld09wdHMsIGRlcHRoICsgMSwgc2Vlbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluc3BlY3RfKHZhbHVlLCBvcHRzLCBkZXB0aCArIDEsIHNlZW4pO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiAmJiAhaXNSZWdFeHAob2JqKSkge1xuICAgICAgICB2YXIgbmFtZSA9IG5hbWVPZihvYmopO1xuICAgICAgICB2YXIga2V5cyA9IGFyck9iaktleXMob2JqLCBpbnNwZWN0Myk7XG4gICAgICAgIHJldHVybiBcIltGdW5jdGlvblwiICsgKG5hbWUgPyBcIjogXCIgKyBuYW1lIDogXCIgKGFub255bW91cylcIikgKyBcIl1cIiArIChrZXlzLmxlbmd0aCA+IDAgPyBcIiB7IFwiICsgJGpvaW4uY2FsbChrZXlzLCBcIiwgXCIpICsgXCIgfVwiIDogXCJcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXNTeW1ib2wob2JqKSkge1xuICAgICAgICB2YXIgc3ltU3RyaW5nID0gaGFzU2hhbW1lZFN5bWJvbHMgPyAkcmVwbGFjZS5jYWxsKFN0cmluZyhvYmopLCAvXihTeW1ib2xcXCguKlxcKSlfW14pXSokLywgXCIkMVwiKSA6IHN5bVRvU3RyaW5nLmNhbGwob2JqKTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgIWhhc1NoYW1tZWRTeW1ib2xzID8gbWFya0JveGVkKHN5bVN0cmluZykgOiBzeW1TdHJpbmc7XG4gICAgICB9XG4gICAgICBpZiAoaXNFbGVtZW50KG9iaikpIHtcbiAgICAgICAgdmFyIHMgPSBcIjxcIiArICR0b0xvd2VyQ2FzZS5jYWxsKFN0cmluZyhvYmoubm9kZU5hbWUpKTtcbiAgICAgICAgdmFyIGF0dHJzID0gb2JqLmF0dHJpYnV0ZXMgfHwgW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBzICs9IFwiIFwiICsgYXR0cnNbaV0ubmFtZSArIFwiPVwiICsgd3JhcFF1b3RlcyhxdW90ZShhdHRyc1tpXS52YWx1ZSksIFwiZG91YmxlXCIsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIHMgKz0gXCI+XCI7XG4gICAgICAgIGlmIChvYmouY2hpbGROb2RlcyAmJiBvYmouY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICBzICs9IFwiLi4uXCI7XG4gICAgICAgIH1cbiAgICAgICAgcyArPSBcIjwvXCIgKyAkdG9Mb3dlckNhc2UuY2FsbChTdHJpbmcob2JqLm5vZGVOYW1lKSkgKyBcIj5cIjtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgICB9XG4gICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgIGlmIChvYmoubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIFwiW11cIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgeHMgPSBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdDMpO1xuICAgICAgICBpZiAoaW5kZW50ICYmICFzaW5nbGVMaW5lVmFsdWVzKHhzKSkge1xuICAgICAgICAgIHJldHVybiBcIltcIiArIGluZGVudGVkSm9pbih4cywgaW5kZW50KSArIFwiXVwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlsgXCIgKyAkam9pbi5jYWxsKHhzLCBcIiwgXCIpICsgXCIgXVwiO1xuICAgICAgfVxuICAgICAgaWYgKGlzRXJyb3Iob2JqKSkge1xuICAgICAgICB2YXIgcGFydHMgPSBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdDMpO1xuICAgICAgICBpZiAoIShcImNhdXNlXCIgaW4gRXJyb3IucHJvdG90eXBlKSAmJiBcImNhdXNlXCIgaW4gb2JqICYmICFpc0VudW1lcmFibGUuY2FsbChvYmosIFwiY2F1c2VcIikpIHtcbiAgICAgICAgICByZXR1cm4gXCJ7IFtcIiArIFN0cmluZyhvYmopICsgXCJdIFwiICsgJGpvaW4uY2FsbCgkY29uY2F0LmNhbGwoXCJbY2F1c2VdOiBcIiArIGluc3BlY3QzKG9iai5jYXVzZSksIHBhcnRzKSwgXCIsIFwiKSArIFwiIH1cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIFwiW1wiICsgU3RyaW5nKG9iaikgKyBcIl1cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJ7IFtcIiArIFN0cmluZyhvYmopICsgXCJdIFwiICsgJGpvaW4uY2FsbChwYXJ0cywgXCIsIFwiKSArIFwiIH1cIjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmIGN1c3RvbUluc3BlY3QpIHtcbiAgICAgICAgaWYgKGluc3BlY3RTeW1ib2wgJiYgdHlwZW9mIG9ialtpbnNwZWN0U3ltYm9sXSA9PT0gXCJmdW5jdGlvblwiICYmIHV0aWxJbnNwZWN0KSB7XG4gICAgICAgICAgcmV0dXJuIHV0aWxJbnNwZWN0KG9iaiwgeyBkZXB0aDogbWF4RGVwdGggLSBkZXB0aCB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXN0b21JbnNwZWN0ICE9PSBcInN5bWJvbFwiICYmIHR5cGVvZiBvYmouaW5zcGVjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIG9iai5pbnNwZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpc01hcChvYmopKSB7XG4gICAgICAgIHZhciBtYXBQYXJ0cyA9IFtdO1xuICAgICAgICBpZiAobWFwRm9yRWFjaCkge1xuICAgICAgICAgIG1hcEZvckVhY2guY2FsbChvYmosIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIG1hcFBhcnRzLnB1c2goaW5zcGVjdDMoa2V5LCBvYmosIHRydWUpICsgXCIgPT4gXCIgKyBpbnNwZWN0Myh2YWx1ZSwgb2JqKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25PZihcIk1hcFwiLCBtYXBTaXplLmNhbGwob2JqKSwgbWFwUGFydHMsIGluZGVudCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNTZXQob2JqKSkge1xuICAgICAgICB2YXIgc2V0UGFydHMgPSBbXTtcbiAgICAgICAgaWYgKHNldEZvckVhY2gpIHtcbiAgICAgICAgICBzZXRGb3JFYWNoLmNhbGwob2JqLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgc2V0UGFydHMucHVzaChpbnNwZWN0Myh2YWx1ZSwgb2JqKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25PZihcIlNldFwiLCBzZXRTaXplLmNhbGwob2JqKSwgc2V0UGFydHMsIGluZGVudCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNXZWFrTWFwKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIHdlYWtDb2xsZWN0aW9uT2YoXCJXZWFrTWFwXCIpO1xuICAgICAgfVxuICAgICAgaWYgKGlzV2Vha1NldChvYmopKSB7XG4gICAgICAgIHJldHVybiB3ZWFrQ29sbGVjdGlvbk9mKFwiV2Vha1NldFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1dlYWtSZWYob2JqKSkge1xuICAgICAgICByZXR1cm4gd2Vha0NvbGxlY3Rpb25PZihcIldlYWtSZWZcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXNOdW1iZXIob2JqKSkge1xuICAgICAgICByZXR1cm4gbWFya0JveGVkKGluc3BlY3QzKE51bWJlcihvYmopKSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNCaWdJbnQob2JqKSkge1xuICAgICAgICByZXR1cm4gbWFya0JveGVkKGluc3BlY3QzKGJpZ0ludFZhbHVlT2YuY2FsbChvYmopKSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNCb29sZWFuKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChib29sZWFuVmFsdWVPZi5jYWxsKG9iaikpO1xuICAgICAgfVxuICAgICAgaWYgKGlzU3RyaW5nKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChpbnNwZWN0MyhTdHJpbmcob2JqKSkpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgb2JqID09PSB3aW5kb3cpIHtcbiAgICAgICAgcmV0dXJuIFwieyBbb2JqZWN0IFdpbmRvd10gfVwiO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiICYmIG9iaiA9PT0gZ2xvYmFsVGhpcyB8fCB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIG9iaiA9PT0gZ2xvYmFsKSB7XG4gICAgICAgIHJldHVybiBcInsgW29iamVjdCBnbG9iYWxUaGlzXSB9XCI7XG4gICAgICB9XG4gICAgICBpZiAoIWlzRGF0ZShvYmopICYmICFpc1JlZ0V4cChvYmopKSB7XG4gICAgICAgIHZhciB5cyA9IGFyck9iaktleXMob2JqLCBpbnNwZWN0Myk7XG4gICAgICAgIHZhciBpc1BsYWluT2JqZWN0ID0gZ1BPID8gZ1BPKG9iaikgPT09IE9iamVjdC5wcm90b3R5cGUgOiBvYmogaW5zdGFuY2VvZiBPYmplY3QgfHwgb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG4gICAgICAgIHZhciBwcm90b1RhZyA9IG9iaiBpbnN0YW5jZW9mIE9iamVjdCA/IFwiXCIgOiBcIm51bGwgcHJvdG90eXBlXCI7XG4gICAgICAgIHZhciBzdHJpbmdUYWcgPSAhaXNQbGFpbk9iamVjdCAmJiB0b1N0cmluZ1RhZyAmJiBPYmplY3Qob2JqKSA9PT0gb2JqICYmIHRvU3RyaW5nVGFnIGluIG9iaiA/ICRzbGljZS5jYWxsKHRvU3RyKG9iaiksIDgsIC0xKSA6IHByb3RvVGFnID8gXCJPYmplY3RcIiA6IFwiXCI7XG4gICAgICAgIHZhciBjb25zdHJ1Y3RvclRhZyA9IGlzUGxhaW5PYmplY3QgfHwgdHlwZW9mIG9iai5jb25zdHJ1Y3RvciAhPT0gXCJmdW5jdGlvblwiID8gXCJcIiA6IG9iai5jb25zdHJ1Y3Rvci5uYW1lID8gb2JqLmNvbnN0cnVjdG9yLm5hbWUgKyBcIiBcIiA6IFwiXCI7XG4gICAgICAgIHZhciB0YWcgPSBjb25zdHJ1Y3RvclRhZyArIChzdHJpbmdUYWcgfHwgcHJvdG9UYWcgPyBcIltcIiArICRqb2luLmNhbGwoJGNvbmNhdC5jYWxsKFtdLCBzdHJpbmdUYWcgfHwgW10sIHByb3RvVGFnIHx8IFtdKSwgXCI6IFwiKSArIFwiXSBcIiA6IFwiXCIpO1xuICAgICAgICBpZiAoeXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRhZyArIFwie31cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHRhZyArIFwie1wiICsgaW5kZW50ZWRKb2luKHlzLCBpbmRlbnQpICsgXCJ9XCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhZyArIFwieyBcIiArICRqb2luLmNhbGwoeXMsIFwiLCBcIikgKyBcIiB9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gU3RyaW5nKG9iaik7XG4gICAgfTtcbiAgICBmdW5jdGlvbiB3cmFwUXVvdGVzKHMsIGRlZmF1bHRTdHlsZSwgb3B0cykge1xuICAgICAgdmFyIHN0eWxlID0gb3B0cy5xdW90ZVN0eWxlIHx8IGRlZmF1bHRTdHlsZTtcbiAgICAgIHZhciBxdW90ZUNoYXIgPSBxdW90ZXNbc3R5bGVdO1xuICAgICAgcmV0dXJuIHF1b3RlQ2hhciArIHMgKyBxdW90ZUNoYXI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHF1b3RlKHMpIHtcbiAgICAgIHJldHVybiAkcmVwbGFjZS5jYWxsKFN0cmluZyhzKSwgL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjYW5UcnVzdFRvU3RyaW5nKG9iaikge1xuICAgICAgcmV0dXJuICF0b1N0cmluZ1RhZyB8fCAhKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgKHRvU3RyaW5nVGFnIGluIG9iaiB8fCB0eXBlb2Ygb2JqW3RvU3RyaW5nVGFnXSAhPT0gXCJ1bmRlZmluZWRcIikpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0FycmF5KG9iaikge1xuICAgICAgcmV0dXJuIHRvU3RyKG9iaikgPT09IFwiW29iamVjdCBBcnJheV1cIiAmJiBjYW5UcnVzdFRvU3RyaW5nKG9iaik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzRGF0ZShvYmopIHtcbiAgICAgIHJldHVybiB0b1N0cihvYmopID09PSBcIltvYmplY3QgRGF0ZV1cIiAmJiBjYW5UcnVzdFRvU3RyaW5nKG9iaik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICAgICAgcmV0dXJuIHRvU3RyKG9iaikgPT09IFwiW29iamVjdCBSZWdFeHBdXCIgJiYgY2FuVHJ1c3RUb1N0cmluZyhvYmopO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0Vycm9yKG9iaikge1xuICAgICAgcmV0dXJuIHRvU3RyKG9iaikgPT09IFwiW29iamVjdCBFcnJvcl1cIiAmJiBjYW5UcnVzdFRvU3RyaW5nKG9iaik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzU3RyaW5nKG9iaikge1xuICAgICAgcmV0dXJuIHRvU3RyKG9iaikgPT09IFwiW29iamVjdCBTdHJpbmddXCIgJiYgY2FuVHJ1c3RUb1N0cmluZyhvYmopO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc051bWJlcihvYmopIHtcbiAgICAgIHJldHVybiB0b1N0cihvYmopID09PSBcIltvYmplY3QgTnVtYmVyXVwiICYmIGNhblRydXN0VG9TdHJpbmcob2JqKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNCb29sZWFuKG9iaikge1xuICAgICAgcmV0dXJuIHRvU3RyKG9iaikgPT09IFwiW29iamVjdCBCb29sZWFuXVwiICYmIGNhblRydXN0VG9TdHJpbmcob2JqKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNTeW1ib2wob2JqKSB7XG4gICAgICBpZiAoaGFzU2hhbW1lZFN5bWJvbHMpIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmIG9iaiBpbnN0YW5jZW9mIFN5bWJvbDtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcInN5bWJvbFwiKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIiB8fCAhc3ltVG9TdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgc3ltVG9TdHJpbmcuY2FsbChvYmopO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNCaWdJbnQob2JqKSB7XG4gICAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiIHx8ICFiaWdJbnRWYWx1ZU9mKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGJpZ0ludFZhbHVlT2YuY2FsbChvYmopO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGhhc093bjIgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5IHx8IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGtleSBpbiB0aGlzO1xuICAgIH07XG4gICAgZnVuY3Rpb24gaGFzKG9iaiwga2V5KSB7XG4gICAgICByZXR1cm4gaGFzT3duMi5jYWxsKG9iaiwga2V5KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9TdHIob2JqKSB7XG4gICAgICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbChvYmopO1xuICAgIH1cbiAgICBmdW5jdGlvbiBuYW1lT2YoZikge1xuICAgICAgaWYgKGYubmFtZSkge1xuICAgICAgICByZXR1cm4gZi5uYW1lO1xuICAgICAgfVxuICAgICAgdmFyIG0gPSAkbWF0Y2guY2FsbChmdW5jdGlvblRvU3RyaW5nLmNhbGwoZiksIC9eZnVuY3Rpb25cXHMqKFtcXHckXSspLyk7XG4gICAgICBpZiAobSkge1xuICAgICAgICByZXR1cm4gbVsxXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbmRleE9mKHhzLCB4KSB7XG4gICAgICBpZiAoeHMuaW5kZXhPZikge1xuICAgICAgICByZXR1cm4geHMuaW5kZXhPZih4KTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0geHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmICh4c1tpXSA9PT0geCkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTWFwKHgpIHtcbiAgICAgIGlmICghbWFwU2l6ZSB8fCAheCB8fCB0eXBlb2YgeCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBtYXBTaXplLmNhbGwoeCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc2V0U2l6ZS5jYWxsKHgpO1xuICAgICAgICB9IGNhdGNoIChzKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHggaW5zdGFuY2VvZiBNYXA7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzV2Vha01hcCh4KSB7XG4gICAgICBpZiAoIXdlYWtNYXBIYXMgfHwgIXggfHwgdHlwZW9mIHggIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgd2Vha01hcEhhcy5jYWxsKHgsIHdlYWtNYXBIYXMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHdlYWtTZXRIYXMuY2FsbCh4LCB3ZWFrU2V0SGFzKTtcbiAgICAgICAgfSBjYXRjaCAocykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgV2Vha01hcDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNXZWFrUmVmKHgpIHtcbiAgICAgIGlmICghd2Vha1JlZkRlcmVmIHx8ICF4IHx8IHR5cGVvZiB4ICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHdlYWtSZWZEZXJlZi5jYWxsKHgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNTZXQoeCkge1xuICAgICAgaWYgKCFzZXRTaXplIHx8ICF4IHx8IHR5cGVvZiB4ICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHNldFNpemUuY2FsbCh4KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBtYXBTaXplLmNhbGwoeCk7XG4gICAgICAgIH0gY2F0Y2ggKG0pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geCBpbnN0YW5jZW9mIFNldDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNXZWFrU2V0KHgpIHtcbiAgICAgIGlmICghd2Vha1NldEhhcyB8fCAheCB8fCB0eXBlb2YgeCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICB3ZWFrU2V0SGFzLmNhbGwoeCwgd2Vha1NldEhhcyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgd2Vha01hcEhhcy5jYWxsKHgsIHdlYWtNYXBIYXMpO1xuICAgICAgICB9IGNhdGNoIChzKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHggaW5zdGFuY2VvZiBXZWFrU2V0O1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0VsZW1lbnQoeCkge1xuICAgICAgaWYgKCF4IHx8IHR5cGVvZiB4ICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgSFRNTEVsZW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgeCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHR5cGVvZiB4Lm5vZGVOYW1lID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiB4LmdldEF0dHJpYnV0ZSA9PT0gXCJmdW5jdGlvblwiO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbnNwZWN0U3RyaW5nKHN0ciwgb3B0cykge1xuICAgICAgaWYgKHN0ci5sZW5ndGggPiBvcHRzLm1heFN0cmluZ0xlbmd0aCkge1xuICAgICAgICB2YXIgcmVtYWluaW5nID0gc3RyLmxlbmd0aCAtIG9wdHMubWF4U3RyaW5nTGVuZ3RoO1xuICAgICAgICB2YXIgdHJhaWxlciA9IFwiLi4uIFwiICsgcmVtYWluaW5nICsgXCIgbW9yZSBjaGFyYWN0ZXJcIiArIChyZW1haW5pbmcgPiAxID8gXCJzXCIgOiBcIlwiKTtcbiAgICAgICAgcmV0dXJuIGluc3BlY3RTdHJpbmcoJHNsaWNlLmNhbGwoc3RyLCAwLCBvcHRzLm1heFN0cmluZ0xlbmd0aCksIG9wdHMpICsgdHJhaWxlcjtcbiAgICAgIH1cbiAgICAgIHZhciBxdW90ZVJFID0gcXVvdGVSRXNbb3B0cy5xdW90ZVN0eWxlIHx8IFwic2luZ2xlXCJdO1xuICAgICAgcXVvdGVSRS5sYXN0SW5kZXggPSAwO1xuICAgICAgdmFyIHMgPSAkcmVwbGFjZS5jYWxsKCRyZXBsYWNlLmNhbGwoc3RyLCBxdW90ZVJFLCBcIlxcXFwkMVwiKSwgL1tcXHgwMC1cXHgxZl0vZywgbG93Ynl0ZSk7XG4gICAgICByZXR1cm4gd3JhcFF1b3RlcyhzLCBcInNpbmdsZVwiLCBvcHRzKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbG93Ynl0ZShjKSB7XG4gICAgICB2YXIgbiA9IGMuY2hhckNvZGVBdCgwKTtcbiAgICAgIHZhciB4ID0ge1xuICAgICAgICA4OiBcImJcIixcbiAgICAgICAgOTogXCJ0XCIsXG4gICAgICAgIDEwOiBcIm5cIixcbiAgICAgICAgMTI6IFwiZlwiLFxuICAgICAgICAxMzogXCJyXCJcbiAgICAgIH1bbl07XG4gICAgICBpZiAoeCkge1xuICAgICAgICByZXR1cm4gXCJcXFxcXCIgKyB4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIFwiXFxcXHhcIiArIChuIDwgMTYgPyBcIjBcIiA6IFwiXCIpICsgJHRvVXBwZXJDYXNlLmNhbGwobi50b1N0cmluZygxNikpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtYXJrQm94ZWQoc3RyKSB7XG4gICAgICByZXR1cm4gXCJPYmplY3QoXCIgKyBzdHIgKyBcIilcIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gd2Vha0NvbGxlY3Rpb25PZih0eXBlKSB7XG4gICAgICByZXR1cm4gdHlwZSArIFwiIHsgPyB9XCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbGxlY3Rpb25PZih0eXBlLCBzaXplLCBlbnRyaWVzLCBpbmRlbnQpIHtcbiAgICAgIHZhciBqb2luZWRFbnRyaWVzID0gaW5kZW50ID8gaW5kZW50ZWRKb2luKGVudHJpZXMsIGluZGVudCkgOiAkam9pbi5jYWxsKGVudHJpZXMsIFwiLCBcIik7XG4gICAgICByZXR1cm4gdHlwZSArIFwiIChcIiArIHNpemUgKyBcIikge1wiICsgam9pbmVkRW50cmllcyArIFwifVwiO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzaW5nbGVMaW5lVmFsdWVzKHhzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpbmRleE9mKHhzW2ldLCBcIlxcblwiKSA+PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0SW5kZW50KG9wdHMsIGRlcHRoKSB7XG4gICAgICB2YXIgYmFzZUluZGVudDtcbiAgICAgIGlmIChvcHRzLmluZGVudCA9PT0gXCJcdFwiKSB7XG4gICAgICAgIGJhc2VJbmRlbnQgPSBcIlx0XCI7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLmluZGVudCA9PT0gXCJudW1iZXJcIiAmJiBvcHRzLmluZGVudCA+IDApIHtcbiAgICAgICAgYmFzZUluZGVudCA9ICRqb2luLmNhbGwoQXJyYXkob3B0cy5pbmRlbnQgKyAxKSwgXCIgXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBiYXNlOiBiYXNlSW5kZW50LFxuICAgICAgICBwcmV2OiAkam9pbi5jYWxsKEFycmF5KGRlcHRoICsgMSksIGJhc2VJbmRlbnQpXG4gICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbmRlbnRlZEpvaW4oeHMsIGluZGVudCkge1xuICAgICAgaWYgKHhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIH1cbiAgICAgIHZhciBsaW5lSm9pbmVyID0gXCJcXG5cIiArIGluZGVudC5wcmV2ICsgaW5kZW50LmJhc2U7XG4gICAgICByZXR1cm4gbGluZUpvaW5lciArICRqb2luLmNhbGwoeHMsIFwiLFwiICsgbGluZUpvaW5lcikgKyBcIlxcblwiICsgaW5kZW50LnByZXY7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFyck9iaktleXMob2JqLCBpbnNwZWN0Mykge1xuICAgICAgdmFyIGlzQXJyID0gaXNBcnJheShvYmopO1xuICAgICAgdmFyIHhzID0gW107XG4gICAgICBpZiAoaXNBcnIpIHtcbiAgICAgICAgeHMubGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB4c1tpXSA9IGhhcyhvYmosIGkpID8gaW5zcGVjdDMob2JqW2ldLCBvYmopIDogXCJcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHN5bXMgPSB0eXBlb2YgZ09QUyA9PT0gXCJmdW5jdGlvblwiID8gZ09QUyhvYmopIDogW107XG4gICAgICB2YXIgc3ltTWFwO1xuICAgICAgaWYgKGhhc1NoYW1tZWRTeW1ib2xzKSB7XG4gICAgICAgIHN5bU1hcCA9IHt9O1xuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHN5bXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICBzeW1NYXBbXCIkXCIgKyBzeW1zW2tdXSA9IHN5bXNba107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKCFoYXMob2JqLCBrZXkpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyICYmIFN0cmluZyhOdW1iZXIoa2V5KSkgPT09IGtleSAmJiBrZXkgPCBvYmoubGVuZ3RoKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc1NoYW1tZWRTeW1ib2xzICYmIHN5bU1hcFtcIiRcIiArIGtleV0gaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIGlmICgkdGVzdC5jYWxsKC9bXlxcdyRdLywga2V5KSkge1xuICAgICAgICAgIHhzLnB1c2goaW5zcGVjdDMoa2V5LCBvYmopICsgXCI6IFwiICsgaW5zcGVjdDMob2JqW2tleV0sIG9iaikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHhzLnB1c2goa2V5ICsgXCI6IFwiICsgaW5zcGVjdDMob2JqW2tleV0sIG9iaikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGdPUFMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN5bXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAoaXNFbnVtZXJhYmxlLmNhbGwob2JqLCBzeW1zW2pdKSkge1xuICAgICAgICAgICAgeHMucHVzaChcIltcIiArIGluc3BlY3QzKHN5bXNbal0pICsgXCJdOiBcIiArIGluc3BlY3QzKG9ialtzeW1zW2pdXSwgb2JqKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4geHM7XG4gICAgfVxuICB9XG59KTtcblxuLy8gc3JjL2xpYi90aW1lX2R1cmF0aW9uLnRzXG52YXIgVGltZUR1cmF0aW9uID0gY2xhc3MgX1RpbWVEdXJhdGlvbiB7XG4gIF9fdGltZV9kdXJhdGlvbl9taWNyb3NfXztcbiAgc3RhdGljIE1JQ1JPU19QRVJfTUlMTElTID0gMTAwMG47XG4gIC8qKlxuICAgKiBHZXQgdGhlIGFsZ2VicmFpYyB0eXBlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB7QGxpbmsgVGltZUR1cmF0aW9ufSB0eXBlLlxuICAgKiBAcmV0dXJucyBUaGUgYWxnZWJyYWljIHR5cGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHR5cGUuXG4gICAqL1xuICBzdGF0aWMgZ2V0QWxnZWJyYWljVHlwZSgpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHtcbiAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcIl9fdGltZV9kdXJhdGlvbl9taWNyb3NfX1wiLFxuICAgICAgICAgIGFsZ2VicmFpY1R5cGU6IEFsZ2VicmFpY1R5cGUuSTY0XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfVxuICBzdGF0aWMgaXNUaW1lRHVyYXRpb24oYWxnZWJyYWljVHlwZSkge1xuICAgIGlmIChhbGdlYnJhaWNUeXBlLnRhZyAhPT0gXCJQcm9kdWN0XCIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZWxlbWVudHMgPSBhbGdlYnJhaWNUeXBlLnZhbHVlLmVsZW1lbnRzO1xuICAgIGlmIChlbGVtZW50cy5sZW5ndGggIT09IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgbWljcm9zRWxlbWVudCA9IGVsZW1lbnRzWzBdO1xuICAgIHJldHVybiBtaWNyb3NFbGVtZW50Lm5hbWUgPT09IFwiX190aW1lX2R1cmF0aW9uX21pY3Jvc19fXCIgJiYgbWljcm9zRWxlbWVudC5hbGdlYnJhaWNUeXBlLnRhZyA9PT0gXCJJNjRcIjtcbiAgfVxuICBnZXQgbWljcm9zKCkge1xuICAgIHJldHVybiB0aGlzLl9fdGltZV9kdXJhdGlvbl9taWNyb3NfXztcbiAgfVxuICBnZXQgbWlsbGlzKCkge1xuICAgIHJldHVybiBOdW1iZXIodGhpcy5taWNyb3MgLyBfVGltZUR1cmF0aW9uLk1JQ1JPU19QRVJfTUlMTElTKTtcbiAgfVxuICBjb25zdHJ1Y3RvcihtaWNyb3MpIHtcbiAgICB0aGlzLl9fdGltZV9kdXJhdGlvbl9taWNyb3NfXyA9IG1pY3JvcztcbiAgfVxuICBzdGF0aWMgZnJvbU1pbGxpcyhtaWxsaXMpIHtcbiAgICByZXR1cm4gbmV3IF9UaW1lRHVyYXRpb24oQmlnSW50KG1pbGxpcykgKiBfVGltZUR1cmF0aW9uLk1JQ1JPU19QRVJfTUlMTElTKTtcbiAgfVxuICAvKiogVGhpcyBvdXRwdXRzIHRoZSBzYW1lIHN0cmluZyBmb3JtYXQgdGhhdCB3ZSB1c2UgaW4gdGhlIGhvc3QgYW5kIGluIFJ1c3QgbW9kdWxlcyAqL1xuICB0b1N0cmluZygpIHtcbiAgICBjb25zdCBtaWNyb3MgPSB0aGlzLm1pY3JvcztcbiAgICBjb25zdCBzaWduID0gbWljcm9zIDwgMCA/IFwiLVwiIDogXCIrXCI7XG4gICAgY29uc3QgcG9zID0gbWljcm9zIDwgMCA/IC1taWNyb3MgOiBtaWNyb3M7XG4gICAgY29uc3Qgc2VjcyA9IHBvcyAvIDEwMDAwMDBuO1xuICAgIGNvbnN0IG1pY3Jvc19yZW1haW5pbmcgPSBwb3MgJSAxMDAwMDAwbjtcbiAgICByZXR1cm4gYCR7c2lnbn0ke3NlY3N9LiR7U3RyaW5nKG1pY3Jvc19yZW1haW5pbmcpLnBhZFN0YXJ0KDYsIFwiMFwiKX1gO1xuICB9XG59O1xuXG4vLyBzcmMvbGliL3RpbWVzdGFtcC50c1xudmFyIFRpbWVzdGFtcCA9IGNsYXNzIF9UaW1lc3RhbXAge1xuICBfX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fO1xuICBzdGF0aWMgTUlDUk9TX1BFUl9NSUxMSVMgPSAxMDAwbjtcbiAgZ2V0IG1pY3Jvc1NpbmNlVW5peEVwb2NoKCkge1xuICAgIHJldHVybiB0aGlzLl9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX187XG4gIH1cbiAgY29uc3RydWN0b3IobWljcm9zKSB7XG4gICAgdGhpcy5fX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fID0gbWljcm9zO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgdGhlIGFsZ2VicmFpYyB0eXBlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB7QGxpbmsgVGltZXN0YW1wfSB0eXBlLlxuICAgKiBAcmV0dXJucyBUaGUgYWxnZWJyYWljIHR5cGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHR5cGUuXG4gICAqL1xuICBzdGF0aWMgZ2V0QWxnZWJyYWljVHlwZSgpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHtcbiAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcIl9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX19cIixcbiAgICAgICAgICBhbGdlYnJhaWNUeXBlOiBBbGdlYnJhaWNUeXBlLkk2NFxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG4gIH1cbiAgc3RhdGljIGlzVGltZXN0YW1wKGFsZ2VicmFpY1R5cGUpIHtcbiAgICBpZiAoYWxnZWJyYWljVHlwZS50YWcgIT09IFwiUHJvZHVjdFwiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGVsZW1lbnRzID0gYWxnZWJyYWljVHlwZS52YWx1ZS5lbGVtZW50cztcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoICE9PSAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IG1pY3Jvc0VsZW1lbnQgPSBlbGVtZW50c1swXTtcbiAgICByZXR1cm4gbWljcm9zRWxlbWVudC5uYW1lID09PSBcIl9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX19cIiAmJiBtaWNyb3NFbGVtZW50LmFsZ2VicmFpY1R5cGUudGFnID09PSBcIkk2NFwiO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgVW5peCBlcG9jaCwgdGhlIG1pZG5pZ2h0IGF0IHRoZSBiZWdpbm5pbmcgb2YgSmFudWFyeSAxLCAxOTcwLCBVVEMuXG4gICAqL1xuICBzdGF0aWMgVU5JWF9FUE9DSCA9IG5ldyBfVGltZXN0YW1wKDBuKTtcbiAgLyoqXG4gICAqIEdldCBhIGBUaW1lc3RhbXBgIHJlcHJlc2VudGluZyB0aGUgZXhlY3V0aW9uIGVudmlyb25tZW50J3MgYmVsaWVmIG9mIHRoZSBjdXJyZW50IG1vbWVudCBpbiB0aW1lLlxuICAgKi9cbiAgc3RhdGljIG5vdygpIHtcbiAgICByZXR1cm4gX1RpbWVzdGFtcC5mcm9tRGF0ZSgvKiBAX19QVVJFX18gKi8gbmV3IERhdGUoKSk7XG4gIH1cbiAgLyoqIENvbnZlcnQgdG8gbWlsbGlzZWNvbmRzIHNpbmNlIFVuaXggZXBvY2guICovXG4gIHRvTWlsbGlzKCkge1xuICAgIHJldHVybiB0aGlzLm1pY3Jvc1NpbmNlVW5peEVwb2NoIC8gMTAwMG47XG4gIH1cbiAgLyoqXG4gICAqIEdldCBhIGBUaW1lc3RhbXBgIHJlcHJlc2VudGluZyB0aGUgc2FtZSBwb2ludCBpbiB0aW1lIGFzIGBkYXRlYC5cbiAgICovXG4gIHN0YXRpYyBmcm9tRGF0ZShkYXRlKSB7XG4gICAgY29uc3QgbWlsbGlzID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgY29uc3QgbWljcm9zID0gQmlnSW50KG1pbGxpcykgKiBfVGltZXN0YW1wLk1JQ1JPU19QRVJfTUlMTElTO1xuICAgIHJldHVybiBuZXcgX1RpbWVzdGFtcChtaWNyb3MpO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgYSBgRGF0ZWAgcmVwcmVzZW50aW5nIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgcG9pbnQgaW4gdGltZSBhcyBgdGhpc2AuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHRydW5jYXRlcyB0byBtaWxsaXNlY29uZCBwcmVjaXNpb24sXG4gICAqIGFuZCB0aHJvd3MgYFJhbmdlRXJyb3JgIGlmIHRoZSBgVGltZXN0YW1wYCBpcyBvdXRzaWRlIHRoZSByYW5nZSByZXByZXNlbnRhYmxlIGFzIGEgYERhdGVgLlxuICAgKi9cbiAgdG9EYXRlKCkge1xuICAgIGNvbnN0IG1pY3JvcyA9IHRoaXMuX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfXztcbiAgICBjb25zdCBtaWxsaXMgPSBtaWNyb3MgLyBfVGltZXN0YW1wLk1JQ1JPU19QRVJfTUlMTElTO1xuICAgIGlmIChtaWxsaXMgPiBCaWdJbnQoTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpIHx8IG1pbGxpcyA8IEJpZ0ludChOdW1iZXIuTUlOX1NBRkVfSU5URUdFUikpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFxuICAgICAgICBcIlRpbWVzdGFtcCBpcyBvdXRzaWRlIG9mIHRoZSByZXByZXNlbnRhYmxlIHJhbmdlIG9mIEpTJ3MgRGF0ZVwiXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERhdGUoTnVtYmVyKG1pbGxpcykpO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgYW4gSVNPIDg2MDEgLyBSRkMgMzMzOSBmb3JtYXR0ZWQgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgdGltZXN0YW1wIHdpdGggbWljcm9zZWNvbmQgcHJlY2lzaW9uLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBwcmVzZXJ2ZXMgdGhlIGZ1bGwgbWljcm9zZWNvbmQgcHJlY2lzaW9uIG9mIHRoZSB0aW1lc3RhbXAsXG4gICAqIGFuZCB0aHJvd3MgYFJhbmdlRXJyb3JgIGlmIHRoZSBgVGltZXN0YW1wYCBpcyBvdXRzaWRlIHRoZSByYW5nZSByZXByZXNlbnRhYmxlIGluIElTTyBmb3JtYXQuXG4gICAqXG4gICAqIEByZXR1cm5zIElTTyA4NjAxIGZvcm1hdHRlZCBzdHJpbmcgd2l0aCBtaWNyb3NlY29uZCBwcmVjaXNpb24gKGUuZy4sICcyMDI1LTAyLTE3VDEwOjMwOjQ1LjEyMzQ1NlonKVxuICAgKi9cbiAgdG9JU09TdHJpbmcoKSB7XG4gICAgY29uc3QgbWljcm9zID0gdGhpcy5fX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fO1xuICAgIGNvbnN0IG1pbGxpcyA9IG1pY3JvcyAvIF9UaW1lc3RhbXAuTUlDUk9TX1BFUl9NSUxMSVM7XG4gICAgaWYgKG1pbGxpcyA+IEJpZ0ludChOdW1iZXIuTUFYX1NBRkVfSU5URUdFUikgfHwgbWlsbGlzIDwgQmlnSW50KE51bWJlci5NSU5fU0FGRV9JTlRFR0VSKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXG4gICAgICAgIFwiVGltZXN0YW1wIGlzIG91dHNpZGUgb2YgdGhlIHJlcHJlc2VudGFibGUgcmFuZ2UgZm9yIElTTyBzdHJpbmcgZm9ybWF0dGluZ1wiXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoTnVtYmVyKG1pbGxpcykpO1xuICAgIGNvbnN0IGlzb0Jhc2UgPSBkYXRlLnRvSVNPU3RyaW5nKCk7XG4gICAgY29uc3QgbWljcm9zUmVtYWluZGVyID0gTWF0aC5hYnMoTnVtYmVyKG1pY3JvcyAlIDEwMDAwMDBuKSk7XG4gICAgY29uc3QgZnJhY3Rpb25hbFBhcnQgPSBTdHJpbmcobWljcm9zUmVtYWluZGVyKS5wYWRTdGFydCg2LCBcIjBcIik7XG4gICAgcmV0dXJuIGlzb0Jhc2UucmVwbGFjZSgvXFwuXFxkezN9WiQvLCBgLiR7ZnJhY3Rpb25hbFBhcnR9WmApO1xuICB9XG4gIHNpbmNlKG90aGVyKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lRHVyYXRpb24oXG4gICAgICB0aGlzLl9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX18gLSBvdGhlci5fX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fXG4gICAgKTtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi91dWlkLnRzXG52YXIgVXVpZCA9IGNsYXNzIF9VdWlkIHtcbiAgX191dWlkX187XG4gIC8qKlxuICAgKiBUaGUgbmlsIFVVSUQgKGFsbCB6ZXJvcykuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHRzXG4gICAqIGNvbnN0IHV1aWQgPSBVdWlkLk5JTDtcbiAgICogY29uc29sZS5hc3NlcnQoXG4gICAqICAgdXVpZC50b1N0cmluZygpID09PSBcIjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMFwiXG4gICAqICk7XG4gICAqIGBgYFxuICAgKi9cbiAgc3RhdGljIE5JTCA9IG5ldyBfVXVpZCgwbik7XG4gIHN0YXRpYyBNQVhfVVVJRF9CSUdJTlQgPSAweGZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmbjtcbiAgLyoqXG4gICAqIFRoZSBtYXggVVVJRCAoYWxsIG9uZXMpLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0c1xuICAgKiBjb25zdCB1dWlkID0gVXVpZC5NQVg7XG4gICAqIGNvbnNvbGUuYXNzZXJ0KFxuICAgKiAgIHV1aWQudG9TdHJpbmcoKSA9PT0gXCJmZmZmZmZmZi1mZmZmLWZmZmYtZmZmZi1mZmZmZmZmZmZmZmZcIlxuICAgKiApO1xuICAgKiBgYGBcbiAgICovXG4gIHN0YXRpYyBNQVggPSBuZXcgX1V1aWQoX1V1aWQuTUFYX1VVSURfQklHSU5UKTtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIFVVSUQgZnJvbSBhIHJhdyAxMjgtYml0IHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0gdSAtIFVuc2lnbmVkIDEyOC1iaXQgaW50ZWdlclxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHZhbHVlIGlzIG91dHNpZGUgdGhlIHZhbGlkIFVVSUQgcmFuZ2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHUpIHtcbiAgICBpZiAodSA8IDBuIHx8IHUgPiBfVXVpZC5NQVhfVVVJRF9CSUdJTlQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgVVVJRDogbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIGBNQVhfVVVJRF9CSUdJTlRgXCIpO1xuICAgIH1cbiAgICB0aGlzLl9fdXVpZF9fID0gdTtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlIGEgVVVJRCBgdjRgIGZyb20gZXhwbGljaXQgcmFuZG9tIGJ5dGVzLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBhc3N1bWVzIHRoZSBieXRlcyBhcmUgYWxyZWFkeSBzdWZmaWNpZW50bHkgcmFuZG9tLlxuICAgKiBJdCBvbmx5IHNldHMgdGhlIGFwcHJvcHJpYXRlIGJpdHMgZm9yIHRoZSBVVUlEIHZlcnNpb24gYW5kIHZhcmlhbnQuXG4gICAqXG4gICAqIEBwYXJhbSBieXRlcyAtIEV4YWN0bHkgMTYgcmFuZG9tIGJ5dGVzXG4gICAqIEByZXR1cm5zIEEgVVVJRCBgdjRgXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBgYnl0ZXMubGVuZ3RoICE9PSAxNmBcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHNcbiAgICogY29uc3QgcmFuZG9tQnl0ZXMgPSBuZXcgVWludDhBcnJheSgxNik7XG4gICAqIGNvbnN0IHV1aWQgPSBVdWlkLmZyb21SYW5kb21CeXRlc1Y0KHJhbmRvbUJ5dGVzKTtcbiAgICpcbiAgICogY29uc29sZS5hc3NlcnQoXG4gICAqICAgdXVpZC50b1N0cmluZygpID09PSBcIjAwMDAwMDAwLTAwMDAtNDAwMC04MDAwLTAwMDAwMDAwMDAwMFwiXG4gICAqICk7XG4gICAqIGBgYFxuICAgKi9cbiAgc3RhdGljIGZyb21SYW5kb21CeXRlc1Y0KGJ5dGVzKSB7XG4gICAgaWYgKGJ5dGVzLmxlbmd0aCAhPT0gMTYpIHRocm93IG5ldyBFcnJvcihcIlVVSUQgdjQgcmVxdWlyZXMgMTYgYnl0ZXNcIik7XG4gICAgY29uc3QgYXJyID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpO1xuICAgIGFycls2XSA9IGFycls2XSAmIDE1IHwgNjQ7XG4gICAgYXJyWzhdID0gYXJyWzhdICYgNjMgfCAxMjg7XG4gICAgcmV0dXJuIG5ldyBfVXVpZChfVXVpZC5ieXRlc1RvQmlnSW50KGFycikpO1xuICB9XG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIFVVSUQgYHY3YCB1c2luZyBhIG1vbm90b25pYyBjb3VudGVyIGZyb20gYDBgIHRvIGAyXjMxIC0gMWAsXG4gICAqIGEgdGltZXN0YW1wLCBhbmQgNCByYW5kb20gYnl0ZXMuXG4gICAqXG4gICAqIFRoZSBjb3VudGVyIHdyYXBzIGFyb3VuZCBvbiBvdmVyZmxvdy5cbiAgICpcbiAgICogVGhlIFVVSUQgYHY3YCBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3M6XG4gICAqXG4gICAqIGBgYGFzY2lpXG4gICAqIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuICAgKiB8IEIwICB8IEIxICB8IEIyICB8IEIzICB8IEI0ICB8IEI1ICAgICAgICAgICAgICB8ICAgICAgICAgQjYgICAgICAgIHxcbiAgICog4pSc4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSkXG4gICAqIHwgICAgICAgICAgICAgICAgIHVuaXhfdHNfbXMgICAgICAgICAgICAgICAgICAgIHwgICAgICB2ZXJzaW9uIDcgICAgfFxuICAgKiDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcbiAgICog4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG4gICAqIHwgQjcgICAgICAgICAgIHwgQjggICAgICB8IEI5ICB8IEIxMCB8IEIxMSAgfCBCMTIgfCBCMTMgfCBCMTQgfCBCMTUgfFxuICAgKiDilJzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKRcbiAgICogfCBjb3VudGVyX2hpZ2ggfCB2YXJpYW50IHwgICAgY291bnRlcl9sb3cgICB8ICAgICAgICByYW5kb20gICAgICAgICB8XG4gICAqIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIGNvdW50ZXIgLSBNdXRhYmxlIG1vbm90b25pYyBjb3VudGVyICgzMS1iaXQpXG4gICAqIEBwYXJhbSBub3cgLSBUaW1lc3RhbXAgc2luY2UgdGhlIFVuaXggZXBvY2hcbiAgICogQHBhcmFtIHJhbmRvbUJ5dGVzIC0gRXhhY3RseSA0IHJhbmRvbSBieXRlc1xuICAgKiBAcmV0dXJucyBBIFVVSUQgYHY3YFxuICAgKlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGBjb3VudGVyYCBpcyBuZWdhdGl2ZVxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGB0aW1lc3RhbXBgIGlzIGJlZm9yZSB0aGUgVW5peCBlcG9jaFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgYHJhbmRvbUJ5dGVzLmxlbmd0aCAhPT0gNGBcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHNcbiAgICogY29uc3Qgbm93ID0gVGltZXN0YW1wLmZyb21NaWxsaXMoMV82ODZfMDAwXzAwMF8wMDBuKTtcbiAgICogY29uc3QgY291bnRlciA9IHsgdmFsdWU6IDEgfTtcbiAgICogY29uc3QgcmFuZG9tQnl0ZXMgPSBuZXcgVWludDhBcnJheSg0KTtcbiAgICpcbiAgICogY29uc3QgdXVpZCA9IFV1aWQuZnJvbUNvdW50ZXJWNyhjb3VudGVyLCBub3csIHJhbmRvbUJ5dGVzKTtcbiAgICpcbiAgICogY29uc29sZS5hc3NlcnQoXG4gICAqICAgdXVpZC50b1N0cmluZygpID09PSBcIjAwMDA2NDdlLTUxODAtNzAwMC04MDAwLTAwMDIwMDAwMDAwMFwiXG4gICAqICk7XG4gICAqIGBgYFxuICAgKi9cbiAgc3RhdGljIGZyb21Db3VudGVyVjcoY291bnRlciwgbm93LCByYW5kb21CeXRlcykge1xuICAgIGlmIChyYW5kb21CeXRlcy5sZW5ndGggIT09IDQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImBmcm9tQ291bnRlclY3YCByZXF1aXJlcyBgcmFuZG9tQnl0ZXMubGVuZ3RoID09IDRgXCIpO1xuICAgIH1cbiAgICBpZiAoY291bnRlci52YWx1ZSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImBmcm9tQ291bnRlclY3YCB1dWlkIGBjb3VudGVyYCBtdXN0IGJlIG5vbi1uZWdhdGl2ZVwiKTtcbiAgICB9XG4gICAgaWYgKG5vdy5fX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYGZyb21Db3VudGVyVjdgIGB0aW1lc3RhbXBgIGJlZm9yZSB1bml4IGVwb2NoXCIpO1xuICAgIH1cbiAgICBjb25zdCBjb3VudGVyVmFsID0gY291bnRlci52YWx1ZTtcbiAgICBjb3VudGVyLnZhbHVlID0gY291bnRlclZhbCArIDEgJiAyMTQ3NDgzNjQ3O1xuICAgIGNvbnN0IHRzTXMgPSBub3cudG9NaWxsaXMoKSAmIDB4ZmZmZmZmZmZmZmZmbjtcbiAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KDE2KTtcbiAgICBieXRlc1swXSA9IE51bWJlcih0c01zID4+IDQwbiAmIDB4ZmZuKTtcbiAgICBieXRlc1sxXSA9IE51bWJlcih0c01zID4+IDMybiAmIDB4ZmZuKTtcbiAgICBieXRlc1syXSA9IE51bWJlcih0c01zID4+IDI0biAmIDB4ZmZuKTtcbiAgICBieXRlc1szXSA9IE51bWJlcih0c01zID4+IDE2biAmIDB4ZmZuKTtcbiAgICBieXRlc1s0XSA9IE51bWJlcih0c01zID4+IDhuICYgMHhmZm4pO1xuICAgIGJ5dGVzWzVdID0gTnVtYmVyKHRzTXMgJiAweGZmbik7XG4gICAgYnl0ZXNbN10gPSBjb3VudGVyVmFsID4+PiAyMyAmIDI1NTtcbiAgICBieXRlc1s5XSA9IGNvdW50ZXJWYWwgPj4+IDE1ICYgMjU1O1xuICAgIGJ5dGVzWzEwXSA9IGNvdW50ZXJWYWwgPj4+IDcgJiAyNTU7XG4gICAgYnl0ZXNbMTFdID0gKGNvdW50ZXJWYWwgJiAxMjcpIDw8IDEgJiAyNTU7XG4gICAgYnl0ZXNbMTJdIHw9IHJhbmRvbUJ5dGVzWzBdICYgMTI3O1xuICAgIGJ5dGVzWzEzXSA9IHJhbmRvbUJ5dGVzWzFdO1xuICAgIGJ5dGVzWzE0XSA9IHJhbmRvbUJ5dGVzWzJdO1xuICAgIGJ5dGVzWzE1XSA9IHJhbmRvbUJ5dGVzWzNdO1xuICAgIGJ5dGVzWzZdID0gYnl0ZXNbNl0gJiAxNSB8IDExMjtcbiAgICBieXRlc1s4XSA9IGJ5dGVzWzhdICYgNjMgfCAxMjg7XG4gICAgcmV0dXJuIG5ldyBfVXVpZChfVXVpZC5ieXRlc1RvQmlnSW50KGJ5dGVzKSk7XG4gIH1cbiAgLyoqXG4gICAqIFBhcnNlIGEgVVVJRCBmcm9tIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gcyAtIFVVSUQgc3RyaW5nXG4gICAqIEByZXR1cm5zIFBhcnNlZCBVVUlEXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgc3RyaW5nIGlzIG5vdCBhIHZhbGlkIFVVSURcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHNcbiAgICogY29uc3QgcyA9IFwiMDE4ODhkNmUtNWMwMC03MDAwLTgwMDAtMDAwMDAwMDAwMDAwXCI7XG4gICAqIGNvbnN0IHV1aWQgPSBVdWlkLnBhcnNlKHMpO1xuICAgKlxuICAgKiBjb25zb2xlLmFzc2VydCh1dWlkLnRvU3RyaW5nKCkgPT09IHMpO1xuICAgKiBgYGBcbiAgICovXG4gIHN0YXRpYyBwYXJzZShzKSB7XG4gICAgY29uc3QgaGV4ID0gcy5yZXBsYWNlKC8tL2csIFwiXCIpO1xuICAgIGlmIChoZXgubGVuZ3RoICE9PSAzMikgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBoZXggVVVJRFwiKTtcbiAgICBsZXQgdiA9IDBuO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkgKz0gMikge1xuICAgICAgdiA9IHYgPDwgOG4gfCBCaWdJbnQocGFyc2VJbnQoaGV4LnNsaWNlKGksIGkgKyAyKSwgMTYpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBfVXVpZCh2KTtcbiAgfVxuICAvKiogQ29udmVydCB0byBzdHJpbmcgKGh5cGhlbmF0ZWQgZm9ybSkuICovXG4gIHRvU3RyaW5nKCkge1xuICAgIGNvbnN0IGJ5dGVzID0gX1V1aWQuYmlnSW50VG9CeXRlcyh0aGlzLl9fdXVpZF9fKTtcbiAgICBjb25zdCBoZXggPSBbLi4uYnl0ZXNdLm1hcCgoYikgPT4gYi50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpKS5qb2luKFwiXCIpO1xuICAgIHJldHVybiBoZXguc2xpY2UoMCwgOCkgKyBcIi1cIiArIGhleC5zbGljZSg4LCAxMikgKyBcIi1cIiArIGhleC5zbGljZSgxMiwgMTYpICsgXCItXCIgKyBoZXguc2xpY2UoMTYsIDIwKSArIFwiLVwiICsgaGV4LnNsaWNlKDIwKTtcbiAgfVxuICAvKiogQ29udmVydCB0byBiaWdpbnQgKHUxMjgpLiAqL1xuICBhc0JpZ0ludCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3V1aWRfXztcbiAgfVxuICAvKiogUmV0dXJuIGEgYFVpbnQ4QXJyYXlgIG9mIDE2IGJ5dGVzLiAqL1xuICB0b0J5dGVzKCkge1xuICAgIHJldHVybiBfVXVpZC5iaWdJbnRUb0J5dGVzKHRoaXMuX191dWlkX18pO1xuICB9XG4gIHN0YXRpYyBieXRlc1RvQmlnSW50KGJ5dGVzKSB7XG4gICAgbGV0IHJlc3VsdCA9IDBuO1xuICAgIGZvciAoY29uc3QgYiBvZiBieXRlcykgcmVzdWx0ID0gcmVzdWx0IDw8IDhuIHwgQmlnSW50KGIpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgc3RhdGljIGJpZ0ludFRvQnl0ZXModmFsdWUpIHtcbiAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KDE2KTtcbiAgICBmb3IgKGxldCBpID0gMTU7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBieXRlc1tpXSA9IE51bWJlcih2YWx1ZSAmIDB4ZmZuKTtcbiAgICAgIHZhbHVlID4+PSA4bjtcbiAgICB9XG4gICAgcmV0dXJuIGJ5dGVzO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2ZXJzaW9uIG9mIHRoaXMgVVVJRC5cbiAgICpcbiAgICogVGhpcyByZXByZXNlbnRzIHRoZSBhbGdvcml0aG0gdXNlZCB0byBnZW5lcmF0ZSB0aGUgdmFsdWUuXG4gICAqXG4gICAqIEByZXR1cm5zIEEgYFV1aWRWZXJzaW9uYFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHZlcnNpb24gZmllbGQgaXMgbm90IHJlY29nbml6ZWRcbiAgICovXG4gIGdldFZlcnNpb24oKSB7XG4gICAgY29uc3QgdmVyc2lvbiA9IHRoaXMudG9CeXRlcygpWzZdID4+IDQgJiAxNTtcbiAgICBzd2l0Y2ggKHZlcnNpb24pIHtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgcmV0dXJuIFwiVjRcIjtcbiAgICAgIGNhc2UgNzpcbiAgICAgICAgcmV0dXJuIFwiVjdcIjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmICh0aGlzID09IF9VdWlkLk5JTCkge1xuICAgICAgICAgIHJldHVybiBcIk5pbFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzID09IF9VdWlkLk1BWCkge1xuICAgICAgICAgIHJldHVybiBcIk1heFwiO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgVVVJRCB2ZXJzaW9uOiAke3ZlcnNpb259YCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBFeHRyYWN0IHRoZSBtb25vdG9uaWMgY291bnRlciBmcm9tIGEgVVVJRHY3LlxuICAgKlxuICAgKiBJbnRlbmRlZCBmb3IgdGVzdGluZyBhbmQgZGlhZ25vc3RpY3MuXG4gICAqIEJlaGF2aW9yIGlzIHVuZGVmaW5lZCBpZiBjYWxsZWQgb24gYSBub24tVjcgVVVJRC5cbiAgICpcbiAgICogQHJldHVybnMgMzEtYml0IGNvdW50ZXIgdmFsdWVcbiAgICovXG4gIGdldENvdW50ZXIoKSB7XG4gICAgY29uc3QgYnl0ZXMgPSB0aGlzLnRvQnl0ZXMoKTtcbiAgICBjb25zdCBoaWdoID0gYnl0ZXNbN107XG4gICAgY29uc3QgbWlkMSA9IGJ5dGVzWzldO1xuICAgIGNvbnN0IG1pZDIgPSBieXRlc1sxMF07XG4gICAgY29uc3QgbG93ID0gYnl0ZXNbMTFdID4+PiAxO1xuICAgIHJldHVybiBoaWdoIDw8IDIzIHwgbWlkMSA8PCAxNSB8IG1pZDIgPDwgNyB8IGxvdyB8IDA7XG4gIH1cbiAgY29tcGFyZVRvKG90aGVyKSB7XG4gICAgaWYgKHRoaXMuX191dWlkX18gPCBvdGhlci5fX3V1aWRfXykgcmV0dXJuIC0xO1xuICAgIGlmICh0aGlzLl9fdXVpZF9fID4gb3RoZXIuX191dWlkX18pIHJldHVybiAxO1xuICAgIHJldHVybiAwO1xuICB9XG4gIHN0YXRpYyBnZXRBbGdlYnJhaWNUeXBlKCkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlLlByb2R1Y3Qoe1xuICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiX191dWlkX19cIixcbiAgICAgICAgICBhbGdlYnJhaWNUeXBlOiBBbGdlYnJhaWNUeXBlLlUxMjhcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9XG59O1xuXG4vLyBzcmMvbGliL2JpbmFyeV9yZWFkZXIudHNcbnZhciBCaW5hcnlSZWFkZXIgPSBjbGFzcyB7XG4gIC8qKlxuICAgKiBUaGUgRGF0YVZpZXcgdXNlZCB0byByZWFkIHZhbHVlcyBmcm9tIHRoZSBiaW5hcnkgZGF0YS5cbiAgICpcbiAgICogTm90ZTogVGhlIERhdGFWaWV3J3MgYGJ5dGVPZmZzZXRgIGlzIHJlbGF0aXZlIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlXG4gICAqIHVuZGVybHlpbmcgQXJyYXlCdWZmZXIsIG5vdCB0aGUgc3RhcnQgb2YgdGhlIHByb3ZpZGVkIFVpbnQ4QXJyYXkgaW5wdXQuXG4gICAqIFRoaXMgYEJpbmFyeVJlYWRlcmAncyBgI29mZnNldGAgZmllbGQgaXMgdXNlZCB0byB0cmFjayB0aGUgY3VycmVudCByZWFkIHBvc2l0aW9uXG4gICAqIHJlbGF0aXZlIHRvIHRoZSBzdGFydCBvZiB0aGUgcHJvdmlkZWQgVWludDhBcnJheSBpbnB1dC5cbiAgICovXG4gIHZpZXc7XG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIHRoZSBvZmZzZXQgKGluIGJ5dGVzKSByZWxhdGl2ZSB0byB0aGUgc3RhcnQgb2YgdGhlIERhdGFWaWV3XG4gICAqIGFuZCBwcm92aWRlZCBVaW50OEFycmF5IGlucHV0LlxuICAgKlxuICAgKiBOb3RlOiBUaGlzIGlzICpub3QqIHRoZSBhYnNvbHV0ZSBieXRlIG9mZnNldCB3aXRoaW4gdGhlIHVuZGVybHlpbmcgQXJyYXlCdWZmZXIuXG4gICAqL1xuICBvZmZzZXQgPSAwO1xuICBjb25zdHJ1Y3RvcihpbnB1dCkge1xuICAgIHRoaXMudmlldyA9IGlucHV0IGluc3RhbmNlb2YgRGF0YVZpZXcgPyBpbnB1dCA6IG5ldyBEYXRhVmlldyhpbnB1dC5idWZmZXIsIGlucHV0LmJ5dGVPZmZzZXQsIGlucHV0LmJ5dGVMZW5ndGgpO1xuICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgfVxuICByZXNldCh2aWV3KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLm9mZnNldCA9IDA7XG4gIH1cbiAgZ2V0IHJlbWFpbmluZygpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmJ5dGVMZW5ndGggLSB0aGlzLm9mZnNldDtcbiAgfVxuICAvKiogRW5zdXJlIHdlIGhhdmUgYXQgbGVhc3QgYG5gIGJ5dGVzIGxlZnQgdG8gcmVhZCAqL1xuICAjZW5zdXJlKG4pIHtcbiAgICBpZiAodGhpcy5vZmZzZXQgKyBuID4gdGhpcy52aWV3LmJ5dGVMZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFxuICAgICAgICBgVHJpZWQgdG8gcmVhZCAke259IGJ5dGUocykgYXQgcmVsYXRpdmUgb2Zmc2V0ICR7dGhpcy5vZmZzZXR9LCBidXQgb25seSAke3RoaXMucmVtYWluaW5nfSBieXRlKHMpIHJlbWFpbmBcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHJlYWRVSW50OEFycmF5KCkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucmVhZFUzMigpO1xuICAgIHRoaXMuI2Vuc3VyZShsZW5ndGgpO1xuICAgIHJldHVybiB0aGlzLnJlYWRCeXRlcyhsZW5ndGgpO1xuICB9XG4gIHJlYWRCb29sKCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy52aWV3LmdldFVpbnQ4KHRoaXMub2Zmc2V0KTtcbiAgICB0aGlzLm9mZnNldCArPSAxO1xuICAgIHJldHVybiB2YWx1ZSAhPT0gMDtcbiAgfVxuICByZWFkQnl0ZSgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmlldy5nZXRVaW50OCh0aGlzLm9mZnNldCk7XG4gICAgdGhpcy5vZmZzZXQgKz0gMTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmVhZEJ5dGVzKGxlbmd0aCkge1xuICAgIGNvbnN0IGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoXG4gICAgICB0aGlzLnZpZXcuYnVmZmVyLFxuICAgICAgdGhpcy52aWV3LmJ5dGVPZmZzZXQgKyB0aGlzLm9mZnNldCxcbiAgICAgIGxlbmd0aFxuICAgICk7XG4gICAgdGhpcy5vZmZzZXQgKz0gbGVuZ3RoO1xuICAgIHJldHVybiBhcnJheTtcbiAgfVxuICByZWFkSTgoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0SW50OCh0aGlzLm9mZnNldCk7XG4gICAgdGhpcy5vZmZzZXQgKz0gMTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmVhZFU4KCkge1xuICAgIHJldHVybiB0aGlzLnJlYWRCeXRlKCk7XG4gIH1cbiAgcmVhZEkxNigpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmlldy5nZXRJbnQxNih0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gMjtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmVhZFUxNigpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmlldy5nZXRVaW50MTYodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDI7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJlYWRJMzIoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0SW50MzIodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDQ7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJlYWRVMzIoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0VWludDMyKHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA0O1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZWFkSTY0KCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy52aWV3LmdldEJpZ0ludDY0KHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA4O1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZWFkVTY0KCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy52aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gODtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmVhZFUxMjgoKSB7XG4gICAgY29uc3QgbG93ZXJQYXJ0ID0gdGhpcy52aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgY29uc3QgdXBwZXJQYXJ0ID0gdGhpcy52aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDgsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDE2O1xuICAgIHJldHVybiAodXBwZXJQYXJ0IDw8IEJpZ0ludCg2NCkpICsgbG93ZXJQYXJ0O1xuICB9XG4gIHJlYWRJMTI4KCkge1xuICAgIGNvbnN0IGxvd2VyUGFydCA9IHRoaXMudmlldy5nZXRCaWdVaW50NjQodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIGNvbnN0IHVwcGVyUGFydCA9IHRoaXMudmlldy5nZXRCaWdJbnQ2NCh0aGlzLm9mZnNldCArIDgsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDE2O1xuICAgIHJldHVybiAodXBwZXJQYXJ0IDw8IEJpZ0ludCg2NCkpICsgbG93ZXJQYXJ0O1xuICB9XG4gIHJlYWRVMjU2KCkge1xuICAgIGNvbnN0IHAwID0gdGhpcy52aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgY29uc3QgcDEgPSB0aGlzLnZpZXcuZ2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgOCwgdHJ1ZSk7XG4gICAgY29uc3QgcDIgPSB0aGlzLnZpZXcuZ2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgMTYsIHRydWUpO1xuICAgIGNvbnN0IHAzID0gdGhpcy52aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDI0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAzMjtcbiAgICByZXR1cm4gKHAzIDw8IEJpZ0ludCgzICogNjQpKSArIChwMiA8PCBCaWdJbnQoMiAqIDY0KSkgKyAocDEgPDwgQmlnSW50KDEgKiA2NCkpICsgcDA7XG4gIH1cbiAgcmVhZEkyNTYoKSB7XG4gICAgY29uc3QgcDAgPSB0aGlzLnZpZXcuZ2V0QmlnVWludDY0KHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICBjb25zdCBwMSA9IHRoaXMudmlldy5nZXRCaWdVaW50NjQodGhpcy5vZmZzZXQgKyA4LCB0cnVlKTtcbiAgICBjb25zdCBwMiA9IHRoaXMudmlldy5nZXRCaWdVaW50NjQodGhpcy5vZmZzZXQgKyAxNiwgdHJ1ZSk7XG4gICAgY29uc3QgcDMgPSB0aGlzLnZpZXcuZ2V0QmlnSW50NjQodGhpcy5vZmZzZXQgKyAyNCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gMzI7XG4gICAgcmV0dXJuIChwMyA8PCBCaWdJbnQoMyAqIDY0KSkgKyAocDIgPDwgQmlnSW50KDIgKiA2NCkpICsgKHAxIDw8IEJpZ0ludCgxICogNjQpKSArIHAwO1xuICB9XG4gIHJlYWRGMzIoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0RmxvYXQzMih0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gNDtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmVhZEY2NCgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmlldy5nZXRGbG9hdDY0KHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA4O1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZWFkU3RyaW5nKCkge1xuICAgIGNvbnN0IHVpbnQ4QXJyYXkgPSB0aGlzLnJlYWRVSW50OEFycmF5KCk7XG4gICAgcmV0dXJuIG5ldyBUZXh0RGVjb2RlcihcInV0Zi04XCIpLmRlY29kZSh1aW50OEFycmF5KTtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi9iaW5hcnlfd3JpdGVyLnRzXG52YXIgaW1wb3J0X2Jhc2U2NF9qcyA9IF9fdG9FU00ocmVxdWlyZV9iYXNlNjRfanMoKSk7XG52YXIgQXJyYXlCdWZmZXJQcm90b3R5cGVUcmFuc2ZlciA9IEFycmF5QnVmZmVyLnByb3RvdHlwZS50cmFuc2ZlciA/PyBmdW5jdGlvbihuZXdCeXRlTGVuZ3RoKSB7XG4gIGlmIChuZXdCeXRlTGVuZ3RoID09PSB2b2lkIDApIHtcbiAgICByZXR1cm4gdGhpcy5zbGljZSgpO1xuICB9IGVsc2UgaWYgKG5ld0J5dGVMZW5ndGggPD0gdGhpcy5ieXRlTGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2xpY2UoMCwgbmV3Qnl0ZUxlbmd0aCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgY29weSA9IG5ldyBVaW50OEFycmF5KG5ld0J5dGVMZW5ndGgpO1xuICAgIGNvcHkuc2V0KG5ldyBVaW50OEFycmF5KHRoaXMpKTtcbiAgICByZXR1cm4gY29weS5idWZmZXI7XG4gIH1cbn07XG52YXIgUmVzaXphYmxlQnVmZmVyID0gY2xhc3Mge1xuICBidWZmZXI7XG4gIHZpZXc7XG4gIGNvbnN0cnVjdG9yKGluaXQpIHtcbiAgICB0aGlzLmJ1ZmZlciA9IHR5cGVvZiBpbml0ID09PSBcIm51bWJlclwiID8gbmV3IEFycmF5QnVmZmVyKGluaXQpIDogaW5pdDtcbiAgICB0aGlzLnZpZXcgPSBuZXcgRGF0YVZpZXcodGhpcy5idWZmZXIpO1xuICB9XG4gIGdldCBjYXBhY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcbiAgfVxuICBncm93KG5ld1NpemUpIHtcbiAgICBpZiAobmV3U2l6ZSA8PSB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoKSByZXR1cm47XG4gICAgdGhpcy5idWZmZXIgPSBBcnJheUJ1ZmZlclByb3RvdHlwZVRyYW5zZmVyLmNhbGwodGhpcy5idWZmZXIsIG5ld1NpemUpO1xuICAgIHRoaXMudmlldyA9IG5ldyBEYXRhVmlldyh0aGlzLmJ1ZmZlcik7XG4gIH1cbn07XG52YXIgQmluYXJ5V3JpdGVyID0gY2xhc3Mge1xuICBidWZmZXI7XG4gIG9mZnNldCA9IDA7XG4gIGNvbnN0cnVjdG9yKGluaXQpIHtcbiAgICB0aGlzLmJ1ZmZlciA9IHR5cGVvZiBpbml0ID09PSBcIm51bWJlclwiID8gbmV3IFJlc2l6YWJsZUJ1ZmZlcihpbml0KSA6IGluaXQ7XG4gIH1cbiAgcmVzZXQoYnVmZmVyKSB7XG4gICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICB9XG4gIGV4cGFuZEJ1ZmZlcihhZGRpdGlvbmFsQ2FwYWNpdHkpIHtcbiAgICBjb25zdCBtaW5DYXBhY2l0eSA9IHRoaXMub2Zmc2V0ICsgYWRkaXRpb25hbENhcGFjaXR5ICsgMTtcbiAgICBpZiAobWluQ2FwYWNpdHkgPD0gdGhpcy5idWZmZXIuY2FwYWNpdHkpIHJldHVybjtcbiAgICBsZXQgbmV3Q2FwYWNpdHkgPSB0aGlzLmJ1ZmZlci5jYXBhY2l0eSAqIDI7XG4gICAgaWYgKG5ld0NhcGFjaXR5IDwgbWluQ2FwYWNpdHkpIG5ld0NhcGFjaXR5ID0gbWluQ2FwYWNpdHk7XG4gICAgdGhpcy5idWZmZXIuZ3JvdyhuZXdDYXBhY2l0eSk7XG4gIH1cbiAgdG9CYXNlNjQoKSB7XG4gICAgcmV0dXJuICgwLCBpbXBvcnRfYmFzZTY0X2pzLmZyb21CeXRlQXJyYXkpKHRoaXMuZ2V0QnVmZmVyKCkpO1xuICB9XG4gIGdldEJ1ZmZlcigpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIuYnVmZmVyLCAwLCB0aGlzLm9mZnNldCk7XG4gIH1cbiAgZ2V0IHZpZXcoKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVmZmVyLnZpZXc7XG4gIH1cbiAgd3JpdGVVSW50OEFycmF5KHZhbHVlKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICAgIHRoaXMuZXhwYW5kQnVmZmVyKDQgKyBsZW5ndGgpO1xuICAgIHRoaXMud3JpdGVVMzIobGVuZ3RoKTtcbiAgICBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlci5idWZmZXIsIHRoaXMub2Zmc2V0KS5zZXQodmFsdWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aDtcbiAgfVxuICB3cml0ZUJvb2wodmFsdWUpIHtcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcigxKTtcbiAgICB0aGlzLnZpZXcuc2V0VWludDgodGhpcy5vZmZzZXQsIHZhbHVlID8gMSA6IDApO1xuICAgIHRoaXMub2Zmc2V0ICs9IDE7XG4gIH1cbiAgd3JpdGVCeXRlKHZhbHVlKSB7XG4gICAgdGhpcy5leHBhbmRCdWZmZXIoMSk7XG4gICAgdGhpcy52aWV3LnNldFVpbnQ4KHRoaXMub2Zmc2V0LCB2YWx1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gMTtcbiAgfVxuICB3cml0ZUk4KHZhbHVlKSB7XG4gICAgdGhpcy5leHBhbmRCdWZmZXIoMSk7XG4gICAgdGhpcy52aWV3LnNldEludDgodGhpcy5vZmZzZXQsIHZhbHVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAxO1xuICB9XG4gIHdyaXRlVTgodmFsdWUpIHtcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcigxKTtcbiAgICB0aGlzLnZpZXcuc2V0VWludDgodGhpcy5vZmZzZXQsIHZhbHVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAxO1xuICB9XG4gIHdyaXRlSTE2KHZhbHVlKSB7XG4gICAgdGhpcy5leHBhbmRCdWZmZXIoMik7XG4gICAgdGhpcy52aWV3LnNldEludDE2KHRoaXMub2Zmc2V0LCB2YWx1ZSwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gMjtcbiAgfVxuICB3cml0ZVUxNih2YWx1ZSkge1xuICAgIHRoaXMuZXhwYW5kQnVmZmVyKDIpO1xuICAgIHRoaXMudmlldy5zZXRVaW50MTYodGhpcy5vZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAyO1xuICB9XG4gIHdyaXRlSTMyKHZhbHVlKSB7XG4gICAgdGhpcy5leHBhbmRCdWZmZXIoNCk7XG4gICAgdGhpcy52aWV3LnNldEludDMyKHRoaXMub2Zmc2V0LCB2YWx1ZSwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gNDtcbiAgfVxuICB3cml0ZVUzMih2YWx1ZSkge1xuICAgIHRoaXMuZXhwYW5kQnVmZmVyKDQpO1xuICAgIHRoaXMudmlldy5zZXRVaW50MzIodGhpcy5vZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA0O1xuICB9XG4gIHdyaXRlSTY0KHZhbHVlKSB7XG4gICAgdGhpcy5leHBhbmRCdWZmZXIoOCk7XG4gICAgdGhpcy52aWV3LnNldEJpZ0ludDY0KHRoaXMub2Zmc2V0LCB2YWx1ZSwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gODtcbiAgfVxuICB3cml0ZVU2NCh2YWx1ZSkge1xuICAgIHRoaXMuZXhwYW5kQnVmZmVyKDgpO1xuICAgIHRoaXMudmlldy5zZXRCaWdVaW50NjQodGhpcy5vZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA4O1xuICB9XG4gIHdyaXRlVTEyOCh2YWx1ZSkge1xuICAgIHRoaXMuZXhwYW5kQnVmZmVyKDE2KTtcbiAgICBjb25zdCBsb3dlclBhcnQgPSB2YWx1ZSAmIEJpZ0ludChcIjB4RkZGRkZGRkZGRkZGRkZGRlwiKTtcbiAgICBjb25zdCB1cHBlclBhcnQgPSB2YWx1ZSA+PiBCaWdJbnQoNjQpO1xuICAgIHRoaXMudmlldy5zZXRCaWdVaW50NjQodGhpcy5vZmZzZXQsIGxvd2VyUGFydCwgdHJ1ZSk7XG4gICAgdGhpcy52aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDgsIHVwcGVyUGFydCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gMTY7XG4gIH1cbiAgd3JpdGVJMTI4KHZhbHVlKSB7XG4gICAgdGhpcy5leHBhbmRCdWZmZXIoMTYpO1xuICAgIGNvbnN0IGxvd2VyUGFydCA9IHZhbHVlICYgQmlnSW50KFwiMHhGRkZGRkZGRkZGRkZGRkZGXCIpO1xuICAgIGNvbnN0IHVwcGVyUGFydCA9IHZhbHVlID4+IEJpZ0ludCg2NCk7XG4gICAgdGhpcy52aWV3LnNldEJpZ0ludDY0KHRoaXMub2Zmc2V0LCBsb3dlclBhcnQsIHRydWUpO1xuICAgIHRoaXMudmlldy5zZXRCaWdJbnQ2NCh0aGlzLm9mZnNldCArIDgsIHVwcGVyUGFydCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gMTY7XG4gIH1cbiAgd3JpdGVVMjU2KHZhbHVlKSB7XG4gICAgdGhpcy5leHBhbmRCdWZmZXIoMzIpO1xuICAgIGNvbnN0IGxvd182NF9tYXNrID0gQmlnSW50KFwiMHhGRkZGRkZGRkZGRkZGRkZGXCIpO1xuICAgIGNvbnN0IHAwID0gdmFsdWUgJiBsb3dfNjRfbWFzaztcbiAgICBjb25zdCBwMSA9IHZhbHVlID4+IEJpZ0ludCg2NCAqIDEpICYgbG93XzY0X21hc2s7XG4gICAgY29uc3QgcDIgPSB2YWx1ZSA+PiBCaWdJbnQoNjQgKiAyKSAmIGxvd182NF9tYXNrO1xuICAgIGNvbnN0IHAzID0gdmFsdWUgPj4gQmlnSW50KDY0ICogMyk7XG4gICAgdGhpcy52aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDggKiAwLCBwMCwgdHJ1ZSk7XG4gICAgdGhpcy52aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDggKiAxLCBwMSwgdHJ1ZSk7XG4gICAgdGhpcy52aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDggKiAyLCBwMiwgdHJ1ZSk7XG4gICAgdGhpcy52aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDggKiAzLCBwMywgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gMzI7XG4gIH1cbiAgd3JpdGVJMjU2KHZhbHVlKSB7XG4gICAgdGhpcy5leHBhbmRCdWZmZXIoMzIpO1xuICAgIGNvbnN0IGxvd182NF9tYXNrID0gQmlnSW50KFwiMHhGRkZGRkZGRkZGRkZGRkZGXCIpO1xuICAgIGNvbnN0IHAwID0gdmFsdWUgJiBsb3dfNjRfbWFzaztcbiAgICBjb25zdCBwMSA9IHZhbHVlID4+IEJpZ0ludCg2NCAqIDEpICYgbG93XzY0X21hc2s7XG4gICAgY29uc3QgcDIgPSB2YWx1ZSA+PiBCaWdJbnQoNjQgKiAyKSAmIGxvd182NF9tYXNrO1xuICAgIGNvbnN0IHAzID0gdmFsdWUgPj4gQmlnSW50KDY0ICogMyk7XG4gICAgdGhpcy52aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDggKiAwLCBwMCwgdHJ1ZSk7XG4gICAgdGhpcy52aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDggKiAxLCBwMSwgdHJ1ZSk7XG4gICAgdGhpcy52aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDggKiAyLCBwMiwgdHJ1ZSk7XG4gICAgdGhpcy52aWV3LnNldEJpZ0ludDY0KHRoaXMub2Zmc2V0ICsgOCAqIDMsIHAzLCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAzMjtcbiAgfVxuICB3cml0ZUYzMih2YWx1ZSkge1xuICAgIHRoaXMuZXhwYW5kQnVmZmVyKDQpO1xuICAgIHRoaXMudmlldy5zZXRGbG9hdDMyKHRoaXMub2Zmc2V0LCB2YWx1ZSwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gNDtcbiAgfVxuICB3cml0ZUY2NCh2YWx1ZSkge1xuICAgIHRoaXMuZXhwYW5kQnVmZmVyKDgpO1xuICAgIHRoaXMudmlldy5zZXRGbG9hdDY0KHRoaXMub2Zmc2V0LCB2YWx1ZSwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gODtcbiAgfVxuICB3cml0ZVN0cmluZyh2YWx1ZSkge1xuICAgIGNvbnN0IGVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICBjb25zdCBlbmNvZGVkU3RyaW5nID0gZW5jb2Rlci5lbmNvZGUodmFsdWUpO1xuICAgIHRoaXMud3JpdGVVSW50OEFycmF5KGVuY29kZWRTdHJpbmcpO1xuICB9XG59O1xuXG4vLyBzcmMvbGliL3V0aWwudHNcbmZ1bmN0aW9uIHRvUGFzY2FsQ2FzZShzKSB7XG4gIGNvbnN0IHN0ciA9IHMucmVwbGFjZSgvKFstX11bYS16XSkvZ2ksICgkMSkgPT4ge1xuICAgIHJldHVybiAkMS50b1VwcGVyQ2FzZSgpLnJlcGxhY2UoXCItXCIsIFwiXCIpLnJlcGxhY2UoXCJfXCIsIFwiXCIpO1xuICB9KTtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cbmZ1bmN0aW9uIHVpbnQ4QXJyYXlUb0hleFN0cmluZyhhcnJheSkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGFycmF5LnJldmVyc2UoKSwgKHgpID0+IChcIjAwXCIgKyB4LnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpKS5qb2luKFwiXCIpO1xufVxuZnVuY3Rpb24gdWludDhBcnJheVRvVTEyOChhcnJheSkge1xuICBpZiAoYXJyYXkubGVuZ3RoICE9IDE2KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVaW50OEFycmF5IGlzIG5vdCAxNiBieXRlcyBsb25nOiAke2FycmF5fWApO1xuICB9XG4gIHJldHVybiBuZXcgQmluYXJ5UmVhZGVyKGFycmF5KS5yZWFkVTEyOCgpO1xufVxuZnVuY3Rpb24gdWludDhBcnJheVRvVTI1NihhcnJheSkge1xuICBpZiAoYXJyYXkubGVuZ3RoICE9IDMyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVaW50OEFycmF5IGlzIG5vdCAzMiBieXRlcyBsb25nOiBbJHthcnJheX1dYCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBCaW5hcnlSZWFkZXIoYXJyYXkpLnJlYWRVMjU2KCk7XG59XG5mdW5jdGlvbiBoZXhTdHJpbmdUb1VpbnQ4QXJyYXkoc3RyKSB7XG4gIGlmIChzdHIuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgc3RyID0gc3RyLnNsaWNlKDIpO1xuICB9XG4gIGNvbnN0IG1hdGNoZXMgPSBzdHIubWF0Y2goLy57MSwyfS9nKSB8fCBbXTtcbiAgY29uc3QgZGF0YSA9IFVpbnQ4QXJyYXkuZnJvbShcbiAgICBtYXRjaGVzLm1hcCgoYnl0ZSkgPT4gcGFyc2VJbnQoYnl0ZSwgMTYpKVxuICApO1xuICByZXR1cm4gZGF0YS5yZXZlcnNlKCk7XG59XG5mdW5jdGlvbiBoZXhTdHJpbmdUb1UxMjgoc3RyKSB7XG4gIHJldHVybiB1aW50OEFycmF5VG9VMTI4KGhleFN0cmluZ1RvVWludDhBcnJheShzdHIpKTtcbn1cbmZ1bmN0aW9uIGhleFN0cmluZ1RvVTI1NihzdHIpIHtcbiAgcmV0dXJuIHVpbnQ4QXJyYXlUb1UyNTYoaGV4U3RyaW5nVG9VaW50OEFycmF5KHN0cikpO1xufVxuZnVuY3Rpb24gdTEyOFRvVWludDhBcnJheShkYXRhKSB7XG4gIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoMTYpO1xuICB3cml0ZXIud3JpdGVVMTI4KGRhdGEpO1xuICByZXR1cm4gd3JpdGVyLmdldEJ1ZmZlcigpO1xufVxuZnVuY3Rpb24gdTEyOFRvSGV4U3RyaW5nKGRhdGEpIHtcbiAgcmV0dXJuIHVpbnQ4QXJyYXlUb0hleFN0cmluZyh1MTI4VG9VaW50OEFycmF5KGRhdGEpKTtcbn1cbmZ1bmN0aW9uIHUyNTZUb1VpbnQ4QXJyYXkoZGF0YSkge1xuICBjb25zdCB3cml0ZXIgPSBuZXcgQmluYXJ5V3JpdGVyKDMyKTtcbiAgd3JpdGVyLndyaXRlVTI1NihkYXRhKTtcbiAgcmV0dXJuIHdyaXRlci5nZXRCdWZmZXIoKTtcbn1cbmZ1bmN0aW9uIHUyNTZUb0hleFN0cmluZyhkYXRhKSB7XG4gIHJldHVybiB1aW50OEFycmF5VG9IZXhTdHJpbmcodTI1NlRvVWludDhBcnJheShkYXRhKSk7XG59XG5mdW5jdGlvbiB0b0NhbWVsQ2FzZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bLV9dKy9nLCBcIl9cIikucmVwbGFjZSgvXyhbYS16QS1aMC05XSkvZywgKF8sIGMpID0+IGMudG9VcHBlckNhc2UoKSk7XG59XG5mdW5jdGlvbiBic2F0bkJhc2VTaXplKHR5cGVzcGFjZSwgdHkpIHtcbiAgY29uc3QgYXNzdW1lZEFycmF5TGVuZ3RoID0gNDtcbiAgd2hpbGUgKHR5LnRhZyA9PT0gXCJSZWZcIikgdHkgPSB0eXBlc3BhY2UudHlwZXNbdHkudmFsdWVdO1xuICBpZiAodHkudGFnID09PSBcIlByb2R1Y3RcIikge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvciAoY29uc3QgeyBhbGdlYnJhaWNUeXBlOiBlbGVtIH0gb2YgdHkudmFsdWUuZWxlbWVudHMpIHtcbiAgICAgIHN1bSArPSBic2F0bkJhc2VTaXplKHR5cGVzcGFjZSwgZWxlbSk7XG4gICAgfVxuICAgIHJldHVybiBzdW07XG4gIH0gZWxzZSBpZiAodHkudGFnID09PSBcIlN1bVwiKSB7XG4gICAgbGV0IG1pbiA9IEluZmluaXR5O1xuICAgIGZvciAoY29uc3QgeyBhbGdlYnJhaWNUeXBlOiB2YXJpIH0gb2YgdHkudmFsdWUudmFyaWFudHMpIHtcbiAgICAgIGNvbnN0IHZTaXplID0gYnNhdG5CYXNlU2l6ZSh0eXBlc3BhY2UsIHZhcmkpO1xuICAgICAgaWYgKHZTaXplIDwgbWluKSBtaW4gPSB2U2l6ZTtcbiAgICB9XG4gICAgaWYgKG1pbiA9PT0gSW5maW5pdHkpIG1pbiA9IDA7XG4gICAgcmV0dXJuIDQgKyBtaW47XG4gIH0gZWxzZSBpZiAodHkudGFnID09IFwiQXJyYXlcIikge1xuICAgIHJldHVybiA0ICsgYXNzdW1lZEFycmF5TGVuZ3RoICogYnNhdG5CYXNlU2l6ZSh0eXBlc3BhY2UsIHR5LnZhbHVlKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIFN0cmluZzogNCArIGFzc3VtZWRBcnJheUxlbmd0aCxcbiAgICBTdW06IDEsXG4gICAgQm9vbDogMSxcbiAgICBJODogMSxcbiAgICBVODogMSxcbiAgICBJMTY6IDIsXG4gICAgVTE2OiAyLFxuICAgIEkzMjogNCxcbiAgICBVMzI6IDQsXG4gICAgRjMyOiA0LFxuICAgIEk2NDogOCxcbiAgICBVNjQ6IDgsXG4gICAgRjY0OiA4LFxuICAgIEkxMjg6IDE2LFxuICAgIFUxMjg6IDE2LFxuICAgIEkyNTY6IDMyLFxuICAgIFUyNTY6IDMyXG4gIH1bdHkudGFnXTtcbn1cbnZhciBoYXNPd24gPSBPYmplY3QuaGFzT3duO1xuXG4vLyBzcmMvbGliL2Nvbm5lY3Rpb25faWQudHNcbnZhciBDb25uZWN0aW9uSWQgPSBjbGFzcyBfQ29ubmVjdGlvbklkIHtcbiAgX19jb25uZWN0aW9uX2lkX187XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBDb25uZWN0aW9uSWRgLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMuX19jb25uZWN0aW9uX2lkX18gPSBkYXRhO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgdGhlIGFsZ2VicmFpYyB0eXBlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB7QGxpbmsgQ29ubmVjdGlvbklkfSB0eXBlLlxuICAgKiBAcmV0dXJucyBUaGUgYWxnZWJyYWljIHR5cGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHR5cGUuXG4gICAqL1xuICBzdGF0aWMgZ2V0QWxnZWJyYWljVHlwZSgpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHtcbiAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgIHsgbmFtZTogXCJfX2Nvbm5lY3Rpb25faWRfX1wiLCBhbGdlYnJhaWNUeXBlOiBBbGdlYnJhaWNUeXBlLlUxMjggfVxuICAgICAgXVxuICAgIH0pO1xuICB9XG4gIGlzWmVybygpIHtcbiAgICByZXR1cm4gdGhpcy5fX2Nvbm5lY3Rpb25faWRfXyA9PT0gQmlnSW50KDApO1xuICB9XG4gIHN0YXRpYyBudWxsSWZaZXJvKGFkZHIpIHtcbiAgICBpZiAoYWRkci5pc1plcm8oKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhZGRyO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgcmFuZG9tKCkge1xuICAgIGZ1bmN0aW9uIHJhbmRvbVU4KCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XG4gICAgfVxuICAgIGxldCByZXN1bHQgPSBCaWdJbnQoMCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQgPDwgQmlnSW50KDgpIHwgQmlnSW50KHJhbmRvbVU4KCkpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IF9Db25uZWN0aW9uSWQocmVzdWx0KTtcbiAgfVxuICAvKipcbiAgICogQ29tcGFyZSB0d28gY29ubmVjdGlvbiBJRHMgZm9yIGVxdWFsaXR5LlxuICAgKi9cbiAgaXNFcXVhbChvdGhlcikge1xuICAgIHJldHVybiB0aGlzLl9fY29ubmVjdGlvbl9pZF9fID09IG90aGVyLl9fY29ubmVjdGlvbl9pZF9fO1xuICB9XG4gIC8qKlxuICAgKiBDaGVjayBpZiB0d28gY29ubmVjdGlvbiBJRHMgYXJlIGVxdWFsLlxuICAgKi9cbiAgZXF1YWxzKG90aGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNFcXVhbChvdGhlcik7XG4gIH1cbiAgLyoqXG4gICAqIFByaW50IHRoZSBjb25uZWN0aW9uIElEIGFzIGEgaGV4YWRlY2ltYWwgc3RyaW5nLlxuICAgKi9cbiAgdG9IZXhTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHUxMjhUb0hleFN0cmluZyh0aGlzLl9fY29ubmVjdGlvbl9pZF9fKTtcbiAgfVxuICAvKipcbiAgICogQ29udmVydCB0aGUgY29ubmVjdGlvbiBJRCB0byBhIFVpbnQ4QXJyYXkuXG4gICAqL1xuICB0b1VpbnQ4QXJyYXkoKSB7XG4gICAgcmV0dXJuIHUxMjhUb1VpbnQ4QXJyYXkodGhpcy5fX2Nvbm5lY3Rpb25faWRfXyk7XG4gIH1cbiAgLyoqXG4gICAqIFBhcnNlIGEgY29ubmVjdGlvbiBJRCBmcm9tIGEgaGV4YWRlY2ltYWwgc3RyaW5nLlxuICAgKi9cbiAgc3RhdGljIGZyb21TdHJpbmcoc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBfQ29ubmVjdGlvbklkKGhleFN0cmluZ1RvVTEyOChzdHIpKTtcbiAgfVxuICBzdGF0aWMgZnJvbVN0cmluZ09yTnVsbChzdHIpIHtcbiAgICBjb25zdCBhZGRyID0gX0Nvbm5lY3Rpb25JZC5mcm9tU3RyaW5nKHN0cik7XG4gICAgaWYgKGFkZHIuaXNaZXJvKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYWRkcjtcbiAgICB9XG4gIH1cbn07XG5cbi8vIHNyYy9saWIvaWRlbnRpdHkudHNcbnZhciBJZGVudGl0eSA9IGNsYXNzIF9JZGVudGl0eSB7XG4gIF9faWRlbnRpdHlfXztcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYElkZW50aXR5YC5cbiAgICpcbiAgICogYGRhdGFgIGNhbiBiZSBhIGhleGFkZWNpbWFsIHN0cmluZyBvciBhIGBiaWdpbnRgLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMuX19pZGVudGl0eV9fID0gdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgPyBoZXhTdHJpbmdUb1UyNTYoZGF0YSkgOiBkYXRhO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgdGhlIGFsZ2VicmFpYyB0eXBlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB7QGxpbmsgSWRlbnRpdHl9IHR5cGUuXG4gICAqIEByZXR1cm5zIFRoZSBhbGdlYnJhaWMgdHlwZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHlwZS5cbiAgICovXG4gIHN0YXRpYyBnZXRBbGdlYnJhaWNUeXBlKCkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlLlByb2R1Y3Qoe1xuICAgICAgZWxlbWVudHM6IFt7IG5hbWU6IFwiX19pZGVudGl0eV9fXCIsIGFsZ2VicmFpY1R5cGU6IEFsZ2VicmFpY1R5cGUuVTI1NiB9XVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiBDaGVjayBpZiB0d28gaWRlbnRpdGllcyBhcmUgZXF1YWwuXG4gICAqL1xuICBpc0VxdWFsKG90aGVyKSB7XG4gICAgcmV0dXJuIHRoaXMudG9IZXhTdHJpbmcoKSA9PT0gb3RoZXIudG9IZXhTdHJpbmcoKTtcbiAgfVxuICAvKipcbiAgICogQ2hlY2sgaWYgdHdvIGlkZW50aXRpZXMgYXJlIGVxdWFsLlxuICAgKi9cbiAgZXF1YWxzKG90aGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNFcXVhbChvdGhlcik7XG4gIH1cbiAgLyoqXG4gICAqIFByaW50IHRoZSBpZGVudGl0eSBhcyBhIGhleGFkZWNpbWFsIHN0cmluZy5cbiAgICovXG4gIHRvSGV4U3RyaW5nKCkge1xuICAgIHJldHVybiB1MjU2VG9IZXhTdHJpbmcodGhpcy5fX2lkZW50aXR5X18pO1xuICB9XG4gIC8qKlxuICAgKiBDb252ZXJ0IHRoZSBhZGRyZXNzIHRvIGEgVWludDhBcnJheS5cbiAgICovXG4gIHRvVWludDhBcnJheSgpIHtcbiAgICByZXR1cm4gdTI1NlRvVWludDhBcnJheSh0aGlzLl9faWRlbnRpdHlfXyk7XG4gIH1cbiAgLyoqXG4gICAqIFBhcnNlIGFuIElkZW50aXR5IGZyb20gYSBoZXhhZGVjaW1hbCBzdHJpbmcuXG4gICAqL1xuICBzdGF0aWMgZnJvbVN0cmluZyhzdHIpIHtcbiAgICByZXR1cm4gbmV3IF9JZGVudGl0eShzdHIpO1xuICB9XG4gIC8qKlxuICAgKiBaZXJvIGlkZW50aXR5ICgweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDApXG4gICAqL1xuICBzdGF0aWMgemVybygpIHtcbiAgICByZXR1cm4gbmV3IF9JZGVudGl0eSgwbik7XG4gIH1cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9IZXhTdHJpbmcoKTtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi9hbGdlYnJhaWNfdHlwZS50c1xudmFyIFNFUklBTElaRVJTID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbnZhciBERVNFUklBTElaRVJTID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbnZhciBBbGdlYnJhaWNUeXBlID0ge1xuICBSZWY6ICh2YWx1ZSkgPT4gKHsgdGFnOiBcIlJlZlwiLCB2YWx1ZSB9KSxcbiAgU3VtOiAodmFsdWUpID0+ICh7XG4gICAgdGFnOiBcIlN1bVwiLFxuICAgIHZhbHVlXG4gIH0pLFxuICBQcm9kdWN0OiAodmFsdWUpID0+ICh7XG4gICAgdGFnOiBcIlByb2R1Y3RcIixcbiAgICB2YWx1ZVxuICB9KSxcbiAgQXJyYXk6ICh2YWx1ZSkgPT4gKHtcbiAgICB0YWc6IFwiQXJyYXlcIixcbiAgICB2YWx1ZVxuICB9KSxcbiAgU3RyaW5nOiB7IHRhZzogXCJTdHJpbmdcIiB9LFxuICBCb29sOiB7IHRhZzogXCJCb29sXCIgfSxcbiAgSTg6IHsgdGFnOiBcIkk4XCIgfSxcbiAgVTg6IHsgdGFnOiBcIlU4XCIgfSxcbiAgSTE2OiB7IHRhZzogXCJJMTZcIiB9LFxuICBVMTY6IHsgdGFnOiBcIlUxNlwiIH0sXG4gIEkzMjogeyB0YWc6IFwiSTMyXCIgfSxcbiAgVTMyOiB7IHRhZzogXCJVMzJcIiB9LFxuICBJNjQ6IHsgdGFnOiBcIkk2NFwiIH0sXG4gIFU2NDogeyB0YWc6IFwiVTY0XCIgfSxcbiAgSTEyODogeyB0YWc6IFwiSTEyOFwiIH0sXG4gIFUxMjg6IHsgdGFnOiBcIlUxMjhcIiB9LFxuICBJMjU2OiB7IHRhZzogXCJJMjU2XCIgfSxcbiAgVTI1NjogeyB0YWc6IFwiVTI1NlwiIH0sXG4gIEYzMjogeyB0YWc6IFwiRjMyXCIgfSxcbiAgRjY0OiB7IHRhZzogXCJGNjRcIiB9LFxuICBtYWtlU2VyaWFsaXplcih0eSwgdHlwZXNwYWNlKSB7XG4gICAgaWYgKHR5LnRhZyA9PT0gXCJSZWZcIikge1xuICAgICAgaWYgKCF0eXBlc3BhY2UpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbm5vdCBzZXJpYWxpemUgcmVmcyB3aXRob3V0IGEgdHlwZXNwYWNlXCIpO1xuICAgICAgd2hpbGUgKHR5LnRhZyA9PT0gXCJSZWZcIikgdHkgPSB0eXBlc3BhY2UudHlwZXNbdHkudmFsdWVdO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5LnRhZykge1xuICAgICAgY2FzZSBcIlByb2R1Y3RcIjpcbiAgICAgICAgcmV0dXJuIFByb2R1Y3RUeXBlLm1ha2VTZXJpYWxpemVyKHR5LnZhbHVlLCB0eXBlc3BhY2UpO1xuICAgICAgY2FzZSBcIlN1bVwiOlxuICAgICAgICByZXR1cm4gU3VtVHlwZS5tYWtlU2VyaWFsaXplcih0eS52YWx1ZSwgdHlwZXNwYWNlKTtcbiAgICAgIGNhc2UgXCJBcnJheVwiOlxuICAgICAgICBpZiAodHkudmFsdWUudGFnID09PSBcIlU4XCIpIHtcbiAgICAgICAgICByZXR1cm4gc2VyaWFsaXplVWludDhBcnJheTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBzZXJpYWxpemUgPSBBbGdlYnJhaWNUeXBlLm1ha2VTZXJpYWxpemVyKHR5LnZhbHVlLCB0eXBlc3BhY2UpO1xuICAgICAgICAgIHJldHVybiAod3JpdGVyLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgd3JpdGVyLndyaXRlVTMyKHZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW0gb2YgdmFsdWUpIHtcbiAgICAgICAgICAgICAgc2VyaWFsaXplKHdyaXRlciwgZWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHByaW1pdGl2ZVNlcmlhbGl6ZXJzW3R5LnRhZ107XG4gICAgfVxuICB9LFxuICAvKiogQGRlcHJlY2F0ZWQgVXNlIGBtYWtlU2VyaWFsaXplcmAgaW5zdGVhZC4gKi9cbiAgc2VyaWFsaXplVmFsdWUod3JpdGVyLCB0eSwgdmFsdWUsIHR5cGVzcGFjZSkge1xuICAgIEFsZ2VicmFpY1R5cGUubWFrZVNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkod3JpdGVyLCB2YWx1ZSk7XG4gIH0sXG4gIG1ha2VEZXNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkge1xuICAgIGlmICh0eS50YWcgPT09IFwiUmVmXCIpIHtcbiAgICAgIGlmICghdHlwZXNwYWNlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW5ub3QgZGVzZXJpYWxpemUgcmVmcyB3aXRob3V0IGEgdHlwZXNwYWNlXCIpO1xuICAgICAgd2hpbGUgKHR5LnRhZyA9PT0gXCJSZWZcIikgdHkgPSB0eXBlc3BhY2UudHlwZXNbdHkudmFsdWVdO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5LnRhZykge1xuICAgICAgY2FzZSBcIlByb2R1Y3RcIjpcbiAgICAgICAgcmV0dXJuIFByb2R1Y3RUeXBlLm1ha2VEZXNlcmlhbGl6ZXIodHkudmFsdWUsIHR5cGVzcGFjZSk7XG4gICAgICBjYXNlIFwiU3VtXCI6XG4gICAgICAgIHJldHVybiBTdW1UeXBlLm1ha2VEZXNlcmlhbGl6ZXIodHkudmFsdWUsIHR5cGVzcGFjZSk7XG4gICAgICBjYXNlIFwiQXJyYXlcIjpcbiAgICAgICAgaWYgKHR5LnZhbHVlLnRhZyA9PT0gXCJVOFwiKSB7XG4gICAgICAgICAgcmV0dXJuIGRlc2VyaWFsaXplVWludDhBcnJheTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IEFsZ2VicmFpY1R5cGUubWFrZURlc2VyaWFsaXplcihcbiAgICAgICAgICAgIHR5LnZhbHVlLFxuICAgICAgICAgICAgdHlwZXNwYWNlXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gKHJlYWRlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gcmVhZGVyLnJlYWRVMzIoKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHJlc3VsdFtpXSA9IGRlc2VyaWFsaXplKHJlYWRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBwcmltaXRpdmVEZXNlcmlhbGl6ZXJzW3R5LnRhZ107XG4gICAgfVxuICB9LFxuICAvKiogQGRlcHJlY2F0ZWQgVXNlIGBtYWtlRGVzZXJpYWxpemVyYCBpbnN0ZWFkLiAqL1xuICBkZXNlcmlhbGl6ZVZhbHVlKHJlYWRlciwgdHksIHR5cGVzcGFjZSkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlLm1ha2VEZXNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkocmVhZGVyKTtcbiAgfSxcbiAgLyoqXG4gICAqIENvbnZlcnQgYSB2YWx1ZSBvZiB0aGUgYWxnZWJyYWljIHR5cGUgaW50byBzb21ldGhpbmcgdGhhdCBjYW4gYmUgdXNlZCBhcyBhIGtleSBpbiBhIG1hcC5cbiAgICogVGhlcmUgYXJlIG5vIGd1YXJhbnRlZXMgYWJvdXQgYmVpbmcgYWJsZSB0byBvcmRlciBpdC5cbiAgICogVGhpcyBpcyBvbmx5IGd1YXJhbnRlZWQgdG8gYmUgY29tcGFyYWJsZSB0byBvdGhlciB2YWx1ZXMgb2YgdGhlIHNhbWUgdHlwZS5cbiAgICogQHBhcmFtIHZhbHVlIEEgdmFsdWUgb2YgdGhlIGFsZ2VicmFpYyB0eXBlXG4gICAqIEByZXR1cm5zIFNvbWV0aGluZyB0aGF0IGNhbiBiZSB1c2VkIGFzIGEga2V5IGluIGEgbWFwLlxuICAgKi9cbiAgaW50b01hcEtleTogZnVuY3Rpb24odHksIHZhbHVlKSB7XG4gICAgc3dpdGNoICh0eS50YWcpIHtcbiAgICAgIGNhc2UgXCJVOFwiOlxuICAgICAgY2FzZSBcIlUxNlwiOlxuICAgICAgY2FzZSBcIlUzMlwiOlxuICAgICAgY2FzZSBcIlU2NFwiOlxuICAgICAgY2FzZSBcIlUxMjhcIjpcbiAgICAgIGNhc2UgXCJVMjU2XCI6XG4gICAgICBjYXNlIFwiSThcIjpcbiAgICAgIGNhc2UgXCJJMTZcIjpcbiAgICAgIGNhc2UgXCJJMzJcIjpcbiAgICAgIGNhc2UgXCJJNjRcIjpcbiAgICAgIGNhc2UgXCJJMTI4XCI6XG4gICAgICBjYXNlIFwiSTI1NlwiOlxuICAgICAgY2FzZSBcIkYzMlwiOlxuICAgICAgY2FzZSBcIkY2NFwiOlxuICAgICAgY2FzZSBcIlN0cmluZ1wiOlxuICAgICAgY2FzZSBcIkJvb2xcIjpcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgY2FzZSBcIlByb2R1Y3RcIjpcbiAgICAgICAgcmV0dXJuIFByb2R1Y3RUeXBlLmludG9NYXBLZXkodHkudmFsdWUsIHZhbHVlKTtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3Qgd3JpdGVyID0gbmV3IEJpbmFyeVdyaXRlcigxMCk7XG4gICAgICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUod3JpdGVyLCB0eSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gd3JpdGVyLnRvQmFzZTY0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuZnVuY3Rpb24gYmluZENhbGwoZikge1xuICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwuYmluZChmKTtcbn1cbnZhciBwcmltaXRpdmVTZXJpYWxpemVycyA9IHtcbiAgQm9vbDogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZUJvb2wpLFxuICBJODogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZUk4KSxcbiAgVTg6IGJpbmRDYWxsKEJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVVOCksXG4gIEkxNjogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZUkxNiksXG4gIFUxNjogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVUxNiksXG4gIEkzMjogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZUkzMiksXG4gIFUzMjogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVUzMiksXG4gIEk2NDogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZUk2NCksXG4gIFU2NDogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVU2NCksXG4gIEkxMjg6IGJpbmRDYWxsKEJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVJMTI4KSxcbiAgVTEyODogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVUxMjgpLFxuICBJMjU2OiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlSTI1NiksXG4gIFUyNTY6IGJpbmRDYWxsKEJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVVMjU2KSxcbiAgRjMyOiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlRjMyKSxcbiAgRjY0OiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlRjY0KSxcbiAgU3RyaW5nOiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlU3RyaW5nKVxufTtcbk9iamVjdC5mcmVlemUocHJpbWl0aXZlU2VyaWFsaXplcnMpO1xudmFyIHNlcmlhbGl6ZVVpbnQ4QXJyYXkgPSBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlVUludDhBcnJheSk7XG52YXIgcHJpbWl0aXZlRGVzZXJpYWxpemVycyA9IHtcbiAgQm9vbDogYmluZENhbGwoQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkQm9vbCksXG4gIEk4OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRJOCksXG4gIFU4OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRVOCksXG4gIEkxNjogYmluZENhbGwoQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkSTE2KSxcbiAgVTE2OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRVMTYpLFxuICBJMzI6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEkzMiksXG4gIFUzMjogYmluZENhbGwoQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkVTMyKSxcbiAgSTY0OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRJNjQpLFxuICBVNjQ6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFU2NCksXG4gIEkxMjg6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEkxMjgpLFxuICBVMTI4OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRVMTI4KSxcbiAgSTI1NjogYmluZENhbGwoQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkSTI1NiksXG4gIFUyNTY6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFUyNTYpLFxuICBGMzI6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEYzMiksXG4gIEY2NDogYmluZENhbGwoQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkRjY0KSxcbiAgU3RyaW5nOiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRTdHJpbmcpXG59O1xuT2JqZWN0LmZyZWV6ZShwcmltaXRpdmVEZXNlcmlhbGl6ZXJzKTtcbnZhciBkZXNlcmlhbGl6ZVVpbnQ4QXJyYXkgPSBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRVSW50OEFycmF5KTtcbnZhciBwcmltaXRpdmVTaXplcyA9IHtcbiAgQm9vbDogMSxcbiAgSTg6IDEsXG4gIFU4OiAxLFxuICBJMTY6IDIsXG4gIFUxNjogMixcbiAgSTMyOiA0LFxuICBVMzI6IDQsXG4gIEk2NDogOCxcbiAgVTY0OiA4LFxuICBJMTI4OiAxNixcbiAgVTEyODogMTYsXG4gIEkyNTY6IDMyLFxuICBVMjU2OiAzMixcbiAgRjMyOiA0LFxuICBGNjQ6IDhcbn07XG52YXIgZml4ZWRTaXplUHJpbWl0aXZlcyA9IG5ldyBTZXQoT2JqZWN0LmtleXMocHJpbWl0aXZlU2l6ZXMpKTtcbnZhciBpc0ZpeGVkU2l6ZVByb2R1Y3QgPSAodHkpID0+IHR5LmVsZW1lbnRzLmV2ZXJ5KFxuICAoeyBhbGdlYnJhaWNUeXBlIH0pID0+IGZpeGVkU2l6ZVByaW1pdGl2ZXMuaGFzKGFsZ2VicmFpY1R5cGUudGFnKVxuKTtcbnZhciBwcm9kdWN0U2l6ZSA9ICh0eSkgPT4gdHkuZWxlbWVudHMucmVkdWNlKFxuICAoYWNjLCB7IGFsZ2VicmFpY1R5cGUgfSkgPT4gYWNjICsgcHJpbWl0aXZlU2l6ZXNbYWxnZWJyYWljVHlwZS50YWddLFxuICAwXG4pO1xudmFyIHByaW1pdGl2ZUpTTmFtZSA9IHtcbiAgQm9vbDogXCJVaW50OFwiLFxuICBJODogXCJJbnQ4XCIsXG4gIFU4OiBcIlVpbnQ4XCIsXG4gIEkxNjogXCJJbnQxNlwiLFxuICBVMTY6IFwiVWludDE2XCIsXG4gIEkzMjogXCJJbnQzMlwiLFxuICBVMzI6IFwiVWludDMyXCIsXG4gIEk2NDogXCJCaWdJbnQ2NFwiLFxuICBVNjQ6IFwiQmlnVWludDY0XCIsXG4gIEYzMjogXCJGbG9hdDMyXCIsXG4gIEY2NDogXCJGbG9hdDY0XCJcbn07XG52YXIgc3BlY2lhbFByb2R1Y3REZXNlcmlhbGl6ZXJzID0ge1xuICBfX3RpbWVfZHVyYXRpb25fbWljcm9zX186IChyZWFkZXIpID0+IG5ldyBUaW1lRHVyYXRpb24ocmVhZGVyLnJlYWRJNjQoKSksXG4gIF9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX186IChyZWFkZXIpID0+IG5ldyBUaW1lc3RhbXAocmVhZGVyLnJlYWRJNjQoKSksXG4gIF9faWRlbnRpdHlfXzogKHJlYWRlcikgPT4gbmV3IElkZW50aXR5KHJlYWRlci5yZWFkVTI1NigpKSxcbiAgX19jb25uZWN0aW9uX2lkX186IChyZWFkZXIpID0+IG5ldyBDb25uZWN0aW9uSWQocmVhZGVyLnJlYWRVMTI4KCkpLFxuICBfX3V1aWRfXzogKHJlYWRlcikgPT4gbmV3IFV1aWQocmVhZGVyLnJlYWRVMTI4KCkpXG59O1xuT2JqZWN0LmZyZWV6ZShzcGVjaWFsUHJvZHVjdERlc2VyaWFsaXplcnMpO1xudmFyIHVuaXREZXNlcmlhbGl6ZXIgPSAoKSA9PiAoe30pO1xudmFyIGdldEVsZW1lbnRJbml0aWFsaXplciA9IChlbGVtZW50KSA9PiB7XG4gIGxldCBpbml0O1xuICBzd2l0Y2ggKGVsZW1lbnQuYWxnZWJyYWljVHlwZS50YWcpIHtcbiAgICBjYXNlIFwiU3RyaW5nXCI6XG4gICAgICBpbml0ID0gXCInJ1wiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkJvb2xcIjpcbiAgICAgIGluaXQgPSBcImZhbHNlXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiSThcIjpcbiAgICBjYXNlIFwiVThcIjpcbiAgICBjYXNlIFwiSTE2XCI6XG4gICAgY2FzZSBcIlUxNlwiOlxuICAgIGNhc2UgXCJJMzJcIjpcbiAgICBjYXNlIFwiVTMyXCI6XG4gICAgICBpbml0ID0gXCIwXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiSTY0XCI6XG4gICAgY2FzZSBcIlU2NFwiOlxuICAgIGNhc2UgXCJJMTI4XCI6XG4gICAgY2FzZSBcIlUxMjhcIjpcbiAgICBjYXNlIFwiSTI1NlwiOlxuICAgIGNhc2UgXCJVMjU2XCI6XG4gICAgICBpbml0ID0gXCIwblwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkYzMlwiOlxuICAgIGNhc2UgXCJGNjRcIjpcbiAgICAgIGluaXQgPSBcIjAuMFwiO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGluaXQgPSBcInVuZGVmaW5lZFwiO1xuICB9XG4gIHJldHVybiBgJHtlbGVtZW50Lm5hbWV9OiAke2luaXR9YDtcbn07XG52YXIgUHJvZHVjdFR5cGUgPSB7XG4gIG1ha2VTZXJpYWxpemVyKHR5LCB0eXBlc3BhY2UpIHtcbiAgICBsZXQgc2VyaWFsaXplciA9IFNFUklBTElaRVJTLmdldCh0eSk7XG4gICAgaWYgKHNlcmlhbGl6ZXIgIT0gbnVsbCkgcmV0dXJuIHNlcmlhbGl6ZXI7XG4gICAgaWYgKGlzRml4ZWRTaXplUHJvZHVjdCh0eSkpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBwcm9kdWN0U2l6ZSh0eSk7XG4gICAgICBjb25zdCBib2R5MiA9IGBcInVzZSBzdHJpY3RcIjtcbndyaXRlci5leHBhbmRCdWZmZXIoJHtzaXplfSk7XG5jb25zdCB2aWV3ID0gd3JpdGVyLnZpZXc7XG4ke3R5LmVsZW1lbnRzLm1hcChcbiAgICAgICAgKHsgbmFtZSwgYWxnZWJyYWljVHlwZTogeyB0YWcgfSB9KSA9PiB0YWcgaW4gcHJpbWl0aXZlSlNOYW1lID8gYHZpZXcuc2V0JHtwcmltaXRpdmVKU05hbWVbdGFnXX0od3JpdGVyLm9mZnNldCwgdmFsdWUuJHtuYW1lfSwgJHtwcmltaXRpdmVTaXplc1t0YWddID4gMSA/IFwidHJ1ZVwiIDogXCJcIn0pO1xud3JpdGVyLm9mZnNldCArPSAke3ByaW1pdGl2ZVNpemVzW3RhZ119O2AgOiBgd3JpdGVyLndyaXRlJHt0YWd9KHZhbHVlLiR7bmFtZX0pO2BcbiAgICAgICkuam9pbihcIlxcblwiKX1gO1xuICAgICAgc2VyaWFsaXplciA9IEZ1bmN0aW9uKFwid3JpdGVyXCIsIFwidmFsdWVcIiwgYm9keTIpO1xuICAgICAgU0VSSUFMSVpFUlMuc2V0KHR5LCBzZXJpYWxpemVyKTtcbiAgICAgIHJldHVybiBzZXJpYWxpemVyO1xuICAgIH1cbiAgICBjb25zdCBzZXJpYWxpemVycyA9IHt9O1xuICAgIGNvbnN0IGJvZHkgPSAnXCJ1c2Ugc3RyaWN0XCI7XFxuJyArIHR5LmVsZW1lbnRzLm1hcChcbiAgICAgIChlbGVtZW50KSA9PiBgdGhpcy4ke2VsZW1lbnQubmFtZX0od3JpdGVyLCB2YWx1ZS4ke2VsZW1lbnQubmFtZX0pO2BcbiAgICApLmpvaW4oXCJcXG5cIik7XG4gICAgc2VyaWFsaXplciA9IEZ1bmN0aW9uKFwid3JpdGVyXCIsIFwidmFsdWVcIiwgYm9keSkuYmluZChcbiAgICAgIHNlcmlhbGl6ZXJzXG4gICAgKTtcbiAgICBTRVJJQUxJWkVSUy5zZXQodHksIHNlcmlhbGl6ZXIpO1xuICAgIGZvciAoY29uc3QgeyBuYW1lLCBhbGdlYnJhaWNUeXBlIH0gb2YgdHkuZWxlbWVudHMpIHtcbiAgICAgIHNlcmlhbGl6ZXJzW25hbWVdID0gQWxnZWJyYWljVHlwZS5tYWtlU2VyaWFsaXplcihcbiAgICAgICAgYWxnZWJyYWljVHlwZSxcbiAgICAgICAgdHlwZXNwYWNlXG4gICAgICApO1xuICAgIH1cbiAgICBPYmplY3QuZnJlZXplKHNlcmlhbGl6ZXJzKTtcbiAgICByZXR1cm4gc2VyaWFsaXplcjtcbiAgfSxcbiAgLyoqIEBkZXByZWNhdGVkIFVzZSBgbWFrZVNlcmlhbGl6ZXJgIGluc3RlYWQuICovXG4gIHNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgdHksIHZhbHVlLCB0eXBlc3BhY2UpIHtcbiAgICBQcm9kdWN0VHlwZS5tYWtlU2VyaWFsaXplcih0eSwgdHlwZXNwYWNlKSh3cml0ZXIsIHZhbHVlKTtcbiAgfSxcbiAgbWFrZURlc2VyaWFsaXplcih0eSwgdHlwZXNwYWNlKSB7XG4gICAgc3dpdGNoICh0eS5lbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIHVuaXREZXNlcmlhbGl6ZXI7XG4gICAgICBjYXNlIDE6IHtcbiAgICAgICAgY29uc3QgZmllbGROYW1lID0gdHkuZWxlbWVudHNbMF0ubmFtZTtcbiAgICAgICAgaWYgKGhhc093bihzcGVjaWFsUHJvZHVjdERlc2VyaWFsaXplcnMsIGZpZWxkTmFtZSkpXG4gICAgICAgICAgcmV0dXJuIHNwZWNpYWxQcm9kdWN0RGVzZXJpYWxpemVyc1tmaWVsZE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgZGVzZXJpYWxpemVyID0gREVTRVJJQUxJWkVSUy5nZXQodHkpO1xuICAgIGlmIChkZXNlcmlhbGl6ZXIgIT0gbnVsbCkgcmV0dXJuIGRlc2VyaWFsaXplcjtcbiAgICBpZiAoaXNGaXhlZFNpemVQcm9kdWN0KHR5KSkge1xuICAgICAgY29uc3QgYm9keSA9IGBcInVzZSBzdHJpY3RcIjtcbmNvbnN0IHJlc3VsdCA9IHsgJHt0eS5lbGVtZW50cy5tYXAoZ2V0RWxlbWVudEluaXRpYWxpemVyKS5qb2luKFwiLCBcIil9IH07XG5jb25zdCB2aWV3ID0gcmVhZGVyLnZpZXc7XG4ke3R5LmVsZW1lbnRzLm1hcChcbiAgICAgICAgKHsgbmFtZSwgYWxnZWJyYWljVHlwZTogeyB0YWcgfSB9KSA9PiB0YWcgaW4gcHJpbWl0aXZlSlNOYW1lID8gYHJlc3VsdC4ke25hbWV9ID0gdmlldy5nZXQke3ByaW1pdGl2ZUpTTmFtZVt0YWddfShyZWFkZXIub2Zmc2V0LCAke3ByaW1pdGl2ZVNpemVzW3RhZ10gPiAxID8gXCJ0cnVlXCIgOiBcIlwifSk7XG5yZWFkZXIub2Zmc2V0ICs9ICR7cHJpbWl0aXZlU2l6ZXNbdGFnXX07YCA6IGByZXN1bHQuJHtuYW1lfSA9IHJlYWRlci5yZWFkJHt0YWd9KCk7YFxuICAgICAgKS5qb2luKFwiXFxuXCIpfVxucmV0dXJuIHJlc3VsdDtgO1xuICAgICAgZGVzZXJpYWxpemVyID0gRnVuY3Rpb24oXCJyZWFkZXJcIiwgYm9keSk7XG4gICAgICBERVNFUklBTElaRVJTLnNldCh0eSwgZGVzZXJpYWxpemVyKTtcbiAgICAgIHJldHVybiBkZXNlcmlhbGl6ZXI7XG4gICAgfVxuICAgIGNvbnN0IGRlc2VyaWFsaXplcnMgPSB7fTtcbiAgICBkZXNlcmlhbGl6ZXIgPSBGdW5jdGlvbihcbiAgICAgIFwicmVhZGVyXCIsXG4gICAgICBgXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCByZXN1bHQgPSB7ICR7dHkuZWxlbWVudHMubWFwKGdldEVsZW1lbnRJbml0aWFsaXplcikuam9pbihcIiwgXCIpfSB9O1xuJHt0eS5lbGVtZW50cy5tYXAoKHsgbmFtZSB9KSA9PiBgcmVzdWx0LiR7bmFtZX0gPSB0aGlzLiR7bmFtZX0ocmVhZGVyKTtgKS5qb2luKFwiXFxuXCIpfVxucmV0dXJuIHJlc3VsdDtgXG4gICAgKS5iaW5kKGRlc2VyaWFsaXplcnMpO1xuICAgIERFU0VSSUFMSVpFUlMuc2V0KHR5LCBkZXNlcmlhbGl6ZXIpO1xuICAgIGZvciAoY29uc3QgeyBuYW1lLCBhbGdlYnJhaWNUeXBlIH0gb2YgdHkuZWxlbWVudHMpIHtcbiAgICAgIGRlc2VyaWFsaXplcnNbbmFtZV0gPSBBbGdlYnJhaWNUeXBlLm1ha2VEZXNlcmlhbGl6ZXIoXG4gICAgICAgIGFsZ2VicmFpY1R5cGUsXG4gICAgICAgIHR5cGVzcGFjZVxuICAgICAgKTtcbiAgICB9XG4gICAgT2JqZWN0LmZyZWV6ZShkZXNlcmlhbGl6ZXJzKTtcbiAgICByZXR1cm4gZGVzZXJpYWxpemVyO1xuICB9LFxuICAvKiogQGRlcHJlY2F0ZWQgVXNlIGBtYWtlRGVzZXJpYWxpemVyYCBpbnN0ZWFkLiAqL1xuICBkZXNlcmlhbGl6ZVZhbHVlKHJlYWRlciwgdHksIHR5cGVzcGFjZSkge1xuICAgIHJldHVybiBQcm9kdWN0VHlwZS5tYWtlRGVzZXJpYWxpemVyKHR5LCB0eXBlc3BhY2UpKHJlYWRlcik7XG4gIH0sXG4gIGludG9NYXBLZXkodHksIHZhbHVlKSB7XG4gICAgaWYgKHR5LmVsZW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgZmllbGROYW1lID0gdHkuZWxlbWVudHNbMF0ubmFtZTtcbiAgICAgIGlmIChoYXNPd24oc3BlY2lhbFByb2R1Y3REZXNlcmlhbGl6ZXJzLCBmaWVsZE5hbWUpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZVtmaWVsZE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB3cml0ZXIgPSBuZXcgQmluYXJ5V3JpdGVyKDEwKTtcbiAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHR5KSwgdmFsdWUpO1xuICAgIHJldHVybiB3cml0ZXIudG9CYXNlNjQoKTtcbiAgfVxufTtcbnZhciBTdW1UeXBlID0ge1xuICBtYWtlU2VyaWFsaXplcih0eSwgdHlwZXNwYWNlKSB7XG4gICAgaWYgKHR5LnZhcmlhbnRzLmxlbmd0aCA9PSAyICYmIHR5LnZhcmlhbnRzWzBdLm5hbWUgPT09IFwic29tZVwiICYmIHR5LnZhcmlhbnRzWzFdLm5hbWUgPT09IFwibm9uZVwiKSB7XG4gICAgICBjb25zdCBzZXJpYWxpemUgPSBBbGdlYnJhaWNUeXBlLm1ha2VTZXJpYWxpemVyKFxuICAgICAgICB0eS52YXJpYW50c1swXS5hbGdlYnJhaWNUeXBlLFxuICAgICAgICB0eXBlc3BhY2VcbiAgICAgICk7XG4gICAgICByZXR1cm4gKHdyaXRlciwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcbiAgICAgICAgICB3cml0ZXIud3JpdGVCeXRlKDApO1xuICAgICAgICAgIHNlcmlhbGl6ZSh3cml0ZXIsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3cml0ZXIud3JpdGVCeXRlKDEpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHkudmFyaWFudHMubGVuZ3RoID09IDIgJiYgdHkudmFyaWFudHNbMF0ubmFtZSA9PT0gXCJva1wiICYmIHR5LnZhcmlhbnRzWzFdLm5hbWUgPT09IFwiZXJyXCIpIHtcbiAgICAgIGNvbnN0IHNlcmlhbGl6ZU9rID0gQWxnZWJyYWljVHlwZS5tYWtlU2VyaWFsaXplcihcbiAgICAgICAgdHkudmFyaWFudHNbMF0uYWxnZWJyYWljVHlwZSxcbiAgICAgICAgdHlwZXNwYWNlXG4gICAgICApO1xuICAgICAgY29uc3Qgc2VyaWFsaXplRXJyID0gQWxnZWJyYWljVHlwZS5tYWtlU2VyaWFsaXplcihcbiAgICAgICAgdHkudmFyaWFudHNbMF0uYWxnZWJyYWljVHlwZSxcbiAgICAgICAgdHlwZXNwYWNlXG4gICAgICApO1xuICAgICAgcmV0dXJuICh3cml0ZXIsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChcIm9rXCIgaW4gdmFsdWUpIHtcbiAgICAgICAgICB3cml0ZXIud3JpdGVVOCgwKTtcbiAgICAgICAgICBzZXJpYWxpemVPayh3cml0ZXIsIHZhbHVlLm9rKTtcbiAgICAgICAgfSBlbHNlIGlmIChcImVyclwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgd3JpdGVyLndyaXRlVTgoMSk7XG4gICAgICAgICAgc2VyaWFsaXplRXJyKHdyaXRlciwgdmFsdWUuZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgXCJjb3VsZCBub3Qgc2VyaWFsaXplIHJlc3VsdDogb2JqZWN0IGhhZCBuZWl0aGVyIGEgYG9rYCBub3IgYW4gYGVycmAgZmllbGRcIlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzZXJpYWxpemVyID0gU0VSSUFMSVpFUlMuZ2V0KHR5KTtcbiAgICAgIGlmIChzZXJpYWxpemVyICE9IG51bGwpIHJldHVybiBzZXJpYWxpemVyO1xuICAgICAgY29uc3Qgc2VyaWFsaXplcnMgPSB7fTtcbiAgICAgIGNvbnN0IGJvZHkgPSBgc3dpdGNoICh2YWx1ZS50YWcpIHtcbiR7dHkudmFyaWFudHMubWFwKFxuICAgICAgICAoeyBuYW1lIH0sIGkpID0+IGAgIGNhc2UgJHtKU09OLnN0cmluZ2lmeShuYW1lKX06XG4gICAgd3JpdGVyLndyaXRlQnl0ZSgke2l9KTtcbiAgICByZXR1cm4gdGhpcy4ke25hbWV9KHdyaXRlciwgdmFsdWUudmFsdWUpO2BcbiAgICAgICkuam9pbihcIlxcblwiKX1cbiAgZGVmYXVsdDpcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgXFxgQ291bGQgbm90IHNlcmlhbGl6ZSBzdW0gdHlwZTsgdW5rbm93biB0YWcgXFwke3ZhbHVlLnRhZ31cXGBcbiAgICApXG59XG5gO1xuICAgICAgc2VyaWFsaXplciA9IEZ1bmN0aW9uKFwid3JpdGVyXCIsIFwidmFsdWVcIiwgYm9keSkuYmluZChcbiAgICAgICAgc2VyaWFsaXplcnNcbiAgICAgICk7XG4gICAgICBTRVJJQUxJWkVSUy5zZXQodHksIHNlcmlhbGl6ZXIpO1xuICAgICAgZm9yIChjb25zdCB7IG5hbWUsIGFsZ2VicmFpY1R5cGUgfSBvZiB0eS52YXJpYW50cykge1xuICAgICAgICBzZXJpYWxpemVyc1tuYW1lXSA9IEFsZ2VicmFpY1R5cGUubWFrZVNlcmlhbGl6ZXIoXG4gICAgICAgICAgYWxnZWJyYWljVHlwZSxcbiAgICAgICAgICB0eXBlc3BhY2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIE9iamVjdC5mcmVlemUoc2VyaWFsaXplcnMpO1xuICAgICAgcmV0dXJuIHNlcmlhbGl6ZXI7XG4gICAgfVxuICB9LFxuICAvKiogQGRlcHJlY2F0ZWQgVXNlIGBtYWtlU2VyaWFsaXplcmAgaW5zdGVhZC4gKi9cbiAgc2VyaWFsaXplVmFsdWUod3JpdGVyLCB0eSwgdmFsdWUsIHR5cGVzcGFjZSkge1xuICAgIFN1bVR5cGUubWFrZVNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkod3JpdGVyLCB2YWx1ZSk7XG4gIH0sXG4gIG1ha2VEZXNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkge1xuICAgIGlmICh0eS52YXJpYW50cy5sZW5ndGggPT0gMiAmJiB0eS52YXJpYW50c1swXS5uYW1lID09PSBcInNvbWVcIiAmJiB0eS52YXJpYW50c1sxXS5uYW1lID09PSBcIm5vbmVcIikge1xuICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBBbGdlYnJhaWNUeXBlLm1ha2VEZXNlcmlhbGl6ZXIoXG4gICAgICAgIHR5LnZhcmlhbnRzWzBdLmFsZ2VicmFpY1R5cGUsXG4gICAgICAgIHR5cGVzcGFjZVxuICAgICAgKTtcbiAgICAgIHJldHVybiAocmVhZGVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhZyA9IHJlYWRlci5yZWFkVTgoKTtcbiAgICAgICAgaWYgKHRhZyA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBkZXNlcmlhbGl6ZShyZWFkZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhZyA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgYENhbid0IGRlc2VyaWFsaXplIGFuIG9wdGlvbiB0eXBlLCBjb3VsZG4ndCBmaW5kICR7dGFnfSB0YWdgO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHkudmFyaWFudHMubGVuZ3RoID09IDIgJiYgdHkudmFyaWFudHNbMF0ubmFtZSA9PT0gXCJva1wiICYmIHR5LnZhcmlhbnRzWzFdLm5hbWUgPT09IFwiZXJyXCIpIHtcbiAgICAgIGNvbnN0IGRlc2VyaWFsaXplT2sgPSBBbGdlYnJhaWNUeXBlLm1ha2VEZXNlcmlhbGl6ZXIoXG4gICAgICAgIHR5LnZhcmlhbnRzWzBdLmFsZ2VicmFpY1R5cGUsXG4gICAgICAgIHR5cGVzcGFjZVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRlc2VyaWFsaXplRXJyID0gQWxnZWJyYWljVHlwZS5tYWtlRGVzZXJpYWxpemVyKFxuICAgICAgICB0eS52YXJpYW50c1sxXS5hbGdlYnJhaWNUeXBlLFxuICAgICAgICB0eXBlc3BhY2VcbiAgICAgICk7XG4gICAgICByZXR1cm4gKHJlYWRlcikgPT4ge1xuICAgICAgICBjb25zdCB0YWcgPSByZWFkZXIucmVhZEJ5dGUoKTtcbiAgICAgICAgaWYgKHRhZyA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB7IG9rOiBkZXNlcmlhbGl6ZU9rKHJlYWRlcikgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0YWcgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4geyBlcnI6IGRlc2VyaWFsaXplRXJyKHJlYWRlcikgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBgQ2FuJ3QgZGVzZXJpYWxpemUgYSByZXN1bHQgdHlwZSwgY291bGRuJ3QgZmluZCAke3RhZ30gdGFnYDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGRlc2VyaWFsaXplciA9IERFU0VSSUFMSVpFUlMuZ2V0KHR5KTtcbiAgICAgIGlmIChkZXNlcmlhbGl6ZXIgIT0gbnVsbCkgcmV0dXJuIGRlc2VyaWFsaXplcjtcbiAgICAgIGNvbnN0IGRlc2VyaWFsaXplcnMgPSB7fTtcbiAgICAgIGRlc2VyaWFsaXplciA9IEZ1bmN0aW9uKFxuICAgICAgICBcInJlYWRlclwiLFxuICAgICAgICBgc3dpdGNoIChyZWFkZXIucmVhZFU4KCkpIHtcbiR7dHkudmFyaWFudHMubWFwKFxuICAgICAgICAgICh7IG5hbWUgfSwgaSkgPT4gYGNhc2UgJHtpfTogcmV0dXJuIHsgdGFnOiAke0pTT04uc3RyaW5naWZ5KG5hbWUpfSwgdmFsdWU6IHRoaXMuJHtuYW1lfShyZWFkZXIpIH07YFxuICAgICAgICApLmpvaW4oXCJcXG5cIil9IH1gXG4gICAgICApLmJpbmQoZGVzZXJpYWxpemVycyk7XG4gICAgICBERVNFUklBTElaRVJTLnNldCh0eSwgZGVzZXJpYWxpemVyKTtcbiAgICAgIGZvciAoY29uc3QgeyBuYW1lLCBhbGdlYnJhaWNUeXBlIH0gb2YgdHkudmFyaWFudHMpIHtcbiAgICAgICAgZGVzZXJpYWxpemVyc1tuYW1lXSA9IEFsZ2VicmFpY1R5cGUubWFrZURlc2VyaWFsaXplcihcbiAgICAgICAgICBhbGdlYnJhaWNUeXBlLFxuICAgICAgICAgIHR5cGVzcGFjZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgT2JqZWN0LmZyZWV6ZShkZXNlcmlhbGl6ZXJzKTtcbiAgICAgIHJldHVybiBkZXNlcmlhbGl6ZXI7XG4gICAgfVxuICB9LFxuICAvKiogQGRlcHJlY2F0ZWQgVXNlIGBtYWtlRGVzZXJpYWxpemVyYCBpbnN0ZWFkLiAqL1xuICBkZXNlcmlhbGl6ZVZhbHVlKHJlYWRlciwgdHksIHR5cGVzcGFjZSkge1xuICAgIHJldHVybiBTdW1UeXBlLm1ha2VEZXNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkocmVhZGVyKTtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi9vcHRpb24udHNcbnZhciBPcHRpb24gPSB7XG4gIGdldEFsZ2VicmFpY1R5cGUoaW5uZXJUeXBlKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuU3VtKHtcbiAgICAgIHZhcmlhbnRzOiBbXG4gICAgICAgIHsgbmFtZTogXCJzb21lXCIsIGFsZ2VicmFpY1R5cGU6IGlubmVyVHlwZSB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJub25lXCIsXG4gICAgICAgICAgYWxnZWJyYWljVHlwZTogQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHsgZWxlbWVudHM6IFtdIH0pXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi9yZXN1bHQudHNcbnZhciBSZXN1bHQgPSB7XG4gIGdldEFsZ2VicmFpY1R5cGUob2tUeXBlLCBlcnJUeXBlKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuU3VtKHtcbiAgICAgIHZhcmlhbnRzOiBbXG4gICAgICAgIHsgbmFtZTogXCJva1wiLCBhbGdlYnJhaWNUeXBlOiBva1R5cGUgfSxcbiAgICAgICAgeyBuYW1lOiBcImVyclwiLCBhbGdlYnJhaWNUeXBlOiBlcnJUeXBlIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi9zY2hlZHVsZV9hdC50c1xudmFyIFNjaGVkdWxlQXQgPSB7XG4gIGludGVydmFsKHZhbHVlKSB7XG4gICAgcmV0dXJuIEludGVydmFsKHZhbHVlKTtcbiAgfSxcbiAgdGltZSh2YWx1ZSkge1xuICAgIHJldHVybiBUaW1lKHZhbHVlKTtcbiAgfSxcbiAgZ2V0QWxnZWJyYWljVHlwZSgpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZS5TdW0oe1xuICAgICAgdmFyaWFudHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiSW50ZXJ2YWxcIixcbiAgICAgICAgICBhbGdlYnJhaWNUeXBlOiBUaW1lRHVyYXRpb24uZ2V0QWxnZWJyYWljVHlwZSgpXG4gICAgICAgIH0sXG4gICAgICAgIHsgbmFtZTogXCJUaW1lXCIsIGFsZ2VicmFpY1R5cGU6IFRpbWVzdGFtcC5nZXRBbGdlYnJhaWNUeXBlKCkgfVxuICAgICAgXVxuICAgIH0pO1xuICB9LFxuICBpc1NjaGVkdWxlQXQoYWxnZWJyYWljVHlwZSkge1xuICAgIGlmIChhbGdlYnJhaWNUeXBlLnRhZyAhPT0gXCJTdW1cIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB2YXJpYW50cyA9IGFsZ2VicmFpY1R5cGUudmFsdWUudmFyaWFudHM7XG4gICAgaWYgKHZhcmlhbnRzLmxlbmd0aCAhPT0gMikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpbnRlcnZhbFZhcmlhbnQgPSB2YXJpYW50cy5maW5kKCh2KSA9PiB2Lm5hbWUgPT09IFwiSW50ZXJ2YWxcIik7XG4gICAgY29uc3QgdGltZVZhcmlhbnQgPSB2YXJpYW50cy5maW5kKCh2KSA9PiB2Lm5hbWUgPT09IFwiVGltZVwiKTtcbiAgICBpZiAoIWludGVydmFsVmFyaWFudCB8fCAhdGltZVZhcmlhbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIFRpbWVEdXJhdGlvbi5pc1RpbWVEdXJhdGlvbihpbnRlcnZhbFZhcmlhbnQuYWxnZWJyYWljVHlwZSkgJiYgVGltZXN0YW1wLmlzVGltZXN0YW1wKHRpbWVWYXJpYW50LmFsZ2VicmFpY1R5cGUpO1xuICB9XG59O1xudmFyIEludGVydmFsID0gKG1pY3JvcykgPT4gKHtcbiAgdGFnOiBcIkludGVydmFsXCIsXG4gIHZhbHVlOiBuZXcgVGltZUR1cmF0aW9uKG1pY3Jvcylcbn0pO1xudmFyIFRpbWUgPSAobWljcm9zU2luY2VVbml4RXBvY2gpID0+ICh7XG4gIHRhZzogXCJUaW1lXCIsXG4gIHZhbHVlOiBuZXcgVGltZXN0YW1wKG1pY3Jvc1NpbmNlVW5peEVwb2NoKVxufSk7XG52YXIgc2NoZWR1bGVfYXRfZGVmYXVsdCA9IFNjaGVkdWxlQXQ7XG5cbi8vIHNyYy9saWIvdHlwZV91dGlsLnRzXG5mdW5jdGlvbiBzZXQoeCwgdDIpIHtcbiAgcmV0dXJuIHsgLi4ueCwgLi4udDIgfTtcbn1cblxuLy8gc3JjL2xpYi90eXBlX2J1aWxkZXJzLnRzXG52YXIgVHlwZUJ1aWxkZXIgPSBjbGFzcyB7XG4gIC8qKlxuICAgKiBUaGUgVHlwZVNjcmlwdCBwaGFudG9tIHR5cGUuIFRoaXMgaXMgbm90IHN0b3JlZCBhdCBydW50aW1lLFxuICAgKiBidXQgaXMgdmlzaWJsZSB0byB0aGUgY29tcGlsZXJcbiAgICovXG4gIHR5cGU7XG4gIC8qKlxuICAgKiBUaGUgU3BhY2V0aW1lREIgYWxnZWJyYWljIHR5cGUgKHJ1buKAkXRpbWUgdmFsdWUpLiBJbiBhZGRpdGlvbiB0byBzdG9yaW5nXG4gICAqIHRoZSBydW50aW1lIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBgQWxnZWJyYWljVHlwZWAsIGl0IGFsc28gY2FwdHVyZXNcbiAgICogdGhlIFR5cGVTY3JpcHQgdHlwZSBpbmZvcm1hdGlvbiBvZiB0aGUgYEFsZ2VicmFpY1R5cGVgLiBUaGF0IGlzIHRvIHNheVxuICAgKiB0aGUgdmFsdWUgaXMgbm90IG1lcmVseSBhbiBgQWxnZWJyYWljVHlwZWAsIGJ1dCBpcyBjb25zdHJ1Y3RlZCB0byBiZVxuICAgKiB0aGUgY29ycmVzcG9uZGluZyBjb25jcmV0ZSBgQWxnZWJyYWljVHlwZWAgZm9yIHRoZSBUeXBlU2NyaXB0IHR5cGUgYFR5cGVgLlxuICAgKlxuICAgKiBlLmcuIGBzdHJpbmdgIGNvcnJlc3BvbmRzIHRvIGBBbGdlYnJhaWNUeXBlLlN0cmluZ2BcbiAgICovXG4gIGFsZ2VicmFpY1R5cGU7XG4gIGNvbnN0cnVjdG9yKGFsZ2VicmFpY1R5cGUpIHtcbiAgICB0aGlzLmFsZ2VicmFpY1R5cGUgPSBhbGdlYnJhaWNUeXBlO1xuICB9XG4gIG9wdGlvbmFsKCkge1xuICAgIHJldHVybiBuZXcgT3B0aW9uQnVpbGRlcih0aGlzKTtcbiAgfVxuICBzZXJpYWxpemUod3JpdGVyLCB2YWx1ZSkge1xuICAgIGNvbnN0IHNlcmlhbGl6ZSA9IHRoaXMuc2VyaWFsaXplID0gQWxnZWJyYWljVHlwZS5tYWtlU2VyaWFsaXplcihcbiAgICAgIHRoaXMuYWxnZWJyYWljVHlwZVxuICAgICk7XG4gICAgc2VyaWFsaXplKHdyaXRlciwgdmFsdWUpO1xuICB9XG4gIGRlc2VyaWFsaXplKHJlYWRlcikge1xuICAgIGNvbnN0IGRlc2VyaWFsaXplID0gdGhpcy5kZXNlcmlhbGl6ZSA9IEFsZ2VicmFpY1R5cGUubWFrZURlc2VyaWFsaXplcihcbiAgICAgIHRoaXMuYWxnZWJyYWljVHlwZVxuICAgICk7XG4gICAgcmV0dXJuIGRlc2VyaWFsaXplKHJlYWRlcik7XG4gIH1cbn07XG52YXIgVThCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuVTgpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IFU4Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBVOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFU4Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFUxNkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5VMTYpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBVMTZDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBVMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFUzMkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5VMzIpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBVMzJDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBVMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFU2NEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5VNjQpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBVNjRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBVNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVTY0Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFUxMjhCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuVTEyOCk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBVMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBVMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBVMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFUxMjhDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgVTI1NkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5VMjU2KTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IFUyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IFUyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBVMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IFUyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBVMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVTI1NkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBJOEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5JOCk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBJOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgSThDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBJOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBJOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEk4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgSThDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgSTE2QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkkxNik7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEkxNkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KSk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IEkxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgSTMyQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkkzMik7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEkzMkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KSk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IEkzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgSTY0QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkk2NCk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBJNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEk2NENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KSk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IEk2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBJNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBJNjRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgSTEyOEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5JMTI4KTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IEkxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEkxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBJMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IEkxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgSTEyOENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBJMjU2QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkkyNTYpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IEkyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEkyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBJMjU2Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIEYzMkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5GMzIpO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEYzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEYzMkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBGNjRCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuRjY0KTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBGNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBGNjRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgQm9vbEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5Cb29sKTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBCb29sQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgQm9vbENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgU3RyaW5nQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLlN0cmluZyk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBTdHJpbmdDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IFN0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IFN0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFN0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFN0cmluZ0NvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBBcnJheUJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgZWxlbWVudDtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuQXJyYXkoZWxlbWVudC5hbGdlYnJhaWNUeXBlKSk7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBBcnJheUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEFycmF5Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIEJ5dGVBcnJheUJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5BcnJheShBbGdlYnJhaWNUeXBlLlU4KSk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgQnl0ZUFycmF5Q29sdW1uQnVpbGRlcihcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBCeXRlQXJyYXlDb2x1bW5CdWlsZGVyKHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgT3B0aW9uQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICB2YWx1ZTtcbiAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICBzdXBlcihPcHRpb24uZ2V0QWxnZWJyYWljVHlwZSh2YWx1ZS5hbGdlYnJhaWNUeXBlKSk7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IE9wdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IE9wdGlvbkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBQcm9kdWN0QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICB0eXBlTmFtZTtcbiAgZWxlbWVudHM7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRzLCBuYW1lKSB7XG4gICAgZnVuY3Rpb24gZWxlbWVudHNBcnJheUZyb21FbGVtZW50c09iaihvYmopIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcCgoa2V5KSA9PiAoe1xuICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgIC8vIExhemlseSByZXNvbHZlIHRoZSB1bmRlcmx5aW5nIG9iamVjdCdzIGFsZ2VicmFpY1R5cGUuXG4gICAgICAgIC8vIFRoaXMgd2lsbCBjYWxsIG9ialtrZXldLmFsZ2VicmFpY1R5cGUgb25seSB3aGVuIHNvbWVvbmVcbiAgICAgICAgLy8gYWN0dWFsbHkgcmVhZHMgdGhpcyBwcm9wZXJ0eS5cbiAgICAgICAgZ2V0IGFsZ2VicmFpY1R5cGUoKSB7XG4gICAgICAgICAgcmV0dXJuIG9ialtrZXldLmFsZ2VicmFpY1R5cGU7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9XG4gICAgc3VwZXIoXG4gICAgICBBbGdlYnJhaWNUeXBlLlByb2R1Y3Qoe1xuICAgICAgICBlbGVtZW50czogZWxlbWVudHNBcnJheUZyb21FbGVtZW50c09iaihlbGVtZW50cylcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnR5cGVOYW1lID0gbmFtZTtcbiAgICB0aGlzLmVsZW1lbnRzID0gZWxlbWVudHM7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgUHJvZHVjdENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb2R1Y3RDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgUmVzdWx0QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBvaztcbiAgZXJyO1xuICBjb25zdHJ1Y3RvcihvaywgZXJyKSB7XG4gICAgc3VwZXIoUmVzdWx0LmdldEFsZ2VicmFpY1R5cGUob2suYWxnZWJyYWljVHlwZSwgZXJyLmFsZ2VicmFpY1R5cGUpKTtcbiAgICB0aGlzLm9rID0gb2s7XG4gICAgdGhpcy5lcnIgPSBlcnI7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgUmVzdWx0Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSkpO1xuICB9XG59O1xudmFyIFVuaXRCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHsgdGFnOiBcIlByb2R1Y3RcIiwgdmFsdWU6IHsgZWxlbWVudHM6IFtdIH0gfSk7XG4gIH1cbn07XG52YXIgUm93QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICByb3c7XG4gIHR5cGVOYW1lO1xuICBjb25zdHJ1Y3Rvcihyb3csIG5hbWUpIHtcbiAgICBjb25zdCBtYXBwZWRSb3cgPSBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICBPYmplY3QuZW50cmllcyhyb3cpLm1hcCgoW2NvbE5hbWUsIGJ1aWxkZXJdKSA9PiBbXG4gICAgICAgIGNvbE5hbWUsXG4gICAgICAgIGJ1aWxkZXIgaW5zdGFuY2VvZiBDb2x1bW5CdWlsZGVyID8gYnVpbGRlciA6IG5ldyBDb2x1bW5CdWlsZGVyKGJ1aWxkZXIsIHt9KVxuICAgICAgXSlcbiAgICApO1xuICAgIGNvbnN0IGVsZW1lbnRzID0gT2JqZWN0LmtleXMobWFwcGVkUm93KS5tYXAoKG5hbWUyKSA9PiAoe1xuICAgICAgbmFtZTogbmFtZTIsXG4gICAgICBnZXQgYWxnZWJyYWljVHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIG1hcHBlZFJvd1tuYW1lMl0udHlwZUJ1aWxkZXIuYWxnZWJyYWljVHlwZTtcbiAgICAgIH1cbiAgICB9KSk7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHsgZWxlbWVudHMgfSkpO1xuICAgIHRoaXMucm93ID0gbWFwcGVkUm93O1xuICAgIHRoaXMudHlwZU5hbWUgPSBuYW1lO1xuICB9XG59O1xudmFyIFN1bUJ1aWxkZXJJbXBsID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIHZhcmlhbnRzO1xuICB0eXBlTmFtZTtcbiAgY29uc3RydWN0b3IodmFyaWFudHMsIG5hbWUpIHtcbiAgICBmdW5jdGlvbiB2YXJpYW50c0FycmF5RnJvbVZhcmlhbnRzT2JqKHZhcmlhbnRzMikge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhcmlhbnRzMikubWFwKChrZXkpID0+ICh7XG4gICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgLy8gTGF6aWx5IHJlc29sdmUgdGhlIHVuZGVybHlpbmcgb2JqZWN0J3MgYWxnZWJyYWljVHlwZS5cbiAgICAgICAgLy8gVGhpcyB3aWxsIGNhbGwgb2JqW2tleV0uYWxnZWJyYWljVHlwZSBvbmx5IHdoZW4gc29tZW9uZVxuICAgICAgICAvLyBhY3R1YWxseSByZWFkcyB0aGlzIHByb3BlcnR5LlxuICAgICAgICBnZXQgYWxnZWJyYWljVHlwZSgpIHtcbiAgICAgICAgICByZXR1cm4gdmFyaWFudHMyW2tleV0uYWxnZWJyYWljVHlwZTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH1cbiAgICBzdXBlcihcbiAgICAgIEFsZ2VicmFpY1R5cGUuU3VtKHtcbiAgICAgICAgdmFyaWFudHM6IHZhcmlhbnRzQXJyYXlGcm9tVmFyaWFudHNPYmoodmFyaWFudHMpXG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy52YXJpYW50cyA9IHZhcmlhbnRzO1xuICAgIHRoaXMudHlwZU5hbWUgPSBuYW1lO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHZhcmlhbnRzKSkge1xuICAgICAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFyaWFudHMsIGtleSk7XG4gICAgICBjb25zdCBpc0FjY2Vzc29yID0gISFkZXNjICYmICh0eXBlb2YgZGVzYy5nZXQgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgZGVzYy5zZXQgPT09IFwiZnVuY3Rpb25cIik7XG4gICAgICBsZXQgaXNVbml0MiA9IGZhbHNlO1xuICAgICAgaWYgKCFpc0FjY2Vzc29yKSB7XG4gICAgICAgIGNvbnN0IHZhcmlhbnQgPSB2YXJpYW50c1trZXldO1xuICAgICAgICBpc1VuaXQyID0gdmFyaWFudCBpbnN0YW5jZW9mIFVuaXRCdWlsZGVyO1xuICAgICAgfVxuICAgICAgaWYgKGlzVW5pdDIpIHtcbiAgICAgICAgY29uc3QgY29uc3RhbnQgPSB0aGlzLmNyZWF0ZShrZXkpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCB7XG4gICAgICAgICAgdmFsdWU6IGNvbnN0YW50LFxuICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmbiA9ICgodmFsdWUpID0+IHRoaXMuY3JlYXRlKGtleSwgdmFsdWUpKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwge1xuICAgICAgICAgIHZhbHVlOiBmbixcbiAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjcmVhdGUodGFnLCB2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdm9pZCAwID8geyB0YWcgfSA6IHsgdGFnLCB2YWx1ZSB9O1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFN1bUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFN1bUNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBTdW1CdWlsZGVyID0gU3VtQnVpbGRlckltcGw7XG52YXIgU2ltcGxlU3VtQnVpbGRlckltcGwgPSBjbGFzcyBleHRlbmRzIFN1bUJ1aWxkZXJJbXBsIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBTaW1wbGVTdW1Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBTaW1wbGVTdW1Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBTaW1wbGVTdW1CdWlsZGVyID0gU2ltcGxlU3VtQnVpbGRlckltcGw7XG52YXIgU2NoZWR1bGVBdEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoc2NoZWR1bGVfYXRfZGVmYXVsdC5nZXRBbGdlYnJhaWNUeXBlKCkpO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFNjaGVkdWxlQXRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBTY2hlZHVsZUF0Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIElkZW50aXR5QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihJZGVudGl0eS5nZXRBbGdlYnJhaWNUeXBlKCkpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IElkZW50aXR5Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJZGVudGl0eUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IElkZW50aXR5Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIENvbm5lY3Rpb25JZEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQ29ubmVjdGlvbklkLmdldEFsZ2VicmFpY1R5cGUoKSk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgVGltZXN0YW1wQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihUaW1lc3RhbXAuZ2V0QWxnZWJyYWljVHlwZSgpKTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBUaW1lRHVyYXRpb25CdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFRpbWVEdXJhdGlvbi5nZXRBbGdlYnJhaWNUeXBlKCkpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFV1aWRCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFV1aWQuZ2V0QWxnZWJyYWljVHlwZSgpKTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IFV1aWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IFV1aWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBVdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IFV1aWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBVdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVXVpZENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBkZWZhdWx0TWV0YWRhdGEgPSB7fTtcbnZhciBDb2x1bW5CdWlsZGVyID0gY2xhc3Mge1xuICB0eXBlQnVpbGRlcjtcbiAgY29sdW1uTWV0YWRhdGE7XG4gIGNvbnN0cnVjdG9yKHR5cGVCdWlsZGVyLCBtZXRhZGF0YSkge1xuICAgIHRoaXMudHlwZUJ1aWxkZXIgPSB0eXBlQnVpbGRlcjtcbiAgICB0aGlzLmNvbHVtbk1ldGFkYXRhID0gbWV0YWRhdGE7XG4gIH1cbiAgc2VyaWFsaXplKHdyaXRlciwgdmFsdWUpIHtcbiAgICB0aGlzLnR5cGVCdWlsZGVyLnNlcmlhbGl6ZSh3cml0ZXIsIHZhbHVlKTtcbiAgfVxuICBkZXNlcmlhbGl6ZShyZWFkZXIpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlQnVpbGRlci5kZXNlcmlhbGl6ZShyZWFkZXIpO1xuICB9XG59O1xudmFyIFU4Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9VOENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX1U4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1U4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFUxNkNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfVTE2Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9VMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9VMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9VMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1UxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1UxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgVTMyQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9VMzJDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX1UzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9VMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX1UzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX1UzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBVNjRDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1U2NENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX1U2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9VNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9VNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFUxMjhDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1UxMjhDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX1UxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX1UxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1UxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9VMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBVMjU2Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9VMjU2Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9VMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX1UyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX1UyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9VMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9VMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfVTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgSThDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0k4Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9JOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9JOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfSThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9JOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfSThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9JOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgSTE2Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9JMTZDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX0kxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9JMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX0kxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX0kxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfSTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfSTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBJMzJDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0kzMkNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfSTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX0kzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9JMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9JMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIEk2NENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfSTY0Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9JNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9JNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9JNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0k2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0k2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgSTEyOENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfSTEyOENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfSTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9JMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9JMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfSTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0kxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIEkyNTZDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0kyNTZDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX0kyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX0kyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0kyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9JMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBGMzJDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0YzMkNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0YzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0YzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgRjY0Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9GNjRDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9GNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9GNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIEJvb2xDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0Jvb2xDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX0Jvb2xDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfQm9vbENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfQm9vbENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfQm9vbENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0Jvb2xDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFN0cmluZ0NvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfU3RyaW5nQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9TdHJpbmdDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfU3RyaW5nQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9TdHJpbmdDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1N0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1N0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgQXJyYXlDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0FycmF5Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfQXJyYXlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9BcnJheUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgQnl0ZUFycmF5Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9CeXRlQXJyYXlDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKG1ldGFkYXRhKSB7XG4gICAgc3VwZXIobmV3IFR5cGVCdWlsZGVyKEFsZ2VicmFpY1R5cGUuQXJyYXkoQWxnZWJyYWljVHlwZS5VOCkpLCBtZXRhZGF0YSk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0J5dGVBcnJheUNvbHVtbkJ1aWxkZXIoXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9CeXRlQXJyYXlDb2x1bW5CdWlsZGVyKHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIE9wdGlvbkNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfT3B0aW9uQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfT3B0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfT3B0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBSZXN1bHRDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1Jlc3VsdENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgY29uc3RydWN0b3IodHlwZUJ1aWxkZXIsIG1ldGFkYXRhKSB7XG4gICAgc3VwZXIodHlwZUJ1aWxkZXIsIG1ldGFkYXRhKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfUmVzdWx0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgUHJvZHVjdENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfUHJvZHVjdENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1Byb2R1Y3RDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1Byb2R1Y3RDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFN1bUNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfU3VtQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfU3VtQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9TdW1Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFNpbXBsZVN1bUNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfU2ltcGxlU3VtQ29sdW1uQnVpbGRlciBleHRlbmRzIFN1bUNvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9TaW1wbGVTdW1Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX1NpbXBsZVN1bUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBTY2hlZHVsZUF0Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9TY2hlZHVsZUF0Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfU2NoZWR1bGVBdENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfU2NoZWR1bGVBdENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgSWRlbnRpdHlDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0lkZW50aXR5Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9JZGVudGl0eUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9JZGVudGl0eUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0lkZW50aXR5Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9JZGVudGl0eUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9Db25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX0Nvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9Db25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX0Nvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9Db25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfVGltZXN0YW1wQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9UaW1lc3RhbXBDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9UaW1lc3RhbXBDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1RpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBUaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyID0gY2xhc3MgX1RpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX1RpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9UaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1RpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgVXVpZENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfVXVpZENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfVXVpZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9VdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9VdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9VdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9VdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBSZWZCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIHJlZjtcbiAgLyoqIFRoZSBwaGFudG9tIHR5cGUgb2YgdGhlIHBvaW50ZWUgb2YgdGhpcyByZWYuICovXG4gIF9fc3BhY2V0aW1lVHlwZTtcbiAgY29uc3RydWN0b3IocmVmKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5SZWYocmVmKSk7XG4gICAgdGhpcy5yZWYgPSByZWY7XG4gIH1cbn07XG52YXIgZW51bUltcGwgPSAoKG5hbWVPck9iaiwgbWF5YmVPYmopID0+IHtcbiAgbGV0IG9iaiA9IG5hbWVPck9iajtcbiAgbGV0IG5hbWUgPSB2b2lkIDA7XG4gIGlmICh0eXBlb2YgbmFtZU9yT2JqID09PSBcInN0cmluZ1wiKSB7XG4gICAgaWYgKCFtYXliZU9iaikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgXCJXaGVuIHByb3ZpZGluZyBhIG5hbWUsIHlvdSBtdXN0IGFsc28gcHJvdmlkZSB0aGUgdmFyaWFudHMgb2JqZWN0IG9yIGFycmF5LlwiXG4gICAgICApO1xuICAgIH1cbiAgICBvYmogPSBtYXliZU9iajtcbiAgICBuYW1lID0gbmFtZU9yT2JqO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICBjb25zdCBzaW1wbGVWYXJpYW50c09iaiA9IHt9O1xuICAgIGZvciAoY29uc3QgdmFyaWFudCBvZiBvYmopIHtcbiAgICAgIHNpbXBsZVZhcmlhbnRzT2JqW3ZhcmlhbnRdID0gbmV3IFVuaXRCdWlsZGVyKCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU2ltcGxlU3VtQnVpbGRlckltcGwoc2ltcGxlVmFyaWFudHNPYmosIG5hbWUpO1xuICB9XG4gIHJldHVybiBuZXcgU3VtQnVpbGRlcihvYmosIG5hbWUpO1xufSk7XG52YXIgdCA9IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYEJvb2xgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBib29sZWFuYCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgQm9vbEJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBib29sOiAoKSA9PiBuZXcgQm9vbEJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYFN0cmluZ2Age0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYHN0cmluZ2AgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFN0cmluZ0J1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBzdHJpbmc6ICgpID0+IG5ldyBTdHJpbmdCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBGNjRgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBGNjRCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgbnVtYmVyOiAoKSA9PiBuZXcgRjY0QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgSThgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBJOEJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBpODogKCkgPT4gbmV3IEk4QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgVThgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBVOEJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICB1ODogKCkgPT4gbmV3IFU4QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgSTE2YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgbnVtYmVyYCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgSTE2QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIGkxNjogKCkgPT4gbmV3IEkxNkJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYFUxNmAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYG51bWJlcmAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFUxNkJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICB1MTY6ICgpID0+IG5ldyBVMTZCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBJMzJgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBJMzJCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgaTMyOiAoKSA9PiBuZXcgSTMyQnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgVTMyYCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgbnVtYmVyYCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVTMyQnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIHUzMjogKCkgPT4gbmV3IFUzMkJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYEk2NGAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYGJpZ2ludGAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEk2NEJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBpNjQ6ICgpID0+IG5ldyBJNjRCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBVNjRgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBiaWdpbnRgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBVNjRCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgdTY0OiAoKSA9PiBuZXcgVTY0QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgSTEyOGAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYGJpZ2ludGAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEkxMjhCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgaTEyODogKCkgPT4gbmV3IEkxMjhCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBVMTI4YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgYmlnaW50YCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVTEyOEJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICB1MTI4OiAoKSA9PiBuZXcgVTEyOEJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYEkyNTZgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBiaWdpbnRgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBJMjU2QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIGkyNTY6ICgpID0+IG5ldyBJMjU2QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgVTI1NmAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYGJpZ2ludGAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFUyNTZCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgdTI1NjogKCkgPT4gbmV3IFUyNTZCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBGMzJgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBGMzJCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgZjMyOiAoKSA9PiBuZXcgRjMyQnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgRjY0YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgbnVtYmVyYCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgRjY0QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIGY2NDogKCkgPT4gbmV3IEY2NEJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYFByb2R1Y3RgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zLiBQcm9kdWN0IHR5cGVzIGluIFNwYWNldGltZURCXG4gICAqIGFyZSBlc3NlbnRpYWxseSB0aGUgc2FtZSBhcyBvYmplY3RzIGluIEphdmFTY3JpcHQvVHlwZVNjcmlwdC5cbiAgICogUHJvcGVydGllcyBvZiB0aGUgb2JqZWN0IG11c3QgYWxzbyBiZSB7QGxpbmsgVHlwZUJ1aWxkZXJ9cy5cbiAgICogUmVwcmVzZW50ZWQgYXMgYW4gb2JqZWN0IHdpdGggc3BlY2lmaWMgcHJvcGVydGllcyBpbiBUeXBlU2NyaXB0LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSAob3B0aW9uYWwpIEEgZGlzcGxheSBuYW1lIGZvciB0aGUgcHJvZHVjdCB0eXBlLiBJZiBvbWl0dGVkLCBhbiBhbm9ueW1vdXMgcHJvZHVjdCB0eXBlIGlzIGNyZWF0ZWQuXG4gICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCBkZWZpbmluZyB0aGUgcHJvcGVydGllcyBvZiB0aGUgdHlwZSwgd2hvc2UgcHJvcGVydHlcbiAgICogdmFsdWVzIG11c3QgYmUge0BsaW5rIFR5cGVCdWlsZGVyfXMuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBQcm9kdWN0QnVpbGRlcn0gaW5zdGFuY2UuXG4gICAqL1xuICBvYmplY3Q6ICgobmFtZU9yT2JqLCBtYXliZU9iaikgPT4ge1xuICAgIGlmICh0eXBlb2YgbmFtZU9yT2JqID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBpZiAoIW1heWJlT2JqKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJXaGVuIHByb3ZpZGluZyBhIG5hbWUsIHlvdSBtdXN0IGFsc28gcHJvdmlkZSB0aGUgb2JqZWN0LlwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFByb2R1Y3RCdWlsZGVyKG1heWJlT2JqLCBuYW1lT3JPYmopO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb2R1Y3RCdWlsZGVyKG5hbWVPck9iaiwgdm9pZCAwKTtcbiAgfSksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBSb3dgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zLiBSb3cgdHlwZXMgaW4gU3BhY2V0aW1lREJcbiAgICogYXJlIHNpbWlsYXIgdG8gYFByb2R1Y3RgIHR5cGVzLCBidXQgYXJlIHNwZWNpZmljYWxseSB1c2VkIHRvIGRlZmluZSB0aGUgc2NoZW1hIG9mIGEgdGFibGUgcm93LlxuICAgKiBQcm9wZXJ0aWVzIG9mIHRoZSBvYmplY3QgbXVzdCBhbHNvIGJlIHtAbGluayBUeXBlQnVpbGRlcn0gb3Ige0BsaW5rIENvbHVtbkJ1aWxkZXJ9cy5cbiAgICpcbiAgICogWW91IGNhbiByZXByZXNlbnQgYSBgUm93YCBhcyBlaXRoZXIgYSB7QGxpbmsgUm93T2JqfSBvciBhbiB7QGxpbmsgUm93QnVpbGRlcn0gdHlwZSB3aGVuXG4gICAqIGRlZmluaW5nIGEgdGFibGUgc2NoZW1hLlxuICAgKlxuICAgKiBUaGUge0BsaW5rIFJvd0J1aWxkZXJ9IHR5cGUgaXMgdXNlZnVsIHdoZW4geW91IHdhbnQgdG8gY3JlYXRlIGEgdHlwZSB3aGljaCBjYW4gYmUgdXNlZCBhbnl3aGVyZVxuICAgKiBhIHtAbGluayBUeXBlQnVpbGRlcn0gaXMgYWNjZXB0ZWQsIHN1Y2ggYXMgaW4gbmVzdGVkIG9iamVjdHMgb3IgYXJyYXlzLCBvciBhcyB0aGUgYXJndW1lbnRcbiAgICogdG8gYSBzY2hlZHVsZWQgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCBkZWZpbmluZyB0aGUgcHJvcGVydGllcyBvZiB0aGUgcm93LCB3aG9zZSBwcm9wZXJ0eVxuICAgKiB2YWx1ZXMgbXVzdCBiZSB7QGxpbmsgVHlwZUJ1aWxkZXJ9cyBvciB7QGxpbmsgQ29sdW1uQnVpbGRlcn1zLlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgUm93QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIHJvdzogKChuYW1lT3JPYmosIG1heWJlT2JqKSA9PiB7XG4gICAgY29uc3QgW29iaiwgbmFtZV0gPSB0eXBlb2YgbmFtZU9yT2JqID09PSBcInN0cmluZ1wiID8gW21heWJlT2JqLCBuYW1lT3JPYmpdIDogW25hbWVPck9iaiwgdm9pZCAwXTtcbiAgICByZXR1cm4gbmV3IFJvd0J1aWxkZXIob2JqLCBuYW1lKTtcbiAgfSksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBBcnJheWAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnMuXG4gICAqIFJlcHJlc2VudGVkIGFzIGFuIGFycmF5IGluIFR5cGVTY3JpcHQuXG4gICAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IHR5cGUgb2YgdGhlIGFycmF5LCB3aGljaCBtdXN0IGJlIGEgYFR5cGVCdWlsZGVyYC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEFycmF5QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIGFycmF5KGUpIHtcbiAgICByZXR1cm4gbmV3IEFycmF5QnVpbGRlcihlKTtcbiAgfSxcbiAgZW51bTogZW51bUltcGwsXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgc3BlY2lhbCBoZWxwZXIgZnVuY3Rpb24gZm9yIGNvbnZlbmllbnRseSBjcmVhdGluZyBgUHJvZHVjdGAgdHlwZSBjb2x1bW5zIHdpdGggbm8gZmllbGRzLlxuICAgKlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgUHJvZHVjdEJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggbm8gZmllbGRzLlxuICAgKi9cbiAgdW5pdCgpIHtcbiAgICByZXR1cm4gbmV3IFVuaXRCdWlsZGVyKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbGF6aWx5LWV2YWx1YXRlZCB7QGxpbmsgVHlwZUJ1aWxkZXJ9LiBUaGlzIGlzIHVzZWZ1bCBmb3IgY3JlYXRpbmdcbiAgICogcmVjdXJzaXZlIHR5cGVzLCBzdWNoIGFzIGEgdHJlZSBvciBsaW5rZWQgbGlzdC5cbiAgICogQHBhcmFtIHRodW5rIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEge0BsaW5rIFR5cGVCdWlsZGVyfS5cbiAgICogQHJldHVybnMgQSBwcm94eSB7QGxpbmsgVHlwZUJ1aWxkZXJ9IHRoYXQgZXZhbHVhdGVzIHRoZSB0aHVuayBvbiBmaXJzdCBhY2Nlc3MuXG4gICAqL1xuICBsYXp5KHRodW5rKSB7XG4gICAgbGV0IGNhY2hlZCA9IG51bGw7XG4gICAgY29uc3QgZ2V0ID0gKCkgPT4gY2FjaGVkID8/PSB0aHVuaygpO1xuICAgIGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KHt9LCB7XG4gICAgICBnZXQoX3QsIHByb3AsIHJlY3YpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZ2V0KCk7XG4gICAgICAgIGNvbnN0IHZhbCA9IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcCwgcmVjdik7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcImZ1bmN0aW9uXCIgPyB2YWwuYmluZCh0YXJnZXQpIDogdmFsO1xuICAgICAgfSxcbiAgICAgIHNldChfdCwgcHJvcCwgdmFsdWUsIHJlY3YpIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3Quc2V0KGdldCgpLCBwcm9wLCB2YWx1ZSwgcmVjdik7XG4gICAgICB9LFxuICAgICAgaGFzKF90LCBwcm9wKSB7XG4gICAgICAgIHJldHVybiBwcm9wIGluIGdldCgpO1xuICAgICAgfSxcbiAgICAgIG93bktleXMoKSB7XG4gICAgICAgIHJldHVybiBSZWZsZWN0Lm93bktleXMoZ2V0KCkpO1xuICAgICAgfSxcbiAgICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihfdCwgcHJvcCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihnZXQoKSwgcHJvcCk7XG4gICAgICB9LFxuICAgICAgZ2V0UHJvdG90eXBlT2YoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2V0KCkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwcm94eTtcbiAgfSxcbiAgLyoqXG4gICAqIFRoaXMgaXMgYSBzcGVjaWFsIGhlbHBlciBmdW5jdGlvbiBmb3IgY29udmVuaWVudGx5IGNyZWF0aW5nIHtAbGluayBTY2hlZHVsZUF0fSB0eXBlIGNvbHVtbnMuXG4gICAqIEByZXR1cm5zIEEgbmV3IENvbHVtbkJ1aWxkZXIgaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIFNjaGVkdWxlQXR9IHR5cGUuXG4gICAqL1xuICBzY2hlZHVsZUF0OiAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBTY2hlZHVsZUF0QnVpbGRlcigpO1xuICB9LFxuICAvKipcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIE9wdGlvbn0gdHlwZS5cbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gZW51bSB3aXRoIGEgYHNvbWVgIGFuZCBgbm9uZWAgdmFyaWFudC5cbiAgICogQHBhcmFtIHZhbHVlIFRoZSB0eXBlIG9mIHRoZSB2YWx1ZSBjb250YWluZWQgaW4gdGhlIGBzb21lYCB2YXJpYW50IG9mIHRoZSBgT3B0aW9uYC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIE9wdGlvbkJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggdGhlIHtAbGluayBPcHRpb259IHR5cGUuXG4gICAqL1xuICBvcHRpb24odmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IE9wdGlvbkJ1aWxkZXIodmFsdWUpO1xuICB9LFxuICAvKipcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIFJlc3VsdH0gdHlwZS5cbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gZW51bSB3aXRoIGFuIGBva2AgYW5kIGBlcnJgIHZhcmlhbnQuXG4gICAqIEBwYXJhbSBvayBUaGUgdHlwZSBvZiB0aGUgdmFsdWUgY29udGFpbmVkIGluIHRoZSBgb2tgIHZhcmlhbnQgb2YgdGhlIGBSZXN1bHRgLlxuICAgKiBAcGFyYW0gZXJyIFRoZSB0eXBlIG9mIHRoZSB2YWx1ZSBjb250YWluZWQgaW4gdGhlIGBlcnJgIHZhcmlhbnQgb2YgdGhlIGBSZXN1bHRgLlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgUmVzdWx0QnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIFJlc3VsdH0gdHlwZS5cbiAgICovXG4gIHJlc3VsdChvaywgZXJyKSB7XG4gICAgcmV0dXJuIG5ldyBSZXN1bHRCdWlsZGVyKG9rLCBlcnIpO1xuICB9LFxuICAvKipcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIElkZW50aXR5fSB0eXBlLlxuICAgKiBZb3UgY2FuIGNyZWF0ZSBhIGNvbHVtbiBvZiB0aGUgc2FtZSB0eXBlIGJ5IGNvbnN0cnVjdGluZyBhbiBgb2JqZWN0YCB3aXRoIGEgc2luZ2xlIGBfX2lkZW50aXR5X19gIGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBUeXBlQnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIElkZW50aXR5fSB0eXBlLlxuICAgKi9cbiAgaWRlbnRpdHk6ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IElkZW50aXR5QnVpbGRlcigpO1xuICB9LFxuICAvKipcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIENvbm5lY3Rpb25JZH0gdHlwZS5cbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gYG9iamVjdGAgd2l0aCBhIHNpbmdsZSBgX19jb25uZWN0aW9uX2lkX19gIGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBUeXBlQnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIENvbm5lY3Rpb25JZH0gdHlwZS5cbiAgICovXG4gIGNvbm5lY3Rpb25JZDogKCkgPT4ge1xuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbklkQnVpbGRlcigpO1xuICB9LFxuICAvKipcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIFRpbWVzdGFtcH0gdHlwZS5cbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gYG9iamVjdGAgd2l0aCBhIHNpbmdsZSBgX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfX2AgZWxlbWVudC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFR5cGVCdWlsZGVyfSBpbnN0YW5jZSB3aXRoIHRoZSB7QGxpbmsgVGltZXN0YW1wfSB0eXBlLlxuICAgKi9cbiAgdGltZXN0YW1wOiAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBUaW1lc3RhbXBCdWlsZGVyKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgY29udmVuaWVuY2UgbWV0aG9kIGZvciBjcmVhdGluZyBhIGNvbHVtbiB3aXRoIHRoZSB7QGxpbmsgVGltZUR1cmF0aW9ufSB0eXBlLlxuICAgKiBZb3UgY2FuIGNyZWF0ZSBhIGNvbHVtbiBvZiB0aGUgc2FtZSB0eXBlIGJ5IGNvbnN0cnVjdGluZyBhbiBgb2JqZWN0YCB3aXRoIGEgc2luZ2xlIGBfX3RpbWVfZHVyYXRpb25fbWljcm9zX19gIGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBUeXBlQnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIFRpbWVEdXJhdGlvbn0gdHlwZS5cbiAgICovXG4gIHRpbWVEdXJhdGlvbjogKCkgPT4ge1xuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uQnVpbGRlcigpO1xuICB9LFxuICAvKipcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIFV1aWR9IHR5cGUuXG4gICAqIFlvdSBjYW4gY3JlYXRlIGEgY29sdW1uIG9mIHRoZSBzYW1lIHR5cGUgYnkgY29uc3RydWN0aW5nIGFuIGBvYmplY3RgIHdpdGggYSBzaW5nbGUgYF9fdXVpZF9fYCBlbGVtZW50LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVHlwZUJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggdGhlIHtAbGluayBVdWlkfSB0eXBlLlxuICAgKi9cbiAgdXVpZDogKCkgPT4ge1xuICAgIHJldHVybiBuZXcgVXVpZEJ1aWxkZXIoKTtcbiAgfSxcbiAgLyoqXG4gICAqIFRoaXMgaXMgYSBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNyZWF0aW5nIGEgY29sdW1uIHdpdGggdGhlIGBCeXRlQXJyYXlgIHR5cGUuXG4gICAqIFlvdSBjYW4gY3JlYXRlIGEgY29sdW1uIG9mIHRoZSBzYW1lIHR5cGUgYnkgY29uc3RydWN0aW5nIGFuIGBhcnJheWAgb2YgYHU4YC5cbiAgICogVGhlIFR5cGVTY3JpcHQgcmVwcmVzZW50YXRpb24gaXMge0BsaW5rIFVpbnQ4QXJyYXl9LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgQnl0ZUFycmF5QnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCB0aGUgYEJ5dGVBcnJheWAgdHlwZS5cbiAgICovXG4gIGJ5dGVBcnJheTogKCkgPT4ge1xuICAgIHJldHVybiBuZXcgQnl0ZUFycmF5QnVpbGRlcigpO1xuICB9XG59O1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vdHlwZXMudHNcbnZhciBBbGdlYnJhaWNUeXBlMiA9IHQuZW51bShcIkFsZ2VicmFpY1R5cGVcIiwge1xuICBSZWY6IHQudTMyKCksXG4gIGdldCBTdW0oKSB7XG4gICAgcmV0dXJuIFN1bVR5cGUyO1xuICB9LFxuICBnZXQgUHJvZHVjdCgpIHtcbiAgICByZXR1cm4gUHJvZHVjdFR5cGUyO1xuICB9LFxuICBnZXQgQXJyYXkoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUyO1xuICB9LFxuICBTdHJpbmc6IHQudW5pdCgpLFxuICBCb29sOiB0LnVuaXQoKSxcbiAgSTg6IHQudW5pdCgpLFxuICBVODogdC51bml0KCksXG4gIEkxNjogdC51bml0KCksXG4gIFUxNjogdC51bml0KCksXG4gIEkzMjogdC51bml0KCksXG4gIFUzMjogdC51bml0KCksXG4gIEk2NDogdC51bml0KCksXG4gIFU2NDogdC51bml0KCksXG4gIEkxMjg6IHQudW5pdCgpLFxuICBVMTI4OiB0LnVuaXQoKSxcbiAgSTI1NjogdC51bml0KCksXG4gIFUyNTY6IHQudW5pdCgpLFxuICBGMzI6IHQudW5pdCgpLFxuICBGNjQ6IHQudW5pdCgpXG59KTtcbnZhciBDYXNlQ29udmVyc2lvblBvbGljeSA9IHQuZW51bShcIkNhc2VDb252ZXJzaW9uUG9saWN5XCIsIHtcbiAgTm9uZTogdC51bml0KCksXG4gIFNuYWtlQ2FzZTogdC51bml0KClcbn0pO1xudmFyIEV4cGxpY2l0TmFtZUVudHJ5ID0gdC5lbnVtKFwiRXhwbGljaXROYW1lRW50cnlcIiwge1xuICBnZXQgVGFibGUoKSB7XG4gICAgcmV0dXJuIE5hbWVNYXBwaW5nO1xuICB9LFxuICBnZXQgRnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIE5hbWVNYXBwaW5nO1xuICB9LFxuICBnZXQgSW5kZXgoKSB7XG4gICAgcmV0dXJuIE5hbWVNYXBwaW5nO1xuICB9XG59KTtcbnZhciBFeHBsaWNpdE5hbWVzID0gdC5vYmplY3QoXCJFeHBsaWNpdE5hbWVzXCIsIHtcbiAgZ2V0IGVudHJpZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoRXhwbGljaXROYW1lRW50cnkpO1xuICB9XG59KTtcbnZhciBGdW5jdGlvblZpc2liaWxpdHkgPSB0LmVudW0oXCJGdW5jdGlvblZpc2liaWxpdHlcIiwge1xuICBQcml2YXRlOiB0LnVuaXQoKSxcbiAgQ2xpZW50Q2FsbGFibGU6IHQudW5pdCgpXG59KTtcbnZhciBIdHRwSGVhZGVyUGFpciA9IHQub2JqZWN0KFwiSHR0cEhlYWRlclBhaXJcIiwge1xuICBuYW1lOiB0LnN0cmluZygpLFxuICB2YWx1ZTogdC5ieXRlQXJyYXkoKVxufSk7XG52YXIgSHR0cEhlYWRlcnMgPSB0Lm9iamVjdChcIkh0dHBIZWFkZXJzXCIsIHtcbiAgZ2V0IGVudHJpZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoSHR0cEhlYWRlclBhaXIpO1xuICB9XG59KTtcbnZhciBIdHRwTWV0aG9kID0gdC5lbnVtKFwiSHR0cE1ldGhvZFwiLCB7XG4gIEdldDogdC51bml0KCksXG4gIEhlYWQ6IHQudW5pdCgpLFxuICBQb3N0OiB0LnVuaXQoKSxcbiAgUHV0OiB0LnVuaXQoKSxcbiAgRGVsZXRlOiB0LnVuaXQoKSxcbiAgQ29ubmVjdDogdC51bml0KCksXG4gIE9wdGlvbnM6IHQudW5pdCgpLFxuICBUcmFjZTogdC51bml0KCksXG4gIFBhdGNoOiB0LnVuaXQoKSxcbiAgRXh0ZW5zaW9uOiB0LnN0cmluZygpXG59KTtcbnZhciBIdHRwUmVxdWVzdCA9IHQub2JqZWN0KFwiSHR0cFJlcXVlc3RcIiwge1xuICBnZXQgbWV0aG9kKCkge1xuICAgIHJldHVybiBIdHRwTWV0aG9kO1xuICB9LFxuICBnZXQgaGVhZGVycygpIHtcbiAgICByZXR1cm4gSHR0cEhlYWRlcnM7XG4gIH0sXG4gIHRpbWVvdXQ6IHQub3B0aW9uKHQudGltZUR1cmF0aW9uKCkpLFxuICB1cmk6IHQuc3RyaW5nKCksXG4gIGdldCB2ZXJzaW9uKCkge1xuICAgIHJldHVybiBIdHRwVmVyc2lvbjtcbiAgfVxufSk7XG52YXIgSHR0cFJlc3BvbnNlID0gdC5vYmplY3QoXCJIdHRwUmVzcG9uc2VcIiwge1xuICBnZXQgaGVhZGVycygpIHtcbiAgICByZXR1cm4gSHR0cEhlYWRlcnM7XG4gIH0sXG4gIGdldCB2ZXJzaW9uKCkge1xuICAgIHJldHVybiBIdHRwVmVyc2lvbjtcbiAgfSxcbiAgY29kZTogdC51MTYoKVxufSk7XG52YXIgSHR0cFZlcnNpb24gPSB0LmVudW0oXCJIdHRwVmVyc2lvblwiLCB7XG4gIEh0dHAwOTogdC51bml0KCksXG4gIEh0dHAxMDogdC51bml0KCksXG4gIEh0dHAxMTogdC51bml0KCksXG4gIEh0dHAyOiB0LnVuaXQoKSxcbiAgSHR0cDM6IHQudW5pdCgpXG59KTtcbnZhciBJbmRleFR5cGUgPSB0LmVudW0oXCJJbmRleFR5cGVcIiwge1xuICBCVHJlZTogdC51bml0KCksXG4gIEhhc2g6IHQudW5pdCgpXG59KTtcbnZhciBMaWZlY3ljbGUgPSB0LmVudW0oXCJMaWZlY3ljbGVcIiwge1xuICBJbml0OiB0LnVuaXQoKSxcbiAgT25Db25uZWN0OiB0LnVuaXQoKSxcbiAgT25EaXNjb25uZWN0OiB0LnVuaXQoKVxufSk7XG52YXIgTWlzY01vZHVsZUV4cG9ydCA9IHQuZW51bShcIk1pc2NNb2R1bGVFeHBvcnRcIiwge1xuICBnZXQgVHlwZUFsaWFzKCkge1xuICAgIHJldHVybiBUeXBlQWxpYXM7XG4gIH1cbn0pO1xudmFyIE5hbWVNYXBwaW5nID0gdC5vYmplY3QoXCJOYW1lTWFwcGluZ1wiLCB7XG4gIHNvdXJjZU5hbWU6IHQuc3RyaW5nKCksXG4gIGNhbm9uaWNhbE5hbWU6IHQuc3RyaW5nKClcbn0pO1xudmFyIFByb2R1Y3RUeXBlMiA9IHQub2JqZWN0KFwiUHJvZHVjdFR5cGVcIiwge1xuICBnZXQgZWxlbWVudHMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUHJvZHVjdFR5cGVFbGVtZW50KTtcbiAgfVxufSk7XG52YXIgUHJvZHVjdFR5cGVFbGVtZW50ID0gdC5vYmplY3QoXCJQcm9kdWN0VHlwZUVsZW1lbnRcIiwge1xuICBuYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgZ2V0IGFsZ2VicmFpY1R5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUyO1xuICB9XG59KTtcbnZhciBSYXdDb2x1bW5EZWZWOCA9IHQub2JqZWN0KFwiUmF3Q29sdW1uRGVmVjhcIiwge1xuICBjb2xOYW1lOiB0LnN0cmluZygpLFxuICBnZXQgY29sVHlwZSgpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZTI7XG4gIH1cbn0pO1xudmFyIFJhd0NvbHVtbkRlZmF1bHRWYWx1ZVYxMCA9IHQub2JqZWN0KFwiUmF3Q29sdW1uRGVmYXVsdFZhbHVlVjEwXCIsIHtcbiAgY29sSWQ6IHQudTE2KCksXG4gIHZhbHVlOiB0LmJ5dGVBcnJheSgpXG59KTtcbnZhciBSYXdDb2x1bW5EZWZhdWx0VmFsdWVWOSA9IHQub2JqZWN0KFwiUmF3Q29sdW1uRGVmYXVsdFZhbHVlVjlcIiwge1xuICB0YWJsZTogdC5zdHJpbmcoKSxcbiAgY29sSWQ6IHQudTE2KCksXG4gIHZhbHVlOiB0LmJ5dGVBcnJheSgpXG59KTtcbnZhciBSYXdDb25zdHJhaW50RGF0YVY5ID0gdC5lbnVtKFwiUmF3Q29uc3RyYWludERhdGFWOVwiLCB7XG4gIGdldCBVbmlxdWUoKSB7XG4gICAgcmV0dXJuIFJhd1VuaXF1ZUNvbnN0cmFpbnREYXRhVjk7XG4gIH1cbn0pO1xudmFyIFJhd0NvbnN0cmFpbnREZWZWMTAgPSB0Lm9iamVjdChcIlJhd0NvbnN0cmFpbnREZWZWMTBcIiwge1xuICBzb3VyY2VOYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgZ2V0IGRhdGEoKSB7XG4gICAgcmV0dXJuIFJhd0NvbnN0cmFpbnREYXRhVjk7XG4gIH1cbn0pO1xudmFyIFJhd0NvbnN0cmFpbnREZWZWOCA9IHQub2JqZWN0KFwiUmF3Q29uc3RyYWludERlZlY4XCIsIHtcbiAgY29uc3RyYWludE5hbWU6IHQuc3RyaW5nKCksXG4gIGNvbnN0cmFpbnRzOiB0LnU4KCksXG4gIGNvbHVtbnM6IHQuYXJyYXkodC51MTYoKSlcbn0pO1xudmFyIFJhd0NvbnN0cmFpbnREZWZWOSA9IHQub2JqZWN0KFwiUmF3Q29uc3RyYWludERlZlY5XCIsIHtcbiAgbmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXG4gIGdldCBkYXRhKCkge1xuICAgIHJldHVybiBSYXdDb25zdHJhaW50RGF0YVY5O1xuICB9XG59KTtcbnZhciBSYXdJbmRleEFsZ29yaXRobSA9IHQuZW51bShcIlJhd0luZGV4QWxnb3JpdGhtXCIsIHtcbiAgQlRyZWU6IHQuYXJyYXkodC51MTYoKSksXG4gIEhhc2g6IHQuYXJyYXkodC51MTYoKSksXG4gIERpcmVjdDogdC51MTYoKVxufSk7XG52YXIgUmF3SW5kZXhEZWZWMTAgPSB0Lm9iamVjdChcIlJhd0luZGV4RGVmVjEwXCIsIHtcbiAgc291cmNlTmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXG4gIGFjY2Vzc29yTmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXG4gIGdldCBhbGdvcml0aG0oKSB7XG4gICAgcmV0dXJuIFJhd0luZGV4QWxnb3JpdGhtO1xuICB9XG59KTtcbnZhciBSYXdJbmRleERlZlY4ID0gdC5vYmplY3QoXCJSYXdJbmRleERlZlY4XCIsIHtcbiAgaW5kZXhOYW1lOiB0LnN0cmluZygpLFxuICBpc1VuaXF1ZTogdC5ib29sKCksXG4gIGdldCBpbmRleFR5cGUoKSB7XG4gICAgcmV0dXJuIEluZGV4VHlwZTtcbiAgfSxcbiAgY29sdW1uczogdC5hcnJheSh0LnUxNigpKVxufSk7XG52YXIgUmF3SW5kZXhEZWZWOSA9IHQub2JqZWN0KFwiUmF3SW5kZXhEZWZWOVwiLCB7XG4gIG5hbWU6IHQub3B0aW9uKHQuc3RyaW5nKCkpLFxuICBhY2Nlc3Nvck5hbWU6IHQub3B0aW9uKHQuc3RyaW5nKCkpLFxuICBnZXQgYWxnb3JpdGhtKCkge1xuICAgIHJldHVybiBSYXdJbmRleEFsZ29yaXRobTtcbiAgfVxufSk7XG52YXIgUmF3TGlmZUN5Y2xlUmVkdWNlckRlZlYxMCA9IHQub2JqZWN0KFxuICBcIlJhd0xpZmVDeWNsZVJlZHVjZXJEZWZWMTBcIixcbiAge1xuICAgIGdldCBsaWZlY3ljbGVTcGVjKCkge1xuICAgICAgcmV0dXJuIExpZmVjeWNsZTtcbiAgICB9LFxuICAgIGZ1bmN0aW9uTmFtZTogdC5zdHJpbmcoKVxuICB9XG4pO1xudmFyIFJhd01pc2NNb2R1bGVFeHBvcnRWOSA9IHQuZW51bShcIlJhd01pc2NNb2R1bGVFeHBvcnRWOVwiLCB7XG4gIGdldCBDb2x1bW5EZWZhdWx0VmFsdWUoKSB7XG4gICAgcmV0dXJuIFJhd0NvbHVtbkRlZmF1bHRWYWx1ZVY5O1xuICB9LFxuICBnZXQgUHJvY2VkdXJlKCkge1xuICAgIHJldHVybiBSYXdQcm9jZWR1cmVEZWZWOTtcbiAgfSxcbiAgZ2V0IFZpZXcoKSB7XG4gICAgcmV0dXJuIFJhd1ZpZXdEZWZWOTtcbiAgfVxufSk7XG52YXIgUmF3TW9kdWxlRGVmID0gdC5lbnVtKFwiUmF3TW9kdWxlRGVmXCIsIHtcbiAgZ2V0IFY4QmFja0NvbXBhdCgpIHtcbiAgICByZXR1cm4gUmF3TW9kdWxlRGVmVjg7XG4gIH0sXG4gIGdldCBWOSgpIHtcbiAgICByZXR1cm4gUmF3TW9kdWxlRGVmVjk7XG4gIH0sXG4gIGdldCBWMTAoKSB7XG4gICAgcmV0dXJuIFJhd01vZHVsZURlZlYxMDtcbiAgfVxufSk7XG52YXIgUmF3TW9kdWxlRGVmVjEwID0gdC5vYmplY3QoXCJSYXdNb2R1bGVEZWZWMTBcIiwge1xuICBnZXQgc2VjdGlvbnMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3TW9kdWxlRGVmVjEwU2VjdGlvbik7XG4gIH1cbn0pO1xudmFyIFJhd01vZHVsZURlZlYxMFNlY3Rpb24gPSB0LmVudW0oXCJSYXdNb2R1bGVEZWZWMTBTZWN0aW9uXCIsIHtcbiAgZ2V0IFR5cGVzcGFjZSgpIHtcbiAgICByZXR1cm4gVHlwZXNwYWNlO1xuICB9LFxuICBnZXQgVHlwZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3VHlwZURlZlYxMCk7XG4gIH0sXG4gIGdldCBUYWJsZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3VGFibGVEZWZWMTApO1xuICB9LFxuICBnZXQgUmVkdWNlcnMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3UmVkdWNlckRlZlYxMCk7XG4gIH0sXG4gIGdldCBQcm9jZWR1cmVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KFJhd1Byb2NlZHVyZURlZlYxMCk7XG4gIH0sXG4gIGdldCBWaWV3cygpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdWaWV3RGVmVjEwKTtcbiAgfSxcbiAgZ2V0IFNjaGVkdWxlcygpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdTY2hlZHVsZURlZlYxMCk7XG4gIH0sXG4gIGdldCBMaWZlQ3ljbGVSZWR1Y2VycygpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdMaWZlQ3ljbGVSZWR1Y2VyRGVmVjEwKTtcbiAgfSxcbiAgZ2V0IFJvd0xldmVsU2VjdXJpdHkoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3Um93TGV2ZWxTZWN1cml0eURlZlY5KTtcbiAgfSxcbiAgZ2V0IENhc2VDb252ZXJzaW9uUG9saWN5KCkge1xuICAgIHJldHVybiBDYXNlQ29udmVyc2lvblBvbGljeTtcbiAgfSxcbiAgZ2V0IEV4cGxpY2l0TmFtZXMoKSB7XG4gICAgcmV0dXJuIEV4cGxpY2l0TmFtZXM7XG4gIH1cbn0pO1xudmFyIFJhd01vZHVsZURlZlY4ID0gdC5vYmplY3QoXCJSYXdNb2R1bGVEZWZWOFwiLCB7XG4gIGdldCB0eXBlc3BhY2UoKSB7XG4gICAgcmV0dXJuIFR5cGVzcGFjZTtcbiAgfSxcbiAgZ2V0IHRhYmxlcygpIHtcbiAgICByZXR1cm4gdC5hcnJheShUYWJsZURlc2MpO1xuICB9LFxuICBnZXQgcmVkdWNlcnMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmVkdWNlckRlZik7XG4gIH0sXG4gIGdldCBtaXNjRXhwb3J0cygpIHtcbiAgICByZXR1cm4gdC5hcnJheShNaXNjTW9kdWxlRXhwb3J0KTtcbiAgfVxufSk7XG52YXIgUmF3TW9kdWxlRGVmVjkgPSB0Lm9iamVjdChcIlJhd01vZHVsZURlZlY5XCIsIHtcbiAgZ2V0IHR5cGVzcGFjZSgpIHtcbiAgICByZXR1cm4gVHlwZXNwYWNlO1xuICB9LFxuICBnZXQgdGFibGVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KFJhd1RhYmxlRGVmVjkpO1xuICB9LFxuICBnZXQgcmVkdWNlcnMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3UmVkdWNlckRlZlY5KTtcbiAgfSxcbiAgZ2V0IHR5cGVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KFJhd1R5cGVEZWZWOSk7XG4gIH0sXG4gIGdldCBtaXNjRXhwb3J0cygpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdNaXNjTW9kdWxlRXhwb3J0VjkpO1xuICB9LFxuICBnZXQgcm93TGV2ZWxTZWN1cml0eSgpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdSb3dMZXZlbFNlY3VyaXR5RGVmVjkpO1xuICB9XG59KTtcbnZhciBSYXdQcm9jZWR1cmVEZWZWMTAgPSB0Lm9iamVjdChcIlJhd1Byb2NlZHVyZURlZlYxMFwiLCB7XG4gIHNvdXJjZU5hbWU6IHQuc3RyaW5nKCksXG4gIGdldCBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFByb2R1Y3RUeXBlMjtcbiAgfSxcbiAgZ2V0IHJldHVyblR5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUyO1xuICB9LFxuICBnZXQgdmlzaWJpbGl0eSgpIHtcbiAgICByZXR1cm4gRnVuY3Rpb25WaXNpYmlsaXR5O1xuICB9XG59KTtcbnZhciBSYXdQcm9jZWR1cmVEZWZWOSA9IHQub2JqZWN0KFwiUmF3UHJvY2VkdXJlRGVmVjlcIiwge1xuICBuYW1lOiB0LnN0cmluZygpLFxuICBnZXQgcGFyYW1zKCkge1xuICAgIHJldHVybiBQcm9kdWN0VHlwZTI7XG4gIH0sXG4gIGdldCByZXR1cm5UeXBlKCkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlMjtcbiAgfVxufSk7XG52YXIgUmF3UmVkdWNlckRlZlYxMCA9IHQub2JqZWN0KFwiUmF3UmVkdWNlckRlZlYxMFwiLCB7XG4gIHNvdXJjZU5hbWU6IHQuc3RyaW5nKCksXG4gIGdldCBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFByb2R1Y3RUeXBlMjtcbiAgfSxcbiAgZ2V0IHZpc2liaWxpdHkoKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uVmlzaWJpbGl0eTtcbiAgfSxcbiAgZ2V0IG9rUmV0dXJuVHlwZSgpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZTI7XG4gIH0sXG4gIGdldCBlcnJSZXR1cm5UeXBlKCkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlMjtcbiAgfVxufSk7XG52YXIgUmF3UmVkdWNlckRlZlY5ID0gdC5vYmplY3QoXCJSYXdSZWR1Y2VyRGVmVjlcIiwge1xuICBuYW1lOiB0LnN0cmluZygpLFxuICBnZXQgcGFyYW1zKCkge1xuICAgIHJldHVybiBQcm9kdWN0VHlwZTI7XG4gIH0sXG4gIGdldCBsaWZlY3ljbGUoKSB7XG4gICAgcmV0dXJuIHQub3B0aW9uKExpZmVjeWNsZSk7XG4gIH1cbn0pO1xudmFyIFJhd1Jvd0xldmVsU2VjdXJpdHlEZWZWOSA9IHQub2JqZWN0KFwiUmF3Um93TGV2ZWxTZWN1cml0eURlZlY5XCIsIHtcbiAgc3FsOiB0LnN0cmluZygpXG59KTtcbnZhciBSYXdTY2hlZHVsZURlZlYxMCA9IHQub2JqZWN0KFwiUmF3U2NoZWR1bGVEZWZWMTBcIiwge1xuICBzb3VyY2VOYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgdGFibGVOYW1lOiB0LnN0cmluZygpLFxuICBzY2hlZHVsZUF0Q29sOiB0LnUxNigpLFxuICBmdW5jdGlvbk5hbWU6IHQuc3RyaW5nKClcbn0pO1xudmFyIFJhd1NjaGVkdWxlRGVmVjkgPSB0Lm9iamVjdChcIlJhd1NjaGVkdWxlRGVmVjlcIiwge1xuICBuYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgcmVkdWNlck5hbWU6IHQuc3RyaW5nKCksXG4gIHNjaGVkdWxlZEF0Q29sdW1uOiB0LnUxNigpXG59KTtcbnZhciBSYXdTY29wZWRUeXBlTmFtZVYxMCA9IHQub2JqZWN0KFwiUmF3U2NvcGVkVHlwZU5hbWVWMTBcIiwge1xuICBzY29wZTogdC5hcnJheSh0LnN0cmluZygpKSxcbiAgc291cmNlTmFtZTogdC5zdHJpbmcoKVxufSk7XG52YXIgUmF3U2NvcGVkVHlwZU5hbWVWOSA9IHQub2JqZWN0KFwiUmF3U2NvcGVkVHlwZU5hbWVWOVwiLCB7XG4gIHNjb3BlOiB0LmFycmF5KHQuc3RyaW5nKCkpLFxuICBuYW1lOiB0LnN0cmluZygpXG59KTtcbnZhciBSYXdTZXF1ZW5jZURlZlYxMCA9IHQub2JqZWN0KFwiUmF3U2VxdWVuY2VEZWZWMTBcIiwge1xuICBzb3VyY2VOYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgY29sdW1uOiB0LnUxNigpLFxuICBzdGFydDogdC5vcHRpb24odC5pMTI4KCkpLFxuICBtaW5WYWx1ZTogdC5vcHRpb24odC5pMTI4KCkpLFxuICBtYXhWYWx1ZTogdC5vcHRpb24odC5pMTI4KCkpLFxuICBpbmNyZW1lbnQ6IHQuaTEyOCgpXG59KTtcbnZhciBSYXdTZXF1ZW5jZURlZlY4ID0gdC5vYmplY3QoXCJSYXdTZXF1ZW5jZURlZlY4XCIsIHtcbiAgc2VxdWVuY2VOYW1lOiB0LnN0cmluZygpLFxuICBjb2xQb3M6IHQudTE2KCksXG4gIGluY3JlbWVudDogdC5pMTI4KCksXG4gIHN0YXJ0OiB0Lm9wdGlvbih0LmkxMjgoKSksXG4gIG1pblZhbHVlOiB0Lm9wdGlvbih0LmkxMjgoKSksXG4gIG1heFZhbHVlOiB0Lm9wdGlvbih0LmkxMjgoKSksXG4gIGFsbG9jYXRlZDogdC5pMTI4KClcbn0pO1xudmFyIFJhd1NlcXVlbmNlRGVmVjkgPSB0Lm9iamVjdChcIlJhd1NlcXVlbmNlRGVmVjlcIiwge1xuICBuYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgY29sdW1uOiB0LnUxNigpLFxuICBzdGFydDogdC5vcHRpb24odC5pMTI4KCkpLFxuICBtaW5WYWx1ZTogdC5vcHRpb24odC5pMTI4KCkpLFxuICBtYXhWYWx1ZTogdC5vcHRpb24odC5pMTI4KCkpLFxuICBpbmNyZW1lbnQ6IHQuaTEyOCgpXG59KTtcbnZhciBSYXdUYWJsZURlZlYxMCA9IHQub2JqZWN0KFwiUmF3VGFibGVEZWZWMTBcIiwge1xuICBzb3VyY2VOYW1lOiB0LnN0cmluZygpLFxuICBwcm9kdWN0VHlwZVJlZjogdC51MzIoKSxcbiAgcHJpbWFyeUtleTogdC5hcnJheSh0LnUxNigpKSxcbiAgZ2V0IGluZGV4ZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3SW5kZXhEZWZWMTApO1xuICB9LFxuICBnZXQgY29uc3RyYWludHMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3Q29uc3RyYWludERlZlYxMCk7XG4gIH0sXG4gIGdldCBzZXF1ZW5jZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3U2VxdWVuY2VEZWZWMTApO1xuICB9LFxuICBnZXQgdGFibGVUeXBlKCkge1xuICAgIHJldHVybiBUYWJsZVR5cGU7XG4gIH0sXG4gIGdldCB0YWJsZUFjY2VzcygpIHtcbiAgICByZXR1cm4gVGFibGVBY2Nlc3M7XG4gIH0sXG4gIGdldCBkZWZhdWx0VmFsdWVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KFJhd0NvbHVtbkRlZmF1bHRWYWx1ZVYxMCk7XG4gIH0sXG4gIGlzRXZlbnQ6IHQuYm9vbCgpXG59KTtcbnZhciBSYXdUYWJsZURlZlY4ID0gdC5vYmplY3QoXCJSYXdUYWJsZURlZlY4XCIsIHtcbiAgdGFibGVOYW1lOiB0LnN0cmluZygpLFxuICBnZXQgY29sdW1ucygpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdDb2x1bW5EZWZWOCk7XG4gIH0sXG4gIGdldCBpbmRleGVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KFJhd0luZGV4RGVmVjgpO1xuICB9LFxuICBnZXQgY29uc3RyYWludHMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3Q29uc3RyYWludERlZlY4KTtcbiAgfSxcbiAgZ2V0IHNlcXVlbmNlcygpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdTZXF1ZW5jZURlZlY4KTtcbiAgfSxcbiAgdGFibGVUeXBlOiB0LnN0cmluZygpLFxuICB0YWJsZUFjY2VzczogdC5zdHJpbmcoKSxcbiAgc2NoZWR1bGVkOiB0Lm9wdGlvbih0LnN0cmluZygpKVxufSk7XG52YXIgUmF3VGFibGVEZWZWOSA9IHQub2JqZWN0KFwiUmF3VGFibGVEZWZWOVwiLCB7XG4gIG5hbWU6IHQuc3RyaW5nKCksXG4gIHByb2R1Y3RUeXBlUmVmOiB0LnUzMigpLFxuICBwcmltYXJ5S2V5OiB0LmFycmF5KHQudTE2KCkpLFxuICBnZXQgaW5kZXhlcygpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdJbmRleERlZlY5KTtcbiAgfSxcbiAgZ2V0IGNvbnN0cmFpbnRzKCkge1xuICAgIHJldHVybiB0LmFycmF5KFJhd0NvbnN0cmFpbnREZWZWOSk7XG4gIH0sXG4gIGdldCBzZXF1ZW5jZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3U2VxdWVuY2VEZWZWOSk7XG4gIH0sXG4gIGdldCBzY2hlZHVsZSgpIHtcbiAgICByZXR1cm4gdC5vcHRpb24oUmF3U2NoZWR1bGVEZWZWOSk7XG4gIH0sXG4gIGdldCB0YWJsZVR5cGUoKSB7XG4gICAgcmV0dXJuIFRhYmxlVHlwZTtcbiAgfSxcbiAgZ2V0IHRhYmxlQWNjZXNzKCkge1xuICAgIHJldHVybiBUYWJsZUFjY2VzcztcbiAgfVxufSk7XG52YXIgUmF3VHlwZURlZlYxMCA9IHQub2JqZWN0KFwiUmF3VHlwZURlZlYxMFwiLCB7XG4gIGdldCBzb3VyY2VOYW1lKCkge1xuICAgIHJldHVybiBSYXdTY29wZWRUeXBlTmFtZVYxMDtcbiAgfSxcbiAgdHk6IHQudTMyKCksXG4gIGN1c3RvbU9yZGVyaW5nOiB0LmJvb2woKVxufSk7XG52YXIgUmF3VHlwZURlZlY5ID0gdC5vYmplY3QoXCJSYXdUeXBlRGVmVjlcIiwge1xuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gUmF3U2NvcGVkVHlwZU5hbWVWOTtcbiAgfSxcbiAgdHk6IHQudTMyKCksXG4gIGN1c3RvbU9yZGVyaW5nOiB0LmJvb2woKVxufSk7XG52YXIgUmF3VW5pcXVlQ29uc3RyYWludERhdGFWOSA9IHQub2JqZWN0KFxuICBcIlJhd1VuaXF1ZUNvbnN0cmFpbnREYXRhVjlcIixcbiAge1xuICAgIGNvbHVtbnM6IHQuYXJyYXkodC51MTYoKSlcbiAgfVxuKTtcbnZhciBSYXdWaWV3RGVmVjEwID0gdC5vYmplY3QoXCJSYXdWaWV3RGVmVjEwXCIsIHtcbiAgc291cmNlTmFtZTogdC5zdHJpbmcoKSxcbiAgaW5kZXg6IHQudTMyKCksXG4gIGlzUHVibGljOiB0LmJvb2woKSxcbiAgaXNBbm9ueW1vdXM6IHQuYm9vbCgpLFxuICBnZXQgcGFyYW1zKCkge1xuICAgIHJldHVybiBQcm9kdWN0VHlwZTI7XG4gIH0sXG4gIGdldCByZXR1cm5UeXBlKCkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlMjtcbiAgfVxufSk7XG52YXIgUmF3Vmlld0RlZlY5ID0gdC5vYmplY3QoXCJSYXdWaWV3RGVmVjlcIiwge1xuICBuYW1lOiB0LnN0cmluZygpLFxuICBpbmRleDogdC51MzIoKSxcbiAgaXNQdWJsaWM6IHQuYm9vbCgpLFxuICBpc0Fub255bW91czogdC5ib29sKCksXG4gIGdldCBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFByb2R1Y3RUeXBlMjtcbiAgfSxcbiAgZ2V0IHJldHVyblR5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUyO1xuICB9XG59KTtcbnZhciBSZWR1Y2VyRGVmID0gdC5vYmplY3QoXCJSZWR1Y2VyRGVmXCIsIHtcbiAgbmFtZTogdC5zdHJpbmcoKSxcbiAgZ2V0IGFyZ3MoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUHJvZHVjdFR5cGVFbGVtZW50KTtcbiAgfVxufSk7XG52YXIgU3VtVHlwZTIgPSB0Lm9iamVjdChcIlN1bVR5cGVcIiwge1xuICBnZXQgdmFyaWFudHMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoU3VtVHlwZVZhcmlhbnQpO1xuICB9XG59KTtcbnZhciBTdW1UeXBlVmFyaWFudCA9IHQub2JqZWN0KFwiU3VtVHlwZVZhcmlhbnRcIiwge1xuICBuYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgZ2V0IGFsZ2VicmFpY1R5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUyO1xuICB9XG59KTtcbnZhciBUYWJsZUFjY2VzcyA9IHQuZW51bShcIlRhYmxlQWNjZXNzXCIsIHtcbiAgUHVibGljOiB0LnVuaXQoKSxcbiAgUHJpdmF0ZTogdC51bml0KClcbn0pO1xudmFyIFRhYmxlRGVzYyA9IHQub2JqZWN0KFwiVGFibGVEZXNjXCIsIHtcbiAgZ2V0IHNjaGVtYSgpIHtcbiAgICByZXR1cm4gUmF3VGFibGVEZWZWODtcbiAgfSxcbiAgZGF0YTogdC51MzIoKVxufSk7XG52YXIgVGFibGVUeXBlID0gdC5lbnVtKFwiVGFibGVUeXBlXCIsIHtcbiAgU3lzdGVtOiB0LnVuaXQoKSxcbiAgVXNlcjogdC51bml0KClcbn0pO1xudmFyIFR5cGVBbGlhcyA9IHQub2JqZWN0KFwiVHlwZUFsaWFzXCIsIHtcbiAgbmFtZTogdC5zdHJpbmcoKSxcbiAgdHk6IHQudTMyKClcbn0pO1xudmFyIFR5cGVzcGFjZSA9IHQub2JqZWN0KFwiVHlwZXNwYWNlXCIsIHtcbiAgZ2V0IHR5cGVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KEFsZ2VicmFpY1R5cGUyKTtcbiAgfVxufSk7XG52YXIgVmlld1Jlc3VsdEhlYWRlciA9IHQuZW51bShcIlZpZXdSZXN1bHRIZWFkZXJcIiwge1xuICBSb3dEYXRhOiB0LnVuaXQoKSxcbiAgUmF3U3FsOiB0LnN0cmluZygpXG59KTtcblxuLy8gc3JjL2xpYi9zY2hlbWEudHNcbmZ1bmN0aW9uIHRhYmxlVG9TY2hlbWEoYWNjTmFtZSwgc2NoZW1hMiwgdGFibGVEZWYpIHtcbiAgY29uc3QgZ2V0Q29sTmFtZSA9IChpKSA9PiBzY2hlbWEyLnJvd1R5cGUuYWxnZWJyYWljVHlwZS52YWx1ZS5lbGVtZW50c1tpXS5uYW1lO1xuICByZXR1cm4ge1xuICAgIHNvdXJjZU5hbWU6IGFjY05hbWUsXG4gICAgYWNjZXNzb3JOYW1lOiBhY2NOYW1lLFxuICAgIGNvbHVtbnM6IHNjaGVtYTIucm93VHlwZS5yb3csXG4gICAgLy8gdHlwZWQgYXMgVFtpXVsncm93VHlwZSddWydyb3cnXSB1bmRlciBUYWJsZXNUb1NjaGVtYTxUPlxuICAgIHJvd1R5cGU6IHNjaGVtYTIucm93U3BhY2V0aW1lVHlwZSxcbiAgICBjb25zdHJhaW50czogdGFibGVEZWYuY29uc3RyYWludHMubWFwKChjKSA9PiAoe1xuICAgICAgbmFtZTogYy5zb3VyY2VOYW1lLFxuICAgICAgY29uc3RyYWludDogXCJ1bmlxdWVcIixcbiAgICAgIGNvbHVtbnM6IGMuZGF0YS52YWx1ZS5jb2x1bW5zLm1hcChnZXRDb2xOYW1lKVxuICAgIH0pKSxcbiAgICAvLyBUT0RPOiBob3JyaWJsZSBob3JyaWJsZSBob3JyaWJsZS4gd2Ugc211Z2dsZSB0aGlzIGBBcnJheTxVbnR5cGVkSW5kZXg+YFxuICAgIC8vIGJ5IGNhc3RpbmcgaXQgdG8gYW4gYEFycmF5PEluZGV4T3B0cz5gIGFzIGBUYWJsZVRvU2NoZW1hYCBleHBlY3RzLlxuICAgIC8vIFRoaXMgaXMgdGhlbiB1c2VkIGluIGBUYWJsZUNhY2hlSW1wbC5jb25zdHJ1Y3RvcmAgYW5kIHdobyBrbm93cyB3aGVyZSBlbHNlLlxuICAgIC8vIFdlIHNob3VsZCBzdG9wIGx5aW5nIGFib3V0IG91ciB0eXBlcy5cbiAgICBpbmRleGVzOiB0YWJsZURlZi5pbmRleGVzLm1hcCgoaWR4KSA9PiB7XG4gICAgICBjb25zdCBjb2x1bW5JZHMgPSBpZHguYWxnb3JpdGhtLnRhZyA9PT0gXCJEaXJlY3RcIiA/IFtpZHguYWxnb3JpdGhtLnZhbHVlXSA6IGlkeC5hbGdvcml0aG0udmFsdWU7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpZHguYWNjZXNzb3JOYW1lLFxuICAgICAgICB1bmlxdWU6IHRhYmxlRGVmLmNvbnN0cmFpbnRzLnNvbWUoXG4gICAgICAgICAgKGMpID0+IGMuZGF0YS52YWx1ZS5jb2x1bW5zLmV2ZXJ5KChjb2wpID0+IGNvbHVtbklkcy5pbmNsdWRlcyhjb2wpKVxuICAgICAgICApLFxuICAgICAgICBhbGdvcml0aG06IGlkeC5hbGdvcml0aG0udGFnLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIGNvbHVtbnM6IGNvbHVtbklkcy5tYXAoZ2V0Q29sTmFtZSlcbiAgICAgIH07XG4gICAgfSksXG4gICAgdGFibGVEZWYsXG4gICAgLi4udGFibGVEZWYuaXNFdmVudCA/IHsgaXNFdmVudDogdHJ1ZSB9IDoge31cbiAgfTtcbn1cbnZhciBNb2R1bGVDb250ZXh0ID0gY2xhc3Mge1xuICAjY29tcG91bmRUeXBlcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gIC8qKlxuICAgKiBUaGUgZ2xvYmFsIG1vZHVsZSBkZWZpbml0aW9uIHRoYXQgZ2V0cyBwb3B1bGF0ZWQgYnkgY2FsbHMgdG8gYHJlZHVjZXIoKWAgYW5kIGxpZmVjeWNsZSBob29rcy5cbiAgICovXG4gICNtb2R1bGVEZWYgPSB7XG4gICAgdHlwZXNwYWNlOiB7IHR5cGVzOiBbXSB9LFxuICAgIHRhYmxlczogW10sXG4gICAgcmVkdWNlcnM6IFtdLFxuICAgIHR5cGVzOiBbXSxcbiAgICByb3dMZXZlbFNlY3VyaXR5OiBbXSxcbiAgICBzY2hlZHVsZXM6IFtdLFxuICAgIHByb2NlZHVyZXM6IFtdLFxuICAgIHZpZXdzOiBbXSxcbiAgICBsaWZlQ3ljbGVSZWR1Y2VyczogW10sXG4gICAgY2FzZUNvbnZlcnNpb25Qb2xpY3k6IHsgdGFnOiBcIlNuYWtlQ2FzZVwiIH0sXG4gICAgZXhwbGljaXROYW1lczoge1xuICAgICAgZW50cmllczogW11cbiAgICB9XG4gIH07XG4gIGdldCBtb2R1bGVEZWYoKSB7XG4gICAgcmV0dXJuIHRoaXMuI21vZHVsZURlZjtcbiAgfVxuICByYXdNb2R1bGVEZWZWMTAoKSB7XG4gICAgY29uc3Qgc2VjdGlvbnMgPSBbXTtcbiAgICBjb25zdCBwdXNoID0gKHMpID0+IHtcbiAgICAgIGlmIChzKSBzZWN0aW9ucy5wdXNoKHMpO1xuICAgIH07XG4gICAgY29uc3QgbW9kdWxlID0gdGhpcy4jbW9kdWxlRGVmO1xuICAgIHB1c2gobW9kdWxlLnR5cGVzcGFjZSAmJiB7IHRhZzogXCJUeXBlc3BhY2VcIiwgdmFsdWU6IG1vZHVsZS50eXBlc3BhY2UgfSk7XG4gICAgcHVzaChtb2R1bGUudHlwZXMgJiYgeyB0YWc6IFwiVHlwZXNcIiwgdmFsdWU6IG1vZHVsZS50eXBlcyB9KTtcbiAgICBwdXNoKG1vZHVsZS50YWJsZXMgJiYgeyB0YWc6IFwiVGFibGVzXCIsIHZhbHVlOiBtb2R1bGUudGFibGVzIH0pO1xuICAgIHB1c2gobW9kdWxlLnJlZHVjZXJzICYmIHsgdGFnOiBcIlJlZHVjZXJzXCIsIHZhbHVlOiBtb2R1bGUucmVkdWNlcnMgfSk7XG4gICAgcHVzaChtb2R1bGUucHJvY2VkdXJlcyAmJiB7IHRhZzogXCJQcm9jZWR1cmVzXCIsIHZhbHVlOiBtb2R1bGUucHJvY2VkdXJlcyB9KTtcbiAgICBwdXNoKG1vZHVsZS52aWV3cyAmJiB7IHRhZzogXCJWaWV3c1wiLCB2YWx1ZTogbW9kdWxlLnZpZXdzIH0pO1xuICAgIHB1c2gobW9kdWxlLnNjaGVkdWxlcyAmJiB7IHRhZzogXCJTY2hlZHVsZXNcIiwgdmFsdWU6IG1vZHVsZS5zY2hlZHVsZXMgfSk7XG4gICAgcHVzaChcbiAgICAgIG1vZHVsZS5saWZlQ3ljbGVSZWR1Y2VycyAmJiB7XG4gICAgICAgIHRhZzogXCJMaWZlQ3ljbGVSZWR1Y2Vyc1wiLFxuICAgICAgICB2YWx1ZTogbW9kdWxlLmxpZmVDeWNsZVJlZHVjZXJzXG4gICAgICB9XG4gICAgKTtcbiAgICBwdXNoKFxuICAgICAgbW9kdWxlLnJvd0xldmVsU2VjdXJpdHkgJiYge1xuICAgICAgICB0YWc6IFwiUm93TGV2ZWxTZWN1cml0eVwiLFxuICAgICAgICB2YWx1ZTogbW9kdWxlLnJvd0xldmVsU2VjdXJpdHlcbiAgICAgIH1cbiAgICApO1xuICAgIHB1c2goXG4gICAgICBtb2R1bGUuZXhwbGljaXROYW1lcyAmJiB7XG4gICAgICAgIHRhZzogXCJFeHBsaWNpdE5hbWVzXCIsXG4gICAgICAgIHZhbHVlOiBtb2R1bGUuZXhwbGljaXROYW1lc1xuICAgICAgfVxuICAgICk7XG4gICAgcHVzaChcbiAgICAgIG1vZHVsZS5jYXNlQ29udmVyc2lvblBvbGljeSAmJiB7XG4gICAgICAgIHRhZzogXCJDYXNlQ29udmVyc2lvblBvbGljeVwiLFxuICAgICAgICB2YWx1ZTogbW9kdWxlLmNhc2VDb252ZXJzaW9uUG9saWN5XG4gICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4geyBzZWN0aW9ucyB9O1xuICB9XG4gIC8qKlxuICAgKiBTZXQgdGhlIGNhc2UgY29udmVyc2lvbiBwb2xpY3kgZm9yIHRoaXMgbW9kdWxlLlxuICAgKiBDYWxsZWQgYnkgdGhlIHNldHRpbmdzIG1lY2hhbmlzbS5cbiAgICovXG4gIHNldENhc2VDb252ZXJzaW9uUG9saWN5KHBvbGljeSkge1xuICAgIHRoaXMuI21vZHVsZURlZi5jYXNlQ29udmVyc2lvblBvbGljeSA9IHBvbGljeTtcbiAgfVxuICBnZXQgdHlwZXNwYWNlKCkge1xuICAgIHJldHVybiB0aGlzLiNtb2R1bGVEZWYudHlwZXNwYWNlO1xuICB9XG4gIC8qKlxuICAgKiBSZXNvbHZlcyB0aGUgYWN0dWFsIHR5cGUgb2YgYSBUeXBlQnVpbGRlciBieSBmb2xsb3dpbmcgaXRzIHJlZmVyZW5jZXMgdW50aWwgaXQgcmVhY2hlcyBhIG5vbi1yZWYgdHlwZS5cbiAgICogQHBhcmFtIHR5cGVzcGFjZSBUaGUgdHlwZXNwYWNlIHRvIHJlc29sdmUgdHlwZXMgYWdhaW5zdC5cbiAgICogQHBhcmFtIHR5cGVCdWlsZGVyIFRoZSBUeXBlQnVpbGRlciB0byByZXNvbHZlLlxuICAgKiBAcmV0dXJucyBUaGUgcmVzb2x2ZWQgYWxnZWJyYWljIHR5cGUuXG4gICAqL1xuICByZXNvbHZlVHlwZSh0eXBlQnVpbGRlcikge1xuICAgIGxldCB0eSA9IHR5cGVCdWlsZGVyLmFsZ2VicmFpY1R5cGU7XG4gICAgd2hpbGUgKHR5LnRhZyA9PT0gXCJSZWZcIikge1xuICAgICAgdHkgPSB0aGlzLnR5cGVzcGFjZS50eXBlc1t0eS52YWx1ZV07XG4gICAgfVxuICAgIHJldHVybiB0eTtcbiAgfVxuICAvKipcbiAgICogQWRkcyBhIHR5cGUgdG8gdGhlIG1vZHVsZSBkZWZpbml0aW9uJ3MgdHlwZXNwYWNlIGFzIGEgYFJlZmAgaWYgaXQgaXMgYSBuYW1lZCBjb21wb3VuZCB0eXBlIChQcm9kdWN0IG9yIFN1bSkuXG4gICAqIE90aGVyd2lzZSwgcmV0dXJucyB0aGUgdHlwZSBhcyBpcy5cbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHBhcmFtIHR5XG4gICAqIEByZXR1cm5zXG4gICAqL1xuICByZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkodHlwZUJ1aWxkZXIpIHtcbiAgICBpZiAodHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBQcm9kdWN0QnVpbGRlciAmJiAhaXNVbml0KHR5cGVCdWlsZGVyKSB8fCB0eXBlQnVpbGRlciBpbnN0YW5jZW9mIFN1bUJ1aWxkZXIgfHwgdHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBSb3dCdWlsZGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy4jcmVnaXN0ZXJDb21wb3VuZFR5cGVSZWN1cnNpdmVseSh0eXBlQnVpbGRlcik7XG4gICAgfSBlbHNlIGlmICh0eXBlQnVpbGRlciBpbnN0YW5jZW9mIE9wdGlvbkJ1aWxkZXIpIHtcbiAgICAgIHJldHVybiBuZXcgT3B0aW9uQnVpbGRlcihcbiAgICAgICAgdGhpcy5yZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkodHlwZUJ1aWxkZXIudmFsdWUpXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBSZXN1bHRCdWlsZGVyKSB7XG4gICAgICByZXR1cm4gbmV3IFJlc3VsdEJ1aWxkZXIoXG4gICAgICAgIHRoaXMucmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHR5cGVCdWlsZGVyLm9rKSxcbiAgICAgICAgdGhpcy5yZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkodHlwZUJ1aWxkZXIuZXJyKVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgQXJyYXlCdWlsZGVyKSB7XG4gICAgICByZXR1cm4gbmV3IEFycmF5QnVpbGRlcihcbiAgICAgICAgdGhpcy5yZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkodHlwZUJ1aWxkZXIuZWxlbWVudClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0eXBlQnVpbGRlcjtcbiAgICB9XG4gIH1cbiAgI3JlZ2lzdGVyQ29tcG91bmRUeXBlUmVjdXJzaXZlbHkodHlwZUJ1aWxkZXIpIHtcbiAgICBjb25zdCB0eSA9IHR5cGVCdWlsZGVyLmFsZ2VicmFpY1R5cGU7XG4gICAgY29uc3QgbmFtZSA9IHR5cGVCdWlsZGVyLnR5cGVOYW1lO1xuICAgIGlmIChuYW1lID09PSB2b2lkIDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYE1pc3NpbmcgdHlwZSBuYW1lIGZvciAke3R5cGVCdWlsZGVyLmNvbnN0cnVjdG9yLm5hbWUgPz8gXCJUeXBlQnVpbGRlclwifSAke0pTT04uc3RyaW5naWZ5KHR5cGVCdWlsZGVyKX1gXG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgciA9IHRoaXMuI2NvbXBvdW5kVHlwZXMuZ2V0KHR5KTtcbiAgICBpZiAociAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gcjtcbiAgICB9XG4gICAgY29uc3QgbmV3VHkgPSB0eXBlQnVpbGRlciBpbnN0YW5jZW9mIFJvd0J1aWxkZXIgfHwgdHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBQcm9kdWN0QnVpbGRlciA/IHtcbiAgICAgIHRhZzogXCJQcm9kdWN0XCIsXG4gICAgICB2YWx1ZTogeyBlbGVtZW50czogW10gfVxuICAgIH0gOiB7XG4gICAgICB0YWc6IFwiU3VtXCIsXG4gICAgICB2YWx1ZTogeyB2YXJpYW50czogW10gfVxuICAgIH07XG4gICAgciA9IG5ldyBSZWZCdWlsZGVyKHRoaXMuI21vZHVsZURlZi50eXBlc3BhY2UudHlwZXMubGVuZ3RoKTtcbiAgICB0aGlzLiNtb2R1bGVEZWYudHlwZXNwYWNlLnR5cGVzLnB1c2gobmV3VHkpO1xuICAgIHRoaXMuI2NvbXBvdW5kVHlwZXMuc2V0KHR5LCByKTtcbiAgICBpZiAodHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBSb3dCdWlsZGVyKSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lMiwgZWxlbV0gb2YgT2JqZWN0LmVudHJpZXModHlwZUJ1aWxkZXIucm93KSkge1xuICAgICAgICBuZXdUeS52YWx1ZS5lbGVtZW50cy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBuYW1lMixcbiAgICAgICAgICBhbGdlYnJhaWNUeXBlOiB0aGlzLnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseShlbGVtLnR5cGVCdWlsZGVyKS5hbGdlYnJhaWNUeXBlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBQcm9kdWN0QnVpbGRlcikge1xuICAgICAgZm9yIChjb25zdCBbbmFtZTIsIGVsZW1dIG9mIE9iamVjdC5lbnRyaWVzKHR5cGVCdWlsZGVyLmVsZW1lbnRzKSkge1xuICAgICAgICBuZXdUeS52YWx1ZS5lbGVtZW50cy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBuYW1lMixcbiAgICAgICAgICBhbGdlYnJhaWNUeXBlOiB0aGlzLnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseShlbGVtKS5hbGdlYnJhaWNUeXBlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBTdW1CdWlsZGVyKSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lMiwgdmFyaWFudF0gb2YgT2JqZWN0LmVudHJpZXModHlwZUJ1aWxkZXIudmFyaWFudHMpKSB7XG4gICAgICAgIG5ld1R5LnZhbHVlLnZhcmlhbnRzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IG5hbWUyLFxuICAgICAgICAgIGFsZ2VicmFpY1R5cGU6IHRoaXMucmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHZhcmlhbnQpLmFsZ2VicmFpY1R5cGVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuI21vZHVsZURlZi50eXBlcy5wdXNoKHtcbiAgICAgIHNvdXJjZU5hbWU6IHNwbGl0TmFtZShuYW1lKSxcbiAgICAgIHR5OiByLnJlZixcbiAgICAgIGN1c3RvbU9yZGVyaW5nOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIHI7XG4gIH1cbn07XG5mdW5jdGlvbiBpc1VuaXQodHlwZUJ1aWxkZXIpIHtcbiAgcmV0dXJuIHR5cGVCdWlsZGVyLnR5cGVOYW1lID09IG51bGwgJiYgdHlwZUJ1aWxkZXIuYWxnZWJyYWljVHlwZS52YWx1ZS5lbGVtZW50cy5sZW5ndGggPT09IDA7XG59XG5mdW5jdGlvbiBzcGxpdE5hbWUobmFtZSkge1xuICBjb25zdCBzY29wZSA9IG5hbWUuc3BsaXQoXCIuXCIpO1xuICByZXR1cm4geyBzb3VyY2VOYW1lOiBzY29wZS5wb3AoKSwgc2NvcGUgfTtcbn1cblxuLy8gc3JjL3NlcnZlci9odHRwX2ludGVybmFsLnRzXG52YXIgaW1wb3J0X3N0YXR1c2VzID0gX190b0VTTShyZXF1aXJlX3N0YXR1c2VzKCkpO1xuXG4vLyBzcmMvc2VydmVyL3JhbmdlLnRzXG52YXIgUmFuZ2UgPSBjbGFzcyB7XG4gICNmcm9tO1xuICAjdG87XG4gIGNvbnN0cnVjdG9yKGZyb20sIHRvKSB7XG4gICAgdGhpcy4jZnJvbSA9IGZyb20gPz8geyB0YWc6IFwidW5ib3VuZGVkXCIgfTtcbiAgICB0aGlzLiN0byA9IHRvID8/IHsgdGFnOiBcInVuYm91bmRlZFwiIH07XG4gIH1cbiAgZ2V0IGZyb20oKSB7XG4gICAgcmV0dXJuIHRoaXMuI2Zyb207XG4gIH1cbiAgZ2V0IHRvKCkge1xuICAgIHJldHVybiB0aGlzLiN0bztcbiAgfVxufTtcblxuLy8gc3JjL2xpYi90YWJsZS50c1xuZnVuY3Rpb24gdGFibGUob3B0cywgcm93LCAuLi5fKSB7XG4gIGNvbnN0IHtcbiAgICBuYW1lLFxuICAgIHB1YmxpYzogaXNQdWJsaWMgPSBmYWxzZSxcbiAgICBpbmRleGVzOiB1c2VySW5kZXhlcyA9IFtdLFxuICAgIHNjaGVkdWxlZCxcbiAgICBldmVudDogaXNFdmVudCA9IGZhbHNlXG4gIH0gPSBvcHRzO1xuICBjb25zdCBjb2xJZHMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICBjb25zdCBjb2xOYW1lTGlzdCA9IFtdO1xuICBpZiAoIShyb3cgaW5zdGFuY2VvZiBSb3dCdWlsZGVyKSkge1xuICAgIHJvdyA9IG5ldyBSb3dCdWlsZGVyKHJvdyk7XG4gIH1cbiAgcm93LmFsZ2VicmFpY1R5cGUudmFsdWUuZWxlbWVudHMuZm9yRWFjaCgoZWxlbSwgaSkgPT4ge1xuICAgIGNvbElkcy5zZXQoZWxlbS5uYW1lLCBpKTtcbiAgICBjb2xOYW1lTGlzdC5wdXNoKGVsZW0ubmFtZSk7XG4gIH0pO1xuICBjb25zdCBwayA9IFtdO1xuICBjb25zdCBpbmRleGVzID0gW107XG4gIGNvbnN0IGNvbnN0cmFpbnRzID0gW107XG4gIGNvbnN0IHNlcXVlbmNlcyA9IFtdO1xuICBsZXQgc2NoZWR1bGVBdENvbDtcbiAgY29uc3QgZGVmYXVsdFZhbHVlcyA9IFtdO1xuICBmb3IgKGNvbnN0IFtuYW1lMiwgYnVpbGRlcl0gb2YgT2JqZWN0LmVudHJpZXMocm93LnJvdykpIHtcbiAgICBjb25zdCBtZXRhID0gYnVpbGRlci5jb2x1bW5NZXRhZGF0YTtcbiAgICBpZiAobWV0YS5pc1ByaW1hcnlLZXkpIHtcbiAgICAgIHBrLnB1c2goY29sSWRzLmdldChuYW1lMikpO1xuICAgIH1cbiAgICBjb25zdCBpc1VuaXF1ZSA9IG1ldGEuaXNVbmlxdWUgfHwgbWV0YS5pc1ByaW1hcnlLZXk7XG4gICAgaWYgKG1ldGEuaW5kZXhUeXBlIHx8IGlzVW5pcXVlKSB7XG4gICAgICBjb25zdCBhbGdvID0gbWV0YS5pbmRleFR5cGUgPz8gXCJidHJlZVwiO1xuICAgICAgY29uc3QgaWQgPSBjb2xJZHMuZ2V0KG5hbWUyKTtcbiAgICAgIGxldCBhbGdvcml0aG07XG4gICAgICBzd2l0Y2ggKGFsZ28pIHtcbiAgICAgICAgY2FzZSBcImJ0cmVlXCI6XG4gICAgICAgICAgYWxnb3JpdGhtID0gUmF3SW5kZXhBbGdvcml0aG0uQlRyZWUoW2lkXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJoYXNoXCI6XG4gICAgICAgICAgYWxnb3JpdGhtID0gUmF3SW5kZXhBbGdvcml0aG0uSGFzaChbaWRdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRpcmVjdFwiOlxuICAgICAgICAgIGFsZ29yaXRobSA9IFJhd0luZGV4QWxnb3JpdGhtLkRpcmVjdChpZCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpbmRleGVzLnB1c2goe1xuICAgICAgICBzb3VyY2VOYW1lOiB2b2lkIDAsXG4gICAgICAgIC8vIFVubmFtZWQgaW5kZXhlcyB3aWxsIGJlIGFzc2lnbmVkIGEgZ2xvYmFsbHkgdW5pcXVlIG5hbWVcbiAgICAgICAgYWNjZXNzb3JOYW1lOiBuYW1lMixcbiAgICAgICAgYWxnb3JpdGhtXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGlzVW5pcXVlKSB7XG4gICAgICBjb25zdHJhaW50cy5wdXNoKHtcbiAgICAgICAgc291cmNlTmFtZTogdm9pZCAwLFxuICAgICAgICBkYXRhOiB7IHRhZzogXCJVbmlxdWVcIiwgdmFsdWU6IHsgY29sdW1uczogW2NvbElkcy5nZXQobmFtZTIpXSB9IH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobWV0YS5pc0F1dG9JbmNyZW1lbnQpIHtcbiAgICAgIHNlcXVlbmNlcy5wdXNoKHtcbiAgICAgICAgc291cmNlTmFtZTogdm9pZCAwLFxuICAgICAgICBzdGFydDogdm9pZCAwLFxuICAgICAgICBtaW5WYWx1ZTogdm9pZCAwLFxuICAgICAgICBtYXhWYWx1ZTogdm9pZCAwLFxuICAgICAgICBjb2x1bW46IGNvbElkcy5nZXQobmFtZTIpLFxuICAgICAgICBpbmNyZW1lbnQ6IDFuXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1ldGEuZGVmYXVsdFZhbHVlKSB7XG4gICAgICBjb25zdCB3cml0ZXIgPSBuZXcgQmluYXJ5V3JpdGVyKDE2KTtcbiAgICAgIGJ1aWxkZXIuc2VyaWFsaXplKHdyaXRlciwgbWV0YS5kZWZhdWx0VmFsdWUpO1xuICAgICAgZGVmYXVsdFZhbHVlcy5wdXNoKHtcbiAgICAgICAgY29sSWQ6IGNvbElkcy5nZXQobmFtZTIpLFxuICAgICAgICB2YWx1ZTogd3JpdGVyLmdldEJ1ZmZlcigpXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHNjaGVkdWxlZCkge1xuICAgICAgY29uc3QgYWxnZWJyYWljVHlwZSA9IGJ1aWxkZXIudHlwZUJ1aWxkZXIuYWxnZWJyYWljVHlwZTtcbiAgICAgIGlmIChzY2hlZHVsZV9hdF9kZWZhdWx0LmlzU2NoZWR1bGVBdChhbGdlYnJhaWNUeXBlKSkge1xuICAgICAgICBzY2hlZHVsZUF0Q29sID0gY29sSWRzLmdldChuYW1lMik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZvciAoY29uc3QgaW5kZXhPcHRzIG9mIHVzZXJJbmRleGVzID8/IFtdKSB7XG4gICAgbGV0IGFsZ29yaXRobTtcbiAgICBzd2l0Y2ggKGluZGV4T3B0cy5hbGdvcml0aG0pIHtcbiAgICAgIGNhc2UgXCJidHJlZVwiOlxuICAgICAgICBhbGdvcml0aG0gPSB7XG4gICAgICAgICAgdGFnOiBcIkJUcmVlXCIsXG4gICAgICAgICAgdmFsdWU6IGluZGV4T3B0cy5jb2x1bW5zLm1hcCgoYykgPT4gY29sSWRzLmdldChjKSlcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiaGFzaFwiOlxuICAgICAgICBhbGdvcml0aG0gPSB7XG4gICAgICAgICAgdGFnOiBcIkhhc2hcIixcbiAgICAgICAgICB2YWx1ZTogaW5kZXhPcHRzLmNvbHVtbnMubWFwKChjKSA9PiBjb2xJZHMuZ2V0KGMpKVxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkaXJlY3RcIjpcbiAgICAgICAgYWxnb3JpdGhtID0geyB0YWc6IFwiRGlyZWN0XCIsIHZhbHVlOiBjb2xJZHMuZ2V0KGluZGV4T3B0cy5jb2x1bW4pIH07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpbmRleGVzLnB1c2goe1xuICAgICAgc291cmNlTmFtZTogdm9pZCAwLFxuICAgICAgYWNjZXNzb3JOYW1lOiBpbmRleE9wdHMuYWNjZXNzb3IsXG4gICAgICBhbGdvcml0aG0sXG4gICAgICBjYW5vbmljYWxOYW1lOiBpbmRleE9wdHMubmFtZVxuICAgIH0pO1xuICB9XG4gIGZvciAoY29uc3QgY29uc3RyYWludE9wdHMgb2Ygb3B0cy5jb25zdHJhaW50cyA/PyBbXSkge1xuICAgIGlmIChjb25zdHJhaW50T3B0cy5jb25zdHJhaW50ID09PSBcInVuaXF1ZVwiKSB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICB0YWc6IFwiVW5pcXVlXCIsXG4gICAgICAgIHZhbHVlOiB7IGNvbHVtbnM6IGNvbnN0cmFpbnRPcHRzLmNvbHVtbnMubWFwKChjKSA9PiBjb2xJZHMuZ2V0KGMpKSB9XG4gICAgICB9O1xuICAgICAgY29uc3RyYWludHMucHVzaCh7IHNvdXJjZU5hbWU6IGNvbnN0cmFpbnRPcHRzLm5hbWUsIGRhdGEgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gIH1cbiAgY29uc3QgcHJvZHVjdFR5cGUgPSByb3cuYWxnZWJyYWljVHlwZS52YWx1ZTtcbiAgY29uc3Qgc2NoZWR1bGUgPSBzY2hlZHVsZWQgJiYgc2NoZWR1bGVBdENvbCAhPT0gdm9pZCAwID8geyBzY2hlZHVsZUF0Q29sLCByZWR1Y2VyOiBzY2hlZHVsZWQgfSA6IHZvaWQgMDtcbiAgcmV0dXJuIHtcbiAgICByb3dUeXBlOiByb3csXG4gICAgdGFibGVOYW1lOiBuYW1lLFxuICAgIHJvd1NwYWNldGltZVR5cGU6IHByb2R1Y3RUeXBlLFxuICAgIHRhYmxlRGVmOiAoY3R4LCBhY2NOYW1lKSA9PiB7XG4gICAgICBjb25zdCB0YWJsZU5hbWUgPSBuYW1lID8/IGFjY05hbWU7XG4gICAgICBpZiAocm93LnR5cGVOYW1lID09PSB2b2lkIDApIHtcbiAgICAgICAgcm93LnR5cGVOYW1lID0gdG9QYXNjYWxDYXNlKHRhYmxlTmFtZSk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGluZGV4IG9mIGluZGV4ZXMpIHtcbiAgICAgICAgY29uc3QgY29scyA9IGluZGV4LmFsZ29yaXRobS50YWcgPT09IFwiRGlyZWN0XCIgPyBbaW5kZXguYWxnb3JpdGhtLnZhbHVlXSA6IGluZGV4LmFsZ29yaXRobS52YWx1ZTtcbiAgICAgICAgY29uc3QgY29sUyA9IGNvbHMubWFwKChpKSA9PiBjb2xOYW1lTGlzdFtpXSkuam9pbihcIl9cIik7XG4gICAgICAgIGNvbnN0IHNvdXJjZU5hbWUgPSBpbmRleC5zb3VyY2VOYW1lID0gYCR7YWNjTmFtZX1fJHtjb2xTfV9pZHhfJHtpbmRleC5hbGdvcml0aG0udGFnLnRvTG93ZXJDYXNlKCl9YDtcbiAgICAgICAgY29uc3QgeyBjYW5vbmljYWxOYW1lIH0gPSBpbmRleDtcbiAgICAgICAgaWYgKGNhbm9uaWNhbE5hbWUgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGN0eC5tb2R1bGVEZWYuZXhwbGljaXROYW1lcy5lbnRyaWVzLnB1c2goXG4gICAgICAgICAgICBFeHBsaWNpdE5hbWVFbnRyeS5JbmRleCh7IHNvdXJjZU5hbWUsIGNhbm9uaWNhbE5hbWUgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzb3VyY2VOYW1lOiBhY2NOYW1lLFxuICAgICAgICBwcm9kdWN0VHlwZVJlZjogY3R4LnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseShyb3cpLnJlZixcbiAgICAgICAgcHJpbWFyeUtleTogcGssXG4gICAgICAgIGluZGV4ZXMsXG4gICAgICAgIGNvbnN0cmFpbnRzLFxuICAgICAgICBzZXF1ZW5jZXMsXG4gICAgICAgIHRhYmxlVHlwZTogeyB0YWc6IFwiVXNlclwiIH0sXG4gICAgICAgIHRhYmxlQWNjZXNzOiB7IHRhZzogaXNQdWJsaWMgPyBcIlB1YmxpY1wiIDogXCJQcml2YXRlXCIgfSxcbiAgICAgICAgZGVmYXVsdFZhbHVlcyxcbiAgICAgICAgaXNFdmVudFxuICAgICAgfTtcbiAgICB9LFxuICAgIGlkeHM6IHt9LFxuICAgIGNvbnN0cmFpbnRzLFxuICAgIHNjaGVkdWxlXG4gIH07XG59XG5cbi8vIHNyYy9saWIvcXVlcnkudHNcbnZhciBRdWVyeUJyYW5kID0gU3ltYm9sKFwiUXVlcnlCcmFuZFwiKTtcbnZhciBpc1Jvd1R5cGVkUXVlcnkgPSAodmFsKSA9PiAhIXZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiICYmIFF1ZXJ5QnJhbmQgaW4gdmFsO1xudmFyIGlzVHlwZWRRdWVyeSA9ICh2YWwpID0+ICEhdmFsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIgJiYgUXVlcnlCcmFuZCBpbiB2YWw7XG5mdW5jdGlvbiB0b1NxbChxKSB7XG4gIHJldHVybiBxLnRvU3FsKCk7XG59XG52YXIgU2VtaWpvaW5JbXBsID0gY2xhc3MgX1NlbWlqb2luSW1wbCB7XG4gIGNvbnN0cnVjdG9yKHNvdXJjZVF1ZXJ5LCBmaWx0ZXJRdWVyeSwgam9pbkNvbmRpdGlvbikge1xuICAgIHRoaXMuc291cmNlUXVlcnkgPSBzb3VyY2VRdWVyeTtcbiAgICB0aGlzLmZpbHRlclF1ZXJ5ID0gZmlsdGVyUXVlcnk7XG4gICAgdGhpcy5qb2luQ29uZGl0aW9uID0gam9pbkNvbmRpdGlvbjtcbiAgICBpZiAoc291cmNlUXVlcnkudGFibGUuc291cmNlTmFtZSA9PT0gZmlsdGVyUXVlcnkudGFibGUuc291cmNlTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHNlbWlqb2luIGEgdGFibGUgdG8gaXRzZWxmXCIpO1xuICAgIH1cbiAgfVxuICBbUXVlcnlCcmFuZF0gPSB0cnVlO1xuICB0eXBlID0gXCJzZW1pam9pblwiO1xuICBidWlsZCgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB3aGVyZShwcmVkaWNhdGUpIHtcbiAgICBjb25zdCBuZXh0U291cmNlUXVlcnkgPSB0aGlzLnNvdXJjZVF1ZXJ5LndoZXJlKHByZWRpY2F0ZSk7XG4gICAgcmV0dXJuIG5ldyBfU2VtaWpvaW5JbXBsKFxuICAgICAgbmV4dFNvdXJjZVF1ZXJ5LFxuICAgICAgdGhpcy5maWx0ZXJRdWVyeSxcbiAgICAgIHRoaXMuam9pbkNvbmRpdGlvblxuICAgICk7XG4gIH1cbiAgdG9TcWwoKSB7XG4gICAgY29uc3QgbGVmdCA9IHRoaXMuZmlsdGVyUXVlcnk7XG4gICAgY29uc3QgcmlnaHQgPSB0aGlzLnNvdXJjZVF1ZXJ5O1xuICAgIGNvbnN0IGxlZnRUYWJsZSA9IHF1b3RlSWRlbnRpZmllcihsZWZ0LnRhYmxlLnNvdXJjZU5hbWUpO1xuICAgIGNvbnN0IHJpZ2h0VGFibGUgPSBxdW90ZUlkZW50aWZpZXIocmlnaHQudGFibGUuc291cmNlTmFtZSk7XG4gICAgbGV0IHNxbCA9IGBTRUxFQ1QgJHtyaWdodFRhYmxlfS4qIEZST00gJHtsZWZ0VGFibGV9IEpPSU4gJHtyaWdodFRhYmxlfSBPTiAke2Jvb2xlYW5FeHByVG9TcWwodGhpcy5qb2luQ29uZGl0aW9uKX1gO1xuICAgIGNvbnN0IGNsYXVzZXMgPSBbXTtcbiAgICBpZiAobGVmdC53aGVyZUNsYXVzZSkge1xuICAgICAgY2xhdXNlcy5wdXNoKGJvb2xlYW5FeHByVG9TcWwobGVmdC53aGVyZUNsYXVzZSkpO1xuICAgIH1cbiAgICBpZiAocmlnaHQud2hlcmVDbGF1c2UpIHtcbiAgICAgIGNsYXVzZXMucHVzaChib29sZWFuRXhwclRvU3FsKHJpZ2h0LndoZXJlQ2xhdXNlKSk7XG4gICAgfVxuICAgIGlmIChjbGF1c2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHdoZXJlU3FsID0gY2xhdXNlcy5sZW5ndGggPT09IDEgPyBjbGF1c2VzWzBdIDogY2xhdXNlcy5tYXAod3JhcEluUGFyZW5zKS5qb2luKFwiIEFORCBcIik7XG4gICAgICBzcWwgKz0gYCBXSEVSRSAke3doZXJlU3FsfWA7XG4gICAgfVxuICAgIHJldHVybiBzcWw7XG4gIH1cbn07XG52YXIgRnJvbUJ1aWxkZXIgPSBjbGFzcyBfRnJvbUJ1aWxkZXIge1xuICBjb25zdHJ1Y3Rvcih0YWJsZTIsIHdoZXJlQ2xhdXNlKSB7XG4gICAgdGhpcy50YWJsZSA9IHRhYmxlMjtcbiAgICB0aGlzLndoZXJlQ2xhdXNlID0gd2hlcmVDbGF1c2U7XG4gIH1cbiAgW1F1ZXJ5QnJhbmRdID0gdHJ1ZTtcbiAgd2hlcmUocHJlZGljYXRlKSB7XG4gICAgY29uc3QgbmV3Q29uZGl0aW9uID0gcHJlZGljYXRlKHRoaXMudGFibGUuY29scyk7XG4gICAgY29uc3QgbmV4dFdoZXJlID0gdGhpcy53aGVyZUNsYXVzZSA/IHRoaXMud2hlcmVDbGF1c2UuYW5kKG5ld0NvbmRpdGlvbikgOiBuZXdDb25kaXRpb247XG4gICAgcmV0dXJuIG5ldyBfRnJvbUJ1aWxkZXIodGhpcy50YWJsZSwgbmV4dFdoZXJlKTtcbiAgfVxuICByaWdodFNlbWlqb2luKHJpZ2h0LCBvbikge1xuICAgIGNvbnN0IHNvdXJjZVF1ZXJ5ID0gbmV3IF9Gcm9tQnVpbGRlcihyaWdodCk7XG4gICAgY29uc3Qgam9pbkNvbmRpdGlvbiA9IG9uKFxuICAgICAgdGhpcy50YWJsZS5pbmRleGVkQ29scyxcbiAgICAgIHJpZ2h0LmluZGV4ZWRDb2xzXG4gICAgKTtcbiAgICByZXR1cm4gbmV3IFNlbWlqb2luSW1wbChzb3VyY2VRdWVyeSwgdGhpcywgam9pbkNvbmRpdGlvbik7XG4gIH1cbiAgbGVmdFNlbWlqb2luKHJpZ2h0LCBvbikge1xuICAgIGNvbnN0IGZpbHRlclF1ZXJ5ID0gbmV3IF9Gcm9tQnVpbGRlcihyaWdodCk7XG4gICAgY29uc3Qgam9pbkNvbmRpdGlvbiA9IG9uKFxuICAgICAgdGhpcy50YWJsZS5pbmRleGVkQ29scyxcbiAgICAgIHJpZ2h0LmluZGV4ZWRDb2xzXG4gICAgKTtcbiAgICByZXR1cm4gbmV3IFNlbWlqb2luSW1wbCh0aGlzLCBmaWx0ZXJRdWVyeSwgam9pbkNvbmRpdGlvbik7XG4gIH1cbiAgdG9TcWwoKSB7XG4gICAgcmV0dXJuIHJlbmRlclNlbGVjdFNxbFdpdGhKb2lucyh0aGlzLnRhYmxlLCB0aGlzLndoZXJlQ2xhdXNlKTtcbiAgfVxuICBidWlsZCgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufTtcbnZhciBUYWJsZVJlZkltcGwgPSBjbGFzcyB7XG4gIFtRdWVyeUJyYW5kXSA9IHRydWU7XG4gIHR5cGUgPSBcInRhYmxlXCI7XG4gIHNvdXJjZU5hbWU7XG4gIGFjY2Vzc29yTmFtZTtcbiAgY29scztcbiAgaW5kZXhlZENvbHM7XG4gIHRhYmxlRGVmO1xuICAvLyBEZWxlZ2F0ZSBVbnR5cGVkVGFibGVEZWYgcHJvcGVydGllcyBmcm9tIHRhYmxlRGVmIHNvIHRoaXMgY2FuIGJlIHVzZWQgYXMgYSB0YWJsZSBkZWYuXG4gIGdldCBjb2x1bW5zKCkge1xuICAgIHJldHVybiB0aGlzLnRhYmxlRGVmLmNvbHVtbnM7XG4gIH1cbiAgZ2V0IGluZGV4ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFibGVEZWYuaW5kZXhlcztcbiAgfVxuICBnZXQgcm93VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50YWJsZURlZi5yb3dUeXBlO1xuICB9XG4gIGdldCBjb25zdHJhaW50cygpIHtcbiAgICByZXR1cm4gdGhpcy50YWJsZURlZi5jb25zdHJhaW50cztcbiAgfVxuICBjb25zdHJ1Y3Rvcih0YWJsZURlZikge1xuICAgIHRoaXMuc291cmNlTmFtZSA9IHRhYmxlRGVmLnNvdXJjZU5hbWU7XG4gICAgdGhpcy5hY2Nlc3Nvck5hbWUgPSB0YWJsZURlZi5hY2Nlc3Nvck5hbWU7XG4gICAgdGhpcy5jb2xzID0gY3JlYXRlUm93RXhwcih0YWJsZURlZik7XG4gICAgdGhpcy5pbmRleGVkQ29scyA9IHRoaXMuY29scztcbiAgICB0aGlzLnRhYmxlRGVmID0gdGFibGVEZWY7XG4gICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbiAgfVxuICBhc0Zyb20oKSB7XG4gICAgcmV0dXJuIG5ldyBGcm9tQnVpbGRlcih0aGlzKTtcbiAgfVxuICByaWdodFNlbWlqb2luKG90aGVyLCBvbikge1xuICAgIHJldHVybiB0aGlzLmFzRnJvbSgpLnJpZ2h0U2VtaWpvaW4ob3RoZXIsIG9uKTtcbiAgfVxuICBsZWZ0U2VtaWpvaW4ob3RoZXIsIG9uKSB7XG4gICAgcmV0dXJuIHRoaXMuYXNGcm9tKCkubGVmdFNlbWlqb2luKG90aGVyLCBvbik7XG4gIH1cbiAgYnVpbGQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXNGcm9tKCkuYnVpbGQoKTtcbiAgfVxuICB0b1NxbCgpIHtcbiAgICByZXR1cm4gdGhpcy5hc0Zyb20oKS50b1NxbCgpO1xuICB9XG4gIHdoZXJlKHByZWRpY2F0ZSkge1xuICAgIHJldHVybiB0aGlzLmFzRnJvbSgpLndoZXJlKHByZWRpY2F0ZSk7XG4gIH1cbn07XG5mdW5jdGlvbiBjcmVhdGVUYWJsZVJlZkZyb21EZWYodGFibGVEZWYpIHtcbiAgcmV0dXJuIG5ldyBUYWJsZVJlZkltcGwodGFibGVEZWYpO1xufVxuZnVuY3Rpb24gbWFrZVF1ZXJ5QnVpbGRlcihzY2hlbWEyKSB7XG4gIGNvbnN0IHFiID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGZvciAoY29uc3QgdGFibGUyIG9mIE9iamVjdC52YWx1ZXMoc2NoZW1hMi50YWJsZXMpKSB7XG4gICAgY29uc3QgcmVmID0gY3JlYXRlVGFibGVSZWZGcm9tRGVmKFxuICAgICAgdGFibGUyXG4gICAgKTtcbiAgICBxYlt0YWJsZTIuYWNjZXNzb3JOYW1lXSA9IHJlZjtcbiAgfVxuICByZXR1cm4gT2JqZWN0LmZyZWV6ZShxYik7XG59XG5mdW5jdGlvbiBjcmVhdGVSb3dFeHByKHRhYmxlRGVmKSB7XG4gIGNvbnN0IHJvdyA9IHt9O1xuICBmb3IgKGNvbnN0IGNvbHVtbk5hbWUgb2YgT2JqZWN0LmtleXModGFibGVEZWYuY29sdW1ucykpIHtcbiAgICBjb25zdCBjb2x1bW5CdWlsZGVyID0gdGFibGVEZWYuY29sdW1uc1tjb2x1bW5OYW1lXTtcbiAgICBjb25zdCBjb2x1bW4gPSBuZXcgQ29sdW1uRXhwcmVzc2lvbihcbiAgICAgIHRhYmxlRGVmLnNvdXJjZU5hbWUsXG4gICAgICBjb2x1bW5OYW1lLFxuICAgICAgY29sdW1uQnVpbGRlci50eXBlQnVpbGRlci5hbGdlYnJhaWNUeXBlXG4gICAgKTtcbiAgICByb3dbY29sdW1uTmFtZV0gPSBPYmplY3QuZnJlZXplKGNvbHVtbik7XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5mcmVlemUocm93KTtcbn1cbmZ1bmN0aW9uIHJlbmRlclNlbGVjdFNxbFdpdGhKb2lucyh0YWJsZTIsIHdoZXJlLCBleHRyYUNsYXVzZXMgPSBbXSkge1xuICBjb25zdCBxdW90ZWRUYWJsZSA9IHF1b3RlSWRlbnRpZmllcih0YWJsZTIuc291cmNlTmFtZSk7XG4gIGNvbnN0IHNxbCA9IGBTRUxFQ1QgKiBGUk9NICR7cXVvdGVkVGFibGV9YDtcbiAgY29uc3QgY2xhdXNlcyA9IFtdO1xuICBpZiAod2hlcmUpIGNsYXVzZXMucHVzaChib29sZWFuRXhwclRvU3FsKHdoZXJlKSk7XG4gIGNsYXVzZXMucHVzaCguLi5leHRyYUNsYXVzZXMpO1xuICBpZiAoY2xhdXNlcy5sZW5ndGggPT09IDApIHJldHVybiBzcWw7XG4gIGNvbnN0IHdoZXJlU3FsID0gY2xhdXNlcy5sZW5ndGggPT09IDEgPyBjbGF1c2VzWzBdIDogY2xhdXNlcy5tYXAod3JhcEluUGFyZW5zKS5qb2luKFwiIEFORCBcIik7XG4gIHJldHVybiBgJHtzcWx9IFdIRVJFICR7d2hlcmVTcWx9YDtcbn1cbnZhciBDb2x1bW5FeHByZXNzaW9uID0gY2xhc3Mge1xuICB0eXBlID0gXCJjb2x1bW5cIjtcbiAgY29sdW1uO1xuICB0YWJsZTtcbiAgLy8gcGhhbnRvbTogYWN0dWFsIHJ1bnRpbWUgdmFsdWUgaXMgdW5kZWZpbmVkXG4gIHRzVmFsdWVUeXBlO1xuICBzcGFjZXRpbWVUeXBlO1xuICBjb25zdHJ1Y3Rvcih0YWJsZTIsIGNvbHVtbiwgc3BhY2V0aW1lVHlwZSkge1xuICAgIHRoaXMudGFibGUgPSB0YWJsZTI7XG4gICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgdGhpcy5zcGFjZXRpbWVUeXBlID0gc3BhY2V0aW1lVHlwZTtcbiAgfVxuICBlcSh4KSB7XG4gICAgcmV0dXJuIG5ldyBCb29sZWFuRXhwcih7XG4gICAgICB0eXBlOiBcImVxXCIsXG4gICAgICBsZWZ0OiB0aGlzLFxuICAgICAgcmlnaHQ6IG5vcm1hbGl6ZVZhbHVlKHgpXG4gICAgfSk7XG4gIH1cbiAgbmUoeCkge1xuICAgIHJldHVybiBuZXcgQm9vbGVhbkV4cHIoe1xuICAgICAgdHlwZTogXCJuZVwiLFxuICAgICAgbGVmdDogdGhpcyxcbiAgICAgIHJpZ2h0OiBub3JtYWxpemVWYWx1ZSh4KVxuICAgIH0pO1xuICB9XG4gIGx0KHgpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xlYW5FeHByKHtcbiAgICAgIHR5cGU6IFwibHRcIixcbiAgICAgIGxlZnQ6IHRoaXMsXG4gICAgICByaWdodDogbm9ybWFsaXplVmFsdWUoeClcbiAgICB9KTtcbiAgfVxuICBsdGUoeCkge1xuICAgIHJldHVybiBuZXcgQm9vbGVhbkV4cHIoe1xuICAgICAgdHlwZTogXCJsdGVcIixcbiAgICAgIGxlZnQ6IHRoaXMsXG4gICAgICByaWdodDogbm9ybWFsaXplVmFsdWUoeClcbiAgICB9KTtcbiAgfVxuICBndCh4KSB7XG4gICAgcmV0dXJuIG5ldyBCb29sZWFuRXhwcih7XG4gICAgICB0eXBlOiBcImd0XCIsXG4gICAgICBsZWZ0OiB0aGlzLFxuICAgICAgcmlnaHQ6IG5vcm1hbGl6ZVZhbHVlKHgpXG4gICAgfSk7XG4gIH1cbiAgZ3RlKHgpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xlYW5FeHByKHtcbiAgICAgIHR5cGU6IFwiZ3RlXCIsXG4gICAgICBsZWZ0OiB0aGlzLFxuICAgICAgcmlnaHQ6IG5vcm1hbGl6ZVZhbHVlKHgpXG4gICAgfSk7XG4gIH1cbn07XG5mdW5jdGlvbiBsaXRlcmFsKHZhbHVlKSB7XG4gIHJldHVybiB7IHR5cGU6IFwibGl0ZXJhbFwiLCB2YWx1ZSB9O1xufVxuZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsKSB7XG4gIGlmICh2YWwudHlwZSA9PT0gXCJsaXRlcmFsXCIpXG4gICAgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIgJiYgdmFsICE9IG51bGwgJiYgXCJ0eXBlXCIgaW4gdmFsICYmIHZhbC50eXBlID09PSBcImNvbHVtblwiKSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuICByZXR1cm4gbGl0ZXJhbCh2YWwpO1xufVxudmFyIEJvb2xlYW5FeHByID0gY2xhc3MgX0Jvb2xlYW5FeHByIHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cbiAgYW5kKG90aGVyKSB7XG4gICAgcmV0dXJuIG5ldyBfQm9vbGVhbkV4cHIoeyB0eXBlOiBcImFuZFwiLCBjbGF1c2VzOiBbdGhpcy5kYXRhLCBvdGhlci5kYXRhXSB9KTtcbiAgfVxuICBvcihvdGhlcikge1xuICAgIHJldHVybiBuZXcgX0Jvb2xlYW5FeHByKHsgdHlwZTogXCJvclwiLCBjbGF1c2VzOiBbdGhpcy5kYXRhLCBvdGhlci5kYXRhXSB9KTtcbiAgfVxuICBub3QoKSB7XG4gICAgcmV0dXJuIG5ldyBfQm9vbGVhbkV4cHIoeyB0eXBlOiBcIm5vdFwiLCBjbGF1c2U6IHRoaXMuZGF0YSB9KTtcbiAgfVxufTtcbmZ1bmN0aW9uIG5vdChjbGF1c2UpIHtcbiAgcmV0dXJuIG5ldyBCb29sZWFuRXhwcih7IHR5cGU6IFwibm90XCIsIGNsYXVzZTogY2xhdXNlLmRhdGEgfSk7XG59XG5mdW5jdGlvbiBhbmQoLi4uY2xhdXNlcykge1xuICByZXR1cm4gbmV3IEJvb2xlYW5FeHByKHtcbiAgICB0eXBlOiBcImFuZFwiLFxuICAgIGNsYXVzZXM6IGNsYXVzZXMubWFwKChjKSA9PiBjLmRhdGEpXG4gIH0pO1xufVxuZnVuY3Rpb24gb3IoLi4uY2xhdXNlcykge1xuICByZXR1cm4gbmV3IEJvb2xlYW5FeHByKHtcbiAgICB0eXBlOiBcIm9yXCIsXG4gICAgY2xhdXNlczogY2xhdXNlcy5tYXAoKGMpID0+IGMuZGF0YSlcbiAgfSk7XG59XG5mdW5jdGlvbiBib29sZWFuRXhwclRvU3FsKGV4cHIsIHRhYmxlQWxpYXMpIHtcbiAgY29uc3QgZGF0YSA9IGV4cHIgaW5zdGFuY2VvZiBCb29sZWFuRXhwciA/IGV4cHIuZGF0YSA6IGV4cHI7XG4gIHN3aXRjaCAoZGF0YS50eXBlKSB7XG4gICAgY2FzZSBcImVxXCI6XG4gICAgICByZXR1cm4gYCR7dmFsdWVFeHByVG9TcWwoZGF0YS5sZWZ0KX0gPSAke3ZhbHVlRXhwclRvU3FsKGRhdGEucmlnaHQpfWA7XG4gICAgY2FzZSBcIm5lXCI6XG4gICAgICByZXR1cm4gYCR7dmFsdWVFeHByVG9TcWwoZGF0YS5sZWZ0KX0gPD4gJHt2YWx1ZUV4cHJUb1NxbChkYXRhLnJpZ2h0KX1gO1xuICAgIGNhc2UgXCJndFwiOlxuICAgICAgcmV0dXJuIGAke3ZhbHVlRXhwclRvU3FsKGRhdGEubGVmdCl9ID4gJHt2YWx1ZUV4cHJUb1NxbChkYXRhLnJpZ2h0KX1gO1xuICAgIGNhc2UgXCJndGVcIjpcbiAgICAgIHJldHVybiBgJHt2YWx1ZUV4cHJUb1NxbChkYXRhLmxlZnQpfSA+PSAke3ZhbHVlRXhwclRvU3FsKGRhdGEucmlnaHQpfWA7XG4gICAgY2FzZSBcImx0XCI6XG4gICAgICByZXR1cm4gYCR7dmFsdWVFeHByVG9TcWwoZGF0YS5sZWZ0KX0gPCAke3ZhbHVlRXhwclRvU3FsKGRhdGEucmlnaHQpfWA7XG4gICAgY2FzZSBcImx0ZVwiOlxuICAgICAgcmV0dXJuIGAke3ZhbHVlRXhwclRvU3FsKGRhdGEubGVmdCl9IDw9ICR7dmFsdWVFeHByVG9TcWwoZGF0YS5yaWdodCl9YDtcbiAgICBjYXNlIFwiYW5kXCI6XG4gICAgICByZXR1cm4gZGF0YS5jbGF1c2VzLm1hcCgoYykgPT4gYm9vbGVhbkV4cHJUb1NxbChjKSkubWFwKHdyYXBJblBhcmVucykuam9pbihcIiBBTkQgXCIpO1xuICAgIGNhc2UgXCJvclwiOlxuICAgICAgcmV0dXJuIGRhdGEuY2xhdXNlcy5tYXAoKGMpID0+IGJvb2xlYW5FeHByVG9TcWwoYykpLm1hcCh3cmFwSW5QYXJlbnMpLmpvaW4oXCIgT1IgXCIpO1xuICAgIGNhc2UgXCJub3RcIjpcbiAgICAgIHJldHVybiBgTk9UICR7d3JhcEluUGFyZW5zKGJvb2xlYW5FeHByVG9TcWwoZGF0YS5jbGF1c2UpKX1gO1xuICB9XG59XG5mdW5jdGlvbiB3cmFwSW5QYXJlbnMoc3FsKSB7XG4gIHJldHVybiBgKCR7c3FsfSlgO1xufVxuZnVuY3Rpb24gdmFsdWVFeHByVG9TcWwoZXhwciwgdGFibGVBbGlhcykge1xuICBpZiAoaXNMaXRlcmFsRXhwcihleHByKSkge1xuICAgIHJldHVybiBsaXRlcmFsVmFsdWVUb1NxbChleHByLnZhbHVlKTtcbiAgfVxuICBjb25zdCB0YWJsZTIgPSBleHByLnRhYmxlO1xuICByZXR1cm4gYCR7cXVvdGVJZGVudGlmaWVyKHRhYmxlMil9LiR7cXVvdGVJZGVudGlmaWVyKGV4cHIuY29sdW1uKX1gO1xufVxuZnVuY3Rpb24gbGl0ZXJhbFZhbHVlVG9TcWwodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB2b2lkIDApIHtcbiAgICByZXR1cm4gXCJOVUxMXCI7XG4gIH1cbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSWRlbnRpdHkgfHwgdmFsdWUgaW5zdGFuY2VvZiBDb25uZWN0aW9uSWQpIHtcbiAgICByZXR1cm4gYDB4JHt2YWx1ZS50b0hleFN0cmluZygpfWA7XG4gIH1cbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGltZXN0YW1wKSB7XG4gICAgcmV0dXJuIGAnJHt2YWx1ZS50b0lTT1N0cmluZygpfSdgO1xuICB9XG4gIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgY2FzZSBcIm51bWJlclwiOlxuICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICByZXR1cm4gdmFsdWUgPyBcIlRSVUVcIiA6IFwiRkFMU0VcIjtcbiAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICByZXR1cm4gYCcke3ZhbHVlLnJlcGxhY2UoLycvZywgXCInJ1wiKX0nYDtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGAnJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSkucmVwbGFjZSgvJy9nLCBcIicnXCIpfSdgO1xuICB9XG59XG5mdW5jdGlvbiBxdW90ZUlkZW50aWZpZXIobmFtZSkge1xuICByZXR1cm4gYFwiJHtuYW1lLnJlcGxhY2UoL1wiL2csICdcIlwiJyl9XCJgO1xufVxuZnVuY3Rpb24gaXNMaXRlcmFsRXhwcihleHByKSB7XG4gIHJldHVybiBleHByLnR5cGUgPT09IFwibGl0ZXJhbFwiO1xufVxuZnVuY3Rpb24gZXZhbHVhdGVCb29sZWFuRXhwcihleHByLCByb3cpIHtcbiAgcmV0dXJuIGV2YWx1YXRlRGF0YShleHByLmRhdGEsIHJvdyk7XG59XG5mdW5jdGlvbiBldmFsdWF0ZURhdGEoZGF0YSwgcm93KSB7XG4gIHN3aXRjaCAoZGF0YS50eXBlKSB7XG4gICAgY2FzZSBcImVxXCI6XG4gICAgICByZXR1cm4gcmVzb2x2ZVZhbHVlKGRhdGEubGVmdCwgcm93KSA9PT0gcmVzb2x2ZVZhbHVlKGRhdGEucmlnaHQsIHJvdyk7XG4gICAgY2FzZSBcIm5lXCI6XG4gICAgICByZXR1cm4gcmVzb2x2ZVZhbHVlKGRhdGEubGVmdCwgcm93KSAhPT0gcmVzb2x2ZVZhbHVlKGRhdGEucmlnaHQsIHJvdyk7XG4gICAgY2FzZSBcImd0XCI6XG4gICAgICByZXR1cm4gcmVzb2x2ZVZhbHVlKGRhdGEubGVmdCwgcm93KSA+IHJlc29sdmVWYWx1ZShkYXRhLnJpZ2h0LCByb3cpO1xuICAgIGNhc2UgXCJndGVcIjpcbiAgICAgIHJldHVybiByZXNvbHZlVmFsdWUoZGF0YS5sZWZ0LCByb3cpID49IHJlc29sdmVWYWx1ZShkYXRhLnJpZ2h0LCByb3cpO1xuICAgIGNhc2UgXCJsdFwiOlxuICAgICAgcmV0dXJuIHJlc29sdmVWYWx1ZShkYXRhLmxlZnQsIHJvdykgPCByZXNvbHZlVmFsdWUoZGF0YS5yaWdodCwgcm93KTtcbiAgICBjYXNlIFwibHRlXCI6XG4gICAgICByZXR1cm4gcmVzb2x2ZVZhbHVlKGRhdGEubGVmdCwgcm93KSA8PSByZXNvbHZlVmFsdWUoZGF0YS5yaWdodCwgcm93KTtcbiAgICBjYXNlIFwiYW5kXCI6XG4gICAgICByZXR1cm4gZGF0YS5jbGF1c2VzLmV2ZXJ5KChjKSA9PiBldmFsdWF0ZURhdGEoYywgcm93KSk7XG4gICAgY2FzZSBcIm9yXCI6XG4gICAgICByZXR1cm4gZGF0YS5jbGF1c2VzLnNvbWUoKGMpID0+IGV2YWx1YXRlRGF0YShjLCByb3cpKTtcbiAgICBjYXNlIFwibm90XCI6XG4gICAgICByZXR1cm4gIWV2YWx1YXRlRGF0YShkYXRhLmNsYXVzZSwgcm93KTtcbiAgfVxufVxuZnVuY3Rpb24gcmVzb2x2ZVZhbHVlKGV4cHIsIHJvdykge1xuICBpZiAoaXNMaXRlcmFsRXhwcihleHByKSkge1xuICAgIHJldHVybiB0b0NvbXBhcmFibGVWYWx1ZShleHByLnZhbHVlKTtcbiAgfVxuICByZXR1cm4gdG9Db21wYXJhYmxlVmFsdWUocm93W2V4cHIuY29sdW1uXSk7XG59XG5mdW5jdGlvbiBpc0hleFNlcmlhbGl6YWJsZUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZS50b0hleFN0cmluZyA9PT0gXCJmdW5jdGlvblwiO1xufVxuZnVuY3Rpb24gaXNUaW1lc3RhbXBMaWtlKHZhbHVlKSB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gZmFsc2U7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFRpbWVzdGFtcCkgcmV0dXJuIHRydWU7XG4gIGNvbnN0IG1pY3JvcyA9IHZhbHVlW1wiX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfX1wiXTtcbiAgcmV0dXJuIHR5cGVvZiBtaWNyb3MgPT09IFwiYmlnaW50XCI7XG59XG5mdW5jdGlvbiB0b0NvbXBhcmFibGVWYWx1ZSh2YWx1ZSkge1xuICBpZiAoaXNIZXhTZXJpYWxpemFibGVMaWtlKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS50b0hleFN0cmluZygpO1xuICB9XG4gIGlmIChpc1RpbWVzdGFtcExpa2UodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLl9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX187XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gZ2V0UXVlcnlUYWJsZU5hbWUocXVlcnkpIHtcbiAgaWYgKHF1ZXJ5LnRhYmxlKSByZXR1cm4gcXVlcnkudGFibGUubmFtZTtcbiAgaWYgKHF1ZXJ5Lm5hbWUpIHJldHVybiBxdWVyeS5uYW1lO1xuICBpZiAocXVlcnkuc291cmNlUXVlcnkpIHJldHVybiBxdWVyeS5zb3VyY2VRdWVyeS50YWJsZS5uYW1lO1xuICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZXh0cmFjdCB0YWJsZSBuYW1lIGZyb20gcXVlcnlcIik7XG59XG5mdW5jdGlvbiBnZXRRdWVyeUFjY2Vzc29yTmFtZShxdWVyeSkge1xuICBpZiAocXVlcnkudGFibGUpIHJldHVybiBxdWVyeS50YWJsZS5hY2Nlc3Nvck5hbWU7XG4gIGlmIChxdWVyeS5hY2Nlc3Nvck5hbWUpIHJldHVybiBxdWVyeS5hY2Nlc3Nvck5hbWU7XG4gIGlmIChxdWVyeS5zb3VyY2VRdWVyeSkgcmV0dXJuIHF1ZXJ5LnNvdXJjZVF1ZXJ5LnRhYmxlLmFjY2Vzc29yTmFtZTtcbiAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGV4dHJhY3QgYWNjZXNzb3IgbmFtZSBmcm9tIHF1ZXJ5XCIpO1xufVxuZnVuY3Rpb24gZ2V0UXVlcnlXaGVyZUNsYXVzZShxdWVyeSkge1xuICBpZiAocXVlcnkud2hlcmVDbGF1c2UpIHJldHVybiBxdWVyeS53aGVyZUNsYXVzZTtcbiAgcmV0dXJuIHZvaWQgMDtcbn1cblxuLy8gc3JjL3NlcnZlci92aWV3cy50c1xuZnVuY3Rpb24gbWFrZVZpZXdFeHBvcnQoY3R4LCBvcHRzLCBwYXJhbXMsIHJldCwgZm4pIHtcbiAgY29uc3Qgdmlld0V4cG9ydCA9IChcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHR5cGVzY3JpcHQgaW5jb3JyZWN0bHkgc2F5cyBGdW5jdGlvbiNiaW5kIHJlcXVpcmVzIGFuIGFyZ3VtZW50LlxuICAgIGZuLmJpbmQoKVxuICApO1xuICB2aWV3RXhwb3J0W2V4cG9ydENvbnRleHRdID0gY3R4O1xuICB2aWV3RXhwb3J0W3JlZ2lzdGVyRXhwb3J0XSA9IChjdHgyLCBleHBvcnROYW1lKSA9PiB7XG4gICAgcmVnaXN0ZXJWaWV3KGN0eDIsIG9wdHMsIGV4cG9ydE5hbWUsIGZhbHNlLCBwYXJhbXMsIHJldCwgZm4pO1xuICB9O1xuICByZXR1cm4gdmlld0V4cG9ydDtcbn1cbmZ1bmN0aW9uIG1ha2VBbm9uVmlld0V4cG9ydChjdHgsIG9wdHMsIHBhcmFtcywgcmV0LCBmbikge1xuICBjb25zdCB2aWV3RXhwb3J0ID0gKFxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgdHlwZXNjcmlwdCBpbmNvcnJlY3RseSBzYXlzIEZ1bmN0aW9uI2JpbmQgcmVxdWlyZXMgYW4gYXJndW1lbnQuXG4gICAgZm4uYmluZCgpXG4gICk7XG4gIHZpZXdFeHBvcnRbZXhwb3J0Q29udGV4dF0gPSBjdHg7XG4gIHZpZXdFeHBvcnRbcmVnaXN0ZXJFeHBvcnRdID0gKGN0eDIsIGV4cG9ydE5hbWUpID0+IHtcbiAgICByZWdpc3RlclZpZXcoY3R4Miwgb3B0cywgZXhwb3J0TmFtZSwgdHJ1ZSwgcGFyYW1zLCByZXQsIGZuKTtcbiAgfTtcbiAgcmV0dXJuIHZpZXdFeHBvcnQ7XG59XG5mdW5jdGlvbiByZWdpc3RlclZpZXcoY3R4LCBvcHRzLCBleHBvcnROYW1lLCBhbm9uLCBwYXJhbXMsIHJldCwgZm4pIHtcbiAgY29uc3QgcGFyYW1zQnVpbGRlciA9IG5ldyBSb3dCdWlsZGVyKHBhcmFtcywgdG9QYXNjYWxDYXNlKGV4cG9ydE5hbWUpKTtcbiAgbGV0IHJldHVyblR5cGUgPSBjdHgucmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHJldCkuYWxnZWJyYWljVHlwZTtcbiAgY29uc3QgeyB0eXBlc3BhY2UgfSA9IGN0eDtcbiAgY29uc3QgeyB2YWx1ZTogcGFyYW1UeXBlIH0gPSBjdHgucmVzb2x2ZVR5cGUoXG4gICAgY3R4LnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseShwYXJhbXNCdWlsZGVyKVxuICApO1xuICBjdHgubW9kdWxlRGVmLnZpZXdzLnB1c2goe1xuICAgIHNvdXJjZU5hbWU6IGV4cG9ydE5hbWUsXG4gICAgaW5kZXg6IChhbm9uID8gY3R4LmFub25WaWV3cyA6IGN0eC52aWV3cykubGVuZ3RoLFxuICAgIGlzUHVibGljOiBvcHRzLnB1YmxpYyxcbiAgICBpc0Fub255bW91czogYW5vbixcbiAgICBwYXJhbXM6IHBhcmFtVHlwZSxcbiAgICByZXR1cm5UeXBlXG4gIH0pO1xuICBpZiAob3B0cy5uYW1lICE9IG51bGwpIHtcbiAgICBjdHgubW9kdWxlRGVmLmV4cGxpY2l0TmFtZXMuZW50cmllcy5wdXNoKHtcbiAgICAgIHRhZzogXCJGdW5jdGlvblwiLFxuICAgICAgdmFsdWU6IHtcbiAgICAgICAgc291cmNlTmFtZTogZXhwb3J0TmFtZSxcbiAgICAgICAgY2Fub25pY2FsTmFtZTogb3B0cy5uYW1lXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgaWYgKHJldHVyblR5cGUudGFnID09IFwiU3VtXCIpIHtcbiAgICBjb25zdCBvcmlnaW5hbEZuID0gZm47XG4gICAgZm4gPSAoKGN0eDIsIGFyZ3MpID0+IHtcbiAgICAgIGNvbnN0IHJldDIgPSBvcmlnaW5hbEZuKGN0eDIsIGFyZ3MpO1xuICAgICAgcmV0dXJuIHJldDIgPT0gbnVsbCA/IFtdIDogW3JldDJdO1xuICAgIH0pO1xuICAgIHJldHVyblR5cGUgPSBBbGdlYnJhaWNUeXBlLkFycmF5KFxuICAgICAgcmV0dXJuVHlwZS52YWx1ZS52YXJpYW50c1swXS5hbGdlYnJhaWNUeXBlXG4gICAgKTtcbiAgfVxuICAoYW5vbiA/IGN0eC5hbm9uVmlld3MgOiBjdHgudmlld3MpLnB1c2goe1xuICAgIGZuLFxuICAgIGRlc2VyaWFsaXplUGFyYW1zOiBQcm9kdWN0VHlwZS5tYWtlRGVzZXJpYWxpemVyKHBhcmFtVHlwZSwgdHlwZXNwYWNlKSxcbiAgICBzZXJpYWxpemVSZXR1cm46IEFsZ2VicmFpY1R5cGUubWFrZVNlcmlhbGl6ZXIocmV0dXJuVHlwZSwgdHlwZXNwYWNlKSxcbiAgICByZXR1cm5UeXBlQmFzZVNpemU6IGJzYXRuQmFzZVNpemUodHlwZXNwYWNlLCByZXR1cm5UeXBlKVxuICB9KTtcbn1cblxuLy8gc3JjL2xpYi9lcnJvcnMudHNcbnZhciBTZW5kZXJFcnJvciA9IGNsYXNzIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gIH1cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIFwiU2VuZGVyRXJyb3JcIjtcbiAgfVxufTtcblxuLy8gc3JjL3NlcnZlci9lcnJvcnMudHNcbnZhciBTcGFjZXRpbWVIb3N0RXJyb3IgPSBjbGFzcyBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICB9XG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiBcIlNwYWNldGltZUhvc3RFcnJvclwiO1xuICB9XG59O1xudmFyIGVycm9yRGF0YSA9IHtcbiAgLyoqXG4gICAqIEEgZ2VuZXJpYyBlcnJvciBjbGFzcyBmb3IgdW5rbm93biBlcnJvciBjb2Rlcy5cbiAgICovXG4gIEhvc3RDYWxsRmFpbHVyZTogMSxcbiAgLyoqXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCBhbiBBQkkgY2FsbCB3YXMgbWFkZSBvdXRzaWRlIG9mIGEgdHJhbnNhY3Rpb24uXG4gICAqL1xuICBOb3RJblRyYW5zYWN0aW9uOiAyLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IEJTQVROIGRlY29kaW5nIGZhaWxlZC5cbiAgICogVGhpcyB0eXBpY2FsbHkgbWVhbnMgdGhhdCB0aGUgZGF0YSBjb3VsZCBub3QgYmUgZGVjb2RlZCB0byB0aGUgZXhwZWN0ZWQgdHlwZS5cbiAgICovXG4gIEJzYXRuRGVjb2RlRXJyb3I6IDMsXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYSBzcGVjaWZpZWQgdGFibGUgZG9lcyBub3QgZXhpc3QuXG4gICAqL1xuICBOb1N1Y2hUYWJsZTogNCxcbiAgLyoqXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCBhIHNwZWNpZmllZCBpbmRleCBkb2VzIG5vdCBleGlzdC5cbiAgICovXG4gIE5vU3VjaEluZGV4OiA1LFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGEgc3BlY2lmaWVkIHJvdyBpdGVyYXRvciBpcyBub3QgdmFsaWQuXG4gICAqL1xuICBOb1N1Y2hJdGVyOiA2LFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGEgc3BlY2lmaWVkIGNvbnNvbGUgdGltZXIgZG9lcyBub3QgZXhpc3QuXG4gICAqL1xuICBOb1N1Y2hDb25zb2xlVGltZXI6IDcsXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYSBzcGVjaWZpZWQgYnl0ZXMgc291cmNlIG9yIHNpbmsgaXMgbm90IHZhbGlkLlxuICAgKi9cbiAgTm9TdWNoQnl0ZXM6IDgsXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYSBwcm92aWRlZCBzaW5rIGhhcyBubyBtb3JlIHNwYWNlIGxlZnQuXG4gICAqL1xuICBOb1NwYWNlOiA5LFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IHRoZXJlIGlzIG5vIG1vcmUgc3BhY2UgaW4gdGhlIGRhdGFiYXNlLlxuICAgKi9cbiAgQnVmZmVyVG9vU21hbGw6IDExLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGEgdmFsdWUgd2l0aCBhIGdpdmVuIHVuaXF1ZSBpZGVudGlmaWVyIGFscmVhZHkgZXhpc3RzLlxuICAgKi9cbiAgVW5pcXVlQWxyZWFkeUV4aXN0czogMTIsXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgdGhlIHNwZWNpZmllZCBkZWxheSBpbiBzY2hlZHVsaW5nIGEgcm93IHdhcyB0b28gbG9uZy5cbiAgICovXG4gIFNjaGVkdWxlQXREZWxheVRvb0xvbmc6IDEzLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGFuIGluZGV4IHdhcyBub3QgdW5pcXVlIHdoZW4gaXQgd2FzIGV4cGVjdGVkIHRvIGJlLlxuICAgKi9cbiAgSW5kZXhOb3RVbmlxdWU6IDE0LFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGFuIGluZGV4IHdhcyBub3QgdW5pcXVlIHdoZW4gaXQgd2FzIGV4cGVjdGVkIHRvIGJlLlxuICAgKi9cbiAgTm9TdWNoUm93OiAxNSxcbiAgLyoqXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCBhbiBhdXRvLWluY3JlbWVudCBzZXF1ZW5jZSBoYXMgb3ZlcmZsb3dlZC5cbiAgICovXG4gIEF1dG9JbmNPdmVyZmxvdzogMTYsXG4gIFdvdWxkQmxvY2tUcmFuc2FjdGlvbjogMTcsXG4gIFRyYW5zYWN0aW9uTm90QW5vbnltb3VzOiAxOCxcbiAgVHJhbnNhY3Rpb25Jc1JlYWRPbmx5OiAxOSxcbiAgVHJhbnNhY3Rpb25Jc011dDogMjAsXG4gIEh0dHBFcnJvcjogMjFcbn07XG5mdW5jdGlvbiBtYXBFbnRyaWVzKHgsIGYpIHtcbiAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhcbiAgICBPYmplY3QuZW50cmllcyh4KS5tYXAoKFtrLCB2XSkgPT4gW2ssIGYoaywgdildKVxuICApO1xufVxudmFyIGVycm5vVG9DbGFzcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG52YXIgZXJyb3JzID0gT2JqZWN0LmZyZWV6ZShcbiAgbWFwRW50cmllcyhlcnJvckRhdGEsIChuYW1lLCBjb2RlKSA9PiB7XG4gICAgY29uc3QgY2xzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAgICAgY2xhc3MgZXh0ZW5kcyBTcGFjZXRpbWVIb3N0RXJyb3Ige1xuICAgICAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwibmFtZVwiLFxuICAgICAgeyB2YWx1ZTogbmFtZSwgd3JpdGFibGU6IGZhbHNlIH1cbiAgICApO1xuICAgIGVycm5vVG9DbGFzcy5zZXQoY29kZSwgY2xzKTtcbiAgICByZXR1cm4gY2xzO1xuICB9KVxuKTtcbmZ1bmN0aW9uIGdldEVycm9yQ29uc3RydWN0b3IoY29kZSkge1xuICByZXR1cm4gZXJybm9Ub0NsYXNzLmdldChjb2RlKSA/PyBTcGFjZXRpbWVIb3N0RXJyb3I7XG59XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9wdXJlLXJhbmRANy4wLjEvbm9kZV9tb2R1bGVzL3B1cmUtcmFuZC9saWIvZXNtL2Rpc3RyaWJ1dGlvbi9VbnNhZmVVbmlmb3JtQmlnSW50RGlzdHJpYnV0aW9uLmpzXG52YXIgU0JpZ0ludCA9IHR5cGVvZiBCaWdJbnQgIT09IFwidW5kZWZpbmVkXCIgPyBCaWdJbnQgOiB2b2lkIDA7XG52YXIgT25lID0gdHlwZW9mIEJpZ0ludCAhPT0gXCJ1bmRlZmluZWRcIiA/IEJpZ0ludCgxKSA6IHZvaWQgMDtcbnZhciBUaGlydHlUd28gPSB0eXBlb2YgQmlnSW50ICE9PSBcInVuZGVmaW5lZFwiID8gQmlnSW50KDMyKSA6IHZvaWQgMDtcbnZhciBOdW1WYWx1ZXMgPSB0eXBlb2YgQmlnSW50ICE9PSBcInVuZGVmaW5lZFwiID8gQmlnSW50KDQyOTQ5NjcyOTYpIDogdm9pZCAwO1xuZnVuY3Rpb24gdW5zYWZlVW5pZm9ybUJpZ0ludERpc3RyaWJ1dGlvbihmcm9tLCB0bywgcm5nKSB7XG4gIHZhciBkaWZmID0gdG8gLSBmcm9tICsgT25lO1xuICB2YXIgRmluYWxOdW1WYWx1ZXMgPSBOdW1WYWx1ZXM7XG4gIHZhciBOdW1JdGVyYXRpb25zID0gMTtcbiAgd2hpbGUgKEZpbmFsTnVtVmFsdWVzIDwgZGlmZikge1xuICAgIEZpbmFsTnVtVmFsdWVzIDw8PSBUaGlydHlUd287XG4gICAgKytOdW1JdGVyYXRpb25zO1xuICB9XG4gIHZhciB2YWx1ZSA9IGdlbmVyYXRlTmV4dChOdW1JdGVyYXRpb25zLCBybmcpO1xuICBpZiAodmFsdWUgPCBkaWZmKSB7XG4gICAgcmV0dXJuIHZhbHVlICsgZnJvbTtcbiAgfVxuICBpZiAodmFsdWUgKyBkaWZmIDwgRmluYWxOdW1WYWx1ZXMpIHtcbiAgICByZXR1cm4gdmFsdWUgJSBkaWZmICsgZnJvbTtcbiAgfVxuICB2YXIgTWF4QWNjZXB0ZWRSYW5kb20gPSBGaW5hbE51bVZhbHVlcyAtIEZpbmFsTnVtVmFsdWVzICUgZGlmZjtcbiAgd2hpbGUgKHZhbHVlID49IE1heEFjY2VwdGVkUmFuZG9tKSB7XG4gICAgdmFsdWUgPSBnZW5lcmF0ZU5leHQoTnVtSXRlcmF0aW9ucywgcm5nKTtcbiAgfVxuICByZXR1cm4gdmFsdWUgJSBkaWZmICsgZnJvbTtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlTmV4dChOdW1JdGVyYXRpb25zLCBybmcpIHtcbiAgdmFyIHZhbHVlID0gU0JpZ0ludChybmcudW5zYWZlTmV4dCgpICsgMjE0NzQ4MzY0OCk7XG4gIGZvciAodmFyIG51bSA9IDE7IG51bSA8IE51bUl0ZXJhdGlvbnM7ICsrbnVtKSB7XG4gICAgdmFyIG91dCA9IHJuZy51bnNhZmVOZXh0KCk7XG4gICAgdmFsdWUgPSAodmFsdWUgPDwgVGhpcnR5VHdvKSArIFNCaWdJbnQob3V0ICsgMjE0NzQ4MzY0OCk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcHVyZS1yYW5kQDcuMC4xL25vZGVfbW9kdWxlcy9wdXJlLXJhbmQvbGliL2VzbS9kaXN0cmlidXRpb24vaW50ZXJuYWxzL1Vuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb25JbnRlcm5hbC5qc1xuZnVuY3Rpb24gdW5zYWZlVW5pZm9ybUludERpc3RyaWJ1dGlvbkludGVybmFsKHJhbmdlU2l6ZSwgcm5nKSB7XG4gIHZhciBNYXhBbGxvd2VkID0gcmFuZ2VTaXplID4gMiA/IH5+KDQyOTQ5NjcyOTYgLyByYW5nZVNpemUpICogcmFuZ2VTaXplIDogNDI5NDk2NzI5NjtcbiAgdmFyIGRlbHRhViA9IHJuZy51bnNhZmVOZXh0KCkgKyAyMTQ3NDgzNjQ4O1xuICB3aGlsZSAoZGVsdGFWID49IE1heEFsbG93ZWQpIHtcbiAgICBkZWx0YVYgPSBybmcudW5zYWZlTmV4dCgpICsgMjE0NzQ4MzY0ODtcbiAgfVxuICByZXR1cm4gZGVsdGFWICUgcmFuZ2VTaXplO1xufVxuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcHVyZS1yYW5kQDcuMC4xL25vZGVfbW9kdWxlcy9wdXJlLXJhbmQvbGliL2VzbS9kaXN0cmlidXRpb24vaW50ZXJuYWxzL0FycmF5SW50NjQuanNcbmZ1bmN0aW9uIGZyb21OdW1iZXJUb0FycmF5SW50NjQob3V0LCBuKSB7XG4gIGlmIChuIDwgMCkge1xuICAgIHZhciBwb3NOID0gLW47XG4gICAgb3V0LnNpZ24gPSAtMTtcbiAgICBvdXQuZGF0YVswXSA9IH5+KHBvc04gLyA0Mjk0OTY3Mjk2KTtcbiAgICBvdXQuZGF0YVsxXSA9IHBvc04gPj4+IDA7XG4gIH0gZWxzZSB7XG4gICAgb3V0LnNpZ24gPSAxO1xuICAgIG91dC5kYXRhWzBdID0gfn4obiAvIDQyOTQ5NjcyOTYpO1xuICAgIG91dC5kYXRhWzFdID0gbiA+Pj4gMDtcbiAgfVxuICByZXR1cm4gb3V0O1xufVxuZnVuY3Rpb24gc3Vic3RyYWN0QXJyYXlJbnQ2NChvdXQsIGFycmF5SW50QSwgYXJyYXlJbnRCKSB7XG4gIHZhciBsb3dBID0gYXJyYXlJbnRBLmRhdGFbMV07XG4gIHZhciBoaWdoQSA9IGFycmF5SW50QS5kYXRhWzBdO1xuICB2YXIgc2lnbkEgPSBhcnJheUludEEuc2lnbjtcbiAgdmFyIGxvd0IgPSBhcnJheUludEIuZGF0YVsxXTtcbiAgdmFyIGhpZ2hCID0gYXJyYXlJbnRCLmRhdGFbMF07XG4gIHZhciBzaWduQiA9IGFycmF5SW50Qi5zaWduO1xuICBvdXQuc2lnbiA9IDE7XG4gIGlmIChzaWduQSA9PT0gMSAmJiBzaWduQiA9PT0gLTEpIHtcbiAgICB2YXIgbG93XzEgPSBsb3dBICsgbG93QjtcbiAgICB2YXIgaGlnaCA9IGhpZ2hBICsgaGlnaEIgKyAobG93XzEgPiA0Mjk0OTY3Mjk1ID8gMSA6IDApO1xuICAgIG91dC5kYXRhWzBdID0gaGlnaCA+Pj4gMDtcbiAgICBvdXQuZGF0YVsxXSA9IGxvd18xID4+PiAwO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgdmFyIGxvd0ZpcnN0ID0gbG93QTtcbiAgdmFyIGhpZ2hGaXJzdCA9IGhpZ2hBO1xuICB2YXIgbG93U2Vjb25kID0gbG93QjtcbiAgdmFyIGhpZ2hTZWNvbmQgPSBoaWdoQjtcbiAgaWYgKHNpZ25BID09PSAtMSkge1xuICAgIGxvd0ZpcnN0ID0gbG93QjtcbiAgICBoaWdoRmlyc3QgPSBoaWdoQjtcbiAgICBsb3dTZWNvbmQgPSBsb3dBO1xuICAgIGhpZ2hTZWNvbmQgPSBoaWdoQTtcbiAgfVxuICB2YXIgcmVtaW5kZXJMb3cgPSAwO1xuICB2YXIgbG93ID0gbG93Rmlyc3QgLSBsb3dTZWNvbmQ7XG4gIGlmIChsb3cgPCAwKSB7XG4gICAgcmVtaW5kZXJMb3cgPSAxO1xuICAgIGxvdyA9IGxvdyA+Pj4gMDtcbiAgfVxuICBvdXQuZGF0YVswXSA9IGhpZ2hGaXJzdCAtIGhpZ2hTZWNvbmQgLSByZW1pbmRlckxvdztcbiAgb3V0LmRhdGFbMV0gPSBsb3c7XG4gIHJldHVybiBvdXQ7XG59XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9wdXJlLXJhbmRANy4wLjEvbm9kZV9tb2R1bGVzL3B1cmUtcmFuZC9saWIvZXNtL2Rpc3RyaWJ1dGlvbi9pbnRlcm5hbHMvVW5zYWZlVW5pZm9ybUFycmF5SW50RGlzdHJpYnV0aW9uSW50ZXJuYWwuanNcbmZ1bmN0aW9uIHVuc2FmZVVuaWZvcm1BcnJheUludERpc3RyaWJ1dGlvbkludGVybmFsKG91dCwgcmFuZ2VTaXplLCBybmcpIHtcbiAgdmFyIHJhbmdlTGVuZ3RoID0gcmFuZ2VTaXplLmxlbmd0aDtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4ICE9PSByYW5nZUxlbmd0aDsgKytpbmRleCkge1xuICAgICAgdmFyIGluZGV4UmFuZ2VTaXplID0gaW5kZXggPT09IDAgPyByYW5nZVNpemVbMF0gKyAxIDogNDI5NDk2NzI5NjtcbiAgICAgIHZhciBnID0gdW5zYWZlVW5pZm9ybUludERpc3RyaWJ1dGlvbkludGVybmFsKGluZGV4UmFuZ2VTaXplLCBybmcpO1xuICAgICAgb3V0W2luZGV4XSA9IGc7XG4gICAgfVxuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggIT09IHJhbmdlTGVuZ3RoOyArK2luZGV4KSB7XG4gICAgICB2YXIgY3VycmVudCA9IG91dFtpbmRleF07XG4gICAgICB2YXIgY3VycmVudEluUmFuZ2UgPSByYW5nZVNpemVbaW5kZXhdO1xuICAgICAgaWYgKGN1cnJlbnQgPCBjdXJyZW50SW5SYW5nZSkge1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50ID4gY3VycmVudEluUmFuZ2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9wdXJlLXJhbmRANy4wLjEvbm9kZV9tb2R1bGVzL3B1cmUtcmFuZC9saWIvZXNtL2Rpc3RyaWJ1dGlvbi9VbnNhZmVVbmlmb3JtSW50RGlzdHJpYnV0aW9uLmpzXG52YXIgc2FmZU51bWJlck1heFNhZmVJbnRlZ2VyID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG52YXIgc2hhcmVkQSA9IHsgc2lnbjogMSwgZGF0YTogWzAsIDBdIH07XG52YXIgc2hhcmVkQiA9IHsgc2lnbjogMSwgZGF0YTogWzAsIDBdIH07XG52YXIgc2hhcmVkQyA9IHsgc2lnbjogMSwgZGF0YTogWzAsIDBdIH07XG52YXIgc2hhcmVkRGF0YSA9IFswLCAwXTtcbmZ1bmN0aW9uIHVuaWZvcm1MYXJnZUludEludGVybmFsKGZyb20sIHRvLCByYW5nZVNpemUsIHJuZykge1xuICB2YXIgcmFuZ2VTaXplQXJyYXlJbnRWYWx1ZSA9IHJhbmdlU2l6ZSA8PSBzYWZlTnVtYmVyTWF4U2FmZUludGVnZXIgPyBmcm9tTnVtYmVyVG9BcnJheUludDY0KHNoYXJlZEMsIHJhbmdlU2l6ZSkgOiBzdWJzdHJhY3RBcnJheUludDY0KHNoYXJlZEMsIGZyb21OdW1iZXJUb0FycmF5SW50NjQoc2hhcmVkQSwgdG8pLCBmcm9tTnVtYmVyVG9BcnJheUludDY0KHNoYXJlZEIsIGZyb20pKTtcbiAgaWYgKHJhbmdlU2l6ZUFycmF5SW50VmFsdWUuZGF0YVsxXSA9PT0gNDI5NDk2NzI5NSkge1xuICAgIHJhbmdlU2l6ZUFycmF5SW50VmFsdWUuZGF0YVswXSArPSAxO1xuICAgIHJhbmdlU2l6ZUFycmF5SW50VmFsdWUuZGF0YVsxXSA9IDA7XG4gIH0gZWxzZSB7XG4gICAgcmFuZ2VTaXplQXJyYXlJbnRWYWx1ZS5kYXRhWzFdICs9IDE7XG4gIH1cbiAgdW5zYWZlVW5pZm9ybUFycmF5SW50RGlzdHJpYnV0aW9uSW50ZXJuYWwoc2hhcmVkRGF0YSwgcmFuZ2VTaXplQXJyYXlJbnRWYWx1ZS5kYXRhLCBybmcpO1xuICByZXR1cm4gc2hhcmVkRGF0YVswXSAqIDQyOTQ5NjcyOTYgKyBzaGFyZWREYXRhWzFdICsgZnJvbTtcbn1cbmZ1bmN0aW9uIHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb24oZnJvbSwgdG8sIHJuZykge1xuICB2YXIgcmFuZ2VTaXplID0gdG8gLSBmcm9tO1xuICBpZiAocmFuZ2VTaXplIDw9IDQyOTQ5NjcyOTUpIHtcbiAgICB2YXIgZyA9IHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb25JbnRlcm5hbChyYW5nZVNpemUgKyAxLCBybmcpO1xuICAgIHJldHVybiBnICsgZnJvbTtcbiAgfVxuICByZXR1cm4gdW5pZm9ybUxhcmdlSW50SW50ZXJuYWwoZnJvbSwgdG8sIHJhbmdlU2l6ZSwgcm5nKTtcbn1cblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3B1cmUtcmFuZEA3LjAuMS9ub2RlX21vZHVsZXMvcHVyZS1yYW5kL2xpYi9lc20vZ2VuZXJhdG9yL1hvcm9TaGlyby5qc1xudmFyIFhvcm9TaGlybzEyOFBsdXMgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFhvcm9TaGlybzEyOFBsdXMyKHMwMSwgczAwLCBzMTEsIHMxMCkge1xuICAgIHRoaXMuczAxID0gczAxO1xuICAgIHRoaXMuczAwID0gczAwO1xuICAgIHRoaXMuczExID0gczExO1xuICAgIHRoaXMuczEwID0gczEwO1xuICB9XG4gIFhvcm9TaGlybzEyOFBsdXMyLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgWG9yb1NoaXJvMTI4UGx1czIodGhpcy5zMDEsIHRoaXMuczAwLCB0aGlzLnMxMSwgdGhpcy5zMTApO1xuICB9O1xuICBYb3JvU2hpcm8xMjhQbHVzMi5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZXh0Um5nID0gbmV3IFhvcm9TaGlybzEyOFBsdXMyKHRoaXMuczAxLCB0aGlzLnMwMCwgdGhpcy5zMTEsIHRoaXMuczEwKTtcbiAgICB2YXIgb3V0ID0gbmV4dFJuZy51bnNhZmVOZXh0KCk7XG4gICAgcmV0dXJuIFtvdXQsIG5leHRSbmddO1xuICB9O1xuICBYb3JvU2hpcm8xMjhQbHVzMi5wcm90b3R5cGUudW5zYWZlTmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSB0aGlzLnMwMCArIHRoaXMuczEwIHwgMDtcbiAgICB2YXIgYTAgPSB0aGlzLnMxMCBeIHRoaXMuczAwO1xuICAgIHZhciBhMSA9IHRoaXMuczExIF4gdGhpcy5zMDE7XG4gICAgdmFyIHMwMCA9IHRoaXMuczAwO1xuICAgIHZhciBzMDEgPSB0aGlzLnMwMTtcbiAgICB0aGlzLnMwMCA9IHMwMCA8PCAyNCBeIHMwMSA+Pj4gOCBeIGEwIF4gYTAgPDwgMTY7XG4gICAgdGhpcy5zMDEgPSBzMDEgPDwgMjQgXiBzMDAgPj4+IDggXiBhMSBeIChhMSA8PCAxNiB8IGEwID4+PiAxNik7XG4gICAgdGhpcy5zMTAgPSBhMSA8PCA1IF4gYTAgPj4+IDI3O1xuICAgIHRoaXMuczExID0gYTAgPDwgNSBeIGExID4+PiAyNztcbiAgICByZXR1cm4gb3V0O1xuICB9O1xuICBYb3JvU2hpcm8xMjhQbHVzMi5wcm90b3R5cGUuanVtcCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZXh0Um5nID0gbmV3IFhvcm9TaGlybzEyOFBsdXMyKHRoaXMuczAxLCB0aGlzLnMwMCwgdGhpcy5zMTEsIHRoaXMuczEwKTtcbiAgICBuZXh0Um5nLnVuc2FmZUp1bXAoKTtcbiAgICByZXR1cm4gbmV4dFJuZztcbiAgfTtcbiAgWG9yb1NoaXJvMTI4UGx1czIucHJvdG90eXBlLnVuc2FmZUp1bXAgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbnMwMSA9IDA7XG4gICAgdmFyIG5zMDAgPSAwO1xuICAgIHZhciBuczExID0gMDtcbiAgICB2YXIgbnMxMCA9IDA7XG4gICAgdmFyIGp1bXAgPSBbMzYzOTk1NjY0NSwgMzc1MDc1NzAxMiwgMTI2MTU2ODUwOCwgMzg2NDI2MzM1XTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSAhPT0gNDsgKytpKSB7XG4gICAgICBmb3IgKHZhciBtYXNrID0gMTsgbWFzazsgbWFzayA8PD0gMSkge1xuICAgICAgICBpZiAoanVtcFtpXSAmIG1hc2spIHtcbiAgICAgICAgICBuczAxIF49IHRoaXMuczAxO1xuICAgICAgICAgIG5zMDAgXj0gdGhpcy5zMDA7XG4gICAgICAgICAgbnMxMSBePSB0aGlzLnMxMTtcbiAgICAgICAgICBuczEwIF49IHRoaXMuczEwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudW5zYWZlTmV4dCgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnMwMSA9IG5zMDE7XG4gICAgdGhpcy5zMDAgPSBuczAwO1xuICAgIHRoaXMuczExID0gbnMxMTtcbiAgICB0aGlzLnMxMCA9IG5zMTA7XG4gIH07XG4gIFhvcm9TaGlybzEyOFBsdXMyLnByb3RvdHlwZS5nZXRTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBbdGhpcy5zMDEsIHRoaXMuczAwLCB0aGlzLnMxMSwgdGhpcy5zMTBdO1xuICB9O1xuICByZXR1cm4gWG9yb1NoaXJvMTI4UGx1czI7XG59KSgpO1xuZnVuY3Rpb24gZnJvbVN0YXRlKHN0YXRlKSB7XG4gIHZhciB2YWxpZCA9IHN0YXRlLmxlbmd0aCA9PT0gNDtcbiAgaWYgKCF2YWxpZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdGF0ZSBtdXN0IGhhdmUgYmVlbiBwcm9kdWNlZCBieSBhIHhvcm9zaGlybzEyOHBsdXMgUmFuZG9tR2VuZXJhdG9yXCIpO1xuICB9XG4gIHJldHVybiBuZXcgWG9yb1NoaXJvMTI4UGx1cyhzdGF0ZVswXSwgc3RhdGVbMV0sIHN0YXRlWzJdLCBzdGF0ZVszXSk7XG59XG52YXIgeG9yb3NoaXJvMTI4cGx1cyA9IE9iamVjdC5hc3NpZ24oZnVuY3Rpb24oc2VlZCkge1xuICByZXR1cm4gbmV3IFhvcm9TaGlybzEyOFBsdXMoLTEsIH5zZWVkLCBzZWVkIHwgMCwgMCk7XG59LCB7IGZyb21TdGF0ZSB9KTtcblxuLy8gc3JjL3NlcnZlci9ybmcudHNcbnZhciB7IGFzVWludE4gfSA9IEJpZ0ludDtcbmZ1bmN0aW9uIHBjZzMyKHN0YXRlKSB7XG4gIGNvbnN0IE1VTCA9IDYzNjQxMzYyMjM4NDY3OTMwMDVuO1xuICBjb25zdCBJTkMgPSAxMTYzNDU4MDAyNzQ2MjI2MDcyM247XG4gIHN0YXRlID0gYXNVaW50Tig2NCwgc3RhdGUgKiBNVUwgKyBJTkMpO1xuICBjb25zdCB4b3JzaGlmdGVkID0gTnVtYmVyKGFzVWludE4oMzIsIChzdGF0ZSA+PiAxOG4gXiBzdGF0ZSkgPj4gMjduKSk7XG4gIGNvbnN0IHJvdCA9IE51bWJlcihhc1VpbnROKDMyLCBzdGF0ZSA+PiA1OW4pKTtcbiAgcmV0dXJuIHhvcnNoaWZ0ZWQgPj4gcm90IHwgeG9yc2hpZnRlZCA8PCAzMiAtIHJvdDtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlRmxvYXQ2NChybmcpIHtcbiAgY29uc3QgZzEgPSB1bnNhZmVVbmlmb3JtSW50RGlzdHJpYnV0aW9uKDAsICgxIDw8IDI2KSAtIDEsIHJuZyk7XG4gIGNvbnN0IGcyID0gdW5zYWZlVW5pZm9ybUludERpc3RyaWJ1dGlvbigwLCAoMSA8PCAyNykgLSAxLCBybmcpO1xuICBjb25zdCB2YWx1ZSA9IChnMSAqIE1hdGgucG93KDIsIDI3KSArIGcyKSAqIE1hdGgucG93KDIsIC01Myk7XG4gIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIG1ha2VSYW5kb20oc2VlZCkge1xuICBjb25zdCBybmcgPSB4b3Jvc2hpcm8xMjhwbHVzKHBjZzMyKHNlZWQubWljcm9zU2luY2VVbml4RXBvY2gpKTtcbiAgY29uc3QgcmFuZG9tID0gKCkgPT4gZ2VuZXJhdGVGbG9hdDY0KHJuZyk7XG4gIHJhbmRvbS5maWxsID0gKGFycmF5KSA9PiB7XG4gICAgY29uc3QgZWxlbSA9IGFycmF5LmF0KDApO1xuICAgIGlmICh0eXBlb2YgZWxlbSA9PT0gXCJiaWdpbnRcIikge1xuICAgICAgY29uc3QgdXBwZXIgPSAoMW4gPDwgQmlnSW50KGFycmF5LkJZVEVTX1BFUl9FTEVNRU5UICogOCkpIC0gMW47XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFycmF5W2ldID0gdW5zYWZlVW5pZm9ybUJpZ0ludERpc3RyaWJ1dGlvbigwbiwgdXBwZXIsIHJuZyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgY29uc3QgdXBwZXIgPSAoMSA8PCBhcnJheS5CWVRFU19QRVJfRUxFTUVOVCAqIDgpIC0gMTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJyYXlbaV0gPSB1bnNhZmVVbmlmb3JtSW50RGlzdHJpYnV0aW9uKDAsIHVwcGVyLCBybmcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG4gIH07XG4gIHJhbmRvbS51aW50MzIgPSAoKSA9PiBybmcudW5zYWZlTmV4dCgpO1xuICByYW5kb20uaW50ZWdlckluUmFuZ2UgPSAobWluLCBtYXgpID0+IHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb24obWluLCBtYXgsIHJuZyk7XG4gIHJhbmRvbS5iaWdpbnRJblJhbmdlID0gKG1pbiwgbWF4KSA9PiB1bnNhZmVVbmlmb3JtQmlnSW50RGlzdHJpYnV0aW9uKG1pbiwgbWF4LCBybmcpO1xuICByZXR1cm4gcmFuZG9tO1xufVxuXG4vLyBzcmMvc2VydmVyL3J1bnRpbWUudHNcbnZhciB7IGZyZWV6ZSB9ID0gT2JqZWN0O1xudmFyIHN5cyA9IF9zeXNjYWxsczJfMDtcbmZ1bmN0aW9uIHBhcnNlSnNvbk9iamVjdChqc29uKSB7XG4gIGxldCB2YWx1ZTtcbiAgdHJ5IHtcbiAgICB2YWx1ZSA9IEpTT04ucGFyc2UoanNvbik7XG4gIH0gY2F0Y2gge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgSlNPTjogZmFpbGVkIHRvIHBhcnNlIHN0cmluZ1wiKTtcbiAgfVxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgYSBKU09OIG9iamVjdCBhdCB0aGUgdG9wIGxldmVsXCIpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cbnZhciBKd3RDbGFpbXNJbXBsID0gY2xhc3Mge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBKd3RDbGFpbXMgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSByYXdQYXlsb2FkIFRoZSBKV1QgcGF5bG9hZCBhcyBhIHJhdyBKU09OIHN0cmluZy5cbiAgICogQHBhcmFtIGlkZW50aXR5IFRoZSBpZGVudGl0eSBmb3IgdGhpcyBKV1QuIFdlIGFyZSBvbmx5IHRha2luZyB0aGlzIGJlY2F1c2Ugd2UgZG9uJ3QgaGF2ZSBhIGJsYWtlMyBpbXBsZW1lbnRhdGlvbiAod2hpY2ggd2UgbmVlZCB0byBjb21wdXRlIGl0KS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHJhd1BheWxvYWQsIGlkZW50aXR5KSB7XG4gICAgdGhpcy5yYXdQYXlsb2FkID0gcmF3UGF5bG9hZDtcbiAgICB0aGlzLmZ1bGxQYXlsb2FkID0gcGFyc2VKc29uT2JqZWN0KHJhd1BheWxvYWQpO1xuICAgIHRoaXMuX2lkZW50aXR5ID0gaWRlbnRpdHk7XG4gIH1cbiAgZnVsbFBheWxvYWQ7XG4gIF9pZGVudGl0eTtcbiAgZ2V0IGlkZW50aXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9pZGVudGl0eTtcbiAgfVxuICBnZXQgc3ViamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5mdWxsUGF5bG9hZFtcInN1YlwiXTtcbiAgfVxuICBnZXQgaXNzdWVyKCkge1xuICAgIHJldHVybiB0aGlzLmZ1bGxQYXlsb2FkW1wiaXNzXCJdO1xuICB9XG4gIGdldCBhdWRpZW5jZSgpIHtcbiAgICBjb25zdCBhdWQgPSB0aGlzLmZ1bGxQYXlsb2FkW1wiYXVkXCJdO1xuICAgIGlmIChhdWQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIGF1ZCA9PT0gXCJzdHJpbmdcIiA/IFthdWRdIDogYXVkO1xuICB9XG59O1xudmFyIEF1dGhDdHhJbXBsID0gY2xhc3MgX0F1dGhDdHhJbXBsIHtcbiAgaXNJbnRlcm5hbDtcbiAgLy8gU291cmNlIG9mIHRoZSBKV1QgcGF5bG9hZCBzdHJpbmcsIGlmIHRoZXJlIGlzIG9uZS5cbiAgX2p3dFNvdXJjZTtcbiAgLy8gV2hldGhlciB3ZSBoYXZlIGluaXRpYWxpemVkIHRoZSBKV1QgY2xhaW1zLlxuICBfaW5pdGlhbGl6ZWRKV1QgPSBmYWxzZTtcbiAgX2p3dENsYWltcztcbiAgX3NlbmRlcklkZW50aXR5O1xuICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgdGhpcy5pc0ludGVybmFsID0gb3B0cy5pc0ludGVybmFsO1xuICAgIHRoaXMuX2p3dFNvdXJjZSA9IG9wdHMuand0U291cmNlO1xuICAgIHRoaXMuX3NlbmRlcklkZW50aXR5ID0gb3B0cy5zZW5kZXJJZGVudGl0eTtcbiAgfVxuICBfaW5pdGlhbGl6ZUpXVCgpIHtcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWRKV1QpIHJldHVybjtcbiAgICB0aGlzLl9pbml0aWFsaXplZEpXVCA9IHRydWU7XG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLl9qd3RTb3VyY2UoKTtcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICB0aGlzLl9qd3RDbGFpbXMgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9qd3RDbGFpbXMgPSBuZXcgSnd0Q2xhaW1zSW1wbCh0b2tlbiwgdGhpcy5fc2VuZGVySWRlbnRpdHkpO1xuICAgIH1cbiAgICBPYmplY3QuZnJlZXplKHRoaXMpO1xuICB9XG4gIC8qKiBMYXppbHkgY29tcHV0ZSB3aGV0aGVyIGEgSldUIGV4aXN0cyBhbmQgaXMgcGFyc2VhYmxlLiAqL1xuICBnZXQgaGFzSldUKCkge1xuICAgIHRoaXMuX2luaXRpYWxpemVKV1QoKTtcbiAgICByZXR1cm4gdGhpcy5fand0Q2xhaW1zICE9PSBudWxsO1xuICB9XG4gIC8qKiBMYXppbHkgcGFyc2UgdGhlIEp3dENsYWltcyBvbmx5IHdoZW4gYWNjZXNzZWQuICovXG4gIGdldCBqd3QoKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZUpXVCgpO1xuICAgIHJldHVybiB0aGlzLl9qd3RDbGFpbXM7XG4gIH1cbiAgLyoqIENyZWF0ZSBhIGNvbnRleHQgcmVwcmVzZW50aW5nIGludGVybmFsIChub24tdXNlcikgcmVxdWVzdHMuICovXG4gIHN0YXRpYyBpbnRlcm5hbCgpIHtcbiAgICByZXR1cm4gbmV3IF9BdXRoQ3R4SW1wbCh7XG4gICAgICBpc0ludGVybmFsOiB0cnVlLFxuICAgICAgand0U291cmNlOiAoKSA9PiBudWxsLFxuICAgICAgc2VuZGVySWRlbnRpdHk6IElkZW50aXR5Lnplcm8oKVxuICAgIH0pO1xuICB9XG4gIC8qKiBJZiB0aGVyZSBpcyBhIGNvbm5lY3Rpb24gaWQsIGxvb2sgdXAgdGhlIEpXVCBwYXlsb2FkIGZyb20gdGhlIHN5c3RlbSB0YWJsZXMuICovXG4gIHN0YXRpYyBmcm9tU3lzdGVtVGFibGVzKGNvbm5lY3Rpb25JZCwgc2VuZGVyKSB7XG4gICAgaWYgKGNvbm5lY3Rpb25JZCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG5ldyBfQXV0aEN0eEltcGwoe1xuICAgICAgICBpc0ludGVybmFsOiBmYWxzZSxcbiAgICAgICAgand0U291cmNlOiAoKSA9PiBudWxsLFxuICAgICAgICBzZW5kZXJJZGVudGl0eTogc2VuZGVyXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBfQXV0aEN0eEltcGwoe1xuICAgICAgaXNJbnRlcm5hbDogZmFsc2UsXG4gICAgICBqd3RTb3VyY2U6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZEJ1ZiA9IHN5cy5nZXRfand0X3BheWxvYWQoY29ubmVjdGlvbklkLl9fY29ubmVjdGlvbl9pZF9fKTtcbiAgICAgICAgaWYgKHBheWxvYWRCdWYubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgcGF5bG9hZFN0ciA9IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShwYXlsb2FkQnVmKTtcbiAgICAgICAgcmV0dXJuIHBheWxvYWRTdHI7XG4gICAgICB9LFxuICAgICAgc2VuZGVySWRlbnRpdHk6IHNlbmRlclxuICAgIH0pO1xuICB9XG59O1xudmFyIFJlZHVjZXJDdHhJbXBsID0gY2xhc3MgUmVkdWNlckN0eCB7XG4gICNpZGVudGl0eTtcbiAgI3NlbmRlckF1dGg7XG4gICN1dWlkQ291bnRlcjtcbiAgI3JhbmRvbTtcbiAgc2VuZGVyO1xuICB0aW1lc3RhbXA7XG4gIGNvbm5lY3Rpb25JZDtcbiAgZGI7XG4gIGNvbnN0cnVjdG9yKHNlbmRlciwgdGltZXN0YW1wLCBjb25uZWN0aW9uSWQsIGRiVmlldykge1xuICAgIE9iamVjdC5zZWFsKHRoaXMpO1xuICAgIHRoaXMuc2VuZGVyID0gc2VuZGVyO1xuICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgIHRoaXMuY29ubmVjdGlvbklkID0gY29ubmVjdGlvbklkO1xuICAgIHRoaXMuZGIgPSBkYlZpZXc7XG4gIH1cbiAgLyoqIFJlc2V0IHRoZSBgUmVkdWNlckN0eGAgdG8gYmUgdXNlZCBmb3IgYSBuZXcgdHJhbnNhY3Rpb24gKi9cbiAgc3RhdGljIHJlc2V0KG1lLCBzZW5kZXIsIHRpbWVzdGFtcCwgY29ubmVjdGlvbklkKSB7XG4gICAgbWUuc2VuZGVyID0gc2VuZGVyO1xuICAgIG1lLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICBtZS5jb25uZWN0aW9uSWQgPSBjb25uZWN0aW9uSWQ7XG4gICAgbWUuI3V1aWRDb3VudGVyID0gdm9pZCAwO1xuICAgIG1lLiNzZW5kZXJBdXRoID0gdm9pZCAwO1xuICB9XG4gIGdldCBpZGVudGl0eSgpIHtcbiAgICByZXR1cm4gdGhpcy4jaWRlbnRpdHkgPz89IG5ldyBJZGVudGl0eShzeXMuaWRlbnRpdHkoKSk7XG4gIH1cbiAgZ2V0IHNlbmRlckF1dGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3NlbmRlckF1dGggPz89IEF1dGhDdHhJbXBsLmZyb21TeXN0ZW1UYWJsZXMoXG4gICAgICB0aGlzLmNvbm5lY3Rpb25JZCxcbiAgICAgIHRoaXMuc2VuZGVyXG4gICAgKTtcbiAgfVxuICBnZXQgcmFuZG9tKCkge1xuICAgIHJldHVybiB0aGlzLiNyYW5kb20gPz89IG1ha2VSYW5kb20odGhpcy50aW1lc3RhbXApO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgcmFuZG9tIHtAbGluayBVdWlkfSBgdjRgIHVzaW5nIHRoaXMgYFJlZHVjZXJDdHhgJ3MgUk5HLlxuICAgKi9cbiAgbmV3VXVpZFY0KCkge1xuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy5yYW5kb20uZmlsbChuZXcgVWludDhBcnJheSgxNikpO1xuICAgIHJldHVybiBVdWlkLmZyb21SYW5kb21CeXRlc1Y0KGJ5dGVzKTtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHNvcnRhYmxlIHtAbGluayBVdWlkfSBgdjdgIHVzaW5nIHRoaXMgYFJlZHVjZXJDdHhgJ3MgUk5HLCBjb3VudGVyLFxuICAgKiBhbmQgdGltZXN0YW1wLlxuICAgKi9cbiAgbmV3VXVpZFY3KCkge1xuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy5yYW5kb20uZmlsbChuZXcgVWludDhBcnJheSg0KSk7XG4gICAgY29uc3QgY291bnRlciA9IHRoaXMuI3V1aWRDb3VudGVyID8/PSB7IHZhbHVlOiAwIH07XG4gICAgcmV0dXJuIFV1aWQuZnJvbUNvdW50ZXJWNyhjb3VudGVyLCB0aGlzLnRpbWVzdGFtcCwgYnl0ZXMpO1xuICB9XG59O1xudmFyIGNhbGxVc2VyRnVuY3Rpb24gPSBmdW5jdGlvbiBfX3NwYWNldGltZWRiX2VuZF9zaG9ydF9iYWNrdHJhY2UoZm4sIC4uLmFyZ3MpIHtcbiAgcmV0dXJuIGZuKC4uLmFyZ3MpO1xufTtcbnZhciBtYWtlSG9va3MgPSAoc2NoZW1hMikgPT4gbmV3IE1vZHVsZUhvb2tzSW1wbChzY2hlbWEyKTtcbnZhciBNb2R1bGVIb29rc0ltcGwgPSBjbGFzcyB7XG4gICNzY2hlbWE7XG4gICNkYlZpZXdfO1xuICAjcmVkdWNlckFyZ3NEZXNlcmlhbGl6ZXJzO1xuICAvKiogQ2FjaGUgdGhlIGBSZWR1Y2VyQ3R4YCBvYmplY3QgdG8gYXZvaWQgYWxsb2NhdGluZyBhbmV3IGZvciBldmVyIHJlZHVjZXIgY2FsbC4gKi9cbiAgI3JlZHVjZXJDdHhfO1xuICBjb25zdHJ1Y3RvcihzY2hlbWEyKSB7XG4gICAgdGhpcy4jc2NoZW1hID0gc2NoZW1hMjtcbiAgICB0aGlzLiNyZWR1Y2VyQXJnc0Rlc2VyaWFsaXplcnMgPSBzY2hlbWEyLm1vZHVsZURlZi5yZWR1Y2Vycy5tYXAoXG4gICAgICAoeyBwYXJhbXMgfSkgPT4gUHJvZHVjdFR5cGUubWFrZURlc2VyaWFsaXplcihwYXJhbXMsIHNjaGVtYTIudHlwZXNwYWNlKVxuICAgICk7XG4gIH1cbiAgZ2V0ICNkYlZpZXcoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2RiVmlld18gPz89IGZyZWV6ZShcbiAgICAgIE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLiNzY2hlbWEuc2NoZW1hVHlwZS50YWJsZXMpLm1hcCgodGFibGUyKSA9PiBbXG4gICAgICAgICAgdGFibGUyLmFjY2Vzc29yTmFtZSxcbiAgICAgICAgICBtYWtlVGFibGVWaWV3KHRoaXMuI3NjaGVtYS50eXBlc3BhY2UsIHRhYmxlMi50YWJsZURlZilcbiAgICAgICAgXSlcbiAgICAgIClcbiAgICApO1xuICB9XG4gIGdldCAjcmVkdWNlckN0eCgpIHtcbiAgICByZXR1cm4gdGhpcy4jcmVkdWNlckN0eF8gPz89IG5ldyBSZWR1Y2VyQ3R4SW1wbChcbiAgICAgIElkZW50aXR5Lnplcm8oKSxcbiAgICAgIFRpbWVzdGFtcC5VTklYX0VQT0NILFxuICAgICAgbnVsbCxcbiAgICAgIHRoaXMuI2RiVmlld1xuICAgICk7XG4gIH1cbiAgX19kZXNjcmliZV9tb2R1bGVfXygpIHtcbiAgICBjb25zdCB3cml0ZXIgPSBuZXcgQmluYXJ5V3JpdGVyKDEyOCk7XG4gICAgUmF3TW9kdWxlRGVmLnNlcmlhbGl6ZShcbiAgICAgIHdyaXRlcixcbiAgICAgIFJhd01vZHVsZURlZi5WMTAodGhpcy4jc2NoZW1hLnJhd01vZHVsZURlZlYxMCgpKVxuICAgICk7XG4gICAgcmV0dXJuIHdyaXRlci5nZXRCdWZmZXIoKTtcbiAgfVxuICBfX2dldF9lcnJvcl9jb25zdHJ1Y3Rvcl9fKGNvZGUpIHtcbiAgICByZXR1cm4gZ2V0RXJyb3JDb25zdHJ1Y3Rvcihjb2RlKTtcbiAgfVxuICBnZXQgX19zZW5kZXJfZXJyb3JfY2xhc3NfXygpIHtcbiAgICByZXR1cm4gU2VuZGVyRXJyb3I7XG4gIH1cbiAgX19jYWxsX3JlZHVjZXJfXyhyZWR1Y2VySWQsIHNlbmRlciwgY29ubklkLCB0aW1lc3RhbXAsIGFyZ3NCdWYpIHtcbiAgICBjb25zdCBtb2R1bGVDdHggPSB0aGlzLiNzY2hlbWE7XG4gICAgY29uc3QgZGVzZXJpYWxpemVBcmdzID0gdGhpcy4jcmVkdWNlckFyZ3NEZXNlcmlhbGl6ZXJzW3JlZHVjZXJJZF07XG4gICAgQklOQVJZX1JFQURFUi5yZXNldChhcmdzQnVmKTtcbiAgICBjb25zdCBhcmdzID0gZGVzZXJpYWxpemVBcmdzKEJJTkFSWV9SRUFERVIpO1xuICAgIGNvbnN0IHNlbmRlcklkZW50aXR5ID0gbmV3IElkZW50aXR5KHNlbmRlcik7XG4gICAgY29uc3QgY3R4ID0gdGhpcy4jcmVkdWNlckN0eDtcbiAgICBSZWR1Y2VyQ3R4SW1wbC5yZXNldChcbiAgICAgIGN0eCxcbiAgICAgIHNlbmRlcklkZW50aXR5LFxuICAgICAgbmV3IFRpbWVzdGFtcCh0aW1lc3RhbXApLFxuICAgICAgQ29ubmVjdGlvbklkLm51bGxJZlplcm8obmV3IENvbm5lY3Rpb25JZChjb25uSWQpKVxuICAgICk7XG4gICAgY2FsbFVzZXJGdW5jdGlvbihtb2R1bGVDdHgucmVkdWNlcnNbcmVkdWNlcklkXSwgY3R4LCBhcmdzKTtcbiAgfVxuICBfX2NhbGxfdmlld19fKGlkLCBzZW5kZXIsIGFyZ3NCdWYpIHtcbiAgICBjb25zdCBtb2R1bGVDdHggPSB0aGlzLiNzY2hlbWE7XG4gICAgY29uc3QgeyBmbiwgZGVzZXJpYWxpemVQYXJhbXMsIHNlcmlhbGl6ZVJldHVybiwgcmV0dXJuVHlwZUJhc2VTaXplIH0gPSBtb2R1bGVDdHgudmlld3NbaWRdO1xuICAgIGNvbnN0IGN0eCA9IGZyZWV6ZSh7XG4gICAgICBzZW5kZXI6IG5ldyBJZGVudGl0eShzZW5kZXIpLFxuICAgICAgLy8gdGhpcyBpcyB0aGUgbm9uLXJlYWRvbmx5IERiVmlldywgYnV0IHRoZSB0eXBpbmcgZm9yIHRoZSB1c2VyIHdpbGwgYmVcbiAgICAgIC8vIHRoZSByZWFkb25seSBvbmUsIGFuZCBpZiB0aGV5IGRvIGNhbGwgbXV0YXRpbmcgZnVuY3Rpb25zIGl0IHdpbGwgZmFpbFxuICAgICAgLy8gYXQgcnVudGltZVxuICAgICAgZGI6IHRoaXMuI2RiVmlldyxcbiAgICAgIGZyb206IG1ha2VRdWVyeUJ1aWxkZXIobW9kdWxlQ3R4LnNjaGVtYVR5cGUpXG4gICAgfSk7XG4gICAgY29uc3QgYXJncyA9IGRlc2VyaWFsaXplUGFyYW1zKG5ldyBCaW5hcnlSZWFkZXIoYXJnc0J1ZikpO1xuICAgIGNvbnN0IHJldCA9IGNhbGxVc2VyRnVuY3Rpb24oZm4sIGN0eCwgYXJncyk7XG4gICAgY29uc3QgcmV0QnVmID0gbmV3IEJpbmFyeVdyaXRlcihyZXR1cm5UeXBlQmFzZVNpemUpO1xuICAgIGlmIChpc1Jvd1R5cGVkUXVlcnkocmV0KSkge1xuICAgICAgY29uc3QgcXVlcnkgPSB0b1NxbChyZXQpO1xuICAgICAgVmlld1Jlc3VsdEhlYWRlci5zZXJpYWxpemUocmV0QnVmLCBWaWV3UmVzdWx0SGVhZGVyLlJhd1NxbChxdWVyeSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBWaWV3UmVzdWx0SGVhZGVyLnNlcmlhbGl6ZShyZXRCdWYsIFZpZXdSZXN1bHRIZWFkZXIuUm93RGF0YSk7XG4gICAgICBzZXJpYWxpemVSZXR1cm4ocmV0QnVmLCByZXQpO1xuICAgIH1cbiAgICByZXR1cm4geyBkYXRhOiByZXRCdWYuZ2V0QnVmZmVyKCkgfTtcbiAgfVxuICBfX2NhbGxfdmlld19hbm9uX18oaWQsIGFyZ3NCdWYpIHtcbiAgICBjb25zdCBtb2R1bGVDdHggPSB0aGlzLiNzY2hlbWE7XG4gICAgY29uc3QgeyBmbiwgZGVzZXJpYWxpemVQYXJhbXMsIHNlcmlhbGl6ZVJldHVybiwgcmV0dXJuVHlwZUJhc2VTaXplIH0gPSBtb2R1bGVDdHguYW5vblZpZXdzW2lkXTtcbiAgICBjb25zdCBjdHggPSBmcmVlemUoe1xuICAgICAgLy8gdGhpcyBpcyB0aGUgbm9uLXJlYWRvbmx5IERiVmlldywgYnV0IHRoZSB0eXBpbmcgZm9yIHRoZSB1c2VyIHdpbGwgYmVcbiAgICAgIC8vIHRoZSByZWFkb25seSBvbmUsIGFuZCBpZiB0aGV5IGRvIGNhbGwgbXV0YXRpbmcgZnVuY3Rpb25zIGl0IHdpbGwgZmFpbFxuICAgICAgLy8gYXQgcnVudGltZVxuICAgICAgZGI6IHRoaXMuI2RiVmlldyxcbiAgICAgIGZyb206IG1ha2VRdWVyeUJ1aWxkZXIobW9kdWxlQ3R4LnNjaGVtYVR5cGUpXG4gICAgfSk7XG4gICAgY29uc3QgYXJncyA9IGRlc2VyaWFsaXplUGFyYW1zKG5ldyBCaW5hcnlSZWFkZXIoYXJnc0J1ZikpO1xuICAgIGNvbnN0IHJldCA9IGNhbGxVc2VyRnVuY3Rpb24oZm4sIGN0eCwgYXJncyk7XG4gICAgY29uc3QgcmV0QnVmID0gbmV3IEJpbmFyeVdyaXRlcihyZXR1cm5UeXBlQmFzZVNpemUpO1xuICAgIGlmIChpc1Jvd1R5cGVkUXVlcnkocmV0KSkge1xuICAgICAgY29uc3QgcXVlcnkgPSB0b1NxbChyZXQpO1xuICAgICAgVmlld1Jlc3VsdEhlYWRlci5zZXJpYWxpemUocmV0QnVmLCBWaWV3UmVzdWx0SGVhZGVyLlJhd1NxbChxdWVyeSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBWaWV3UmVzdWx0SGVhZGVyLnNlcmlhbGl6ZShyZXRCdWYsIFZpZXdSZXN1bHRIZWFkZXIuUm93RGF0YSk7XG4gICAgICBzZXJpYWxpemVSZXR1cm4ocmV0QnVmLCByZXQpO1xuICAgIH1cbiAgICByZXR1cm4geyBkYXRhOiByZXRCdWYuZ2V0QnVmZmVyKCkgfTtcbiAgfVxuICBfX2NhbGxfcHJvY2VkdXJlX18oaWQsIHNlbmRlciwgY29ubmVjdGlvbl9pZCwgdGltZXN0YW1wLCBhcmdzKSB7XG4gICAgcmV0dXJuIGNhbGxQcm9jZWR1cmUoXG4gICAgICB0aGlzLiNzY2hlbWEsXG4gICAgICBpZCxcbiAgICAgIG5ldyBJZGVudGl0eShzZW5kZXIpLFxuICAgICAgQ29ubmVjdGlvbklkLm51bGxJZlplcm8obmV3IENvbm5lY3Rpb25JZChjb25uZWN0aW9uX2lkKSksXG4gICAgICBuZXcgVGltZXN0YW1wKHRpbWVzdGFtcCksXG4gICAgICBhcmdzLFxuICAgICAgKCkgPT4gdGhpcy4jZGJWaWV3XG4gICAgKTtcbiAgfVxufTtcbnZhciBCSU5BUllfV1JJVEVSID0gbmV3IEJpbmFyeVdyaXRlcigwKTtcbnZhciBCSU5BUllfUkVBREVSID0gbmV3IEJpbmFyeVJlYWRlcihuZXcgVWludDhBcnJheSgpKTtcbmZ1bmN0aW9uIG1ha2VUYWJsZVZpZXcodHlwZXNwYWNlLCB0YWJsZTIpIHtcbiAgY29uc3QgdGFibGVfaWQgPSBzeXMudGFibGVfaWRfZnJvbV9uYW1lKHRhYmxlMi5zb3VyY2VOYW1lKTtcbiAgY29uc3Qgcm93VHlwZSA9IHR5cGVzcGFjZS50eXBlc1t0YWJsZTIucHJvZHVjdFR5cGVSZWZdO1xuICBpZiAocm93VHlwZS50YWcgIT09IFwiUHJvZHVjdFwiKSB7XG4gICAgdGhyb3cgXCJpbXBvc3NpYmxlXCI7XG4gIH1cbiAgY29uc3Qgc2VyaWFsaXplUm93ID0gQWxnZWJyYWljVHlwZS5tYWtlU2VyaWFsaXplcihyb3dUeXBlLCB0eXBlc3BhY2UpO1xuICBjb25zdCBkZXNlcmlhbGl6ZVJvdyA9IEFsZ2VicmFpY1R5cGUubWFrZURlc2VyaWFsaXplcihyb3dUeXBlLCB0eXBlc3BhY2UpO1xuICBjb25zdCBzZXF1ZW5jZXMgPSB0YWJsZTIuc2VxdWVuY2VzLm1hcCgoc2VxKSA9PiB7XG4gICAgY29uc3QgY29sID0gcm93VHlwZS52YWx1ZS5lbGVtZW50c1tzZXEuY29sdW1uXTtcbiAgICBjb25zdCBjb2xUeXBlID0gY29sLmFsZ2VicmFpY1R5cGU7XG4gICAgbGV0IHNlcXVlbmNlVHJpZ2dlcjtcbiAgICBzd2l0Y2ggKGNvbFR5cGUudGFnKSB7XG4gICAgICBjYXNlIFwiVThcIjpcbiAgICAgIGNhc2UgXCJJOFwiOlxuICAgICAgY2FzZSBcIlUxNlwiOlxuICAgICAgY2FzZSBcIkkxNlwiOlxuICAgICAgY2FzZSBcIlUzMlwiOlxuICAgICAgY2FzZSBcIkkzMlwiOlxuICAgICAgICBzZXF1ZW5jZVRyaWdnZXIgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJVNjRcIjpcbiAgICAgIGNhc2UgXCJJNjRcIjpcbiAgICAgIGNhc2UgXCJVMTI4XCI6XG4gICAgICBjYXNlIFwiSTEyOFwiOlxuICAgICAgY2FzZSBcIlUyNTZcIjpcbiAgICAgIGNhc2UgXCJJMjU2XCI6XG4gICAgICAgIHNlcXVlbmNlVHJpZ2dlciA9IDBuO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJpbnZhbGlkIHNlcXVlbmNlIHR5cGVcIik7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBjb2xOYW1lOiBjb2wubmFtZSxcbiAgICAgIHNlcXVlbmNlVHJpZ2dlcixcbiAgICAgIGRlc2VyaWFsaXplOiBBbGdlYnJhaWNUeXBlLm1ha2VEZXNlcmlhbGl6ZXIoY29sVHlwZSwgdHlwZXNwYWNlKVxuICAgIH07XG4gIH0pO1xuICBjb25zdCBoYXNBdXRvSW5jcmVtZW50ID0gc2VxdWVuY2VzLmxlbmd0aCA+IDA7XG4gIGNvbnN0IGl0ZXIgPSAoKSA9PiB0YWJsZUl0ZXJhdG9yKHN5cy5kYXRhc3RvcmVfdGFibGVfc2Nhbl9ic2F0bih0YWJsZV9pZCksIGRlc2VyaWFsaXplUm93KTtcbiAgY29uc3QgaW50ZWdyYXRlR2VuZXJhdGVkQ29sdW1ucyA9IGhhc0F1dG9JbmNyZW1lbnQgPyAocm93LCByZXRfYnVmKSA9PiB7XG4gICAgQklOQVJZX1JFQURFUi5yZXNldChyZXRfYnVmKTtcbiAgICBmb3IgKGNvbnN0IHsgY29sTmFtZSwgZGVzZXJpYWxpemUsIHNlcXVlbmNlVHJpZ2dlciB9IG9mIHNlcXVlbmNlcykge1xuICAgICAgaWYgKHJvd1tjb2xOYW1lXSA9PT0gc2VxdWVuY2VUcmlnZ2VyKSB7XG4gICAgICAgIHJvd1tjb2xOYW1lXSA9IGRlc2VyaWFsaXplKEJJTkFSWV9SRUFERVIpO1xuICAgICAgfVxuICAgIH1cbiAgfSA6IG51bGw7XG4gIGNvbnN0IHRhYmxlTWV0aG9kcyA9IHtcbiAgICBjb3VudDogKCkgPT4gc3lzLmRhdGFzdG9yZV90YWJsZV9yb3dfY291bnQodGFibGVfaWQpLFxuICAgIGl0ZXIsXG4gICAgW1N5bWJvbC5pdGVyYXRvcl06ICgpID0+IGl0ZXIoKSxcbiAgICBpbnNlcnQ6IChyb3cpID0+IHtcbiAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgQklOQVJZX1dSSVRFUi5yZXNldChidWYpO1xuICAgICAgc2VyaWFsaXplUm93KEJJTkFSWV9XUklURVIsIHJvdyk7XG4gICAgICBzeXMuZGF0YXN0b3JlX2luc2VydF9ic2F0bih0YWJsZV9pZCwgYnVmLmJ1ZmZlciwgQklOQVJZX1dSSVRFUi5vZmZzZXQpO1xuICAgICAgY29uc3QgcmV0ID0geyAuLi5yb3cgfTtcbiAgICAgIGludGVncmF0ZUdlbmVyYXRlZENvbHVtbnM/LihyZXQsIGJ1Zi52aWV3KTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcbiAgICBkZWxldGU6IChyb3cpID0+IHtcbiAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgQklOQVJZX1dSSVRFUi5yZXNldChidWYpO1xuICAgICAgQklOQVJZX1dSSVRFUi53cml0ZVUzMigxKTtcbiAgICAgIHNlcmlhbGl6ZVJvdyhCSU5BUllfV1JJVEVSLCByb3cpO1xuICAgICAgY29uc3QgY291bnQgPSBzeXMuZGF0YXN0b3JlX2RlbGV0ZV9hbGxfYnlfZXFfYnNhdG4oXG4gICAgICAgIHRhYmxlX2lkLFxuICAgICAgICBidWYuYnVmZmVyLFxuICAgICAgICBCSU5BUllfV1JJVEVSLm9mZnNldFxuICAgICAgKTtcbiAgICAgIHJldHVybiBjb3VudCA+IDA7XG4gICAgfVxuICB9O1xuICBjb25zdCB0YWJsZVZpZXcgPSBPYmplY3QuYXNzaWduKFxuICAgIC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIHRhYmxlTWV0aG9kc1xuICApO1xuICBmb3IgKGNvbnN0IGluZGV4RGVmIG9mIHRhYmxlMi5pbmRleGVzKSB7XG4gICAgY29uc3QgaW5kZXhfaWQgPSBzeXMuaW5kZXhfaWRfZnJvbV9uYW1lKGluZGV4RGVmLnNvdXJjZU5hbWUpO1xuICAgIGxldCBjb2x1bW5faWRzO1xuICAgIGxldCBpc0hhc2hJbmRleCA9IGZhbHNlO1xuICAgIHN3aXRjaCAoaW5kZXhEZWYuYWxnb3JpdGhtLnRhZykge1xuICAgICAgY2FzZSBcIkhhc2hcIjpcbiAgICAgICAgaXNIYXNoSW5kZXggPSB0cnVlO1xuICAgICAgICBjb2x1bW5faWRzID0gaW5kZXhEZWYuYWxnb3JpdGhtLnZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJCVHJlZVwiOlxuICAgICAgICBjb2x1bW5faWRzID0gaW5kZXhEZWYuYWxnb3JpdGhtLnZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJEaXJlY3RcIjpcbiAgICAgICAgY29sdW1uX2lkcyA9IFtpbmRleERlZi5hbGdvcml0aG0udmFsdWVdO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgY29uc3QgbnVtQ29sdW1ucyA9IGNvbHVtbl9pZHMubGVuZ3RoO1xuICAgIGNvbnN0IGNvbHVtblNldCA9IG5ldyBTZXQoY29sdW1uX2lkcyk7XG4gICAgY29uc3QgaXNVbmlxdWUgPSB0YWJsZTIuY29uc3RyYWludHMuZmlsdGVyKCh4KSA9PiB4LmRhdGEudGFnID09PSBcIlVuaXF1ZVwiKS5zb21lKCh4KSA9PiBjb2x1bW5TZXQuaXNTdWJzZXRPZihuZXcgU2V0KHguZGF0YS52YWx1ZS5jb2x1bW5zKSkpO1xuICAgIGNvbnN0IGlzUHJpbWFyeUtleSA9IGlzVW5pcXVlICYmIGNvbHVtbl9pZHMubGVuZ3RoID09PSB0YWJsZTIucHJpbWFyeUtleS5sZW5ndGggJiYgY29sdW1uX2lkcy5ldmVyeSgoaWQsIGkpID0+IHRhYmxlMi5wcmltYXJ5S2V5W2ldID09PSBpZCk7XG4gICAgY29uc3QgaW5kZXhTZXJpYWxpemVycyA9IGNvbHVtbl9pZHMubWFwKFxuICAgICAgKGlkKSA9PiBBbGdlYnJhaWNUeXBlLm1ha2VTZXJpYWxpemVyKFxuICAgICAgICByb3dUeXBlLnZhbHVlLmVsZW1lbnRzW2lkXS5hbGdlYnJhaWNUeXBlLFxuICAgICAgICB0eXBlc3BhY2VcbiAgICAgIClcbiAgICApO1xuICAgIGNvbnN0IHNlcmlhbGl6ZVBvaW50ID0gKGJ1ZmZlciwgY29sVmFsKSA9PiB7XG4gICAgICBCSU5BUllfV1JJVEVSLnJlc2V0KGJ1ZmZlcik7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvbHVtbnM7IGkrKykge1xuICAgICAgICBpbmRleFNlcmlhbGl6ZXJzW2ldKEJJTkFSWV9XUklURVIsIGNvbFZhbFtpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gQklOQVJZX1dSSVRFUi5vZmZzZXQ7XG4gICAgfTtcbiAgICBjb25zdCBzZXJpYWxpemVTaW5nbGVFbGVtZW50ID0gbnVtQ29sdW1ucyA9PT0gMSA/IGluZGV4U2VyaWFsaXplcnNbMF0gOiBudWxsO1xuICAgIGNvbnN0IHNlcmlhbGl6ZVNpbmdsZVBvaW50ID0gc2VyaWFsaXplU2luZ2xlRWxlbWVudCAmJiAoKGJ1ZmZlciwgY29sVmFsKSA9PiB7XG4gICAgICBCSU5BUllfV1JJVEVSLnJlc2V0KGJ1ZmZlcik7XG4gICAgICBzZXJpYWxpemVTaW5nbGVFbGVtZW50KEJJTkFSWV9XUklURVIsIGNvbFZhbCk7XG4gICAgICByZXR1cm4gQklOQVJZX1dSSVRFUi5vZmZzZXQ7XG4gICAgfSk7XG4gICAgbGV0IGluZGV4O1xuICAgIGlmIChpc1VuaXF1ZSAmJiBzZXJpYWxpemVTaW5nbGVQb2ludCkge1xuICAgICAgY29uc3QgYmFzZSA9IHtcbiAgICAgICAgZmluZDogKGNvbFZhbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgICAgIGNvbnN0IHBvaW50X2xlbiA9IHNlcmlhbGl6ZVNpbmdsZVBvaW50KGJ1ZiwgY29sVmFsKTtcbiAgICAgICAgICBjb25zdCBpdGVyX2lkID0gc3lzLmRhdGFzdG9yZV9pbmRleF9zY2FuX3BvaW50X2JzYXRuKFxuICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICBidWYuYnVmZmVyLFxuICAgICAgICAgICAgcG9pbnRfbGVuXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gdGFibGVJdGVyYXRlT25lKGl0ZXJfaWQsIGRlc2VyaWFsaXplUm93KTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlOiAoY29sVmFsKSA9PiB7XG4gICAgICAgICAgY29uc3QgYnVmID0gTEVBRl9CVUY7XG4gICAgICAgICAgY29uc3QgcG9pbnRfbGVuID0gc2VyaWFsaXplU2luZ2xlUG9pbnQoYnVmLCBjb2xWYWwpO1xuICAgICAgICAgIGNvbnN0IG51bSA9IHN5cy5kYXRhc3RvcmVfZGVsZXRlX2J5X2luZGV4X3NjYW5fcG9pbnRfYnNhdG4oXG4gICAgICAgICAgICBpbmRleF9pZCxcbiAgICAgICAgICAgIGJ1Zi5idWZmZXIsXG4gICAgICAgICAgICBwb2ludF9sZW5cbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBudW0gPiAwO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaWYgKGlzUHJpbWFyeUtleSkge1xuICAgICAgICBiYXNlLnVwZGF0ZSA9IChyb3cpID0+IHtcbiAgICAgICAgICBjb25zdCBidWYgPSBMRUFGX0JVRjtcbiAgICAgICAgICBCSU5BUllfV1JJVEVSLnJlc2V0KGJ1Zik7XG4gICAgICAgICAgc2VyaWFsaXplUm93KEJJTkFSWV9XUklURVIsIHJvdyk7XG4gICAgICAgICAgc3lzLmRhdGFzdG9yZV91cGRhdGVfYnNhdG4oXG4gICAgICAgICAgICB0YWJsZV9pZCxcbiAgICAgICAgICAgIGluZGV4X2lkLFxuICAgICAgICAgICAgYnVmLmJ1ZmZlcixcbiAgICAgICAgICAgIEJJTkFSWV9XUklURVIub2Zmc2V0XG4gICAgICAgICAgKTtcbiAgICAgICAgICBpbnRlZ3JhdGVHZW5lcmF0ZWRDb2x1bW5zPy4ocm93LCBidWYudmlldyk7XG4gICAgICAgICAgcmV0dXJuIHJvdztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGluZGV4ID0gYmFzZTtcbiAgICB9IGVsc2UgaWYgKGlzVW5pcXVlKSB7XG4gICAgICBjb25zdCBiYXNlID0ge1xuICAgICAgICBmaW5kOiAoY29sVmFsKSA9PiB7XG4gICAgICAgICAgaWYgKGNvbFZhbC5sZW5ndGggIT09IG51bUNvbHVtbnMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ3cm9uZyBudW1iZXIgb2YgZWxlbWVudHNcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgICAgIGNvbnN0IHBvaW50X2xlbiA9IHNlcmlhbGl6ZVBvaW50KGJ1ZiwgY29sVmFsKTtcbiAgICAgICAgICBjb25zdCBpdGVyX2lkID0gc3lzLmRhdGFzdG9yZV9pbmRleF9zY2FuX3BvaW50X2JzYXRuKFxuICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICBidWYuYnVmZmVyLFxuICAgICAgICAgICAgcG9pbnRfbGVuXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gdGFibGVJdGVyYXRlT25lKGl0ZXJfaWQsIGRlc2VyaWFsaXplUm93KTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlOiAoY29sVmFsKSA9PiB7XG4gICAgICAgICAgaWYgKGNvbFZhbC5sZW5ndGggIT09IG51bUNvbHVtbnMpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwid3JvbmcgbnVtYmVyIG9mIGVsZW1lbnRzXCIpO1xuICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgICAgIGNvbnN0IHBvaW50X2xlbiA9IHNlcmlhbGl6ZVBvaW50KGJ1ZiwgY29sVmFsKTtcbiAgICAgICAgICBjb25zdCBudW0gPSBzeXMuZGF0YXN0b3JlX2RlbGV0ZV9ieV9pbmRleF9zY2FuX3BvaW50X2JzYXRuKFxuICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICBidWYuYnVmZmVyLFxuICAgICAgICAgICAgcG9pbnRfbGVuXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gbnVtID4gMDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGlmIChpc1ByaW1hcnlLZXkpIHtcbiAgICAgICAgYmFzZS51cGRhdGUgPSAocm93KSA9PiB7XG4gICAgICAgICAgY29uc3QgYnVmID0gTEVBRl9CVUY7XG4gICAgICAgICAgQklOQVJZX1dSSVRFUi5yZXNldChidWYpO1xuICAgICAgICAgIHNlcmlhbGl6ZVJvdyhCSU5BUllfV1JJVEVSLCByb3cpO1xuICAgICAgICAgIHN5cy5kYXRhc3RvcmVfdXBkYXRlX2JzYXRuKFxuICAgICAgICAgICAgdGFibGVfaWQsXG4gICAgICAgICAgICBpbmRleF9pZCxcbiAgICAgICAgICAgIGJ1Zi5idWZmZXIsXG4gICAgICAgICAgICBCSU5BUllfV1JJVEVSLm9mZnNldFxuICAgICAgICAgICk7XG4gICAgICAgICAgaW50ZWdyYXRlR2VuZXJhdGVkQ29sdW1ucz8uKHJvdywgYnVmLnZpZXcpO1xuICAgICAgICAgIHJldHVybiByb3c7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpbmRleCA9IGJhc2U7XG4gICAgfSBlbHNlIGlmIChzZXJpYWxpemVTaW5nbGVQb2ludCkge1xuICAgICAgY29uc3QgcmF3SW5kZXggPSB7XG4gICAgICAgIGZpbHRlcjogKHJhbmdlKSA9PiB7XG4gICAgICAgICAgY29uc3QgYnVmID0gTEVBRl9CVUY7XG4gICAgICAgICAgY29uc3QgcG9pbnRfbGVuID0gc2VyaWFsaXplU2luZ2xlUG9pbnQoYnVmLCByYW5nZSk7XG4gICAgICAgICAgY29uc3QgaXRlcl9pZCA9IHN5cy5kYXRhc3RvcmVfaW5kZXhfc2Nhbl9wb2ludF9ic2F0bihcbiAgICAgICAgICAgIGluZGV4X2lkLFxuICAgICAgICAgICAgYnVmLmJ1ZmZlcixcbiAgICAgICAgICAgIHBvaW50X2xlblxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHRhYmxlSXRlcmF0b3IoaXRlcl9pZCwgZGVzZXJpYWxpemVSb3cpO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGU6IChyYW5nZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgICAgIGNvbnN0IHBvaW50X2xlbiA9IHNlcmlhbGl6ZVNpbmdsZVBvaW50KGJ1ZiwgcmFuZ2UpO1xuICAgICAgICAgIHJldHVybiBzeXMuZGF0YXN0b3JlX2RlbGV0ZV9ieV9pbmRleF9zY2FuX3BvaW50X2JzYXRuKFxuICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICBidWYuYnVmZmVyLFxuICAgICAgICAgICAgcG9pbnRfbGVuXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGlmIChpc0hhc2hJbmRleCkge1xuICAgICAgICBpbmRleCA9IHJhd0luZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSByYXdJbmRleDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzSGFzaEluZGV4KSB7XG4gICAgICBpbmRleCA9IHtcbiAgICAgICAgZmlsdGVyOiAocmFuZ2UpID0+IHtcbiAgICAgICAgICBjb25zdCBidWYgPSBMRUFGX0JVRjtcbiAgICAgICAgICBjb25zdCBwb2ludF9sZW4gPSBzZXJpYWxpemVQb2ludChidWYsIHJhbmdlKTtcbiAgICAgICAgICBjb25zdCBpdGVyX2lkID0gc3lzLmRhdGFzdG9yZV9pbmRleF9zY2FuX3BvaW50X2JzYXRuKFxuICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICBidWYuYnVmZmVyLFxuICAgICAgICAgICAgcG9pbnRfbGVuXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gdGFibGVJdGVyYXRvcihpdGVyX2lkLCBkZXNlcmlhbGl6ZVJvdyk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZTogKHJhbmdlKSA9PiB7XG4gICAgICAgICAgY29uc3QgYnVmID0gTEVBRl9CVUY7XG4gICAgICAgICAgY29uc3QgcG9pbnRfbGVuID0gc2VyaWFsaXplUG9pbnQoYnVmLCByYW5nZSk7XG4gICAgICAgICAgcmV0dXJuIHN5cy5kYXRhc3RvcmVfZGVsZXRlX2J5X2luZGV4X3NjYW5fcG9pbnRfYnNhdG4oXG4gICAgICAgICAgICBpbmRleF9pZCxcbiAgICAgICAgICAgIGJ1Zi5idWZmZXIsXG4gICAgICAgICAgICBwb2ludF9sZW5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZXJpYWxpemVSYW5nZSA9IChidWZmZXIsIHJhbmdlKSA9PiB7XG4gICAgICAgIGlmIChyYW5nZS5sZW5ndGggPiBudW1Db2x1bW5zKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwidG9vIG1hbnkgZWxlbWVudHNcIik7XG4gICAgICAgIEJJTkFSWV9XUklURVIucmVzZXQoYnVmZmVyKTtcbiAgICAgICAgY29uc3Qgd3JpdGVyID0gQklOQVJZX1dSSVRFUjtcbiAgICAgICAgY29uc3QgcHJlZml4X2VsZW1zID0gcmFuZ2UubGVuZ3RoIC0gMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVmaXhfZWxlbXM7IGkrKykge1xuICAgICAgICAgIGluZGV4U2VyaWFsaXplcnNbaV0od3JpdGVyLCByYW5nZVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcnN0YXJ0T2Zmc2V0ID0gd3JpdGVyLm9mZnNldDtcbiAgICAgICAgY29uc3QgdGVybSA9IHJhbmdlW3JhbmdlLmxlbmd0aCAtIDFdO1xuICAgICAgICBjb25zdCBzZXJpYWxpemVUZXJtID0gaW5kZXhTZXJpYWxpemVyc1tyYW5nZS5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKHRlcm0gaW5zdGFuY2VvZiBSYW5nZSkge1xuICAgICAgICAgIGNvbnN0IHdyaXRlQm91bmQgPSAoYm91bmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSB7IGluY2x1ZGVkOiAwLCBleGNsdWRlZDogMSwgdW5ib3VuZGVkOiAyIH07XG4gICAgICAgICAgICB3cml0ZXIud3JpdGVVOCh0YWdzW2JvdW5kLnRhZ10pO1xuICAgICAgICAgICAgaWYgKGJvdW5kLnRhZyAhPT0gXCJ1bmJvdW5kZWRcIikgc2VyaWFsaXplVGVybSh3cml0ZXIsIGJvdW5kLnZhbHVlKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHdyaXRlQm91bmQodGVybS5mcm9tKTtcbiAgICAgICAgICBjb25zdCByc3RhcnRMZW4gPSB3cml0ZXIub2Zmc2V0IC0gcnN0YXJ0T2Zmc2V0O1xuICAgICAgICAgIHdyaXRlQm91bmQodGVybS50byk7XG4gICAgICAgICAgY29uc3QgcmVuZExlbiA9IHdyaXRlci5vZmZzZXQgLSByc3RhcnRMZW47XG4gICAgICAgICAgcmV0dXJuIFtyc3RhcnRPZmZzZXQsIHByZWZpeF9lbGVtcywgcnN0YXJ0TGVuLCByZW5kTGVuXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3cml0ZXIud3JpdGVVOCgwKTtcbiAgICAgICAgICBzZXJpYWxpemVUZXJtKHdyaXRlciwgdGVybSk7XG4gICAgICAgICAgY29uc3QgcnN0YXJ0TGVuID0gd3JpdGVyLm9mZnNldDtcbiAgICAgICAgICBjb25zdCByZW5kTGVuID0gMDtcbiAgICAgICAgICByZXR1cm4gW3JzdGFydE9mZnNldCwgcHJlZml4X2VsZW1zLCByc3RhcnRMZW4sIHJlbmRMZW5dO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaW5kZXggPSB7XG4gICAgICAgIGZpbHRlcjogKHJhbmdlKSA9PiB7XG4gICAgICAgICAgaWYgKHJhbmdlLmxlbmd0aCA9PT0gbnVtQ29sdW1ucykge1xuICAgICAgICAgICAgY29uc3QgYnVmID0gTEVBRl9CVUY7XG4gICAgICAgICAgICBjb25zdCBwb2ludF9sZW4gPSBzZXJpYWxpemVQb2ludChidWYsIHJhbmdlKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZXJfaWQgPSBzeXMuZGF0YXN0b3JlX2luZGV4X3NjYW5fcG9pbnRfYnNhdG4oXG4gICAgICAgICAgICAgIGluZGV4X2lkLFxuICAgICAgICAgICAgICBidWYuYnVmZmVyLFxuICAgICAgICAgICAgICBwb2ludF9sZW5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gdGFibGVJdGVyYXRvcihpdGVyX2lkLCBkZXNlcmlhbGl6ZVJvdyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IHNlcmlhbGl6ZVJhbmdlKGJ1ZiwgcmFuZ2UpO1xuICAgICAgICAgICAgY29uc3QgaXRlcl9pZCA9IHN5cy5kYXRhc3RvcmVfaW5kZXhfc2Nhbl9yYW5nZV9ic2F0bihcbiAgICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICAgIGJ1Zi5idWZmZXIsXG4gICAgICAgICAgICAgIC4uLmFyZ3NcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gdGFibGVJdGVyYXRvcihpdGVyX2lkLCBkZXNlcmlhbGl6ZVJvdyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZWxldGU6IChyYW5nZSkgPT4ge1xuICAgICAgICAgIGlmIChyYW5nZS5sZW5ndGggPT09IG51bUNvbHVtbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgICAgICAgY29uc3QgcG9pbnRfbGVuID0gc2VyaWFsaXplUG9pbnQoYnVmLCByYW5nZSk7XG4gICAgICAgICAgICByZXR1cm4gc3lzLmRhdGFzdG9yZV9kZWxldGVfYnlfaW5kZXhfc2Nhbl9wb2ludF9ic2F0bihcbiAgICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICAgIGJ1Zi5idWZmZXIsXG4gICAgICAgICAgICAgIHBvaW50X2xlblxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYnVmID0gTEVBRl9CVUY7XG4gICAgICAgICAgICBjb25zdCBhcmdzID0gc2VyaWFsaXplUmFuZ2UoYnVmLCByYW5nZSk7XG4gICAgICAgICAgICByZXR1cm4gc3lzLmRhdGFzdG9yZV9kZWxldGVfYnlfaW5kZXhfc2Nhbl9yYW5nZV9ic2F0bihcbiAgICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICAgIGJ1Zi5idWZmZXIsXG4gICAgICAgICAgICAgIC4uLmFyZ3NcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoT2JqZWN0Lmhhc093bih0YWJsZVZpZXcsIGluZGV4RGVmLmFjY2Vzc29yTmFtZSkpIHtcbiAgICAgIGZyZWV6ZShPYmplY3QuYXNzaWduKHRhYmxlVmlld1tpbmRleERlZi5hY2Nlc3Nvck5hbWVdLCBpbmRleCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YWJsZVZpZXdbaW5kZXhEZWYuYWNjZXNzb3JOYW1lXSA9IGZyZWV6ZShpbmRleCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmcmVlemUodGFibGVWaWV3KTtcbn1cbmZ1bmN0aW9uKiB0YWJsZUl0ZXJhdG9yKGlkLCBkZXNlcmlhbGl6ZSkge1xuICB1c2luZyBpdGVyID0gbmV3IEl0ZXJhdG9ySGFuZGxlKGlkKTtcbiAgY29uc3QgaXRlckJ1ZiA9IHRha2VCdWYoKTtcbiAgdHJ5IHtcbiAgICBsZXQgYW10O1xuICAgIHdoaWxlIChhbXQgPSBpdGVyLmFkdmFuY2UoaXRlckJ1ZikpIHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBCaW5hcnlSZWFkZXIoaXRlckJ1Zi52aWV3KTtcbiAgICAgIHdoaWxlIChyZWFkZXIub2Zmc2V0IDwgYW10KSB7XG4gICAgICAgIHlpZWxkIGRlc2VyaWFsaXplKHJlYWRlcik7XG4gICAgICB9XG4gICAgfVxuICB9IGZpbmFsbHkge1xuICAgIHJldHVybkJ1ZihpdGVyQnVmKTtcbiAgfVxufVxuZnVuY3Rpb24gdGFibGVJdGVyYXRlT25lKGlkLCBkZXNlcmlhbGl6ZSkge1xuICBjb25zdCBidWYgPSBMRUFGX0JVRjtcbiAgY29uc3QgcmV0ID0gYWR2YW5jZUl0ZXJSYXcoaWQsIGJ1Zik7XG4gIGlmIChyZXQgIT09IDApIHtcbiAgICBCSU5BUllfUkVBREVSLnJlc2V0KGJ1Zi52aWV3KTtcbiAgICByZXR1cm4gZGVzZXJpYWxpemUoQklOQVJZX1JFQURFUik7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBhZHZhbmNlSXRlclJhdyhpZCwgYnVmKSB7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAwIHwgc3lzLnJvd19pdGVyX2JzYXRuX2FkdmFuY2UoaWQsIGJ1Zi5idWZmZXIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlICYmIHR5cGVvZiBlID09PSBcIm9iamVjdFwiICYmIGhhc093bihlLCBcIl9fYnVmZmVyX3Rvb19zbWFsbF9fXCIpKSB7XG4gICAgICAgIGJ1Zi5ncm93KGUuX19idWZmZXJfdG9vX3NtYWxsX18pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG59XG52YXIgREVGQVVMVF9CVUZGRVJfQ0FQQUNJVFkgPSAzMiAqIDEwMjQgKiAyO1xudmFyIElURVJfQlVGUyA9IFtcbiAgbmV3IFJlc2l6YWJsZUJ1ZmZlcihERUZBVUxUX0JVRkZFUl9DQVBBQ0lUWSlcbl07XG52YXIgSVRFUl9CVUZfQ09VTlQgPSAxO1xuZnVuY3Rpb24gdGFrZUJ1ZigpIHtcbiAgcmV0dXJuIElURVJfQlVGX0NPVU5UID8gSVRFUl9CVUZTWy0tSVRFUl9CVUZfQ09VTlRdIDogbmV3IFJlc2l6YWJsZUJ1ZmZlcihERUZBVUxUX0JVRkZFUl9DQVBBQ0lUWSk7XG59XG5mdW5jdGlvbiByZXR1cm5CdWYoYnVmKSB7XG4gIElURVJfQlVGU1tJVEVSX0JVRl9DT1VOVCsrXSA9IGJ1Zjtcbn1cbnZhciBMRUFGX0JVRiA9IG5ldyBSZXNpemFibGVCdWZmZXIoREVGQVVMVF9CVUZGRVJfQ0FQQUNJVFkpO1xudmFyIEl0ZXJhdG9ySGFuZGxlID0gY2xhc3MgX0l0ZXJhdG9ySGFuZGxlIHtcbiAgI2lkO1xuICBzdGF0aWMgI2ZpbmFsaXphdGlvblJlZ2lzdHJ5ID0gbmV3IEZpbmFsaXphdGlvblJlZ2lzdHJ5KFxuICAgIHN5cy5yb3dfaXRlcl9ic2F0bl9jbG9zZVxuICApO1xuICBjb25zdHJ1Y3RvcihpZCkge1xuICAgIHRoaXMuI2lkID0gaWQ7XG4gICAgX0l0ZXJhdG9ySGFuZGxlLiNmaW5hbGl6YXRpb25SZWdpc3RyeS5yZWdpc3Rlcih0aGlzLCBpZCwgdGhpcyk7XG4gIH1cbiAgLyoqIFVucmVnaXN0ZXIgdGhpcyBvYmplY3Qgd2l0aCB0aGUgZmluYWxpemF0aW9uIHJlZ2lzdHJ5IGFuZCByZXR1cm4gdGhlIGlkICovXG4gICNkZXRhY2goKSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLiNpZDtcbiAgICB0aGlzLiNpZCA9IC0xO1xuICAgIF9JdGVyYXRvckhhbmRsZS4jZmluYWxpemF0aW9uUmVnaXN0cnkudW5yZWdpc3Rlcih0aGlzKTtcbiAgICByZXR1cm4gaWQ7XG4gIH1cbiAgLyoqIENhbGwgYHJvd19pdGVyX2JzYXRuX2FkdmFuY2VgLCByZXR1cm5pbmcgMCBpZiB0aGlzIGl0ZXJhdG9yIGhhcyBiZWVuIGV4aGF1c3RlZC4gKi9cbiAgYWR2YW5jZShidWYpIHtcbiAgICBpZiAodGhpcy4jaWQgPT09IC0xKSByZXR1cm4gMDtcbiAgICBjb25zdCByZXQgPSBhZHZhbmNlSXRlclJhdyh0aGlzLiNpZCwgYnVmKTtcbiAgICBpZiAocmV0IDw9IDApIHRoaXMuI2RldGFjaCgpO1xuICAgIHJldHVybiByZXQgPCAwID8gLXJldCA6IHJldDtcbiAgfVxuICBbU3ltYm9sLmRpc3Bvc2VdKCkge1xuICAgIGlmICh0aGlzLiNpZCA+PSAwKSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuI2RldGFjaCgpO1xuICAgICAgc3lzLnJvd19pdGVyX2JzYXRuX2Nsb3NlKGlkKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIHNyYy9zZXJ2ZXIvaHR0cF9pbnRlcm5hbC50c1xudmFyIHsgZnJlZXplOiBmcmVlemUyIH0gPSBPYmplY3Q7XG52YXIgdGV4dEVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbnZhciB0ZXh0RGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcihcbiAgXCJ1dGYtOFwiXG4gIC8qIHsgZmF0YWw6IHRydWUgfSAqL1xuKTtcbnZhciBtYWtlUmVzcG9uc2UgPSBTeW1ib2woXCJtYWtlUmVzcG9uc2VcIik7XG52YXIgU3luY1Jlc3BvbnNlID0gY2xhc3MgX1N5bmNSZXNwb25zZSB7XG4gICNib2R5O1xuICAjaW5uZXI7XG4gIGNvbnN0cnVjdG9yKGJvZHksIGluaXQpIHtcbiAgICBpZiAoYm9keSA9PSBudWxsKSB7XG4gICAgICB0aGlzLiNib2R5ID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLiNib2R5ID0gYm9keTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4jYm9keSA9IG5ldyBVaW50OEFycmF5KGJvZHkpLmJ1ZmZlcjtcbiAgICB9XG4gICAgdGhpcy4jaW5uZXIgPSB7XG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyhpbml0Py5oZWFkZXJzKSxcbiAgICAgIHN0YXR1czogaW5pdD8uc3RhdHVzID8/IDIwMCxcbiAgICAgIHN0YXR1c1RleHQ6IGluaXQ/LnN0YXR1c1RleHQgPz8gXCJcIixcbiAgICAgIHR5cGU6IFwiZGVmYXVsdFwiLFxuICAgICAgdXJsOiBudWxsLFxuICAgICAgYWJvcnRlZDogZmFsc2VcbiAgICB9O1xuICB9XG4gIHN0YXRpYyBbbWFrZVJlc3BvbnNlXShib2R5LCBpbm5lcikge1xuICAgIGNvbnN0IG1lID0gbmV3IF9TeW5jUmVzcG9uc2UoYm9keSk7XG4gICAgbWUuI2lubmVyID0gaW5uZXI7XG4gICAgcmV0dXJuIG1lO1xuICB9XG4gIGdldCBoZWFkZXJzKCkge1xuICAgIHJldHVybiB0aGlzLiNpbm5lci5oZWFkZXJzO1xuICB9XG4gIGdldCBzdGF0dXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2lubmVyLnN0YXR1cztcbiAgfVxuICBnZXQgc3RhdHVzVGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy4jaW5uZXIuc3RhdHVzVGV4dDtcbiAgfVxuICBnZXQgb2soKSB7XG4gICAgcmV0dXJuIDIwMCA8PSB0aGlzLiNpbm5lci5zdGF0dXMgJiYgdGhpcy4jaW5uZXIuc3RhdHVzIDw9IDI5OTtcbiAgfVxuICBnZXQgdXJsKCkge1xuICAgIHJldHVybiB0aGlzLiNpbm5lci51cmwgPz8gXCJcIjtcbiAgfVxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy4jaW5uZXIudHlwZTtcbiAgfVxuICBhcnJheUJ1ZmZlcigpIHtcbiAgICByZXR1cm4gdGhpcy5ieXRlcygpLmJ1ZmZlcjtcbiAgfVxuICBieXRlcygpIHtcbiAgICBpZiAodGhpcy4jYm9keSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLiNib2R5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gdGV4dEVuY29kZXIuZW5jb2RlKHRoaXMuI2JvZHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodGhpcy4jYm9keSk7XG4gICAgfVxuICB9XG4gIGpzb24oKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy50ZXh0KCkpO1xuICB9XG4gIHRleHQoKSB7XG4gICAgaWYgKHRoaXMuI2JvZHkgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy4jYm9keSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIHRoaXMuI2JvZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0ZXh0RGVjb2Rlci5kZWNvZGUodGhpcy4jYm9keSk7XG4gICAgfVxuICB9XG59O1xudmFyIHJlcXVlc3RCYXNlU2l6ZSA9IGJzYXRuQmFzZVNpemUoeyB0eXBlczogW10gfSwgSHR0cFJlcXVlc3QuYWxnZWJyYWljVHlwZSk7XG52YXIgbWV0aG9kcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKFtcbiAgW1wiR0VUXCIsIHsgdGFnOiBcIkdldFwiIH1dLFxuICBbXCJIRUFEXCIsIHsgdGFnOiBcIkhlYWRcIiB9XSxcbiAgW1wiUE9TVFwiLCB7IHRhZzogXCJQb3N0XCIgfV0sXG4gIFtcIlBVVFwiLCB7IHRhZzogXCJQdXRcIiB9XSxcbiAgW1wiREVMRVRFXCIsIHsgdGFnOiBcIkRlbGV0ZVwiIH1dLFxuICBbXCJDT05ORUNUXCIsIHsgdGFnOiBcIkNvbm5lY3RcIiB9XSxcbiAgW1wiT1BUSU9OU1wiLCB7IHRhZzogXCJPcHRpb25zXCIgfV0sXG4gIFtcIlRSQUNFXCIsIHsgdGFnOiBcIlRyYWNlXCIgfV0sXG4gIFtcIlBBVENIXCIsIHsgdGFnOiBcIlBhdGNoXCIgfV1cbl0pO1xuZnVuY3Rpb24gZmV0Y2godXJsLCBpbml0ID0ge30pIHtcbiAgY29uc3QgbWV0aG9kID0gbWV0aG9kcy5nZXQoaW5pdC5tZXRob2Q/LnRvVXBwZXJDYXNlKCkgPz8gXCJHRVRcIikgPz8ge1xuICAgIHRhZzogXCJFeHRlbnNpb25cIixcbiAgICB2YWx1ZTogaW5pdC5tZXRob2RcbiAgfTtcbiAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAvLyBhbnlzIGJlY2F1c2UgdGhlIHR5cGluZ3MgYXJlIHdvbmt5IC0gc2VlIGNvbW1lbnQgaW4gU3luY1Jlc3BvbnNlLmNvbnN0cnVjdG9yXG4gICAgZW50cmllczogaGVhZGVyc1RvTGlzdChuZXcgSGVhZGVycyhpbml0LmhlYWRlcnMpKS5mbGF0TWFwKChbaywgdl0pID0+IEFycmF5LmlzQXJyYXkodikgPyB2Lm1hcCgodjIpID0+IFtrLCB2Ml0pIDogW1trLCB2XV0pLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gKHsgbmFtZSwgdmFsdWU6IHRleHRFbmNvZGVyLmVuY29kZSh2YWx1ZSkgfSkpXG4gIH07XG4gIGNvbnN0IHVyaSA9IFwiXCIgKyB1cmw7XG4gIGNvbnN0IHJlcXVlc3QgPSBmcmVlemUyKHtcbiAgICBtZXRob2QsXG4gICAgaGVhZGVycyxcbiAgICB0aW1lb3V0OiBpbml0LnRpbWVvdXQsXG4gICAgdXJpLFxuICAgIHZlcnNpb246IHsgdGFnOiBcIkh0dHAxMVwiIH1cbiAgfSk7XG4gIGNvbnN0IHJlcXVlc3RCdWYgPSBuZXcgQmluYXJ5V3JpdGVyKHJlcXVlc3RCYXNlU2l6ZSk7XG4gIEh0dHBSZXF1ZXN0LnNlcmlhbGl6ZShyZXF1ZXN0QnVmLCByZXF1ZXN0KTtcbiAgY29uc3QgYm9keSA9IGluaXQuYm9keSA9PSBudWxsID8gbmV3IFVpbnQ4QXJyYXkoKSA6IHR5cGVvZiBpbml0LmJvZHkgPT09IFwic3RyaW5nXCIgPyBpbml0LmJvZHkgOiBuZXcgVWludDhBcnJheShpbml0LmJvZHkpO1xuICBjb25zdCBbcmVzcG9uc2VCdWYsIHJlc3BvbnNlQm9keV0gPSBzeXMucHJvY2VkdXJlX2h0dHBfcmVxdWVzdChcbiAgICByZXF1ZXN0QnVmLmdldEJ1ZmZlcigpLFxuICAgIGJvZHlcbiAgKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBIdHRwUmVzcG9uc2UuZGVzZXJpYWxpemUobmV3IEJpbmFyeVJlYWRlcihyZXNwb25zZUJ1ZikpO1xuICByZXR1cm4gU3luY1Jlc3BvbnNlW21ha2VSZXNwb25zZV0ocmVzcG9uc2VCb2R5LCB7XG4gICAgdHlwZTogXCJiYXNpY1wiLFxuICAgIHVybDogdXJpLFxuICAgIHN0YXR1czogcmVzcG9uc2UuY29kZSxcbiAgICBzdGF0dXNUZXh0OiAoMCwgaW1wb3J0X3N0YXR1c2VzLmRlZmF1bHQpKHJlc3BvbnNlLmNvZGUpLFxuICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKCksXG4gICAgYWJvcnRlZDogZmFsc2VcbiAgfSk7XG59XG5mcmVlemUyKGZldGNoKTtcbnZhciBodHRwQ2xpZW50ID0gZnJlZXplMih7IGZldGNoIH0pO1xuXG4vLyBzcmMvc2VydmVyL3Byb2NlZHVyZXMudHNcbmZ1bmN0aW9uIG1ha2VQcm9jZWR1cmVFeHBvcnQoY3R4LCBvcHRzLCBwYXJhbXMsIHJldCwgZm4pIHtcbiAgY29uc3QgbmFtZSA9IG9wdHM/Lm5hbWU7XG4gIGNvbnN0IHByb2NlZHVyZUV4cG9ydCA9ICguLi5hcmdzKSA9PiBmbiguLi5hcmdzKTtcbiAgcHJvY2VkdXJlRXhwb3J0W2V4cG9ydENvbnRleHRdID0gY3R4O1xuICBwcm9jZWR1cmVFeHBvcnRbcmVnaXN0ZXJFeHBvcnRdID0gKGN0eDIsIGV4cG9ydE5hbWUpID0+IHtcbiAgICByZWdpc3RlclByb2NlZHVyZShjdHgyLCBuYW1lID8/IGV4cG9ydE5hbWUsIHBhcmFtcywgcmV0LCBmbik7XG4gICAgY3R4Mi5mdW5jdGlvbkV4cG9ydHMuc2V0KFxuICAgICAgcHJvY2VkdXJlRXhwb3J0LFxuICAgICAgbmFtZSA/PyBleHBvcnROYW1lXG4gICAgKTtcbiAgfTtcbiAgcmV0dXJuIHByb2NlZHVyZUV4cG9ydDtcbn1cbnZhciBUcmFuc2FjdGlvbkN0eEltcGwgPSBjbGFzcyBUcmFuc2FjdGlvbkN0eCBleHRlbmRzIFJlZHVjZXJDdHhJbXBsIHtcbn07XG5mdW5jdGlvbiByZWdpc3RlclByb2NlZHVyZShjdHgsIGV4cG9ydE5hbWUsIHBhcmFtcywgcmV0LCBmbiwgb3B0cykge1xuICBjdHguZGVmaW5lRnVuY3Rpb24oZXhwb3J0TmFtZSk7XG4gIGNvbnN0IHBhcmFtc1R5cGUgPSB7XG4gICAgZWxlbWVudHM6IE9iamVjdC5lbnRyaWVzKHBhcmFtcykubWFwKChbbiwgY10pID0+ICh7XG4gICAgICBuYW1lOiBuLFxuICAgICAgYWxnZWJyYWljVHlwZTogY3R4LnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseShcbiAgICAgICAgXCJ0eXBlQnVpbGRlclwiIGluIGMgPyBjLnR5cGVCdWlsZGVyIDogY1xuICAgICAgKS5hbGdlYnJhaWNUeXBlXG4gICAgfSkpXG4gIH07XG4gIGNvbnN0IHJldHVyblR5cGUgPSBjdHgucmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHJldCkuYWxnZWJyYWljVHlwZTtcbiAgY3R4Lm1vZHVsZURlZi5wcm9jZWR1cmVzLnB1c2goe1xuICAgIHNvdXJjZU5hbWU6IGV4cG9ydE5hbWUsXG4gICAgcGFyYW1zOiBwYXJhbXNUeXBlLFxuICAgIHJldHVyblR5cGUsXG4gICAgdmlzaWJpbGl0eTogRnVuY3Rpb25WaXNpYmlsaXR5LkNsaWVudENhbGxhYmxlXG4gIH0pO1xuICBjb25zdCB7IHR5cGVzcGFjZSB9ID0gY3R4O1xuICBjdHgucHJvY2VkdXJlcy5wdXNoKHtcbiAgICBmbixcbiAgICBkZXNlcmlhbGl6ZUFyZ3M6IFByb2R1Y3RUeXBlLm1ha2VEZXNlcmlhbGl6ZXIocGFyYW1zVHlwZSwgdHlwZXNwYWNlKSxcbiAgICBzZXJpYWxpemVSZXR1cm46IEFsZ2VicmFpY1R5cGUubWFrZVNlcmlhbGl6ZXIocmV0dXJuVHlwZSwgdHlwZXNwYWNlKSxcbiAgICByZXR1cm5UeXBlQmFzZVNpemU6IGJzYXRuQmFzZVNpemUodHlwZXNwYWNlLCByZXR1cm5UeXBlKVxuICB9KTtcbn1cbmZ1bmN0aW9uIGNhbGxQcm9jZWR1cmUobW9kdWxlQ3R4LCBpZCwgc2VuZGVyLCBjb25uZWN0aW9uSWQsIHRpbWVzdGFtcCwgYXJnc0J1ZiwgZGJWaWV3KSB7XG4gIGNvbnN0IHsgZm4sIGRlc2VyaWFsaXplQXJncywgc2VyaWFsaXplUmV0dXJuLCByZXR1cm5UeXBlQmFzZVNpemUgfSA9IG1vZHVsZUN0eC5wcm9jZWR1cmVzW2lkXTtcbiAgY29uc3QgYXJncyA9IGRlc2VyaWFsaXplQXJncyhuZXcgQmluYXJ5UmVhZGVyKGFyZ3NCdWYpKTtcbiAgY29uc3QgY3R4ID0gbmV3IFByb2NlZHVyZUN0eEltcGwoXG4gICAgc2VuZGVyLFxuICAgIHRpbWVzdGFtcCxcbiAgICBjb25uZWN0aW9uSWQsXG4gICAgZGJWaWV3XG4gICk7XG4gIGNvbnN0IHJldCA9IGNhbGxVc2VyRnVuY3Rpb24oZm4sIGN0eCwgYXJncyk7XG4gIGNvbnN0IHJldEJ1ZiA9IG5ldyBCaW5hcnlXcml0ZXIocmV0dXJuVHlwZUJhc2VTaXplKTtcbiAgc2VyaWFsaXplUmV0dXJuKHJldEJ1ZiwgcmV0KTtcbiAgcmV0dXJuIHJldEJ1Zi5nZXRCdWZmZXIoKTtcbn1cbnZhciBQcm9jZWR1cmVDdHhJbXBsID0gY2xhc3MgUHJvY2VkdXJlQ3R4IHtcbiAgY29uc3RydWN0b3Ioc2VuZGVyLCB0aW1lc3RhbXAsIGNvbm5lY3Rpb25JZCwgZGJWaWV3KSB7XG4gICAgdGhpcy5zZW5kZXIgPSBzZW5kZXI7XG4gICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgdGhpcy5jb25uZWN0aW9uSWQgPSBjb25uZWN0aW9uSWQ7XG4gICAgdGhpcy4jZGJWaWV3ID0gZGJWaWV3O1xuICB9XG4gICNpZGVudGl0eTtcbiAgI3V1aWRDb3VudGVyO1xuICAjcmFuZG9tO1xuICAjZGJWaWV3O1xuICBnZXQgaWRlbnRpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2lkZW50aXR5ID8/PSBuZXcgSWRlbnRpdHkoc3lzLmlkZW50aXR5KCkpO1xuICB9XG4gIGdldCByYW5kb20oKSB7XG4gICAgcmV0dXJuIHRoaXMuI3JhbmRvbSA/Pz0gbWFrZVJhbmRvbSh0aGlzLnRpbWVzdGFtcCk7XG4gIH1cbiAgZ2V0IGh0dHAoKSB7XG4gICAgcmV0dXJuIGh0dHBDbGllbnQ7XG4gIH1cbiAgd2l0aFR4KGJvZHkpIHtcbiAgICBjb25zdCBydW4gPSAoKSA9PiB7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBzeXMucHJvY2VkdXJlX3N0YXJ0X211dF90eCgpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY3R4ID0gbmV3IFRyYW5zYWN0aW9uQ3R4SW1wbChcbiAgICAgICAgICB0aGlzLnNlbmRlcixcbiAgICAgICAgICBuZXcgVGltZXN0YW1wKHRpbWVzdGFtcCksXG4gICAgICAgICAgdGhpcy5jb25uZWN0aW9uSWQsXG4gICAgICAgICAgdGhpcy4jZGJWaWV3KClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGJvZHkoY3R4KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgc3lzLnByb2NlZHVyZV9hYm9ydF9tdXRfdHgoKTtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGxldCByZXMgPSBydW4oKTtcbiAgICB0cnkge1xuICAgICAgc3lzLnByb2NlZHVyZV9jb21taXRfbXV0X3R4KCk7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gY2F0Y2gge1xuICAgIH1cbiAgICBjb25zb2xlLndhcm4oXCJjb21taXR0aW5nIGFub255bW91cyB0cmFuc2FjdGlvbiBmYWlsZWRcIik7XG4gICAgcmVzID0gcnVuKCk7XG4gICAgdHJ5IHtcbiAgICAgIHN5cy5wcm9jZWR1cmVfY29tbWl0X211dF90eCgpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cmFuc2FjdGlvbiByZXRyeSBmYWlsZWQgYWdhaW5cIiwgeyBjYXVzZTogZSB9KTtcbiAgICB9XG4gIH1cbiAgbmV3VXVpZFY0KCkge1xuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy5yYW5kb20uZmlsbChuZXcgVWludDhBcnJheSgxNikpO1xuICAgIHJldHVybiBVdWlkLmZyb21SYW5kb21CeXRlc1Y0KGJ5dGVzKTtcbiAgfVxuICBuZXdVdWlkVjcoKSB7XG4gICAgY29uc3QgYnl0ZXMgPSB0aGlzLnJhbmRvbS5maWxsKG5ldyBVaW50OEFycmF5KDQpKTtcbiAgICBjb25zdCBjb3VudGVyID0gdGhpcy4jdXVpZENvdW50ZXIgPz89IHsgdmFsdWU6IDAgfTtcbiAgICByZXR1cm4gVXVpZC5mcm9tQ291bnRlclY3KGNvdW50ZXIsIHRoaXMudGltZXN0YW1wLCBieXRlcyk7XG4gIH1cbn07XG5cbi8vIHNyYy9zZXJ2ZXIvcmVkdWNlcnMudHNcbmZ1bmN0aW9uIG1ha2VSZWR1Y2VyRXhwb3J0KGN0eCwgb3B0cywgcGFyYW1zLCBmbiwgbGlmZWN5Y2xlKSB7XG4gIGNvbnN0IHJlZHVjZXJFeHBvcnQgPSAoLi4uYXJncykgPT4gZm4oLi4uYXJncyk7XG4gIHJlZHVjZXJFeHBvcnRbZXhwb3J0Q29udGV4dF0gPSBjdHg7XG4gIHJlZHVjZXJFeHBvcnRbcmVnaXN0ZXJFeHBvcnRdID0gKGN0eDIsIGV4cG9ydE5hbWUpID0+IHtcbiAgICByZWdpc3RlclJlZHVjZXIoY3R4MiwgZXhwb3J0TmFtZSwgcGFyYW1zLCBmbiwgb3B0cywgbGlmZWN5Y2xlKTtcbiAgICBjdHgyLmZ1bmN0aW9uRXhwb3J0cy5zZXQoXG4gICAgICByZWR1Y2VyRXhwb3J0LFxuICAgICAgZXhwb3J0TmFtZVxuICAgICk7XG4gIH07XG4gIHJldHVybiByZWR1Y2VyRXhwb3J0O1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJSZWR1Y2VyKGN0eCwgZXhwb3J0TmFtZSwgcGFyYW1zLCBmbiwgb3B0cywgbGlmZWN5Y2xlKSB7XG4gIGN0eC5kZWZpbmVGdW5jdGlvbihleHBvcnROYW1lKTtcbiAgaWYgKCEocGFyYW1zIGluc3RhbmNlb2YgUm93QnVpbGRlcikpIHtcbiAgICBwYXJhbXMgPSBuZXcgUm93QnVpbGRlcihwYXJhbXMpO1xuICB9XG4gIGlmIChwYXJhbXMudHlwZU5hbWUgPT09IHZvaWQgMCkge1xuICAgIHBhcmFtcy50eXBlTmFtZSA9IHRvUGFzY2FsQ2FzZShleHBvcnROYW1lKTtcbiAgfVxuICBjb25zdCByZWYgPSBjdHgucmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHBhcmFtcyk7XG4gIGNvbnN0IHBhcmFtc1R5cGUgPSBjdHgucmVzb2x2ZVR5cGUocmVmKS52YWx1ZTtcbiAgY29uc3QgaXNMaWZlY3ljbGUgPSBsaWZlY3ljbGUgIT0gbnVsbDtcbiAgY3R4Lm1vZHVsZURlZi5yZWR1Y2Vycy5wdXNoKHtcbiAgICBzb3VyY2VOYW1lOiBleHBvcnROYW1lLFxuICAgIHBhcmFtczogcGFyYW1zVHlwZSxcbiAgICAvL01vZHVsZURlZiB2YWxpZGF0aW9uIGNvZGUgaXMgcmVzcG9uc2libGUgdG8gbWFyayBwcml2YXRlIHJlZHVjZXJzXG4gICAgdmlzaWJpbGl0eTogRnVuY3Rpb25WaXNpYmlsaXR5LkNsaWVudENhbGxhYmxlLFxuICAgIC8vSGFyZGNvZGVkIGZvciBub3cgLSByZWR1Y2VycyBkbyBub3QgcmV0dXJuIHZhbHVlcyB5ZXRcbiAgICBva1JldHVyblR5cGU6IEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7IGVsZW1lbnRzOiBbXSB9KSxcbiAgICBlcnJSZXR1cm5UeXBlOiBBbGdlYnJhaWNUeXBlLlN0cmluZ1xuICB9KTtcbiAgaWYgKG9wdHM/Lm5hbWUgIT0gbnVsbCkge1xuICAgIGN0eC5tb2R1bGVEZWYuZXhwbGljaXROYW1lcy5lbnRyaWVzLnB1c2goe1xuICAgICAgdGFnOiBcIkZ1bmN0aW9uXCIsXG4gICAgICB2YWx1ZToge1xuICAgICAgICBzb3VyY2VOYW1lOiBleHBvcnROYW1lLFxuICAgICAgICBjYW5vbmljYWxOYW1lOiBvcHRzLm5hbWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBpZiAoaXNMaWZlY3ljbGUpIHtcbiAgICBjdHgubW9kdWxlRGVmLmxpZmVDeWNsZVJlZHVjZXJzLnB1c2goe1xuICAgICAgbGlmZWN5Y2xlU3BlYzogbGlmZWN5Y2xlLFxuICAgICAgZnVuY3Rpb25OYW1lOiBleHBvcnROYW1lXG4gICAgfSk7XG4gIH1cbiAgaWYgKCFmbi5uYW1lKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcIm5hbWVcIiwgeyB2YWx1ZTogZXhwb3J0TmFtZSwgd3JpdGFibGU6IGZhbHNlIH0pO1xuICB9XG4gIGN0eC5yZWR1Y2Vycy5wdXNoKGZuKTtcbn1cblxuLy8gc3JjL3NlcnZlci9zY2hlbWEudHNcbnZhciBTY2hlbWFJbm5lciA9IGNsYXNzIGV4dGVuZHMgTW9kdWxlQ29udGV4dCB7XG4gIHNjaGVtYVR5cGU7XG4gIGV4aXN0aW5nRnVuY3Rpb25zID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKTtcbiAgcmVkdWNlcnMgPSBbXTtcbiAgcHJvY2VkdXJlcyA9IFtdO1xuICB2aWV3cyA9IFtdO1xuICBhbm9uVmlld3MgPSBbXTtcbiAgLyoqXG4gICAqIE1hcHMgUmVkdWNlckV4cG9ydCBvYmplY3RzIHRvIHRoZSBuYW1lIG9mIHRoZSByZWR1Y2VyLlxuICAgKiBVc2VkIGZvciByZXNvbHZpbmcgdGhlIHJlZHVjZXJzIG9mIHNjaGVkdWxlZCB0YWJsZXMuXG4gICAqL1xuICBmdW5jdGlvbkV4cG9ydHMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICBwZW5kaW5nU2NoZWR1bGVzID0gW107XG4gIGNvbnN0cnVjdG9yKGdldFNjaGVtYVR5cGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2NoZW1hVHlwZSA9IGdldFNjaGVtYVR5cGUodGhpcyk7XG4gIH1cbiAgZGVmaW5lRnVuY3Rpb24obmFtZSkge1xuICAgIGlmICh0aGlzLmV4aXN0aW5nRnVuY3Rpb25zLmhhcyhuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgYFRoZXJlIGlzIGFscmVhZHkgYSByZWR1Y2VyIG9yIHByb2NlZHVyZSB3aXRoIHRoZSBuYW1lICcke25hbWV9J2BcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuZXhpc3RpbmdGdW5jdGlvbnMuYWRkKG5hbWUpO1xuICB9XG4gIHJlc29sdmVTY2hlZHVsZXMoKSB7XG4gICAgZm9yIChjb25zdCB7IHJlZHVjZXIsIHNjaGVkdWxlQXRDb2wsIHRhYmxlTmFtZSB9IG9mIHRoaXMucGVuZGluZ1NjaGVkdWxlcykge1xuICAgICAgY29uc3QgZnVuY3Rpb25OYW1lID0gdGhpcy5mdW5jdGlvbkV4cG9ydHMuZ2V0KHJlZHVjZXIoKSk7XG4gICAgICBpZiAoZnVuY3Rpb25OYW1lID09PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3QgbXNnID0gYFRhYmxlICR7dGFibGVOYW1lfSBkZWZpbmVzIGEgc2NoZWR1bGUsIGJ1dCBpdCBzZWVtcyBsaWtlIHRoZSBhc3NvY2lhdGVkIGZ1bmN0aW9uIHdhcyBub3QgZXhwb3J0ZWQuYDtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihtc2cpO1xuICAgICAgfVxuICAgICAgdGhpcy5tb2R1bGVEZWYuc2NoZWR1bGVzLnB1c2goe1xuICAgICAgICBzb3VyY2VOYW1lOiB2b2lkIDAsXG4gICAgICAgIHRhYmxlTmFtZSxcbiAgICAgICAgc2NoZWR1bGVBdENvbCxcbiAgICAgICAgZnVuY3Rpb25OYW1lXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG52YXIgU2NoZW1hID0gY2xhc3Mge1xuICAjY3R4O1xuICBjb25zdHJ1Y3RvcihjdHgpIHtcbiAgICB0aGlzLiNjdHggPSBjdHg7XG4gIH1cbiAgW21vZHVsZUhvb2tzXShleHBvcnRzKSB7XG4gICAgY29uc3QgcmVnaXN0ZXJlZFNjaGVtYSA9IHRoaXMuI2N0eDtcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCBtb2R1bGVFeHBvcnRdIG9mIE9iamVjdC5lbnRyaWVzKGV4cG9ydHMpKSB7XG4gICAgICBpZiAobmFtZSA9PT0gXCJkZWZhdWx0XCIpIGNvbnRpbnVlO1xuICAgICAgaWYgKCFpc01vZHVsZUV4cG9ydChtb2R1bGVFeHBvcnQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJleHBvcnRpbmcgc29tZXRoaW5nIHRoYXQgaXMgbm90IGEgc3BhY2V0aW1lIGV4cG9ydFwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjaGVja0V4cG9ydENvbnRleHQobW9kdWxlRXhwb3J0LCByZWdpc3RlcmVkU2NoZW1hKTtcbiAgICAgIG1vZHVsZUV4cG9ydFtyZWdpc3RlckV4cG9ydF0ocmVnaXN0ZXJlZFNjaGVtYSwgbmFtZSk7XG4gICAgfVxuICAgIHJlZ2lzdGVyZWRTY2hlbWEucmVzb2x2ZVNjaGVkdWxlcygpO1xuICAgIHJldHVybiBtYWtlSG9va3MocmVnaXN0ZXJlZFNjaGVtYSk7XG4gIH1cbiAgZ2V0IHNjaGVtYVR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2N0eC5zY2hlbWFUeXBlO1xuICB9XG4gIGdldCBtb2R1bGVEZWYoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2N0eC5tb2R1bGVEZWY7XG4gIH1cbiAgZ2V0IHR5cGVzcGFjZSgpIHtcbiAgICByZXR1cm4gdGhpcy4jY3R4LnR5cGVzcGFjZTtcbiAgfVxuICByZWR1Y2VyKC4uLmFyZ3MpIHtcbiAgICBsZXQgb3B0cywgcGFyYW1zID0ge30sIGZuO1xuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgW2ZuXSA9IGFyZ3M7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOiB7XG4gICAgICAgIGxldCBhcmcxO1xuICAgICAgICBbYXJnMSwgZm5dID0gYXJncztcbiAgICAgICAgaWYgKHR5cGVvZiBhcmcxLm5hbWUgPT09IFwic3RyaW5nXCIpIG9wdHMgPSBhcmcxO1xuICAgICAgICBlbHNlIHBhcmFtcyA9IGFyZzE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAzOlxuICAgICAgICBbb3B0cywgcGFyYW1zLCBmbl0gPSBhcmdzO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VSZWR1Y2VyRXhwb3J0KHRoaXMuI2N0eCwgb3B0cywgcGFyYW1zLCBmbik7XG4gIH1cbiAgaW5pdCguLi5hcmdzKSB7XG4gICAgbGV0IG9wdHMsIGZuO1xuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgW2ZuXSA9IGFyZ3M7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBbb3B0cywgZm5dID0gYXJncztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBtYWtlUmVkdWNlckV4cG9ydCh0aGlzLiNjdHgsIG9wdHMsIHt9LCBmbiwgTGlmZWN5Y2xlLkluaXQpO1xuICB9XG4gIGNsaWVudENvbm5lY3RlZCguLi5hcmdzKSB7XG4gICAgbGV0IG9wdHMsIGZuO1xuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgW2ZuXSA9IGFyZ3M7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBbb3B0cywgZm5dID0gYXJncztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBtYWtlUmVkdWNlckV4cG9ydCh0aGlzLiNjdHgsIG9wdHMsIHt9LCBmbiwgTGlmZWN5Y2xlLk9uQ29ubmVjdCk7XG4gIH1cbiAgY2xpZW50RGlzY29ubmVjdGVkKC4uLmFyZ3MpIHtcbiAgICBsZXQgb3B0cywgZm47XG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBbZm5dID0gYXJncztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIFtvcHRzLCBmbl0gPSBhcmdzO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VSZWR1Y2VyRXhwb3J0KHRoaXMuI2N0eCwgb3B0cywge30sIGZuLCBMaWZlY3ljbGUuT25EaXNjb25uZWN0KTtcbiAgfVxuICB2aWV3KG9wdHMsIHJldCwgZm4pIHtcbiAgICByZXR1cm4gbWFrZVZpZXdFeHBvcnQodGhpcy4jY3R4LCBvcHRzLCB7fSwgcmV0LCBmbik7XG4gIH1cbiAgLy8gVE9ETzogcmUtZW5hYmxlIG9uY2UgcGFyYW1ldGVyaXplZCB2aWV3cyBhcmUgc3VwcG9ydGVkIGluIFNRTFxuICAvLyB2aWV3PFJldCBleHRlbmRzIFZpZXdSZXR1cm5UeXBlQnVpbGRlcj4oXG4gIC8vICAgb3B0czogVmlld09wdHMsXG4gIC8vICAgcmV0OiBSZXQsXG4gIC8vICAgZm46IFZpZXdGbjxTLCB7fSwgUmV0PlxuICAvLyApOiB2b2lkO1xuICAvLyB2aWV3PFBhcmFtcyBleHRlbmRzIFBhcmFtc09iaiwgUmV0IGV4dGVuZHMgVmlld1JldHVyblR5cGVCdWlsZGVyPihcbiAgLy8gICBvcHRzOiBWaWV3T3B0cyxcbiAgLy8gICBwYXJhbXM6IFBhcmFtcyxcbiAgLy8gICByZXQ6IFJldCxcbiAgLy8gICBmbjogVmlld0ZuPFMsIHt9LCBSZXQ+XG4gIC8vICk6IHZvaWQ7XG4gIC8vIHZpZXc8UGFyYW1zIGV4dGVuZHMgUGFyYW1zT2JqLCBSZXQgZXh0ZW5kcyBWaWV3UmV0dXJuVHlwZUJ1aWxkZXI+KFxuICAvLyAgIG9wdHM6IFZpZXdPcHRzLFxuICAvLyAgIHBhcmFtc09yUmV0OiBSZXQgfCBQYXJhbXMsXG4gIC8vICAgcmV0T3JGbjogVmlld0ZuPFMsIHt9LCBSZXQ+IHwgUmV0LFxuICAvLyAgIG1heWJlRm4/OiBWaWV3Rm48UywgUGFyYW1zLCBSZXQ+XG4gIC8vICk6IHZvaWQge1xuICAvLyAgIGlmICh0eXBlb2YgcmV0T3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyAgICAgZGVmaW5lVmlldyhuYW1lLCBmYWxzZSwge30sIHBhcmFtc09yUmV0IGFzIFJldCwgcmV0T3JGbik7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gICAgIGRlZmluZVZpZXcobmFtZSwgZmFsc2UsIHBhcmFtc09yUmV0IGFzIFBhcmFtcywgcmV0T3JGbiwgbWF5YmVGbiEpO1xuICAvLyAgIH1cbiAgLy8gfVxuICBhbm9ueW1vdXNWaWV3KG9wdHMsIHJldCwgZm4pIHtcbiAgICByZXR1cm4gbWFrZUFub25WaWV3RXhwb3J0KHRoaXMuI2N0eCwgb3B0cywge30sIHJldCwgZm4pO1xuICB9XG4gIHByb2NlZHVyZSguLi5hcmdzKSB7XG4gICAgbGV0IG9wdHMsIHBhcmFtcyA9IHt9LCByZXQsIGZuO1xuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgW3JldCwgZm5dID0gYXJncztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6IHtcbiAgICAgICAgbGV0IGFyZzE7XG4gICAgICAgIFthcmcxLCByZXQsIGZuXSA9IGFyZ3M7XG4gICAgICAgIGlmICh0eXBlb2YgYXJnMS5uYW1lID09PSBcInN0cmluZ1wiKSBvcHRzID0gYXJnMTtcbiAgICAgICAgZWxzZSBwYXJhbXMgPSBhcmcxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgNDpcbiAgICAgICAgW29wdHMsIHBhcmFtcywgcmV0LCBmbl0gPSBhcmdzO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VQcm9jZWR1cmVFeHBvcnQodGhpcy4jY3R4LCBvcHRzLCBwYXJhbXMsIHJldCwgZm4pO1xuICB9XG4gIC8qKlxuICAgKiBCdW5kbGUgbXVsdGlwbGUgcmVkdWNlcnMsIHByb2NlZHVyZXMsIGV0YyBpbnRvIG9uZSB2YWx1ZSB0byBleHBvcnQuXG4gICAqIFRoZSBuYW1lIHRoZXkgd2lsbCBiZSBleHBvcnRlZCB3aXRoIGlzIHRoZWlyIGNvcnJlc3BvbmRpbmcga2V5IGluIHRoZSBgZXhwb3J0c2AgYXJndW1lbnQuXG4gICAqL1xuICBleHBvcnRHcm91cChleHBvcnRzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFtleHBvcnRDb250ZXh0XTogdGhpcy4jY3R4LFxuICAgICAgW3JlZ2lzdGVyRXhwb3J0XShjdHgsIF9leHBvcnROYW1lKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2V4cG9ydE5hbWUsIG1vZHVsZUV4cG9ydF0gb2YgT2JqZWN0LmVudHJpZXMoZXhwb3J0cykpIHtcbiAgICAgICAgICBjaGVja0V4cG9ydENvbnRleHQobW9kdWxlRXhwb3J0LCBjdHgpO1xuICAgICAgICAgIG1vZHVsZUV4cG9ydFtyZWdpc3RlckV4cG9ydF0oY3R4LCBleHBvcnROYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbiAgY2xpZW50VmlzaWJpbGl0eUZpbHRlciA9IHtcbiAgICBzcWw6IChmaWx0ZXIpID0+ICh7XG4gICAgICBbZXhwb3J0Q29udGV4dF06IHRoaXMuI2N0eCxcbiAgICAgIFtyZWdpc3RlckV4cG9ydF0oY3R4LCBfZXhwb3J0TmFtZSkge1xuICAgICAgICBjdHgubW9kdWxlRGVmLnJvd0xldmVsU2VjdXJpdHkucHVzaCh7IHNxbDogZmlsdGVyIH0pO1xuICAgICAgfVxuICAgIH0pXG4gIH07XG59O1xudmFyIHJlZ2lzdGVyRXhwb3J0ID0gU3ltYm9sKFwiU3BhY2V0aW1lREIucmVnaXN0ZXJFeHBvcnRcIik7XG52YXIgZXhwb3J0Q29udGV4dCA9IFN5bWJvbChcIlNwYWNldGltZURCLmV4cG9ydENvbnRleHRcIik7XG5mdW5jdGlvbiBpc01vZHVsZUV4cG9ydCh4KSB7XG4gIHJldHVybiAodHlwZW9mIHggPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgeCA9PT0gXCJvYmplY3RcIikgJiYgeCAhPT0gbnVsbCAmJiByZWdpc3RlckV4cG9ydCBpbiB4O1xufVxuZnVuY3Rpb24gY2hlY2tFeHBvcnRDb250ZXh0KGV4cCwgc2NoZW1hMikge1xuICBpZiAoZXhwW2V4cG9ydENvbnRleHRdICE9IG51bGwgJiYgZXhwW2V4cG9ydENvbnRleHRdICE9PSBzY2hlbWEyKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm11bHRpcGxlIHNjaGVtYXMgYXJlIG5vdCBzdXBwb3J0ZWRcIik7XG4gIH1cbn1cbmZ1bmN0aW9uIHNjaGVtYSh0YWJsZXMsIG1vZHVsZVNldHRpbmdzKSB7XG4gIGNvbnN0IGN0eCA9IG5ldyBTY2hlbWFJbm5lcigoY3R4MikgPT4ge1xuICAgIGlmIChtb2R1bGVTZXR0aW5ncz8uQ0FTRV9DT05WRVJTSU9OX1BPTElDWSAhPSBudWxsKSB7XG4gICAgICBjdHgyLnNldENhc2VDb252ZXJzaW9uUG9saWN5KG1vZHVsZVNldHRpbmdzLkNBU0VfQ09OVkVSU0lPTl9QT0xJQ1kpO1xuICAgIH1cbiAgICBjb25zdCB0YWJsZVNjaGVtYXMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IFthY2NOYW1lLCB0YWJsZTJdIG9mIE9iamVjdC5lbnRyaWVzKHRhYmxlcykpIHtcbiAgICAgIGNvbnN0IHRhYmxlRGVmID0gdGFibGUyLnRhYmxlRGVmKGN0eDIsIGFjY05hbWUpO1xuICAgICAgdGFibGVTY2hlbWFzW2FjY05hbWVdID0gdGFibGVUb1NjaGVtYShhY2NOYW1lLCB0YWJsZTIsIHRhYmxlRGVmKTtcbiAgICAgIGN0eDIubW9kdWxlRGVmLnRhYmxlcy5wdXNoKHRhYmxlRGVmKTtcbiAgICAgIGlmICh0YWJsZTIuc2NoZWR1bGUpIHtcbiAgICAgICAgY3R4Mi5wZW5kaW5nU2NoZWR1bGVzLnB1c2goe1xuICAgICAgICAgIC4uLnRhYmxlMi5zY2hlZHVsZSxcbiAgICAgICAgICB0YWJsZU5hbWU6IHRhYmxlRGVmLnNvdXJjZU5hbWVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGFibGUyLnRhYmxlTmFtZSkge1xuICAgICAgICBjdHgyLm1vZHVsZURlZi5leHBsaWNpdE5hbWVzLmVudHJpZXMucHVzaCh7XG4gICAgICAgICAgdGFnOiBcIlRhYmxlXCIsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIHNvdXJjZU5hbWU6IGFjY05hbWUsXG4gICAgICAgICAgICBjYW5vbmljYWxOYW1lOiB0YWJsZTIudGFibGVOYW1lXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdGFibGVzOiB0YWJsZVNjaGVtYXMgfTtcbiAgfSk7XG4gIHJldHVybiBuZXcgU2NoZW1hKGN0eCk7XG59XG5cbi8vIHNyYy9zZXJ2ZXIvY29uc29sZS50c1xudmFyIGltcG9ydF9vYmplY3RfaW5zcGVjdCA9IF9fdG9FU00ocmVxdWlyZV9vYmplY3RfaW5zcGVjdCgpKTtcbnZhciBmbXRMb2cgPSAoLi4uZGF0YSkgPT4gZGF0YS5tYXAoKHgpID0+IHR5cGVvZiB4ID09PSBcInN0cmluZ1wiID8geCA6ICgwLCBpbXBvcnRfb2JqZWN0X2luc3BlY3QuZGVmYXVsdCkoeCkpLmpvaW4oXCIgXCIpO1xudmFyIGNvbnNvbGVfbGV2ZWxfZXJyb3IgPSAwO1xudmFyIGNvbnNvbGVfbGV2ZWxfd2FybiA9IDE7XG52YXIgY29uc29sZV9sZXZlbF9pbmZvID0gMjtcbnZhciBjb25zb2xlX2xldmVsX2RlYnVnID0gMztcbnZhciBjb25zb2xlX2xldmVsX3RyYWNlID0gNDtcbnZhciB0aW1lck1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG52YXIgY29uc29sZTIgPSB7XG4gIC8vIEB0cy1leHBlY3QtZXJyb3Igd2Ugd2FudCBhIGJsYW5rIHByb3RvdHlwZSwgYnV0IHR5cGVzY3JpcHQgY29tcGxhaW5zXG4gIF9fcHJvdG9fXzoge30sXG4gIFtTeW1ib2wudG9TdHJpbmdUYWddOiBcImNvbnNvbGVcIixcbiAgYXNzZXJ0OiAoY29uZGl0aW9uID0gZmFsc2UsIC4uLmRhdGEpID0+IHtcbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfZXJyb3IsIGZtdExvZyguLi5kYXRhKSk7XG4gICAgfVxuICB9LFxuICBjbGVhcjogKCkgPT4ge1xuICB9LFxuICBkZWJ1ZzogKC4uLmRhdGEpID0+IHtcbiAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF9kZWJ1ZywgZm10TG9nKC4uLmRhdGEpKTtcbiAgfSxcbiAgZXJyb3I6ICguLi5kYXRhKSA9PiB7XG4gICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfZXJyb3IsIGZtdExvZyguLi5kYXRhKSk7XG4gIH0sXG4gIGluZm86ICguLi5kYXRhKSA9PiB7XG4gICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfaW5mbywgZm10TG9nKC4uLmRhdGEpKTtcbiAgfSxcbiAgbG9nOiAoLi4uZGF0YSkgPT4ge1xuICAgIHN5cy5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX2luZm8sIGZtdExvZyguLi5kYXRhKSk7XG4gIH0sXG4gIHRhYmxlOiAodGFidWxhckRhdGEsIF9wcm9wZXJ0aWVzKSA9PiB7XG4gICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfaW5mbywgZm10TG9nKHRhYnVsYXJEYXRhKSk7XG4gIH0sXG4gIHRyYWNlOiAoLi4uZGF0YSkgPT4ge1xuICAgIHN5cy5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX3RyYWNlLCBmbXRMb2coLi4uZGF0YSkpO1xuICB9LFxuICB3YXJuOiAoLi4uZGF0YSkgPT4ge1xuICAgIHN5cy5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX3dhcm4sIGZtdExvZyguLi5kYXRhKSk7XG4gIH0sXG4gIGRpcjogKF9pdGVtLCBfb3B0aW9ucykgPT4ge1xuICB9LFxuICBkaXJ4bWw6ICguLi5fZGF0YSkgPT4ge1xuICB9LFxuICAvLyBDb3VudGluZ1xuICBjb3VudDogKF9sYWJlbCA9IFwiZGVmYXVsdFwiKSA9PiB7XG4gIH0sXG4gIGNvdW50UmVzZXQ6IChfbGFiZWwgPSBcImRlZmF1bHRcIikgPT4ge1xuICB9LFxuICAvLyBHcm91cGluZ1xuICBncm91cDogKC4uLl9kYXRhKSA9PiB7XG4gIH0sXG4gIGdyb3VwQ29sbGFwc2VkOiAoLi4uX2RhdGEpID0+IHtcbiAgfSxcbiAgZ3JvdXBFbmQ6ICgpID0+IHtcbiAgfSxcbiAgLy8gVGltaW5nXG4gIHRpbWU6IChsYWJlbCA9IFwiZGVmYXVsdFwiKSA9PiB7XG4gICAgaWYgKHRpbWVyTWFwLmhhcyhsYWJlbCkpIHtcbiAgICAgIHN5cy5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX3dhcm4sIGBUaW1lciAnJHtsYWJlbH0nIGFscmVhZHkgZXhpc3RzLmApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aW1lck1hcC5zZXQobGFiZWwsIHN5cy5jb25zb2xlX3RpbWVyX3N0YXJ0KGxhYmVsKSk7XG4gIH0sXG4gIHRpbWVMb2c6IChsYWJlbCA9IFwiZGVmYXVsdFwiLCAuLi5kYXRhKSA9PiB7XG4gICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfaW5mbywgZm10TG9nKGxhYmVsLCAuLi5kYXRhKSk7XG4gIH0sXG4gIHRpbWVFbmQ6IChsYWJlbCA9IFwiZGVmYXVsdFwiKSA9PiB7XG4gICAgY29uc3Qgc3BhbklkID0gdGltZXJNYXAuZ2V0KGxhYmVsKTtcbiAgICBpZiAoc3BhbklkID09PSB2b2lkIDApIHtcbiAgICAgIHN5cy5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX3dhcm4sIGBUaW1lciAnJHtsYWJlbH0nIGRvZXMgbm90IGV4aXN0LmApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzeXMuY29uc29sZV90aW1lcl9lbmQoc3BhbklkKTtcbiAgICB0aW1lck1hcC5kZWxldGUobGFiZWwpO1xuICB9LFxuICAvLyBBZGRpdGlvbmFsIGNvbnNvbGUgbWV0aG9kcyB0byBzYXRpc2Z5IHRoZSBDb25zb2xlIGludGVyZmFjZVxuICB0aW1lU3RhbXA6ICgpID0+IHtcbiAgfSxcbiAgcHJvZmlsZTogKCkgPT4ge1xuICB9LFxuICBwcm9maWxlRW5kOiAoKSA9PiB7XG4gIH1cbn07XG5cbi8vIHNyYy9zZXJ2ZXIvcG9seWZpbGxzLnRzXG5nbG9iYWxUaGlzLmNvbnNvbGUgPSBjb25zb2xlMjtcbi8qISBCdW5kbGVkIGxpY2Vuc2UgaW5mb3JtYXRpb246XG5cbnN0YXR1c2VzL2luZGV4LmpzOlxuICAoKiFcbiAgICogc3RhdHVzZXNcbiAgICogQ29weXJpZ2h0KGMpIDIwMTQgSm9uYXRoYW4gT25nXG4gICAqIENvcHlyaWdodChjKSAyMDE2IERvdWdsYXMgQ2hyaXN0b3BoZXIgV2lsc29uXG4gICAqIE1JVCBMaWNlbnNlZFxuICAgKilcbiovXG5cbmV4cG9ydCB7IEFycmF5QnVpbGRlciwgQXJyYXlDb2x1bW5CdWlsZGVyLCBCb29sQnVpbGRlciwgQm9vbENvbHVtbkJ1aWxkZXIsIEJvb2xlYW5FeHByLCBCeXRlQXJyYXlCdWlsZGVyLCBCeXRlQXJyYXlDb2x1bW5CdWlsZGVyLCBDYXNlQ29udmVyc2lvblBvbGljeSwgQ29sdW1uQnVpbGRlciwgQ29sdW1uRXhwcmVzc2lvbiwgQ29ubmVjdGlvbklkQnVpbGRlciwgQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlciwgRjMyQnVpbGRlciwgRjMyQ29sdW1uQnVpbGRlciwgRjY0QnVpbGRlciwgRjY0Q29sdW1uQnVpbGRlciwgSTEyOEJ1aWxkZXIsIEkxMjhDb2x1bW5CdWlsZGVyLCBJMTZCdWlsZGVyLCBJMTZDb2x1bW5CdWlsZGVyLCBJMjU2QnVpbGRlciwgSTI1NkNvbHVtbkJ1aWxkZXIsIEkzMkJ1aWxkZXIsIEkzMkNvbHVtbkJ1aWxkZXIsIEk2NEJ1aWxkZXIsIEk2NENvbHVtbkJ1aWxkZXIsIEk4QnVpbGRlciwgSThDb2x1bW5CdWlsZGVyLCBJZGVudGl0eUJ1aWxkZXIsIElkZW50aXR5Q29sdW1uQnVpbGRlciwgT3B0aW9uQnVpbGRlciwgT3B0aW9uQ29sdW1uQnVpbGRlciwgUHJvZHVjdEJ1aWxkZXIsIFByb2R1Y3RDb2x1bW5CdWlsZGVyLCBSZWZCdWlsZGVyLCBSZXN1bHRCdWlsZGVyLCBSZXN1bHRDb2x1bW5CdWlsZGVyLCBSb3dCdWlsZGVyLCBTY2hlZHVsZUF0QnVpbGRlciwgU2NoZWR1bGVBdENvbHVtbkJ1aWxkZXIsIFNlbmRlckVycm9yLCBTaW1wbGVTdW1CdWlsZGVyLCBTaW1wbGVTdW1Db2x1bW5CdWlsZGVyLCBTcGFjZXRpbWVIb3N0RXJyb3IsIFN0cmluZ0J1aWxkZXIsIFN0cmluZ0NvbHVtbkJ1aWxkZXIsIFN1bUJ1aWxkZXIsIFN1bUNvbHVtbkJ1aWxkZXIsIFRpbWVEdXJhdGlvbkJ1aWxkZXIsIFRpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIsIFRpbWVzdGFtcEJ1aWxkZXIsIFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIsIFR5cGVCdWlsZGVyLCBVMTI4QnVpbGRlciwgVTEyOENvbHVtbkJ1aWxkZXIsIFUxNkJ1aWxkZXIsIFUxNkNvbHVtbkJ1aWxkZXIsIFUyNTZCdWlsZGVyLCBVMjU2Q29sdW1uQnVpbGRlciwgVTMyQnVpbGRlciwgVTMyQ29sdW1uQnVpbGRlciwgVTY0QnVpbGRlciwgVTY0Q29sdW1uQnVpbGRlciwgVThCdWlsZGVyLCBVOENvbHVtbkJ1aWxkZXIsIFV1aWRCdWlsZGVyLCBVdWlkQ29sdW1uQnVpbGRlciwgYW5kLCBjcmVhdGVUYWJsZVJlZkZyb21EZWYsIGVycm9ycywgZXZhbHVhdGVCb29sZWFuRXhwciwgZ2V0UXVlcnlBY2Nlc3Nvck5hbWUsIGdldFF1ZXJ5VGFibGVOYW1lLCBnZXRRdWVyeVdoZXJlQ2xhdXNlLCBpc1Jvd1R5cGVkUXVlcnksIGlzVHlwZWRRdWVyeSwgbGl0ZXJhbCwgbWFrZVF1ZXJ5QnVpbGRlciwgbm90LCBvciwgc2NoZW1hLCB0LCB0YWJsZSwgdG9DYW1lbENhc2UsIHRvQ29tcGFyYWJsZVZhbHVlLCB0b1NxbCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcCIsImltcG9ydCB7IHNjaGVtYSwgdGFibGUsIHQgfSBmcm9tICdzcGFjZXRpbWVkYi9zZXJ2ZXInO1xyXG5cclxuY29uc3Qgc3BhY2V0aW1lZGIgPSBzY2hlbWEoe1xyXG4gIHBlcnNvbjogdGFibGUoXHJcbiAgICB7IHB1YmxpYzogdHJ1ZSB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiB0LnN0cmluZygpLFxyXG4gICAgfVxyXG4gICksXHJcbiAgdXNlcjogdGFibGUoXHJcbiAgICB7IHB1YmxpYzogdHJ1ZSB9LFxyXG4gICAge1xyXG4gICAgICBpZGVudGl0eTogdC5pZGVudGl0eSgpLnByaW1hcnlLZXkoKSxcclxuICAgICAgY2xlcmtJZDogdC5zdHJpbmcoKSxcclxuICAgICAgbmFtZTogdC5zdHJpbmcoKS5vcHRpb25hbCgpLFxyXG4gICAgICBjcmVhdGVkQXQ6IHQudGltZXN0YW1wKCksXHJcbiAgICB9XHJcbiAgKVxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3BhY2V0aW1lZGI7IiwiaW1wb3J0IHsgdCwgU2VuZGVyRXJyb3IgfSBmcm9tICdzcGFjZXRpbWVkYi9zZXJ2ZXInO1xyXG5cclxuaW1wb3J0IHNwYWNldGltZWRiIGZyb20gJy4vc2NoZW1hcyc7XHJcblxyXG5leHBvcnQgY29uc3QgaW5pdCA9IHNwYWNldGltZWRiLmluaXQoX2N0eCA9PiB7XHJcbiAgLy8gQ2FsbGVkIHdoZW4gdGhlIG1vZHVsZSBpcyBpbml0aWFsbHkgcHVibGlzaGVkXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IG9uQ29ubmVjdCA9IHNwYWNldGltZWRiLmNsaWVudENvbm5lY3RlZChjdHggPT4ge1xyXG4gIGNvbnN0IGp3dCA9IGN0eC5zZW5kZXJBdXRoLmp3dDtcclxuICBpZiAoand0ID09IG51bGwpIHtcclxuICAgIHRocm93IG5ldyBTZW5kZXJFcnJvcignVW5hdXRob3JpemVkOiBKV1QgaXMgcmVxdWlyZWQgdG8gY29ubmVjdCcpO1xyXG4gIH1cclxuXHJcbiAgLy8gT25seSBhY2NlcHQgdG9rZW5zIGlzc3VlZCBieSBDbGVya1xyXG4gIGlmICghand0Lmlzc3Vlci5zdGFydHNXaXRoKCdodHRwczovL2NsZXJrLicpKSB7XHJcbiAgICB0aHJvdyBuZXcgU2VuZGVyRXJyb3IoYFVuYXV0aG9yaXplZDogdW5leHBlY3RlZCBpc3N1ZXIgJHtqd3QuaXNzdWVyfWApO1xyXG4gIH1cclxuXHJcbiAgLy8gVXBzZXJ0IHVzZXIgcm93IOKAlCBpbnNlcnQgb25seSBvbiBmaXJzdCBjb25uZWN0XHJcbiAgY29uc3QgZXhpc3RpbmcgPSBjdHguZGIudXNlci5pZGVudGl0eS5maW5kKGN0eC5zZW5kZXIpO1xyXG4gIGlmICghZXhpc3RpbmcpIHtcclxuICAgIGN0eC5kYi51c2VyLmluc2VydCh7XHJcbiAgICAgIGlkZW50aXR5OiBjdHguc2VuZGVyLFxyXG4gICAgICBjbGVya0lkOiBqd3Quc3ViamVjdCxcclxuICAgICAgbmFtZTogdW5kZWZpbmVkLFxyXG4gICAgICBjcmVhdGVkQXQ6IGN0eC50aW1lc3RhbXAsXHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IG9uRGlzY29ubmVjdCA9IHNwYWNldGltZWRiLmNsaWVudERpc2Nvbm5lY3RlZChfY3R4ID0+IHtcclxuICAvLyBDYWxsZWQgZXZlcnkgdGltZSBhIGNsaWVudCBkaXNjb25uZWN0c1xyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBhZGQgPSBzcGFjZXRpbWVkYi5yZWR1Y2VyKFxyXG4gIHsgbmFtZTogdC5zdHJpbmcoKSB9LFxyXG4gIChjdHgsIHsgbmFtZSB9KSA9PiB7XHJcbiAgICBjdHguZGIucGVyc29uLmluc2VydCh7IG5hbWUgfSk7XHJcbiAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldF91c2VyX3Byb2ZpbGUgPSBzcGFjZXRpbWVkYi5yZWR1Y2VyKFxyXG4gIHsgbmFtZTogdC5zdHJpbmcoKSB9LFxyXG4gIChjdHgsIHsgbmFtZSB9KSA9PiB7XHJcbiAgICBjb25zdCBleGlzdGluZyA9IGN0eC5kYi51c2VyLmlkZW50aXR5LmZpbmQoY3R4LnNlbmRlcik7XHJcbiAgICBpZiAoIWV4aXN0aW5nKSB0aHJvdyBuZXcgU2VuZGVyRXJyb3IoJ1VzZXIgbm90IGZvdW5kJyk7XHJcbiAgICBjdHguZGIudXNlci5pZGVudGl0eS51cGRhdGUoeyAuLi5leGlzdGluZywgbmFtZSB9KTtcclxuICB9XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3Qgc2F5SGVsbG8gPSBzcGFjZXRpbWVkYi5yZWR1Y2VyKGN0eCA9PiB7XHJcbiAgZm9yIChjb25zdCBwZXJzb24gb2YgY3R4LmRiLnBlcnNvbi5pdGVyKCkpIHtcclxuICAgIGNvbnNvbGUuaW5mbyhgSGVsbG8sICR7cGVyc29uLm5hbWV9IWApO1xyXG4gIH1cclxuICBjb25zb2xlLmluZm8oJ0hlbGxvLCBXb3JsZCEnKTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzcGFjZXRpbWVkYjtcclxuIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBSUEsYUFBVyxPQUFPO0FBQ3RCLElBQUlDLGNBQVksT0FBTztBQUN2QixJQUFJQyxxQkFBbUIsT0FBTztBQUM5QixJQUFJQyxzQkFBb0IsT0FBTztBQUMvQixJQUFJQyxpQkFBZSxPQUFPO0FBQzFCLElBQUlDLGlCQUFlLE9BQU8sVUFBVTtBQUNwQyxJQUFJQyxnQkFBYyxJQUFJLFFBQVEsU0FBUyxZQUFZO0FBQ2pELFFBQU8sUUFBUSxHQUFHLEdBQUdILG9CQUFrQixHQUFHLENBQUMsTUFBTSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxTQUFTLElBQUksRUFBRSxJQUFJOztBQUU3RixJQUFJSSxpQkFBZSxJQUFJLE1BQU0sUUFBUSxTQUFTO0FBQzVDLEtBQUksUUFBUSxPQUFPLFNBQVMsWUFBWSxPQUFPLFNBQVMsWUFDdEQ7T0FBSyxJQUFJLE9BQU9KLG9CQUFrQixLQUFLLENBQ3JDLEtBQUksQ0FBQ0UsZUFBYSxLQUFLLElBQUksSUFBSSxJQUFJLFFBQVEsT0FDekMsYUFBVSxJQUFJLEtBQUs7R0FBRSxXQUFXLEtBQUs7R0FBTSxZQUFZLEVBQUUsT0FBT0gsbUJBQWlCLE1BQU0sSUFBSSxLQUFLLEtBQUs7R0FBWSxDQUFDOztBQUV4SCxRQUFPOztBQUVULElBQUlNLGFBQVcsS0FBSyxZQUFZLFlBQVksU0FBUyxPQUFPLE9BQU9SLFdBQVNJLGVBQWEsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFRyxjQUtuRyxjQUFj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QUUsVUFBVSxDQUFDLFlBQVk7RUFDbkMsU0FBUyxFQUFFLFFBQVE7RUFDbkIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxVQUFVO0VBQzNCLFdBQVcsRUFBRSxXQUFXO0VBQ3pCLENBQ0Y7Q0FDRixDQUFDOzs7O0FDZEYsTUFBYSxPQUFPLFlBQVksTUFBSyxTQUFRLEdBRTNDO0FBRUYsTUFBYSxZQUFZLFlBQVksaUJBQWdCLFFBQU87Q0FDMUQsTUFBTSxNQUFNLElBQUksV0FBVztBQUMzQixLQUFJLE9BQU8sS0FDVCxPQUFNLElBQUksWUFBWSwyQ0FBMkM7QUFJbkUsS0FBSSxDQUFDLElBQUksT0FBTyxXQUFXLGlCQUFpQixDQUMxQyxPQUFNLElBQUksWUFBWSxtQ0FBbUMsSUFBSSxTQUFTO0FBS3hFLEtBQUksQ0FEYSxJQUFJLEdBQUcsS0FBSyxTQUFTLEtBQUssSUFBSSxPQUFPLENBRXBELEtBQUksR0FBRyxLQUFLLE9BQU87RUFDakIsVUFBVSxJQUFJO0VBQ2QsU0FBUyxJQUFJO0VBQ2IsTUFBTTtFQUNOLFdBQVcsSUFBSTtFQUNoQixDQUFDO0VBRUo7QUFFRixNQUFhLGVBQWUsWUFBWSxvQkFBbUIsU0FBUSxHQUVqRTtBQUVGLE1BQWEsTUFBTSxZQUFZLFFBQzdCLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUNuQixLQUFLLEVBQUUsV0FBVztBQUNqQixLQUFJLEdBQUcsT0FBTyxPQUFPLEVBQUUsTUFBTSxDQUFDO0VBRWpDO0FBRUQsTUFBYSxtQkFBbUIsWUFBWSxRQUMxQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FDbkIsS0FBSyxFQUFFLFdBQVc7Q0FDakIsTUFBTSxXQUFXLElBQUksR0FBRyxLQUFLLFNBQVMsS0FBSyxJQUFJLE9BQU87QUFDdEQsS0FBSSxDQUFDLFNBQVUsT0FBTSxJQUFJLFlBQVksaUJBQWlCO0FBQ3RELEtBQUksR0FBRyxLQUFLLFNBQVMsT0FBTztFQUFFLEdBQUc7RUFBVTtFQUFNLENBQUM7RUFFckQ7QUFFRCxNQUFhLFdBQVcsWUFBWSxTQUFRLFFBQU87QUFDakQsTUFBSyxNQUFNLFVBQVUsSUFBSSxHQUFHLE9BQU8sTUFBTSxDQUN2QyxTQUFRLEtBQUssVUFBVSxPQUFPLEtBQUssR0FBRztBQUV4QyxTQUFRLEtBQUssZ0JBQWdCO0VBQzdCO0FBRUYsa0JBQWUiLCJkZWJ1Z0lkIjoiZDc3MWViYzItODJlMi00YWNlLTg1ZTAtN2NlYWExZTYzYmUzIn0=