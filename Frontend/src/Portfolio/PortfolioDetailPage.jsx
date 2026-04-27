import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPortfolioStoryBySlug, portfolioStories } from "./portfolioData";
import "./portfolio.css";

const defaultSections = [
  { id: "overview", label: "Overview" },
  { id: "services", label: "Services" },
  { id: "how-we-did-it", label: "How we did it" },
  { id: "impact", label: "Impact" },
];

function PortfolioPlaceholder({ story }) {
  const moreStories = portfolioStories
    .filter((item) => item.slug !== story.slug)
    .slice(0, 3);

  return (
    <div className="portfolio-detail-page">
      <section className="portfolio-detail-hero">
        <div className="portfolio-detail-hero__content">
          <div className="portfolio-detail-hero__eyebrow-row">
            <p className="portfolio-detail-kicker">Portfolio Details</p>
          </div>
          <div className="portfolio-detail-hero__split">
            <div className="portfolio-detail-hero__title-block">
              <h1>{story.heroTitle || story.title}</h1>
            </div>
            <div className="portfolio-detail-hero__description-block">
              <p>{story.heroDescription || story.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-placeholder">
        <div className="portfolio-placeholder__card">
          <h2>Details page in progress</h2>
          <p>
            This story now has a working route, and the full case-study content
            can be dropped in here when it is ready.
          </p>
          <Link to="/portfolio" className="portfolio-detail-backlink">
            Back to all stories
          </Link>
        </div>
      </section>

      <section className="portfolio-more-stories">
        <div className="portfolio-section-heading">
          <p>More Stories</p>
          <h2>Explore other work</h2>
        </div>
        <div className="portfolio-more-stories__grid">
          {moreStories.map((item) => (
            <Link
              key={item.slug}
              to={`/portfolio/${item.slug}`}
              className="portfolio-story-mini"
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function PortfolioDetailPage() {
  const { slug } = useParams();
  const story = getPortfolioStoryBySlug(slug);
  const [activeSection, setActiveSection] = useState("overview");

  const moreStories = useMemo(
    () =>
      portfolioStories
        .filter((item) => item.slug !== slug)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3),
    [slug]
  );

  useEffect(() => {
    if (!story?.detail) {
      return undefined;
    }

    const ids = (story.detail.sectionNav || defaultSections).map(
      (section) => section.id
    );
    const handleScroll = () => {
      const offset = 180;
      let currentSection = ids[0];

      ids.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) {
          return;
        }

        const top = element.getBoundingClientRect().top;
        if (top - offset <= 0) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [story]);

  if (!story) {
    return (
      <div className="portfolio-placeholder portfolio-placeholder--missing">
        <div className="portfolio-placeholder__card">
          <h2>Portfolio story not found</h2>
          <Link to="/portfolio" className="portfolio-detail-backlink">
            Back to all stories
          </Link>
        </div>
      </div>
    );
  }

  if (story.status !== "published" || !story.detail) {
    return <PortfolioPlaceholder story={story} />;
  }

  const { detail } = story;
  const sectionNav = detail.sectionNav || defaultSections;

  return (
    <div className="portfolio-detail-page">
      <section className="portfolio-detail-hero">
        <div className="portfolio-detail-hero__content">
          <div className="portfolio-detail-hero__eyebrow-row">
            <p className="portfolio-detail-kicker">AI-Powered Personalization</p>
          </div>
          <div className="portfolio-detail-hero__split">
            <div className="portfolio-detail-hero__title-block">
              <h1>{story.heroTitle}</h1>
            </div>
            <div className="portfolio-detail-hero__description-block">
              <p>{story.heroDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-detail-cover">
        <img src={detail.coverImage} alt={story.heroTitle} />
      </section>

      <nav className="portfolio-detail-nav">
        <div className="portfolio-detail-nav__inner">
          {sectionNav.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={
                activeSection === section.id
                  ? "portfolio-detail-nav__link active"
                  : "portfolio-detail-nav__link"
              }
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="overview" className="portfolio-detail-section">
        <div className="portfolio-overview-grid">
          <aside className="portfolio-services-panel">
            <p className="portfolio-services-panel__eyebrow">Services</p>
            <ul>
              {detail.overviewServices.map((service) => (
                <li key={service.label}>
                  <Link to={service.path} className="portfolio-services-panel__link">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <div className="portfolio-copy-panel">
            <div className="portfolio-section-heading portfolio-section-heading--left">
              <p>Overview</p>
              <h2>Turning enterprise-scale retail data into better shopping experiences</h2>
            </div>
            {detail.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="portfolio-image-row">
          {detail.overviewGallery.map((image, index) => (
            <div key={image} className="portfolio-image-card">
              <img src={image} alt={`${story.heroTitle} overview visual ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="portfolio-detail-section">
        <div className="portfolio-section-heading portfolio-section-heading--left">
          <p>Services</p>
          <h2>Building a recommendation and prediction engine for modern retail</h2>
        </div>
        <div className="portfolio-narrative">
          {detail.servicesCopy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="portfolio-highlight-placeholder">
          <div className="portfolio-highlight-placeholder__label">
            {detail.coreHighlightsTitle}
          </div>
          <div className="portfolio-highlight-placeholder__box">
            <span>{detail.coreHighlightsPlaceholder}</span>
          </div>
        </div>
      </section>

      <section id="how-we-did-it" className="portfolio-detail-section">
        <div className="portfolio-section-heading portfolio-section-heading--left">
          <p>How we did it</p>
          <h2>From raw behavioral data to intelligent, real-time retail decisions</h2>
        </div>
        <p className="portfolio-section-intro">
          In only a few weeks, Zedflux delivered a data-preparation pipeline
          and machine-learning core that could power real-time upsell and
          cross-sell recommendations across the retailer&apos;s web and mobile
          channels.
        </p>

        <div className="portfolio-steps">
          {detail.processSteps.map((step) => (
            <div
              key={step.title}
              className={`portfolio-step portfolio-step--${step.imagePosition}`}
            >
              <div className="portfolio-step__copy">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
              <div className="portfolio-step__media">
                <img src={step.image} alt={step.title} />
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-supporting-image">
          <img src={detail.supportingImage} alt={`${story.heroTitle} supporting visual`} />
        </div>
      </section>

      <section id="impact" className="portfolio-detail-section">
        <div className="portfolio-impact-grid">
          <div className="portfolio-impact-copy">
            <div className="portfolio-section-heading portfolio-section-heading--left">
              <p>Impact</p>
              <h2>Fast execution, stronger engagement, measurable growth</h2>
            </div>
            {detail.impactCopy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className="portfolio-stats-grid">
              {detail.impactStats.map((stat) => (
                <div key={stat.label} className="portfolio-stat-card">
                  <span className="portfolio-stat-card__value">{stat.value}</span>
                  <span className="portfolio-stat-card__label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="portfolio-impact-media">
            <img src={detail.impactImage} alt={`${story.heroTitle} impact visual`} />
          </div>
        </div>
      </section>

      <section className="portfolio-more-stories">
        <div className="portfolio-section-heading">
          <p>More Stories</p>
          <h2>Explore what else we&apos;ve been building</h2>
        </div>
        <div className="portfolio-more-stories__grid">
          {moreStories.map((item) => (
            <Link
              key={item.slug}
              to={`/portfolio/${item.slug}`}
              className="portfolio-story-mini"
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PortfolioDetailPage;
