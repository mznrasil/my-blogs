import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllSites } from "@/services/sites";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DefaultImage from "@/public/default.png";
import { EmptyState } from "@/app/components/dashboard/EmptyState";

export default async function SitesRoute() {
  const sites = await getAllSites();
  console.log({ sites });

  return (
    <>
      <div className="w-full flex justify-end">
        <Button asChild>
          <Link href={"/dashboard/sites/new"}>
            <PlusCircle className="mr-2 size-4" />
            Create Site
          </Link>
        </Button>
      </div>

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
    </>
  );
}
