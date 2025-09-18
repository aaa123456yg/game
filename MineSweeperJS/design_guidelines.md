# Minesweeper Game Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from classic Windows Minesweeper and modern puzzle games like Wordle for clean, focused gameplay interfaces.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Background: 220 15% 8% (dark charcoal)
- Surface: 220 20% 12% (elevated dark surface)
- Grid borders: 220 25% 25% (medium gray)

**Game State Colors:**
- Unrevealed cells: 220 20% 18% (dark gray)
- Revealed cells: 220 15% 95% (light background)
- Mine cells: 0 75% 40% (deep red)
- Flag indicator: 45 85% 55% (bright orange)
- Numbers: Use distinct hues (blue, green, red, purple) with 60% saturation, 45% lightness

### Typography
- **Primary Font**: Inter via Google Fonts
- **Game Numbers**: Roboto Mono for consistent digit spacing
- **Sizes**: Text-sm for UI, text-lg for game numbers, text-xl for status

### Layout System
**Spacing**: Use Tailwind units of 2, 4, 8, and 16 for consistent rhythm
- Cell padding: p-2
- Component margins: m-4 
- Section spacing: gap-8
- Container padding: p-16

### Component Library

**Game Grid:**
- Square cells with subtle borders
- Hover states with gentle background lightening
- Clear visual distinction between revealed/unrevealed states
- Right-click flag indicators with orange accent

**Control Panel:**
- Mine counter display
- Timer (optional)
- Reset button with subtle styling
- Difficulty selector (Beginner/Intermediate/Expert)

**Game Status:**
- Victory/defeat messaging
- Clean, centered status display
- Subtle celebration animations for wins

**Layout:**
- Centered game board
- Control panel above grid
- Minimal, distraction-free interface
- Responsive design scaling for mobile devices

### Visual Treatments
- **Gradients**: Subtle radial gradient on game background (220 20% 10% to 220 15% 8%)
- **Shadows**: Soft drop shadows on elevated elements
- **Borders**: Clean 1px borders, rounded corners (rounded-md)

### Animations
Use sparingly:
- Gentle cell reveal animation (scale/fade)
- Flag placement bounce
- Victory state celebration (subtle confetti or glow)

This design creates a modern, clean interpretation of classic Minesweeper that's both nostalgic and contemporary, focusing on clear gameplay visibility and intuitive interactions.