import React from "react";
import PropTypes from "prop-types";
import "./videos.css";
type VideosProps = {
    embedId: string;
}

const Videos: React.FC<VideosProps> = ({ embedId }) => (
    <div className="video-responsive">
        <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
);

Videos.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default Videos;
