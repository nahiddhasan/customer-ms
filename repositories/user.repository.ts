import * as Crypto from "expo-crypto";
import "react-native-get-random-values";

import { v4 as uuidv4 } from "uuid";
import { db } from "../database/db";

export const UserRepository = {
  // ===============================
  // CREATE USER
  // ===============================
  async create(user: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) {
    const existing = await this.findByEmail(user.email);
    if (existing) {
      throw new Error("User already exists");
    }

    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      user.password,
    );

    const uuid = uuidv4();

    await db.runAsync(
      `INSERT INTO users 
      (uuid, name, email, phone, password, is_synced, version)
      VALUES (?, ?, ?, ?, ?, 0, 1)`,
      [uuid, user.name, user.email, user.phone ?? null, hashedPassword],
    );

    return this.findByEmail(user.email);
  },

  // ===============================
  // FIND BY EMAIL
  // ===============================
  async findByEmail(email: string) {
    return db.getFirstAsync(
      `SELECT * FROM users 
       WHERE email = ? AND is_deleted = 0`,
      [email],
    );
  },

  // ===============================
  // FIND BY ID
  // ===============================
  async findById(id: number) {
    return db.getFirstAsync(
      `SELECT * FROM users 
       WHERE id = ? AND is_deleted = 0`,
      [id],
    );
  },

  // ===============================
  // FIND ALL ACTIVE USERS
  // ===============================
  async findAll() {
    return db.getAllAsync(
      `SELECT * FROM users 
       WHERE is_deleted = 0
       ORDER BY created_at DESC`,
    );
  },

  // ===============================
  // UPDATE USER
  // ===============================
  async update(
    id: number,
    data: { name?: string; email?: string; phone?: string },
  ) {
    await db.runAsync(
      `UPDATE users
       SET 
         name = COALESCE(?, name),
         email = COALESCE(?, email),
         phone = COALESCE(?, phone),
         updated_at = CURRENT_TIMESTAMP,
         is_synced = 0,
         version = version + 1
       WHERE id = ?`,
      [data.name ?? null, data.email ?? null, data.phone ?? null, id],
    );

    return this.findById(id);
  },

  // ===============================
  // SOFT DELETE
  // ===============================
  async softDelete(id: number) {
    await db.runAsync(
      `UPDATE users
       SET 
         is_deleted = 1,
         deleted_at = CURRENT_TIMESTAMP,
         is_synced = 0,
         version = version + 1
       WHERE id = ?`,
      [id],
    );
  },

  // ===============================
  // VERIFY PASSWORD (LOGIN)
  // ===============================
  async verifyPassword(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new Error("User not found");

    const hashed = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password,
    );

    if (hashed !== user.password) {
      throw new Error("Invalid password");
    }

    return user;
  },

  // ===============================
  // GET UNSYNCED USERS (FOR SYNC)
  // ===============================
  async getUnsynced() {
    return db.getAllAsync(
      `SELECT * FROM users 
       WHERE is_synced = 0`,
    );
  },

  // ===============================
  // MARK AS SYNCED
  // ===============================
  async markSynced(uuid: string) {
    await db.runAsync(
      `UPDATE users 
       SET 
         is_synced = 1, 
         last_synced_at = CURRENT_TIMESTAMP
       WHERE uuid = ?`,
      [uuid],
    );
  },
};
