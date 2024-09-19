import { ThemeToggle } from "@/app/components/dashboard/ThemeToggle";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllPostsBySubdirectory } from "@/services/posts";
import Image from "next/image";
import DefaultImage from "@/public/default.png";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function BlogIndexPage({
  params,
}: {
  params: { subdirectory: string };
}) {
  const data = await getAllPostsBySubdirectory(params.subdirectory);

  if (!data) notFound();

  const site = data.site;
  const posts = data.posts;

  return (
    <>
      <nav className="grid grid-cols-3 my-10">
        <div className="col-span-1" />
        <div className="flex items-center gap-x-4 justify-center">
          <h3 className="text-3xl font-semibold tracking-tight">{site.name}</h3>
        </div>

        <div className="col-span-1 flex w-full justify-end">
          <ThemeToggle />
        </div>
      </nav>

      <div className="grid grid-cols-1 grid-rows-[200px_auto_auto] gap-x-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6">
        {posts.map((post) => (
          <Card key={post.id} className="grid grid-rows-subgrid row-span-3">
            <Image
              src={post.image || DefaultImage}
              alt={post.title}
              className="rounded-t-lg object-cover w-full h-[200px] row-span-1"
              width={400}
              height={200}
            />
            <CardHeader>
              <CardTitle className="truncate">{post.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {post.small_description}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/blog/${params.subdirectory}/${post.slug}`}>
                  Read More
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
