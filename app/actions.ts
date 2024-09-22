"use server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { postSchema, siteSchema } from "@/lib/zod-schemas";
import {
  createSite,
  deleteSite,
  getAllSites,
  updateSiteImage,
} from "@/services/sites";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "@/services/posts";
import { handleAxiosError } from "@/lib/axios/client";
import { initiatePayment } from "@/services/payments";
import { checkSubscriptionStatus } from "@/services/subscriptions";
import { requireUser } from "./utils/requireUser";

export async function CreateSiteAction(_: any, formData: FormData) {
  const submittedData = parseWithZod(formData, {
    schema: siteSchema,
  });

  if (submittedData.status !== "success") {
    return submittedData.reply();
  }

  const [subscribed, sites = []] = await Promise.all([
    checkSubscriptionStatus(),
    getAllSites(),
  ]);

  if (!subscribed && sites.length === 1) {
    return redirect("/dashboard/pricing");
  }

  try {
    await createSite({
      name: submittedData.value.name,
      description: submittedData.value.description,
      subdirectory: submittedData.value.subdirectory,
    });
  } catch (error) {
    const err = handleAxiosError(error);
    throw new Error(err);
  }

  return redirect("/dashboard/sites");
}

export async function CreatePostAction(_: any, formData: FormData) {
  const submittedData = parseWithZod(formData, {
    schema: postSchema,
  });

  if (submittedData.status !== "success") {
    return submittedData.reply();
  }

  const [subscribed, posts = []] = await Promise.all([
    checkSubscriptionStatus(),
    getAllPosts(),
  ]);

  if (!subscribed && posts.length === 20) {
    return redirect("/dashboard/pricing");
  }

  try {
    await createPost({
      title: submittedData.value.title,
      slug: submittedData.value.slug,
      small_description: submittedData.value.small_description,
      image: submittedData.value.image,
      article_content: JSON.parse(submittedData.value.article_content),
      site_id: formData.get("siteID") as string,
    });
  } catch (error) {
    console.error(error);
  }

  return redirect(`/dashboard/sites/${formData.get("siteID") as string}`);
}

export async function UpdatePostAction(_: any, formData: FormData) {
  const submittedData = parseWithZod(formData, {
    schema: postSchema,
  });

  if (submittedData.status !== "success") {
    return submittedData.reply();
  }

  await updatePost({
    postID: formData.get("postID") as string,
    data: {
      title: submittedData.value.title,
      small_description: submittedData.value.small_description,
      image: submittedData.value.image,
      slug: submittedData.value.slug,
      article_content: JSON.parse(submittedData.value.article_content),
      site_id: formData.get("siteID") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteID") as string}`);
}

export async function DeletePostAction(formData: FormData) {
  await deletePost(
    formData.get("siteID") as string,
    formData.get("postID") as string,
  );

  return redirect(`/dashboard/sites/${formData.get("siteID") as string}`);
}

export async function UpdateSiteImage(formData: FormData) {
  await updateSiteImage(formData.get("siteID") as string, {
    image_url: formData.get("image_url") as string,
  });

  return redirect(`/dashboard/sites/${formData.get("siteID") as string}`);
}

export async function DeleteSiteAction(formData: FormData) {
  await deleteSite(formData.get("siteID") as string);

  return redirect(`/dashboard/sites`);
}

export async function CreateSubscription(formData: FormData) {
  await requireUser();

  let payment_url = "";
  try {
    const data = await initiatePayment({
      plan_id: Number(formData.get("plan_id")),
    });

    if (!data) return;
    payment_url = data.payment_url;
  } catch (error) {
    handleAxiosError(error);
  }
  redirect(payment_url);
}
