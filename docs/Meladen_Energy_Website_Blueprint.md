# MELADEN ENERGY
## Website Content, Functional Specification & Cursor Development Blueprint

**Document type:** Website content and implementation specification  
**Source:** *Meladen Company Profile* (10 pages, supplied by client)  
**Prepared:** 21 October 2026  
**Public website limit:** **Exactly seven main pages**  
**Design scope:** UI visual styling, colour systems, typography, animation aesthetics and layout art direction are intentionally excluded. The development team will determine these independently.

---

## 1. Executive objective

Meladen Energy's website must be more useful than its printed profile. It should function as a trustworthy company information resource, an accessible station directory and a commercial enquiry channel for organisations that require bulk fuel supply. The site must serve motorists, business buyers, prospective partners and stakeholders without claiming capabilities that are not verified.

**Primary outcomes**

1. Enable commercial customers to submit a structured bulk fuel quotation request.
2. Help motorists discover reported operational stations, amenities and verified directions.
3. Explain Meladen's petroleum products, transport arrangements, company growth, quality controls and commitment to safety.
4. Give staff a maintainable way to update stations, content and enquiries.
5. Improve search discoverability and enable reliable measurement of enquiries.

**Key editorial principle:** The supplied company profile is the factual starting point, not a licence to invent statistics, certifications, facilities, product pricing or delivery guarantees.

---

## 2. Seven-page public sitemap

| # | Page | Route | Includes |
|---|---|---|---|
| 1 | Home | `/` | Value proposition, overview, solutions, network snapshot, expansion story, enquiry CTAs |
| 2 | About Meladen | `/about` | History, mission, values, milestone timeline, leadership placeholder |
| 3 | Products & Bulk Supply | `/solutions` | Petrol and diesel, 50ppm bulk diesel, logistics, commercial quotation form and FAQs |
| 4 | Fuel Stations | `/stations` | Search/filter, station information, amenities, verified directions, planned developments |
| 5 | Quality & Responsibility | `/responsibility` | Quality assurance, health and safety, environment and community responsibility |
| 6 | News & Updates | `/news` | Company announcements and informative articles; articles displayed within this route, without additional public page routes |
| 7 | Contact | `/contact` | Office details, telephone and email actions, enquiry form, business contact purposes |

**Strict seven-page rule:** Do not add public routes for individual station details, articles, a stand-alone quotation page, logistics, careers, or downloadable documents. Provide those as sections, in-page expandable detail views, filters, contextual panels or downloadable resources within the seven pages. Individual stories and stations may have shareable query parameters or fragment IDs on their parent page. The private admin portal and essential legally required notices are supporting application functions, not additional marketing pages; if separate legal routes would violate the seven-page cap, present approved notices in accessible in-page panels linked from the footer.

**Navigation recommendation (information architecture only):** Home · About · Products & Bulk Supply · Fuel Stations · Quality & Responsibility · News & Updates · Contact. A bulk fuel quotation action links to the form section on `/solutions#request-quote`.

---

## 3. Source-based company data and verification notes

### 3.1 Company identity

| Property | Source-based information |
|---|---|
| Trading name | Meladen Energy |
| Established | 2019 |
| Sector | Petroleum retail, trading, distribution and bulk supply |
| Original market | Commercial supply of Low Sulphur Gasoil |
| Office | First Floor, Room 103, Bwafwano House, Zambia National Society Building, Buteko Avenue, Ndola, Zambia |
| Email | meladenenergy21@gmail.com |
| Telephone | +260 977 536 520 |
| Telephone | +260 970 510 909 |
| Telephone | +260 973 259 631 |
| Sister transport company | Nurani Transport |
| Existing company tagline | Quality Energy and Efficient Service |
| Profile guarantee | Delivering the right quality, at the right place, at the right time and at the right price |
| Principal products | Unleaded Premium and Low Sulphur Gasoil |
| Bulk diesel specification | 50ppm low-sulphur diesel |

**Unverified in source:** Registered legal name, registration/PACRA number, TPIN, official domain, approved corporate email addresses, leadership names, direct departmental phone numbers, GPS coordinates, tank capacities, fleet size, public fuel prices and detailed product certifications.

### 3.2 Operational and planned station information

| Station | Province | Source-stated status | Date | Source-stated amenities |
|---|---|---|---|---|
| Mwense | Luapula | Operating | Opened in 2024 | Not specified |
| Musangu | Luapula | Operating | Date not stated | Not specified |
| Kabompo | North-Western | Operating | Commissioned December 2025 | Supermarket, bakery and restaurant |
| Chienge | Luapula | Operating | Described as opened 'recently' | Not specified |
| Sesheke | Western | Planned | Construction not yet commenced as described | Not applicable |
| Solwezi | North-Western | Planned | Construction not yet commenced as described | Not applicable |

