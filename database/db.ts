import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("app.db");

export const initDB = () => {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    --------------------------------------------------
    -- USERS TABLE
    --------------------------------------------------
    
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL UNIQUE,

      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      password TEXT NOT NULL,

      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT,

      deleted_at TEXT,
      is_deleted INTEGER DEFAULT 0,

      is_synced INTEGER DEFAULT 0,
      last_synced_at TEXT,

      version INTEGER DEFAULT 1
    );

    --------------------------------------------------
    -- SESSIONS TABLE
    --------------------------------------------------

    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL UNIQUE,

      user_id INTEGER NOT NULL,

      session_name TEXT NOT NULL,
      session_year INTEGER NOT NULL,
      is_current INTEGER DEFAULT 0,

      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT,

      deleted_at TEXT,
      is_deleted INTEGER DEFAULT 0,

      is_synced INTEGER DEFAULT 0,
      last_synced_at TEXT,

      version INTEGER DEFAULT 1,

      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    --------------------------------------------------
    -- CUSTOMERS TABLE
    --------------------------------------------------

    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL UNIQUE,

      session_id INTEGER NOT NULL,

      customer_name TEXT NOT NULL,
      customer_village TEXT,
      phone TEXT,
      image TEXT,

      total_land REAL DEFAULT 0,
      total_cost REAL DEFAULT 0,
      paid REAL DEFAULT 0,

      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT,

      deleted_at TEXT,
      is_deleted INTEGER DEFAULT 0,

      is_synced INTEGER DEFAULT 0,
      last_synced_at TEXT,

      version INTEGER DEFAULT 1,

      FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
    );

    --------------------------------------------------
    -- INDEXES (Performance)
    --------------------------------------------------
    CREATE INDEX IF NOT EXISTS idx_users_uuid ON users(uuid);
    CREATE INDEX IF NOT EXISTS idx_sessions_uuid ON sessions(uuid);
    CREATE INDEX IF NOT EXISTS idx_customers_uuid ON customers(uuid);

    CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_customers_session_id ON customers(session_id);

    CREATE INDEX IF NOT EXISTS idx_users_sync ON users(is_synced);
    CREATE INDEX IF NOT EXISTS idx_sessions_sync ON sessions(is_synced);
    CREATE INDEX IF NOT EXISTS idx_customers_sync ON customers(is_synced);

    --------------------------------------------------
    -- SYNC LOG TABLE (Optional but Recommended)
    --------------------------------------------------
    CREATE TABLE IF NOT EXISTS sync_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entity_name TEXT,
      entity_uuid TEXT,
      action TEXT,
      payload TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      is_processed INTEGER DEFAULT 0
    );
  `);
};
