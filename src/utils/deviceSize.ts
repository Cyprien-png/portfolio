const screen = document.getElementById("app")

export const sm = () => {
    return screen.offsetWidth > 640;
}

export const md = () => {
    return screen.offsetWidth > 768;
}

export const lg = () => {
    return screen.offsetWidth > 1024;
}

export const xl = () => {
    return screen.offsetWidth > 1280;
}