The profile reports **four operating stations**, with **two planned locations**. Do not combine these into a claim of six operational stations. The profile claims stations operate **24/7**, but opening hours must be verified *for each site* before displaying that claim individually.

### 3.3 Profile page evidence

- **Page 1:** Brand, office address, email and three phone numbers.
- **Page 2:** Commercial/retail positioning, mission, network ambitions and supply approach.
- **Page 3:** Established in 2019; first Mwense station in 2024; Musangu, Kabompo, Chienge expansion; Sesheke and Solwezi plans.
- **Page 4:** 50ppm diesel, on-site testing, bulk delivery, tank/equipment supply claim, 24/7 stations, amenities and Nurani Transport relationship.
- **Page 5:** Unleaded Premium and Low Sulphur Gasoil.
- **Page 6:** Delivery guarantee statement.
- **Page 7:** Product quality control and conformity with Zambia Compulsory Standards Agency requirements.
- **Page 8:** Health and safety, trained first aiders and facility cleanliness/security.
- **Page 9:** Environmental responsibility and stated organisational values.
- **Page 10:** Commitment to sustained, community-centred CSR.

**Asset caution:** Confirm that photographed tankers and any other imagery can legally be reused and accurately depict Meladen or its operations. Do not imply stock imagery is the company's fleet or property.

---

## 4. Complete website copy by page

> **Editorial status:** The prose below is proposed website copy based on the supplied profile. Material factual additions, operational promises, leadership details and new organisational statements require client sign-off.

### PAGE 1 — HOME (`/`)

**SEO title:** Meladen Energy Zambia | Fuel Stations & Bulk Fuel Supply  
**Meta description:** Discover Meladen Energy's fuel stations, petroleum products and commercial bulk diesel supply solutions across Zambia.

#### Hero

**Headline:** Powering Progress. Connecting Communities.

**Supporting copy:** Quality petroleum products, dependable bulk fuel supply and accessible service stations. Meladen Energy is helping bring energy solutions closer to the communities and businesses that need them.

**Primary actions:** Find a Fuel Station · Request Bulk Fuel Quote

#### Company introduction

**Heading:** More Than Fuel. A Partner in Progress.

Established in 2019, Meladen Energy serves Zambia's retail and commercial petroleum markets. We began by supplying low-sulphur gas oil to commercial customers and have expanded into a growing network of service stations.

Our approach is rooted in a commitment to reliable supply, product quality and customer-focused service, particularly in locations where access to petroleum facilities has historically been limited.

**Link:** Read Our Story → `/about`

#### Services summary

**Heading:** The Energy Solutions You Need.

**Retail Fuel:** We market and distribute Unleaded Premium petrol and Low Sulphur Gasoil through our service station network. **Action:** Explore Stations.

**Bulk Diesel:** We provide 50ppm low-sulphur diesel for commercial requirements, with bulk supply and delivery arrangements. **Action:** Request a Quote.

**Transportation & Logistics:** Our operations are supported by sister company Nurani Transport, which provides tanker transportation for petroleum products. **Action:** Discover Our Supply Capabilities.

**Convenience Facilities:** Selected service stations offer additional facilities including supermarkets, bakeries and restaurants. **Action:** View Station Amenities.

#### Network section

**Heading:** Bringing Energy Closer to More Communities.

From Mwense and Musangu to Kabompo and Chienge, Meladen's growing service station network reflects a commitment to improving petroleum access in underserved areas. Our profile also identifies Sesheke and Solwezi as locations for future development.

**Action:** Explore Our Fuel Stations → `/stations`.

**Displayed figures:** Established in 2019; four reported operational stations; two proposed future locations. Use supporting captions so planned developments are never mistaken for operating facilities.

#### Commercial customers section

**Heading:** A Fuel Supply Partner for Businesses That Need to Keep Moving.

Fuel availability matters to transport operators, construction projects, agricultural operations and other commercial enterprises. Meladen Energy works with customers to understand their product needs, volumes and delivery locations so appropriate supply arrangements can be discussed.

**Action:** Submit Your Fuel Requirements → `/solutions#request-quote`.

**Qualification:** The industry examples describe potential customers, not verified client references or industry-specific contractual capabilities.

#### Responsibility section

**Heading:** Our Commitment Goes Beyond the Pump.

