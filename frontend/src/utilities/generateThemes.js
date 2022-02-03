const generateThemes = (data, selectValue) => {
  console.log(data, selectValue);
  let themes = {};
  let colorTable = [];
  const keys = Object.keys(data.items[0]);

  keys.forEach((key) => {
    data.items.forEach((dataPoint) => {
      if (themes[key] && themes[key][dataPoint[key]]) {
        console.log(themes[key], themes[key][dataPoint[key]]);
        return;
      } else {
        let randomColor;
        // on the rare occasion the colors run out, randomly assign
        // a color as the charts will likely be too convoluted
        // to discern unique colors
        // if (colorTable.length > 360) {
        //   randomColor = `hsl(${Math.floor(Math.random() * 360)}, 94%, 75%)`;
        // }
        do {
          randomColor = `hsl(${Math.floor(Math.random() * 360)}, 91%, 71%)`;
          console.log("loop");
        } while (colorTable.includes(randomColor));
        console.log("loop end");
        if (!themes[key]) {
          themes[key] = {};
        }
        themes[key][dataPoint[key]] = randomColor;
        colorTable.push(randomColor);
      }
    });
  });
  console.log(themes, colorTable);
  return themes;
};

// generate a string representing the color theme for a single data point
const generateTheme = () => {
  return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, 0.6)`;
};

export { generateTheme, generateThemes };
