import React from 'react';
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import '../components/patternfly/index.css';
import PatternflyComponent from '../components/patternfly/PatternflyComponent';
import * as serviceWorker from '../components/patternfly/serviceWorker';

const PatternflyPage = () => (
   <Layout>
    <SEO title="PatternflyPage" />
    <h1>PatternflyPage</h1>
    <p>Welcome to my Gatsby site.</p>
    <Link to="/">Go back to the homepage</Link>
    <PatternflyComponent />
  </Layout>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default PatternflyPage
