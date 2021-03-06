export default function Success(props) {
  const { message } = props

  return (
    <div className="alert">
      <div className="bg-teal-100 border-l-4 border-teal-500 text-teal-700 p-4" role="alert">
        <p className="font-bold">Success</p>
        <p>{message}</p>
      </div>
    </div>
  )
}