export default async function handler(req, res) {
  const hostname = 'https://*******.app.invoicexpress.com'
  const path = '/invoices.json'
  const key = '******************************************'

  if (req.method !== 'POST') {
    return res.status(400).send('Invalid HTTP method');
  }

  const init = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(req.body),
  }

  try {
    const response = await fetch(`${hostname}${path}?api_key=${key}`, init)
    const json = await response.json()

    res.send(json)
  } catch (err) {
    res.send(err)
  }
}
