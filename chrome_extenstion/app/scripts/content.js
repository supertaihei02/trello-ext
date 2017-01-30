'use strict';

console.log(chrome.runtime.getManifest().name);
'use strict';

var backgrounds = [
    'http://i.imgur.com/CjAFFqk.jpg',
    'http://i.imgur.com/KbknKJ4.jpg',
    'http://i.imgur.com/ONCq8uI.jpg',
    'http://i.imgur.com/zV8dF0y.jpg',
    'http://i.imgur.com/L0O9kkX.jpg',
    'http://i.imgur.com/kTPUlx8.jpg',
    'http://i.imgur.com/PnbU6O6.jpg',
    'http://i.imgur.com/ibdL6mx.jpg',
    'http://i.imgur.com/WeXhWyY.jpg',
    'http://i.imgur.com/d05sgQN.jpg',
    'http://i.imgur.com/jCJBTS9.jpg',
    'http://i.imgur.com/iNMYcAF.jpg',
    'http://i.imgur.com/0U6XayX.jpg',
    'http://i.imgur.com/JelLbWg.jpg',
    'http://i.imgur.com/OGk3sJS.jpg',
    'http://i.imgur.com/c8CGuM8.jpg',
    'http://i.imgur.com/Rc46JS2.jpg',
    'http://i.imgur.com/YEfLLOY.jpg',
    'http://i.imgur.com/c7Z4adP.jpg',
    'http://i.imgur.com/FifUrok.jpg',
    'http://i.imgur.com/0Ew4HbH.jpg',
    'http://i.imgur.com/0pp8QC1.jpg',
    'http://i.imgur.com/qJUB95c.jpg',
    'http://i.imgur.com/TCqSPis.jpg',
    'http://i.imgur.com/0RpPAn4.jpg',
    'http://i.imgur.com/i6dJExZ.jpg',
    'http://i.imgur.com/WmpZrxU.jpg',
    'http://i.imgur.com/G5urOMi.jpg',
    'http://i.imgur.com/ldrOUVA.jpg',
    'http://i.imgur.com/DqW41Mk.jpg',
    'http://i.imgur.com/ehoV61I.jpg',
    'http://i.imgur.com/aMa5bmK.jpg',
    'http://i.imgur.com/HegJLWq.jpg',
    'http://i.imgur.com/rHEOZNk.jpg',
    'http://i.imgur.com/7chJqQV.jpg',
    'http://i.imgur.com/WGLCeQ8.jpg',
    'http://i.imgur.com/3QyjeEq.jpg',
    'http://i.imgur.com/5UllNi4.jpg',
    'http://i.imgur.com/vrLjNZz.jpg',
    'http://i.imgur.com/XKdJRAZ.jpg',
    'http://i.imgur.com/sYApJRL.jpg',
    'http://i.imgur.com/P0ZISty.jpg',
    'http://i.imgur.com/Bp6ACU7.png',
    'http://i.imgur.com/WZURz2S.jpg',
    'http://i.imgur.com/nMyAyE6.jpg',
    'http://i.imgur.com/Pfg23Ya.jpg',
    'http://i.imgur.com/OqS60DK.jpg',
    'http://i.imgur.com/N63NP9H.jpg',
    'http://i.imgur.com/9W7BD7b.jpg',
    'http://i.imgur.com/htgEQCT.jpg',
    'http://i.imgur.com/ZMOr79K.jpg',
    'http://i.imgur.com/GeuCnNO.jpg',
    'http://i.imgur.com/gJxxSlY.jpg',
    'http://i.imgur.com/0oW2bmI.jpg',
    'http://i.imgur.com/GUIdrja.jpg',
    'http://i.imgur.com/Mlwizq3.jpg',
    'http://i.imgur.com/A2kl5Lj.jpg',
    'http://i.imgur.com/jZ6Ru4H.jpg',
    'http://i.imgur.com/TLvdV5m.jpg'
  ],
  time_interval,
  style_tag_id = 'trello_style_userscript';

function do_change(url) {
  var last_style_tag,
    new_style_tag = document.createElement('style');

  new_style_tag.id = style_tag_id;
  new_style_tag.appendChild(document.createTextNode([
    '#surface{',
    'background-color: none !important;',
    'background-image: url(\'' + url + '\');',
    'background-attachment: fixed !important;',
    'background-repeat: no-repeat !important;',
    'background-position: center center !important;',
    '-webkit-background-size: cover;',
    '-moz-background-size: cover;',
    '-o-background-size: cover;',
    'background-size: cover;',
    '}'
  ].join("\n")));

  last_style_tag = document.getElementById(style_tag_id);
  if (last_style_tag) {
    last_style_tag.parentNode.replaceChild(new_style_tag, last_style_tag);
  } else {
    document.body.appendChild(new_style_tag);
  }
}

function randomBackground() {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}

function action() {
  do_change(randomBackground());
}

function loop(every) {
  if (time_interval) {
    clearInterval(time_interval);
  }

  time_interval = setInterval(action, every || (15 * 3600 * 1000));
}

window.changeBg = function (every) {
  action();
  loop(every);
};
window.addBg = function (url) {
  backgrounds.push(url);
};

action();