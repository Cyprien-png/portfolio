import { CustomEventListener } from "@/services/CustomEventListener";

export class CustomDomElement {
    public element: HTMLElement;
    private listeners: { [key: string]: CustomEventListener } = {};

    constructor(el: HTMLElement) {
        this.element = el;
    }

    /**
     * Attach a component action to an event listener
     */
    public addListener(event: string, componentId: string, componentAction: () => void): void {
        if (!this.listeners[event]) {
            this.createCustomEventListener(event);
        }

        this.listeners[event].addAction(componentId, componentAction);
    }

    /**
     * Add an event listener with custom listener emit
     */
    private createCustomEventListener(event: string): void {
        const listener = new CustomEventListener
        this.element.addEventListener(event, listener.emit.bind(listener), { passive: true })
        this.listeners[event] = listener;
    }
}
