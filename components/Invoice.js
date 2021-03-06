import Item from './Item'

export default function Invoice(props) {
  const { reference, date, due_date, items } = props.invoice
  const { address, city, country, email, fiscal_id, name, postal_code } = props.invoice.client

  const toggleVisibility = (e) => {
    e.persist()
    e.preventDefault()
    const thisSection = e.currentTarget
    const index = Array.from(thisSection.parentNode.children).indexOf(thisSection)

    props.setInvoiceVisible(index)
  }

  const clientInfo = (
    <div className="client">
      <h5><b>Name:</b> {name}</h5>
      <ul>
          <li><b>Address:</b> {address}</li>
          <li><b>Postal Code:</b> {postal_code}</li>
          <li><b>City:</b> {city}</li>
          <li><b>Country:</b> {country}</li>
          <li><b>Fiscal ID:</b> {fiscal_id}</li>
          <li><b>Email:</b> {email}</li>
      </ul>
    </div>
  )

  const invoiceDetails = (
    <table className="table-auto invoice-details">
      <tbody>
        <tr>
          <th><span>Order ID #</span></th>
          <td><span>{reference}</span></td>
        </tr>
        <tr>
          <th><span>Date</span></th>
          <td><span>{date}</span></td>
        </tr>
        <tr>
          <th><span>Due Date</span></th>
          <td><span>{due_date}</span></td>
        </tr>
      </tbody>
    </table>
  )

  const products = (
    <table className="table-auto">
      <thead>
        <tr>
          <th><span>Name</span></th>
          <th><span>Description</span></th>
          <th><span>Quantity</span></th>
          <th><span>Unit Price (€)</span></th>
          <th><span>Discount</span></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          return <Item key={`${item.name}${item.description}`} item={item} />
        })}
      </tbody>
    </table>
  )

  return (
    <section className="shadow" onClick={toggleVisibility}>
      <article className="border-b">
        <div className="border-l-2 bg-grey-lightest border-indigo">
          <header className="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none">
            <span className="text-indigo font-thin text-xl font-semibold">
                {name}
            </span>
            <div className="rounded-full border border border-indigo w-7 h-7 flex items-center justify-center bg-indigo">
                <svg aria-hidden="true" className="" data-reactid="266" fill="none" height="24" stroke="#606F7B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
          </header>
          <main className={props.mainVisible ? 'visible' : undefined}>
            <div className="invoice-header">
              <div className="p-5 pl-8 pr-8 text-grey-darkest client-info">
                {clientInfo}
              </div>
              <div className="p-5 pl-8 pr-8">
                <div className="text-grey-darkest invoice-details">
                  {invoiceDetails}
                </div>
              </div>
            </div>
            <div className="products-table">
              <div className="p-5 pl-8 pr-8 ">
                {products}
              </div>
            </div>
          </main>
        </div>
      </article>
    </section>
  )
}