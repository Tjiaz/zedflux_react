import React from "react";
import "./services.css";
import ServiceInquiryForm from "./ServiceInquiryForm";

const DigitalStrategyDetails = () => {
  return (
    <div className="container">
      <main>
        <section className="intro-section">
          <h1>Digital Strategy</h1>
          <p>
            Top-notch business, product and technology consulting - from inception to impact
          </p>
        </section>

        <section className="description-section">
          <p>
            Success in the digital age requires more than just implementing technology—it demands a 
            strategic approach that aligns digital initiatives with business objectives. Our digital 
            strategy services provide the foundation for making informed decisions, prioritizing 
            investments, and executing initiatives that deliver measurable impact.
          </p>
          <p>
            We combine business acumen with deep technical expertise to help organizations navigate 
            the complexities of digital transformation. From initial discovery and ideation to comprehensive 
            audits and strategic planning, we provide the insights and roadmap you need to succeed in 
            an increasingly competitive digital landscape.
          </p>
        </section>

        <section className="services-section">
          <h2>Our Services</h2>
          <div className="services-list">
            <div className="service-item">
              <h3>Discovery & Ideation</h3>
              <p>
                Generate and validate innovative ideas through structured discovery processes. We conduct 
                comprehensive customer research, market analysis, and product discovery workshops to 
                identify opportunities and create solutions that address real user needs and business 
                challenges.
              </p>
            </div>
            <div className="service-item">
              <h3>Audits & Assessments</h3>
              <p>
                Evaluate your current state through comprehensive data and technology audits. We assess 
                opportunities, identify gaps, and provide tailored recommendations that help you make 
                informed decisions about technology investments and strategic priorities.
              </p>
            </div>
            <div className="service-item">
              <h3>Strategic Planning</h3>
              <p>
                Develop comprehensive digital strategies and roadmaps that align with your business 
                objectives. We help you prioritize initiatives, allocate resources effectively, and 
                create actionable plans that drive long-term success.
              </p>
            </div>
            <div className="service-item">
              <h3>Product Strategy</h3>
              <p>
                Define product vision, positioning, and go-to-market strategies. We help you understand 
                your market, identify differentiation opportunities, and create product strategies that 
                drive competitive advantage and market success.
              </p>
            </div>
            <div className="service-item">
              <h3>Technology Consulting</h3>
              <p>
                Get expert guidance on technology selection, architecture decisions, and platform 
                strategies. We help you choose the right technologies, design scalable architectures, 
                and avoid costly mistakes that can derail your digital initiatives.
              </p>
            </div>
            <div className="service-item">
              <h3>Competitive Analysis</h3>
              <p>
                Understand your competitive landscape and identify opportunities for differentiation. 
                We analyze competitor strategies, market trends, and emerging technologies to help you 
                stay ahead of the curve and make strategic decisions with confidence.
              </p>
            </div>
          </div>
        </section>

        <section className="customer-stories">
          <h2>Customer Stories</h2>
          <div className="stories-list">
            <div className="story-item">
              <h3>Startup Product Strategy</h3>
              <p>Developed product strategy that led to successful Series A funding</p>
              <button>Learn more</button>
            </div>
            <div className="story-item">
              <h3>Enterprise Digital Roadmap</h3>
              <p>Created comprehensive digital roadmap that aligned IT with business objectives</p>
              <button>Learn more</button>
            </div>
          </div>
        </section>

        <ServiceInquiryForm serviceType="Digital Strategy" />

        <section className="testimonial-section">
          <p>
            "Zedflux's strategic consulting helped us clarify our vision and create a roadmap that 
            transformed our business. Their insights and recommendations were invaluable in guiding 
            our digital transformation journey."
          </p>
        </section>
      </main>
    </div>
  );
};

export default DigitalStrategyDetails;
