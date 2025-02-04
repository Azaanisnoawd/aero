ctx.csp = ctx.cors['Content-Security-Policy'];

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {
        // The Service-Worker-Allowed must be set to '/'
        scope: ctx.http.prefix,
        // Don't cache http requests.
        updateViaCache: 'none'
    }).then(registration => {
        // Update service worker
        registration.update();
    });
    // When service worker is ready
    navigator.serviceWorker.ready.then(registration => {
        const channel = new MessageChannel();
        registration.active.postMessage(ctx, [channel.port2]);

        // Reload page
        location.reload();
    })
} else {
    const firefox = false;
    
    // Service workers can't be created if on private browsing mode on firefox   
    if (firefox) {
        document.write('❌ Please leave private browsing mode.');
    } else {
        document.write('❌ Service workers are not supported!');
    }
}
