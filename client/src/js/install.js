const butInstall = document.getElementById('buttonInstall');
let deferredPrompt; // Declare the deferredPrompt variable here

// Event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior to avoid the browser's native install prompt
  event.preventDefault();
  // Store the event for later use
  deferredPrompt = event;
  // Show the custom install button
  butInstall.style.display = 'block';

  // Check if the PWA is already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    // The PWA is already installed
    console.log('The app is already installed.');
    butInstall.style.display = 'none'; // Hide the install button
  } else {
    // The PWA is not installed; you can proceed with the installation prompt
    console.log('The app is not installed. Displaying install button.');
  }
});


// click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Check if the deferredPrompt is available
  if (deferredPrompt) {
    // Show the browser's native install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    // Check the user's choice
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt.');
    } else {
      console.log('User dismissed the install prompt.');
    }
    // Reset the deferredPrompt variable to null, as it can only be used once
    deferredPrompt = null;
    // Hide the custom install button
    butInstall.style.display = 'none';
  }
});

// handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed!');
  // Add any additional logic you want to perform after the app is installed
});
