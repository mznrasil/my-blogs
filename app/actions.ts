"use server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { postSchema, siteSchema } from "@/lib/zod-schemas";
import { createSite, deleteSite, updateSiteImage } from "@/services/sites";
import { createPost, deletePost, updatePost } from "@/services/posts";
import { handleAxiosError } from "@/lib/axios/client";
import { getUserByID, updateCustomerID } from "@/services/user";
import { requireUser } from "./utils/requireUser";
import { stripe } from "./utils/stripe";

export async function CreateSiteAction(_: any, formData: FormData) {
  const submittedData = parseWithZod(formData, {
    schema: siteSchema,
  });

  if (submittedData.status !== "success") {
    return submittedData.reply();
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

  await createPost({
    title: submittedData.value.title,
    slug: submittedData.value.slug,
    small_description: submittedData.value.small_description,
    image: submittedData.value.image,
    article_content: JSON.parse(submittedData.value.article_content),
    site_id: formData.get("siteID") as string,
  });

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

export async function CreateSubscription() {
  const user = await requireUser();
  const stripeUser = await getUserByID(user.id);

  if (!stripeUser) redirect("/api/auth/login");

  let stripeUserId;
  if (!stripeUser?.customer_id) {
    const stripeCustomer = await stripe.customers.create({
      email: stripeUser.email,
      name: stripeUser.first_name,
    });

    stripeUserId = await updateCustomerID({
      id: user.id,
      customer_id: stripeCustomer.id,
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeUserId?.customer_id as string,
    mode: "subscription",
    billing_address_collection: "auto",
    payment_method_types: ["card"],
    customer_update: {
      address: "auto",
      name: "auto",
    },
    success_url: "http://localhost:3000/dashboard/payment/success",
    cancel_url: "http://localhost:3000/dashboard/payment/cancelled",
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
  });

  return redirect(session.url as string);
}
