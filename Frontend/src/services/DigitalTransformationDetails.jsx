import React from "react";
import "./services.css";
import ServiceInquiryForm from "./ServiceInquiryForm";

const DigitalTransformationDetails = () => {
  return (
    <div className="container">
      <main>
        <section className="intro-section">
          <h1>Digital Transformation</h1>
          <p>
            Invent the digital future - reduce costs, grow sales and improve customer experiences
          </p>
        </section>

        <section className="description-section">
          <p>
            Digital transformation is no longer optional—it's essential for survival and growth in 
            today's competitive marketplace. We partner with organizations to reinvent their digital 
            future, reducing operational costs, accelerating revenue growth, and creating exceptional 
            customer experiences that drive loyalty and advocacy.
          </p>
          <p>
            Our comprehensive approach to digital transformation goes beyond technology implementation. 
            We focus on reimagining business processes, modernizing legacy systems, and creating 
            seamless omnichannel experiences that connect with customers wherever they are. From 
            strategy to execution, we guide you through every step of your transformation journey.
          </p>
        </section>

        <section className="services-section">
          <h2>Our Services</h2>
          <div className="services-list">
            <div className="service-item">
              <h3>Transformation Strategy</h3>
              <p>
                Develop comprehensive transformation roadmaps through opportunity assessments, strategic 
                planning, and execution management. We help you identify priorities, set clear objectives, 
                and create actionable plans that drive measurable business outcomes.
              </p>
            </div>
            <div className="service-item">
              <h3>Digital Commerce</h3>
              <p>
                Create seamless omnichannel experiences that connect B2B, B2C, and D2C commerce. Build 
                powerful eCommerce platforms, automate sales processes, and deliver personalized shopping 
                experiences that drive conversions and customer loyalty.
              </p>
            </div>
            <div className="service-item">
              <h3>Enterprise Modernization</h3>
              <p>
                Transform legacy systems into modern, agile platforms. We specialize in re-platforming 
                outdated technology, orchestrating APIs, integrating ERP systems, and revamping user 
                experiences to improve efficiency and reduce technical debt.
              </p>
            </div>
            <div className="service-item">
              <h3>Process Automation</h3>
              <p>
                Streamline operations and reduce manual work through intelligent automation. We identify 
                repetitive processes, design automated workflows, and implement solutions that free up 
                your team to focus on high-value activities.
              </p>
            </div>
            <div className="service-item">
              <h3>Data-Driven Insights</h3>
              <p>
                Unlock the value of your data with advanced analytics and business intelligence. Transform 
                raw data into actionable insights that inform strategic decisions and drive competitive 
                advantage.
              </p>
            </div>
            <div className="service-item">
              <h3>Change Management</h3>
              <p>
                Ensure successful adoption of new digital solutions through comprehensive change management 
                strategies. We help your team adapt to new technologies and processes, maximizing ROI 
                and minimizing disruption.
              </p>
            </div>
          </div>
        </section>

        <section className="customer-stories">
          <h2>Customer Stories</h2>
          <div className="stories-list">
            <div className="story-item">
              <h3>Retail Digital Transformation</h3>
              <p>Transformed traditional retail operations into a modern omnichannel experience</p>
              <button>Learn more</button>
            </div>
            <div className="story-item">
              <h3>Manufacturing Modernization</h3>
              <p>Modernized legacy systems and processes, reducing costs by 40%</p>
              <button>Learn more</button>
            </div>
          </div>
        </section>

        <ServiceInquiryForm serviceType="Digital Transformation" />

        <section className="testimonial-section">
          <p>
            "Zedflux guided us through a comprehensive digital transformation that fundamentally changed 
            how we operate. Their strategic approach and technical expertise delivered results that 
            exceeded our expectations."
          </p>
        </section>
      </main>
    </div>
  );
};

export default DigitalTransformationDetails;
