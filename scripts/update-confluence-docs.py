#!/usr/bin/env python3
"""
Update Confluence documentation for the NextHire Website.

Reads the codebase, generates documentation, and pushes to Confluence.
Requires env vars: CONFLUENCE_EMAIL, CONFLUENCE_API_TOKEN

Usage:
  python3 scripts/update-confluence-docs.py

Pages updated:
  - NextHire Website (overview under Engineering Documentation)
  - Architecture Overview — Website
  - Frontend — Next.js Application — Website
  - Deployment Guide — Website
  - Developer Setup Guide — Website
"""

import json
import os
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path

import requests
from requests.auth import HTTPBasicAuth

# -- Configuration --------------------------------------------------------
BASE_URL = "https://nexthire.atlassian.net/wiki/rest/api"
SPACE_KEY = "N"

CONFLUENCE_EMAIL = os.environ.get("CONFLUENCE_EMAIL", "hemant@nexthireconsulting.com")
CONFLUENCE_TOKEN = os.environ.get("CONFLUENCE_API_TOKEN")

if not CONFLUENCE_TOKEN:
    print("ERROR: CONFLUENCE_API_TOKEN env var is required")
    sys.exit(1)

AUTH = HTTPBasicAuth(CONFLUENCE_EMAIL, CONFLUENCE_TOKEN)
HEADERS = {"Content-Type": "application/json"}

PAGE_TITLES = {
    "root": "Engineering Documentation",
    "website": "NextHire Website",
    "architecture": "Architecture Overview — Website",
    "frontend": "Frontend — Next.js Application — Website",
    "deployment": "Deployment Guide — Website",
    "setup": "Developer Setup Guide — Website",
}


def find_page_by_title(title):
    """Find a page by title in the space. Returns (page_id, version) or (None, None)."""
    resp = requests.get(
        f"{BASE_URL}/content",
        params={"spaceKey": SPACE_KEY, "title": title, "expand": "version"},
        auth=AUTH,
        headers=HEADERS,
    )
    if resp.status_code == 200:
        results = resp.json().get("results", [])
        if results:
            page = results[0]
            return page["id"], page["version"]["number"]
    return None, None


def create_page(title, body_html, parent_id=None):
    """Create a new Confluence page."""
    data = {
        "type": "page",
        "title": title,
        "space": {"key": SPACE_KEY},
        "body": {"storage": {"value": body_html, "representation": "storage"}},
    }
    if parent_id:
        data["ancestors"] = [{"id": parent_id}]

    resp = requests.post(f"{BASE_URL}/content", json=data, auth=AUTH, headers=HEADERS)
    if resp.status_code in (200, 201):
        page = resp.json()
        print(f"  Created: {title} (ID: {page['id']})")
        return page["id"]
    else:
        print(f"  Failed to create '{title}': {resp.status_code} - {resp.text[:200]}")
        return None


def update_page(page_id, title, body_html, version):
    """Update an existing Confluence page."""
    data = {
        "id": page_id,
        "type": "page",
        "title": title,
        "space": {"key": SPACE_KEY},
        "version": {"number": version + 1},
        "body": {"storage": {"value": body_html, "representation": "storage"}},
    }

    resp = requests.put(
        f"{BASE_URL}/content/{page_id}", json=data, auth=AUTH, headers=HEADERS
    )
    if resp.status_code == 200:
        print(f"  Updated: {title} (v{version + 1})")
        return True
    else:
        print(f"  Failed to update '{title}': {resp.status_code} - {resp.text[:200]}")
        return False


def upsert_page(title, body_html, parent_id=None):
    """Create or update a page."""
    page_id, version = find_page_by_title(title)
    if page_id:
        update_page(page_id, title, body_html, version)
        return page_id
    else:
        return create_page(title, body_html, parent_id)


# -- Codebase Analysis Helpers --------------------------------------------

def get_git_info():
    """Get current branch and last commit info."""
    try:
        branch = subprocess.check_output(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"], text=True
        ).strip()
        commit = subprocess.check_output(
            ["git", "log", "-1", "--format=%h %s"], text=True
        ).strip()
        return branch, commit
    except Exception:
        return "unknown", "unknown"


def get_package_json():
    """Read package.json."""
    pkg_path = Path("package.json")
    if pkg_path.exists():
        return json.loads(pkg_path.read_text())
    return {}


