export default function PaymentOption({ label, icon, selected, onSelect }) {
    return (
        <label
            className={`flex items-center border rounded-xl p-3 cursor-pointer mb-2 ${selected ? "border-green-500 bg-green-50" : "border-gray-300"
                }`}
        >
            <input
                type="radio"
                checked={selected}
                onChange={onSelect}
                className="mr-2"
            />
            <img src={icon} alt={label} className="w-6 h-6 mr-2" />
            <span>{label}</span>
        </label>
    );
}