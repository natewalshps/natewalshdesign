import { getContent } from "@/lib/content"

export function Footer() {
  const email = getContent("contact.email", "natewalshdesign@gmail.com")
  const linkedin = getContent("contact.linkedin", "https://www.linkedin.com/in/natewalsh")

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Nathan Walsh. All rights reserved.</p>
        <div className="flex gap-6">
          <a href={`mailto:${email}`} className="hover:text-foreground">
            Email
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
