/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import { cx } from "@emotion/css";
import PropTypes from "prop-types";

import Typography from "../../components/Typography";

const classes = {
  step: {
    paddingTop: 30
  },
  title: {
    textAlign: "center"
  }
};

const Step = ({ title, children, contentClassName, className }) => {
  return (
    <div className={cx("flexCenter", className)} css={classes.step}>
      <Typography variant="title" level={2} css={classes.title}>
        {title}
      </Typography>
      <div className={cx("flexCenter flex1 stretchSelf", contentClassName)}>
        {children}
      </div>
    </div>
  );
};

Step.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  contentClassName: PropTypes.any,
  className: PropTypes.any
};

export default Step;
