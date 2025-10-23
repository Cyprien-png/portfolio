export class CustomEventListener {
    public actions: { componentId: string; onEmit: () => void }[] = [];

    public emit(): void {
        this.actions.forEach((a) => a.onEmit());
    }

    public addAction(componentId: string, onEmit: () => void): void {
        this.actions.push({ componentId, onEmit });
    }

    public removeAction(componentId: string): void {
        this.actions = this.actions.filter((a) => a.componentId !== componentId);
    }
}
