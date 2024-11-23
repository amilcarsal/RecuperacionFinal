import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const query = `
        SELECT 
          c.id, c.first_name, c.last_name, c.gender, c.birth_date, c.status,
          ci.info_type, ci.created_at, ci.updated_at, ci.created_by, ci.status AS info_status
        FROM clients c
        LEFT JOIN client_info ci ON c.id = ci.client_id
        ORDER BY ci.created_at ASC, c.last_name ASC;
      `;
      const result = await pool.query(query);

      res.status(200).json({ data: result.rows });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching general list' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
