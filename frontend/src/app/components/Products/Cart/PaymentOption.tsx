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
      className={`flex items-center border rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-200 ${
        selected
          ? "border-green-600 bg-green-50 shadow-sm"
          : "border-gray-300 bg-white"
      }`}
    >
      <input
        type="radio"
        name="paymentMethod"
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />
      {/* Custom Radio Button */}
      <span
        className={`w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center border rounded-full mr-3 sm:mr-4 flex-shrink-0 ${
          selected ? "border-green-600" : "border-gray-400"
        }`}
      >
        {selected && (
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-600 rounded-full"></span>
        )}
      </span>

      <img 
        src={icon} 
        alt={label} 
        className="h-5 sm:h-6 mr-2 sm:mr-3 object-contain flex-shrink-0" 
      />
      <span className="font-medium text-gray-700 text-sm sm:text-base">{label}</span>
    </label>
  );
}