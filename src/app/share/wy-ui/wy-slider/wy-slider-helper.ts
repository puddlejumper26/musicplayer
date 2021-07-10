export function sliderEvent(e: Event) {
    e.stopPropagation();
    e.preventDefault();
}

/**
 * To obtain dom's value for top and left 
 * @getClientRects to obtain an array composed by the result from el.@getBoundingClientRect   
 */
export function getElementOffset(el: HTMLElement): {top: number, left: number} {
    
    if(!el.getClientRects().length) {
        return {
            top: 0,
            left: 0
        }
    }
    
    const rect = el.getBoundingClientRect();
    /**
     *  @ownerDocument to take the el current document node
     */
    const win = el.ownerDocument.defaultView;

    return {
        // top: rect.top + window.pageYOffset,
        // left: rect.left + window.pageXOffset
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
    }
}