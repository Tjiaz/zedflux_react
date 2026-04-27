import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ServicePill from "./ServicePill";

const SuccessStoryCard = ({ story }) => {
  const videoRef = useRef(null);
  const isVideo = !!story.video;

  const handleMouseEnter = () => {
    if (videoRef.current && isVideo) {
      videoRef.current.play().catch(error => {
        console.log("Video play error:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && isVideo) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      to={`/portfolio/${story.slug}`}
      className="success-story-card-link"
      aria-label={`View ${story.title} portfolio details`}
    >
      <div
        className="success-story-card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="story-media-container">
          {isVideo ? (
            <video
              ref={videoRef}
              src={story.video}
              className="story-video"
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <img src={story.image} alt={story.title} className="story-image" />
          )}
        </div>
        <h3>{story.title}</h3>
        <p>{story.description}</p>
        <div className="service-pills">
          {story.services.map((service, index) => (
            <ServicePill key={index} service={service} />
          ))}
        </div>
        <div className="team-members">
          {story.team.map((member, index) => (
            <span key={index} className="team-member">
              {member}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default SuccessStoryCard;
