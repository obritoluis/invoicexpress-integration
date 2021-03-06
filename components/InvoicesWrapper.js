import { useState } from 'react'
import Invoice from './Invoice'

export default function InvoicesWrapper(props) {
  const [invoiceVisible, setInvoiceVisible] = useState(0)
  const { invoices } = props

  return (
    <div className="invoices-wrapper">
      <header>
        <div className="heading">
          <h3>You're about to create these invoices in InvoiceXpress</h3>
        </div>
        <div className="buttons">
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded confirm"
            onClick={props.createInvoices}
          >
            Confirm
          </button>
        </div>
      </header>
      <div className="invoices">
        {invoices.map((invoice, i) => {
          return (
            <Invoice
              key={invoice.reference}
              invoice={invoice}
              mainVisible={i === invoiceVisible ? true : false}
              setInvoiceVisible={setInvoiceVisible}
            />
          )
        })}
      </div>
    </div>
  )
}
