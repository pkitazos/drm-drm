import { OrderStatusDisplay } from "./order-status-display";

export default function Page() {
  return (
    <main className="grid place-items-center">
      <OrderStatusDisplay status={"Cancelled"} />
    </main>
  );
}
