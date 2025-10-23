import { CustomDomElement } from "./CustomDomElement";

export class DomDI {
    static instance: DomDI;
    private domElements: CustomDomElement[] = [];

    public static getInstance(): DomDI {
        if (!DomDI.instance) {
            DomDI.instance = new DomDI();
        }

        return DomDI.instance;
    }

    public addEventListener(el: HTMLElement, event: string, componentId: string, componentAction: () => void) {
        this.registerDomeElement(el);
        this.domElements.find(e => e.element == el).addListener(event, componentId, componentAction);
    }

    public registerDomeElement(el: HTMLElement) {
        if (this.domElements.some(e => e.element == el)) return;
        this.domElements.push(new CustomDomElement(el));
    }
}