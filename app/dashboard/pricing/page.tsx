import { PricingTable } from "@/app/components/shared/Pricing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  checkSubscriptionStatus,
  getSubscription,
} from "@/services/subscriptions";

export default async function PricingPage() {
  const [subscribed = false, subscription] = await Promise.all([
    checkSubscriptionStatus(),
    getSubscription(),
  ]);

  return (
    <>
      <PricingTable subscribed={subscribed} />

      {subscribed && (
        <Card className="border-dashed border-primary">
          <CardHeader>
            <CardTitle>Professional Plan</CardTitle>
            <CardDescription>
              You are currently subscribed to Professional plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="font-semibold">
              Subscribed Date: &emsp;
              <span className="text-muted-foreground font-light">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "full",
                  timeStyle: "long",
                }).format(new Date(subscription?.start_date ?? ""))}
              </span>
            </div>
            <div className="font-semibold">
              End Date: &emsp;
              <span className="text-muted-foreground font-light">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "full",
                  timeStyle: "long",
                }).format(new Date(subscription?.end_date ?? ""))}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
