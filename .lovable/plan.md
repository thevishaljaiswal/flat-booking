# Refresh the floor and unit layout

## What will change
- Rename compact floor labels from “F1”, “F2”, etc. to “Floor 1”, “Floor 2”, and so on.
- Resize the floor label and unit tiles into a balanced, scan-friendly four-column row.
- Give each unit a stronger information hierarchy for unit number, status, type, carpet area, value, interest count, and hold timer or EOI action.
- Preserve the existing status behavior, filters, navigation, EOI flow, and compact overall page.

## Technical details
- Update `FloorUnits` for the longer floor label and responsive grid sizing.
- Update `UnitCard` with semantic status styling and a clearer two-level layout.
- Add status color tokens to the existing design system rather than hardcoding colors in the components.
- Check desktop and mobile rendering in the live preview after implementation.
