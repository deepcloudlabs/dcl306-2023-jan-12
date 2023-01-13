export default function loadStateFromLocalStorage(key, initial) {
    let state = localStorage.getItem(key);
    if (state)
        state = JSON.parse(state);
    else
        state = initial;
    return state;
}