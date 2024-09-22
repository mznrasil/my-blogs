import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Hero } from "./components/landing/Hero";
import { Logos } from "./components/landing/Logos";
import { Features } from "./components/landing/Features";
import { PricingTable } from "./components/shared/Pricing";
import { redirect } from "next/navigation";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user?.id) redirect("/dashboard");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Hero />
      <Logos />
      <Features />
      <PricingTable subscribed={false} />
    </div>
  );
}
