addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(_request) {
  if (!CLOUDFLARE_KEY) {
    throw new Error('CLOUDFLARE_KEY secret not provided')
  }

  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}
