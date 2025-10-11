type Props = {
    label: string;
    value: number;
    bold?: boolean;
};

export default function SummaryRow({ label, value, bold }: Props) {
    return (
        <div className="flex justify-between text-sm py-1">
            <span className={bold ? "font-semibold" : ""}>{label}</span>
            <span className={bold ? "font-semibold" : ""}>Rp {value.toLocaleString()}</span>
        </div>
    );
}