import React from 'react';
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import '../components/pivotal/index.css';
import PivotalComponent from '../components/pivotal/PivotalComponent';
import * as serviceWorker from '../components/pivotal/serviceWorker';

const PivotalPage = () => (
   <Layout>
    <SEO title="PivotalPage" />
    <h1>PivotalPage</h1>
    <p>Welcome to my Gatsby site.</p>
    <Link to="/">Go back to the homepage</Link>
    <PivotalComponent />
  </Layout>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default PivotalPage
