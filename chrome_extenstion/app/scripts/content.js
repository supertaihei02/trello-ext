'use strict';

var backgrounds = null,
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

var xhr = new XMLHttpRequest();
var url = chrome.extension.getURL("backgrounds.json");
xhr.open("get", url, true);
xhr.onload = function(){
  backgrounds = JSON.parse(xhr.responseText);
  action();
  window.changeBg = function (every) {
    action();
    loop(every);
  };
  window.addBg = function (url) {
    backgrounds.push(url);
  };
};
xhr.send(null);
