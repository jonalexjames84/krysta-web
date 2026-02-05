# Product Requirements Document: Pottery Multi-Site Platform

**Version:** 1.1
**Date:** February 4, 2026
**Author:** Jonathan Martin
**Reference Site:** krystamae.com

---

## Implementation Status Summary

| Component | Status | Notes |
|-----------|--------|-------|
| Next.js + Tailwind setup | Done | v16.1.6 + v4 |
| Database schema | Done | Supabase types defined |
| Home page | Done | Hero, Featured, ArtistIntro |
| Shop pages | Done | Grid, filters, collection pages |
| Product pages | Done | Detail view with images |
| Cart | Done | Context + localStorage + drawer |
| Checkout | Done | Stripe integration |
| Gallery | Done | Page exists |
| About | Done | Page exists |
| Inquire | Done | Form submits to API |
| **Gaps to address:** | | |
| Auth/Admin | Not started | No login or CMS |
| Product variations | Not started | No size/color options |
| Inquiry form fields | Partial | Missing date, budget, newsletter |
| Email notifications | Not started | No transactional email |
| Multi-tenancy | Not started | Single site only |

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

**Currently Implemented (Header.tsx):**
```
Header:
├── Logo "Krysta Mae" (links to home)
├── Shop (no dropdown - links to /shop)
├── Gallery
├── About
├── Inquire
├── Cart Icon (with count badge, opens CartDrawer)
└── Mobile hamburger menu
```

**To match krystamae.com (enhancement needed):**
```
Header:
├── Logo (links to home)
├── Shop (dropdown with collections)
│   ├── Coastal Summer
│   ├── Urban Lights
│   ├── Deep Water Zen
│   └── ... (dynamic from DB)
├── Gallery
├── About
├── Inquire
├── Cart Icon (with count badge)
└── Social Links (Instagram)
```

**Footer (implemented):**
- Newsletter signup form
- Navigation links
- Social links
- Copyright

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

**Currently Implemented:**
- Name (required)
- Email (required)
- Subject (optional)
- Message (required, textarea)

**Missing vs. krystamae.com (to add):**
- Target project date (optional, date picker)
- Project budget (optional, text or dropdown ranges)
- Additional details (optional, textarea)
- Newsletter opt-in checkbox

Form submissions:
- Email notification to artist (TBD)
- Stored in database via `/api/inquiries`
- Status tracking: new → responded → converted → closed

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

### 5.1 Implemented Stack

| Layer | Technology | Status |
|-------|------------|--------|
| **Frontend** | Next.js 16.1.6 (App Router) | Implemented |
| **Styling** | Tailwind CSS v4 | Implemented |
| **Forms** | React Hook Form + Zod | Implemented |
| **Database** | PostgreSQL (Supabase) | Implemented |
| **Auth** | TBD | Not yet implemented |
| **Payments** | Stripe | Implemented |
| **Storage** | Supabase Storage | Assumed |
| **Hosting** | TBD | Not yet deployed |
| **Email** | TBD | Not yet implemented |

### 5.2 Multi-Tenancy Approach

**Option A: Subdomain-based (Recommended)**
- Each client gets: `clientname.yourplatform.com`
- Custom domain mapping supported
- Single codebase, database-per-tenant or shared with tenant_id

**Option B: Separate deployments**
- Each client is independent deployment
- More isolation, more operational overhead
- Better for very different customization needs

### 5.3 Data Model (Implemented)

```
collections
├── id, name, slug, description, image_url, sort_order, created_at, updated_at

products
├── id, name, slug, description, price, compare_at_price, inventory_quantity
├── collection_id (FK), is_featured, is_active, created_at, updated_at

product_images
├── id, product_id (FK), url, alt_text, sort_order, created_at

orders
├── id, order_number, email, status, payment_status
├── stripe_checkout_session_id, stripe_payment_intent_id
├── subtotal, shipping_cost, tax, total
├── shipping_name, shipping_address_line1/2, shipping_city/state/postal_code/country
├── customer_id (FK), created_at, updated_at

order_items
├── id, order_id (FK), product_id (FK), product_name, price, quantity, created_at

customers
├── id, email, name, stripe_customer_id, created_at, updated_at

inquiries
├── id, name, email, subject, message, status, created_at

newsletter_subscribers
├── id, email, subscribed_at, unsubscribed_at

gallery_images
├── id, url, alt_text, caption, sort_order, created_at

site_settings
├── id, key, value (JSON), updated_at
```

**Not Yet Implemented (for multi-tenancy):**
- Tenant table
- User/roles table
- tenant_id foreign keys on all tables
- ProductVariation table (for size/color options)

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

### Phase 1: Foundation (MVP) — COMPLETE
- [x] Project setup (Next.js 16, Tailwind v4, Supabase)
- [x] Database schema and types
- [ ] Basic authentication (admin login)
- [x] Home page (Hero, FeaturedCollection, ArtistIntro)
- [x] About page
- [x] Gallery page
- [x] Contact/Inquire form

### Phase 2: E-Commerce Core — MOSTLY COMPLETE
- [x] Product data model
- [x] Collection management
- [x] Product listing pages (`/shop`, `/shop/[collection]`)
- [x] Product detail pages (`/product/[slug]`)
- [x] Shopping cart (client-side with localStorage)
- [x] Stripe checkout integration (`/api/checkout`, `/api/webhooks/stripe`)
- [x] Order confirmation flow (`/checkout/success`)
- [ ] Product variations (size, color, glaze)

### Phase 3: Polish & Client Handoff — IN PROGRESS
- [ ] Client-facing CMS dashboard (admin UI)
- [x] Theme customization (fonts: Cormorant + Inter, colors defined)
- [ ] SEO optimization (basic metadata done)
- [ ] Email notifications (order, inquiry)
- [x] Newsletter API (`/api/newsletter`)
- [x] Mobile optimization (responsive header, cart drawer)
- [ ] Performance optimization

### Phase 4: Multi-Tenancy — NOT STARTED
- [ ] Tenant creation workflow
- [ ] Domain mapping
- [ ] Admin super-dashboard
- [ ] Tenant isolation verification
- [ ] Backup/restore per tenant

### Phase 5: Migrate Clients — NOT STARTED
- [ ] Migrate krystamae.com content
- [ ] DNS cutover
- [ ] Client training
- [ ] Iterate based on feedback
- [ ] Migrate additional clients

---

## 8. Open Questions

**Immediate (for Krysta Mae launch):**
1. **Admin UI approach?** Build custom dashboard vs. use Supabase Studio vs. add headless CMS?
2. **Email provider?** Resend, Postmark, or Supabase's built-in email?
3. **Image hosting?** Supabase Storage configured? CDN layer needed?
4. **Deployment target?** Vercel, Cloudflare Pages, or self-hosted?

**For Multi-Tenancy (later):**
5. **Hosting budget?** Vercel Pro ($20/mo) vs. self-hosted vs. Cloudflare (cheaper)?
6. **Domain strategy?** Each client brings own domain, or offer subdomains?
7. **Shipping complexity?** Flat rate sufficient, or need carrier integration?
8. **Existing Squarespace data?** Export available? Product count per site?
9. **Design variations?** One theme with config, or multiple theme templates?

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
