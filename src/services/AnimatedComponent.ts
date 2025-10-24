import { DomDI } from "@/services/DomDI";

/**
 * A vue component adapter used to delegate the animations management to optimized services
 * @property {symbol} id - Unique ID of the component instance
 * @property {boolean} areAnimationsEnabled - Status of animation capability
 * @property {HTMLElement} domSection - The section / container that must be visible to enable the animation
 * @property {void} enableAnimations - The trigger to enable animations
 * @property {void} disableAnimations - The trigger to disable animations
 * @property {void} prepareForAnimations - The computation of animation data
 * @property {void} tick - The animation "apply" method
 */
export class AnimatedComponent {
    public id: symbol;
    public areAnimationsEnabled: boolean;
    public domSection: HTMLElement;
    public enableAnimations: () => void;
    public disableAnimations: () => void;
    public prepareForAnimations: () => void;
    public tick: () => void;

    constructor(domSection: HTMLElement, enableAnimations: () => void, disableAnimations: () => void, prepareForAnimations: () => void, tick: () => void) {
        this.id = Symbol()
        this.domSection = domSection;
        this.enableAnimations = enableAnimations;
        this.disableAnimations = disableAnimations;
        this.prepareForAnimations = prepareForAnimations;
        this.tick = tick;
    }

    /**
     * Compute and run the animation
     */
    public animate(): void {
        // Ensure that the animation is visible
        if (!this.isVisibleOnScreen()) {
            if (this.areAnimationsEnabled) this.toggleAnimationStatus();
            return;
        }

        // Compute all the data for the animation tick
        if (!this.areAnimationsEnabled) this.toggleAnimationStatus();
        this.prepareForAnimations();

        // Delegate the animation sync to the browser
        requestAnimationFrame(this.tick);
    }

    /**
     * Add a cutom event listener on a component that will be used to trigger this animation
     * @param el The Dom element that is listened
     * @param event Event type to listen 
     * @param callback Action to trigger when listener emit
     */
    public addAnimationTrigger(el: HTMLElement, event: string): void {
        DomDI.getInstance().addEventListener(el, event, this.id, this.animate.bind(this));
    }

    /**
     * Check if the animation is on a visible section
     * @returns True if the animation is visible
     */
    private isVisibleOnScreen(): boolean {
        const isAboveScreen = this.domSection.getBoundingClientRect().bottom < 0;
        const isBelowScreen = this.domSection.getBoundingClientRect().top - window.innerHeight > 0
        return !isAboveScreen && !isBelowScreen
    }

    /**
     * Enable / Disable the animations based on current status
     */
    private toggleAnimationStatus(): void {
        this.areAnimationsEnabled ? this.disableAnimations() : this.enableAnimations();
        this.areAnimationsEnabled = !this.areAnimationsEnabled;
    }
}
