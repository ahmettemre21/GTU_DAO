/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-toast */ \"react-hot-toast\");\n/* harmony import */ var _rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rainbow-me/rainbowkit/styles.css */ \"../node_modules/@rainbow-me/rainbowkit/dist/index.css\");\n/* harmony import */ var _rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\n/* harmony import */ var _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @rainbow-me/rainbowkit */ \"@rainbow-me/rainbowkit\");\n/* harmony import */ var wagmi_chains__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! wagmi/chains */ \"wagmi/chains\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hot_toast__WEBPACK_IMPORTED_MODULE_2__, wagmi__WEBPACK_IMPORTED_MODULE_5__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__, _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_7__, wagmi_chains__WEBPACK_IMPORTED_MODULE_8__]);\n([react_hot_toast__WEBPACK_IMPORTED_MODULE_2__, wagmi__WEBPACK_IMPORTED_MODULE_5__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__, _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_7__, wagmi_chains__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n// Wagmi ve RainbowKit konfigürasyonu\n\n\n\n\nconst config = (0,_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_7__.getDefaultConfig)({\n    appName: \"GTU DAO\",\n    projectId: \"YOUR_PROJECT_ID\",\n    chains: [\n        wagmi_chains__WEBPACK_IMPORTED_MODULE_8__.sepolia,\n        wagmi_chains__WEBPACK_IMPORTED_MODULE_8__.rootstock\n    ],\n    ssr: false\n});\nconst queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.QueryClient();\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(wagmi__WEBPACK_IMPORTED_MODULE_5__.WagmiProvider, {\n        config: config,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.QueryClientProvider, {\n            client: queryClient,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_7__.RainbowKitProvider, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"min-h-screen bg-[#0B0E12] text-[#F3F4F6]\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                            ...pageProps\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\AhmetEmreYAVUZ\\\\OneDrive\\\\Masa\\xfcst\\xfc\\\\GTU_DAO\\\\packages\\\\nextjs\\\\src\\\\pages\\\\_app.tsx\",\n                            lineNumber: 28,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_hot_toast__WEBPACK_IMPORTED_MODULE_2__.Toaster, {\n                            position: \"top-right\",\n                            reverseOrder: false,\n                            gutter: 8,\n                            containerClassName: \"\",\n                            containerStyle: {},\n                            toastOptions: {\n                                // Define default options\n                                className: \"\",\n                                duration: 4000,\n                                style: {\n                                    background: \"#1F2937\",\n                                    color: \"#F3F4F6\",\n                                    border: \"1px solid #374151\",\n                                    borderRadius: \"12px\",\n                                    padding: \"16px\",\n                                    fontSize: \"14px\",\n                                    fontWeight: \"500\",\n                                    boxShadow: \"0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)\"\n                                },\n                                // Custom styling per toast type\n                                success: {\n                                    duration: 3000,\n                                    iconTheme: {\n                                        primary: \"#10B981\",\n                                        secondary: \"#fff\"\n                                    },\n                                    style: {\n                                        background: \"#064E3B\",\n                                        border: \"1px solid #10B981\",\n                                        color: \"#D1FAE5\"\n                                    }\n                                },\n                                error: {\n                                    duration: 5000,\n                                    iconTheme: {\n                                        primary: \"#EF4444\",\n                                        secondary: \"#fff\"\n                                    },\n                                    style: {\n                                        background: \"#7F1D1D\",\n                                        border: \"1px solid #EF4444\",\n                                        color: \"#FEE2E2\"\n                                    }\n                                },\n                                loading: {\n                                    iconTheme: {\n                                        primary: \"#00C4FF\",\n                                        secondary: \"#fff\"\n                                    },\n                                    style: {\n                                        background: \"#0B4F71\",\n                                        border: \"1px solid #00C4FF\",\n                                        color: \"#DBEAFE\"\n                                    }\n                                }\n                            }\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\AhmetEmreYAVUZ\\\\OneDrive\\\\Masa\\xfcst\\xfc\\\\GTU_DAO\\\\packages\\\\nextjs\\\\src\\\\pages\\\\_app.tsx\",\n                            lineNumber: 31,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"fixed bottom-4 right-4 z-50\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"bg-gradient-to-r from-[#00C4FF] to-[#0080CC] text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/10\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"text-xs font-semibold\",\n                                        children: \"ETH Prague 2025\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\AhmetEmreYAVUZ\\\\OneDrive\\\\Masa\\xfcst\\xfc\\\\GTU_DAO\\\\packages\\\\nextjs\\\\src\\\\pages\\\\_app.tsx\",\n                                        lineNumber: 94,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"text-sm font-medium\",\n                                        children: \"$40k Prize Pool \\uD83C\\uDFC6\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\AhmetEmreYAVUZ\\\\OneDrive\\\\Masa\\xfcst\\xfc\\\\GTU_DAO\\\\packages\\\\nextjs\\\\src\\\\pages\\\\_app.tsx\",\n                                        lineNumber: 95,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\Users\\\\AhmetEmreYAVUZ\\\\OneDrive\\\\Masa\\xfcst\\xfc\\\\GTU_DAO\\\\packages\\\\nextjs\\\\src\\\\pages\\\\_app.tsx\",\n                                lineNumber: 93,\n                                columnNumber: 15\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\AhmetEmreYAVUZ\\\\OneDrive\\\\Masa\\xfcst\\xfc\\\\GTU_DAO\\\\packages\\\\nextjs\\\\src\\\\pages\\\\_app.tsx\",\n                            lineNumber: 92,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\AhmetEmreYAVUZ\\\\OneDrive\\\\Masa\\xfcst\\xfc\\\\GTU_DAO\\\\packages\\\\nextjs\\\\src\\\\pages\\\\_app.tsx\",\n                    lineNumber: 27,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\AhmetEmreYAVUZ\\\\OneDrive\\\\Masa\\xfcst\\xfc\\\\GTU_DAO\\\\packages\\\\nextjs\\\\src\\\\pages\\\\_app.tsx\",\n                lineNumber: 26,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\AhmetEmreYAVUZ\\\\OneDrive\\\\Masa\\xfcst\\xfc\\\\GTU_DAO\\\\packages\\\\nextjs\\\\src\\\\pages\\\\_app.tsx\",\n            lineNumber: 25,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\AhmetEmreYAVUZ\\\\OneDrive\\\\Masa\\xfcst\\xfc\\\\GTU_DAO\\\\packages\\\\nextjs\\\\src\\\\pages\\\\_app.tsx\",\n        lineNumber: 24,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlCO0FBRWdCO0FBQ0M7QUFDWjtBQUU5QixxQ0FBcUM7QUFDQTtBQUNtQztBQUNLO0FBQzVCO0FBRWpELE1BQU1TLFNBQVNILHdFQUFnQkEsQ0FBQztJQUM5QkksU0FBUztJQUNUQyxXQUFXO0lBQ1hDLFFBQVE7UUFBQ0wsaURBQU9BO1FBQUVDLG1EQUFTQTtLQUFDO0lBQzVCSyxLQUFLO0FBQ1A7QUFFQSxNQUFNQyxjQUFjLElBQUlYLDhEQUFXQTtBQUVuQyxTQUFTWSxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQy9DLHFCQUNFLDhEQUFDZixnREFBYUE7UUFBQ08sUUFBUUE7a0JBQ3JCLDRFQUFDTCxzRUFBbUJBO1lBQUNjLFFBQVFKO3NCQUMzQiw0RUFBQ1Qsc0VBQWtCQTswQkFDakIsNEVBQUNjO29CQUFJQyxXQUFVOztzQ0FDYiw4REFBQ0o7NEJBQVcsR0FBR0MsU0FBUzs7Ozs7O3NDQUd4Qiw4REFBQ2hCLG9EQUFPQTs0QkFDTm9CLFVBQVM7NEJBQ1RDLGNBQWM7NEJBQ2RDLFFBQVE7NEJBQ1JDLG9CQUFtQjs0QkFDbkJDLGdCQUFnQixDQUFDOzRCQUNqQkMsY0FBYztnQ0FDWix5QkFBeUI7Z0NBQ3pCTixXQUFXO2dDQUNYTyxVQUFVO2dDQUNWQyxPQUFPO29DQUNMQyxZQUFZO29DQUNaQyxPQUFPO29DQUNQQyxRQUFRO29DQUNSQyxjQUFjO29DQUNkQyxTQUFTO29DQUNUQyxVQUFVO29DQUNWQyxZQUFZO29DQUNaQyxXQUFXO2dDQUNiO2dDQUVBLGdDQUFnQztnQ0FDaENDLFNBQVM7b0NBQ1BWLFVBQVU7b0NBQ1ZXLFdBQVc7d0NBQ1RDLFNBQVM7d0NBQ1RDLFdBQVc7b0NBQ2I7b0NBQ0FaLE9BQU87d0NBQ0xDLFlBQVk7d0NBQ1pFLFFBQVE7d0NBQ1JELE9BQU87b0NBQ1Q7Z0NBQ0Y7Z0NBQ0FXLE9BQU87b0NBQ0xkLFVBQVU7b0NBQ1ZXLFdBQVc7d0NBQ1RDLFNBQVM7d0NBQ1RDLFdBQVc7b0NBQ2I7b0NBQ0FaLE9BQU87d0NBQ0xDLFlBQVk7d0NBQ1pFLFFBQVE7d0NBQ1JELE9BQU87b0NBQ1Q7Z0NBQ0Y7Z0NBQ0FZLFNBQVM7b0NBQ1BKLFdBQVc7d0NBQ1RDLFNBQVM7d0NBQ1RDLFdBQVc7b0NBQ2I7b0NBQ0FaLE9BQU87d0NBQ0xDLFlBQVk7d0NBQ1pFLFFBQVE7d0NBQ1JELE9BQU87b0NBQ1Q7Z0NBQ0Y7NEJBQ0Y7Ozs7OztzQ0FJRiw4REFBQ1g7NEJBQUlDLFdBQVU7c0NBQ2IsNEVBQUNEO2dDQUFJQyxXQUFVOztrREFDYiw4REFBQ0Q7d0NBQUlDLFdBQVU7a0RBQXdCOzs7Ozs7a0RBQ3ZDLDhEQUFDRDt3Q0FBSUMsV0FBVTtrREFBc0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUXJEO0FBRUEsaUVBQWVMLEtBQUtBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZ3R1LWRhby9uZXh0anMvLi9zcmMvcGFnZXMvX2FwcC50c3g/ZjlkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCdcclxuaW1wb3J0IHsgVG9hc3RlciB9IGZyb20gJ3JlYWN0LWhvdC10b2FzdCdcclxuaW1wb3J0ICdAcmFpbmJvdy1tZS9yYWluYm93a2l0L3N0eWxlcy5jc3MnXHJcbmltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJ1xyXG5cclxuLy8gV2FnbWkgdmUgUmFpbmJvd0tpdCBrb25maWfDvHJhc3lvbnVcclxuaW1wb3J0IHsgV2FnbWlQcm92aWRlciB9IGZyb20gJ3dhZ21pJ1xyXG5pbXBvcnQgeyBRdWVyeUNsaWVudCwgUXVlcnlDbGllbnRQcm92aWRlciB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSdcclxuaW1wb3J0IHsgUmFpbmJvd0tpdFByb3ZpZGVyLCBnZXREZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHJhaW5ib3ctbWUvcmFpbmJvd2tpdCdcclxuaW1wb3J0IHsgc2Vwb2xpYSwgcm9vdHN0b2NrIH0gZnJvbSAnd2FnbWkvY2hhaW5zJ1xyXG5cclxuY29uc3QgY29uZmlnID0gZ2V0RGVmYXVsdENvbmZpZyh7XHJcbiAgYXBwTmFtZTogJ0dUVSBEQU8nLFxyXG4gIHByb2plY3RJZDogJ1lPVVJfUFJPSkVDVF9JRCcsIC8vIFdhbGxldENvbm5lY3QgUHJvamVjdCBJRFxyXG4gIGNoYWluczogW3NlcG9saWEsIHJvb3RzdG9ja10sXHJcbiAgc3NyOiBmYWxzZSxcclxufSlcclxuXHJcbmNvbnN0IHF1ZXJ5Q2xpZW50ID0gbmV3IFF1ZXJ5Q2xpZW50KClcclxuXHJcbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPFdhZ21pUHJvdmlkZXIgY29uZmlnPXtjb25maWd9PlxyXG4gICAgICA8UXVlcnlDbGllbnRQcm92aWRlciBjbGllbnQ9e3F1ZXJ5Q2xpZW50fT5cclxuICAgICAgICA8UmFpbmJvd0tpdFByb3ZpZGVyPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctWyMwQjBFMTJdIHRleHQtWyNGM0Y0RjZdXCI+XHJcbiAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuXHJcbiAgICAgICAgICAgIHsvKiBUb2FzdCBOb3RpZmljYXRpb25zIC0gRGFyayBUaGVtZSAqL31cclxuICAgICAgICAgICAgPFRvYXN0ZXJcclxuICAgICAgICAgICAgICBwb3NpdGlvbj1cInRvcC1yaWdodFwiXHJcbiAgICAgICAgICAgICAgcmV2ZXJzZU9yZGVyPXtmYWxzZX1cclxuICAgICAgICAgICAgICBndXR0ZXI9ezh9XHJcbiAgICAgICAgICAgICAgY29udGFpbmVyQ2xhc3NOYW1lPVwiXCJcclxuICAgICAgICAgICAgICBjb250YWluZXJTdHlsZT17e319XHJcbiAgICAgICAgICAgICAgdG9hc3RPcHRpb25zPXt7XHJcbiAgICAgICAgICAgICAgICAvLyBEZWZpbmUgZGVmYXVsdCBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDQwMDAsXHJcbiAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzFGMjkzNycsXHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI0YzRjRGNicsXHJcbiAgICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjMzc0MTUxJyxcclxuICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxNnB4JyxcclxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNHB4JyxcclxuICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJzUwMCcsXHJcbiAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMjBweCAyNXB4IC01cHggcmdiYSgwLCAwLCAwLCAwLjMpLCAwIDEwcHggMTBweCAtNXB4IHJnYmEoMCwgMCwgMCwgMC4yKScsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEN1c3RvbSBzdHlsaW5nIHBlciB0b2FzdCB0eXBlXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB7XHJcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgICBpY29uVGhlbWU6IHtcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiAnIzEwQjk4MScsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5OiAnI2ZmZicsXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMwNjRFM0InLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjMTBCOTgxJyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNEMUZBRTUnLFxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiB7XHJcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA1MDAwLFxyXG4gICAgICAgICAgICAgICAgICBpY29uVGhlbWU6IHtcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiAnI0VGNDQ0NCcsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5OiAnI2ZmZicsXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyM3RjFEMUQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjRUY0NDQ0JyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNGRUUyRTInLFxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IHtcclxuICAgICAgICAgICAgICAgICAgaWNvblRoZW1lOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogJyMwMEM0RkYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeTogJyNmZmYnLFxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMEI0RjcxJyxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgIzAwQzRGRicsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjREJFQUZFJyxcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgIHsvKiBFVEggUHJhZ3VlIDIwMjUgQmFkZ2UgLSBVcGRhdGVkIGZvciBEYXJrIFRoZW1lICovfVxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGJvdHRvbS00IHJpZ2h0LTQgei01MFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLVsjMDBDNEZGXSB0by1bIzAwODBDQ10gdGV4dC13aGl0ZSBweC00IHB5LTIgcm91bmRlZC1sZyBzaGFkb3ctbGcgaG92ZXI6c2hhZG93LXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBob3ZlcjpzY2FsZS0xMDUgYmFja2Ryb3AtYmx1ci1zbSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZFwiPkVUSCBQcmFndWUgMjAyNTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtXCI+JDQwayBQcml6ZSBQb29sIPCfj4Y8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L1JhaW5ib3dLaXRQcm92aWRlcj5cclxuICAgICAgPC9RdWVyeUNsaWVudFByb3ZpZGVyPlxyXG4gICAgPC9XYWdtaVByb3ZpZGVyPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXlBcHAgIl0sIm5hbWVzIjpbIlJlYWN0IiwiVG9hc3RlciIsIldhZ21pUHJvdmlkZXIiLCJRdWVyeUNsaWVudCIsIlF1ZXJ5Q2xpZW50UHJvdmlkZXIiLCJSYWluYm93S2l0UHJvdmlkZXIiLCJnZXREZWZhdWx0Q29uZmlnIiwic2Vwb2xpYSIsInJvb3RzdG9jayIsImNvbmZpZyIsImFwcE5hbWUiLCJwcm9qZWN0SWQiLCJjaGFpbnMiLCJzc3IiLCJxdWVyeUNsaWVudCIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiY2xpZW50IiwiZGl2IiwiY2xhc3NOYW1lIiwicG9zaXRpb24iLCJyZXZlcnNlT3JkZXIiLCJndXR0ZXIiLCJjb250YWluZXJDbGFzc05hbWUiLCJjb250YWluZXJTdHlsZSIsInRvYXN0T3B0aW9ucyIsImR1cmF0aW9uIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwiY29sb3IiLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJwYWRkaW5nIiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwiYm94U2hhZG93Iiwic3VjY2VzcyIsImljb25UaGVtZSIsInByaW1hcnkiLCJzZWNvbmRhcnkiLCJlcnJvciIsImxvYWRpbmciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@rainbow-me/rainbowkit":
/*!*****************************************!*\
  !*** external "@rainbow-me/rainbowkit" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@rainbow-me/rainbowkit");;

/***/ }),

/***/ "@tanstack/react-query":
/*!****************************************!*\
  !*** external "@tanstack/react-query" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ "react-hot-toast":
/*!**********************************!*\
  !*** external "react-hot-toast" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = import("react-hot-toast");;

/***/ }),

/***/ "wagmi":
/*!************************!*\
  !*** external "wagmi" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi");;

/***/ }),

/***/ "wagmi/chains":
/*!*******************************!*\
  !*** external "wagmi/chains" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/chains");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@rainbow-me"], () => (__webpack_exec__("./src/pages/_app.tsx")));
module.exports = __webpack_exports__;

})();