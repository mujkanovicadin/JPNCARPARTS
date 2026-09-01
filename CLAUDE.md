# Japanese Automotive Parts Global E-Commerce Platform

## 1. PROJECT MISSION

Build a global e-commerce platform based in Japan that makes it dramatically easier for customers outside Japan to discover, verify, purchase, and receive Japanese automotive parts.

The company should initially operate without holding inventory.

The platform should be capable of:

1. Finding Japanese automotive parts from suppliers and marketplaces.
2. Importing and normalizing product information.
3. Verifying compatibility with specific vehicles.
4. Calculating international pricing and shipping.
5. Presenting products through a modern global storefront.
6. Automating supplier/product/order workflows.
7. Eventually providing an AI automotive parts purchasing assistant.
8. Eventually developing proprietary data and technology that creates a defensible competitive advantage.

The long-term goal is NOT to become another generic car-parts store.

The goal is to become:

> "The easiest and smartest way in the world to buy Japanese automotive parts."

---

# 2. BUSINESS MODEL

## Initial Model

Use a supplier-fulfilled / marketplace-sourcing model.

We DO NOT initially maintain our own inventory.

Basic flow:

Customer
    ↓
Our website
    ↓
Customer selects vehicle + part
    ↓
Compatibility verification
    ↓
Customer places order
    ↓
Payment
    ↓
Supplier / Japanese marketplace
    ↓
Part purchased
    ↓
Supplier ships to us or directly to fulfillment partner
    ↓
International shipping
    ↓
Customer

The exact fulfillment model should remain flexible.

Potential sourcing channels:

- Japanese manufacturers
- Authorized distributors
- Japanese wholesalers
- Japanese automotive retailers
- Japanese marketplaces
- Auction platforms where legally and operationally appropriate
- Used/OEM parts suppliers
- Performance/tuning suppliers

Do not assume any marketplace permits automated scraping or commercial resale.

Always check:

- Terms of service
- API availability
- Commercial usage restrictions
- Copyright
- Data licensing
- Robots.txt where relevant
- Supplier agreements

---

# 3. INITIAL MARKET POSITIONING

Do NOT attempt to sell every automotive product immediately.

Start narrow.

Potential initial categories:

### OEM Japanese Parts

Examples:

- Toyota
- Lexus
- Nissan
- Honda
- Subaru
- Mazda
- Mitsubishi
- Suzuki

### Performance / Tuning

Potential brands/categories:

- HKS
- Blitz
- TEIN
- Cusco
- Greddy
- Tomei
- Fujitsubo
- Kakimoto
- Project Mu
- Endless
- Rays
- Enkei
- Bride

These are examples only.

Before selling any brand, verify:

- Distribution rights
- Trademark requirements
- Export restrictions
- Warranty implications
- Regional restrictions
- Supplier legitimacy

---

# 4. INITIAL CUSTOMER

Prioritize international customers who already understand Japanese cars.

Potential markets:

- United States
- Canada
- Germany
- United Kingdom
- Australia
- UAE
- Europe

Potential customer profiles:

### Enthusiast

Owns a Japanese performance vehicle and wants parts unavailable or expensive locally.

### Workshop

Needs reliable access to Japanese parts.

### Importer

Imports Japanese vehicles and needs replacement/performance parts.

### Collector

Needs genuine OEM parts for older Japanese vehicles.

### Modifier

Wants performance upgrades.

---

# 5. COMPETITIVE STRATEGY

The platform should compete primarily through:

1. Better product discovery
2. Better vehicle compatibility
3. Better product information
4. Better international purchasing experience
5. Better customer support
6. Better pricing transparency
7. Better sourcing
8. Better automation

Do NOT attempt to win purely through lowest price.

---

# 6. CORE DIFFERENTIATOR

Build a:

# Japanese Parts AI Copilot

Example customer query:

"I have a 2019 Toyota Supra in Germany. I want around 50 more horsepower, but I still need the car to pass German inspection."

