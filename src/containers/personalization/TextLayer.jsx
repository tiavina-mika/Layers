/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import { useState } from "react";

import PropTypes from "prop-types";

const classes = {
  button: {
    display: "none"
  }
};

/* eslint-disable jsx-a11y/control-has-associated-label */
const TextLayer = ({ onChange, className, defaultValue }) => {
  const [text, setText] = useState(defaultValue);
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} css={className} onChange={handleChange} />
      <button type="submit" css={classes.button} />
    </form>
  );
};

TextLayer.propTypes = {
  onChange: PropTypes.any,
  className: PropTypes.any,
  defaultValue: PropTypes.any
};

export default TextLayer;
