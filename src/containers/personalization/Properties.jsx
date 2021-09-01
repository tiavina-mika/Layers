/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import PropTypes from "prop-types";

import Typography from "../../components/Typography";
import { EDITOR_PROPERTIES } from "../../utils/constants";

export const properties = [
  {
    label: "Police",
    icon: "/icons/police.svg",
    type: "text",
    id: EDITOR_PROPERTIES[0]
  },
  {
    label: "Taille",
    icon: "/icons/text-size.svg",
    type: "text",
    id: EDITOR_PROPERTIES[1]
  },
  {
    label: "Couleur",
    icon: "/icons/colors.svg",
    type: "text",
    id: EDITOR_PROPERTIES[2]
  },
  {
    label: "Rogner",
    icon: "/icons/crop.svg",
    type: "image",
    id: EDITOR_PROPERTIES[3]
  }
];

const classes = {
  properties: (theme) => ({
    background: theme.colors.primaryLight,
    // background: theme.colors.primaryLight,
    width: 141
    // height: 834,
  }),
  items: {
    paddingTop: 160
  },
  item: (selected) => ({
    marginBottom: 64,
    opacity: selected ? 1 : 0.5
  }),
  label: {
    fontSize: "18px !important",
    textAlign: "center",
    letterSpacing: "-0.02em",
    color: "#333 !important"
  },
  notSelected: {
    opacity: 0.5
  }
};

const Properties = ({ onChange, property, hasTextLayer }) => {
  // edit only image if there are no text layer
  const items = hasTextLayer
    ? properties
    : properties.filter((propertyItem) => propertyItem.type === "image");
  return (
    <div className="flexColumn stretchSelf" css={classes.properties}>
      <div
        className="flexColumn alignCenter stretchSelf flex1 "
        css={classes.items}
      >
        {items.map((item, index) => (
          <div key={index} css={classes.item(property === item.id)}>
            <button
              onClick={() => onChange(item.id)}
              type="button"
              className="flexColumn alignCenter clickableText"
            >
              <img alt={item.label} src={item.icon} />
              <Typography css={classes.label}>{item.label}</Typography>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

Properties.propTypes = {
  onChange: PropTypes.func,
  property: PropTypes.oneOf(EDITOR_PROPERTIES),
  hasTextLayer: PropTypes.any
};

export default Properties;
