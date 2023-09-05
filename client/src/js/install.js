const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.display = 'block';

  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('The app is already installed.');
    butInstall.style.display = 'none'; // Hide the install button
  } else {
    console.log('The app is not installed. Displaying install button.');
  }
});


butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt.');
    } else {
      console.log('User dismissed the install prompt.');
    }
    deferredPrompt = null;

    butInstall.style.display = 'none';
  }
});


window.addEventListener('appinstalled', (event) => {
  console.log('App installed!');

});