def list_pages():
    """List all Next.js App Router pages."""
    app_dir = Path("src/app")
    pages = []
    if app_dir.exists():
        for f in sorted(app_dir.rglob("page.tsx")):
            route = "/" + str(f.parent.relative_to(app_dir))
            if route == "/.":
                route = "/"
            pages.append(route)
    return pages


def list_components(subdir):
    """List components in a subdirectory of src/components/."""
    comp_dir = Path(f"src/components/{subdir}")
    components = []
    if comp_dir.exists():
        for f in sorted(comp_dir.glob("*.tsx")):
            components.append(f.stem)
    return components


def list_all_component_dirs():
    """List all component subdirectories."""
    comp_dir = Path("src/components")
    if comp_dir.exists():
        return sorted([d.name for d in comp_dir.iterdir() if d.is_dir()])
    return []


def list_lib_files():
    """List all lib files."""
    lib_dir = Path("src/lib")
    if lib_dir.exists():
        return sorted([f.name for f in lib_dir.glob("*.ts")])
    return []


def list_store_slices():
    """List Redux store slices."""
    slices_dir = Path("src/store/slices")
    if slices_dir.exists():
        return sorted([f.stem for f in slices_dir.glob("*.ts")])
    return []


def count_files(pattern, path="."):
    """Count files matching a glob pattern."""
    return len(list(Path(path).glob(pattern)))


def list_legal_pages():
    """Extract legal page slugs from legalData.ts."""
    legal_file = Path("src/lib/legalData.ts")
    slugs = []
    if legal_file.exists():
        content = legal_file.read_text()
        matches = re.findall(r'slug:\s*["\']([^"\']+)["\']', content)
        slugs = matches
    return sorted(slugs)


def list_blog_posts():
    """Count blog posts from blogData.ts."""
    blog_file = Path("src/lib/blogData.ts")
    if blog_file.exists():
        content = blog_file.read_text()
        matches = re.findall(r'slug:\s*["\']([^"\']+)["\']', content)
        return len(matches)
    return 0


def get_interview_roles():
    """List interview roles from interviewRolesData.ts."""
    roles_file = Path("src/lib/interviewRolesData.ts")
    if roles_file.exists():
        content = roles_file.read_text()
        matches = re.findall(r'slug:\s*["\']([^"\']+)["\']', content)
        return matches
    return []


# -- Page Content Generators -----------------------------------------------

