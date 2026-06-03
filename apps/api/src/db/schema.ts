import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) throw new Error("Database not initialised — call initDb() first");
  return db;
}

export function initDb(): void {
  const dbPath = process.env["DATABASE_PATH"] ?? "./diamesh.db";
  const resolved = path.resolve(dbPath);

  db = new Database(resolved);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.pragma("synchronous = NORMAL");

  runMigrations(db);
  console.log(`[db] SQLite ready at ${resolved}`);
}

function runMigrations(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      dob         TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS cases (
      id               TEXT PRIMARY KEY,
      patient_id       TEXT NOT NULL REFERENCES patients(id),
      chief_complaint  TEXT NOT NULL,
      clinical_notes   TEXT,
      va_od            TEXT,
      va_os            TEXT,
      refraction_od    TEXT,
      refraction_os    TEXT,
      ocular_findings  TEXT,
      status           TEXT NOT NULL DEFAULT 'pending',
      created_at       TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS case_images (
      id                      TEXT PRIMARY KEY,
      case_id                 TEXT NOT NULL REFERENCES cases(id),
      image_type              TEXT NOT NULL,
      file_path               TEXT NOT NULL,
      vision_analysis_result  TEXT,
      created_at              TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS agent_runs (
      id              TEXT PRIMARY KEY,
      case_id         TEXT NOT NULL REFERENCES cases(id),
      agent_name      TEXT NOT NULL,
      model_used      TEXT NOT NULL,
      tokens_in       INTEGER NOT NULL DEFAULT 0,
      tokens_out      INTEGER NOT NULL DEFAULT 0,
      duration_ms     INTEGER NOT NULL DEFAULT 0,
      thinking_trace  TEXT,
      tool_calls_made TEXT NOT NULL DEFAULT '[]',
      result_json     TEXT NOT NULL DEFAULT '{}',
      inference_mode  TEXT NOT NULL DEFAULT 'local',
      created_at      TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS clinical_reports (
      id                   TEXT PRIMARY KEY,
      case_id              TEXT NOT NULL REFERENCES cases(id) UNIQUE,
      differentials_json   TEXT NOT NULL DEFAULT '[]',
      assessment           TEXT NOT NULL DEFAULT '',
      recommended_actions  TEXT NOT NULL DEFAULT '[]',
      education_content    TEXT NOT NULL DEFAULT '',
      disclaimer           TEXT NOT NULL DEFAULT '',
      created_at           TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS p2p_sessions (
      id                   TEXT PRIMARY KEY,
      provider_key         TEXT NOT NULL,
      connected_at         TEXT NOT NULL DEFAULT (datetime('now')),
      requests_delegated   INTEGER NOT NULL DEFAULT 0,
      fallbacks_triggered  INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_cases_patient    ON cases(patient_id);
    CREATE INDEX IF NOT EXISTS idx_images_case      ON case_images(case_id);
    CREATE INDEX IF NOT EXISTS idx_runs_case        ON agent_runs(case_id);
    CREATE INDEX IF NOT EXISTS idx_reports_case     ON clinical_reports(case_id);
  `);
}
