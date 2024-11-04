// tailwind.config.js

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];

export const theme = {
  extend: {
    colors: {
      'semi-transparent-white': 'rgba(255, 255, 255, 0.388)', // Adding the custom color
    },
  },
};

export const plugins = [];