The system should eventually be able to:

1. Identify the vehicle.
2. Understand the customer's objective.
3. Identify compatible parts.
4. Explain compatibility.
5. Identify performance effects.
6. Identify potential legal/inspection concerns.
7. Estimate total landed cost.
8. Recommend a package.
9. Create a shopping cart.
10. Explain installation considerations.
11. Track the order.

The AI must never present uncertain compatibility information as fact.

When confidence is low:

> "We need to verify this with the manufacturer/supplier."

---

# 7. TECHNOLOGY PRINCIPLES

Build the system as a real production application.

Do NOT create a disposable prototype that must be rewritten later.

Prioritize:

- Modularity
- Type safety
- Testing
- Observability
- Security
- Maintainability
- Scalability
- Documentation
- Clear separation of concerns

Avoid unnecessary complexity.

Do not build microservices merely because they sound scalable.

Start with a well-structured modular monolith.

Split services only when there is a demonstrated reason.

---

# 8. RECOMMENDED STACK

## Frontend

Next.js

TypeScript

React

Tailwind CSS

shadcn/ui where appropriate

---

## Backend

Initially:

Next.js server-side functionality / API routes

OR

a separate backend if complexity justifies it.

Potential future backend:

FastAPI

Python

---

## Database

PostgreSQL

Supabase is the preferred initial platform.

Use:

- PostgreSQL
- Supabase Auth
- Supabase Storage
- Supabase database tooling

Design the database so migration away from Supabase remains possible.

---

## Payments

Stripe

Never store raw payment card information.

---

## Search

Design the search layer to support:

- PostgreSQL search initially
- Full-text search
- Fuzzy matching
- Vehicle-based search
- Part-number search

Potential future:

- Meilisearch
- Typesense
- Elasticsearch/OpenSearch

Do not add these until needed.

---

# 9. PRODUCT DATA ARCHITECTURE

Product information will come from multiple sources.

Therefore, NEVER simply copy supplier data directly into the database.

Create a normalized product model.

Example:

Product
- id
- canonical_name
- manufacturer
- brand
- part_number
- category
- description
- specifications
- images
- price
- currency
- availability
- supplier
- source_url
- source_product_id
- compatibility
- weight
- dimensions
- country_of_origin
- warranty
- created_at
- updated_at

---

# 10. VEHICLE DATABASE

Build a structured vehicle compatibility database.

Example:

Vehicle
- make
- model
- generation
- trim
- year_start
- year_end
- engine
- engine_code
- transmission
- drivetrain
- market
- chassis_code

Compatibility:

- product_id
- vehicle_id
- compatibility_type
- source
- confidence
- notes
- verification_status

Possible compatibility statuses:

- VERIFIED
- SUPPLIER_CONFIRMED
- INFERRED
- UNKNOWN
- NOT_COMPATIBLE

Never silently convert inferred compatibility into verified compatibility.

---

# 11. PART NUMBER SYSTEM

Part numbers are extremely important.

Support:

- OEM part numbers
- Manufacturer part numbers
- Supplier SKUs
- Alternative part numbers
- Superseded part numbers
- Cross-reference numbers

Example:

OEM Part:
12345-ABCDE

Could have:

- previous number
- replacement number
- compatible aftermarket numbers

Build this into the data model from the beginning.

---

# 12. PRODUCT NORMALIZATION

Different suppliers may describe the same product differently.

Example:

Supplier A:

"Toyota GR86 HKS Air Intake 70020-AF101"

Supplier B:

"HKS Cold Air Intake GR86"

These may represent the same product.

Create a canonical product identity.

Potential matching signals:

- Manufacturer
- Brand
- Part number
- SKU
- Vehicle compatibility
- Product title
- Specifications
- Images

Part number should receive extremely high importance.

Never merge products automatically when confidence is insufficient.

---

# 13. SCRAPING / DATA COLLECTION

