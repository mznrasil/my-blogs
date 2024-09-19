import { PropsWithChildren } from "react";

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mg-24">
      {children}
    </main>
  );
}
