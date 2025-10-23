import { DomElement } from "./DomElement";

/**
 * Class DI class that stores all the listened Dom elements
 * @property {DomDI} instance - The "self" instance of the DI service
 * @property {DomElement[]} domElements - List of the Dom elements
 */
export class DomDI {
    static instance: DomDI;
    private domElements: DomElement[] = [];

    /**
     * Get or instanciate the DomDI
     * @returns the single DomElement instance
     */
    public static getInstance(): DomDI {
        if (!DomDI.instance) DomDI.instance = new DomDI();
        return DomDI.instance;
    }

    /**
     * Create or attach an action to an event listener
     * @param el Dom element to listen
     * @param event Event type to listen
     * @param componentId Unique ID of the component instance
     * @param componentAction Action to trigger when listener emit
     */
    public addEventListener(el: HTMLElement, event: string, componentId: string, componentAction: () => void): void {
        this.registerDomElement(el);
        this.domElements.find(e => e.element == el).addListener(event, componentId, componentAction);
    }

    /**
     * Remove all the listeners linked to a component instance
     * @param componentId Unique ID of the component instance
     */
    public removeEventListeners(componentId: string): void {
        this.domElements.forEach(el => {
            el.removeListenersByComponentId(componentId)
        })
    }

    /**
     * Register a Dom element to listen
     * @param el Dom element to listen
     */
    private registerDomElement(el: HTMLElement): void {
        if (this.domElements.some(e => e.element == el)) return;
        this.domElements.push(new DomElement(el));
    }
}