Potential technologies to investigate:

## Playwright

Browser automation.

Repository:

https://github.com/microsoft/playwright

## Crawlee

Web crawling and scraping framework.

Repository:

https://github.com/apify/crawlee

## Crawl4AI

Open-source web crawler designed for AI/data extraction workflows.

Repository:

https://github.com/unclecode/crawl4ai

## Firecrawl

Web crawling and extraction infrastructure.

Repository:

https://github.com/mendableai/firecrawl

## Stagehand

Browser automation designed around AI-assisted workflows.

Repository:

https://github.com/browserbase/stagehand

## ScrapeGraphAI

AI-powered scraping and extraction.

Repository:

https://github.com/ScrapeGraphAI/Scrapegraph-ai

IMPORTANT:

These are tools, not permission to scrape any website.

Before connecting a source:

1. Check terms of service.
2. Check API availability.
3. Check licensing.
4. Check commercial usage.
5. Check robots.txt where appropriate.
6. Prefer official APIs.
7. Prefer supplier feeds.
8. Prefer direct supplier partnerships.

The system must respect applicable laws and website rules.

---

# 14. SEARCH INFRASTRUCTURE

Potential external search tools:

- Exa
- Serper
- Tavily
- official search APIs

Use search primarily for:

- Product discovery
- Supplier discovery
- Documentation
- Manufacturer information
- Compatibility research
- Market research

Do not use search results as unquestioned truth.

Every external fact should have a source.

---

# 15. AI ARCHITECTURE

AI should NOT control critical transactions without deterministic validation.

Use AI for:

- Search interpretation
- Product matching
- Description generation
- Customer support
- Product categorization
- Compatibility assistance
- Supplier discovery
- Research
- Data enrichment

Use deterministic systems for:

- Prices
- Taxes
- Shipping calculations
- Inventory status
- Payments
- Order status
- Refunds
- Currency conversion
- Final compatibility verification

---

# 16. FUTURE AI AGENTS

Build these gradually.

## Agent 1: Product Discovery Agent

Find potential products from approved sources.

Responsibilities:

- Discover products
- Extract product information
- Extract part numbers
- Identify brands
- Identify vehicle compatibility
- Detect duplicates

---

## Agent 2: Product Normalization Agent

Convert supplier information into our canonical format.

Responsibilities:

- Normalize titles
- Normalize specifications
- Categorize products
- Match manufacturers
- Match part numbers

---

## Agent 3: Compatibility Agent

Determine vehicle compatibility.

Must provide:

- compatibility result
- confidence score
- evidence
- source

Never fabricate compatibility.

---

## Agent 4: Pricing Agent

Calculate:

Supplier cost
+
fees
+
shipping
+
taxes/duties where applicable
+
payment fees
+
our margin

=

Customer price

Pricing must be deterministic.

AI may recommend pricing strategies but must not override pricing rules without authorization.

---

## Agent 5: Supplier Agent

Monitor supplier information.

Track:

- price changes
- stock changes
- discontinued products
- supplier reliability
- shipping times

---

## Agent 6: Customer Support Agent

Answer:

- order questions
- compatibility questions
- shipping questions
- product questions

Escalate uncertain cases to a human.

---

## Agent 7: SEO Agent

Generate and optimize:

- product pages
- category pages
- vehicle pages
- buying guides
- comparison pages

Never create thousands of low-quality AI pages just for SEO.

---

## Agent 8: Market Research Agent

Monitor:

- competitors
- prices
- popular products
- search demand
- emerging vehicle platforms
- new performance products

---

# 17. ORDER SYSTEM

Order lifecycle:

PENDING_PAYMENT
↓
PAID
↓
SUPPLIER_PURCHASE_PENDING
↓
SUPPLIER_ORDERED
↓
SUPPLIER_CONFIRMED
↓
INBOUND
↓
READY_TO_SHIP
↓
SHIPPED
↓
DELIVERED

