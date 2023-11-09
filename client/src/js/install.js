const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    // store the event
    window.deferredPrompt = event;

    // show btn they can install
    butInstall.style.display = "block";
});


// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // check if install prompt is available
    if(!window.deferredPrompt){
        return;
    }

    // showing prompt
    window.deferredPrompt.prompt();

    // reset the deferredprompt variable
    window.deferredPrompt = null;

    // hide the install Btn
    butInstall.style.display = "none"
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // reset variable after installation
    window.deferredPrompt = null
});
