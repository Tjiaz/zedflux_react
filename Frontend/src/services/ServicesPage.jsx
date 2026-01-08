import React, { useEffect, useRef, useState } from "react";
import ServiceItem from "./ServicesItem"; // Import the ServiceItem component
import { Container, Row, Col } from "react-bootstrap";
import "./services.css";
import Modal from "../modals/Modal"; // Import the Modal component
import { Link, useNavigate } from "react-router-dom";
import ServiceImage from "./ServiceImage";
import axiosInstance from "../utils/axiosConfig";
import expertImage from "../images/lady2.png";

const Services = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [stickyNavVisible, setStickyNavVisible] = useState(false);
  const breadcrumbsRef = useRef(null);
  const serviceSectionsRef = useRef([]);
  const navigate = useNavigate();
  const [expertFormData, setExpertFormData] = useState({
    fullName: "",
    email: "",
  });
  const [expertFormStatus, setExpertFormStatus] = useState({
    loading: false,
    error: false,
    success: false,
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(setShowModal(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (breadcrumbsRef.current) {
        const breadcrumbsBottom = breadcrumbsRef.current.offsetTop + breadcrumbsRef.current.offsetHeight;
        setStickyNavVisible(window.scrollY > breadcrumbsBottom);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index) => {
    if (serviceSectionsRef.current[index]) {
      const offset = 100; // Account for sticky nav
      const elementPosition = serviceSectionsRef.current[index].offsetTop;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleExpertFormChange = (e) => {
    setExpertFormData({ ...expertFormData, [e.target.name]: e.target.value });
    if (expertFormStatus.error) {
      setExpertFormStatus({ ...expertFormStatus, error: false, message: "" });
    }
  };

  const handleExpertFormSubmit = async (e) => {
    e.preventDefault();
    setExpertFormStatus({ loading: true, error: false, success: false, message: "" });

    try {
      const response = await axiosInstance.post("/contact", {
        name: expertFormData.fullName.trim(),
        email: expertFormData.email.trim(),
        subject: "Service Inquiry - Speak to an Expert",
        message: "User requested to speak with an expert from services page",
      });

      setExpertFormStatus({
        loading: false,
        error: false,
        success: true,
        message: response.data.message || "Thank you! We'll be in touch soon.",
      });

      setExpertFormData({
        fullName: "",
        email: "",
      });

      setTimeout(() => {
        setExpertFormStatus({ ...expertFormStatus, success: false, message: "" });
      }, 5000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Something went wrong. Please try again.";
      setExpertFormStatus({
        loading: false,
        error: true,
        success: false,
        message: errorMessage,
      });
    }
  };

  const serviceItems = [
    {
      id: "data-analytics",
      title: "Data Analytics",
      icon: "data-analytics",
      description:
        "Harness the power of your data with rare, proven and result-driven analytics expertise",
      services: [
        {
          name: "Data Strategy",
          description:
            "Data audits, use case discovery, analytics architecture, and delivery planning",
        },
        {
          name: "Data Engineering",
          description:
            "Data pipelines, ETL processes, data warehousing, and data lake solutions",
        },
        {
          name: "Data Visualization",
          description:
            "Power BI, interactive visualizations, graph and geo analytics, custom data products",
        },
        {
          name: "Real-time Analytics",
          description:
            "Streaming data processing, real-time dashboards, and live analytics",
        },
        {
          name: "Predictive Analytics",
          description:
            "AI/ML models, forecasting, personalization, and predictive insights",
        },
      ],
      cta: "Explore data analytics services",
      link: "/data-services-details",
    },
    {
      id: "generative-ai",
      title: "Generative AI",
      icon: "generative-ai",
      description:
        "Build your own AI models and apps like ChatGPT for next-level growth",
      services: [
        {
          name: "Content Creation",
          description:
            "Automate content creation across multiple channels to boost your brand visibility",
        },
        {
          name: "Code Generation",
          description:
            "Accelerate software development, improving efficiency and reducing manual errors",
        },
        {
          name: "Generative AI Models",
          description:
            "Custom GPT models, language models, and generative AI solutions",
        },
        {
          name: "Custom AI Models",
          description:
            "Develop tailored AI models to meet your specific business needs",
        },
        {
          name: "Customer Intelligence",
          description:
            "AI-powered customer insights, chatbots, and intelligent assistants",
        },
      ],
      cta: "Explore generative AI services",
      link: "/generative-ai-details",
    },
    {
      id: "enterprise-transformation",
      title: "Enterprise Transformation",
      icon: "enterprise-transformation",
      description:
        "Invent the digital future - reduce costs, grow sales and improve customer experiences",
      services: [
        {
          name: "Transformative Strategy",
          description:
            "Opportunity assessments, roadmap design, execution plan and management",
        },
        {
          name: "Data Commerce",
          description:
            "Data-driven commerce strategies, analytics, and monetization",
        },
        {
          name: "Talent & Culture",
          description:
            "Digital transformation enablement, training, and change management",
        },
        {
          name: "Executive Vision & Roadmaps",
          description:
            "Strategic planning, technology roadmaps, and executive alignment",
        },
        {
          name: "Cloud Acceleration",
          description:
            "Cloud migration, modernization, and cloud-native architecture",
        },
      ],
      cta: "Explore transformation services",
      link: "/digital-transformation-details",
    },
    {
      id: "software-engineering",
      title: "Software Engineering",
      icon: "software-engineering",
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
      cta: "Explore software engineering services",
      link: "/software-engineering-details",
    },
    {
      id: "commerce-acceleration",
      title: "Commerce Acceleration",
      icon: "commerce-acceleration",
      description:
        "Build and scale eCommerce platforms that drive revenue and customer satisfaction",
      services: [
        {
          name: "eCommerce Strategy & Design",
          description:
            "Omnichannel commerce strategies, UX design, and conversion optimization",
        },
        {
          name: "B2B & B2C eCommerce Platforms",
          description:
            "Custom eCommerce solutions, marketplace development, and platform integration",
        },
        {
          name: "PIM & DAM Solutions",
          description:
            "Product information management and digital asset management systems",
        },
        {
          name: "Order Management & Fulfillment",
          description:
            "OMS implementation, fulfillment automation, and logistics integration",
        },
        {
          name: "Marketplace Integration",
          description:
            "Multi-channel marketplace integration and management",
        },
      ],
      cta: "Explore commerce services",
      link: "/digital-transformation-details",
    },
    {
      id: "technology-innovations",
      title: "Technology Innovations",
      icon: "technology-innovations",
      description:
        "Cutting-edge technology solutions to drive innovation and competitive advantage",
      services: [
        {
          name: "Innovation Roadmaps",
          description:
            "Technology strategy, innovation planning, and R&D roadmaps",
        },
        {
          name: "R&D & Prototyping",
          description:
            "Rapid prototyping, proof of concepts, and innovation labs",
        },
        {
          name: "Blockchain Solutions",
          description:
            "Blockchain development, smart contracts, and decentralized applications",
        },
        {
          name: "Emerging Technologies",
          description:
            "IoT, AR/VR, edge computing, and next-generation technology solutions",
        },
        {
          name: "AI/ML Solutions",
          description:
            "Machine learning models, AI applications, and intelligent automation",
        },
      ],
      cta: "Explore innovation services",
      link: "/generative-ai-details",
    },
    {
      id: "mobile-development",
      title: "Mobile Development",
      icon: "mobile-development",
      description:
        "Native and cross-platform mobile apps that deliver exceptional user experiences",
      services: [
        {
          name: "iOS & Android App Development",
          description:
            "Native mobile app development for iOS and Android platforms",
        },
        {
          name: "Cross-Platform Development",
          description:
            "React Native, Flutter, and Xamarin for unified mobile experiences",
        },
        {
          name: "Mobile UI/UX Design",
          description:
            "Mobile-first design, user experience optimization, and responsive interfaces",
        },
        {
          name: "Mobile Backend & APIs",
          description:
            "Mobile backend services, API development, and cloud integration",
        },
      ],
      cta: "Explore mobile services",
      link: "/software-engineering-details",
    },
    {
      id: "experience-design",
      title: "Experience Design",
      icon: "experience-design",
      description:
        "Create simple and engaging digital experiences that delight customers and fuel growth",
      services: [
        {
          name: "User Research",
          description:
            "User needs vs. wants, behavior tracking, user analytics and journey mapping",
        },
        {
          name: "UI/UX Design",
          description:
            "Wireframing, information architecture, interface and interaction designs",
        },
        {
          name: "Information Architecture",
          description:
            "Content strategy, site structure, and navigation design",
        },
        {
          name: "Product Strategy",
          description:
            "Product vision, roadmap planning, and feature prioritization",
        },
        {
          name: "Interaction Design",
          description:
            "Prototyping, user flows, and interactive design systems",
        },
      ],
      cta: "Explore our design services",
      link: "/experience-design-details",
    },
    {
      id: "cloud-devops",
      title: "Cloud & DevOps",
      icon: "cloud-devops",
      description:
        "Scalable cloud infrastructure and DevOps practices for modern applications",
      services: [
        {
          name: "Cloud Strategy",
          description:
            "Cloud assessment, migration planning, and multi-cloud strategies",
        },
        {
          name: "Cloud Migration",
          description:
            "Lift and shift, re-platforming, and cloud-native transformations",
        },
        {
          name: "DevOps Automation",
          description:
            "CI/CD pipelines, infrastructure as code, and automation frameworks",
        },
        {
          name: "Platform Engineering",
          description:
            "Internal developer platforms, self-service infrastructure, and tooling",
        },
        {
          name: "Site Reliability Engineering",
          description:
            "SRE practices, monitoring, observability, and incident management",
        },
      ],
      cta: "Explore cloud services",
      link: "/software-engineering-details",
    },
    {
      id: "digital-strategy",
      title: "Digital Strategy",
      icon: "digital-strategy",
      description:
        "Top-notch business, product and technology consulting - from inception to impact",
      services: [
        {
          name: "Discovery & Ideation",
          description:
            "Generate and validate ideas, customer research, and product discovery",
        },
        {
          name: "Architecture & Roadmaps",
          description:
            "Technical architecture, system design, and technology roadmaps",
        },
        {
          name: "Design Sprints",
          description:
            "Rapid prototyping, user testing, and iterative design processes",
        },
        {
          name: "Solution Definition",
          description:
            "Requirements gathering, solution design, and technical specifications",
        },
        {
          name: "Product Management",
          description:
            "Product strategy, backlog management, and agile product development",
        },
      ],
      cta: "Explore our strategy services",
      link: "/digital-strategy-details",
    },
  ];

  const getServiceIcon = (iconName) => {
    const icons = {
      "data-analytics": (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" fill="#174d90" stroke="#174d90" strokeWidth="1"/>
          <path d="M7 16L12 11L16 15L21 10" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      "generative-ai": (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#174d90"/>
          <path d="M12 6V12L16 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      "enterprise-transformation": (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="#174d90" strokeWidth="2" strokeDasharray="4 4" fill="none"/>
          <rect x="8" y="8" width="8" height="8" fill="#174d90"/>
        </svg>
      ),
      "software-engineering": (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" fill="#174d90"/>
          <path d="M9 9H15M9 15H15M9 12H15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      "commerce-acceleration": (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#174d90" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="12" r="6" stroke="#174d90" strokeWidth="2" strokeDasharray="2 2" fill="none"/>
          <circle cx="12" cy="12" r="2" fill="#174d90"/>
        </svg>
      ),
      "technology-innovations": (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#174d90"/>
          <path d="M2 17L12 22L22 17" stroke="#174d90" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#174d90" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      ),
      "mobile-development": (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="2" width="12" height="20" rx="2" fill="#174d90"/>
          <rect x="9" y="6" width="6" height="10" fill="#ffffff"/>
        </svg>
      ),
      "experience-design": (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#174d90" strokeWidth="2" fill="none"/>
          <path d="M12 8L12 12L16 14" stroke="#174d90" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="2" fill="#174d90"/>
        </svg>
      ),
      "cloud-devops": (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#174d90"/>
          <path d="M8 12C8 10.3431 9.34315 9 11 9H13C14.6569 9 16 10.3431 16 12" stroke="#ffffff" strokeWidth="2"/>
        </svg>
      ),
      "digital-strategy": (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#174d90" strokeWidth="2" strokeLinejoin="round" fill="none"/>
          <path d="M2 17L12 22L22 17" stroke="#174d90" strokeWidth="2" strokeLinejoin="round" fill="none"/>
          <path d="M2 12L12 17L22 12" stroke="#174d90" strokeWidth="2" strokeLinejoin="round" fill="none"/>
        </svg>
      ),
    };
    return icons[iconName] || icons["software-engineering"];
  };

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1>Digital + Data + AI</h1>
              <p className="subtitle">
                On-demand and fully-managed strategy, design, engineering, and analytics services.
              </p>
            </Col>
            <Col lg={6} className="hero-graphics-col">
              <div className="hero-graphics">
                <svg width="100%" height="400" viewBox="0 0 400 400" className="animated-graphics">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#174d90" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0d4d9e" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  {/* Phone/Device */}
                  <rect x="120" y="80" width="80" height="140" rx="8" fill="url(#grad1)" className="graphic-element">
                    <animate attributeName="y" values="80;70;80" dur="3s" repeatCount="indefinite" />
                  </rect>
                  {/* Code Brackets */}
                  <text x="60" y="200" fontSize="60" fill="rgba(255,255,255,0.3)" fontFamily="monospace" className="graphic-element">
                    {'<'}
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                  </text>
                  <text x="320" y="200" fontSize="60" fill="rgba(255,255,255,0.3)" fontFamily="monospace" className="graphic-element">
                    {'>'}
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                  </text>
                  {/* Gear Icon */}
                  <circle cx="280" cy="120" r="30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" className="graphic-element">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="0 280 120;360 280 120"
                      dur="8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="280" cy="120" r="20" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="360 280 120;0 280 120"
                      dur="6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Particles */}
                  <circle cx="100" cy="300" r="4" fill="rgba(255,255,255,0.5)" className="graphic-element">
                    <animate attributeName="cy" values="300;280;300" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="250" cy="320" r="3" fill="rgba(255,255,255,0.4)" className="graphic-element">
                    <animate attributeName="cy" values="320;300;320" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="320" cy="280" r="5" fill="rgba(255,255,255,0.6)" className="graphic-element">
                    <animate attributeName="cy" values="280;260;280" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Breadcrumbs */}
      <div className="breadcrumbs" ref={breadcrumbsRef}>
        <nav>
          <Container>
            <ol>
              <li><Link to="/">Home</Link></li>
              <li>Services</li>
            </ol>
          </Container>
        </nav>
      </div>

      {/* Sticky Navigation */}
      {stickyNavVisible && (
        <div className="sticky-services-nav">
          <Container>
            <div className="sticky-nav-content">
              {serviceItems.map((item, index) => (
                <button
                  key={item.id}
                  className="sticky-nav-item"
                  onClick={() => scrollToSection(index)}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Main Content */}
      <Container className="services-container">
        {serviceItems.map((section, index) => (
          <React.Fragment key={section.id}>
            <section
              id={section.id}
              ref={(el) => (serviceSectionsRef.current[index] = el)}
              className={`service-section ${index % 2 === 1 ? "alt-bg" : ""}`}
            >
              <Row className="align-items-center">
                <Col md={2} className="service-icon-col">
                  <div className="service-icon-wrapper">
                    {getServiceIcon(section.icon)}
                  </div>
                </Col>
                <Col md={10}>
                  <h2 className="service-title">{section.title}</h2>
                  <p className="section-description">{section.description}</p>
                  <Row className="mt-4">
                    {section.services.map((service, i) => (
                      <Col 
                        md={6} 
                        key={i} 
                        className="service-item" 
                        onClick={() => section.link && navigate(section.link)}
                      >
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                      </Col>
                    ))}
                  </Row>
                  {section.link && (
                    <Link to={section.link} className="cta-link">
                      {section.cta} →
                    </Link>
                  )}
                </Col>
              </Row>
            </section>
            
            {/* Speak to an Expert Section - Insert after 5th service (index 4) */}
            {index === 4 && (
              <section className="expert-section">
                <Container>
                  <Row className="align-items-center">
                    <Col lg={6}>
                      <h2 className="expert-title">Speak to an Expert</h2>
                      <p className="expert-description">
                        Get in touch with our team to discuss how we can help transform your business with our services.
                      </p>
                      <form className="expert-form" onSubmit={handleExpertFormSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={expertFormData.fullName}
                            onChange={handleExpertFormChange}
                            required
                            disabled={expertFormStatus.loading}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={expertFormData.email}
                            onChange={handleExpertFormChange}
                            required
                            disabled={expertFormStatus.loading}
                          />
                        </div>
                        {expertFormStatus.loading && (
                          <div className="form-status loading">Submitting...</div>
                        )}
                        {expertFormStatus.error && (
                          <div className="form-status error">{expertFormStatus.message}</div>
                        )}
                        {expertFormStatus.success && (
                          <div className="form-status success">{expertFormStatus.message}</div>
                        )}
                        <button type="submit" className="contact-us-btn" disabled={expertFormStatus.loading}>
                          {expertFormStatus.loading ? "Submitting..." : "Contact Us"}
                        </button>
                      </form>
                    </Col>
                    <Col lg={6} className="expert-image-col">
                      <div className="expert-image-wrapper">
                        <img src={expertImage} alt="Expert" className="expert-image" />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
            )}
          </React.Fragment>
        ))}
      </Container>
      {showModal && <Modal onClose={closeModal} />}
    </div>
  );
};

export default Services;
