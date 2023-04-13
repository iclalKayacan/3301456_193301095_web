'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "fe9373da0d961793ba08f1f19054accd",
"assets/assets/images/akrep.png": "b5f69a594bc30c1fb65038730ef324e8",
"assets/assets/images/aslan.png": "49cf7899e79c8026385daab418cbc770",
"assets/assets/images/Ay.png": "44d7b65475548f70206eab701ff54970",
"assets/assets/images/balik.png": "503e2b9f2c678c4b68d167241adbde4a",
"assets/assets/images/basak.png": "17374da100f688beb69246d77a2083f3",
"assets/assets/images/boga.png": "e9d6a4f51e406b85bc031f25a444a73c",
"assets/assets/images/Gunes.png": "2b34e49c3a8d15006b575dd5608865c2",
"assets/assets/images/ikizler.png": "f2f9646ff3327c13fdc7c3593fd0ceb7",
"assets/assets/images/Jupiter.png": "950ecd1384f71821637fbeca9462a7b3",
"assets/assets/images/koc.png": "f25f10ab7fb6c41a4c3b48b16035a5ea",
"assets/assets/images/kova.png": "f2abd833e0ab0c61d0bc1e91a82e8419",
"assets/assets/images/logo.png": "111273ec856500a643edf858ee2a724d",
"assets/assets/images/Mars.png": "5a9e3f8c4e30c7d7c655500c73a6464e",
"assets/assets/images/Merkur.png": "d6fc83963506342c982f49d598ec03d2",
"assets/assets/images/oglak.png": "5aefa53fd9b1e6f2755deeae0ec6932f",
"assets/assets/images/Saturn.png": "9ce9e74846abeac30fd7a30ab6c49c81",
"assets/assets/images/sembol_akrep.png": "6cc68bcd3adde2da4403864806711af6",
"assets/assets/images/sembol_aslan.png": "79397cc54faec6bc36b85fd25bf9c955",
"assets/assets/images/sembol_balik.png": "c9a9002b3e2cfbb747953d6bc92a0770",
"assets/assets/images/sembol_basak.png": "fbed7853e581796d039a53aad19158ac",
"assets/assets/images/sembol_boga.png": "881b3e652dd4a1a2c05e1c6ab9efec16",
"assets/assets/images/sembol_ikizler.png": "0fae9bb7fd7dfb400b17cbeed6cae1d6",
"assets/assets/images/sembol_koc-1.png": "29eb0812c4b4cfc262acd06ee03097ae",
"assets/assets/images/sembol_kova.png": "277aac0ff97027e67348bbc528c465b8",
"assets/assets/images/sembol_oglak.png": "832314dcb0e2dae8ab2d0f030ff8b3c0",
"assets/assets/images/sembol_terazi.png": "330687ce5163dba5b8ade1e6adcd0d77",
"assets/assets/images/sembol_yay.png": "fd3eedbe9dd693ca200b6151639c0ccd",
"assets/assets/images/sembol_yengec.png": "9e4cd2c0df091501a30f1165e7d706fa",
"assets/assets/images/terazi.png": "78888abe22e548ccd2e162b6cd91f379",
"assets/assets/images/Venus.png": "055925f13db3d213438c48bf59369e96",
"assets/assets/images/yay.png": "18799ab2292c88d5ed69cdd33d8b9190",
"assets/assets/images/yengec.png": "697be2c3664dc779e250c889c1d1474e",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "6dd3fc22cb85a998b11b2aed3995056b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "cd3c536c3634d18516d0d80ca401d885",
"/": "cd3c536c3634d18516d0d80ca401d885",
"main.dart.js": "f489eec59011d16ceba7ce98ec448104",
"manifest.json": "6afe486f66e53309456bc5e377a4e873",
"version.json": "85eb0cfc65430bc84cfa24f151c6836f"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
