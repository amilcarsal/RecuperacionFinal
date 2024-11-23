import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { first_name, last_name, gender, birth_date, status } = req.body;

    try {
      const query = `
        INSERT INTO clients (first_name, last_name, gender, birth_date, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const values = [first_name, last_name, gender, birth_date, status];
      const result = await pool.query(query, values);

      res.status(201).json({ client: result.rows[0] });
    } catch (error) {
      res.status(500).json({ error: 'Error creating client' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