def generate_overview_html():
    """Generate NextHire Website overview page."""
    branch, commit = get_git_info()
    pkg = get_package_json()
    pages = list_pages()
    comp_dirs = list_all_component_dirs()
    lib_files = list_lib_files()
    slices = list_store_slices()
    legal = list_legal_pages()
    blog_count = list_blog_posts()
    interview_roles = get_interview_roles()
    deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
    today = datetime.now().strftime("%Y-%m-%d")

    section_components = list_components("sections")
    ui_components = list_components("ui")
    form_components = list_components("forms")
    layout_components = list_components("layout")

    return f"""
<ac:structured-macro ac:name="info" ac:schema-version="1">
<ac:rich-text-body>
<p>Auto-generated from <code>{branch}</code> branch (commit <code>{commit}</code>). Last updated: {today}. Do not edit manually — changes will be overwritten.</p>
</ac:rich-text-body>
</ac:structured-macro>

<h2>NextHire Website — Overview</h2>
<p>The NextHire Website is the marketing and product site for NextHire Consulting, an AI-powered career services platform. Built with Next.js 15 (App Router) and deployed as a fully static site. It serves both job seekers (candidates) and recruiters (companies) with product information, pricing, blog content, interview preparation resources, and legal pages.</p>

<h3>Key Capabilities</h3>
<table>
<tr><th>Feature</th><th>Description</th></tr>
<tr><td><strong>Marketing Pages</strong></td><td>Homepage hero, product pillars, how-it-works flow, success stories, company-focused landing page</td></tr>
<tr><td><strong>Pricing</strong></td><td>4-tier pricing (Free, Lite, Pro, Max) with INR/USD support, monthly/quarterly billing, feature comparison</td></tr>
<tr><td><strong>Blog</strong></td><td>{blog_count} posts on AI job search, career strategy, platform guides. Sanity CMS with static fallback</td></tr>
<tr><td><strong>Interview Prep</strong></td><td>SEO-optimized Q&amp;A pages for {len(interview_roles)} roles with behavioral, coding, and system design questions</td></tr>
<tr><td><strong>Legal Pages</strong></td><td>{len(legal)} policy pages (privacy, terms, refund, DPA, etc.) driven by centralized data file</td></tr>
<tr><td><strong>Contact &amp; Booking</strong></td><td>Contact form (Google Apps Script), expert booking via Cal.com embed</td></tr>
<tr><td><strong>AI Chatbot</strong></td><td>OpenAI GPT-4o-mini powered chat for product recommendations</td></tr>
<tr><td><strong>Analytics</strong></td><td>PostHog product analytics + Google Tag Manager</td></tr>
</table>

<h3>Codebase Stats</h3>
<table>
<tr><th>Metric</th><th>Count</th></tr>
<tr><td>App Router Pages</td><td>{len(pages)}</td></tr>
<tr><td>Section Components</td><td>{len(section_components)}</td></tr>
<tr><td>UI Components</td><td>{len(ui_components)}</td></tr>
<tr><td>Form Components</td><td>{len(form_components)}</td></tr>
<tr><td>Layout Components</td><td>{len(layout_components)}</td></tr>
<tr><td>Redux Slices</td><td>{len(slices)}</td></tr>
<tr><td>Lib/Data Files</td><td>{len(lib_files)}</td></tr>
<tr><td>Legal Pages</td><td>{len(legal)}</td></tr>
<tr><td>Blog Posts (static)</td><td>{blog_count}</td></tr>
<tr><td>Interview Roles</td><td>{len(interview_roles)}</td></tr>
</table>

<h3>Tech Stack</h3>
<table>
<tr><th>Layer</th><th>Technology</th></tr>
<tr><td>Framework</td><td>Next.js {deps.get('next', '15')} (App Router, static export)</td></tr>
<tr><td>Language</td><td>TypeScript {deps.get('typescript', '5')}</td></tr>
<tr><td>UI Library</td><td>React {deps.get('react', '19')}</td></tr>
<tr><td>State Management</td><td>Redux Toolkit {deps.get('@reduxjs/toolkit', '2.5')}</td></tr>
<tr><td>Styling</td><td>Custom CSS (globals.css + style.css), Webflow base CSS, no Tailwind</td></tr>
<tr><td>CMS</td><td>Sanity.io {deps.get('sanity', '5')} (blog posts, optional)</td></tr>
<tr><td>Animations</td><td>Motion {deps.get('motion', '12')}, Matter.js {deps.get('matter-js', '0.20')}, CSS keyframes</td></tr>
<tr><td>Carousels</td><td>Swiper {deps.get('swiper', '11')}</td></tr>
<tr><td>Icons</td><td>Lucide React {deps.get('lucide-react', '1')}, SVG sprite</td></tr>
<tr><td>Forms</td><td>Google Apps Script (no-cors POST)</td></tr>
<tr><td>Validation</td><td>Zod {deps.get('zod', '4')}</td></tr>
<tr><td>Scheduling</td><td>Cal.com Embed {deps.get('@calcom/embed-react', '1.5')}</td></tr>
<tr><td>Analytics</td><td>PostHog {deps.get('posthog-js', '1')}, Google Tag Manager</td></tr>
<tr><td>AI Chat</td><td>OpenAI {deps.get('openai', '6')}, Vercel AI SDK</td></tr>
<tr><td>Build Output</td><td>Static export (output: 'export') to /out</td></tr>
</table>

<h3>Key Integrations</h3>
<table>
<tr><th>Service</th><th>Purpose</th></tr>
<tr><td>Google Tag Manager</td><td>Analytics container, conversion tracking</td></tr>
<tr><td>Google Apps Script</td><td>Contact form &amp; expert form submissions</td></tr>
<tr><td>PostHog</td><td>Product analytics, page views, feature engagement</td></tr>
<tr><td>Sanity.io</td><td>Blog CMS (optional, falls back to static data)</td></tr>
<tr><td>Cal.com</td><td>Expert booking calendar embed</td></tr>
<tr><td>OpenAI</td><td>GPT-4o-mini for in-page chatbot</td></tr>
<tr><td>Finsweet</td><td>Cookie consent (GDPR compliance)</td></tr>
</table>

<h3>Pages &amp; Routes</h3>
<table>
<tr><th>Route</th><th>Type</th></tr>
{"".join(f'<tr><td><code>{p}</code></td><td>{"Dynamic" if "[" in p else "Static"}</td></tr>' for p in pages)}
</table>
"""


