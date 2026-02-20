import React from 'react';
import PropTypes from 'prop-types';

const Chip = ({ value }) => {
  return (
    <div className="flex items-center justify-center rounded-lg border border-gray-300 bg-white w-12 h-12 sm:w-16 sm:h-16 text-xs md:text-sm p-2 transition-all duration-200 hover:scale-105">
      <span className="flex items-center justify-center" style={{ minHeight: '44px', minWidth: '44px' }}>{value}</span>
    </div>
  );
};

Chip.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Chip;