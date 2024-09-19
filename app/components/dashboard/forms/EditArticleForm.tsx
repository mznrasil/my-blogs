"use client";
import { UpdatePostAction } from "@/app/actions";
import TailwindEditor from "@/app/components/dashboard/EditorWrapper";
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/UploadThingComponents";
import { postSchema } from "@/lib/zod-schemas";
import { PostType } from "@/services/types";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Atom } from "lucide-react";
import Image from "next/image";
import { JSONContent } from "novel";
import { useActionState, useState } from "react";
import toast from "react-hot-toast";
import slugify from "react-slugify";

interface EditArticleFormProps {
  article: PostType;
}

export const EditArticleForm = ({ article }: EditArticleFormProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(article.image);
  const [value, setValue] = useState<JSONContent | undefined>(
    article.article_content,
  );

  const [title, setTitle] = useState<string | undefined>(article.title);
  const [slug, setSlug] = useState<string | undefined>(article.slug);

  const [lastResult, action] = useActionState(UpdatePostAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: postSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleSlugGeneration = () => {
    const titleInput = title;
    if (titleInput?.length === 0 || titleInput === undefined) {
      return toast.error("Please create a title first");
    }
    setSlug(slugify(titleInput));
    toast.success("Slug created");
  };

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Article Details</CardTitle>
        <CardDescription>Write about your article</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id={form.id}
          action={action}
          onSubmit={form.onSubmit}
          className="flex flex-col gap-6"
        >
          <input type="hidden" name="siteID" value={article.site_id} />
          <input type="hidden" name="postID" value={article.id} />
          <div className="grid gap-3">
            <Label>Title</Label>
            <Input
              name={fields.title.name}
              key={fields.title.key}
              defaultValue={fields.title.initialValue}
              placeholder="Next.js Blog"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <p className="text-red-500 text-sm">{fields.title.errors}</p>
          </div>

          <div className="grid gap-3">
            <Label>Slug</Label>
            <Input
              name={fields.slug.name}
              key={fields.slug.key}
              defaultValue={fields.slug.initialValue}
              placeholder="Article Slug"
              onChange={(e) => setSlug(e.target.value)}
              value={slug}
            />
            <Button
              type="button"
              className="w-fit"
              variant="secondary"
              onClick={handleSlugGeneration}
            >
              <Atom className="size-4 mr-2" />
              Generate Slug
            </Button>
            <p className="text-red-500 text-sm">{fields.slug.errors}</p>
          </div>

          <div className="grid gap-3">
            <Label>Small Description</Label>
            <Textarea
              name={fields.small_description.name}
              key={fields.small_description.key}
              defaultValue={article.small_description}
              placeholder="Small description for your blog article..."
              className="h-32"
            />
            <p className="text-red-500 text-sm">
              {fields.small_description.errors}
            </p>
          </div>

          <div className="grid gap-3">
            <Label>Cover Image</Label>
            <input
              type="hidden"
              key={fields.image.key}
              name={fields.image.name}
              defaultValue={fields.image.initialValue}
              value={imageUrl}
            />
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Uploaded Image"
                className="object-cover w-[200px] h-[200px] rounded-lg"
                width={200}
                height={200}
              />
            ) : (
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImageUrl(res[0].url);
                  toast.success("Image uploaded");
                }}
                onUploadError={(err) => {
                  console.error(err);
                  toast.error(err.message);
                }}
              />
            )}
            <p className="text-red-500 text-sm">{fields.image.errors}</p>
          </div>

          <div className="grid gap-3">
            <Label>Article Content</Label>
            <input
              type="hidden"
              key={fields.article_content.key}
              name={fields.article_content.name}
              defaultValue={fields.article_content.initialValue}
              value={JSON.stringify(value)}
            />
            <TailwindEditor initialValue={value} onChange={setValue} />
            <p className="text-red-500 text-sm">
              {fields.article_content.errors}
            </p>
          </div>

          <SubmitButton text="Edit Article" />
        </form>
      </CardContent>
    </Card>
  );
};
