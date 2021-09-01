/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import PropTypes from "prop-types";
import { COLORS } from "../../../utils/constants";

const classes = {
  colors: {
    margin: -4
  },
  button: {
    backgroundColor: "transparent",
    padding: 0,
    border: "none",
    margin: 4,
    cursor: "pointer"
  },
  color: (color) => ({
    backgroundColor: color.color,
    border: "2px solid" + (color.border || "fff"),
    height: 32,
    width: 32,
    borderRadius: "50%"
  })
};

const TextColor = ({ onChange, name }) => {
  return (
    <div className="flexCenter stretchSelf">
      <div className="flexRow" css={classes.colors}>
        {COLORS.map((color, index) => (
          <button
            onClick={() => onChange(color.color, name)}
            key={index}
            type="button"
            css={classes.button}
          >
            <div css={classes.color(color)} />
          </button>
        ))}
      </div>
    </div>
  );
};

TextColor.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string
};

export default TextColor;