def generate_frontend_html():
    """Generate frontend architecture page."""
    pages = list_pages()
    section_components = list_components("sections")
    ui_components = list_components("ui")
    form_components = list_components("forms")
    layout_components = list_components("layout")
    lib_files = list_lib_files()
    slices = list_store_slices()
    pkg = get_package_json()
    deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}

    section_rows = "\n".join(f"<tr><td><code>{c}</code></td></tr>" for c in section_components)
    ui_rows = "\n".join(f"<tr><td><code>{c}</code></td></tr>" for c in ui_components)
    form_rows = "\n".join(f"<tr><td><code>{c}</code></td></tr>" for c in form_components)
    layout_rows = "\n".join(f"<tr><td><code>{c}</code></td></tr>" for c in layout_components)
    lib_rows = "\n".join(f"<tr><td><code>{f}</code></td></tr>" for f in lib_files)
    slice_rows = "\n".join(f"<tr><td><code>{s}</code></td></tr>" for s in slices)
    page_rows = "\n".join(f"<tr><td><code>{p}</code></td></tr>" for p in pages)

    return f"""
<ac:structured-macro ac:name="info" ac:schema-version="1">
<ac:rich-text-body>
<p>Auto-generated from codebase. Do not edit manually.</p>
</ac:rich-text-body>
</ac:structured-macro>

<h2>Frontend — Next.js Application</h2>

<h3>Core Dependencies</h3>
<table>
<tr><th>Package</th><th>Version</th></tr>
<tr><td>Next.js</td><td>{deps.get('next', 'unknown')}</td></tr>
<tr><td>React</td><td>{deps.get('react', 'unknown')}</td></tr>
<tr><td>TypeScript</td><td>{deps.get('typescript', 'unknown')}</td></tr>
<tr><td>Redux Toolkit</td><td>{deps.get('@reduxjs/toolkit', 'unknown')}</td></tr>
<tr><td>React-Redux</td><td>{deps.get('react-redux', 'unknown')}</td></tr>
<tr><td>Sanity</td><td>{deps.get('sanity', 'unknown')}</td></tr>
<tr><td>Motion</td><td>{deps.get('motion', 'unknown')}</td></tr>
<tr><td>Matter.js</td><td>{deps.get('matter-js', 'unknown')}</td></tr>
<tr><td>Swiper</td><td>{deps.get('swiper', 'unknown')}</td></tr>
<tr><td>Zod</td><td>{deps.get('zod', 'unknown')}</td></tr>
<tr><td>PostHog</td><td>{deps.get('posthog-js', 'unknown')}</td></tr>
</table>

<h3>App Router Pages ({len(pages)} total)</h3>
<table>
<tr><th>Route</th></tr>
{page_rows}
</table>

<h3>Section Components ({len(section_components)} total)</h3>
<table>
<tr><th>Component</th></tr>
{section_rows}
</table>

<h3>UI Components ({len(ui_components)} total)</h3>
<table>
<tr><th>Component</th></tr>
{ui_rows}
</table>

<h3>Form Components ({len(form_components)} total)</h3>
<table>
<tr><th>Component</th></tr>
{form_rows}
</table>

<h3>Layout Components ({len(layout_components)} total)</h3>
<table>
<tr><th>Component</th></tr>
{layout_rows}
</table>

<h3>Data &amp; Lib Files ({len(lib_files)} total)</h3>
<table>
<tr><th>File</th></tr>
{lib_rows}
</table>

<h3>Redux Store Slices ({len(slices)} total)</h3>
<table>
<tr><th>Slice</th></tr>
{slice_rows}
</table>

<h3>Project Structure</h3>
<ac:structured-macro ac:name="code" ac:schema-version="1">
<ac:parameter ac:name="language">text</ac:parameter>
<ac:plain-text-body><![CDATA[
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (providers, metadata, GTM)
│   ├── page.tsx            # Homepage
│   ├── api/chat/route.ts   # OpenAI streaming chat endpoint
│   ├── pricing/            # Pricing page (4 tiers)
│   ├── companies/          # For Companies landing
│   ├── blog/               # Blog index + [slug] dynamic pages
│   ├── contact-us/         # Contact form
│   ├── interview-questions/ # Interview prep hub + [role] pages
│   ├── organization/[slug] # Company detail pages
│   ├── success-story/      # Customer testimonials
│   └── [legal-pages]/      # privacy-policy, terms, refund, etc.
│
├── components/
│   ├── layout/             # Header, Footer, LegalPageShell
│   ├── sections/           # HeroSection, PricingPageClient, etc.
│   ├── ui/                 # DualActionCTA, AccordionFaq, gravity, etc.
│   └── forms/              # ContactForm, ExpertForm
│
├── lib/                    # Data files & utilities
│   ├── legalData.ts        # Legal page content (single source of truth)
│   ├── blogData.ts         # Static blog posts (Sanity fallback)
│   ├── interviewRolesData.ts # Interview Q&A per role
│   ├── pricing.ts          # Pricing tiers (INR/USD)
│   ├── forms.ts            # Google Apps Script submission helper
│   └── sanity.ts           # Sanity CMS queries
│
├── store/                  # Redux Toolkit
│   ├── index.ts            # Store configuration
│   ├── hooks.ts            # Typed dispatch/selector hooks
│   └── slices/             # navSlice, formSlice, notificationSlice
│
├── constants/              # Design tokens
│   ├── typography.ts       # Font scales (xs-xl)
│   └── footerLinks.ts      # Footer nav data
│
├── sanity/                 # Sanity CMS config & schemas
│
└── styles/
    ├── globals.css         # Global styles, animations, font rules
    └── style.css           # Component-specific styles
]]></ac:plain-text-body>
</ac:structured-macro>

<h3>Styling Approach</h3>
<ul>
<li><strong>No Tailwind</strong> — all styles in globals.css and style.css with <code>nh-</code> prefix</li>
<li><strong>Webflow Base CSS</strong> — <code>/public/styles/e25-algotale.min.css</code> loaded via link tag</li>
<li><strong>Two-font system:</strong> Droid Serif for headings (h1-h3) and text &ge;50px; Inter for everything else</li>
<li><strong>CSS Layers:</strong> <code>@layer base, component, components</code> for cascade control</li>
<li><strong>Container:</strong> <code>.nh-container</code> class (max-width: 1320px, responsive padding)</li>
<li><strong>Animations:</strong> Motion.js for interactions, Matter.js for physics, CSS @keyframes for loops</li>
</ul>

<h3>State Management</h3>
<ul>
<li><strong>navSlice:</strong> Mobile menu open/close, active dropdown, scroll state</li>
<li><strong>formSlice:</strong> Contact &amp; expert form submission loading/success/error</li>
<li><strong>notificationSlice:</strong> Toast notification queue</li>
<li><strong>No new slices</strong> — local component state uses useState/useReducer</li>
</ul>
"""


