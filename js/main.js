'use strict';

let offersLib = [];

const createOffersLib = function () {
  for (let i = 1; i <= 8; i++) {
    offersLib[i] = {'author': {}, 'offer': {}, 'location': {}};
    offersLib[i].author = {
      'avatar': `../img/avatars/user0${i}.png`
    };
    offersLib[i].offer = {
      'title': ` `,
      'address': `${offersLib[1].location['x']}`,
      // 'price': ,
      // 'type': ,
      // 'rooms': ,
      // 'guests': ,
      // 'checkin': ,
      // 'checkout': ,
      // 'features': ,
      // 'description': ,
      // 'photos':
    };
    offersLib[i].location = {
      'x': Math.ceil(Math.random() * 100),
      'y': Math.ceil(Math.random() * 100)
    };
  }
};

createOffersLib();

let xyxyxy = offersLib[1].location['x'].toString() + ', ' + offersLib[1].location['y'].toString();
// let xyxyxy = offersLib[1].location['x'].toString() + offersLib[i].location['y'].toString();
// let xyxyxy = 10;
// + offersLib[1].location['y'].toString()
