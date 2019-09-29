import React from 'react';
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import '../components/carbon/index.css';
import CarbonComponent from '../components/carbon/CarbonComponent';
import * as serviceWorker from '../components/carbon/serviceWorker';

const CarbonPage = () => (
   <Layout>
    <SEO title="CarbonPage" />
    <h1>CarbonPage</h1>
    <p>Welcome to my Gatsby site.</p>
    <Link to="/">Go back to the homepage</Link>
    <CarbonComponent />
  </Layout>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default CarbonPage
