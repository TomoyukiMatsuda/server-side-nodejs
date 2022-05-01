/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dbAccessor.ts":
/*!***************************!*\
  !*** ./src/dbAccessor.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbAccessor = void 0;
const pg_1 = __webpack_require__(/*! pg */ "pg");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const pool = new pg_1.Pool({
    database: "development",
    user: "root",
    host: "127.0.0.1",
    port: 5432,
});
class DbAccessor {
    constructor() {
        this.get = async () => {
            const client = await pool.connect();
            try {
                const query = { text: 'select * from public."TodoTasks"' };
                const result = await client.query(query);
                return result.rows;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                client.release();
            }
        };
        this.create = async (title) => {
            const client = await pool.connect();
            try {
                const query = {
                    text: 'insert into public."TodoTasks" (uuid, title, "createdAt", "updatedAt") VALUES($1, $2, current_timestamp, current_timestamp)',
                    values: [(0, uuid_1.v4)(), title],
                };
                await client.query(query);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                client.release();
            }
        };
        this.update = async ({ uuid, title, status, }) => {
            console.log(uuid, title, status);
            const client = await pool.connect();
            try {
                const query = {
                    text: 'update public."TodoTasks" set title = $2, status=$3 where uuid = $1',
                    values: [uuid, title, status],
                };
                await client.query(query);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                client.release();
            }
        };
        this.delete = async ({ uuid }) => {
            const client = await pool.connect();
            try {
                const query = {
                    text: 'delete from public."TodoTasks" where uuid = $1',
                    values: [uuid],
                };
                await client.query(query);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                client.release();
            }
        };
    }
}
exports.DbAccessor = DbAccessor;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
const router_1 = __webpack_require__(/*! ./router */ "./src/router.ts");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = 8080;
app.use("/", (0, router_1.createRouter)());
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});


/***/ }),

/***/ "./src/router.ts":
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createRouter = void 0;
const express_1 = __webpack_require__(/*! express */ "express");
const dbAccessor_1 = __webpack_require__(/*! src/dbAccessor */ "./src/dbAccessor.ts");
const dbAccessor = new dbAccessor_1.DbAccessor();
const createRouter = () => {
    const router = (0, express_1.Router)();
    router.get("/", async (req, res) => {
        try {
            const resBody = await dbAccessor.get();
            res.status(200).send({ message: "get success", resBody });
        }
        catch (e) {
            console.error(e);
            res.status(400).send({ message: "get failed" });
        }
    });
    router.put("/", async (req, res) => {
        try {
            if (!req.body.title) {
                res.status(400).send({ message: "title required" });
            }
            await dbAccessor.create(req.body.title);
            res.status(200).send({ message: "create success" });
        }
        catch (e) {
            console.error(e);
            res.status(400).send({ message: "create failed" });
        }
    });
    router.post("/:taskId", async (req, res) => {
        try {
            if (!req.body) {
                res.status(400).send({ message: "body required" });
            }
            await dbAccessor.update({ uuid: req.params.taskId, ...req.body });
            res.status(200).send({ message: "update success" });
        }
        catch (e) {
            console.error(e);
            res.status(400).send({ message: "update failed" });
        }
    });
    router.delete("/:taskId", async (req, res) => {
        try {
            if (!req.body) {
                res.status(400).send({ message: "body required" });
            }
            await dbAccessor.delete({ uuid: req.params.taskId });
            res.status(200).send({ message: "delete success" });
        }
        catch (err) {
            console.error(err);
            res.status(400).send({ message: "delete failed" });
        }
    });
    return router;
};
exports.createRouter = createRouter;


