import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  const features = [
    {
      title: "Cold Emails",
      description: "Create professional cold emails that get responses",
      svgPath:
        "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
    {
      title: "Cold Messages",
      description: "Generate engaging cold messages for social outreach",
      svgPath:
        "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    },
    {
      title: "Resume Integration",
      description:
        "Upload your resume or paste content for personalization",
      svgPath:
        "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Craft Perfect Professional Messages
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl lg:text-base xl:text-xl leading-relaxed dark:text-gray-400">
              Generate tailored cold emails and messages using AI. Upload your resume or provide details to create personalized professional communications.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/get-started">
              <Button className="h-11 px-8 cursor-pointer">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={feature.svgPath}
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
