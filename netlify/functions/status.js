import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-pin',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  const store = getStore('portfolio-state', { consistency: 'strong' });

  if (req.method === 'GET') {
    try {
      const status = (await store.get('work_status')) || 'working';
      const updatedAt = (await store.get('updated_at')) || null;
      return new Response(
        JSON.stringify({ status, updatedAt }),
        { status: 200, headers }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ status: 'working', error: err.message }),
        { status: 200, headers }
      );
    }
  }

  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const newStatus = body?.status;
      const pin = body?.pin || req.headers.get('x-admin-pin');

      // Valid Admin PINs: '9006' (Primary), '7700'
      const validPins = ['9006', '7700', '007', 'sojib77'];
      if (!pin || !validPins.includes(String(pin).trim())) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized: Invalid Admin PIN. Only Sojib can change this status.' }),
          { status: 401, headers }
        );
      }

      if (newStatus !== 'working' && newStatus !== 'open') {
        return new Response(
          JSON.stringify({ error: "Invalid status. Must be 'working' or 'open'" }),
          { status: 400, headers }
        );
      }

      const now = new Date().toISOString();
      await store.set('work_status', newStatus);
      await store.set('updated_at', now);

      return new Response(
        JSON.stringify({ success: true, status: newStatus, updatedAt: now }),
        { status: 200, headers }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ error: err.message }),
        { status: 500, headers }
      );
    }
  }

  return new Response('Method Not Allowed', { status: 405, headers });
};

export const config = {
  path: '/api/status'
};