Possible exceptions:

- SUPPLIER_OUT_OF_STOCK
- SUPPLIER_CANCELLED
- CUSTOMER_CANCELLED
- REFUND_PENDING
- REFUNDED

Every transition must be logged.

---

# 18. SHIPPING

Initially design shipping abstraction.

Do not hardcode one shipping provider.

Potential providers:

- DHL
- FedEx
- UPS
- Japan Post
- shipping aggregators

Create:

ShippingProvider

with methods conceptually similar to:

- getRates()
- createShipment()
- getTracking()
- cancelShipment()

---

# 19. INTERNATIONALIZATION

The platform should eventually support:

- English
- Japanese
- German
- French
- Spanish

Start with English.

Store currencies properly.

Do not use floating point arithmetic for financial calculations.

Use integer minor units or a decimal library.

---

# 20. TAX / DUTY ARCHITECTURE

International taxes and customs are complicated.

Never hardcode assumptions.

Create an abstraction for:

- destination
- product category
- HS code
- declared value
- shipping cost
- tax
- duties
- customs fees

Clearly distinguish:

- product price
- shipping
- tax
- duty
- other fees

Never promise an exact landed cost unless verified.

---

# 21. SECURITY

Security is a first-class requirement.

Implement:

- Authentication
- Authorization
- Input validation
- Rate limiting
- CSRF protection where applicable
- Secure secrets management
- API key protection
- Webhook verification
- Audit logs
- Database access controls
- Admin role separation

Never put secrets in source code.

Never commit:

.env

API keys

Stripe secrets

database passwords

supplier credentials

---

# 22. ADMIN DASHBOARD

Build an internal admin dashboard.

Initial functionality:

### Products

- View
- Edit
- Approve
- Reject
- Disable
- Merge duplicates

### Suppliers

- Add
- Edit
- Reliability score
- Status

### Orders

- View
- Status
- Supplier status
- Shipping
- Refund

### Customers

- View
- Orders
- Support history

### AI

- Agent activity
- Errors
- Confidence
- Human escalations

### Data

- Scraping jobs
- Import jobs
- Failed imports
- Duplicate candidates

---

# 23. AUDITABILITY

Every automated action should be traceable.

For important operations store:

- agent
- action
- timestamp
- input
- output
- source
- confidence
- result

Example:

Compatibility Agent

Input:
2019 Toyota Supra A90

Part:
HKS XXXXX

Output:
Compatible

Confidence:
0.94

Evidence:
Manufacturer compatibility document

Human verification:
Not required

---

# 24. DESIGN DIRECTION

The website should feel:

- Premium
- Modern
- Fast
- Trustworthy
- Automotive
- Japanese
- International

Avoid:

- Cheap dropshipping aesthetic
- Excessive anime styling
- Clutter
- Generic Shopify appearance
- Fake urgency
- Fake reviews

Think:

Japanese engineering + premium technology company.

---

# 25. CUSTOMER EXPERIENCE

The primary search experience should eventually support:

### Search by part

"GR86 HKS intake"

### Search by vehicle

"2022 Toyota GR86"

### Search by problem

"My GR86 needs better braking"

### Search by goal

"I want more power"

### Search by part number

"HKS 70020-AF101"

The system should understand all five.

---

# 26. VEHICLE-FIRST EXPERIENCE

Eventually:

Customer selects:

MAKE
↓
MODEL
↓
YEAR
↓
ENGINE
↓
MARKET

Then the entire store adapts to that vehicle.

Example:

"My Garage"

2022 Toyota GR86
2.4L FA24
Japan specification

Then show:

- Compatible parts
- Performance upgrades
- Maintenance parts
- Exterior
- Interior
- Brakes
- Suspension
- Exhaust
- Engine
- Electronics

---

# 27. DEVELOPMENT PHILOSOPHY

Work in phases.

NEVER attempt to implement the entire roadmap in one task.

