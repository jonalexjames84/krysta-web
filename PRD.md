# Product Requirements Document: Pottery Multi-Site Platform

**Version:** 1.0
**Date:** February 4, 2026
**Author:** Jonathan Martin
**Reference Site:** krystamae.com

---

## 1. Executive Summary

### Problem Statement
Managing multiple pottery artist websites through Squarespace is costly, inflexible, and operationally inefficient. Each site requires separate subscriptions, lacks centralized management, and limits customization for the unique needs of ceramic artists.

### Solution
Build a self-hosted multi-tenant platform purpose-built for pottery/ceramic artists that provides:
- Centralized management dashboard for all client sites
- Collection-based e-commerce optimized for handmade goods
- Artist-forward storytelling capabilities
- Custom commission inquiry workflows
- Significant cost reduction vs. per-site SaaS fees

### Success Metrics
- [ ] Migrate first client (Krysta Mae) successfully
- [ ] Reduce per-site hosting cost by 70%+
- [ ] Enable client self-service for content updates
- [ ] Support 6-15 sites on shared infrastructure

---

## 2. User Personas

### Primary: Site Administrator (You)
- Manages all client sites from single dashboard
- Handles deployments, domain configuration, backups
- Provides technical support to clients

### Secondary: Pottery Artist (Client)
- Updates products, collections, and gallery
- Manages orders and customer inquiries
- Edits about page and brand content
- Needs simple, non-technical interface

### Tertiary: End Customer
- Browses and purchases pottery
- Submits custom order inquiries
- Subscribes to artist newsletters

---

## 3. Site Architecture

Based on krystamae.com analysis, each tenant site requires:

### 3.1 Page Structure

| Page | Purpose | Client Editable |
|------|---------|-----------------|
| **Home** | Hero imagery, brand intro, featured collections | Yes |
| **Shop** | Collection listing, links to individual collections | Partial |
| **Shop/[collection]** | Products within a themed collection | Yes |
| **Product/[slug]** | Individual product detail page | Yes |
| **Gallery** | Portfolio/process imagery (non-transactional) | Yes |
| **About** | Artist bio, story, process, lifestyle imagery | Yes |
| **Inquire** | Custom commission contact form | Yes (fields) |
| **Cart** | Shopping cart | No |
| **Checkout** | Payment flow | No |

### 3.2 Navigation Structure

```
Header:
├── Logo (links to home)
├── Shop (dropdown)
│   ├── Collection 1
│   ├── Collection 2
│   └── ... (dynamic)
├── Gallery
├── About
├── Inquire
├── Cart Icon (with count badge)
└── Social Links (Instagram, etc.)

Footer:
├── Newsletter signup
├── Navigation links
├── Social links
└── Copyright
```

---

## 4. Feature Requirements

### 4.1 E-Commerce (P0 - Must Have)

#### Collections
- Artists organize products by themed collections (e.g., "Coastal Summer", "Deep Water Zen")
- Each collection has: name, slug, description, hero image, display order
- Products belong to one or more collections
- Collection pages show grid of products with image, name, price

#### Products
- Fields: name, slug, description (rich text), price, images (multiple), variations
- Variation support: size, color, glaze (configurable per product)
- Stock tracking: in stock, limited quantity, sold out, made-to-order
- SEO fields: meta title, meta description

#### Cart & Checkout
- Persistent cart (localStorage + database sync for logged-in)
- Guest checkout supported
- Shipping calculation (flat rate initially, carrier integration later)
- Payment processing via Stripe
- Order confirmation emails
- Basic order management in admin

#### Inventory
- Simple stock count per variation
- "Sold out" badge display
- Optional: hide sold out items vs. show as unavailable

### 4.2 Gallery (P0 - Must Have)

- Separate from shop (portfolio, not transactional)
- Image grid with lightbox expansion
- Optional categories/albums
- Caption support
- Masonry or uniform grid layout (configurable)

### 4.3 Custom Inquiries (P0 - Must Have)

Inquiry form fields:
- Name (required)
- Email (required)
- Message (required, textarea)
- Target project date (optional, date picker)
- Project budget (optional, text or dropdown ranges)
- Additional details (optional, textarea)
- Newsletter opt-in checkbox

