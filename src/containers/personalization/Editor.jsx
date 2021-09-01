/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import { useCallback } from "react";
import PropTypes from "prop-types";

import TextLayer from "./TextLayer";
import { cmToPx, zoom } from "../../utils/utils";
import { updateLayersValue } from "../../actions/templates";

const classes = {
  // editor: {
  //   width: "100vw",
  //   height: "100vh"
  // },
  template: (template) => ({
    height: zoom(template, cmToPx(template.height)),
    width: zoom(template, cmToPx(template.width)),
    // width: zoom(width),
    position: "relative",
    backgroundColor: template.backgroundColor
  }),
  mask: (layer) => ({
    width: layer.width,
    height: layer.height,
    maskImage: `url(${layer.imageId})`,
    WebkitMaskImage: `url(${layer.imageId})`,
    maskSize: "100% 100%",
    WebkitMaskSize: "100% 100%",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskMode: "alpha",
    WebkitMaskMode: "alpha",
    backgroundColor: "blue",
    position: "relative"
  }),
  layer: (template, layer) => ({
    width: zoom(template, layer.width),
    top: zoom(template, layer.top),
    height: zoom(template, layer.height),
    left: zoom(template, layer.left),
    position: "absolute",
    cursor: layer.type !== "image" ? "pointer" : "default"
  }),
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  input: (template, layer) => ({
    fontSize: zoom(template, layer.size),
    color: layer.color,
    textAlign: layer.alignment,
    backgroundColor: "transparent",
    border: "1px dashed #7885E9",
    "&:focus": {
      backgroundColor: "#fff"
    }
  })
};

const Editor = ({ template, onEditTemplate }) => {
  const selectLayer = (layer) => {
    if (layer.type === "image" || layer.type === "userText") return;
    if (layer.type === "userImage") {
      const newTemplate = { ...template };
      newTemplate.layers.forEach(
        updateLayersValue(layer.id, "/le_cri.jpg", "imageId")
      );
      onEditTemplate(newTemplate);
    }
  };

  const onChangeTextLayer = useCallback(
    (layer, value) => {
      const newTemplate = { ...template };
      newTemplate.layers.forEach(updateLayersValue(layer.id, value, "text"));
      onEditTemplate(newTemplate);
    },
    [template, onEditTemplate]
  );

  const getLayer = useCallback(
    (layer) => {
      switch (layer.type) {
        case "userText": {
          const onChange = (value) => {
            onChangeTextLayer(layer, value);
          };
          return (
            <TextLayer
              defaultValue={layer.text}
              css={classes.input(template, layer)}
              onChange={onChange}
            />
          );
        }
        case "image":
          return <img alt="layer" src={layer.imageId} css={classes.image} />;
        default:
          return <img alt="layer" src={layer.imageId} css={classes.image} />;
      }
    },
    [template, onChangeTextLayer]
  );

  const layerComponent = (layer) => (
    <div
      css={classes.layer(template, layer)}
      key={layer.id}
      onClick={() => selectLayer(layer)}
    >
      {getLayer(layer)}
    </div>
  );

  if (!template) return null;

  return (
    <div className="flexCenter flex1 stretchSelf">
      <div css={classes.template(template)}>
        {template.layers.map((layer) =>
          layer.type === "mask" ? (
            <div
              css={[classes.mask(layer), classes.layer(template, layer)]}
              key={layer.id}
            >
              {layer.layers.map((subLayer) => layerComponent(subLayer))}
            </div>
          ) : (
            layerComponent(layer)
          )
        )}
      </div>
    </div>
  );
};

Editor.propTypes = {
  template: PropTypes.any,
  onEditTemplate: PropTypes.func
};

export default Editor;
