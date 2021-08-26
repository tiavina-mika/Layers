// ----------------------------------------- //
// ------------- images upload ------------- //
// ----------------------------------------- //
export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Convert cm to px
 * @param {integer} value
 * @param {integer} dpi
 * @returns
 */
export const cmToPx = (value, dpi = 150) => {
  if (value == null) {
    return value;
  }
  const defaultValueInch = 0.39370079; // default value on Inch
  // round to the nearest integer
  return Math.ceil(value * defaultValueInch * dpi);
};

export const zoom2 = (size, value = 0.4) => {
  return `calc(${size * value}px)`;
};

export const zoom = (template, size) => {
  let value;
  const width = cmToPx(template.width);

  if (width >= 2995) {
    value = 1;
  } else {
    value = 0.8;
  }
  return `calc(${size * value}px)`;
};