Quality control, health and safety, responsible operations and community relationships are central to how Meladen presents its work. We aim to strengthen these commitments as our business grows.

**Action:** Read Our Commitments → `/responsibility`.

#### Closing contact prompt

**Heading:** Let's Keep Your Business Moving.

For station information, commercial supply enquiries or general assistance, contact Meladen Energy.

**Actions:** Request Bulk Fuel Quote · Contact Us.

---

### PAGE 2 — ABOUT MELADEN (`/about`)

**SEO title:** About Meladen Energy | Our Growth in Zambia  
**Meta description:** Learn about Meladen Energy, established in 2019, and its growing petroleum retail and commercial supply operations in Zambia.

#### Introduction

**Heading:** A Zambian Energy Business Focused on Access and Reliability.

Meladen Energy is a petroleum products provider serving retail customers and commercial markets in Zambia. Established in 2019, the company initially focused on the commercial supply of Low Sulphur Gasoil before expanding into service station operations.

As the business grows, it continues to focus on delivering quality petroleum products, improving access in underserved locations and providing attentive service to customers.

#### Our mission

**Heading:** Our Mission.

To be recognised as a leading Zambian brand in petroleum trading, built on customer-first service, innovation, communication and effective administration.

*This is an editorial adaptation of the profile's mission. Approval required if it will replace the original wording.*

#### Our direction

**Heading:** Energy Access That Supports Progress.

Meladen's growth strategy prioritises petroleum access in locations where supply infrastructure is limited. Our stations and distribution activities are designed to bring essential products and related conveniences closer to motorists, businesses and communities.

#### Our values

**Suggested interpretation of the existing profile:**

- **Quality:** Prioritising suitable petroleum products and quality assurance.
- **Customer Commitment:** Putting customer needs at the centre of service.
- **Reliability:** Building arrangements that support consistent supply.
- **Safety:** Maintaining clean and safe operating environments.
- **Accessibility:** Growing in communities that need better petroleum access.
- **Responsibility:** Building constructive relationships with people and communities.

*Value names require management approval; the profile does not present this exact six-value list.*

#### Company milestone timeline

- **2019:** Meladen Energy begins supplying low-sulphur gas oil commercially.
- **2024:** First company service station opens in Mwense, Luapula Province.
- **Date to confirm:** Additional station opens in Musangu, serving the Mwense–Nchelenge corridor.
- **December 2025:** Kabompo service station commissioned with supermarket, bakery and restaurant amenities.
- **Date to confirm:** Chienge service station opens in Luapula Province, described as the company's fourth.
- **Planned:** Service stations identified for future development in Sesheke and Solwezi.

#### People behind the business

**Heading:** The People Behind Our Progress.

Our work depends on people committed to customer service, quality and responsible operations.

**Publishing rule:** Do not display fictitious directors or staff. Publish named profiles only when approved names, positions, photos and biographies are supplied. If none are supplied, omit the directory and retain this general statement.

#### Closing invitation

**Heading:** Discover How Meladen Can Support You.

Explore our fuel solutions or get in touch with the team to discuss commercial requirements and other enquiries.

---

### PAGE 3 — PRODUCTS & BULK SUPPLY (`/solutions`)

**SEO title:** Petroleum Products & Bulk Diesel Supply | Meladen Energy  
**Meta description:** Explore Unleaded Premium, Low Sulphur Gasoil, 50ppm bulk diesel supply and petroleum logistics arrangements from Meladen Energy.

#### Introduction

**Heading:** Fuel Solutions for Motorists and Commercial Operations.

Meladen Energy markets and distributes Unleaded Premium and Low Sulphur Gasoil, serving retail and commercial markets with a commitment to dependable product supply and customer support.

#### Product: Unleaded Premium

**Heading:** Unleaded Premium Petrol.

Our retail network provides access to Unleaded Premium petrol for motorists. We focus on a quality-conscious service experience at our operating locations.

**Action:** Find a Station → `/stations`.

#### Product: Low Sulphur Gasoil

**Heading:** Low Sulphur Gasoil.

Meladen supplies Low Sulphur Gasoil for retail and commercial requirements. The company profile also identifies premium-quality **50ppm low-sulphur diesel** as part of its bulk offering.

**Action:** Discuss Your Diesel Requirements.

#### Bulk diesel supply

**Heading:** Bulk Diesel Supply That Supports Business Continuity.

For organisations that rely on transportation, machinery or operational equipment, reliable access to fuel is an important business requirement. Meladen Energy provides commercial diesel supply arrangements informed by the customer's estimated quantities, delivery needs and operational location.

