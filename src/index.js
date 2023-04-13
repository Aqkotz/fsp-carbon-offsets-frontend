import $ from 'jquery';
import './style.scss';

$('#main').html(`You've been on this page for ${0} seconds.`);

let i = 0;

setInterval(() => {
  i += 1;
  $('#main').html(`You've been on this page for ${i} seconds.`);
}, 1000);
