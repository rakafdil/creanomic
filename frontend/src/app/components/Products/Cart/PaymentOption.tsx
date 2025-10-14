type Props = {
  label: string;
  icon: string;
  selected: boolean;
  onSelect: () => void;
};

export default function PaymentOption({
  label,
  icon,
  selected,
  onSelect,
}: Props) {
  return (
    <label
      className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
        selected
          ? "border-green-600 bg-green-50 shadow-sm"
          : "border-gray-300 bg-white"
      }`}
    >
      <input
        type="radio"
        name="paymentMethod" // Name attribute is important for radio button grouping
        checked={selected}
        onChange={onSelect}
        className="sr-only" // Hide the default radio button
      />
      {/* Custom Radio Button */}
      <span
        className={`w-5 h-5 flex items-center justify-center border rounded-full mr-4 ${
          selected ? "border-green-600" : "border-gray-400"
        }`}
      >
        {selected && (
          <span className="w-2.5 h-2.5 bg-green-600 rounded-full"></span>
        )}
      </span>

      <img src={icon} alt={label} className="h-6 mr-3 object-contain" />
      <span className="font-medium text-gray-700">{label}</span>
    </label>
  );
}