The company profile identifies these service capabilities:

- Premium-quality 50ppm diesel.
- Bulk product supply and delivery.
- On-site product testing.
- Supply of established tanks and equipment, subject to scope and commercial confirmation.
- Countrywide bulk delivery, subject to operational confirmation for each request.
- Service and logistics coordination.

**Important:** Do not promise a fixed nationwide delivery time or guaranteed stock availability without a confirmed service-level policy.

#### Transportation and logistics

**Heading:** Coordinated Delivery, Backed by Transportation Capability.

Meladen operates alongside its sister company, Nurani Transport. The profile states that Nurani Transport has invested in petroleum tankers that support delivery to Meladen stations. This arrangement is intended to contribute to supply continuity and reduce avoidable stockouts.

For commercial customers, our team can discuss delivery arrangements according to product, location and volume requirements.

#### Commercial enquiry journey

**Heading:** How to Request Bulk Fuel.

1. Describe the product and estimated volume required.
2. Specify the delivery location and preferred delivery date.
3. Provide your business and contact details.
4. Meladen's team reviews the enquiry and contacts you to discuss availability and commercial terms.

*This is a proposed digital enquiry process, not a statement of an established internal workflow.*

#### Embedded quotation form (`#request-quote`)

**Heading:** Request a Bulk Fuel Quotation.

**Intro:** Tell us about your fuel requirements. A Meladen representative can review your request and discuss suitable supply arrangements.

**Form fields:**

| Field | Validation / handling |
|---|---|
| Organisation / business name | Required, reasonable length limit |
| Contact person's full name | Required |
| Email | Required, validated |
| Phone / WhatsApp | Required, international-friendly format |
| Product | Required, options: 50ppm Low Sulphur Diesel; Other Requirement |
| Estimated quantity (litres) | Required, numeric, positive; no fabricated minimum order |
| Delivery town / district | Required |
| Delivery address / site description | Optional |
| Preferred delivery date | Optional and not guaranteed |
| Supply frequency | One-off / Weekly / Monthly / To be discussed |
| Additional requirements | Optional, limited free text |
| Privacy acknowledgement | Required where applicable |

**Submit button copy:** Send Fuel Enquiry.

**Success copy:** Thank you. Your enquiry has been received. Your reference is **{referenceNumber}**. Our team will review the details and contact you using the information supplied.

**Failure copy:** We could not submit your request at this time. Please retry or contact Meladen directly using the listed phone numbers.

Do not claim to calculate or display a confirmed price. Store enquiries before attempting notification emails; notification failure should not invalidate a saved enquiry.

#### FAQs

**What diesel specification is available for bulk supply?** The company profile identifies 50ppm low-sulphur diesel.

**Can deliveries be arranged to remote locations?** The profile describes countrywide bulk delivery and service to remote markets. Exact locations, lead times and conditions are subject to confirmation.

**Can Meladen support recurring orders?** Customers can submit recurring requirements for commercial discussion. Any contractual terms must be agreed directly.

**Are tanks and equipment available?** The profile mentions their supply. Availability, ownership model, installation and commercial arrangements require confirmation.

**Can I request quality testing information?** The profile identifies on-site product testing. Specific testing methods and documents should be confirmed with the team.

---

### PAGE 4 — FUEL STATIONS (`/stations`)

**SEO title:** Find Meladen Fuel Stations in Zambia | Locations & Amenities  
**Meta description:** Explore Meladen Energy stations in Mwense, Musangu, Kabompo and Chienge, plus reported future developments in Sesheke and Solwezi.

#### Introduction

**Heading:** Find a Meladen Fuel Station.

Browse our reported operational service stations and learn about our planned expansion. Each verified location entry will provide the information customers need to plan their visit.

#### Operating stations

**Mwense — Luapula Province**  
Meladen's first fuel service station, opened in 2024. It marked the company's expansion from commercial fuel supply into fuel station retailing.  
**Fields pending verification:** precise address, coordinates, station phone, opening hours, product availability and amenities.

**Musangu — Luapula Province**  
Established as a supplementary station to serve motorists travelling between Mwense and Nchelenge.  
**Fields pending verification:** precise address, coordinates, opening date, station phone, opening hours, product availability and amenities.

**Kabompo — North-Western Province**  
Commissioned in December 2025, this location combines a Meladen fuel service station with additional convenience facilities, including a supermarket, bakery and restaurant.  
**Fields pending verification:** precise address, coordinates, station phone, opening hours and current amenity availability.

