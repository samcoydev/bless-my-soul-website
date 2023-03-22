import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { CUSTOM_BREAKPOINTS } from '@constants/breakpoints'

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private currentBreakpoint$: Observable<string>;
  private isLargeScreenOrAbove$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.currentBreakpoint$ = this.breakpointObserver.observe([
      CUSTOM_BREAKPOINTS.xs,
      CUSTOM_BREAKPOINTS.sm,
      CUSTOM_BREAKPOINTS.md,
      CUSTOM_BREAKPOINTS.lg,
      CUSTOM_BREAKPOINTS.xl,
    ]).pipe(
      map((state: BreakpointState) => {
        if (state.breakpoints[CUSTOM_BREAKPOINTS.xs]) {
          return 'xs';
        } else if (state.breakpoints[CUSTOM_BREAKPOINTS.sm]) {
          return 'sm';
        } else if (state.breakpoints[CUSTOM_BREAKPOINTS.md]) {
          return 'md';
        } else if (state.breakpoints[CUSTOM_BREAKPOINTS.lg]) {
          return 'lg';
        } else {
          return 'xl';
        }
      })
    );
    
    this.isLargeScreenOrAbove$ = this.breakpointObserver.observe([CUSTOM_BREAKPOINTS.lg, CUSTOM_BREAKPOINTS.xl])
      .pipe(
        map(result => result.matches)
      );
  }

  getIsLargerScreen(): Observable<boolean> {
    return this.isLargeScreenOrAbove$;
  }

  getCurrentBreakpoint(): Observable<string> {
    return this.currentBreakpoint$;
  }
}