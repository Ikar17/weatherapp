
const getDOMElem = (id) => {
    return document.getElementById(id);
}

export const connectHTMLElems = (list) => {
    let elems = {};

    for(let id of list){
        elems[id] = getDOMElem(id);
    }
    
    return elems;
}