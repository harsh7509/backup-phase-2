import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbconnect';
import Dealer from '@/models/Dealers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const dealers = await Dealer.find({});
      res.status(200).json({ success: true, data: dealers });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching dealers', error });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, phone, requirements } = req.body;
      const dealer = await Dealer.create({ name, email, phone, requirements });
      res.status(201).json({ success: true, data: dealer });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error creating dealer', error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
