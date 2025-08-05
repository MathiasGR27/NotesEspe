let MAIN;
let MODAL_POST;
let BTN_SHOW_POST;
let BTN_CANCEL_POST;
let deferredPrompt;

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

window.addEventListener("beforeinstallprompt", (e) => {
    console.log("Evento por defecto anulado")
    e.preventDefault(); //Prevenir el comportamiento por defecto del navegador
    deferredPrompt = e; //Guardar el evento para usarlo después
});

//Cuando se carge el DOM
window.addEventListener("load", async () => {
    MAIN = document.querySelector("#main");
    MODAL_POST = document.querySelector("#modal-post-section");

    BTN_SHOW_POST = document.querySelector("#btn-upload-post");
    BTN_SHOW_POST.addEventListener("click", ShowModalPost); //Evento para mostrar el modal de post

    BTN_CANCEL_POST = document.querySelector("#btn-post-cancel");
    BTN_CANCEL_POST.addEventListener("click", ClosePostModal); //Evento para cerrar el modal de post

    if(navigator.serviceWorker){
        const res = await navigator.serviceWorker.register("/sw.js");
        if(res){
            console.log("Service Worker registered successfully.");
        }
    }
    const bannerInstall = document.querySelector("#banner-install");
    bannerInstall.addEventListener("click", async () => {
        if(deferredPrompt){
            deferredPrompt.prompt(); //Mostrar el banner de instalación
            const response = await deferredPrompt.userChoice; //Esperar la respuesta del usuario
            if(response.outcome === "accepted"){
                console.log("Usuario aceptó la instalación de la PWA");
            }
        }
    });
});