/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixFQUFFLENBQUMsQ0FBQztTQUNyRDtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFHSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUEzRFcsb0JBQVksZ0JBMkR2Qjs7Ozs7Ozs7Ozs7QUNoRUY7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvZGJBY2Nlc3Nvci50cyIsIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2VydmVyLy4vc3JjL3JvdXRlci50cyIsIndlYnBhY2s6Ly9zZXJ2ZXIvZXh0ZXJuYWwgY29tbW9uanMgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vc2VydmVyL2V4dGVybmFsIGNvbW1vbmpzIFwiZXhwcmVzc1wiIiwid2VicGFjazovL3NlcnZlci9leHRlcm5hbCBjb21tb25qcyBcInBnXCIiLCJ3ZWJwYWNrOi8vc2VydmVyL2V4dGVybmFsIGNvbW1vbmpzIFwidXVpZFwiIiwid2VicGFjazovL3NlcnZlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zZXJ2ZXIvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zZXJ2ZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3NlcnZlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9vbCB9IGZyb20gXCJwZ1wiO1xuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSBcInV1aWRcIjtcblxuY29uc3QgcG9vbCA9IG5ldyBQb29sKHtcbiAgZGF0YWJhc2U6IFwiZGV2ZWxvcG1lbnRcIixcbiAgdXNlcjogXCJyb290XCIsXG4gIGhvc3Q6IFwiMTI3LjAuMC4xXCIsXG4gIHBvcnQ6IDU0MzIsXG59KTtcblxuZXhwb3J0IGNsYXNzIERiQWNjZXNzb3Ige1xuICBwdWJsaWMgZ2V0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHBvb2wuY29ubmVjdCgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBxdWVyeSA9IHsgdGV4dDogJ3NlbGVjdCAqIGZyb20gcHVibGljLlwiVG9kb1Rhc2tzXCInIH07XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQucXVlcnkocXVlcnkpO1xuICAgICAgLy8gc3VjY2VzcyByZXN1bHTjgpLov5TjgZlcbiAgICAgIHJldHVybiByZXN1bHQucm93cztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIC8vIGVycm9yIOe1kOaenOOCkui/lOOBmVxuICAgICAgdGhyb3cgZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAvLyDkvZXjgZPjgoxcbiAgICAgIGNsaWVudC5yZWxlYXNlKCk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBjcmVhdGUgPSBhc3luYyAodGl0bGU6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHBvb2wuY29ubmVjdCgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBxdWVyeSA9IHtcbiAgICAgICAgdGV4dDogJ2luc2VydCBpbnRvIHB1YmxpYy5cIlRvZG9UYXNrc1wiICh1dWlkLCB0aXRsZSwgXCJjcmVhdGVkQXRcIiwgXCJ1cGRhdGVkQXRcIikgVkFMVUVTKCQxLCAkMiwgY3VycmVudF90aW1lc3RhbXAsIGN1cnJlbnRfdGltZXN0YW1wKScsXG4gICAgICAgIHZhbHVlczogW3V1aWR2NCgpLCB0aXRsZV0sXG4gICAgICB9O1xuICAgICAgYXdhaXQgY2xpZW50LnF1ZXJ5KHF1ZXJ5KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY2xpZW50LnJlbGVhc2UoKTtcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIHVwZGF0ZSA9IGFzeW5jICh7XG4gICAgdXVpZCxcbiAgICB0aXRsZSxcbiAgICBzdGF0dXMsXG4gIH06IHtcbiAgICB1dWlkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBzdGF0dXM6IHN0cmluZztcbiAgfSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHV1aWQsIHRpdGxlLCBzdGF0dXMpO1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHBvb2wuY29ubmVjdCgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBxdWVyeSA9IHtcbiAgICAgICAgdGV4dDogJ3VwZGF0ZSBwdWJsaWMuXCJUb2RvVGFza3NcIiBzZXQgdGl0bGUgPSAkMiwgc3RhdHVzPSQzIHdoZXJlIHV1aWQgPSAkMScsXG4gICAgICAgIHZhbHVlczogW3V1aWQsIHRpdGxlLCBzdGF0dXNdLFxuICAgICAgfTtcbiAgICAgIGF3YWl0IGNsaWVudC5xdWVyeShxdWVyeSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsaWVudC5yZWxlYXNlKCk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBkZWxldGUgPSBhc3luYyAoeyB1dWlkIH06IHsgdXVpZDogc3RyaW5nIH0pID0+IHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBwb29sLmNvbm5lY3QoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcXVlcnkgPSB7XG4gICAgICAgIHRleHQ6ICdkZWxldGUgZnJvbSBwdWJsaWMuXCJUb2RvVGFza3NcIiB3aGVyZSB1dWlkID0gJDEnLFxuICAgICAgICB2YWx1ZXM6IFt1dWlkXSxcbiAgICAgIH07XG4gICAgICBhd2FpdCBjbGllbnQucXVlcnkocXVlcnkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGllbnQucmVsZWFzZSgpO1xuICAgIH1cbiAgfTtcbn1cbiIsImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgY29ycyBmcm9tIFwiY29yc1wiO1xuaW1wb3J0IHsgY3JlYXRlUm91dGVyIH0gZnJvbSBcIi4vcm91dGVyXCI7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmFwcC51c2UoY29ycygpKTtcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuYXBwLnVzZShleHByZXNzLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5cbmNvbnN0IHBvcnQgPSA4MDgwO1xuXG4vLyByb3V0ZXIg44KS44K744OD44OI77yfXG5hcHAudXNlKFwiL1wiLCBjcmVhdGVSb3V0ZXIoKSk7XG5cbmFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhgTGlzdGVuaW5nIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JHtwb3J0fS9gKTtcbn0pO1xuIiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IERiQWNjZXNzb3IgfSBmcm9tIFwic3JjL2RiQWNjZXNzb3JcIjtcblxuY29uc3QgZGJBY2Nlc3NvciA9IG5ldyBEYkFjY2Vzc29yKCk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVSb3V0ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG4gIC8vIFJlYWQ6ICcvaGVsbG9Xb3JsZCcg44Gu5Yem55CG44KS6Kit5a6a77yfXG4gIHJvdXRlci5nZXQoXCIvXCIsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNCb2R5ID0gYXdhaXQgZGJBY2Nlc3Nvci5nZXQoKTtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHsgbWVzc2FnZTogXCJnZXQgc3VjY2Vzc1wiLCByZXNCb2R5IH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IG1lc3NhZ2U6IFwiZ2V0IGZhaWxlZFwiIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gQ3JlYXRlXG4gIHJvdXRlci5wdXQoXCIvXCIsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXJlcS5ib2R5LnRpdGxlKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgbWVzc2FnZTogXCJ0aXRsZSByZXF1aXJlZFwiIH0pO1xuICAgICAgfVxuICAgICAgYXdhaXQgZGJBY2Nlc3Nvci5jcmVhdGUocmVxLmJvZHkudGl0bGUpO1xuICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoeyBtZXNzYWdlOiBcImNyZWF0ZSBzdWNjZXNzXCIgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgbWVzc2FnZTogXCJjcmVhdGUgZmFpbGVkXCIgfSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBVcGRhdGVcbiAgcm91dGVyLnBvc3QoXCIvOnRhc2tJZFwiLCBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFyZXEuYm9keSkge1xuICAgICAgICByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IG1lc3NhZ2U6IFwiYm9keSByZXF1aXJlZFwiIH0pO1xuICAgICAgfVxuICAgICAgYXdhaXQgZGJBY2Nlc3Nvci51cGRhdGUoeyB1dWlkOiByZXEucGFyYW1zLnRhc2tJZCwgLi4ucmVxLmJvZHkgfSk7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh7IG1lc3NhZ2U6IFwidXBkYXRlIHN1Y2Nlc3NcIiB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBtZXNzYWdlOiBcInVwZGF0ZSBmYWlsZWRcIiB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIERlbGV0ZVxuICByb3V0ZXIuZGVsZXRlKFwiLzp0YXNrSWRcIiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghcmVxLmJvZHkpIHtcbiAgICAgICAgcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBtZXNzYWdlOiBcImJvZHkgcmVxdWlyZWRcIiB9KTtcbiAgICAgIH1cbiAgICAgIC8vIHJlcS5wYXJhbXMudGFza0lkIOOBriB0YXNrSWQg44GvcGF0aCAvOnRhc2tJZCDjgavmupbjgZjjgabmsbrjgb7jgaPjgabjgYTjgotcbiAgICAgIGF3YWl0IGRiQWNjZXNzb3IuZGVsZXRlKHsgdXVpZDogcmVxLnBhcmFtcy50YXNrSWQgfSk7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh7IG1lc3NhZ2U6IFwiZGVsZXRlIHN1Y2Nlc3NcIiB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgbWVzc2FnZTogXCJkZWxldGUgZmFpbGVkXCIgfSk7XG4gICAgfVxuICB9KTtcblxuICAvLyDjg6vjg7zjgr/jg7zjgpLov5TjgZlcbiAgcmV0dXJuIHJvdXRlcjtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXVpZFwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=