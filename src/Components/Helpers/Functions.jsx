
export function minHeight() {
    const headerH = document.getElementsByTagName("header")[0].offsetHeight;
    const footerH = document.getElementsByTagName("footer")[0].offsetHeight;
    const takenH = headerH + footerH;

    if (document.getElementById("appContent")) {
        document.getElementById("appContent").style.minHeight = `calc(100vh - ${takenH}px)`;
    }
}