def generate_architecture_html():
    """Generate architecture overview page."""
    return """
<h2>Architecture Overview — NextHire Website</h2>

<h3>High-Level Architecture</h3>
<ac:structured-macro ac:name="code" ac:schema-version="1">
<ac:parameter ac:name="language">text</ac:parameter>
<ac:plain-text-body><![CDATA[
                    +------------------+
                    |   Static Host    |
                    | (Vercel/Netlify) |
                    +--------+---------+
                             |
                    +--------v---------+
                    |   Static Files   |
                    |  (HTML/CSS/JS)   |
                    |   output: export |
                    +--------+---------+
                             |
            +----------------+----------------+
            |                |                |
   +--------v------+  +-----v-------+  +-----v--------+
   | Sanity CMS    |  | Google Apps |  | OpenAI API   |
   | (Blog Posts)  |  | Script      |  | (Chat)       |
   | Build-time    |  | (Forms)     |  | Runtime      |
   +---------------+  +-------------+  +--------------+
            |
   +--------v------+
   | PostHog       |
   | (Analytics)   |
   +---------------+
]]></ac:plain-text-body>
</ac:structured-macro>

<h3>Build Pipeline</h3>
<ol>
<li><strong>Source:</strong> Next.js App Router with TypeScript</li>
<li><strong>Build:</strong> <code>next build</code> with <code>output: 'export'</code> produces static HTML/CSS/JS in <code>/out</code></li>
<li><strong>Dynamic Routes:</strong> <code>generateStaticParams</code> pre-renders blog/[slug], organization/[slug], interview-questions/[role]</li>
<li><strong>Deploy:</strong> Static files served from any CDN/static host</li>
</ol>

<h3>Content Architecture</h3>
<table>
<tr><th>Content Type</th><th>Source</th><th>Update Method</th></tr>
<tr><td>Blog Posts</td><td>Sanity CMS (primary) + blogData.ts (fallback)</td><td>Sanity Studio or code commit</td></tr>
<tr><td>Legal Pages</td><td>legalData.ts</td><td>Code commit + rebuild</td></tr>
<tr><td>Interview Q&amp;A</td><td>interviewRolesData.ts</td><td>Code commit + rebuild</td></tr>
<tr><td>Pricing</td><td>pricing.ts</td><td>Code commit + rebuild</td></tr>
<tr><td>Footer Links</td><td>footerLinks.ts</td><td>Code commit + rebuild</td></tr>
</table>

<h3>Key Design Decisions</h3>
<table>
<tr><th>Decision</th><th>Rationale</th></tr>
<tr><td>Static export (no SSR)</td><td>Faster loads, cheaper hosting, better SEO with pre-rendered HTML</td></tr>
<tr><td>No Tailwind</td><td>Preserves Webflow design fidelity; custom CSS with nh- prefix</td></tr>
<tr><td>Redux for UI state only</td><td>Lightweight — only nav, form, and notification state needs cross-component sharing</td></tr>
<tr><td>Sanity with static fallback</td><td>Content team can edit via Sanity Studio; site works without Sanity connection</td></tr>
<tr><td>Google Apps Script for forms</td><td>No backend needed; submissions go directly to email/sheets</td></tr>
<tr><td>Two-font system</td><td>Droid Serif for headings gives editorial weight; Inter for body ensures readability</td></tr>
<tr><td>CSS Layers</td><td>Cascade control without !important wars between Webflow base and custom styles</td></tr>
</table>

<h3>SEO Strategy</h3>
<ul>
<li>Schema.org structured data (SoftwareApplication, Organization, FAQPage, BlogPosting)</li>
<li>Open Graph + Twitter Card metadata on every page</li>
<li>Dynamic sitemap generation</li>
<li>Interview Q&amp;A pages target long-tail keywords per role</li>
<li>Blog posts optimized for career/job search queries</li>
</ul>
"""


