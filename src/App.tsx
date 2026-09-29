import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageTransition } from "@/components/layout/PageTransition"
import { Home } from "@/pages/Home"
import { Work } from "@/pages/Work"
import { CaseStudy } from "@/pages/CaseStudy"
import { PrivateCaseStudy } from "@/pages/PrivateCaseStudy"
import { About } from "@/pages/About"
import { Contact } from "@/pages/Contact"

/** Header is fixed, so every page but Home (whose hero sits under it)
 *  needs to clear it. Also resets scroll on navigation. */
function Shell() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
      <div className="flex min-h-svh flex-col">
        <Header />
        <main className={pathname === "/" ? "flex-1" : "flex-1 pt-[70px]"}>
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<CaseStudy />} />
              <Route path="/work/private/:slug" element={<PrivateCaseStudy />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer />
      </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}

export default App
