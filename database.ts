import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("dev.db");

export default db;
