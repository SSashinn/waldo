import propTypes from 'prop-types'

function getClickCoordinates(event) {
  const { top, left, width, height } = event.target.getBoundingClientRect();
  const xPercent = (event.clientX - left) / width * 100;
  const yPercent = (event.clientY - top) / height * 100;
  return { xPercent, yPercent };
}

export default function ImageSelector({ imageUrl, onSelectionChange }) {
  const handleClick = (event) => {
    const { xPercent, yPercent } = getClickCoordinates(event);
    onSelectionChange({ xPercent, yPercent });
  };

  return <img src={imageUrl} alt="Select an area" className="find-waldo-img" onClick={handleClick} />;
}

ImageSelector.propTypes = {
  imageUrl: propTypes.string,
  onSelectionChange: propTypes.func,
};