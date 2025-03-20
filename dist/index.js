"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var client_1 = require("@prisma/client");
var cors_1 = __importDefault(require("cors"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var prisma = new client_1.PrismaClient();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/users", userRoutes_1.default);
app.get("/", function (req, res) {
    res.send("Benvenuti nel magazzino");
});
app.listen(PORT, function () {
    console.log("Server in esecuzione su http://localhost:".concat(PORT));
});
