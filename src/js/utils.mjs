// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => reject(false);
        img.src = url;
    });
}

export function renderListWithTemplate(
    templateFn,
    parentElement,
    list,
    clear = false,
) {
    const htmlElements = list.map(templateFn);
    if (clear) {
        parentElement.innerHTML = "";
    }
    parentElement.append(...htmlElements);
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
    qs(selector).addEventListener("touchend", (event) => {
        event.preventDefault();
        callback();
    });
    qs(selector).addEventListener("click", callback);
}

export function getParams(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    return urlParams.get(param);
}
