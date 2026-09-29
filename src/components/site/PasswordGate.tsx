import { useState, type FormEvent, type ReactNode } from "react"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "private-demo-auth"
const USERNAME = "Guest1"
const PASSWORD = "user-centric"

function isAuthed() {
  return sessionStorage.getItem(STORAGE_KEY) === "true"
}

/** Client-side gate for private client-demo pages. This keeps casual
 *  visitors and search engines out, but the gated content still ships in
 *  the page bundle — it is not a substitute for server-side auth and
 *  should not guard anything that truly can't leak. */
export function PasswordGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(isAuthed)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (username === USERNAME && password === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true")
      setAuthed(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (authed) return <>{children}</>

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-5"
      >
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Private demo
          </p>
          <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
            This case study is client-restricted.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the credentials you were given to view it.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            autoComplete="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
          />
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
          />
        </div>
        {error && (
          <p className="text-sm text-destructive">
            That username/password combination didn't work.
          </p>
        )}
        <Button type="submit">Enter</Button>
      </form>
    </section>
  )
}
