menu = () =>{
    let menu = document.getElementById("menu")
    let menuButton = document.getElementById("menu-button")
    
    menu.classList.toggle("menu-active")
    menuButton.classList.toggle("menu-button-active")
    
    let tinyMce_ask = document.getElementById("description")
    tinyMce_ask.classList.toggle("tinymce-menu-open")
}