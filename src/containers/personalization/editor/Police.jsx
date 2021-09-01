/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import { Radio } from "antd";
import PropTypes from "prop-types";
import { FONTS } from "../../../utils/constants";

const classes = {
  radioGroup: {
    "& .ant-radio-button-wrapper:before": {
      content: "normal"
    },
    "& .ant-radio-button-wrapper-checked, .ant-radio-button-wrapper:first-of-type": {
      border: "none"
    }
  },
  button: {
    border: "none",
    "&:focus-within": {
      border: "none",
      boxShadow: "none"
    }
  },
  font: ({ font, selected }) => (theme) => ({
    fontFamily: font,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 20,
    color: selected ? "#fff" : "#2E2E2E",
    backgroundColor: selected ? theme.colors.primary : "none",
    borderRadius: "50%",
    padding: 6
  })
};

const Police = ({ onChange, value, name }) => {
  const handleChange = (e) => {
    const police = e.target.value;
    if (onChange) {
      onChange(police, name);
    }
  };

  return (
    <div>
      <Radio.Group
        defaultValue={value}
        css={classes.radioGroup}
        onChange={handleChange}
      >
        {FONTS.map((font, index) => (
          <Radio.Button value={font} key={index} css={classes.button}>
            <span css={classes.font({ font, selected: font === value })}>
              Aa
            </span>
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
};

Police.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default Police;
