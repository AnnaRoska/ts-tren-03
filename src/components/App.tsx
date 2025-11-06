import OrderForm from "./OrderForm";

export default function App() {
  const handleOrder = (data: string) => {
    console.log("Order received from:", data);
    // можна зберегти замовлення, викликати API, показати повідомлення тощо
  };

  return (
    <>
      <h1>Place your order</h1>
      <OrderForm onSubmit={handleOrder} />
    </>
  );
}