// Module variables
const main_html = `
  <div class="spa-shell-head">
    <div class="spa_shell_head_logo">
      <h1>ES6</h1>
      <p>no framework</p>
    </div>
    <div class="spa-shell-head-acct"></div>
  </div>
  <div class="spa-shell-main">
    <div class="spa-shell-main-nav"></div>
    <div class="spa-shell-main-content">
      <div class="spa-shell-main-content-message"></div>
      <div class="spa-shell-main-content-body"></div>
    </div>
  </div>
  <div class="spa-shell-foot"></div>
  <div class="spa-shell-modal"></div>
`
const nav_html = `
  <ul>
    <li id="home" class="spa-shell-nav-li"><a href="#home">Home</a></li>
    <li id="news" class="spa-shell-nav-li"><a href="#news">News</a></li>
    <li spa-shell-nav-li><a href="#contact">Contact</a></li>
    <li spa-shell-nav-li><a href="#about">About</a></li>
  </ul>
`
const onClickMenuitem = ( id ) => {
    switch (id) {
      case "home":
        alert('HOME')
        //spa.home.initModule( domMap.content );
        break;
      case "news":
        //spa.news.initModule( domMap.content );
        break;
      case "nino":
          //spa.nino.initModule( domMap.content );
          break;

    }
}
// Export module initModule
const initModule = ( container ) => {


  container.innerHTML = main_html
  document.querySelector('.spa-shell-main-nav').innerHTML = nav_html

  const li = document.getElementsByClassName( 'spa-shell-nav-li' )
    for (let i=0; i < li.length; i++) {

//        li[i].addEventListener(
//          "click", function( event ) {
//          onClickMenuitem( event.currentTarget.id )
//          }
//      )
    }
  for (let _li of li) {
        _li.addEventListener(
          "click", ( event ) => {
          onClickMenuitem( event.currentTarget.id )
          }
      )
  }

}

export { initModule }
