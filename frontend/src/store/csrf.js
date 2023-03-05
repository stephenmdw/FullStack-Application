// fetch session show to get current user and csrf token
export const restoreSession = async () => {
    let res = await fetch('/api/session');
    let token = res.headers.get('X-CSRF-Token');
    sessionStorage.setItem('X-CSRF-Token', token);
    let data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user))
}

// This will replace any fetch that needs a csrf token
export const csrfFetch = async (url, options = {}) => {
    options.method ||= "GET";
    options.headers ||= {};

    if (options.method.toUpperCase() !== 'GET') {
        // options.headers['Content-Type'] =
        //     options.headers['Content-Type'] = 'application/json'
        // options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token')
        if (!options.headers["Content-Type"] && !(options.body instanceof FormData)) {
            options.headers["Content-Type"] = "application/json";
          }
          options.headers["X-CSRF-Token"] = sessionStorage.getItem("X-CSRF-Token");
    }
    const res = await fetch(url, options)

    if (res.status >= 400) throw res;

    return res;
}

export function storeCSRFToken(response) {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

export async function restoreCSRF() {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    return response;
}


export default csrfFetch