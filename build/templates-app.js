angular.module('templates-app', ['home/home.tpl.html']);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div controller=\"HomeCtrl\" onscroll=\"checkScrollHeight()\">\n" +
    "  <div class=\"header\">\n" +
    "    <div class=\"rentomojo-logo col-4\">\n" +
    "      <img src=\"./assets/rentomojo-logo.png\"/>\n" +
    "    </div>\n" +
    "    <div class=\"rm-contact col-4\">\n" +
    "      <span class=\"contact\"> <i class=\"fa fa-phone\"> </i> +91-9005799784 </span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main-content\">\n" +
    "    <div class=\"search-content\">\n" +
    "      <div class=\"search-box\">\n" +
    "        <form name=\"urlForm\" novalidate class=\"search-form\" ng-submit=\"onSearchSelection()\" >\n" +
    "          <div class=\"search-bar\">\n" +
    "            <div class=\"search-input-group\">\n" +
    "              <div class=\"label-container\">\n" +
    "                <label for=\"destination\" class=\"search-label\">Your Url:</label>\n" +
    "              </div>\n" +
    "              <div  class=\"search-input\">\n" +
    "                <input type=\"url\" name=\"searchInput\" ng-model=\"url.text\" class=\"input-field\" placeholder=\"http://\"  required=\"\">\n" +
    "                <span class=\"fa fa-search search-icon\"></span>\n" +
    "              </div>\n" +
    "              <div role=\"alert\" class=\"input-error\">\n" +
    "                <span class=\"error\" ng-show=\"showError && (urlForm.searchInput.$error.url  || urlForm.searchInput.$error.required)\">\n" +
    "                  not a valid url!</span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <button type=\"submit\" class=\"button\">Submit{{inputUrl}}</button>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"search-results\">\n" +
    "      <div class=\"results-list\">\n" +
    "        <div class=\"results-list-container\" ng-show=\"urlList.length>0\">\n" +
    "          <table class=\"result-list\">\n" +
    "            <thead class=\"result-list-header\">\n" +
    "              <tr>\n" +
    "                <th class=\"col-2\">No</th>\n" +
    "                <th class=\"col-7\">Original URL</th>\n" +
    "                <th class=\"col-3\">Short URL</th>\n" +
    "              </tr>\n" +
    "            </thead>\n" +
    "            <tbody class=\"result-body\">\n" +
    "              <tr ng-repeat=\"(key,value) in urlList\">\n" +
    "                <td class=\"col-1\">{{key+1}}</td>\n" +
    "                <td class=\"col-7\"><a href=\"{{value.long_url}}\" class=\"link\" target=\"_blank\">{{value.long_url}}</a></td>\n" +
    "                <td class=\"col-4\"><a href=\"{{value.link}}\" class=\"link\" target=\"_blank\" >{{value.link}}</a></td>\n" +
    "              </tr>\n" +
    "            </tbody>\n" +
    "          </table>\n" +
    "        </div>\n" +
    "        <div ng-class=\"urlList.length>0 ? 'total-results bg-success':'total-results bg-error'\">\n" +
    "          <p ng-show=\"urlList.length>0\">\n" +
    "            Total {{urlList.length}} url<span ng-show=\"urlList.length>1\">s</span> added.\n" +
    "          </p>\n" +
    "          <p ng-show=\"urlList.length===0\">\n" +
    "            No searched item to show.\n" +
    "          </p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);
