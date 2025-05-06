export const loadState = () => {
    if(localStorage.getItem("myTodoApp"))
    return JSON.parse(localStorage.getItem("myTodoApp"));

    return undefined;
}

export const saveState = (state) => {
    localStorage.setItem("myTodoApp", JSON.stringify(state));
}