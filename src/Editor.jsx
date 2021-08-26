/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";

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
        width: 200,
        height: 200,
        imageId: "/me.jpg"
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
        width: 200,
        height: 200,
        imageId: "/image1.jpg"
      }
    ]
  },
  {
    id: "text1",
    type: "userText",
    top: 0,
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
  width: 600,
  height: 600,
  layers,
  backgroundColor: "grey"
};

const zoom = (size, value = 0.6) => {
  return `calc(${size * value}px)`;
};

const classes = {
  editor: {
    width: "100vw",
    height: "100vh"
  },
  template: ({ width, height, backgroundColor }) => ({
    height: zoom(height),
    width: zoom(width),
    position: "relative",
    backgroundColor
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
  layer: (layer) => ({
    width: zoom(layer.width),
    top: zoom(layer.top),
    height: zoom(layer.height),
    left: zoom(layer.left),
    position: "absolute"
  }),
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  input: (layer) => ({
    fontSize: zoom(layer.size),
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
          // <div css={classes.layer(layer)} key={layer.id}>
          <input type="text" value={layer.text} css={classes.input(layer)} />
          // </div>
        );
      case "image":
        return (
          // <div css={classes.layer(layer)} key={layer.id}>
          <img alt="layer" src={layer.imageId} css={classes.image} />
          // </div>
        );
      default:
        return <img alt="layer" src={layer.imageId} css={classes.image} />;
    }
  };

  return (
    <div css={classes.editor}>
      <div css={classes.template(template)}>
        {template.layers.map((layer) =>
          layer.type === "mask" ? (
            <div
              css={[classes.mask(layer), classes.layer(layer)]}
              key={layer.id}
            >
              {layer.layers.map((subLayer) => (
                <div css={classes.layer(subLayer)} key={subLayer.id}>
                  {getLayer(subLayer)}
                </div>
              ))}
            </div>
          ) : (
            <div css={classes.layer(layer)} key={layer.id}>
              {getLayer(layer)}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Editor;