def generate_deployment_html():
    """Generate deployment guide page."""
    return """
<h2>Deployment Guide — NextHire Website</h2>

<h3>Build Configuration</h3>
<ac:structured-macro ac:name="code" ac:schema-version="1">
<ac:parameter ac:name="language">javascript</ac:parameter>
<ac:plain-text-body><![CDATA[
// next.config.mjs
{
  output: 'export',           // Static site generation
  trailingSlash: true,        // SEO-friendly URLs
  images: { unoptimized: true }, // No Next.js image optimization
  eslint: { ignoreDuringBuilds: true },
  transpilePackages: ['sanity', '@sanity/vision', '@sanity/ui', '@portabletext/editor']
}
]]></ac:plain-text-body>
</ac:structured-macro>

<h3>Build &amp; Deploy</h3>
<ac:structured-macro ac:name="code" ac:schema-version="1">
<ac:parameter ac:name="language">bash</ac:parameter>
<ac:plain-text-body><![CDATA[
# Build static site
npm run build

# Output directory: out/
# Deploy this directory to any static host

# Environment variables needed at build time:
# NEXT_PUBLIC_SANITY_PROJECT_ID
# NEXT_PUBLIC_SANITY_DATASET
# NEXT_PUBLIC_SANITY_API_VERSION
# NEXT_PUBLIC_POSTHOG_KEY
# NEXT_PUBLIC_GOOGLE_SCRIPT_CONTACT
]]></ac:plain-text-body>
</ac:structured-macro>

<h3>Hosting Options</h3>
<table>
<tr><th>Host</th><th>Status</th><th>Notes</th></tr>
<tr><td>Vercel</td><td>Compatible</td><td>Auto-detects Next.js, handles static export</td></tr>
<tr><td>Netlify</td><td>Compatible</td><td>Set build command to <code>npm run build</code>, publish dir to <code>out</code></td></tr>
<tr><td>CloudFlare Pages</td><td>Compatible</td><td>Same build/output config</td></tr>
<tr><td>AWS S3 + CloudFront</td><td>Compatible</td><td>Upload <code>out/</code> to S3, CloudFront for CDN</td></tr>
</table>

<h3>Environment Variables</h3>
<table>
<tr><th>Variable</th><th>Required</th><th>Purpose</th></tr>
<tr><td><code>NEXT_PUBLIC_SANITY_PROJECT_ID</code></td><td>Yes</td><td>Sanity project ID for blog CMS</td></tr>
<tr><td><code>NEXT_PUBLIC_SANITY_DATASET</code></td><td>Yes</td><td>Sanity dataset (production)</td></tr>
<tr><td><code>NEXT_PUBLIC_SANITY_API_VERSION</code></td><td>Yes</td><td>Sanity API version</td></tr>
<tr><td><code>NEXT_PUBLIC_POSTHOG_KEY</code></td><td>No</td><td>PostHog analytics key</td></tr>
<tr><td><code>NEXT_PUBLIC_GOOGLE_SCRIPT_CONTACT</code></td><td>Yes</td><td>Google Apps Script URL for forms</td></tr>
<tr><td><code>OPENAI_API_KEY</code></td><td>No</td><td>Server-only: for /api/chat endpoint</td></tr>
</table>

<h3>Static Export Constraints</h3>
<ul>
<li>No server-side rendering (getServerSideProps not available)</li>
<li>Every dynamic route needs <code>generateStaticParams</code></li>
<li>API routes only work on Vercel (not in pure static hosting)</li>
<li>Images are unoptimized (no Next.js Image Optimization API)</li>
</ul>
"""


