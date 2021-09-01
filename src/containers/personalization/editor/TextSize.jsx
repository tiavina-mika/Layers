/** @jsxRuntime classic /
/* @jsx jsx */
import { Slider as AntdSlider } from "antd";
import PropTypes from "prop-types";

import theme from "../../../../styles/theme";

const SLIDER = {
  width: 340,
  height: 14,
  borderRadius: 16
};

const formatter = (value) => {
  return `${value}px`;
};

const classes = {
  slider: (defaultTheme) => ({
    width: SLIDER.width,
    "&:hover .ant-slider-track": {
      background: defaultTheme.colors.primaryLight
    },
    "& .ant-slider-track": {
      width: SLIDER.width,
      height: SLIDER.height,
      background: defaultTheme.colors.primaryLight,
      borderRadius: SLIDER.borderRadius
    },
    "& .ant-slider-rail": {
      width: SLIDER.width,
      height: SLIDER.height,
      borderRadius: SLIDER.borderRadius
    }
  }),
  rail: {
    background: theme.colors.primary,
    marginTop: -40 / 3,
    border: "none",
    height: 40,
    width: 40
  }
};

const TextSize = ({ onChange, value }) => {
  return (
    // ISSUES: https://github.com/ant-design/ant-design/issues/26136
    <AntdSlider
      css={classes.slider}
      handleStyle={classes.rail}
      tipFormatter={formatter}
      min={18}
      max={32}
      defaultValue={value}
      onChange={onChange}
    />
  );
};

TextSize.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number
};

export default TextSize;
