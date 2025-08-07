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
    }, 1);
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

   await Notification.requestPermission(); //Solicitar permiso para notificaciones
   if (navigator.serviceWorker) {
    const basePath = location.hostname === "localhost" ? "" : "/NotesEspe";
    try {
      const res = await navigator.serviceWorker.register(`${basePath}/sw.js`);
      if (res) {
        const ready = await navigator.serviceWorker.ready;
        ready.showNotification("EspeNotes", {
          body: "La aplicación se ha instalado correctamente",
          icon: `/src/images/icons/icon-256X256.png`,
          vibrate: [100, 50, 200],
        });
      }
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }

    const bannerInstall = document.querySelector("#banner-install");
    bannerInstall.addEventListener("click", async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); //Mostrar el banner de instalación
            const response = await deferredPrompt.userChoice; //Esperar la respuesta del usuario
            if (response.outcome === "accepted") {
                console.log("Usuario aceptó la instalación de la PWA");
            }
        }
    });
});


