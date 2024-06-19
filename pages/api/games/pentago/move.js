
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { disk, row, col } = req.body;
      // TO DO: update the board and check for winner
      return res.json({ message: 'Move made' });
    }
  }