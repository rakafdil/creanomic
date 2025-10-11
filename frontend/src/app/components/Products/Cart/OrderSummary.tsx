import SummaryRow from "./SummaryRow";
import ConfirmButton from "./ConfirmButton";

type OrderSummaryData = {
    items: number;
    shipping: number;
    taxes: number;
    discount: number;
    total: number;
};

export default function OrderSummary({ summary }: { summary: OrderSummaryData }) {
    return (
        <div className="bg-white rounded-2xl shadow p-4 w-80">
            <h3 className="font-semibold mb-2 border-b pb-2">Order Summary</h3>
            <SummaryRow label="Items" value={summary.items} />
            <SummaryRow label="Shipping" value={summary.shipping} />
            <SummaryRow label="Taxes" value={summary.taxes} />
            <SummaryRow label="Coupon Discount" value={-summary.discount} />
            <div className="border-t mt-2 pt-2">
                <SummaryRow label="Total" value={summary.total} bold />
            </div>
            <ConfirmButton />
        </div>
    );
}