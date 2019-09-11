import React from 'react';
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

//import '../components/material/index.css';
import MaterialComponent from '../components/material/MaterialComponent';
import * as serviceWorker from '../components/material/serviceWorker';

const MaterialPage = () => (
   <Layout>
    <SEO title="MaterialPage" />
    <h1>MaterialPage</h1>
    <p>Welcome to my Gatsby site.</p>
    <Link to="/">Go back to the homepage</Link>
    <MaterialComponent />
  </Layout>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default MaterialPage
