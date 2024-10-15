import Link from "next/link"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Announcement } from "@/components/announcement"
import { ExamplesNav } from "@/components/examples-nav"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export default function IndexPage() {
  return (
    <div className="container relative">
      <PageHeader>
        <div className="relative w-full">
          <div className="container overflow-hidden pb-10 pt-8 md:pt-16">
            <div className="relative">
              <div className="mx-auto">
                <div className="mx-auto max-w-4xl justify-center text-center lg:col-span-6 lg:flex lg:items-center">
                  <div className="relative z-10 flex flex-col items-center justify-center gap-4 pt-[90px] sm:mx-auto md:w-3/4 lg:mx-0 lg:h-auto lg:min-h-[300px] lg:w-full lg:gap-8 lg:pt-[90px]">
                    <div className="flex flex-col items-center">
                      <h1 className="text-foreground text-4xl sm:text-5xl sm:leading-none lg:text-7xl">
                        <span className="text-foreground block">
                          Build Application Faster
                        </span>
                        <span className="text-brand block md:ml-0">
                          With High Quality Blocks
                        </span>
                      </h1>
                      <p className="text-foreground my-3 pt-2 text-sm sm:mt-5 sm:text-base lg:mb-0 lg:text-lg">
                        Ascndia provides you with a set of high quality blocks
                        <br></br>
                        So you can focus solely on building your application.
                        <br className="hidden md:block" />
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button asChild>
                        <Link href="/docs">Get Started</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href={siteConfig.links.github}>
                          Star on github
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageHeader>
    </div>
  )
}