**Chienge — Luapula Province**  
The profile identifies Chienge as Meladen's fourth fuel service station.  
**Fields pending verification:** precise opening date, address, coordinates, station phone, opening hours, product availability and amenities.

#### Planned developments

**Heading:** Looking Ahead.

Meladen's profile identifies **Sesheke, Western Province**, and **Solwezi, North-Western Province**, as locations for future service station development. These locations are **planned**, not currently operating according to the supplied profile.

#### Station directory functionality

- Search by station name, town or province.
- Filter by operational/planned status.
- Filter by confirmed amenities when data is available.
- Expand each station within the page to reveal details; no separate station page routes.
- Provide click-to-call where site-specific phone numbers are supplied.
- Offer map directions only when GPS coordinates or street addresses are verified.
- Keep planned station entries separate from operating locations and prevent directions to nonexistent facilities.
- Store each station's information in editable structured records.
- Display a clear 'details being confirmed' state for missing values rather than inventing data.

---

### PAGE 5 — QUALITY & RESPONSIBILITY (`/responsibility`)

**SEO title:** Quality, Safety & Sustainability | Meladen Energy  
**Meta description:** Learn about Meladen Energy's commitment to petroleum product quality, workplace safety, environmental responsibility and communities.

#### Introduction

**Heading:** Quality Energy. Responsible Operations.

At Meladen Energy, our commitment extends beyond supplying petroleum products. We recognise the importance of quality assurance, safe operating practices and positive relationships with the communities in which we work.

#### Product quality and assurance

**Heading:** A Commitment to Product Quality.

Quality control is a priority throughout our supply chain, from procurement to distribution and retailing. Meladen aims to supply products that are fit for purpose and conform to applicable Zambia Compulsory Standards Agency requirements.

The company profile also describes product testing and quality assurance services. Customers requiring specific product documentation should contact our team.

**Editorial caution:** Do not state that a particular laboratory certification, accreditation or quality-management standard has been awarded unless independently verified.

#### Health and safety

**Heading:** Safe Facilities for Our People and Customers.

We recognise that our employees, contractors and customers deserve a clean, safe and secure environment. Meladen is committed to maintaining its facilities and strengthening health and safety awareness and training.

Our company profile states that facilities have trained first aiders available when needed.

**Practical visitor guidance:** Follow station instructions, observe no-smoking signage, switch off engines during refuelling when instructed and report hazards to site personnel.

#### Environment

**Heading:** Responsible Development and Environmental Stewardship.

Meladen Energy is committed to acting as a responsible corporate citizen. We aim to operate in ways that respect the environment and support the communities in which our business activities take place.

We recognise that responsible operations require ongoing attention, continual improvement and compliance with applicable requirements.

**Publishing caution:** Do not fabricate quantified emissions savings, renewable energy projects, recycling outcomes or environmental certifications.

#### Community commitment

**Heading:** Building Relationships That Last.

We believe corporate social responsibility should involve more than isolated interventions. Meaningful community engagement should respond to local needs, create lasting opportunities and strengthen relationships between Meladen, its stakeholders and the communities it serves.

Specific CSR projects can be published once factual descriptions, dates, photos and results are approved.

---

### PAGE 6 — NEWS & UPDATES (`/news`)

**SEO title:** Meladen Energy News & Company Updates  
**Meta description:** Follow Meladen Energy's company milestones, station developments and practical petroleum-related information.

#### Introduction

**Heading:** News, Developments and Insights.

Explore company announcements, station developments and useful information about fuel supply, product quality and responsible operations.

#### Suggested editorial categories

- Company Milestones
- Station Developments
- Fuel & Supply Insights
- Quality & Safety
- Community News

#### Initial article concepts (not yet approved for publication)

1. **Our Journey Since 2019:** An overview of Meladen's development from commercial supply into station operations.
2. **Bringing Fuel Access Closer to Communities:** Why service station expansion in underserved areas matters.
3. **Inside Meladen Kabompo:** How the December 2025 station combines fuel with supermarket, bakery and restaurant facilities.
4. **Understanding 50ppm Low Sulphur Diesel:** A factual educational guide reviewed for technical accuracy before publishing.
5. **Planning Bulk Fuel Requirements:** Practical information for businesses preparing fuel supply enquiries.
6. **Safety at the Fuel Station:** General customer safety guidance consistent with approved site protocols.
7. **How Petroleum Logistics Support Supply Continuity:** An explanation of transport coordination without implying live tracking or specific fleet capabilities.