At the beginning of every session:

1. Read CLAUDE.md.
2. Read PROJECT_ROADMAP.md.
3. Read current architecture documentation.
4. Identify current phase.
5. Identify incomplete tasks.
6. Work only on the current phase unless explicitly instructed otherwise.

After completing work:

1. Run tests.
2. Run linting.
3. Run type checking.
4. Verify database migrations.
5. Verify build.
6. Update documentation.
7. Update PROJECT_ROADMAP.md.
8. Report exactly what was completed.
9. Report remaining issues.

---

# 28. PHASED ROADMAP

# PHASE 0: FOUNDATION

Goal:

Create the technical foundation.

Tasks:

- Initialize repository
- Next.js
- TypeScript
- Tailwind
- Database
- Supabase
- Authentication
- Environment configuration
- CI/CD
- Testing
- Basic documentation
- Error handling
- Logging

Deliverable:

A clean, deployable skeleton.

DO NOT build advanced AI yet.

---

# PHASE 1: E-COMMERCE MVP

Goal:

Create a functional storefront.

Build:

- Homepage
- Product listing
- Product page
- Categories
- Search
- Cart
- Checkout
- User accounts
- Orders
- Basic admin dashboard

Use mocked products initially.

Deliverable:

A customer can discover a product and complete a test purchase.

---

# PHASE 2: PRODUCT DATABASE

Goal:

Build the normalized automotive product system.

Build:

- Products
- Brands
- Manufacturers
- Categories
- Suppliers
- Part numbers
- Vehicle database
- Compatibility relationships

Create seed data.

Deliverable:

The system understands products, vehicles, and compatibility relationships.

---

# PHASE 3: SUPPLIER SYSTEM

Goal:

Allow products to come from external suppliers without maintaining inventory.

Build:

- Supplier profiles
- Supplier product records
- Product imports
- Price synchronization
- Availability synchronization
- Supplier mapping
- Duplicate detection

Start with manually imported supplier data.

Then automate.

Deliverable:

Supplier products can populate the store.

---

# PHASE 4: DATA COLLECTION

Goal:

Automate approved product discovery.

Build:

- Crawling infrastructure
- Source adapters
- Import queues
- Data extraction
- Normalization
- Duplicate detection
- Error handling
- Source tracking

Use Playwright/Crawlee/Crawl4AI/etc. where appropriate.

Do NOT scrape sources without permission.

Deliverable:

Approved sources can feed structured product data into the platform.

---

# PHASE 5: VEHICLE COMPATIBILITY

Goal:

Make compatibility a major competitive advantage.

Build:

- Vehicle selection
- Vehicle database
- Compatibility engine
- Confidence scores
- Evidence/source tracking
- Compatibility UI

Deliverable:

Customer can select their vehicle and see compatible products.

---

# PHASE 6: INTERNATIONAL COMMERCE

Goal:

Make international purchasing reliable.

Build:

- Multiple currencies
- Shipping calculations
- Shipping provider abstraction
- International addresses
- Tax/duty framework
- Landed cost estimates
- International checkout

Deliverable:

Customer can purchase from Japan for international delivery.

---

# PHASE 7: AUTOMATION

Goal:

Reduce manual work.

Build agents for:

- Product discovery
- Product normalization
- Supplier monitoring
- Pricing suggestions
- Customer support
- SEO

Every automated action must be logged.

Deliverable:

A small team can operate a much larger catalog.

---

# PHASE 8: JAPANESE PARTS AI COPILOT

Goal:

Build the core differentiating product.

Customer can say:

"I have a 2020 GR Yaris and want better handling for street driving."

AI should:

1. Understand vehicle.
2. Understand objective.
3. Ask necessary clarification.
4. Find compatible parts.
5. Explain recommendations.
6. Show evidence.
7. Estimate cost.
8. Build package.
9. Add products to cart.

Deliverable:

AI-powered automotive shopping assistant.

---

