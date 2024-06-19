export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { disk, direction } = req.body;
      // TO DO: update the board and check for winner
      return res.json({ message: 'Disk spun' });
    }
  }