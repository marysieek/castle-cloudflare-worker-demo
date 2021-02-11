addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

function authenticate(_arg) {
  console.log('executed');
}

const routes = [
  {
    pathname: '/',
    method: 'GET',
    handler: authenticate,
  },
  {
    pathname: '/users/sign_in',
    method: 'POST',
    handler: authenticate,
  },
];

/**
 * Return matched action or undefined
 * @param {Request} request
 */
function matchRequestPath(request) {
  const requestUrl = new URL(request.url);
  for (const route of routes) {
    if (
      requestUrl.pathname === route.pathname &&
      request.method === route.method
    ) {
      return route.handler(request);
    }
  }
}

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  if (!CASTLE_CLOUDFLARE_KEY) {
    throw new Error('CASTLE_CLOUDFLARE_KEY secret not provided');
  }

  matchRequestPath(request);

  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  });
}
