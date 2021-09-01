/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import { useCallback, useState } from "react";
import { cmToPx, zoom } from "./utils/utils";
import { updateLayersValue } from "./actions/templates";
import TextLayer from "./TextLayer";

const layers = [
  {
    id: "mask1",
    type: "mask",
    top: 0,
    left: 0,
    width: 250,
    height: 250,
    imageId: "/alpha-cat.png",
    layers: [
      {
        id: "maskImage1",
        type: "userImage",
        top: 0,
        left: 0,
        width: 250,
        height: 250,
        imageId: "/me.jpg"
      },
      {
        id: "masktext1",
        type: "userText",
        top: 50,
        left: 60,
        width: 200,
        height: 15,
        text: "cool 1",
        font: "Montserrat",
        size: 32,
        alignment: "left",
        color: "blue"
      }
    ]
  },
  {
    id: "mask2",
    type: "mask",
    top: 250,
    left: 250,
    width: 260,
    height: 260,
    imageId: "/alpha-cat.png",
    layers: [
      {
        id: "maskImage2",
        type: "image",
        top: 0,
        left: 0,
        width: 260,
        height: 260,
        imageId: "/image1.jpg"
      }
    ]
  },
  {
    id: "text1",
    type: "userText",
    top: 500,
    left: 0,
    width: 200,
    height: 75,
    text: "cool 2",
    font: "Montserrat",
    size: 45,
    alignment: "left",
    color: "green"
  }
];
const templateData = {
  name: "template1",
  width: 11,
  height: 11,
  layers,
  backgroundColor: "grey"
};

const classes = {
  editor: {
    width: "100vw",
    height: "100vh"
  },
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

const Editor = () => {
  const [template, setTemplate] = useState(templateData);
  console.log(template);

  const selectLayer = (layer) => {
    if (layer.type === "image" || layer.type === "userText") return;
    if (layer.type === "userImage") {
      const newTemplate = { ...template };
      newTemplate.layers.forEach(
        updateLayersValue(layer.id, "/le_cri.jpg", "imageId")
      );
      setTemplate(newTemplate);
    }
  };

  const onChangeTextLayer = useCallback(
    (layer, value) => {
      const newTemplate = { ...template };
      newTemplate.layers.forEach(updateLayersValue(layer.id, value, "text"));
      setTemplate(newTemplate);
    },
    [template]
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
    <div css={classes.editor}>
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

export default Editor;
