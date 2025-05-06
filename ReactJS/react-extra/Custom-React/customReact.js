function customRender(reactEle, container) {
    const customEle = document.createElement(reactEle.type);
    customEle.innerHTML = reactEle.children;
    for (const key in reactEle.props) {
        customEle.setAttribute(key,reactEle.props[key]);
    }
    container.appendChild(customEle);
}

const reactElement = {
    type: "a",
    props: {
        href: "https://google.com",
        target: "_blank"
    },
    children: "Visit Google"
}

const mainContainer = document.querySelector("#root");

customRender(reactElement, mainContainer);