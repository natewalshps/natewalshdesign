import { motion } from "motion/react"
import { Hero } from "@/components/site/Hero"
import { Button } from "@/components/ui/button"
import { getContent } from "@/lib/content"

export function Contact() {
  const email = getContent("contact.email", "natewalshdesign@gmail.com")
  const linkedin = getContent("contact.linkedin", "https://www.linkedin.com/in/natewalsh")
  const location = getContent("contact.location", "Minneapolis, MN")

  return (
    <Hero
      eyebrow="Contact"
      headline="Let's talk about experience-led strategy."
      subhead={`Based in ${location}. Fastest way to reach me is email or LinkedIn.`}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg">
            <a href={`mailto:${email}`}>Email</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{email}</p>
      </motion.div>
    </Hero>
  )
}
