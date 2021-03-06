var fetch = require('universal-fetch');

export function http({uri, options = {}, isExternal = false}) {
  const url = typeof window === 'object' ? 'http://localhost:3030' : 'http://api:3030';
  const opts: any = options;
  opts.credentials = 'same-origin';
  return fetch(`${url}${uri}`, options).then(rsp => rsp.json());
}
