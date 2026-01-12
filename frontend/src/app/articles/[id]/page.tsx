// app/articles/[id]/page.tsx
import { notFound } from "next/navigation";
import ArticleDetail from "@/components/Articles/ArticleDetail";
import { articles } from "@/data/articles";

export default function ArticleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const article = articles.find((item) => item.id === id);

  if (!article) return notFound();
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full p-2.5 bg-gradient-to-r from-green-950 via-green-800 to-green-950 inline-flex justify-center items-center gap-2.5">
        <div className="text-center justify-start text-white text-sm font-bold font-['Inter']">
          Welcome to GrowthWell
        </div>
      </div>
      <ArticleDetail article={article} />;{/* <Footer /> */}
    </div>
  );
}
