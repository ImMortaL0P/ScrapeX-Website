export type Tool = {
  slug: string;
  n: string;
  name: string;
  tagline: string;
  blurb: string;
  outputs: string[];
  finds: string[];
  /** Chrome Web Store listing — null until the listing is live. */
  storeUrl: string | null;
};

export const TOOLS: Tool[] = [
  {
    slug: "font-scraper",
    n: "01",
    name: "Font Scraper",
    tagline: "Every typeface a page actually renders",
    blurb:
      "Resolves what the browser really draws — not what the CSS asks for — including the web fonts, their weights, where each one is used and how much of the page it carries. Live specimens in the panel, the whole thing as a workbook.",
    outputs: ["Excel workbook", "Live specimens"],
    finds: ["Rendered families", "@font-face sources", "Weights and styles", "Usage share"],
    storeUrl: null,
  },
  {
    slug: "palette-extractor",
    n: "02",
    name: "Palette Extractor",
    tagline: "The colours a page is built from, weighted by area",
    blurb:
      "Reads every painted surface, clusters the result in CIE Lab so near-identical shades merge the way an eye merges them, and names the six that carry the page. HEX, RGB and CMYK for each.",
    outputs: ["Analysis PNG", "CSS / JSON"],
    finds: ["Dominant six", "Full distribution", "CSS tokens", "Contrast pairs"],
    storeUrl: null,
  },
  {
    slug: "image-sampler",
    n: "03",
    name: "Image Sampler",
    tagline: "Click any image, get its palette and type",
    blurb:
      "Point at a picture anywhere on a page and it returns the colours inside it, the type sitting around it, and the numbers that describe it — brightness, contrast, temperature, colourfulness — as one board you can hand to a client.",
    outputs: ["Sample board PNG"],
    finds: ["Image palette", "Nearby type", "Tone and temperature", "Dimensions"],
    storeUrl: null,
  },
  {
    slug: "document-scraper",
    n: "04",
    name: "Document Scraper",
    tagline: "Every file a page links to, sorted",
    blurb:
      "Finds PDFs, spreadsheets, decks, text files and archives behind links, embeds, viewers and scripts. Each is checked, sized and read for what its format offers — page counts, sheet names, slide counts, rows.",
    outputs: ["ZIP per section", "Individual files"],
    finds: ["PDF · DOCX · XLSX", "PPTX · CSV · TXT", "ZIP · RAR · 7Z", "Viewer-wrapped URLs"],
    storeUrl: null,
  },
  {
    slug: "email-extractor",
    n: "05",
    name: "Email Extractor",
    tagline: "Addresses collected as you browse",
    blurb:
      "Start a session and every page you open adds to one deduped list — including the addresses written as name [at] domain [dot] com, hidden in data attributes, or buried in a script. Named sessions, kept between restarts.",
    outputs: ["Excel workbook", "CSV"],
    finds: ["mailto: links", "Obfuscated forms", "Script and JSON", "HTML entities"],
    storeUrl: null,
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Where does the data go?",
    a: "Nowhere. Every tool runs entirely inside your browser — reading the page, doing the maths, and writing the file locally. There is no account, no server, and no telemetry. Nothing to leak, because nothing is sent.",
  },
  {
    q: "Will it work on a page behind a login?",
    a: "Yes. The tools read the page as you see it, so anything you can open, they can read — an intranet, a client staging site, a dashboard. Files behind a session cookie download the same way.",
  },
  {
    q: "What about pages that block this sort of thing?",
    a: "Chrome keeps its own pages and the Web Store off-limits to every extension, and some sites refuse cross-origin reads. Where a file can't be fetched the tool says so plainly and offers to open it in a tab instead of failing silently.",
  },
  {
    q: "Is scraping addresses legal?",
    a: "Collecting is not the problem; what you do next is. Bulk unsolicited email runs into the DPDP Act in India, and GDPR or CAN-SPAM elsewhere. Finding a contact, auditing your own sites and research are what the tool is for.",
  },
  {
    q: "Why five extensions instead of one?",
    a: "Each asks Chrome for only the permissions its own job needs, and each stays small enough to read end to end. Install the two you want and ignore the rest.",
  },
];
