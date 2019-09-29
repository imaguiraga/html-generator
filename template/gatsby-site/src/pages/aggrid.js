import React from 'react';
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import '../components/aggrid/index.css';
import AggridComponent from '../components/aggrid/AggridComponent';
import * as serviceWorker from '../components/aggrid/serviceWorker';

const AggridPage = () => (
   <Layout>
    <SEO title="AggridPage" />
    <h1>AggridPage</h1>
    <p>Welcome to my Gatsby site.</p>
    <Link to="/">Go back to the homepage</Link>
    <AggridComponent />
  </Layout>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default AggridPage
