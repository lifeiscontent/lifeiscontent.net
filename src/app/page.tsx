import Image from 'next/image'
import Link from 'next/link'
import { getRecentPosts } from '@/lib/blog'
import { ButtonLink } from '@/components/ui/button'
import { BadgeLink } from '@/components/ui/badge'
import { PostCard } from '@/components/post-card'

// Client logos with natural SVG dimensions
const clients = [
  { name: 'AMGEN', src: '/images/logos/amgen.svg', width: 80, height: 21 },
  { name: 'Genentech', src: '/images/logos/genentech.svg', width: 84, height: 54 },
  {
    name: 'Johnson & Johnson',
    src: '/images/logos/johnson-and-johnson.svg',
    width: 84,
    height: 54,
  },
  { name: 'McCormick', src: '/images/logos/mccormick.svg', width: 84, height: 54 },
  { name: 'NIKE', src: '/images/logos/nike.svg', width: 84, height: 54 },
  { name: 'Novartis', src: '/images/logos/novartis.svg', width: 84, height: 54 },
]

const openSourceProjects = [
  {
    name: 'Storybook',
    href: 'https://storybook.js.org/',
    description:
      'Storybook is a frontend workshop for building UI components and pages in isolation. It helps developers build robust UIs and streamlines the development workflow by providing a dedicated environment for component development.',
  },
  {
    name: 'Ash',
    href: 'https://www.ash-hq.org/',
    description:
      'Ash is a declarative, resource-oriented application development framework for Elixir. It provides a powerful way to model your domain and build applications with automatic API generation, authorization, and more.',
  },
  {
    name: 'Redux',
    href: 'https://github.com/reactjs/redux',
    description:
      'Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.',
  },
  {
    name: 'React on Rails',
    href: 'https://github.com/shakacode/react_on_rails',
    description:
      'Opinionated and optimal framework for integrating Ruby on Rails with modern JavaScript tooling and libraries, including Webpack, Babel, React, Redux, React-Router.',
  },
  {
    name: 'Foundation',
    href: 'https://github.com/zurb/foundation-sites',
    description:
      'Foundation is the most advanced responsive front-end framework in the world. You can quickly prototype and build sites or apps that work on any kind of device with Foundation, which includes layout constructs (like a fully responsive grid), elements and best practices.',
  },
  {
    name: 'Bourbon',
    href: 'https://github.com/thoughtbot/bourbon',
    description:
      'A library of pure Sass mixins that are designed to be simple and easy to use. No configuration required. The mixins aim to be as vanilla as possible, meaning they should be as close to the original CSS syntax as possible.',
  },
]

export default async function HomePage() {
  const recentPosts = await getRecentPosts(3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto mb-8 max-w-md">
              <Image
                src="/images/icon.svg"
                alt="Logo"
                width={200}
                height={200}
                className="mx-auto"
                priority
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Life is content
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Life is just a story and I tell stories through the content I create.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Recent Posts
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Latest thoughts and insights from my blog
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <ButtonLink href="/blog" variant="primary" size="lg">
                View All Posts
              </ButtonLink>
            </div>
          </div>
        </section>
      )}

      {/* Clients Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Clients</h2>
            <p className="mt-4 text-lg text-gray-600">
              Here&apos;s some of the clients I&apos;ve done work for in the past.
            </p>
          </div>
          <div className="grid grid-cols-2 place-items-center gap-8 md:grid-cols-3 lg:grid-cols-6">
            {clients.map((client) => (
              <Image
                key={client.name}
                src={client.src}
                alt={client.name}
                width={client.width}
                height={client.height}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Open Source
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              I&apos;m a big fan of Open Source. Here&apos;s a few projects I&apos;ve contributed
              to.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {openSourceProjects.map((project) => (
              <div key={project.name} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    {project.name}
                  </a>
                </h3>
                <p className="leading-relaxed text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact</h2>
            <p className="mt-4 text-lg text-gray-600">
              You can reach me at{' '}
              <a
                href="mailto:aaron@lifeiscontent.net"
                className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
              >
                aaron@lifeiscontent.net
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
