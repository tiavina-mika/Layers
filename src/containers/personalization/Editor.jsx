/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import { useCallback } from "react";
import PropTypes from "prop-types";

import TextLayer from "./TextLayer";
import Police from "./editor/Police";
import TextColor from "./editor/TextColor";
import TextSize from "./editor/TextSize";
import { cmToPx, zoom } from "../../utils/utils";
import Step from "./Step";
import { EDITOR_PROPERTIES, FONTS } from "../../utils/constants";

const classes = {
  property: {
    marginTop: 23
  },
  template: (template) => ({
    height: zoom(template, cmToPx(template.height)),
    width: zoom(template, cmToPx(template.width)),
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

const Editor = ({
  template,
  property,
  onChange,
  onSelectLayer,
  onChangeTextLayer
}) => {
  const selectLayer = (layer) => {
    if (!onSelectLayer) return;
    if (layer.type === "image") return;
    onSelectLayer(layer);
    // if (layer.type === "userImage") {
    //   const newTemplate = { ...template };
    //   newTemplate.layers.forEach(
    //     updateLayersValue(layer.id, "/le_cri.jpg", "imageId")
    //   );
    //   onEditTemplate(newTemplate);
    // }
  };

  // --------------------------------- //
  // --- each layer type component --- //
  // --------------------------------- //
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

  // --------------------------------------------------- //
  // --- each layer and subLayer conatiner component --- //
  // --------------------------------------------------- //
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

  // ----------------------------------------- //
  // ------------ input components ----------- //
  // ----------------------------------------- //
  let propertySelectComponent;
  let title;

  // forms
  switch (property) {
    case EDITOR_PROPERTIES[1]:
      propertySelectComponent = (
        <TextSize onChange={onChange} value={22} name="size" />
      );
      title = "Changer la taille de la police d’écriture";
      break;
    case EDITOR_PROPERTIES[2]:
      propertySelectComponent = <TextColor onChange={onChange} name="color" />;
      title = "Changer la couleur de la police d’écriture";
      break;
    case EDITOR_PROPERTIES[3]:
      title = "Recadrer ou tourner la photo";
      break;
    default:
      propertySelectComponent = (
        <Police onChange={onChange} value={FONTS[0]} name="font" />
      );
      title = "Changer la police d’écriture";
  }

  return (
    <Step title={title} className="flexCenter flex1 stretchSelf">
      {/* ------------ form ------------ */}
      {propertySelectComponent && (
        <div css={classes.property}>{propertySelectComponent}</div>
      )}

      {/* ------------ layers editor ------------ */}
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
    </Step>
  );
};

Editor.propTypes = {
  template: PropTypes.any,
  onChangeTextLayer: PropTypes.func,
  onChange: PropTypes.func,
  onSelectLayer: PropTypes.func,
  property: PropTypes.any,
  values: PropTypes.any
};

export default Editor;
