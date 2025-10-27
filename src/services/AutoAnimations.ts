import { AnimatedComponent } from "@/services/AnimatedComponent"

export class AutoAnimations {
    static instance: AutoAnimations;
    private animations: Map<symbol, () => void> = new Map<symbol, () => void>();

    public static getInstance(): AutoAnimations {
        if (!AutoAnimations.instance) AutoAnimations.instance = new AutoAnimations();
        return AutoAnimations.instance;
    }

    constructor() {
        requestAnimationFrame(this.animate);
    }

    public addAnimation(componentId: symbol, callback: () => void): void {
        this.animations.set(componentId, callback);
    }

    public removeAnimation(componentId: symbol): void {
        this.animations.delete(componentId);
    }

    private animate = () => {
        this.animations.forEach(a => {
            a();
        })

        requestAnimationFrame(this.animate);
    }
}