Form submissions:
- Email notification to artist
- Stored in admin dashboard
- Status tracking: new, responded, converted, closed

### 4.4 Content Management (P0 - Must Have)

#### For Artists (Client CMS)
- WYSIWYG editing for About page
- Product creation/editing with image upload
- Collection management
- Gallery image management
- Inquiry response/management
- Basic order viewing

#### For Admin (Your Dashboard)
- Multi-site overview
- Site creation and configuration
- Domain management
- Theme/template selection
- User management per site
- Backup/restore

### 4.5 Design System (P1 - Should Have)

#### Theme Requirements
- Minimalist, typography-forward aesthetic
- Configurable color palette (neutral defaults)
- Configurable fonts (serif/sans-serif pairing)
- Responsive: mobile-first, desktop-optimized
- Transparent header option
- Large hero image support

#### Component Library
- Hero sections (image + text overlay options)
- Product cards (image, title, price)
- Image grids (uniform and masonry)
- Forms (contact, newsletter)
- Navigation (header, footer, mobile menu)
- Typography (headings, body, captions)

### 4.6 Newsletter Integration (P1 - Should Have)

- Email capture form (footer and/or dedicated)
- Integration options: Mailchimp, ConvertKit, Buttondown, or built-in
- Double opt-in support
- Privacy policy compliance

### 4.7 SEO & Analytics (P1 - Should Have)

- Meta tags per page
- Open Graph / social sharing images
- Sitemap generation
- Google Analytics / Plausible integration
- Basic performance optimization (image lazy loading, etc.)

### 4.8 Future Considerations (P2 - Nice to Have)

- Workshop/class booking system
- Wholesale inquiry portal
- Customer accounts and order history
- Wishlist functionality
- Related products suggestions
- Inventory sync with external systems
- Multi-currency support
- Advanced shipping (carrier rates, zones)

---

## 5. Technical Architecture

### 5.1 Recommended Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | Next.js 14+ (App Router) | SSR/SSG, React ecosystem, Vercel deployment |
| **Styling** | Tailwind CSS | Rapid UI development, design system friendly |
| **CMS** | Payload CMS or Sanity | Self-hosted option (Payload) or managed (Sanity) |
| **Database** | PostgreSQL (Supabase) | Relational data, good for e-commerce |
| **Auth** | Supabase Auth or NextAuth | Multi-tenant user management |
| **Payments** | Stripe | Industry standard, good API |
| **Storage** | Supabase Storage or Cloudflare R2 | Image hosting |
| **Hosting** | Vercel or Cloudflare Pages | Edge deployment, easy scaling |
| **Email** | Resend or Postmark | Transactional emails |

### 5.2 Multi-Tenancy Approach

**Option A: Subdomain-based (Recommended)**
- Each client gets: `clientname.yourplatform.com`
- Custom domain mapping supported
- Single codebase, database-per-tenant or shared with tenant_id

**Option B: Separate deployments**
- Each client is independent deployment
- More isolation, more operational overhead
- Better for very different customization needs

### 5.3 Data Model (Core Entities)

```
Tenant
├── id, name, slug, domain, settings, created_at

User
├── id, tenant_id, email, role (admin|artist|viewer), created_at

Collection
├── id, tenant_id, name, slug, description, hero_image, order, created_at

Product
├── id, tenant_id, name, slug, description, price, images[], status, created_at

ProductVariation
├── id, product_id, name (e.g., "Large - Blue"), price_modifier, stock

ProductCollection (join table)
├── product_id, collection_id, order

GalleryImage
├── id, tenant_id, url, caption, category, order, created_at

Inquiry
├── id, tenant_id, name, email, message, target_date, budget, status, created_at

Order
├── id, tenant_id, customer_email, items[], total, status, stripe_id, created_at

Page (for custom content)
├── id, tenant_id, slug, title, content (JSON/blocks), created_at
```

---

## 6. Design Specifications

### 6.1 Visual Style (Based on krystamae.com)

