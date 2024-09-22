import { CheckCircle, Infinity, Lock, Star } from "lucide-react";

const features = [
  {
    name: "Free Tier Access",
    description:
      "Start your blogging journey with our free tier, allowing you to write up to 20 articles and manage 1 site at no cost. Perfect for beginners looking to test the waters!",
    icon: Star,
  },
  {
    name: "Unlimited Articles and Sites",
    description:
      "Upgrade to our affordable plan for just Rs. 300/month and enjoy unlimited access to articles and sites. Scale your blogging effortlessly without any restrictions.",
    icon: Infinity,
  },
  {
    name: "Simple Authentication",
    description:
      "Experience hassle-free login with Kinde Auth. Our straightforward authentication process ensures your focus stays on creating content, not on complex setups.",
    icon: Lock,
  },
  {
    name: "Quick and Easy Setup",
    description:
      "Get your blogging site up and running in just a few minutes! Our user-friendly setup process allows you to start writing without the technical headaches.",
    icon: CheckCircle,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">Blog Faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Get your blog up and running in minutes
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          Right here you can create a blog in minutes. We make it easy for you
          to create a blog in minutes. The blog is very fast and easy to create.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
