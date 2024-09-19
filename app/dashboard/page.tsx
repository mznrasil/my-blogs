import { getAllPosts } from "@/services/posts";
import { getAllSites } from "@/services/sites";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { EmptyState } from "../components/dashboard/EmptyState";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import DefaultImage from "@/public/default.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardIndexPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user == null) {
    redirect("/api/auth/login");
  }

  const [sites, posts] = await Promise.all([getAllSites(3), getAllPosts(3)]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Your sites</h2>
      {sites !== undefined && sites !== null && sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {sites.map((site) => (
            <Card key={site.id}>
              <Image
                src={site.image_url || DefaultImage}
                alt={site.name}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{site.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {site.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${site.id}`}>
                    View Articles
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="You don't have any sites created"
          description="
        You currently don't have any site. Please create some so that you
        can see them right here!"
          buttonText="Create Site"
          href="/dashboard/sites/new"
        />
      )}

      <h2 className="text-2xl mt-10 font-semibold mb-5">Recent Articles</h2>
      {posts !== undefined && posts !== null && posts.length > 0 ? (
        <div className="grid grid-cols-1 grid-rows-[200px_auto_auto] gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
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
                  <Link href={`/dashboard/sites/${post.site_id}/${post.id}`}>
                    Edit Article
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="You don't have any articles created"
          description="
        You currently don't have any article. Please create some so that you
        can see them right here!"
          buttonText="Create Article"
          href="/dashboard/sites"
        />
      )}
    </div>
  );
}