**Article handling:** Articles open as an accessible in-page reading panel or state-driven reader within `/news`, optionally addressable by a query parameter such as `/news?article=our-journey`. No dedicated `/news/[slug]` public route. Include share metadata strategy that respects the technical limitations of in-page content; if individual indexable article URLs are later needed, that is a separately approved scope change.

#### Publishing rules

Only publish approved, dated company announcements. Clearly distinguish educational articles from corporate announcements. Never backdate unverified milestones or publish imaginary images, quotes, testimonials or metrics.

---

### PAGE 7 — CONTACT (`/contact`)

**SEO title:** Contact Meladen Energy | Ndola, Zambia  
**Meta description:** Contact Meladen Energy in Ndola for bulk fuel enquiries, station information, business correspondence and general support.

#### Introduction

**Heading:** Talk to Meladen Energy.

Whether you need information about our stations, commercial petroleum supply or general business matters, we'd be pleased to hear from you.

#### Office details

**Meladen Energy**  
First Floor, Room 103, Bwafwano House  
Zambia National Society Building  
Buteko Avenue, Ndola, Zambia

**Email:** meladenenergy21@gmail.com  
**Telephone:** +260 977 536 520  
**Telephone:** +260 970 510 909  
**Telephone:** +260 973 259 631

Provide click-to-email and click-to-call actions. A map can be embedded after the office location pin is verified.

#### General enquiry form

**Heading:** Send Us a Message.

**Fields:** Full name, email, telephone (optional), enquiry category, subject, message and privacy acknowledgement where applicable.

**Suggested categories:** Fuel Station Enquiry; Bulk Fuel Supply; Partnership or Business Enquiry; General Enquiry; Feedback.

When users select **Bulk Fuel Supply**, guide them to the more suitable form on `/solutions#request-quote` while preserving any already entered details if technically feasible.

**Success message:** Thank you for getting in touch. Your message has been received. Our team will review your enquiry.

**Failure message:** Your message could not be sent. Please retry or use the published telephone or email contacts.

#### Closing note

**Heading:** Quality Energy and Efficient Service.

We welcome the opportunity to understand how we can assist you.

---

## 5. Functional product requirements

### 5.1 Public station directory

- Admin-managed station records with status `operational`, `planned` or `temporarily-unavailable` (last status is a **proposed software status**, not a claim about a current station).
- Flexible amenities list; only approved amenities displayed.
- Search, province filters and status filters.
- Verified map locations and external directions.
- Missing-information handling, including no fabricated opening hours.
- In-page station detail views to respect the seven-page limit.

### 5.2 Commercial fuel enquiry workflow

1. Customer fills out the form on `/solutions`.
2. Server validates inputs and applies spam/rate controls.
3. Enquiry is stored securely with an automatically generated reference.
4. Customer sees a success acknowledgement.
5. Configured sales recipients receive a notification email.
6. Authorized staff view, assign, update and export the enquiry in the admin area.
7. Failed notifications are logged and retried or flagged without losing saved enquiries.

**Suggested internal enquiry states:** `new`, `under_review`, `contacted`, `quoted`, `closed_won`, `closed_lost`. These describe software workflow states, not documented Meladen operations.

### 5.3 Admin functions (not public marketing pages)

- Secure sign-in and role-based access.
- Manage company settings and contact information.
- Edit the seven page content blocks.
- Maintain stations and amenities.
- Manage article drafts, review and publication.
- View/filter/export enquiries with permission controls.
- Upload approved images and documents.
- Preserve audit logs for significant edits.
- Role separation (suggested): Administrator, Content Editor and Sales User.

### 5.4 Corporate resources

Approved company profile and verified documentation may be provided as downloadable assets within About, Solutions or Responsibility. Do not expose confidential certificates or internal documents without authorisation.

### 5.5 Analytics and conversion events

Track only approved, privacy-conscious events, such as `bulk_quote_started`, `bulk_quote_submitted`, `contact_submitted`, `station_selected`, `directions_clicked`, `phone_clicked`, and `company_profile_downloaded`. Avoid collecting submitted message content in analytics.

---

## 6. Recommended implementation architecture

The following are engineering recommendations, **not UI visual design instructions**.

| Area | Recommendation |
|---|---|
| Frontend/server | Next.js App Router and TypeScript |
| Forms | React Hook Form and Zod, or comparable validated form solution |
| Storage | PostgreSQL |
| Data access | Prisma or Drizzle |
| Admin authentication | Established session-based authentication with server-side authorization |
| Email | Transactional email provider; delivery failures logged and retried |
| Media | Secure asset storage, sensible resizing and format optimization |
| Mapping | Verified location data with a suitable mapping/directions provider |
| Hosting | Vercel or container-deployable VPS infrastructure |
| SEO | Page metadata, canonical URLs, sitemap, robots and truthful structured data |
| Monitoring | Error logging, uptime checks, backups and basic alerting |