def generate_setup_html():
    """Generate developer setup guide page."""
    return """
<h2>Developer Setup Guide — NextHire Website</h2>

<h3>Prerequisites</h3>
<ul>
<li>Node.js &ge; 24.0.0</li>
<li>npm (comes with Node.js)</li>
<li>Git</li>
</ul>

<h3>Quick Start</h3>
<ac:structured-macro ac:name="code" ac:schema-version="1">
<ac:parameter ac:name="language">bash</ac:parameter>
<ac:plain-text-body><![CDATA[
# Clone the repo
git clone <repo-url>
cd NextHire-web

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local
# Edit .env.local with your Sanity, PostHog, and Google Script credentials

# Start dev server
npm run dev

# Open http://localhost:3000
]]></ac:plain-text-body>
</ac:structured-macro>

<h3>Available Scripts</h3>
<table>
<tr><th>Command</th><th>Description</th></tr>
<tr><td><code>npm run dev</code></td><td>Start development server (http://localhost:3000)</td></tr>
<tr><td><code>npm run build</code></td><td>Static build to <code>out/</code> directory</td></tr>
<tr><td><code>npm run start</code></td><td>Start production server (rarely used due to static export)</td></tr>
<tr><td><code>npm run lint</code></td><td>Run ESLint checks</td></tr>
<tr><td><code>npm run kill-ports</code></td><td>Kill processes on ports 3000 &amp; 3001</td></tr>
</table>

<h3>Development Rules</h3>
<ol>
<li><strong>No Tailwind</strong> — add styles to <code>globals.css</code> or <code>style.css</code> using the <code>nh-</code> prefix</li>
<li><strong>Legal content lives in <code>legalData.ts</code></strong> — never hardcode policy HTML in page files</li>
<li><strong>Static export</strong> — every dynamic route needs <code>generateStaticParams</code></li>
<li><strong>Color tokens</strong> — use the palette from CLAUDE.md, never arbitrary hex values</li>
<li><strong>Typography tokens</strong> — use <code>typography.ts</code> constants, not raw px values</li>
<li><strong>No new Redux slices</strong> unless state needs cross-component sharing</li>
<li><strong>Forms submit to Google Apps Script</strong> — see <code>/src/lib/forms.ts</code></li>
<li><strong>DualActionCTA</strong> is the standard page-bottom CTA — reuse it</li>
<li><strong><code>.nh-container</code></strong> is the standard inner wrapper for all sections</li>
</ol>

<h3>Adding New Pages</h3>
<ac:structured-macro ac:name="code" ac:schema-version="1">
<ac:parameter ac:name="language">text</ac:parameter>
<ac:plain-text-body><![CDATA[
1. Create src/app/<page-name>/page.tsx
2. Use 'use client' if the page needs interactivity
3. Wrap content in <section> + <div className="nh-container">
4. Add metadata export for SEO
5. Use DualActionCTA at the bottom
6. For dynamic routes, add generateStaticParams
]]></ac:plain-text-body>
</ac:structured-macro>

<h3>Adding Legal Pages</h3>
<ac:structured-macro ac:name="code" ac:schema-version="1">
<ac:parameter ac:name="language">text</ac:parameter>
<ac:plain-text-body><![CDATA[
1. Add entry in src/lib/legalData.ts with slug, title, subtitle, content
2. Create src/app/<slug>/page.tsx using LegalPageShell component
3. The shell handles all layout and styling automatically
]]></ac:plain-text-body>
</ac:structured-macro>

<h3>File Path Aliases</h3>
<table>
<tr><th>Alias</th><th>Path</th></tr>
<tr><td><code>@/*</code></td><td><code>./src/*</code></td></tr>
</table>
"""


