import { Button } from "@/components/ui/button";
import { File, PlusCircle } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export function EmptyState({
  title,
  description,
  buttonText,
  href,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col border border-dashed p-8 justify-center items-center rounded-md text-center animate-in fade-in-50">
      <div className="bg-primary/10 size-20 flex justify-center items-center rounded-full">
        <File className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="text-muted-foreground text-sm mt-2 mb-8 max-w-md leading-tight">
        {description}
      </p>
      <Button asChild>
        <Link href={href}>
          <PlusCircle className="mr-2 size-4" />
          {buttonText}
        </Link>
      </Button>
    </div>
  );
}
