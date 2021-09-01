export const updateLayersValue = (id, value, field = "text") => (layer) => {
  if (layer.id === id) {
    layer[field] = value;
  } else if (layer.layers) {
    layer.layers.forEach(updateLayersValue(id, value, field));
  }
};

/**
 * test if the template has a text layer
 * @param {*} layers
 * @returns
 */
export const hasTextLayer = (layers) => {
  const userTextLayer = layers.find((layer) => layer.type === "userText");
  const userTextSubLayer = layers.find((layer) => {
    return layer.layers && hasTextLayer(layer.layers);
  });

  return userTextLayer || userTextSubLayer;
};
