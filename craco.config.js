const path = require('path');

module.exports = {
  webpack: {
    alias: {
      fonts: path.resolve(__dirname, '../../ui/ui-layer/react_ui/global'),
    },
  },
};

