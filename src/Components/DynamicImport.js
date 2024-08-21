
import { lazy } from 'react';

export function loadComponent(componentName) {
  
  return lazy(() =>
    import(`../AdminComponents/OptionComponents/${componentName}`).catch(() => {
      console.error(`Component ${componentName} not found`);
      return { default: () => null };
    })
  );
}
