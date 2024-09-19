import { RenderArticle } from "@/app/components/dashboard/RenderArticle";
import { Button } from "@/components/ui/button";
import { getPostBySlug } from "@/services/posts";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SlugRoute({
  params,
}: {
  params: { subdirectory: string; slug: string };
}) {
  const post = await getPostBySlug(params.subdirectory, params.slug);
  if (!post) return notFound();

  return (
    <>
      <div className="flex items-center gap-x-3 pt-10 pb-5">
        <Button size="icon" variant="outline" asChild>
          <Link href={`/blog/${params.subdirectory}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-medium">Go Back</h1>
      </div>

      <div className="flex flex-col items-center justify-center mb-10">
        <div className="m-auto w-full text-center md:w-7/12">
          <p className="m-auto my-5 w-10/12 text-sm font-light text-muted-foreground md:text-base">
            {new Intl.DateTimeFormat("np-NP", { dateStyle: "full" }).format(
              new Date(post.created_at),
            )}
          </p>
          <h1 className="mb-5 text-3xl font-bold md:text-5xl tracking-tighter">
            {post.title}
          </h1>
          <p className="m-auto w-10/12 text-muted-foreground line-clamp-3">
            {post.small_description}
          </p>
        </div>
      </div>

      <div
        className="relative m-auto mb-10 h-80 w-full max-w-screen-lg overflow-hidden md:mb-20 md:h-[450px] md:w-5/6
        md:rounded-2xl lg:w-2/3"
      >
        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={630}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      <RenderArticle json={post.article_content} />
    </>
  );
}
