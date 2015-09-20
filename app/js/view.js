import $ from "jquery"

export function initView() {
  let $window = $(window);
  let $topBarContainer = $("#top-bar-container");
  let $bottomBarContainer = $("#bottom-bar-container");

  function onResize() {
    let bottomHeight = $window.height() - $topBarContainer.height();
    $bottomBarContainer.height(bottomHeight);
  }

  onResize();
  $window.resize(onResize);
}
