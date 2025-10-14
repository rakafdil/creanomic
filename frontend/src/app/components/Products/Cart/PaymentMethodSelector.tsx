import PaymentOption from "./PaymentOption";
import React, { useMemo } from "react";

type Props = {
  method?: string;
  onSelect: (method: string) => void;
};

export default function PaymentMethodSelector({ method, onSelect }: Props) {
  const options = useMemo(
    () => [
      { label: "Paypal", icon: "/assets/logos_paypal.svg" }, // Placeholder icons
      { label: "QRIS", icon: "/assets/qris.svg" },
      { label: "OVO", icon: "/assets/ovo.svg" },
      { label: "Gopay", icon: "/assets/gopay.svg" },
    ],
    []
  );

  return (
    <div className="bg-white w-full">
      <h3 className="text-xl font-bold mb-4">Select Payment Method</h3>
      <div role="list" className="space-y-3">
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
