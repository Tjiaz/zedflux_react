import React from "react";
import ServiceItem from "./ServicesItem"; // Import the ServiceItem component
import { Container, Row, Col } from "react-bootstrap";
import "./services.css";

const Services = () => {
  const serviceItems = [
    {
      title: "Data Analytics",
      images: "/services/data-analytics.webp",
      description:
        "Harness the power of your data with rare, proven and result-driven analytics expertise",
      services: [
        {
          name: "Data Strategy",
          description:
            "Data audits, use case discovery, analytics architecture, and delivery planning",
        },
        {
          name: "AI/ML Analytics",
          description:
            "Personalization, process automations, alerting, and predictive analytics",
        },
        {
          name: "Data Visualization",
          description:
            "Power BI, interactive visualizations, graph and geo analytics, custom data products",
        },
      ],
      cta: "Explore data analytics services",
    },
    {
      title: "Software Engineering",
      images: "/services/software.webp",
      description:
        "Premium-quality engineering to build future-proof products, platforms and solutions",
      services: [
        {
          name: "Web Development",
          description:
            "SaaS, Enterprise Portals, eCommerce, React.JS, Angular.JS, Node.JS, Java, Python",
        },
        {
          name: "Cloud & DevOps",
          description:
            "AWS, GCP, Azure, Kubernetes, Cloud Architecture, Automation and Support",
        },
        {
          name: "Mobile Development",
          description:
            "iOS, Android, Flutter, ReactNative, PWA, and responsive web",
        },
        {
          name: "Enterprise Integrations",
          description:
            "ERP, CRM, eCommerce and other system integrations and customizations",
        },
      ],
      cta: "Learn more",
    },
    {
      title: "Generative AI",
      images: "/services/generative-ai.webp",
      description:
        "Build your own AI models and apps like ChatGPT for next-level growth",
      services: [
        {
          name: "Content Generation",
          description:
            "Automate content creation across multiple channels to boost your brand visibility",
        },
        {
          name: "Custom Generative AI Models",
          description:
            "Develop tailored AI models to meet your specific business needs",
        },
        {
          name: "ChatGPT Integration",
          description:
            "Integrate the ChatGPT plugin into your existing systems for seamless AI assistance",
        },
        {
          name: "Code Generation",
          description:
            "Accelerate software development, improving efficiency and reducing manual errors",
        },
      ],
      cta: "Explore generative AI services",
    },
    {
      title: "Digital Transformation",
      images: "/services/digitial_transformation.webp",
      description:
        "Invent the digital future - reduce costs, grow sales and improve customer experiences",
      services: [
        {
          name: "Transformation Strategy",
          description:
            "Opportunity assessments, roadmap design, execution plan and management",
        },
        {
          name: "Digital Commerce",
          description:
            "Omnichannel Experiences, B2B / B2C / D2C eCommerce and process automations",
        },
        {
          name: "Enterprise Modernization",
          description:
            "Legacy re-platforming, API orchestrations, ERP integrations, and experience revamps",
        },
      ],
      cta: "Explore transformation services",
    },
    {
      title: "Experience Design",
      images: "/services/experience design.webp",
      description:
        "Create simple and engaging digital experiences that delight customers and fuel growth",
      services: [
        {
          name: "User Research",
          description:
            "User needs vs. wants, behavior tracking, user analytics and journey mapping",
        },
        {
          name: "UX/UI Design",
          description:
            "Wireframing, information architecture, interface and interaction designs",
        },
        {
          name: "Product Design",
          description:
            "Mobile apps, web-based apps, data visualizations, IoT and wearables",
        },
      ],
      cta: "Explore our design services",
    },
    {
      title: "Digital Strategy",
      images: "/services/digital-strategy.webp",
      description:
        "Top-notch business, product and technology consulting - from inception to impact",
      services: [
        {
          name: "Discovery & Ideation",
          description:
            "Generate and validate ideas, customer research, and product discovery",
        },
        {
          name: "Audits & Assessments",
          description:
            "Data and tech audits, opportunity assessments, and tailored suggestions",
        },
      ],
      cta: "Explore our strategy services",
    },
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <Container>
          <h1>Digital + Data + AI</h1>
          <p className="subtitle">
            End-to-end partner to build, scale, and transform businesses with
            technology
          </p>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="services-container">
        <p className="intro-text">
          On-demand and fully-managed strategy, design, engineering and
          analytics services.
        </p>

        {serviceItems.map((section, index) => (
          <section key={index} className="service-section">
            <Row>
              <img
                src={section.images}
                alt={section.title}
                className="service-image"
              />
              <h2>{section.title}</h2>
              <p className="section-description">{section.description}</p>
              <Col md={4}>
                {section.testimonial && (
                  <div className="testimonial">
                    <p>"{section.testimonial.text}"</p>
                    <p className="author">{section.testimonial.author}</p>
                    <p className="position">{section.testimonial.position}</p>
                  </div>
                )}
                {section.description2 && (
                  <p className="section-description">{section.description2}</p>
                )}
                <a href="#" className="cta-link">
                  {section.cta} &gt;
                </a>
              </Col>
              <Col md={8}>
                <Row>
                  {section.services &&
                    section.services.map((service, i) => (
                      <Col md={6} key={i} className="service-item">
                        <h3>{service.name || section.title}</h3>
                        <p>{service.description}</p>
                      </Col>
                    ))}
                </Row>
              </Col>
            </Row>
          </section>
        ))}
      </Container>
    </div>
  );
};

export default Services;
