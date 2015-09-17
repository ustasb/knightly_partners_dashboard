import $ from "jquery"

let $window = $(window);
let $topBarContainer = $("#top-bar-container");
let $bottomBarContainer = $("#bottom-bar-container");

function onResize() {
  let bottomHeight = $window.height() - $topBarContainer.height();
  $bottomBarContainer.height(bottomHeight);
}

export default {
  init: () => {
    onResize();
    $window.resize(onResize);
  }
};
