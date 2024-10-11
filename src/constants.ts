export enum Theme {
  dark = "dark",
  light = "light",
}

export const theme = {
  [Theme.dark]: {
    name: "Dark Theme",
    mapProps: {
      url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}",
      ext: "png",
    },
  },
  [Theme.light]: {
    name: "Light Theme",
    mapProps: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
  },
};