# PHASE 9: GLOBAL SCALE

Only after product-market validation.

Consider:

- US fulfillment
- European fulfillment
- Local warehouses
- Supplier contracts
- Authorized distribution
- B2B accounts
- Workshop accounts
- Dealer network
- Additional languages
- Additional currencies

---

# PHASE 10: PROPRIETARY DATA PLATFORM

Long-term goal.

Build proprietary datasets around:

- Vehicle compatibility
- Part relationships
- Supplier reliability
- Pricing
- Demand
- Performance
- Customer behavior

This data becomes a major competitive advantage.

---

# 29. GITHUB / OPEN SOURCE TOOLING

Investigate these repositories when relevant.

Browser automation:

https://github.com/microsoft/playwright

https://github.com/browserbase/stagehand

Crawling:

https://github.com/apify/crawlee

https://github.com/unclecode/crawl4ai

Web extraction:

https://github.com/mendableai/firecrawl

https://github.com/ScrapeGraphAI/Scrapegraph-ai

Do not add libraries simply because they are listed here.

Evaluate:

- Maintenance
- License
- Security
- Community
- Documentation
- Performance
- Fit for our use case

---

# 30. CLAUDE CODE TOOLING

Claude Code should be configured to work effectively with:

- GitHub
- Playwright
- Supabase
- Browser automation
- Web search
- Firecrawl or equivalent
- Database tooling
- Stripe tooling
- Testing tools

Use official integrations whenever possible.

Avoid installing dozens of MCP servers without a reason.

Each tool should have a clearly defined purpose.

---

# 31. RECOMMENDED CLAUDE CODE AGENTS

Create specialized agents where useful.

Suggested structure:

.claude/
    agents/
        product-researcher.md
        scraper-engineer.md
        compatibility-engineer.md
        ecommerce-engineer.md
        security-reviewer.md
        qa-engineer.md
        seo-researcher.md
        market-researcher.md

---

# 32. PRODUCT RESEARCHER AGENT

Responsibilities:

- Research products
- Identify suppliers
- Find part numbers
- Compare pricing
- Find compatibility information
- Cite sources
- Identify uncertainty

Never invent data.

---

# 33. SCRAPER ENGINEER AGENT

Responsibilities:

- Build source adapters
- Extract structured data
- Handle pagination
- Handle retries
- Detect changes
- Store source metadata

Must respect:

- Terms of service
- API rules
- robots.txt where relevant
- copyright
- rate limits

---

# 34. SECURITY REVIEWER AGENT

Review every major feature for:

- Authentication flaws
- Authorization flaws
- Injection
- XSS
- CSRF
- Secrets exposure
- Webhook vulnerabilities
- API abuse
- Rate-limit issues
- Database permissions

Do not consider a feature complete until security risks are addressed.

---

# 35. QA AGENT

Test:

- Unit tests
- Integration tests
- E2E tests
- Checkout
- Search
- Compatibility
- Authentication
- Admin permissions
- Supplier imports

When possible, use Playwright for browser E2E tests.

---

# 36. CODING RULES

1. TypeScript strict mode.
2. No unnecessary `any`.
3. No hardcoded secrets.
4. No duplicated business logic.
5. No giant components.
6. No undocumented magic numbers.
7. Validate external data.
8. Validate AI output.
9. Write tests for important business logic.
10. Use database migrations.
11. Use meaningful names.
12. Keep functions focused.
13. Prefer simple architecture.
14. Document non-obvious decisions.
15. Never silently ignore errors.

---

# 37. AI SAFETY RULES

AI must not:

- Invent compatibility.
- Invent supplier availability.
- Invent prices.
- Invent shipping times.
- Invent legal requirements.
- Invent manufacturer specifications.
- Claim verification without evidence.

AI responses involving product compatibility should include evidence or clearly state uncertainty.

---

# 38. FINANCIAL RULES

Never calculate financial values using unsafe floating point arithmetic.

