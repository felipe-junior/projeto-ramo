menu = () =>{
    let menu = document.getElementById("menu")
    let menuButton = document.getElementById("menu-button")
    
    menu.classList.toggle("menu-active")
    menuButton.classList.toggle("menu-button-active")
    
    let tinyMce_answer = document.getElementById("answer-text")
    tinyMce_answer.classList.toggle("tinymce-menu-open")
}