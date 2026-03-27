import React from 'react'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import Intervention from './sections/Intervention'
import Metrics from './sections/Metrics'
import Maturity from './sections/Maturity'
import Leadership from './sections/Leadership'
import Footer from './sections/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <hr className="section-divider" id="problem" />
        <Problem />
        <hr className="section-divider" id="intervention" />
        <Intervention />
        <hr className="section-divider" id="metrics" />
        <Metrics />
        <hr className="section-divider" id="maturity" />
        <Maturity />
        <hr className="section-divider" id="leadership" />
        <Leadership />
      </main>
      <Footer />
    </>
  )
}
