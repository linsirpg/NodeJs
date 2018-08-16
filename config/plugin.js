'use strict';

// had enabled by egg
// exports.static = true;
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.security = {
  xframe: {
    enable: false,
  },
};

// exports.cors = {
//   enable: true,
//   package: 'egg-cors',
// };