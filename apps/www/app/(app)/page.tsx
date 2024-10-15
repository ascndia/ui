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
        {/* <Announcement />
        <PageHeaderHeading>Build your component library</PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed components that you can copy and paste into your
          apps.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
            >
              GitHub
            </Link>
          </Button>
        </PageActions> */}
        <div className="relative w-full -mt-[65px]">
          <div className="pt-8 pb-10 md:pt-16 container overflow-hidden">
            <div className="relative">
              <div className="mx-auto">
                <div className="mx-auto max-w-4xl lg:col-span-6 lg:flex lg:items-center justify-center text-center">
                  <div className="relative z-10 lg:h-auto pt-[90px] lg:pt-[90px] lg:min-h-[300px] flex flex-col items-center justify-center sm:mx-auto md:w-3/4 lg:mx-0 lg:w-full gap-4 lg:gap-8">
                    <div className="flex flex-col items-center">
                      <h1 className="text-foreground text-4xl sm:text-5xl sm:leading-none lg:text-7xl">
                        <span className="block text-foreground">
                          Build Application Faster
                        </span>
                        <span className="text-brand block md:ml-0">
                          With High Quality Blocks
                        </span>
                      </h1>
                      <p className="pt-2 text-foreground my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-lg">
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
