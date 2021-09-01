export const updateLayersValue = (id, value, field = "text") => (layer) => {
  if (layer.id === id) {
    layer[field] = value;
  } else if (layer.layers) {
    layer.layers.forEach(updateLayersValue(id, value, field));
  }
};
