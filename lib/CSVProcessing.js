import { DateTime } from 'luxon'
import * as CountriesList from '../lib/CountriesList'


const getProducts = function (orders, orderId) {
  let products = []
  for (const order of orders) {
    if (order.data[0] === orderId) {
      products.push({
        name: order.data[49],
        description: `Variant: ${order.data[60]}; Composition:  ${order.data[63]}; Size: ${order.data[67]}; EAN13: ${order.data[68]}`,
        quantity: order.data[72],
        unit_price: order.data[73],
        discount: order.data[76],
      })
    }
  }

  return products
}


export function getInvoices (orders) {
  let invoices = []

  for (const order of orders) {
    const existent = invoices.some((invoice) => {
      return invoice.reference === order.data[0]
    })

    if (!existent) {
      const formattedDate = DateTime.fromSQL(order.data[1]).toLocaleString()
      const countryName = CountriesList.getCountryName(order.data[29]).country
      const taxExemption = CountriesList.isEUCountry(order.data[29]) ? 'M16' : 'M05'

      const invoice = {
        reference: order.data[0],
        date: formattedDate,
        due_date: formattedDate,
        tax_exemption: taxExemption,
        client: {
          name: order.data[22],
          email: order.data[23],
          address: `${order.data[25]}, ${order.data[26]}`,
          city: order.data[28],
          postal_code: order.data[27],
          country: countryName,
          fiscal_id: order.data[30],
        },
        items: getProducts(orders, order.data[0]),
      }

      invoices.push(invoice)
    }
  }

  return invoices
}

export function validateCSV (csvColumns) {
  const columns = ["Order id", "Date", "Order updated on", "Order line updated on", "Status", "Line", "Season", "Price list", "Price list code", "Sales person", "Sales admin", "Purchase Order #", "Sales Order #", "Delivery start", "Delivery end", "Order type", "Order picking", "Assigned catalog code", "Assigned catalog name", "Customer name", "Customer reference", "Buyer email", "Billing company", "Billing e-mail", "Billing tel", "Billing address 1", "Billing address 2", "Billing zipcode", "Billing city", "Billing country", "Vat number", "Delivery reference", "Delivery company", "Delivery e-mail", "Delivery tel", "Delivery address 1", "Delivery address 2", "Delivery zipcode", "Delivery city", "Delivery country", "Retailer extra field 1", "Retailer extra field 2", "Retailer extra field 3", "Order notes", "Collection", "Category", "Sub category", "Sub-sub category", "Product model", "Product name", "Product reference", "Product extra field 1", "Product extra field 2", "Product extra field 3", "Product extra field 4", "Product extra field 5", "Product extra field 6", "Product extra field 7", "Product extra field 8", "Product extra field 9", "Variant name", "Variant code", "Description", "Composition", "Fabric / print", "Is core", "Size family name", "Size name", "EAN13", "SKU", "Comment", "Quantity mode", "Quantity", "Unit price", "Net amount", "Pre-discount amount", "Discount rate", "Currency", "Cost price", "Sugg. retail price"]
  return JSON.stringify(csvColumns) === JSON.stringify(columns)
}

