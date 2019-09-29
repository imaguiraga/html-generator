import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    
    <p><Link to="/uifabric/">Go to page uifabric</Link></p>
    <p><Link to="/blueprint/">Go to page blueprint</Link></p>
    <p><Link to="/pivotal/">Go to page pivotal</Link></p>
    <p><Link to="/material/">Go to page material</Link></p>
    <p><Link to="/carbon/">Go to page carbon</Link></p>
    <p><Link to="/aggrid/">Go to page aggrid</Link></p>
    <p><Link to="/patternfly/">Go to page patternfly</Link></p>
    <p><Link to="/page-2/">Go to page 2</Link></p>
  </Layout>
)

export default IndexPage
