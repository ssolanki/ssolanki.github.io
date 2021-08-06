const rp = require('request-promise');
var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;

const axios = require('axios');
const cheerio = require('cheerio');
const urls = [ 
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/vc/alert.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/vc/info.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/vc/tick.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/vc/exclamation.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/address-book.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/alarm-clock.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/anchor.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/application-image.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/arrow.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/asterisk.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/auction-hammer.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/balloon.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/balloon-buzz.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/balloon-facebook.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/balloon-twitter.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/battery-full.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/binocular.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/blue-document-excel.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/blue-document-image.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/blue-document-music.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/blue-document-office.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/blue-document-pdf.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/blue-document-powerpoint.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/blue-document-word.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/bookmark.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/camcorder.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/camera.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/chart.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/chart-pie.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/clock.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/control.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/fire.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/heart.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/mail.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/plus-shield.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/video.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/fonts/vc_icons_v2/fonts/vcpb-plugin-icons.ttf',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/fonts/vc_icons_v2/fonts/vcpb-plugin-icons.woff',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/fonts/vc_icons_v2/fonts/vcpb-plugin-icons.svg',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/address-book.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/alarm-clock.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/anchor.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/application-image.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/arrow.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/asterisk.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/auction-hammer.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/balloon.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/balloon-buzz.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/balloon-facebook.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/balloon-twitter.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/battery-full.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/binocular.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/blue-document-excel.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/blue-document-image.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/blue-document-music.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/blue-document-office.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/blue-document-pdf.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/blue-document-powerpoint.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/blue-document-word.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/bookmark.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/camcorder.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/camera.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/chart.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/chart-pie.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/clock.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/control.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/fire.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/heart.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/mail.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/plus-shield.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/icons/video.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/toggle_open.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/toggle_close.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/flickr.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/fonts/vc_grid/vc_grid_v1.eot',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/fonts/vc_grid/vc_grid_v1.eot',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/fonts/vc_grid/vc_grid_v1.woff',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/fonts/vc_grid/vc_grid_v1.ttf',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/fonts/vc_grid/vc_grid_v1.svg',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/images/spinner.gif',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/vc/tick.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/js_composer/assets/vc/remove.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/fonts/glyphicons-halflings-regular.eot',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/fonts/glyphicons-halflings-regular.eot',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/fonts/glyphicons-halflings-regular.woff2',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/fonts/glyphicons-halflings-regular.woff',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/fonts/glyphicons-halflings-regular.ttf',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/fonts/glyphicons-halflings-regular.svg',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/fontawesome-webfont.eot',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/fontawesome-webfont.eot',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/fontawesome-webfont.woff2',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/fontawesome-webfont.woff',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/fontawesome-webfont.ttf',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/fontawesome-webfont.svg',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/themify.eot',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/themify.eot',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/themify.woff',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/themify.ttf',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/themify.svg',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/Flaticon.eot',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/Flaticon.eot',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/Flaticon.woff',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/Flaticon.ttf',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/Flaticon.svg',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/Flaticon.svg',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/VideoJS.eot',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/VideoJS.eot',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/VideoJS.woff',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/VideoJS.ttf',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fonts/VideoJS.svg',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fresco/skins/loading.gif',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fresco/skins/blank.gif',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fresco/skins/blank.gif',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fresco/skins/blank.gif',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fresco/skins/blank.gif',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fresco/skins/loading.gif',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fresco/skins/loading-small.gif',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fresco/skins/loading-medium.gif',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fresco/skins/loading.gif',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fresco/skins/fresco/sprite.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fresco/skins/fresco/sprite',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/fresco/skins/IE6/sprite.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/font/ytp-regular.eot',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/font/ytp-regular.ttf',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/images/raster.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/images/raster',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/images/raster_dot.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/css/images/raster_dot',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/ajax-loader.gif',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/catanis-core/images/heading-leaf-left.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/catanis-core/images/heading-leaf-right.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/catanis-core/images/video-corner-tl.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/catanis-core/images/video-corner-br.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/catanis-core/images/video-pause.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/catanis-core/images/video-close.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/catanis-core/images/line-heart.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/catanis-core/images/icon-cursor-light.png',
    'http://sweetinz.catanisthemes.com/wp-content/plugins/catanis-core/images/icon-cursor-dark.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/icon-select.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/ajax-processing.gif',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/video-pattern-1.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/icon-search.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/video-pause.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/heart_line.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/audio-controls.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/icon-search-sticky.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/effect-sparkle1.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/effect-sparkle2.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/effect-rain.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/effect-glass1.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/effect-glass2.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/effect-snow1.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/effect-snow2.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/video-corner-tl.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/video-corner-br.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/cross-search.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/video-play.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/video-pause.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/video-pattern-1.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/default/bg-404.jpg',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/icon-search.png',
    'http://sweetinz.catanisthemes.com/wp-content/themes/sweetinz/images/icon_cart.png'
]
const baseUrl = "https://confettigifts.in"
const fs = require('fs')
const req = require('request');

