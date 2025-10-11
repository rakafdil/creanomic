import React from "react";

type Review = {
    id: number;
    name: string;
    date: string; // ISO or friendly string
    rating: number; // 1-5
    text: string;
};

const reviews: Review[] = [
    {
        id: 1,
        name: "Siti",
        date: "2025-09-10",
        rating: 5,
        text: "Pisangnya segar dan manis banget! Anak-anak suka.",
    },
    {
        id: 2,
        name: "Budi",
        date: "2025-08-22",
        rating: 4,
        text: "Kemasan higienis dan rapi.",
    },
];

const Stars = ({ value }: { value: number }) => (
    <span className="inline-flex" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
            <svg
                key={i}
                className={`w-4 h-4 ${i < value ? "text-yellow-400" : "text-gray-300"}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.375 2.455a1 1 0 00-.364 1.118l1.286 3.958c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.489 2.387c-.785.57-1.84-.197-1.54-1.118l1.286-3.958a1 1 0 00-.364-1.118L2.518 9.385c-.783-.57-.38-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.958z" />
            </svg>
        ))}
    </span>
);

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

const ReviewTab: React.FC = () => {
    const avg =
        reviews.length > 0
            ? +(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
            : 0;

    return (
        <div className="text-gray-700">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold">{avg}</span>
                    <Stars value={Math.round(avg)} />
                </div>
                <span className="text-sm text-gray-500">{reviews.length} ulasan</span>
            </div>

            <ul className="space-y-4">
                {reviews.map((r) => (
                    <li key={r.id} className="flex gap-3">
                        <div className="flex-none w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-700">
                            {r.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-medium">{r.name}</div>
                                <div className="text-xs text-gray-400">{formatDate(r.date)}</div>
                            </div>

                            <div className="mt-1">
                                <Stars value={r.rating} />
                            </div>

                            <p className="mt-2 text-sm text-gray-700">{r.text}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewTab;