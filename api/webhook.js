const stocks = {};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const data = req.body;
    if (data && data.symbol) {
      stocks[data.symbol] = {
        ...data,
        updatedAt: new Date().toISOString()
      };
      return res.status(200).json({ ok: true, received: data.symbol });
    }
    return res.status(400).json({ error: 'missing symbol' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(Object.values(stocks));
  }

  return res.status(405).end();
}
