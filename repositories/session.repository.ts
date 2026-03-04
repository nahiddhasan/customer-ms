import { v4 as uuidv4 } from "uuid";
import { db } from "../database/db";

export const SessionRepository = {
  async create(userId: number, data: {
    session_name: string;
    session_year: number;
    is_current?: number;
  }) {
    const uuid = uuidv4();

    await db.runAsync(
      `INSERT INTO sessions 
      (uuid, user_id, session_name, session_year, is_current, is_synced)
      VALUES (?, ?, ?, ?, ?, 0)`,
      [
        uuid,
        userId,
        data.session_name,
        data.session_year,
        data.is_current ?? 0
      ]
    );

    return uuid;
  },

  async getByUser(userId: number) {
    return db.getAllAsync(
      `SELECT * FROM sessions 
       WHERE user_id = ? AND is_deleted = 0`,
      [userId]
    );
  }
};