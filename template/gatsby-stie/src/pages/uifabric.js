import React from 'react';
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

//import '../components/uifabric/index.css';
import UIFabricComponent from '../components/uifabric/UIFabricComponent';
import * as serviceWorker from '../components/uifabric/serviceWorker';

const UIFabricPage = () => (
   <Layout>
    <SEO title="UIFabricPage" />
    <h1>UIFabricPage</h1>
    <p>Welcome to my Gatsby site.</p>
    <Link to="/">Go back to the homepage</Link>
    <div>
      <UIFabricComponent />
    </div>
  </Layout>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default UIFabricPage
