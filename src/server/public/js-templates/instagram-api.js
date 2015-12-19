var style = document.createElement('style');
document.head.appendChild(style);
var sheet = document.styleSheets[0];
sheet.insertRule(".instagram { text-align: center; }", sheet.cssRules.length);
sheet.insertRule(".instagram-pic { max-width: 100%; max-height: 100%; }", sheet.cssRules.length);
var langContent = document.createElement('div');
langContent.innerHTML = '<div class="instagram"><h3>Instagram: schmerzundtod</h3></div><div class="instagram"><img class="instagram-pic" src="https://scontent-fra3-1.cdninstagram.com/hphotos-xtf1/t51.2885-15/e35/11821120_1162646640418304_1831696296_n.jpg"></img></div>';
var langBlock = document.getElementById('instagramBlock');
langBlock.appendChild(langContent);