# -- Update Engineering Documentation Parent Page -------------------------

def update_root_page_table(root_id):
    """Add NextHire Website to the Engineering Documentation products table."""
    page_id, version = find_page_by_title("Engineering Documentation")
    if not page_id:
        return

    # Fetch current page content
    resp = requests.get(
        f"{BASE_URL}/content/{page_id}",
        params={"expand": "body.storage,version"},
        auth=AUTH,
        headers=HEADERS,
    )
    if resp.status_code != 200:
        print(f"  Could not fetch root page: {resp.status_code}")
        return

    body = resp.json()["body"]["storage"]["value"]
    version_num = resp.json()["version"]["number"]

    # Check if NextHire Website is already in the table
    if "NextHire Website" in body:
        print("  NextHire Website already in root page table")
        return

    # Find the last row before table close and insert new row
    website_row = '<tr><td><strong>NextHire Website</strong></td><td>✅ Production</td><td>Marketing site, blog, pricing, interview prep (Next.js static)</td></tr>'

    # Insert before closing </table> of the products table
    # Look for the pattern after the products table header
    if "</table>" in body:
        # Insert the new row before the first </table>
        body = body.replace(
            "</table>",
            f"{website_row}\n</table>",
            1,  # Only replace the first occurrence (products table)
        )

        update_page(page_id, "Engineering Documentation", body, version_num)
        print("  Added NextHire Website to products table")


# -- Main ------------------------------------------------------------------

def main():
    print("Updating Confluence documentation for NextHire Website...")
    print()

    # Ensure we're in the repo root
    repo_root = Path(__file__).resolve().parent.parent
    os.chdir(repo_root)

    branch, commit = get_git_info()
    print(f"  Branch: {branch}")
    print(f"  Commit: {commit}")
    print()

    # 1. Find root Engineering Documentation page
    print("Finding Engineering Documentation root...")
    root_id, _ = find_page_by_title("Engineering Documentation")
    if not root_id:
        print("  ERROR: Engineering Documentation page not found in space N")
        sys.exit(1)
    print(f"  Found root page ID: {root_id}")

    # 2. Upsert NextHire Website overview
    print("NextHire Website...")
    website_id = upsert_page(
        PAGE_TITLES["website"], generate_overview_html(), root_id
    )

    # 3. Upsert child pages
    print("Architecture Overview — Website...")
    upsert_page(PAGE_TITLES["architecture"], generate_architecture_html(), website_id)

    print("Frontend — Next.js Application — Website...")
    upsert_page(PAGE_TITLES["frontend"], generate_frontend_html(), website_id)

    print("Deployment Guide — Website...")
    upsert_page(PAGE_TITLES["deployment"], generate_deployment_html(), website_id)

    print("Developer Setup Guide — Website...")
    upsert_page(PAGE_TITLES["setup"], generate_setup_html(), website_id)

    # 4. Update root page products table
    print("Updating Engineering Documentation products table...")
    update_root_page_table(root_id)

    print()
    print("Confluence documentation updated successfully!")
    print(f"  View: https://nexthire.atlassian.net/wiki/spaces/{SPACE_KEY}/overview")


if __name__ == "__main__":
    main()
