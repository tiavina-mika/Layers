/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useState } from "react";

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

const classes = {
  editor: {
    width: 400,
    height: 400,
    overflow: "scroll"
  },
  template: ({ width, height, backgroundColor }) => ({
    width,
    height,
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
  layer: ({ width, top, left, height }) => ({
    width,
    top,
    height,
    left,
    position: "absolute"
  }),
  image: {
    width: "100%"
  },
  input: (layer) => ({
    fontSize: layer.size,
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
            <div css={[classes.mask(layer), classes.layer(layer)]}>
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
