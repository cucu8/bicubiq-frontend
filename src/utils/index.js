export const cloneObject = (object) => JSON.parse(JSON.stringify(object))

export const stopPropagation = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
}