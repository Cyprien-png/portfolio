/**
 * The actions per components that runs on listener emit
 * @property {string} componentId - Unique ID of the component instance
 * @property {void} onEmit - Action to run when the listener emits
 */
interface Action {
    componentId: string; 
    onEmit: () => void;
}

/**
 * A custom action that is triggered by the event listener
 * @property {Action[]} actions - The actions per components that runs on listener emit
 */
export class EventObserver {
    public actions: Action[] = [];

    /**
     * Run all the listeners's actions 
     */
    public emit(): void {
        this.actions.forEach((a) => a.onEmit());
    }

    /**
     * Register a new action to run on the emit
     * @param componentId Unique ID of the component instance
     * @param onEmit Action to run when the listener emits
     */
    public addAction(componentId: string, onEmit: () => void): void {
        this.actions.push({ componentId, onEmit });
    }

    /**
     * Remove all the linked to a component instance
     * @param componentId Unique ID of the component instance
     */
    public removeAction(componentId: string): void {
        this.actions = this.actions.filter((a) => a.componentId !== componentId);
    }
}
