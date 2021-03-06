import { useState } from 'react'
import { CSVReader } from 'react-papaparse'
import * as CSVProcessing from '../lib/CSVProcessing'
import * as InvoiceXpressAPI from '../lib/InvoiceXpressAPI'
import Layout from '../components/Layout'
import InvoicesWrapper from '../components/InvoicesWrapper'
import Error from '../components/alerts/Error'
import Success from '../components/alerts/Success'

export default function IndexPage() {
  const [invoices, setInvoices] = useState()
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const handleOnDrop = (data) => {
    const tableData = {
      columns: data.slice(0,1)[0].data,
      rows: data.slice(1, -1),
    }

    const isCSVValid = CSVProcessing.validateCSV(tableData.columns)
    if (isCSVValid) {
      setError()
      setSuccess('CSV file uploaded with success')
      const invoices = CSVProcessing.getInvoices(tableData.rows)
      setInvoices(invoices)
    } else {
      setSuccess()
      setInvoices()
      setError("The uploaded CSV file is invalid.")
    }
  }

  const handleOnError = (err, file, inputElem, reason) => {
    setError(err)
  }

  const handleOnRemoveFile = (data) => {
    setInvoices()
    setSuccess()
    setError()
  }

  const handleOnCreateInvoices = (e) => {
    e.preventDefault()

    invoices.forEach(async (invoice) => {
      const response = await InvoiceXpressAPI.createInvoice(invoice)

      if (Object.keys(response)[0] === 'error') {
        console.log(response.error)
        setSuccess()
        setError(response.error.message)
      } else if (Object.keys(response)[0] === 'errors') {
        response.errors.forEach((error) => {
          setSuccess()
          setError(error.error)
          console.log(error)
        })
        console.log(response.errors)
      } else {
        setError()
        setSuccess(`Invoice with the ID: ${response.invoice.id} created with success.`)
        console.log(response)
      }
    })
  }

  return (
    <Layout>
      <div className="upload-box">
      <h1>Click and Drag Upload</h1>
        <CSVReader
          onDrop={handleOnDrop}
          onError={handleOnError}
          addRemoveButton={true}
          onRemoveFile={handleOnRemoveFile}
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
      </div>

      {success && <Success message={success}/>}
      {error && <Error message={error}/>}

      {invoices &&
        <InvoicesWrapper
          invoices={invoices}
          createInvoices={handleOnCreateInvoices}
        />
      }
    </Layout>
  )
}
