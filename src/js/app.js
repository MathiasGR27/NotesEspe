let MAIN;
let MODAL_POST;
let BTN_SHOW_POST;
let BTN_CANCEL_POST;

//Funciones
const ShowModalPost = () => {
    MAIN.style.display = "none"; //Ocultar el contenido principal
    MODAL_POST.style.display = "block"; //Mostrar el modal de post

    setTimeout(() => {
        MODAL_POST.style.transform = "translateY(0)"; //Animación de entrada del modal
    },1);
};

const ClosePostModal = () => {
    MAIN.style.display = "block"; //Mostrar el contenido principal
    MODAL_POST.style.transform = "translateY(100vh)"; //Animación de entrada del modal

}

//Cuando se carge el DOM
window.addEventListener("load", () => {
    MAIN = document.querySelector("#main");
    MODAL_POST = document.querySelector("#modal-post-section");

    BTN_SHOW_POST = document.querySelector("#btn-upload-post");
    BTN_SHOW_POST.addEventListener("click", ShowModalPost); //Evento para mostrar el modal de post

    BTN_CANCEL_POST = document.querySelector("#btn-post-cancel");
    BTN_CANCEL_POST.addEventListener("click", ClosePostModal); //Evento para cerrar el modal de post

});