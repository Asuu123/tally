import React from 'react'
import Layout from '../components/Layout'
import Jumbtron from '../components/cards/Jumbtron';
import AllBlog from '../components/home/AllBlog';
import OldBlog from '../components/home/OldBlog';
import Head from 'next/head';
import ContactForm from '../components/form/ContactForm';

function index(props) {
    const head = () => {
    return (
      <Head>
        <title>
          {`Landing Page`} | {process.env.APP_NAME}
        </title>
        {/* below is for facebook link share data show */}
      
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.DOMAIN}/Landing Page`} />
        <meta property="og:site_name" content={`${process.env.APP_NAME}`} />
        <meta
          property="og:image"
          content={`${process.env.DOMAIN}static/images/favicon.ico`}
        />
        <meta
          property="og:image:secure_url"
          content={`${process.env.DOMAIN}static/images/favicon.ico`}
        />
         <link rel="icon" type="image/ico" href="/static/images/favicon.ico" />
        <meta property="og:image:type" content="image/ico" />
        <meta property="fb:app_id" content={`${process.env.FB_APP_ID}`} />
      </Head>
    );
  };
    //console.log(props.isAuth)
        return (
     <React.Fragment>
         {head()}
        <Layout isAuth ={props.isAuth}>
                <div className="container">
                  <ContactForm />
                </div>
                
        </Layout>
    </React.Fragment>
    )
}





export default index









