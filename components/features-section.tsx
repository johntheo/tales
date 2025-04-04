import { Palette, BarChart3, PenTool } from "lucide-react"

const FeatureCard = ({
  title,
  description,
  benefits,
  icon: Icon,
}: {
  title: string
  description: string
  benefits: string[]
  icon: any
}) => (
  <div className="rounded-2xl bg-gradient-to-b from-gray-100 to-gray-200 p-6 shadow-lg">
    <div className="mb-4">
      <Icon className="h-8 w-8 text-gray-700" />
      <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
    <div className="space-y-2">
      <h4 className="font-medium text-gray-900">Key benefits:</h4>
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-start">
          <svg
            className="mr-2 h-5 w-5 text-green-500 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-gray-600">{benefit}</p>
        </div>
      ))}
    </div>
  </div>
)

export default function FeaturesSection() {
  const features = [
    {
      title: "For Designers",
      description:
        "Your designs are great—but is your portfolio helping or hurting your chances? Get expert feedback to ensure your work tells the right story and showcases your skills effectively.",
      icon: Palette,
      benefits: [
        "Get structured feedback to fine-tune your presentation",
        "Make sure your case studies tell a compelling story",
        "See what's missing before recruiters do",
      ],
    },
    {
      title: "For Product Managers",
      description:
        "You have big ideas—now let's make sure they land. Our feedback helps you structure presentations that persuade stakeholders and drive decisions.",
      icon: BarChart3,
      benefits: [
        "Structure your presentations for clarity & persuasion",
        "Refine your storytelling to influence leadership",
        "Ensure your decks drive action & decisions",
      ],
    },
    {
      title: "For Professionals",
      description:
        "Whether you're writing case studies, blog posts, or documentation, our feedback helps you tell stories that engage and inform your audience.",
      icon: PenTool,
      benefits: [
        "Structure your content for maximum impact",
        "Ensure your writing is clear and engaging",
        "Get feedback on tone and voice consistency",
      ],
    },
  ]

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Get to know Tales
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover how Tales helps professionals tell better stories through personalized feedback.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
} 