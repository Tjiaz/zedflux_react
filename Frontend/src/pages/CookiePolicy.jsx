import React from "react";
import { Link } from "react-router-dom";
import "./CookiePolicy.css";

const CookiePolicy = () => {
  return (
    <main id="main">
      <div className="container">
        <div className="cookie-policy-content">
          <h1>Cookie Policy</h1>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2>What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device 
              when you visit a website. They are widely used to make websites work more 
              efficiently and provide information to website owners.
            </p>
          </section>

          <section>
            <h2>How We Use Cookies</h2>
            <p>
              We use cookies to enhance your experience on our website, analyze site usage, 
              and assist in our marketing efforts. By continuing to browse our site, you 
              consent to our use of cookies as described in this policy.
            </p>
          </section>

          <section>
            <h2>Types of Cookies We Use</h2>
            
            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function and cannot be switched 
              off. They are usually only set in response to actions made by you such as 
              setting your privacy preferences, logging in, or filling in forms.
            </p>

            <h3>Performance and Functionality Cookies</h3>
            <p>
              These cookies allow us to count visits and traffic sources so we can measure 
              and improve the performance of our site. They help us know which pages are 
              most and least popular.
            </p>

            <h3>Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our website by 
              collecting and reporting information anonymously.
            </p>

            <h3>Advertising Cookies</h3>
            <p>
              These cookies may be set through our site by our advertising partners to build 
              a profile of your interests and show you relevant content on other sites.
            </p>

            <h3>Social Media Cookies</h3>
            <p>
              These cookies are set by social media services that we have added to our site 
              to enable you to share our content with your friends and networks.
            </p>
          </section>

          <section>
            <h2>Managing Cookies</h2>
            <p>
              You can control and manage cookies in various ways. Please keep in mind that 
              removing or blocking cookies can impact your user experience and parts of our 
              website may no longer be fully accessible.
            </p>
            <p>
              You can change your cookie preferences at any time by visiting our{" "}
              <Link to="/cookie-preferences" className="cookie-policy-link">
                Cookie Preferences
              </Link> page.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us through 
              our <Link to="/contact" className="cookie-policy-link">Contact</Link> page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default CookiePolicy;



