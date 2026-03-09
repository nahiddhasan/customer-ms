import { v4 as uuidv4 } from "uuid";
import { db } from "../database/db";

export const CustomerRepository = {
  async create(sessionId: number, data: any) {
    const uuid = uuidv4();

    await db.runAsync(
      `INSERT INTO customers
      (uuid, session_id, customer_name, customer_village,
       phone, image, total_land, total_cost, paid, is_synced)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [
        uuid,
        sessionId,
        data.customer_name,
        data.customer_village,
        data.phone,
        data.image,
        data.total_land,
        data.total_cost,
        data.paid,
      ],
    );

    return uuid;
  },

  async getBySession(sessionId: number) {
    return db.getAllAsync(
      `SELECT *, (total_cost - paid) as due
       FROM customers
       WHERE session_id = ? AND is_deleted = 0`,
      [sessionId],
    );
  },
  async getCustomerBySession(sessionId: number) {
    return db.getAllAsync(
      `SELECT *, (total_cost - paid) as due
       FROM customers
       WHERE session_id = ? AND is_deleted = 0`,
      [sessionId],
    );
  },
};
