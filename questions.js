export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { subject, type, year } = req.query;

  if (!subject || !type || !year) {
    return res.status(400).json({ error: 'Missing subject, type, or year' });
  }

  try {
    const url = `https://questions.aloc.com.ng/api/v2/q?subject=${subject}&type=${type}&year=${year}`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AccessToken': 'ALOC-4dc4c56e978c63e7f2c0'
      }
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch questions', details: error.message });
  }
}
