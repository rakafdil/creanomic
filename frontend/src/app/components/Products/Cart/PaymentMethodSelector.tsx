import PaymentOption from "./PaymentOption";
import React, { useMemo } from "react";

type Props = {
  method?: string;
  onSelect: (method: string) => void;
};

export default function PaymentMethodSelector({ method, onSelect }: Props) {
  const options = useMemo(
    () => [
      { label: "Paypal", icon: "/assets/logos_paypal.svg" },
      { label: "QRIS", icon: "/assets/qris.svg" },
      { label: "OVO", icon: "/assets/ovo.svg" },
      { label: "Gopay", icon: "/assets/gopay.svg" },
    ],
    []
  );

  return (
    <div className="bg-white w-full p-4 sm:p-5 lg:p-0 rounded-xl lg:rounded-none">
      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
        Select Payment Method
      </h3>
      <div role="list" className="space-y-2 sm:space-y-3">
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