
export function minHeight() {
    const headerH = document.getElementsByTagName("header")[0].offsetHeight;
    const footerH = document.getElementsByTagName("footer")[0].offsetHeight;
    const takenH = headerH + footerH;

    if (document.getElementsByTagName("main")[0]) {
        document.getElementsByTagName("main")[0].style.minHeight = `calc(100vh - ${takenH}px)`;
    }
}