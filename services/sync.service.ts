import axios from "axios";
import { db } from "../database/db";

const API = "https://your-api.com";

export const SyncService = {
  async push() {
    const unsyncedUsers = await db.getAllAsync(
      `SELECT * FROM users WHERE is_synced = 0`
    );

    for (const user of unsyncedUsers) {
      await axios.post(`${API}/users/sync`, user);

      await db.runAsync(
        `UPDATE users 
         SET is_synced = 1, last_synced_at = CURRENT_TIMESTAMP 
         WHERE uuid = ?`,
        [user.uuid]
      );
    }
  },

  async pull(userId: number) {
    const { data } = await axios.get(`${API}/sync/${userId}`);

    for (const session of data.sessions) {
      await db.runAsync(
        `INSERT OR REPLACE INTO sessions 
         (uuid, user_id, session_name, session_year, is_current, version, is_synced)
         VALUES (?, ?, ?, ?, ?, ?, 1)`,
        [
          session.uuid,
          userId,
          session.session_name,
          session.session_year,
          session.is_current,
          session.version
        ]
      );
    }
  }
};