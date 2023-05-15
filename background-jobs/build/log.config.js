"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backgroundJobLog = void 0;
const typescript_logging_1 = require("typescript-logging");
const typescript_logging_category_style_1 = require("typescript-logging-category-style");
const provider = typescript_logging_category_style_1.CategoryProvider.createProvider("log-provider", {
    level: typescript_logging_1.LogLevel.Debug,
});
exports.backgroundJobLog = provider.getCategory("background-job");
