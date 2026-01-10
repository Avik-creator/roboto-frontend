# Jamb. Frontend Tech Test

A luxury furniture and antiques website built with Next.js 15, Sanity CMS, and Tailwind CSS v4.

## 🎨 Design Specifications

### Typography
The design uses **Galaxie Copernicus Medium (550 weight)** throughout:

**Paragraphs:**
- Font: Galaxie Copernicus Medium
- Size: 16px
- Line Height: 25px
- Weight: 550

**Headings:**
- Font: Galaxie Copernicus Medium
- Size: 34px
- Line Height: 48px
- Weight: 550
- Alignment: Center

**Buttons:**
- Font: Galaxie Copernicus Medium
- Size: 16px
- Line Height: 25px
- Weight: 550
- Alignment: Center

### Color Palette
- Icon Border: `#9C9C9D`
- Button Border: `#737373`
- Footer Background: `#E3E3E3`
- Footer Links: `#9C9C9D`
- Text Muted: `#9C9C9D`

## 📁 Project Structure

```
roboto/
├── frontend/              # Next.js frontend application
│   ├── public/
│   │   ├── images/       # Place all images here
│   │   └── fonts/        # Place Galaxie Copernicus font here
│   └── src/
│       ├── app/
│       ├── components/
│       │   ├── blocks/   # Page builder components (kebab-case)
│       │   └── layout/
│       └── sanity/
└── schemaTypes/          # Sanity schema definitions
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Sanity Studio (in root)
cd ..
npm install
```

### 2. Add Galaxie Copernicus Font

Place the **Galaxie Copernicus Medium** font file in:
```
frontend/public/fonts/GalaxieCopernicus-Medium.woff2
```

If you don't have access to this font, you can use a fallback like Cormorant.

### 3. Organize Images

Place all images in `frontend/public/images/`:

```
frontend/public/images/
├── hero.jpg                    # Main hero image
├── fireplaces-feature.jpg      # Fireplaces section
├── lighting-feature.jpg        # Lighting section
├── furniture-hero.jpg          # Full-width furniture section
├── grand-collection.jpg        # Grand collection section
├── products/                   # Product images
│   ├── product-1.jpg
│   ├── product-2.jpg
│   └── ...
└── stories/                    # Story/blog images
    ├── story-1.jpg
    ├── story-2.jpg
    └── ...
```

### 4. Update Image Paths

In `frontend/src/app/page.tsx`, update the demo content to use your local images:

```typescript
{
  _key: 'hero-1',
  _type: 'heroSection',
  imagePath: '/images/hero.jpg',
}
```

### 5. Run Development Servers

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will be available at: http://localhost:3000

**Terminal 2 - Sanity Studio:**
```bash
npm run dev
```
Sanity Studio will be available at: http://localhost:3333

## 📝 Page Builder Components

All components follow kebab-case naming convention and are modular:

1. **hero-section.tsx** - Full-width hero with image
2. **category-navigation.tsx** - Horizontal navigation tabs
3. **feature-section.tsx** - Image + text layout (alternating)
4. **product-grid.tsx** - Grid with mixed aspect ratios support
5. **full-width-feature.tsx** - Full-width image with overlay text
6. **grand-collection.tsx** - Dark background feature section
7. **stories-grid.tsx** - Portrait image grid
8. **newsletter-section.tsx** - Email signup form

## 🎯 Key Features

- ✅ **Pixel-perfect** typography matching Figma specs
- ✅ **Mixed aspect ratios** in product grids (square, portrait, landscape, tall)
- ✅ **Motion.dev animations** for scroll-triggered effects
- ✅ **Next/Image optimization** with Sanity CDN integration
- ✅ **Mobile responsive** across all breakpoints
- ✅ **Sanity page builder** for flexible content management
- ✅ **Modular architecture** following best practices

## 🎨 Customization

### Adding New Page Builder Blocks

1. Create schema in `schemaTypes/blocks/your-block.ts`
2. Create component in `frontend/src/components/blocks/your-block.tsx`
3. Add to page builder array in `schemaTypes/page-builder.ts`
4. Add to switch statement in `frontend/src/components/page-builder.tsx`

### Updating Colors

Edit CSS variables in `frontend/src/app/globals.css`:

```css
:root {
  --icon-border: #9C9C9D;
  --button-border: #737373;
  --footer-bg: #E3E3E3;
  --footer-link: #9C9C9D;
}
```

## 📦 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **CMS:** Sanity v5
- **Styling:** Tailwind CSS v4
- **Animations:** Motion (Framer Motion)
- **Typography:** Galaxie Copernicus
- **Image Optimization:** next/image + Sanity Image URL builder

## 🔧 Configuration

The project uses:
- Sanity Project ID: `bhh135e5`
- Dataset: `production`
- Image sources: Both Sanity CDN and local `/public/images`

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Max width: 1440px (container)

## 🎓 Best Practices Implemented

- Kebab-case file naming convention
- TypeScript for type safety
- Component modularity and reusability
- Semantic HTML structure
- Accessibility considerations (ARIA labels, alt text)
- SEO optimization (metadata, semantic tags)
- Performance optimization (lazy loading, image optimization)
- Clean code architecture following Sanity best practices

## 📄 License

This is a tech test project for demonstration purposes.
