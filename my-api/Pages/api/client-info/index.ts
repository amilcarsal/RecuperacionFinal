import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { client_id, info_type, created_by, status } = req.body;

    try {
      const query = `
        INSERT INTO client_info (client_id, info_type, created_by, status)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const values = [client_id, info_type, created_by, status];
      const result = await pool.query(query, values);

      res.status(201).json({ client_info: result.rows[0] });
    } catch (error) {
      res.status(500).json({ error: 'Error adding client info' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
