import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, content }) => {
  return (
    <div className="max-w-sm w-full rounded-lg overflow-hidden shadow-lg mb-4 p-4 md:p-6 bg-white">
      <h2 className="text-sm md:text-xl font-bold mb-2 break-all">{title}</h2>
      <p className="text-xs md:text-base mb-4 break-words">{content}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Card;