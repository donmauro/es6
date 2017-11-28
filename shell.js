import * as modHome from '/home.js'
// Module variables
const main_html = `
  <div class="shell-head">
    <div class="shell-head-logo">
      <h1>ES6</h1>
      <p>no framework</p>
    </div>
    <div class="shell-head-acct"></div>
  </div>
  <div class="shell-main">
    <div class="shell-main-nav"></div>
    <div class="shell-main-content">
      <div class="shell-main-content-message"></div>
      <div class="shell-main-content-body"></div>
    </div>
  </div>
  <div class="shell-foot"></div>
  <div class="shell-modal"></div>
`
const nav_html = `
  <ul>
    <li id="home" class="shell-nav-li"><a href="#home">Home</a></li>
    <li id="news" class="shell-nav-li"><a href="#news">News</a></li>
    <li shell-nav-li><a href="#contact">Contact</a></li>
    <li shell-nav-li><a href="#about">About</a></li>
  </ul>
`
const onClickMenuitem = ( id ) => {
    switch (id) {
      case "home": {

        modHome.initModule( document.querySelector('.shell-main-content') );
        break;
      }
      case "news": {
        //spa.news.initModule( domMap.content );
        break;
      }
      case "nino": {
        //spa.nino.initModule( domMap.content );
        break;
      }
    }
}
// Export module initModule
const initModule = ( container ) => {


  container.innerHTML = main_html
  document.querySelector('.shell-main-nav').innerHTML = nav_html

  const li = document.getElementsByClassName( 'shell-nav-li' )

  for (let _li of li) {
        _li.addEventListener(
          "click", ( event ) => {
          onClickMenuitem( event.currentTarget.id )
          }
      )
  }

}

export { initModule }
