import React from 'react';
/**
 * Cleanup: References to obsolete types removed to prevent build errors.
 * Original demo content replaced with a simple placeholder.
 */
export const HAS_TEMPLATE_DEMO = false;
export function TemplateDemo() {
  return (
    <div className="p-8 border-2 border-dashed rounded-xl text-center text-muted-foreground">
      <p>HYO Arbitragem Prototype System</p>
      <p className="text-xs mt-2">Core data structures are now managed via @shared/types.ts</p>
    </div>
  );
}