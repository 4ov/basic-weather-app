self.addEventListener('install', function(event) {
    caches.open('v1').then(function(cache) {
        cache.addAll([
            '/',
        ])
    })
})

self.addEventListener('activate', function(event) {
    console.log(event);
    console.log('activated!!');
})


self.addEventListener('fetch', function(event) {
    
    if(event.request.url == "/xd"){
        const r = new Response("*{background:red}",{
            headers : {
                'Content-Type' : 'text/css'
            }
        });
        event.respondWith(r);
        console.log('hello');
    }


    // event.preventDefault()
    const fromFont = event.request.url.match(/fonts\.gstatic/)
    if (fromFont) {
        event.respondWith(
            fetch(event.request).then(function(response) {
                const responseClone = response.clone()
                caches.open('v1').then(function(cache) {
                    cache.put(event.request, responseClone)
                })
                return response
            })
        )
    }else{
        event.respondWith(
            fetch(event.request)
        )
    }
   
})