const getAllAttributes = function (node) {
	return node.attributes || Object.keys(node.attribs).map(
	    name => ({ name, value: node.attribs[name] })
	);
};

const downloadImage = function(uri, filename, folder="", callback){
  req.head(uri, function(err, res, body){
    console.log(folder, filename)
    
    try {
        fs.mkdirSync(folder, { recursive: true });
      } catch (err) {
      }

    req(uri).pipe(fs.createWriteStream(`${folder}/${filename}`)).on('close', callback);
  });
};

async function getPageData(url) {
  const options = {
    uri: url,
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  return axios.get(`${''}${url}`)
    .then((response) => {
        // const $= cheerio.load(response.data)
        // const images = []
        // const title = $(".product-single__meta .h2.product-single__title").text().trim()
        // const price = $(".product-single__meta .product__price").text().trim().split("Rs.")[1].replace(",", "")
        // const categorySelectors = $(".breadcrumb a")
        // const category = $(categorySelectors[categorySelectors.length-1]).text().trim()
        // const despSelectors = $(".product-single__description ul")
        // const productSelectors = $(despSelectors[0]).find("li")
        // const imageSelectors = $(".product__thumb-item .product__thumb img")
        // const products = []
        // // console.log(productSelectors, productSelectors.text(), "length")

        // for( let i = 0; i< productSelectors.length; i+=1) {
        // //   console.log($(despSelectors[i]).find("li"))
        //   products.push($(productSelectors[i]).text().trim())
        // }
        // for( let i = 0; i< imageSelectors.length; i+=1) {
        //   const image = "https:" + $(imageSelectors[i]).data("src").replace("{width}", "720")
        //   const format = "jpg" //image.split(".")[image.split(".") - 1]
        //   const fileName = `${title.toLocaleLowerCase().split(" ").join("_")}_${i}.${format}`
        //   // console.log(fileName, format)

        //   downloadImage(image, fileName, function(){
        //     console.log('done');
        //   });
            const baseUrl = 'http://sweetinz.catanisthemes.com/'
            const path1 = url.split(baseUrl)[1]
            const fileName = path1.split("/")[path1.split("/").length - 1]
            const folder = path1.substring(0,path1.indexOf(fileName))

          downloadImage(url, fileName, folder, function(){
            console.log('done');
          });
        //   images.push(image)
        // }
      
        // console.log(title, category, price, products, images);
        // console.log( `${title},${price},${category},${products.join("\n")},${images[0]},${images.join(",")}`)
        // return `${title},${price},${category},${products},${images[0]},${images.join(",")}`
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
}

async function scrapData() {
  const products = []

  for(let index = 0 ; index < urls.length; index+=1) {
    products.push(await getPageData(urls[index]))
  }
  console.log(products.join("\n"))
}

scrapData()