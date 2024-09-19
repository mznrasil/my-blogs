"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadDropzone } from "@/lib/UploadThingComponents";
import Image from "next/image";
import { useState } from "react";
import { SubmitButton } from "../SubmitButtons";
import toast from "react-hot-toast";
import { UpdateSiteImage } from "@/app/actions";

interface UploadImageFormProps {
  siteId: string;
}

export function UploadImageForm({ siteId }: UploadImageFormProps) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>
          This is the image of your site. You can change it here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={200}
            height={200}
            className="size-[200px] object-cover rounded-lg"
          />
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              toast.success("Image has been uploaded");
            }}
            onUploadError={() => {
              toast.error("Something went wrong!");
            }}
          />
        )}
      </CardContent>
      <CardFooter>
        <form action={UpdateSiteImage}>
          <input type="hidden" name="siteID" value={siteId} />
          <input type="hidden" name="image_url" value={imageUrl} />
          <SubmitButton text="Change Image" />
        </form>
      </CardFooter>
    </Card>
  );
}
