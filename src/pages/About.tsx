import { motion } from "motion/react"
import { Hero } from "@/components/site/Hero"
import { getContent } from "@/lib/content"

const trajectory = [
  {
    label: "Foundations",
    body: "Built the craft fundamentals in retail and consumer product design — end-to-end UX, visual systems, and creative leadership in fast-moving commercial environments.",
  },
  {
    label: "Healthcare focus",
    body: "Moved into complex, regulated enterprise environments, taking on creative leadership for large-scale platforms where design has to hold up under compliance, scale, and legacy constraints.",
  },
  {
    label: "Now",
    body: "Creative Director at Publicis Sapient, embedded at Optum (UnitedHealth Group) — leading experience strategy at the intersection of AI, healthcare, and product design.",
  },
]

const credentials = [
  {
    title: "Creative Director, Publicis Sapient",
    detail: "Embedded at Optum (UnitedHealth Group)",
  },
  {
    title: "BenefitCentral",
    detail: "Legacy consolidation for OptumRx via micro-product architecture",
  },
  {
    title: "Optimus Assistant",
    detail: "AI-powered adjunctive agents automating OptumRx client workflows",
  },
  {
    title: "NextGen Unified UI",
    detail: "Advisory role on OptumRx's next-generation platform modernization",
  },
  {
    title: "10+ years",
    detail: "UX and creative leadership across healthcare and retail",
  },
]

export function About() {
  return (
    <>
      <Hero
        eyebrow="About"
        headline="Experience strategy at the intersection of AI, healthcare, and product design."
      />
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="flex flex-col gap-10 text-lg leading-relaxed">
          <p>{getContent("about.positioning")}</p>
          <p className="text-muted-foreground">{getContent("about.bio")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Career trajectory
        </motion.h2>
        <div className="mt-8 flex flex-col">
          {trajectory.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-y-2 border-t border-border/60 py-6 sm:grid-cols-[10rem_1fr] sm:gap-x-6"
            >
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                {item.label}
              </p>
              <p className="text-lg leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-32">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Credentials
        </motion.h2>
        <div className="mt-8 flex flex-col">
          {credentials.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-border/60 py-6 last:border-b"
            >
              <p className="text-lg font-medium tracking-tight">{item.title}</p>
              <p className="mt-1 text-muted-foreground">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
