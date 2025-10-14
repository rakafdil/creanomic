type Props = {
  label: string;
  value: number;
  className?: string;
};

export default function SummaryRow({
  label,
  value,
  className = "py-1",
}: Props) {
  const formattedValue = `Rp ${value.toLocaleString("id-ID")}`;

  return (
    <div className={`flex justify-between items-center text-lg  ${className}`}>
      <span className={"font-light"}>{label}</span>
      <span className={"font-medium"}>{formattedValue}</span>
    </div>
  );
}
