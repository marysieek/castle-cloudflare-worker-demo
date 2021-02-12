const CASTLE_AUTHENTICATE_API_URL = `https://api.castle.io/v1/authenticate`;
const CASTLE_AUTH_HEADERS = {
  Authorization: `Basic ${btoa(`:${CASTLE_API_SECRET}`)}`,
  'Content-Type': 'application/json',
};

/**
 * Return the castle_token fetched from form data
 * @param {Request} request
 */
async function getCastleTokenFromRequest(request) {
  const formData = await request.formData();
  if (formData) {
    return formData.get('castle_token');
  }
}

/**
 * Return the result of the POST /authenticate call to Castle API
 * @param {Request} request
 */
async function authenticate(event, request) {
  const clientId = await getCastleTokenFromRequest(request);

  const requestBody = JSON.stringify({
    event,
    context: {
      client_id: clientId,
      ip: request.headers.get('CF-Connecting-IP'),
      user_agent: request.headers.get('User-Agent'),
    },
  });

  const requestOptions = {
    method: 'POST',
    headers: CASTLE_AUTH_HEADERS,
    body: requestBody,
  };
  let response;
  try {
    response = await fetch(CASTLE_AUTHENTICATE_API_URL, requestOptions);
  } catch (err) {
    console.log(err);
  }
  return response;
}

const routes = [
  {
    event: '$registration',
    handler: authenticate,
    method: 'POST',
    pathname: '/users/sign_up',
  },
];

/**
 * Return matched action or undefined
 * @param {Request} request
 */
async function processRequest(request) {
  const requestUrl = new URL(request.url);
  for (const route of routes) {
    if (
      requestUrl.pathname === route.pathname &&
      request.method === route.method
    ) {
      return route.handler(route.event, request);
    }
  }
}

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  if (!CASTLE_API_SECRET) {
    throw new Error('CASTLE_API_SECRET secret not provided');
  }

  const result = await processRequest(request);

  if (result && result.risk > 0.9) {
    return new Response('Blocked!', { status: 403 });
  }

  return fetch(request);
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});