**Data entities:** `CompanyProfile`, `SiteSettings`, `Stations`, `StationAmenities`, `Products`, `Services`, `BulkQuoteRequests`, `ContactEnquiries`, `NewsArticles`, `MediaAssets`, `Documents`, `TimelineEvents`, `AdminUsers`, `AuditLogs`.

**Production controls:** Server-side validation, anti-spam measures, request throttling, secure file uploads, non-public admin routes, authorized data export, environment-based secrets, regular backups, privacy and retention controls, plus accessibility and mobile performance testing.

**Deployment portability:** Keep production databases and uploaded files in persistent storage, not inside ephemeral app containers. Supply a `.env.example`, migrations, seed script, deployment instructions and recovery notes.

---

## 7. Proposed structured data seed

```json
{
  "company": {
    "name": "Meladen Energy",
    "established": 2019,
    "tagline": "Quality Energy and Efficient Service",
    "email": "meladenenergy21@gmail.com",
    "phones": [
      "+260977536520",
      "+260970510909",
      "+260973259631"
    ],
    "office": {
      "floor": "First Floor",
      "room": "103",
      "building": "Bwafwano House",
      "landmark": "Zambia National Society Building",
      "street": "Buteko Avenue",
      "city": "Ndola",
      "country": "Zambia"
    },
    "logisticsPartner": "Nurani Transport"
  },
  "products": [
    {"slug": "unleaded-premium", "name": "Unleaded Premium"},
    {"slug": "low-sulphur-gasoil", "name": "Low Sulphur Gasoil"}
  ],
  "stations": [
    {"slug": "mwense", "name": "Mwense", "province": "Luapula", "status": "operational", "openedYear": 2024},
    {"slug": "musangu", "name": "Musangu", "province": "Luapula", "status": "operational"},
    {"slug": "kabompo", "name": "Kabompo", "province": "North-Western", "status": "operational", "openedMonth": "2025-12", "amenities": ["supermarket", "bakery", "restaurant"]},
    {"slug": "chienge", "name": "Chienge", "province": "Luapula", "status": "operational"},
    {"slug": "sesheke", "name": "Sesheke", "province": "Western", "status": "planned"},
    {"slug": "solwezi", "name": "Solwezi", "province": "North-Western", "status": "planned"}
  ]
}
```

Seed missing latitude, longitude, addresses, photos, hours and station contact numbers as `null`, not guessed values.

---

## 8. Content approvals required from Meladen

- [ ] High-quality official logo and permission to use profile photos.
- [ ] Registered corporate identity and applicable public registration details.
- [ ] Official website domain and destination email addresses for forms.
- [ ] Verified street addresses and map pins for the four operational stations.
- [ ] Accurate operating hours, contact details and available products per station.
- [ ] Approved station amenities, particularly at Kabompo.
- [ ] Confirmed opening date for Musangu and Chienge.
- [ ] Current status of proposed Sesheke and Solwezi developments.
- [ ] Final approved wording of mission and values.
- [ ] Approved description of Nurani Transport's involvement and permitted fleet imagery.
- [ ] Approved commercial quotation routing and follow-up process.
- [ ] Product quality evidence and any permitted compliance downloads.
- [ ] Authorised leadership profiles, if they are to appear.
- [ ] Real CSR stories, dates and media if these are to be presented.
- [ ] Privacy policy wording, enquiry data retention and consent requirements.

---

## 9. Cursor master development prompt

Copy the following into Cursor together with this Markdown document and the original Meladen company profile PDF.

