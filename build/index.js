"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const index_1 = require("./app/index");
index_1.app.listen(process.env.PORT, () => {
    console.log(`⚡[server]: Listen on http://localhost:${process.env.PORT}`);
});
