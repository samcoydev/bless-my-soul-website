import { trigger, transition, animate, style, query } from '@angular/animations';

export const fader =
    trigger('fade', [ 
        transition('void => *', [
            style({ opacity: 0 }), 
            animate(400, style({ opacity: 1 }))
        ]) 
    ])

export const zoom = 
    trigger('zoom', [ 
        transition('void => *', [
            style({ transform: 'scale(0.99)' }), 
            animate(100, style({ transform: 'scale(1)' }))
        ]) 
    ])

export const slideDown =
    trigger('slideDown', [ 
        transition('void => *', [
            style({ transform: 'translateY(-5%)' }), 
            animate(400, style({ transform: 'translateY(0%)'}))
        ]) 
    ])