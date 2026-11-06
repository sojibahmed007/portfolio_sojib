const STORAGE_ENDPOINT = 'https://api.restful-api.dev/objects/ff808181a09d98f701a1b28b2d965728';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-pin');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    try {
      const response = await fetch(STORAGE_ENDPOINT, { cache: 'no-store' });
      if (response.ok) {
        const item = await response.json();
        const status = item?.data?.status || 'working';
        const updatedAt = item?.data?.updatedAt || null;
        return res.status(200).json({ status, updatedAt });
      }
      return res.status(200).json({ status: 'working' });
    } catch (err) {
      return res.status(200).json({ status: 'working', error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const newStatus = body?.status;
      const pin = body?.pin || req.headers['x-admin-pin'];

      // Admin verification
      const validPins = ['9006', '7700', '007', 'sojib77'];
      if (!pin || !validPins.includes(String(pin).trim())) {
        return res.status(401).json({ error: 'Unauthorized: Invalid Admin PIN. Only Sojib can change this status.' });
      }

      if (newStatus !== 'working' && newStatus !== 'open') {
        return res.status(400).json({ error: "Invalid status. Must be 'working' or 'open'" });
      }

      const now = new Date().toISOString();
      const payload = {
        name: 'sojib_portfolio_status',
        data: {
          status: newStatus,
          updatedAt: now
        }
      };

      const putRes = await fetch(STORAGE_ENDPOINT, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!putRes.ok) {
        throw new Error('Failed to update remote storage');
      }

      return res.status(200).json({ success: true, status: newStatus, updatedAt: now });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
