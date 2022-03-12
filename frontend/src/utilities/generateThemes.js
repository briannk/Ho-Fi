import cloneDeep from "lodash.clonedeep";
import isEmpty from "lodash.isempty";
import KEYS_TO_EXCLUDE from "../constants/keysToExclude";

const generateThemes = async (data, of, themes, colorTable) => {
  if (!data) return;

  let _themes = !isEmpty(themes) ? cloneDeep(themes) : themes;
  let _colorTable = !isEmpty(colorTable) ? [...colorTable] : colorTable;
  let randomColor;

  const keys = Object.keys(data[0].items[0]);
  console.log(KEYS_TO_EXCLUDE[of]);

  keys.forEach((key) => {
    if (KEYS_TO_EXCLUDE[of].includes(key)) return;
    data.forEach((dataGroup) => {
      dataGroup.items.forEach((dataPoint) => {
        if (_themes[key] && _themes[key][dataPoint[key].toLowerCase()]) {
          return;
        } else {
          // on the rare occasion the colors run out, randomly assign
          // a color as the charts will likely be too convoluted
          // to discern unique colors
          // if (colorTable.length > 360) {
          //   randomColor = `hsl(${Math.floor(Math.random() * 360)}, 94%, 75%)`;
          // }
          if (!_themes[key]) {
            _themes[key] = {};
          }

          do {
            randomColor = `hsl(${Math.floor(Math.random() * 360)}, 91%, 71%)`;
          } while (_colorTable.includes(randomColor));

          _themes[key][dataPoint[key].toLowerCase()] = randomColor;

          _colorTable.push = randomColor;
        }
      });
      if (!_themes[key]["other"]) {
        do {
          randomColor = `hsl(${Math.floor(Math.random() * 360)}, 91%, 71%)`;
        } while (_colorTable.includes(randomColor));

        _themes[key]["other"] = randomColor;

        _colorTable.push = randomColor;
      }
    });
  });

  return { themes: _themes, table: _colorTable };
};

// adds a color property to each data point in the dataset
// based on the colorThemes object
const assignColors = (_data, selectValue, colorThemes) => {
  if (isEmpty(_data)) return;
  _data.forEach((dataGroup) => {
    dataGroup.color = colorThemes[selectValue][dataGroup.id.toLowerCase()];
  });
  return _data;
};

// generate a string representing the color theme for a single data point
const generateTheme = () => {
  return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, 0.6)`;
};

export { generateTheme, generateThemes, assignColors };