Use:

- integer minor units
OR
- decimal arithmetic

Every price must include:

- currency
- source
- timestamp

Price changes should be traceable.

---

# 39. DATABASE RULES

Every important database change must have a migration.

Never modify production data manually without recording the operation.

Use:

created_at
updated_at

for appropriate tables.

Use indexes based on actual query patterns.

Do not prematurely optimize.

---

# 40. GIT RULES

Use clear commits.

Examples:

feat: add vehicle database
feat: add product search
fix: correct supplier price normalization
test: add compatibility tests
refactor: simplify product importer

Never commit:

- secrets
- credentials
- .env files
- customer private information
- temporary debugging files

---

# 41. DEFINITION OF DONE

A feature is NOT complete simply because the code exists.

A feature is complete when:

- Implementation works.
- Type checking passes.
- Lint passes.
- Tests pass.
- Build passes.
- Error states are handled.
- Security has been considered.
- UI works on desktop and mobile.
- Documentation is updated.
- Roadmap is updated.

---

# 42. CURRENT DEVELOPMENT RULE

IMPORTANT:

DO NOT automatically implement future phases.

Always identify the current phase from:

PROJECT_ROADMAP.md

Then work only on the next incomplete milestone.

If a future feature is required as an architectural dependency, create only the minimum foundation required for it.

---

# 43. PROJECT DOCUMENTATION

Maintain:

/docs

Recommended structure:

/docs
    /architecture
    /database
    /business
    /suppliers
    /compatibility
    /ai
    /scraping
    /shipping
    /security

Important files:

CLAUDE.md
PROJECT_ROADMAP.md
ARCHITECTURE.md
DATABASE.md
SECURITY.md

---

# 44. PROJECT ROADMAP MANAGEMENT

PROJECT_ROADMAP.md must contain:

- Current phase
- Completed milestones
- Current milestone
- Upcoming milestones
- Known problems
- Technical debt
- Business questions
- Decisions that require human approval

Claude Code may update the roadmap after completing work.

Claude Code must NOT silently change the strategic direction.

---

# 45. HUMAN APPROVAL REQUIRED

Ask the human before:

- Spending money
- Purchasing inventory
- Signing supplier agreements
- Changing pricing strategy
- Changing business model
- Deploying destructive database migrations
- Deleting production data
- Making legal claims
- Agreeing to contracts
- Sending external business communications
- Launching automated purchasing
- Making large infrastructure changes

---

# 46. FIRST COMMAND

When this project is opened for the first time:

1. Inspect the repository.
2. Inspect existing files.
3. Determine whether an application already exists.
4. Do NOT overwrite existing work.
5. Read this CLAUDE.md.
6. Create PROJECT_ROADMAP.md if missing.
7. Create ARCHITECTURE.md if missing.
8. Create DATABASE.md if missing.
9. Create SECURITY.md if missing.
10. Determine the current project state.
11. Propose Phase 0 implementation.
12. Wait for approval before beginning a major implementation.

---

# 47. FIRST MVP PHILOSOPHY

The first version does NOT need:

- Thousands of products
- Complex AI
- Automated scraping
- Warehouses
- Multiple countries
- Multiple languages
- Dozens of suppliers

The first version DOES need:

- Excellent product experience
- Reliable product data
- Vehicle compatibility foundation
- Clean architecture
- Real checkout
- Supplier workflow
- Strong trust signals

Build the smallest version that can validate whether customers actually want this.

---

# 48. NORTH STAR

Every major product decision should answer:

> Does this make buying Japanese automotive parts internationally easier, safer, faster, or smarter?

If not, question whether it belongs in the product.

The ultimate product vision is:

Customer enters their vehicle.

Customer describes what they want.

The platform finds the right Japanese parts.

The platform verifies compatibility.

The platform explains the options.

The platform calculates the true cost.

The customer buys.

The platform handles sourcing and delivery.

That is the company we are building.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
