import { CustomEventListener } from "@/services/CustomEventListener";

/**
 * Class that represent a Dom element to which is listened (watched/observed)
 * @property {HTMLElement} element - The Dom element that is listened
 * @property {[key: string]: CustomEventListener} listeners - List of listeners attached to the Dom element
 */
export class CustomDomElement {
    public element: HTMLElement;
    private listeners: { [key: string]: CustomEventListener } = {};

    constructor(el: HTMLElement) {
        this.element = el;
    }

    /**
     * Attach a component action to an event listener
     * @param event Event type to listen
     * @param componentId Unique ID of the component instance
     * @param componentAction Action to trigger when listener emit
     */
    public addListener(event: string, componentId: string, componentAction: () => void): void {
        if (!this.listeners[event]) this.createCustomEventListener(event);
        this.listeners[event].addAction(componentId, componentAction);
    }

    /**
     * Remove all the listeners linked to a component
     * @param componentId Unique ID of the component instance
     */
    public removeListenersByComponentId(componentId: string): void {
        Object.entries(this.listeners).forEach(([event, listener]) => {
            listener.removeAction(componentId);
            if (listener.actions.length === 0) this.removeCustomEventListener(event, listener);
        });
    }

    /**
     * Add an event listener with custom listener emi
     * @param event Event type to listen
     */
    private createCustomEventListener(event: string): void {
        const listener = new CustomEventListener;
        this.element.addEventListener(event, listener.emit.bind(listener), { passive: true });
        this.listeners[event] = listener;
    }

    /**
     * Remove the event listener and custom listener
     * @param event Event type to listen
     * @param listener The CustomEventListener that is triggered by the native listener 
     */
    private removeCustomEventListener(event: string, listener: CustomEventListener): void {
        this.element.removeEventListener(event, listener.emit.bind(listener));
        delete this.listeners[event];
    }
}
