export default function Item(props) {
  const { name, description, quantity, unit_price, discount } = props.item

  return (
    <tr>
      <td><span>{name}</span></td>
      <td><span>{description}</span></td>
      <td><span>{quantity}</span></td>
      <td><span>{unit_price}</span></td>
      <td><span>{discount}</span></td>
    </tr>
  )
}