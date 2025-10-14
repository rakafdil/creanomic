import SummaryRow from "./SummaryRow";
import ConfirmButton from "./ConfirmButton";

type OrderSummaryData = {
  items: number;
  subTotal: number;
  shipping: number;
  taxes: number;
  total: number;
};

export default function OrderSummary({
  summary,
}: {
  summary: OrderSummaryData;
}) {
  return (
    <div className="bg-white rounded-xl border-1 p-6 w-full">
      <h3 className="text-2xl font-bold pb-4 mb-4 border-b-1">Order Summary</h3>
      <div className="space-y-2">
        <SummaryRow
          label={`Items (${summary.items})`}
          value={summary.subTotal}
        />
        <SummaryRow label="Shipping" value={summary.shipping} />
        <SummaryRow label="Taxes" value={summary.taxes} />
      </div>
      <div className="border-t my-4"></div>
      <SummaryRow label="Total" value={summary.total} className="py-4" />
      <ConfirmButton />
    </div>
  );
}
