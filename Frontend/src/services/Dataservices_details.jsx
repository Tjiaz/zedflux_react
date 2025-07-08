import React from "react";
import "./services.css";

const Dataservices_details = () => {
  return (
    <div className="container">
      <main>
        <section className="intro-section">
          <h1>Data Analytics & AI</h1>
          <p>
            Use data to drive decisions, efficiencies and competitive advantage
          </p>
        </section>

        <section className="description-section">
          <p>
            Data is the new oil. Use it to fuel growth. Every company wants to
            leverage its data to improve its competitive advantage and avoid
            falling behind digital-native FAANGs (and new challengers) entering
            their industry. Additionally, the global pandemic has turned
            digitization, data, and AI/ML into the top strategic priorities from
            the board rooms to busy floors. As an end-to-end data and AI
            partner, we help our clients discover new opportunities, design
            future-proof data strategies and build solutions that turn as-is
            data (of any shape, size, or structure) into knowledge and
            actionable intelligence. It helps automate processes, create
            personalized experiences, make better decisions and achieve a
            competitive edge.
          </p>
        </section>

        <section className="services-section">
          <h2>Our Services</h2>
          <div className="services-list">
            {/* Iterate over services with a component or map */}
            <div className="service-item">
              <h3>Data Strategy</h3>
              <p>
                Use case discovery, data audits, platform and tool selection,
                data roadmap, cost, and capacity planning, execution strategy
              </p>
            </div>
            <div className="service-item">
              <h3>Data Engineering</h3>
              <p>End-to-end architecture, data integration...</p>
            </div>
            <div className="service-item">
              <h3>Data Visualization</h3>
              <p>
                Power BI apps, insight generation, custom visualizations, data
                product development, graph, geo, and real-time data analysis.
              </p>
            </div>
            <div className="service-item">
              <h3>Predictive Analytics</h3>
              <p>
                Real-time personalization, recommendation system, scoring
                engines, proactive monitoring and alerting, reinforcement
                learning.
              </p>
            </div>
            <div className="service-item">
              <h3>Personalization Engines</h3>
              <p>
                Grow your revenue and brand loyalty with personalized products
                and shopping experiences unique to each customer
              </p>
            </div>
            <div className="service-item">
              <h3>IoT & Machine Analyticss</h3>
              <p>
                Build real-time and scalable automations and data-driven
                products with IoT devices and events data
              </p>
            </div>
            <div className="service-item">
              <h3>Image & Video Analytics</h3>
              <p>
                Object detection, face recognition, text and figure extraction,
                cognitive search, DL & RNN modeling, and automated image
                generation
              </p>
            </div>
            <div className="service-item">
              <h3>NLP & Chatbots</h3>
              <p>
                Document automation, text extraction, data labeling, deep
                learning, NLP, chatbots, speech analysis, AI-powered search
              </p>
            </div>
            {/* Add other services similarly */}
          </div>
        </section>

        <section className="customer-stories">
          <h2>Customer Stories</h2>
          <div className="stories-list">
            <div className="story-item">
              <h3>Omnichannel eCommerce Platform</h3>
              <button>Learn more</button>
            </div>
            <div className="story-item">
              <h3>ERP Integration & Modernization</h3>
              <button>Learn more</button>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>Endless possibilities that are hidden in your data</h2>
          <form className="contact-form">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Work Email" />
            <input type="text" placeholder="Company" />
            <button type="submit">Submit</button>
          </form>
        </section>

        <section className="testimonial-section">
          <p>Zedflux is our exclusive data and analytics partner...</p>
        </section>
      </main>
    </div>
  );
};

export default Dataservices_details;
