import { EditArticleForm } from "@/app/components/dashboard/forms/EditArticleForm";
import { Button } from "@/components/ui/button";
import { getPostById } from "@/services/posts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EditRoute({
  params,
}: {
  params: { siteId: string; articleId: string };
}) {
  const post = await getPostById(params.siteId, params.articleId);

  return (
    <div>
      <div className="flex items-center">
        <Button size="icon" variant="outline" asChild className="mr-3">
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>

        <h1 className="text-xl font-semibold">Edit Article</h1>
      </div>
      {post !== null && post !== undefined && (
        <EditArticleForm article={post} />
      )}
    </div>
  );
}