- **Typography:** Elegant serif for headings, clean sans-serif for body
- **Colors:** Neutral palette (whites, warm grays, earth tones), accent color configurable
- **Spacing:** Generous whitespace, breathing room around content
- **Images:** Large, high-quality product/lifestyle photography as focal point
- **Layout:** Asymmetric grids, editorial feel

### 6.2 Key UI Patterns

**Product Card**
```
┌─────────────────────┐
│                     │
│      [Image]        │
│                     │
├─────────────────────┤
│ Product Name        │
│ $XX.00              │
└─────────────────────┘
```

**Collection Header**
```
┌─────────────────────────────────────────┐
│                                         │
│           [Hero Image]                  │
│                                         │
│         Collection Name                 │
│    Short description of the vibe        │
│                                         │
└─────────────────────────────────────────┘
```

**Inquiry Form**
```
┌─────────────────────────────────────────┐
│ Interested in working together?         │
│                                         │
│ Name: [________________]                │
│ Email: [________________]               │
│ Message: [                    ]         │
│          [                    ]         │
│ Target Date: [__/__/____]               │
│ Budget: [________________]              │
│                                         │
│ [ ] Sign up for newsletter              │
│                                         │
│ [      Submit Inquiry      ]            │
└─────────────────────────────────────────┘
```

---

## 7. Implementation Phases

### Phase 1: Foundation (MVP)
- [ ] Project setup (Next.js, Tailwind, Supabase)
- [ ] Database schema and migrations
- [ ] Basic authentication (admin login)
- [ ] Home page template
- [ ] About page with CMS
- [ ] Gallery page with image upload
- [ ] Contact/Inquire form

### Phase 2: E-Commerce Core
- [ ] Product data model and admin CRUD
- [ ] Collection management
- [ ] Product listing pages
- [ ] Product detail pages
- [ ] Shopping cart (client-side)
- [ ] Stripe checkout integration
- [ ] Order confirmation flow

### Phase 3: Polish & Client Handoff
- [ ] Client-facing CMS dashboard
- [ ] Theme customization (colors, fonts)
- [ ] SEO optimization
- [ ] Email notifications (order, inquiry)
- [ ] Newsletter integration
- [ ] Mobile optimization pass
- [ ] Performance optimization

### Phase 4: Multi-Tenancy
- [ ] Tenant creation workflow
- [ ] Domain mapping
- [ ] Admin super-dashboard
- [ ] Tenant isolation verification
- [ ] Backup/restore per tenant

### Phase 5: Migrate Clients
- [ ] Migrate krystamae.com content
- [ ] DNS cutover
- [ ] Client training
- [ ] Iterate based on feedback
- [ ] Migrate additional clients

---

## 8. Open Questions

1. **Hosting budget?** Vercel Pro ($20/mo) vs. self-hosted vs. Cloudflare (cheaper)?
2. **CMS preference?** Self-hosted Payload vs. managed Sanity vs. custom admin?
3. **Domain strategy?** Each client brings own domain, or offer subdomains?
4. **Shipping complexity?** Flat rate sufficient, or need carrier integration?
5. **Existing Squarespace data?** Export available? Product count per site?
6. **Design variations?** One theme with config, or multiple theme templates?

---

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Scope creep | Delays, complexity | Strict MVP focus, phase features |
| Stripe compliance | Payment issues | Follow Stripe guidelines, test thoroughly |
| Image performance | Slow sites | CDN, optimization pipeline, lazy loading |
| Client adoption | Resistance to change | Invest in training, simple UX |
| Multi-tenant bugs | Data leakage | Strong tenant isolation, testing |

---

## 10. Appendix

### A. Reference Screenshots
- krystamae.com homepage
- krystamae.com shop/collection
- krystamae.com product detail
- krystamae.com about
- krystamae.com inquire

### B. Competitor Analysis
- Squarespace: $16-49/site/month, limited customization
- Shopify: $29-299/site/month, overkill for small pottery
- Big Cartel: $0-19/site/month, limited features
- Custom: Higher upfront, lower ongoing, full control

### C. Asset Inventory
- Photos directory contains product/lifestyle imagery (100+ JPGs, 30+ MP4s)
- Existing krystamae.com content to migrate
