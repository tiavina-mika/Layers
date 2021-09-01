/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import { useCallback, useState } from "react";
import { hasTextLayer, updateLayersValue } from "../../actions/templates";
import { EDITOR_PROPERTIES } from "../../utils/constants";
import Editor from "./Editor";
import Properties from "./Properties";

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
  container: {
    height: "100vh"
  }
};
const Preview = () => {
  const [property, setProperty] = useState(EDITOR_PROPERTIES[0]);
  const [template, setTemplate] = useState(templateData);
  const [selectedLayer, setSelectedLayer] = useState(null);

  console.log(template);

  const onEditTemplate = (template) => setTemplate(template);

  const onSelectProperty = (value) => setProperty(value);

  const handleSelectLayer = (value) => setSelectedLayer(value);

  const handleFormValuesChange = useCallback(
    (value) => {
      const textValues = {};
      const imageValues = {};

      const newTemplate = { ...template };

      switch (property) {
        case EDITOR_PROPERTIES[1]:
          textValues.size = value;
          break;
        case EDITOR_PROPERTIES[2]:
          textValues.color = value;
          break;
        case EDITOR_PROPERTIES[3]:
          imageValues.rotation = value.rotation;
          break;
        default:
          textValues.font = value;
          newTemplate.layers.forEach(
            updateLayersValue(selectedLayer.id, value, "font")
          );
      }

      // setValues((prev) => ({
      //   ...prev,
      //   text: { ...prev.text, ...textValues },
      //   image: { ...prev.image, ...imageValues },
      // }));
    },
    [property, template, selectedLayer]
  );

  return (
    <div className="flexCenter" css={classes.container}>
      <div className="flexRow flex1 stretchSelf">
        <Properties
          onChange={onSelectProperty}
          property={property}
          hasTextLayer={hasTextLayer(template.layers)}
        />
        <Editor
          template={template}
          onEditTemplate={onEditTemplate}
          property={property}
          onChange={handleFormValuesChange}
          onSelectLayer={handleSelectLayer}
        />
      </div>
    </div>
  );
};

export default Preview;
