export async function createInvoice (invoiceToSend) {
  const hostname = window.location.href
  const path = 'api/createinvoice'

  const init = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      invoice: invoiceToSend
    }),
  }

  try {
    return await fetch(`${hostname}${path}`, init).then(response => response.json())
  } catch (err) {
    return {error: err}
  }
}
