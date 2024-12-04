import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbconnect';
import Farmer from '@/models/farmers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const farmers = await Farmer.find({});
      res.status(200).json({ success: true, data: farmers });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching farmers', error });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, phone, crops } = req.body;
      const farmer = await Farmer.create({ name, email, phone, crops });
      res.status(201).json({ success: true, data: farmer });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error creating farmer', error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
