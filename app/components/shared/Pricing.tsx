import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheck } from "lucide-react";
import { SubmitButton } from "../dashboard/SubmitButtons";
import Link from "next/link";
import { CreateSubscription } from "@/app/actions";

interface PricingPlan {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

const PricingPlans: PricingPlan[] = [
  {
    id: 1,
    cardTitle: "Freelancer",
    cardDescription: "The best pricing plan for people starting out.",
    benefits: [
      "1 Site",
      "Up to 1000 visitors",
      "Up to 1000 visitors",
      "Up to 1000 visitors",
    ],
    priceTitle: "Free",
  },
  {
    id: 2,
    cardTitle: "Startup",
    cardDescription: "The best pricing plan for professionals.",
    benefits: [
      "Unlimited Sites",
      "Unlimited visitors",
      "Unlimited visitors",
      "Unlimited visitors",
    ],
    priceTitle: "$29",
  },
];

export function PricingTable() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-semibold text-primary">Pricing</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
          Pricing plans for every one and every budget!
        </h1>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center leading-tight">
        Choose the plan according to your needs. We help you make good deals.
      </p>

      <div className="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-2">
        {PricingPlans.map((item) => (
          <Card key={item.id} className={item.id === 2 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>
                {item.id == 2 ? (
                  <div className="flex items-center justify-between">
                    <h3 className="text-primary">{item.cardTitle}</h3>
                    <p className="rounded-full bg-primary/20 px-3 py-1 text-sm font-semibold leading-5 text-primary">
                      {" "}
                      Most Popular
                    </p>
                  </div>
                ) : (
                  item.cardTitle
                )}
              </CardTitle>
              <CardDescription>{item.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-6 text-4xl font-bold tracking-tight">
                {item.priceTitle}
              </p>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {item.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-3 items-center">
                    <CircleCheck className="size-4 text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {item.id == 2 ? (
                <form className="w-full" action={CreateSubscription}>
                  <SubmitButton text="Buy Plan" className="mt-5 w-full" />
                </form>
              ) : (
                <Button variant="outline" className="mt-5 w-full" asChild>
                  <Link href={"/dashboard"}>Try for free</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
