import PaymentOption from "./PaymentOption";
import React, { useMemo } from "react";

type Props = {
    method?: string;
    onSelect: (method: string) => void;
};

export default function PaymentMethodSelector({ method, onSelect }: Props) {
    const options = useMemo(
        () => [
            { label: "Paypal", icon: "/paypal.png" },
            { label: "QRIS 1", icon: "/qris.png" },
            { label: "QRIS 2", icon: "/qris.png" },
            { label: "QRIS 3", icon: "/qris.png" },
        ],
        []
    );

    return (
        <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-3">Select Payment Method</h3>
            <div role="list" className="space-y-2">
                {options.map((o) => (
                    <PaymentOption
                        key={o.label}
                        label={o.label}
                        icon={o.icon}
                        selected={method === o.label}
                        onSelect={() => onSelect(o.label)}
                    />
                ))}
            </div>
        </div>
    );
}