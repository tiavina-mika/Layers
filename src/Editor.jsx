/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import { cmToPx, zoom } from "./utils/utils";

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
        height: 200,
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
    height: 200,
    text: "cool 2",
    font: "Montserrat",
    size: 45,
    alignment: "left",
    color: "green"
  }
];
const template = {
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
    position: "absolute"
  }),
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  input: (template, layer) => ({
    fontSize: zoom(template, layer.size),
    // fontSize: layer.size,
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
  const getLayer = (layer) => {
    switch (layer.type) {
      case "userText":
        return (
          <input
            type="text"
            value={layer.text}
            css={classes.input(template, layer)}
            onChange={() => {}}
          />
        );
      case "image":
        return <img alt="layer" src={layer.imageId} css={classes.image} />;
      default:
        return <img alt="layer" src={layer.imageId} css={classes.image} />;
    }
  };

  // console.log('50.7', cmToPx(50.7));
  // console.log('50', cmToPx(50));
  // console.log('47', cmToPx(47));
  // console.log('43', cmToPx(43));
  // console.log('42', cmToPx(42));
  // console.log('41', cmToPx(41));
  // console.log('40', cmToPx(40));
  // console.log('47', cmToPx(47));
  // console.log('34', cmToPx(34));
  // console.log('31', cmToPx(31));
  // console.log('30', cmToPx(30));
  // console.log('28.5', cmToPx(28.5));
  // console.log('22', cmToPx(22));
  // console.log('21', cmToPx(21));
  // console.log('20', cmToPx(20));

  return (
    <div css={classes.editor}>
      <div css={classes.template(template)}>
        {template.layers.map((layer) =>
          layer.type === "mask" ? (
            <div
              css={[classes.mask(layer), classes.layer(template, layer)]}
              key={layer.id}
            >
              {layer.layers.map((subLayer) => (
                <div css={classes.layer(template, subLayer)} key={subLayer.id}>
                  {getLayer(subLayer)}
                </div>
              ))}
            </div>
          ) : (
            <div css={classes.layer(template, layer)} key={layer.id}>
              {getLayer(layer)}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Editor;
