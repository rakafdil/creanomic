type Props = {
  label: string;
  value?: number;
  className?: string;
};

export default function SummaryRow({
  label,
  value,
  className = "py-1",
}: Props) {
  const formattedValue = value ? `Rp ${value.toLocaleString("id-ID")}` : "";

  return (
    <div
      className={`flex justify-between items-center text-base sm:text-lg ${className} ${value ?? "animate-pulse"}`}
    >
      <span className="font-light">{label}</span>
      {value ? (
        <span className="font-medium">{formattedValue}</span>
      ) : (
        <div className="h-4 w-32 rounded-md bg-gray-200" />
      )}
    </div>
  );
}