```text
You are implementing the MELADEN ENERGY corporate website.

READ FIRST:
1. The supplied Meladen company profile PDF.
2. Meladen_Energy_Website_Blueprint.md (the complete copy and functional scope).

NON-NEGOTIABLE SCOPE:
Build EXACTLY SEVEN PUBLIC WEBSITE PAGES:
/, /about, /solutions, /stations, /responsibility, /news, /contact.
Do not introduce additional marketing routes for quote requests, logistics, station details, individual news articles, careers or corporate resources. The bulk quote form belongs at /solutions#request-quote. Station details and article readers operate inside their parent page. Private admin functionality is allowed as a supporting application module.

DESIGN OWNERSHIP:
Do not infer or prescribe visual aesthetics from this document. The project team will supply or decide the UI design direction. Implement the agreed design faithfully when provided, using reusable accessible components. Do not make unsolicited colour, typeface, animation or layout style decisions part of the content specification.

SOURCE INTEGRITY:
Use the document's approved copy and seed data. Four stations are reported operating: Mwense, Musangu, Kabompo and Chienge. Sesheke and Solwezi are planned. Meladen was established in 2019. Products include Unleaded Premium and Low Sulphur Gasoil. Bulk supply identifies 50ppm diesel. Nurani Transport is the sister company supporting petroleum logistics. Do not invent directors, GPS pins, opening hours, prices, fleet counts, certifications, delivery guarantees, testimonials or commercial statistics. Missing values must remain null/pending.

CORE PUBLIC FUNCTIONS:
- Seven complete public pages and their documented content sections.
- Station search, filtering, amenity display, in-page details and verified directions.
- Embedded bulk fuel enquiry form with server validation and saved submissions.
- General contact form with durable persistence and notifications.
- News and announcements controlled by an approved publishing workflow.
- Click-to-contact actions, company data and approved downloads.
- Accurate metadata, sitemap, canonical URLs and appropriate structured data.

ADMIN FUNCTIONS:
Secure staff sign-in; permission-aware content editing; stations management; news publishing; quotation/contact enquiries and status updates; authorized export; media management; audit logging.

ENGINEERING:
Prefer Next.js with strict TypeScript, PostgreSQL and a proven ORM. Use server-side validation, safe session handling, rate limiting, bot controls, environment-based secrets, secure media processing, backups and error monitoring. Provide migrations, seed scripts, .env.example and deployment instructions. Store database and uploads persistently outside application containers.

USER EXPERIENCE AND ACCESSIBILITY:
Ensure functional mobile navigation, responsive layouts, semantic markup, keyboard access, readable error states, loading states, meaningful empty states, accessible forms and reduced unnecessary network load. Follow designs supplied by the project team.

IMPLEMENTATION ORDER:
1. Review source and create a facts/unknowns register.
2. Define seven-page routes, reusable content schema and data model.
3. Implement all seven pages using supplied copy.
4. Add stations directory and in-page location details.
5. Build bulk quotation and contact workflows with persistence.
6. Build secured administration and content management.
7. Add SEO, validation, automated tests and deployment notes.
8. Run tests, lint, type checking and production build; fix errors.

ACCEPTANCE CRITERIA:
- Exactly seven public marketing pages.
- All primary calls to action lead to functional destinations.
- Quotation enquiries persist reliably and can be reviewed by authorized staff.
- Four operational and two planned locations are never misrepresented.
- Missing business facts are shown as unknown or hidden, never fabricated.
- No non-functional demo buttons or fake submissions.
- No publicly exposed secrets or unprotected admin operations.
- Documentation permits deployment and updates by another developer.

Produce an implementation plan, then build the application. Mark integrations requiring credentials or client approval clearly.
```

---

## 10. Delivery milestones and final acceptance checklist

### Milestone A — Content and structure

- [ ] Seven routes implemented, no extra public marketing pages.
- [ ] Source-based copy included and reviewed by client.
- [ ] Original company facts represented accurately.
- [ ] Editorial copy clearly distinguished from unverified claims.

### Milestone B — Working business functions

- [ ] Station search/filter and in-page details work.
- [ ] Planned stations cannot be mistaken for operational stations.
- [ ] Verified map directions work; unverified directions remain unavailable.
- [ ] Bulk form validates, saves and acknowledges enquiries.
- [ ] Contact form validates, saves and acknowledges enquiries.
- [ ] Admin can manage enquiries, stations, news and page content.

### Milestone C — Production assurance

- [ ] Authentication, authorization and spam protections tested.
- [ ] Forms tested for failure, retries and duplicate handling.
- [ ] Mobile accessibility, basic performance and search metadata tested.
- [ ] Privacy and retention requirements signed off.
- [ ] Client reviews all approved facts, addresses and station details.
- [ ] Team receives deployment and administration instructions.

### Director demonstration sequence

1. Show the company story and seven-page information architecture.
2. Demonstrate the station directory, distinguishing operating and planned stations.
3. Submit a bulk diesel quotation enquiry as a customer.
4. Open the admin area and show how the enquiry is received and managed.
5. Show how a station or company update can be changed without developer intervention.

**Success definition:** Meladen receives more than a digital brochure. It receives a credible, maintainable website that helps customers find the business, understand its capabilities and initiate genuine commercial enquiries, while remaining within seven public pages.
