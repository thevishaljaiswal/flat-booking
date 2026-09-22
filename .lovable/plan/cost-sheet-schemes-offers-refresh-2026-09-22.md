# Cost Sheet Schemes & Offers Refresh

## Changes
- Place payment schemes, booking offers, and vouchers directly within the Cost Sheet tab so pricing choices and calculations stay together.
- Keep Payment Schedule as the second tab and remove the separate Schemes & Offers tab.
- Give scheme, offer, and voucher cards distinct semantic color treatments with clear selected states.
- Show each percentage discount together with its calculated rupee savings; keep fixed voucher values visible.
- Ensure selecting an option still updates the total and payment schedule immediately.

## Technical details
- Calculate card savings from the current carpet area and editable base rate.
- Add reusable semantic benefit color tokens for light and dark themes.
- Use existing design-system buttons and maintain responsive compact grids.
- Verify the cost sheet renders and selections update values without console errors.
