import { useEffect, useMemo, useState } from "react";

type Page =
  | "Overview"
  | "AI Command Center"
  | "Business Notebook"
  | "Market Research"
  | "Competitors"
  | "Influencer Discovery"
  | "Trending Content"
  | "SEO & ASO"
  | "Content Studio"
  | "AI Avatar Studio"
  | "Voice Studio"
  | "Video Editor"
  | "Content Pipeline"
  | "Audience Simulation"
  | "Content Calendar"
  | "Social Accounts"
  | "Publishing Queue"
  | "Ads Manager"
  | "Analytics"
  | "Growth Intelligence"
  | "Integrations"
  | "Automation Workflows"
  | "Team & Members"
  | "Settings";

const photo = {
  hero: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=900&q=85",
  ava1: "https://images.unsplash.com/photo-1683848644087-c3cb69b77d4f?auto=format&fit=crop&w=500&q=85",
  ava2: "https://images.unsplash.com/photo-1606335543586-137481155deb?auto=format&fit=crop&w=500&q=85",
  ava3: "https://images.unsplash.com/photo-1652550616981-e4dcabc0b489?auto=format&fit=crop&w=500&q=85",
  ava4: "https://images.unsplash.com/photo-1635862649934-4d7f4e46742b?auto=format&fit=crop&w=500&q=85",
  ava5: "https://images.unsplash.com/photo-1708011108776-45ad9e625269?auto=format&fit=crop&w=500&q=85",
};

const nav: { group: string; items: Page[] }[] = [
  { group: "Workspace", items: ["Overview", "AI Command Center", "Business Notebook"] },
  {
    group: "Intelligence",
    items: [
      "Market Research",
      "Competitors",
      "Influencer Discovery",
      "Trending Content",
      "SEO & ASO",
    ],
  },
  {
    group: "Create",
    items: [
      "Content Studio",
      "AI Avatar Studio",
      "Voice Studio",
      "Video Editor",
      "Content Pipeline",
      "Audience Simulation",
    ],
  },
  { group: "Distribute", items: ["Content Calendar", "Social Accounts", "Publishing Queue"] },
  { group: "Grow", items: ["Ads Manager", "Analytics", "Growth Intelligence"] },
  {
    group: "System",
    items: [
      "Integrations",
      "Automation Workflows",
      "Team & Members",
      "Settings",
    ],
  },
];

const icons: Record<string, string> = {
  Overview: "M3 12h8V3H3v9Zm10 9h8v-7h-8v7Zm0-18v9h8V3h-8ZM3 21h8v-7H3v7Z",
  "AI Command Center":
    "M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Zm7 13 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z",
  "Business Notebook": "M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2V3Zm4 0v18M12 8h4M12 12h4",
  "Market Research": "M4 19V9m6 10V5m6 14v-7m5 7H2",
  Competitors: "M4 20v-9l4-3 4 3v9M2 20h20M14 20V5l4-2 4 2v15M7 13h2m-2 3h2m8-8h2m-2 4h2",
  "Influencer Discovery":
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10-3v6m3-3h-6",
  "Trending Content":
    "M13 2s1 4-2 7c-2 2-2 5 1 7 0-3 2-4 4-5 2 2 3 4 2 7-1 3-4 4-7 4-5 0-9-4-9-9 0-4 2-7 6-10 0 3 1 5 5 6",
  "SEO & ASO": "M11 19a8 8 0 1 1 5.7-2.3L22 22m-11-7v-4m0-4h.01",
  "Content Studio": "M4 20h16M6 16 17 5l2 2L8 18H6v-2Zm9-9 2 2",
  "AI Avatar Studio": "M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM3 21a9 9 0 0 1 18 0M18 8h4m-2-2v4",
  "Voice Studio":
    "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Zm-7 9v1a7 7 0 0 0 14 0v-1m-7 8v3m-4 0h8",
  "Video Editor": "M3 5h18v14H3V5Zm6 4 6 3-6 3V9Z",
  "Content Pipeline": "M5 6h14M5 12h9m-9 6h14M3 6h.01M3 12h.01M3 18h.01",
  "Audience Simulation":
    "M7 20a5 5 0 0 1 10 0M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm6-9 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z",
  "Content Calendar": "M4 5h16v16H4V5Zm0 5h16M8 3v4m8-4v4",
  "Social Accounts":
    "M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM8 12l4 3m0-6 4-3",
  "Publishing Queue": "M5 4h14v4H5V4Zm0 6h14v4H5v-4Zm0 6h9v4H5v-4Zm12 1 2 2 3-4",
  "Ads Manager": "M3 11v2l13 5V6L3 11Zm13-1 4-2v8l-4-2M6 14v6h4v-4",
  Analytics: "M4 19V9m5 10V5m5 14v-7m5 7V3",
  "Growth Intelligence": "M3 20 9 14l4 3 8-10m-5 0h5v5",
  Integrations: "M8 12h8M12 8v8M7 3v4H3m14-4v4h4M7 21v-4H3m14 4v-4h4",
  "Automation Workflows":
    "M5 5h6v6H5V5Zm8 8h6v6h-6v-6Zm-2-5h4a2 2 0 0 1 2 2v3M8 11v4a2 2 0 0 0 2 2h3",
  "Team & Members":
    "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10.5 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  Settings:
    "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8-3.5 2-1-2-3-2 .5-1.5-1L16 5l-3-2-1 2h-2L9 3 6 5l.5 2.5-1.5 1L3 8l-2 3 2 1v2l-2 1 2 3 2-.5 1.5 1L6 21l3 2 1-2h2l1 2 3-2-.5-2.5 1.5-1 2 .5 2-3-2-1v-2Z",
};

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const path = icons[name] || "M12 2v20M2 12h20";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={path.includes("M3 12h8") ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button className={`btn ${variant} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function Badge({ children, tone = "mint" }: { children: React.ReactNode; tone?: string }) {
  return (
    <span className={`badge ${tone}`}>
      <i />
      {children}
    </span>
  );
}

function Sparkline({
  color = "#72e6bd",
  values = [8, 18, 13, 29, 24, 43, 37, 58, 54, 71],
}: {
  color?: string;
  values?: number[];
}) {
  const max = Math.max(...values);
  const pts = values
    .map((v, i) => `${(i / (values.length - 1)) * 100},${38 - (v / max) * 34}`)
    .join(" ");
  return (
    <svg className="spark" viewBox="0 0 100 40" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`g${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={color} stopOpacity=".26" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,40 ${pts} 100,40`} fill={`url(#g${color.replace("#", "")})`} />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.7"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Toast({ text }: { text: string }) {
  return (
    <div className="toast">
      <span className="check">✓</span>
      <div>
        <b>Action completed</b>
        <span>{text}</span>
      </div>
    </div>
  );
}

function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [analyzing, setAnalyzing] = useState(0);
  const [name, setName] = useState("LevelUp AI Coach");
  const [url, setUrl] = useState("https://www.levelup-ai.coach");
  const steps = [
    "Welcome",
    "Business",
    "Products",
    "Objectives",
    "Channels",
    "Brand assets",
    "Analysis",
  ];
  const products = [
    "Website",
    "Web application",
    "Android application",
    "iOS application",
    "Physical products",
    "Services",
  ];
  const objectives = [
    "Increase website traffic",
    "Improve SEO",
    "Improve ASO",
    "Increase app downloads",
    "Grow social media",
    "Generate leads",
    "Create video content",
    "Build brand awareness",
  ];
  const channels = ["Instagram", "TikTok", "Facebook", "YouTube", "LinkedIn", "X"];
  const analysis = [
    "Analyzing website",
    "Understanding business",
    "Discovering competitors",
    "Researching keywords",
    "Analyzing social presence",
    "Discovering content opportunities",
    "Building business intelligence",
  ];
  const [selectedProducts, setSelectedProducts] = useState([
    "Website",
    "Web application",
    "Android application",
    "iOS application",
  ]);
  const [selectedObjectives, setSelectedObjectives] = useState([
    "Increase app downloads",
    "Grow social media",
    "Create video content",
    "Build brand awareness",
  ]);
  const [selectedChannels, setSelectedChannels] = useState(["Instagram", "TikTok", "YouTube"]);

  useEffect(() => {
    if (step !== 6 || analyzing >= 7) return;
    const id = setTimeout(() => setAnalyzing((v) => v + 1), 650);
    return () => clearTimeout(id);
  }, [step, analyzing]);

  const toggle = (v: string, list: string[], setList: (v: string[]) => void) =>
    setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  return (
    <div className="onboard">
      <div className="onboard-brand">
        <div className="logo-mark">
          <span />
        </div>
        <b>Marketing OS</b>
        <span className="demo-label">Interactive demo</span>
      </div>
      <div className="onboard-grid">
        <aside className="onboard-aside">
          <div>
            <span className="eyebrow">Workspace setup</span>
            <h2>Build your business intelligence.</h2>
            <p>
              Marketing OS turns your website, goals, and brand into a shared source of truth for
              every marketing agent.
            </p>
          </div>
          <div className="step-list">
            {steps.map((s, i) => (
              <div
                className={`step-row ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}
                key={s}
              >
                <span>{i < step ? "✓" : i + 1}</span>
                {s}
              </div>
            ))}
          </div>
          <p className="legal">
            All research and performance shown in this prototype is fictional demo data.
          </p>
        </aside>
        <main className="onboard-main">
          <div className="onboard-head">
            <span>Step {step + 1} of 7</span>
            <div className="progress">
              <i style={{ width: `${((step + 1) / 7) * 100}%` }} />
            </div>
          </div>
          {step === 0 && (
            <div className="welcome-panel">
              <div className="orb">
                <div className="logo-mark big">
                  <span />
                </div>
              </div>
              <Badge>Intelligence first</Badge>
              <h1>
                Your marketing department,
                <br />
                <em>finally connected.</em>
              </h1>
              <p>
                We’ll analyze your business and create one intelligent workspace for research,
                content, distribution, and growth.
              </p>
              <div className="mini-agents">
                <span>Research</span>
                <i>→</i>
                <span>Strategy</span>
                <i>→</i>
                <span>Creative</span>
                <i>→</i>
                <span>Growth</span>
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="form-panel">
              <span className="eyebrow">Tell us about your business</span>
              <h1>Start with the essentials.</h1>
              <p>We’ll use this to establish your permanent Business Notebook.</p>
              <div className="field-grid">
                <label>
                  <span>Business name</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                  <span>Website URL</span>
                  <input value={url} onChange={(e) => setUrl(e.target.value)} />
                </label>
                <label>
                  <span>Industry</span>
                  <select>
                    <option>Health, fitness & self-improvement</option>
                    <option>SaaS</option>
                  </select>
                </label>
                <label>
                  <span>Company size</span>
                  <select>
                    <option>2–10 people</option>
                    <option>Solo founder</option>
                  </select>
                </label>
                <label className="wide">
                  <span>Business description</span>
                  <textarea defaultValue="An AI-powered self-improvement platform focused on fitness, appearance, nutrition, habits and personal growth." />
                </label>
                <label>
                  <span>Business location</span>
                  <input defaultValue="London, United Kingdom" />
                </label>
                <label>
                  <span>Target countries</span>
                  <input defaultValue="USA, UK, Canada, Australia" />
                </label>
              </div>
            </div>
          )}
          {step === 2 && (
            <ChoiceStep
              eyebrow="Product presence"
              title="Where does LevelUp live?"
              text="Select every product surface we should analyze."
              options={products}
              selected={selectedProducts}
              toggle={(v) => toggle(v, selectedProducts, setSelectedProducts)}
            />
          )}
          {step === 3 && (
            <ChoiceStep
              eyebrow="Marketing objectives"
              title="What are we growing?"
              text="Your objectives shape the first intelligence report and recommendations."
              options={objectives}
              selected={selectedObjectives}
              toggle={(v) => toggle(v, selectedObjectives, setSelectedObjectives)}
            />
          )}
          {step === 4 && (
            <ChoiceStep
              eyebrow="Distribution"
              title="Choose your priority channels."
              text="Nothing will be connected or published without your authorization."
              options={channels}
              selected={selectedChannels}
              toggle={(v) => toggle(v, selectedChannels, setSelectedChannels)}
            />
          )}
          {step === 5 && (
            <div className="form-panel">
              <span className="eyebrow">Brand assets</span>
              <h1>Bring your brand with you.</h1>
              <p>Upload references now or add them later in your Business Notebook.</p>
              <div className="upload-zone">
                <Icon name="Business Notebook" size={28} />
                <b>Drop brand files here</b>
                <span>Logo, screenshots, guidelines, videos or marketing materials</span>
                <Button variant="secondary">Browse files</Button>
              </div>
              <div className="upload-list">
                <div>
                  <div className="file-type">PDF</div>
                  <span>
                    <b>LevelUp brand guidelines</b>
                    <small>2.4 MB · Demo file</small>
                  </span>
                  <strong>✓</strong>
                </div>
                <div>
                  <div className="file-type mint">PNG</div>
                  <span>
                    <b>LevelUp app icon</b>
                    <small>148 KB · Demo file</small>
                  </span>
                  <strong>✓</strong>
                </div>
              </div>
            </div>
          )}
          {step === 6 && (
            <div className="analysis-panel">
              <Badge tone={analyzing === 7 ? "mint" : "blue"}>
                {analyzing === 7 ? "Analysis complete" : "Intelligence engine active"}
              </Badge>
              <h1>
                {analyzing === 7 ? "Your workspace is ready." : "Building LevelUp intelligence…"}
              </h1>
              <p>
                {analyzing === 7
                  ? "We found 7 competitors, 42 keyword opportunities, and 18 content formats to explore."
                  : "We are turning your public business information into structured context."}
              </p>
              <div className="analysis-list">
                {analysis.map((s, i) => (
                  <div
                    className={`${i < analyzing ? "done" : i === analyzing ? "running" : ""}`}
                    key={s}
                  >
                    <span>
                      {i < analyzing ? "✓" : i === analyzing ? <i className="spinner" /> : i + 1}
                    </span>
                    <b>{s}</b>
                    <small>
                      {i < analyzing
                        ? [
                            "12 pages mapped",
                            "5 customer needs found",
                            "7 relevant brands found",
                            "42 opportunities found",
                            "3 priority channels",
                            "18 formats found",
                            "Notebook ready",
                          ][i]
                        : i === analyzing
                          ? "Processing demo data…"
                          : "Waiting"}
                    </small>
                  </div>
                ))}
              </div>
              <div className="demo-note">
                Simulated analysis for prototype demonstration. No live website or social data was
                retrieved.
              </div>
            </div>
          )}
          <div className="onboard-actions">
            {step > 0 && step < 6 && (
              <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            )}
            <div className="spacer" />
            {step < 6 && (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 1 && (!name || !url)}
              >
                {step === 5 ? "Start analysis" : step === 0 ? "Build my workspace" : "Continue"}{" "}
                <span>→</span>
              </Button>
            )}
            {step === 6 && analyzing === 7 && (
              <Button onClick={onComplete}>
                Enter workspace <span>→</span>
              </Button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function ChoiceStep({
  eyebrow,
  title,
  text,
  options,
  selected,
  toggle,
}: {
  eyebrow: string;
  title: string;
  text: string;
  options: string[];
  selected: string[];
  toggle: (v: string) => void;
}) {
  return (
    <div className="form-panel">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
      <div className="choice-grid">
        {options.map((o, i) => (
          <button
            key={o}
            onClick={() => toggle(o)}
            className={selected.includes(o) ? "selected" : ""}
          >
            <span className="choice-icon">
              <Icon
                name={
                  [
                    "Overview",
                    "Content Studio",
                    "AI Command Center",
                    "Analytics",
                    "SEO & ASO",
                    "Growth Intelligence",
                  ][i % 6]
                }
              />
            </span>
            <b>{o}</b>
            <i>{selected.includes(o) ? "✓" : "+"}</i>
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [onboarded, setOnboarded] = useState(() => localStorage.getItem("mos-onboarded") === "yes");
  const [page, setPage] = useState<Page>("Overview");
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(
    () => (localStorage.getItem("mos-theme") as "dark" | "light") || "dark",
  );
  const [toast, setToast] = useState("");
  const [published, setPublished] = useState(() => localStorage.getItem("mos-published") === "yes");
  const [approved, setApproved] = useState(() => localStorage.getItem("mos-approved") === "yes");
  const [commandOpen, setCommandOpen] = useState(false);

  const go = (p: Page) => {
    setPage(p);
    setMobile(false);
    window.scrollTo(0, 0);
  };
  const notify = (s: string) => {
    setToast(s);
    setTimeout(() => setToast(""), 2800);
  };
  const complete = () => {
    localStorage.setItem("mos-onboarded", "yes");
    setOnboarded(true);
  };
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("mos-theme", theme);
  }, [theme]);

  if (!onboarded) return <Onboarding onComplete={complete} />;
  return (
    <div className={`app ${collapsed ? "is-collapsed" : ""}`}>
      <aside className={`sidebar ${mobile ? "mobile-open" : ""}`}>
        <div className="brand-row">
          <button className="brand" onClick={() => go("Overview")}>
            <div className="logo-mark">
              <span />
            </div>
            {!collapsed && <b>Marketing OS</b>}
          </button>
          <button className="collapse" onClick={() => setCollapsed(!collapsed)}>
            ‹
          </button>
        </div>
        {!collapsed && (
          <button className="workspace-switch">
            <div className="workspace-logo">LU</div>
            <span>
              <b>LevelUp AI Coach</b>
              <small>Founder workspace</small>
            </span>
            <i>⌄</i>
          </button>
        )}
        <nav>
          {nav.map((g) => (
            <div className="nav-group" key={g.group}>
              {!collapsed && <label>{g.group}</label>}
              {g.items.map((item) => (
                <button
                  title={item}
                  key={item}
                  className={page === item ? "active" : ""}
                  onClick={() => go(item)}
                >
                  <Icon name={item} />
                  {!collapsed && <span>{item}</span>}
                  {item === "Publishing Queue" && !collapsed && <em>{published ? 1 : 3}</em>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-foot">
          <button onClick={() => go("Settings")}>
            <div className="avatar">AM</div>
            {!collapsed && (
              <span>
                <b>Alex Morgan</b>
                <small>Founder · Pro plan</small>
              </span>
            )}
          </button>
        </div>
      </aside>
      <div className="shell">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobile(!mobile)}>
            ☰
          </button>
          <div className="crumb">
            <span>LevelUp</span>
            <i>/</i>
            <b>{page}</b>
          </div>
          <button className="global-search" onClick={() => setCommandOpen(true)}>
            <span>⌕</span> Search anything… <kbd>⌘ K</kbd>
          </button>
          <div className="top-actions">
            <button className="credit" onClick={() => go("Settings")}>
              <span>◈</span>
              <b>6,420</b>
              <small>credits</small>
            </button>
            <button
              title="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "☼" : "◐"}
            </button>
            <button className="notification">
              ○<i />
            </button>
            <button className="top-avatar">AM</button>
          </div>
        </header>
        <main className="content">
          <PageView
            page={page}
            go={go}
            notify={notify}
            approved={approved}
            setApproved={(v) => {
              setApproved(v);
              localStorage.setItem("mos-approved", v ? "yes" : "no");
            }}
            published={published}
            setPublished={(v) => {
              setPublished(v);
              localStorage.setItem("mos-published", v ? "yes" : "no");
            }}
          />
        </main>
      </div>
      {toast && <Toast text={toast} />}
      {commandOpen && <CommandPalette close={() => setCommandOpen(false)} go={go} />}
    </div>
  );
}

function CommandPalette({ close, go }: { close: () => void; go: (p: Page) => void }) {
  return (
    <div className="modal-backdrop" onMouseDown={close}>
      <div className="command-palette" onMouseDown={(e) => e.stopPropagation()}>
        <div className="command-input">
          <Icon name="AI Command Center" />
          <input autoFocus placeholder="Ask Marketing OS or search…" />
          <kbd>ESC</kbd>
        </div>
        <div className="command-content">
          <label>Suggested actions</label>
          {[
            "Create a 14-day content campaign",
            "Run a new SEO audit",
            "Analyze competitor content",
            "Generate a short-form video",
          ].map((x, i) => (
            <button
              key={x}
              onClick={() => {
                close();
                go(
                  i === 1
                    ? "SEO & ASO"
                    : i === 2
                      ? "Competitors"
                      : i === 3
                        ? "Content Studio"
                        : "AI Command Center",
                );
              }}
            >
              <Icon name={["Content Calendar", "SEO & ASO", "Competitors", "Video Editor"][i]} />
              <span>
                <b>{x}</b>
                <small>Uses your LevelUp Business Notebook</small>
              </span>
              <i>→</i>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageView(props: {
  page: Page;
  go: (p: Page) => void;
  notify: (s: string) => void;
  approved: boolean;
  setApproved: (v: boolean) => void;
  published: boolean;
  setPublished: (v: boolean) => void;
}) {
  const { page } = props;
  if (page === "Overview") return <Overview {...props} />;
  if (page === "AI Command Center") return <CommandCenter {...props} />;
  if (page === "Business Notebook") return <Notebook {...props} />;
  if (page === "Competitors" || page === "Market Research") return <Competitors {...props} />;
  if (page === "Influencer Discovery") return <Influencers {...props} />;
  if (page === "Trending Content") return <Trends {...props} />;
  if (page === "SEO & ASO") return <Seo {...props} />;
  if (page === "Content Studio") return <ContentStudio {...props} />;
  if (page === "AI Avatar Studio") return <Avatars {...props} />;
  if (page === "Voice Studio") return <VoiceStudio {...props} />;
  if (page === "Video Editor") return <VideoEditor {...props} />;
  if (page === "Content Pipeline") return <Pipeline {...props} />;
  if (page === "Audience Simulation") return <AudienceLab {...props} />;
  if (page === "Content Calendar") return <Calendar {...props} />;
  if (page === "Social Accounts") return <Social {...props} />;
  if (page === "Publishing Queue") return <Queue {...props} />;
  if (page === "Ads Manager") return <Ads {...props} />;
  if (page === "Analytics" || page === "Growth Intelligence") return <Analytics {...props} />;
  if (page === "Integrations") return <Integrations {...props} />;
  if (page === "Automation Workflows") return <Automations {...props} />;
  if (page === "Team & Members" || page === "Settings") return <Settings {...props} />;
  return null;
}

type P = {
  go: (p: Page) => void;
  notify: (s: string) => void;
  approved: boolean;
  setApproved: (v: boolean) => void;
  published: boolean;
  setPublished: (v: boolean) => void;
};
function PageHeader({
  eyebrow,
  title,
  copy,
  actions,
}: {
  eyebrow?: string;
  title: string;
  copy: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="page-head">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      {actions && <div className="head-actions">{actions}</div>}
    </div>
  );
}

function Overview({ go }: P) {
  const metrics = [
    ["Total reach", "284.7K", "+18.4%", "#72e6bd"],
    ["Organic traffic", "48,291", "+12.7%", "#8d9eff"],
    ["Video views", "196.4K", "+24.1%", "#e9b76e"],
    ["Conversions", "1,284", "+9.6%", "#d58cff"],
  ];
  return (
    <>
      <div className="overview-hero">
        <div>
          <Badge>Workspace intelligence active</Badge>
          <h1>Good morning, Alex.</h1>
          <p>LevelUp is growing. Here’s what your marketing system learned this week.</p>
        </div>
        <div className="hero-actions">
          <Button variant="secondary" onClick={() => go("Analytics")}>
            View report
          </Button>
          <Button onClick={() => go("AI Command Center")}>
            <Icon name="AI Command Center" size={16} /> Ask Marketing AI
          </Button>
        </div>
      </div>
      <div className="metric-grid">
        {metrics.map((m, i) => (
          <div className="metric-card" key={m[0]}>
            <div>
              <span>{m[0]}</span>
              <Badge>{m[2]}</Badge>
            </div>
            <strong>{m[1]}</strong>
            <Sparkline
              color={m[3]}
              values={[5, 18, 12 + i * 2, 29, 23, 38 + i * 3, 34, 48, 45, 62 + i * 4]}
            />
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <section className="card growth-card">
          <CardTitle
            title="Growth overview"
            copy="Cross-channel performance"
            action="Last 30 days"
          />
          <div className="chart-legend">
            <span>
              <i className="mint" />
              Total reach
            </span>
            <span>
              <i className="purple" />
              Engagement
            </span>
          </div>
          <GrowthChart />
        </section>
        <section className="card recommendation">
          <div className="rec-icon">
            <Icon name="Growth Intelligence" />
          </div>
          <Badge>Growth Intelligence</Badge>
          <h3>Educational content is your growth lever.</h3>
          <p>
            How-to videos generated <b>2.4× more profile visits</b> than product-led posts in the
            last 30 days.
          </p>
          <div className="evidence">
            <span>+142%</span>
            <small>profile visits</small>
            <span>3.8%</span>
            <small>avg. CTR</small>
          </div>
          <Button onClick={() => go("Growth Intelligence")}>Create an experiment →</Button>
        </section>
        <section className="card activity-card">
          <CardTitle title="Live activity" copy="Agents and automations" action="View all" />
          {[
            ["Research Agent", "Completed competitor watch", "2m"],
            ["Creative Agent", "Rendering “5 habits” video", "Now"],
            ["SEO Agent", "Found 8 keyword opportunities", "18m"],
            ["Publisher", "Queued 3 posts for review", "1h"],
          ].map((a, i) => (
            <div className="activity" key={a[0]}>
              <span className={`agent a${i}`}>
                <Icon
                  name={["Competitors", "Content Studio", "SEO & ASO", "Publishing Queue"][i]}
                  size={15}
                />
              </span>
              <div>
                <b>{a[0]}</b>
                <p>{a[1]}</p>
              </div>
              <small>{a[2]}</small>
            </div>
          ))}
        </section>
        <section className="card upcoming">
          <CardTitle
            title="Upcoming content"
            copy="Your next scheduled posts"
            action="Open calendar"
          />
          {[
            ["Today · 6:30 PM", "3 habits ruining your progress", "Instagram", "ready"],
            ["Tomorrow · 9:00 AM", "The 2-minute reset method", "TikTok", "review"],
            ["Thu · 12:00 PM", "Your weekly LevelUp guide", "LinkedIn", "draft"],
          ].map((x, i) => (
            <button className="upcoming-row" onClick={() => go("Content Calendar")} key={x[1]}>
              <div className={`post-thumb p${i}`}>
                <span>{i === 0 ? "▶" : "Aa"}</span>
              </div>
              <div>
                <small>{x[0]}</small>
                <b>{x[1]}</b>
                <span>{x[2]}</span>
              </div>
              <Badge tone={x[3]}>{x[3]}</Badge>
            </button>
          ))}
        </section>
      </div>
      <section className="quick-section">
        <CardTitle title="Move work forward" copy="Start with a focused action" />
        <div className="quick-grid">
          {[
            ["Research competitors", "Find positioning gaps", "Competitors"],
            ["Create a short video", "From script to render", "Content Studio"],
            ["Run SEO audit", "Find technical wins", "SEO & ASO"],
            ["Build a campaign", "Plan 14 days of content", "AI Command Center"],
          ].map((x) => (
            <button key={x[0]} onClick={() => go(x[2] as Page)}>
              <span>
                <Icon name={x[2]} />
              </span>
              <b>{x[0]}</b>
              <small>{x[1]}</small>
              <i>↗</i>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function CardTitle({ title, copy, action }: { title: string; copy?: string; action?: string }) {
  return (
    <div className="card-title">
      <div>
        <h3>{title}</h3>
        {copy && <p>{copy}</p>}
      </div>
      {action && (
        <button>
          {action} <span>⌄</span>
        </button>
      )}
    </div>
  );
}

function GrowthChart() {
  return (
    <div className="growth-chart">
      <div className="yaxis">
        <span>300K</span>
        <span>200K</span>
        <span>100K</span>
        <span>0</span>
      </div>
      <svg viewBox="0 0 800 220" preserveAspectRatio="none">
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#72e6bd" stopOpacity=".23" />
            <stop offset="1" stopColor="#72e6bd" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="grid-lines">
          <path d="M0 20H800M0 80H800M0 140H800M0 200H800" />
        </g>
        <path
          className="area"
          d="M0 180 C70 165 85 170 145 145 S245 150 300 112 400 125 455 90 550 110 610 68 730 70 800 33 L800 220H0Z"
        />
        <path
          className="line-main"
          d="M0 180 C70 165 85 170 145 145 S245 150 300 112 400 125 455 90 550 110 610 68 730 70 800 33"
        />
        <path
          className="line-second"
          d="M0 198 C80 188 120 192 170 170 S280 185 335 155 450 164 510 137 640 146 700 114 760 120 800 98"
        />
      </svg>
      <div className="xaxis">
        <span>May 1</span>
        <span>May 7</span>
        <span>May 14</span>
        <span>May 21</span>
        <span>May 30</span>
      </div>
    </div>
  );
}

function CommandCenter({ go, notify }: P) {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const stages = [
    "Research market & competitors",
    "Identify 14 content opportunities",
    "Generate scripts & storyboards",
    "Produce video assets",
    "Run quality evaluations",
    "Prepare publishing calendar",
  ];
  useEffect(() => {
    if (!running || progress >= 6) return;
    const id = setTimeout(() => setProgress((p) => p + 1), 700);
    return () => clearTimeout(id);
  }, [running, progress]);
  return (
    <>
      <PageHeader
        eyebrow="Central orchestration"
        title="AI Command Center"
        copy="Describe the outcome. Marketing OS plans the work, coordinates agents, and asks before critical actions."
        actions={<Button variant="secondary">New conversation</Button>}
      />
      <div className="command-layout">
        <aside className="conversation-list">
          <button className="active">
            <b>14-day growth campaign</b>
            <small>In progress · 6 agents</small>
          </button>
          <button>
            <b>Q2 SEO opportunities</b>
            <small>Completed yesterday</small>
          </button>
          <button>
            <b>Competitor content review</b>
            <small>Completed May 24</small>
          </button>
        </aside>
        <section className="ai-chat card">
          <div className="ai-context">
            <div className="logo-mark">
              <span />
            </div>
            <span>
              <b>Marketing AI</b>
              <small>LevelUp business context connected</small>
            </span>
            <Badge>6 agents available</Badge>
          </div>
          <div className="chat-thread">
            <div className="user-msg">
              Create a 14-day Instagram and TikTok campaign for LevelUp. Research competitors, find
              relevant formats, generate videos, and prepare everything for approval.
            </div>
            <div className="ai-msg">
              <span className="ai-avatar">
                <Icon name="AI Command Center" />
              </span>
              <div>
                <p>
                  I’ve mapped this request to your current goals: app downloads, brand awareness,
                  and social growth. Here is the proposed execution plan.
                </p>
                <div className="plan-card">
                  <div className="plan-head">
                    <b>LevelUp · 14-day social growth sprint</b>
                    <Badge tone={running ? (progress === 6 ? "mint" : "blue") : "draft"}>
                      {running ? (progress === 6 ? "Complete" : "Executing") : "Ready to run"}
                    </Badge>
                  </div>
                  {stages.map((s, i) => (
                    <div
                      className={`plan-step ${i < progress ? "done" : i === progress && running ? "running" : ""}`}
                      key={s}
                    >
                      <span>{i < progress ? "✓" : i + 1}</span>
                      <b>{s}</b>
                      <small>
                        {i < progress
                          ? "Complete"
                          : i === progress && running
                            ? "Agent working…"
                            : [
                                "Research Agent",
                                "Strategy Agent",
                                "Script + Storyboard",
                                "Creative Agent",
                                "Quality Agents",
                                "Publishing Agent",
                              ][i]}
                      </small>
                    </div>
                  ))}
                  <div className="plan-meta">
                    <span>
                      <small>Estimated cost</small>
                      <b>1,240 credits</b>
                    </span>
                    <span>
                      <small>Approval gates</small>
                      <b>2 required</b>
                    </span>
                    <span>
                      <small>Expected time</small>
                      <b>~18 minutes</b>
                    </span>
                  </div>
                </div>
                {!running && (
                  <div className="permission">
                    <b>Permission check</b>
                    <p>
                      May create draft assets and calendar entries. Publishing remains disabled
                      until explicit approval.
                    </p>
                  </div>
                )}
                {progress === 6 && (
                  <div className="result-links">
                    <button onClick={() => go("Content Pipeline")}>
                      14 content projects <span>→</span>
                    </button>
                    <button onClick={() => go("Content Calendar")}>
                      Draft calendar <span>→</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="chat-compose">
            <textarea
              placeholder="Ask Marketing OS to plan or execute a growth task…"
              defaultValue=""
            />
            <div>
              <span>＋ Attach</span>
              <span className="context-pill">LevelUp context</span>
              <Button
                onClick={() => {
                  setRunning(true);
                  notify("Workflow started with draft-only permissions");
                }}
              >
                {running ? "Running…" : "Run plan"} <span>↑</span>
              </Button>
            </div>
          </div>
        </section>
        <aside className="run-panel">
          <CardTitle title="Execution" copy="Live activity" />
          <div className="run-stat">
            <span>{progress}/6</span>
            <small>stages complete</small>
            <div className="progress">
              <i style={{ width: `${(progress / 6) * 100}%` }} />
            </div>
          </div>
          <label>Running agents</label>
          {["Research", "Strategy", "Creative", "Quality"].map((x, i) => (
            <div className="agent-row" key={x}>
              <span
                className={running && i === Math.min(3, Math.floor(progress / 1.5)) ? "live" : ""}
              />
              <b>{x} Agent</b>
              <small>{i * 2 + 1} tools</small>
            </div>
          ))}
          <label>Safety controls</label>
          <div className="safety">
            <span>✓</span>
            <p>
              <b>Human approval enforced</b>
              <small>Publishing and spend require review.</small>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

function Notebook({ notify }: P) {
  const [section, setSection] = useState("Business Profile");
  const sections = [
    "Business Profile",
    "Brand Identity",
    "Products",
    "Target Audience",
    "Customer Personas",
    "Brand Voice",
    "Marketing Objectives",
    "SEO Strategy",
    "Content History",
    "Uploaded Assets",
  ];
  return (
    <>
      <PageHeader
        eyebrow="Shared business memory"
        title="Business Notebook"
        copy="One structured source of truth used by every Marketing OS agent."
        actions={
          <>
            <Button variant="secondary">Import knowledge</Button>
            <Button onClick={() => notify("Business Notebook saved")}>Save changes</Button>
          </>
        }
      />
      <div className="notebook-layout">
        <aside className="notebook-nav">
          <div className="knowledge-search">
            ⌕ <input placeholder="Search knowledge…" />
          </div>
          {sections.map((s) => (
            <button className={section === s ? "active" : ""} onClick={() => setSection(s)} key={s}>
              {s}
              <span>›</span>
            </button>
          ))}
        </aside>
        <section className="notebook-page card">
          {section === "Brand Voice" ? (
            <BrandVoice />
          ) : (
            <>
              <div className="notebook-title">
                <div className="workspace-logo large">LU</div>
                <div>
                  <h2>{section}</h2>
                  <p>Last enriched by Business Intelligence · 3 days ago</p>
                </div>
                <Badge>Agent ready</Badge>
              </div>
              <div className="intel-banner">
                <Icon name="AI Command Center" />
                <span>
                  <b>Used by 8 active agents</b>
                  <p>
                    This knowledge informs research, copy, creative direction, and audience
                    targeting.
                  </p>
                </span>
                <button>View access</button>
              </div>
              <div className="form-grid">
                <label>
                  <span>Business name</span>
                  <input defaultValue="LevelUp AI Coach" />
                </label>
                <label>
                  <span>Industry</span>
                  <input defaultValue="Self-improvement technology" />
                </label>
                <label className="wide">
                  <span>Positioning</span>
                  <textarea defaultValue="The personal growth operating system that turns everyday goals into an adaptive, achievable plan." />
                </label>
                <label className="wide">
                  <span>Core value proposition</span>
                  <textarea defaultValue="One AI coach for fitness, nutrition, appearance, habits and personal growth—personalized around the whole person." />
                </label>
                <label>
                  <span>Primary market</span>
                  <input defaultValue="United States, United Kingdom" />
                </label>
                <label>
                  <span>Business model</span>
                  <input defaultValue="Freemium mobile subscription" />
                </label>
              </div>
              <div className="insight-list">
                <h3>Structured intelligence</h3>
                {[
                  [
                    "Customer need",
                    "People want one adaptive plan instead of disconnected wellness apps.",
                  ],
                  [
                    "Key differentiator",
                    "Cross-domain coaching that learns from progress across every goal.",
                  ],
                  [
                    "Proof direction",
                    "Daily plans, visible streaks, and personalized course correction.",
                  ],
                ].map((x) => (
                  <div key={x[0]}>
                    <span>{x[0]}</span>
                    <p>{x[1]}</p>
                    <button>✎</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
        <aside className="notebook-aside">
          <CardTitle title="Knowledge health" copy="Coverage across core areas" />
          <div className="health-ring">
            <strong>
              86<small>%</small>
            </strong>
          </div>
          {[
            ["Brand context", 94],
            ["Audience", 82],
            ["Products", 91],
            ["Evidence", 68],
          ].map((x) => (
            <div className="health-row" key={x[0]}>
              <span>
                {x[0]}
                <b>{x[1]}%</b>
              </span>
              <div>
                <i style={{ width: `${x[1]}%` }} />
              </div>
            </div>
          ))}
          <button className="add-source">＋ Add knowledge source</button>
        </aside>
      </div>
    </>
  );
}

function BrandVoice() {
  return (
    <>
      <div className="notebook-title">
        <div className="workspace-logo large">Aa</div>
        <div>
          <h2>Brand Voice</h2>
          <p>Controls how every creative agent writes for LevelUp.</p>
        </div>
        <Badge>Applied globally</Badge>
      </div>
      <div className="voice-spectrum">
        <h3>Voice characteristics</h3>
        {[
          ["Encouraging", "Direct", 72],
          ["Expert", "Approachable", 62],
          ["Calm", "Energetic", 68],
          ["Playful", "Serious", 38],
        ].map((x) => (
          <div key={x[0] as string}>
            <span>{x[0]}</span>
            <input type="range" defaultValue={x[2] as number} />
            <span>{x[1]}</span>
          </div>
        ))}
      </div>
      <div className="form-grid">
        <label className="wide">
          <span>Writing style</span>
          <textarea defaultValue="Clear, motivating, and specific. Use short sentences. Make progress feel achievable without oversimplifying the work." />
        </label>
        <label>
          <span>Words we use</span>
          <input defaultValue="level up, momentum, daily win" />
        </label>
        <label>
          <span>Words to avoid</span>
          <input defaultValue="hack, instant, guaranteed" />
        </label>
      </div>
    </>
  );
}

function Competitors({ go, notify }: P) {
  const [selected, setSelected] = useState(0);
  const competitors = [
    [
      "BetterMe",
      "Whole-person wellness",
      "4.8M",
      "Strong paid acquisition",
      "Generic personalization",
    ],
    ["Fabulous", "Habit coaching", "3.2M", "Beautiful behavior design", "Narrow habit focus"],
    ["Freeletics", "AI fitness coach", "2.1M", "Powerful workout engine", "Fitness only"],
    ["Lifesum", "Nutrition tracking", "1.8M", "Large food database", "Manual tracking friction"],
  ];
  return (
    <>
      <PageHeader
        eyebrow="Market intelligence"
        title="Competitive landscape"
        copy="Evidence-backed positioning, content, and keyword intelligence for LevelUp."
        actions={
          <>
            <Button variant="secondary">Export report</Button>
            <Button onClick={() => notify("Competitor scan started")}>
              ＋ Discover competitors
            </Button>
          </>
        }
      />
      <div className="toolbar">
        <div className="tabs">
          <button className="active">
            All competitors <span>7</span>
          </button>
          <button>
            Direct <span>4</span>
          </button>
          <button>
            Indirect <span>3</span>
          </button>
        </div>
        <div className="filter">⌕ Search competitors</div>
        <button className="filter">Market: Global ⌄</button>
      </div>
      <div className="competitor-layout">
        <div className="competitor-table card">
          <div className="table-head">
            <span>Company</span>
            <span>Positioning</span>
            <span>Est. audience</span>
            <span>Opportunity score</span>
          </div>
          {competitors.map((c, i) => (
            <button
              className={selected === i ? "selected" : ""}
              onClick={() => setSelected(i)}
              key={c[0]}
            >
              <span className={`comp-logo c${i}`}>{c[0][0]}</span>
              <span>
                <b>{c[0]}</b>
                <small>{c[1]}</small>
              </span>
              <span>{c[1]}</span>
              <span>{c[2]}</span>
              <span>
                <b>{91 - i * 7}</b>/100
              </span>
            </button>
          ))}
        </div>
        <aside className="competitor-detail card">
          <div className="detail-head">
            <div className={`comp-logo c${selected}`}>{competitors[selected][0][0]}</div>
            <div>
              <h3>{competitors[selected][0]}</h3>
              <span>Direct competitor · Demo profile</span>
            </div>
            <button>•••</button>
          </div>
          <div className="positioning">
            <span>POSITIONING</span>
            <p>{competitors[selected][1]} for people who want guided daily progress.</p>
          </div>
          <div className="sw-grid">
            <div>
              <small>Key strength</small>
              <b>{competitors[selected][3]}</b>
            </div>
            <div>
              <small>Key weakness</small>
              <b>{competitors[selected][4]}</b>
            </div>
          </div>
          <h4>Content strategy</h4>
          {["Transformation stories", "Daily routines", "Coach-led education"].map((x, i) => (
            <div className="strategy-row" key={x}>
              <span>{i + 1}</span>
              <b>{x}</b>
              <small>{[42, 31, 18][i]}%</small>
            </div>
          ))}
          <Button onClick={() => go("Trending Content")}>Explore their content →</Button>
        </aside>
      </div>
      <div className="opportunity-strip">
        <Icon name="Growth Intelligence" />
        <div>
          <Badge>Positioning opportunity</Badge>
          <h3>Own the “whole-person progress system” category.</h3>
          <p>
            Competitors specialize in one dimension. LevelUp can credibly connect fitness,
            appearance, nutrition, and habits.
          </p>
        </div>
        <div className="op-score">
          <strong>92</strong>
          <span>
            opportunity
            <br />
            score
          </span>
        </div>
      </div>
    </>
  );
}

function Influencers({ notify }: P) {
  const creators = [
    ["Maya Chen", "@mayamoves", "Fitness systems", "842K", "5.8%", photo.ava1],
    ["Jordan Hale", "@buildwithjordan", "Self improvement", "614K", "6.2%", photo.ava2],
    ["Noah Brooks", "@noahlevels", "Nutrition", "328K", "7.4%", photo.ava3],
    ["Priya Sol", "@wellwithpriya", "Holistic wellness", "512K", "6.9%", photo.ava4],
  ];
  const [saved, setSaved] = useState<number[]>([1]);
  return (
    <>
      <PageHeader
        eyebrow="Creator intelligence"
        title="Influencer discovery"
        copy="Find creators whose audience, voice, and formats align with LevelUp."
        actions={<Button variant="secondary">Shortlist ({saved.length})</Button>}
      />
      <div className="toolbar">
        <div className="filter wide">⌕ Search creator, niche, or topic…</div>
        {["Platform", "Country", "Audience size", "Engagement"].map((x) => (
          <button className="filter" key={x}>
            {x} ⌄
          </button>
        ))}
      </div>
      <div className="creator-grid">
        {creators.map((c, i) => (
          <article className="creator-card card" key={c[0]}>
            <div className="creator-img">
              <img src={c[5]} alt={`Fictional demo creator ${c[0]}`} />
              <Badge tone="dark">Instagram</Badge>
              <button
                className={saved.includes(i) ? "saved" : ""}
                onClick={() => {
                  setSaved((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
                  notify(
                    saved.includes(i) ? "Removed from shortlist" : "Creator saved to shortlist",
                  );
                }}
              >
                {saved.includes(i) ? "♥" : "♡"}
              </button>
            </div>
            <div className="creator-info">
              <h3>
                {c[0]} <span>✓</span>
              </h3>
              <p>
                {c[1]} · {c[2]}
              </p>
              <div>
                <span>
                  <b>{c[3]}</b>
                  <small>followers</small>
                </span>
                <span>
                  <b>{c[4]}</b>
                  <small>engagement</small>
                </span>
                <span>
                  <b>{94 - i * 3}</b>
                  <small>brand fit</small>
                </span>
              </div>
              <Button variant="secondary" onClick={() => notify("Demo creator profile opened")}>
                View creator
              </Button>
            </div>
          </article>
        ))}
      </div>
      <div className="demo-note">
        Profiles and engagement metrics are fictional and provided only for product demonstration.
      </div>
    </>
  );
}

function Trends({ go }: P) {
  const [detail, setDetail] = useState(false);
  const trends = [
    ["I stopped relying on motivation", "Problem → reset → system", "1.8M", photo.hero],
    ["Three habits that changed my energy", "Listicle transformation", "924K", photo.ava2],
    ["Do this before your morning scroll", "Pattern interrupt", "2.4M", photo.ava4],
    ["The two-minute identity reset", "Micro habit tutorial", "638K", photo.ava3],
  ];
  if (detail)
    return (
      <>
        <button className="back-link" onClick={() => setDetail(false)}>
          ← Back to trending content
        </button>
        <div className="trend-detail">
          <section className="phone-video">
            <img src={photo.hero} alt="Fitness creator demonstrating a workout" />
            <div className="video-overlay">
              <Badge tone="dark">Fictional format analysis</Badge>
              <button>▶</button>
              <h3>
                Stop relying on motivation.
                <br />
                Build a system instead.
              </h3>
            </div>
          </section>
          <section>
            <PageHeader
              eyebrow="Format analysis"
              title="The Motivation Reset"
              copy="A high-retention educational structure for self-improvement audiences."
            />
            <div className="detail-stats">
              <span>
                <b>26s</b>
                <small>duration</small>
              </span>
              <span>
                <b>1.8M</b>
                <small>demo views</small>
              </span>
              <span>
                <b>7.2%</b>
                <small>demo engagement</small>
              </span>
            </div>
            <div className="format-timeline">
              {[
                ["0–3s", "HOOK", "“Motivation is why you keep failing.”"],
                ["3–8s", "TENSION", "Shows the broken cycle in a quick visual."],
                ["8–20s", "SOLUTION", "Introduces one repeatable system."],
                ["20–26s", "CTA", "Invites viewer to start today."],
              ].map((x) => (
                <div key={x[0]}>
                  <span>{x[0]}</span>
                  <b>{x[1]}</b>
                  <p>{x[2]}</p>
                </div>
              ))}
            </div>
            <div className="analysis-tags">
              {[
                "Fast jump cuts",
                "Center captions",
                "Warm contrast",
                "3 B-roll inserts",
                "Low music bed",
              ].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
            <Button onClick={() => go("Content Studio")}>
              Create Similar Format <span>→</span>
            </Button>
            <p className="disclaimer">
              This analysis uses fictional public metrics and does not predict or guarantee
              performance.
            </p>
          </section>
        </div>
      </>
    );
  return (
    <>
      <PageHeader
        eyebrow="Content intelligence"
        title="Trending formats"
        copy="Relevant public content patterns, translated into reusable creative blueprints."
        actions={<Button variant="secondary">Saved formats · 6</Button>}
      />
      <div className="toolbar">
        <div className="tabs">
          <button className="active">For LevelUp</button>
          <button>Fitness</button>
          <button>Self-improvement</button>
          <button>Nutrition</button>
        </div>
        <button className="filter">Last 30 days ⌄</button>
      </div>
      <div className="trend-grid">
        {trends.map((t, i) => (
          <button className="trend-card" onClick={() => setDetail(true)} key={t[0]}>
            <div className="trend-img">
              <img src={t[3]} alt="Demo trending content thumbnail" />
              <span className="platform">◎</span>
              <div className="play">▶</div>
              <small>{24 + i * 3}s</small>
            </div>
            <div>
              <Badge tone="blue">{t[1]}</Badge>
              <h3>{t[0]}</h3>
              <p>Why it fits: Reframes a common frustration into a specific, achievable action.</p>
              <span className="views">
                <b>{t[2]}</b> demo views <i>↗ {6 + i}.4%</i>
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="demo-note">
        Creators, content titles, and performance metrics on this screen are fictional demonstration
        data.
      </div>
    </>
  );
}

function Seo({ notify }: P) {
  const [tab, setTab] = useState<"seo" | "aso">("seo");
  const issues = [
    [
      "Missing structured data",
      "High",
      "Product pages lack SoftwareApplication schema.",
      "Add JSON-LD to 4 product routes.",
    ],
    [
      "Duplicate title tags",
      "Medium",
      "Two pages compete with the same search title.",
      "Create distinct intent-led titles.",
    ],
    [
      "Image weight",
      "Medium",
      "Hero assets delay Largest Contentful Paint.",
      "Serve WebP at responsive sizes.",
    ],
    [
      "Orphaned guide pages",
      "Low",
      "Three useful guides have no internal links.",
      "Link from topic hub and related articles.",
    ],
  ];
  return (
    <>
      <PageHeader
        eyebrow="Search intelligence"
        title="SEO & ASO"
        copy="Technical health, demand signals, and prioritized actions across web and app stores."
        actions={<Button onClick={() => notify("Fresh demo audit queued")}>Run new audit</Button>}
      />
      <div className="large-tabs">
        <button className={tab === "seo" ? "active" : ""} onClick={() => setTab("seo")}>
          Website SEO
        </button>
        <button className={tab === "aso" ? "active" : ""} onClick={() => setTab("aso")}>
          App Store Optimization
        </button>
      </div>
      {tab === "seo" ? (
        <div className="seo-grid">
          <section className="card score-card">
            <div className="score-ring">
              <strong>78</strong>
              <span>SEO health</span>
            </div>
            <div>
              <Badge tone="review">Needs attention</Badge>
              <h2>
                Strong foundation.
                <br />
                12 fixes can unlock growth.
              </h2>
              <p>Technical health increased 6 points since the previous demo audit.</p>
            </div>
          </section>
          <section className="card seo-metrics">
            {[
              ["Search visibility", "18.4%", "+2.8%"],
              ["Ranking keywords", "1,284", "+86"],
              ["Organic visits", "48.2K", "+12.7%"],
            ].map((x) => (
              <div key={x[0]}>
                <span>{x[0]}</span>
                <strong>{x[1]}</strong>
                <small>↗ {x[2]}</small>
              </div>
            ))}
          </section>
          <section className="card audit-table">
            <CardTitle title="Priority audit issues" copy="Ordered by likely business impact" />
            {issues.map((x) => (
              <details key={x[0]}>
                <summary>
                  <span className={`severity ${x[1].toLowerCase()}`} />
                  <b>{x[0]}</b>
                  <Badge tone={x[1].toLowerCase()}>{x[1]}</Badge>
                  <i>⌄</i>
                </summary>
                <div>
                  <p>
                    <b>Why it matters</b>
                    {x[2]}
                  </p>
                  <p>
                    <b>Recommended fix</b>
                    {x[3]}
                  </p>
                  <Button variant="secondary" onClick={() => notify("Implementation task created")}>
                    Create implementation task
                  </Button>
                </div>
              </details>
            ))}
          </section>
          <section className="card keyword-card">
            <CardTitle
              title="Keyword opportunities"
              copy="High relevance · attainable difficulty"
              action="View all 42"
            />
            {[
              ["ai self improvement app", "2.4K", "21", "High"],
              ["personal growth coach app", "1.9K", "18", "High"],
              ["daily habit ai", "880", "14", "Rising"],
              ["fitness and habit tracker", "3.1K", "36", "Medium"],
            ].map((x) => (
              <div key={x[0]}>
                <b>{x[0]}</b>
                <span>{x[1]} volume</span>
                <span>KD {x[2]}</span>
                <Badge>{x[3]}</Badge>
              </div>
            ))}
          </section>
        </div>
      ) : (
        <Aso notify={notify} />
      )}
    </>
  );
}
function Aso({ notify }: { notify: (s: string) => void }) {
  const [optimized, setOptimized] = useState(false);
  return (
    <div className="aso-layout">
      <section className="store-preview card">
        <div className="phone-store">
          <div className="store-top">
            ‹ <span>App Store</span> •••
          </div>
          <div className="app-head">
            <div className="workspace-logo large">LU</div>
            <span>
              <h3>LevelUp AI Coach</h3>
              <p>{optimized ? "Your daily AI growth system" : "AI Self Improvement Coach"}</p>
              <small>Health & Fitness · 4.7 ★</small>
            </span>
            <button>GET</button>
          </div>
          <div className="screens">
            <div>
              Daily
              <br />
              Focus
            </div>
            <div>
              Your
              <br />
              Progress
            </div>
            <div>
              One AI
              <br />
              Coach
            </div>
          </div>
          <h4>{optimized ? "A plan that adapts to your whole life" : "About this app"}</h4>
          <p>
            {optimized
              ? "Build better habits, train smarter, and make visible progress with one AI coach that connects every goal."
              : "AI-powered coaching for fitness, nutrition, habits and self-improvement."}
          </p>
        </div>
      </section>
      <section className="aso-panel">
        <Badge>{optimized ? "Optimized preview" : "6 opportunities found"}</Badge>
        <h2>
          {optimized
            ? "A sharper, intent-led listing."
            : "Your listing explains features—not transformation."}
        </h2>
        <p>
          Lead with the outcome customers want, then prove how LevelUp connects their daily
          progress.
        </p>
        <div className="aso-score">
          <span>
            <small>Current score</small>
            <b>72</b>
          </span>
          <i>→</i>
          <span>
            <small>Potential score</small>
            <b>89</b>
          </span>
        </div>
        {[
          ["Title keyword coverage", "64%"],
          ["Screenshot clarity", "81%"],
          ["Value proposition", "58%"],
          ["Review sentiment", "86%"],
        ].map((x) => (
          <div className="aso-row" key={x[0]}>
            <span>{x[0]}</span>
            <b>{x[1]}</b>
            <div>
              <i style={{ width: x[1] }} />
            </div>
          </div>
        ))}
        <Button
          onClick={() => {
            setOptimized(true);
            notify("Optimized listing preview generated");
          }}
        >
          {optimized ? "Apply to draft" : "Optimize My Listing"}
        </Button>
        <p className="disclaimer">Preview only. No app store listing will be changed.</p>
      </section>
    </div>
  );
}

function ContentStudio({ go, notify }: P) {
  const [stage, setStage] = useState<"brief" | "scripts" | "storyboard">("brief");
  const [selected, setSelected] = useState(1);
  const [generating, setGenerating] = useState(false);
  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setStage("scripts");
      notify("Three script variations generated");
    }, 1200);
  };
  return (
    <>
      <PageHeader
        eyebrow="Creative production"
        title="Content Studio"
        copy="Move from an audience insight to an approved script and editable storyboard."
        actions={<Badge tone="draft">Draft autosaved</Badge>}
      />
      <div className="studio-steps">
        <span className={stage === "brief" ? "active" : "done"}>
          1 <b>Brief</b>
        </span>
        <i />
        <span className={stage === "scripts" ? "active" : stage === "storyboard" ? "done" : ""}>
          2 <b>Scripts</b>
        </span>
        <i />
        <span className={stage === "storyboard" ? "active" : ""}>
          3 <b>Storyboard</b>
        </span>
        <i />
        <span>
          4 <b>Produce</b>
        </span>
      </div>
      {stage === "brief" && (
        <div className="brief-layout">
          <section className="card brief-form">
            <h2>Create a short-form video</h2>
            <p>Starting from “The Motivation Reset” analyzed format.</p>
            <div className="source-format">
              <Icon name="Trending Content" />
              <span>
                <b>Imported content blueprint</b>
                <small>Problem → tension → system → CTA · 26 seconds</small>
              </span>
              <button>Change</button>
            </div>
            <div className="form-grid">
              <label className="wide">
                <span>Topic</span>
                <textarea defaultValue="Why motivation fails—and the simple daily system that creates consistent progress." />
              </label>
              <label>
                <span>Platform</span>
                <select>
                  <option>Instagram Reels + TikTok</option>
                </select>
              </label>
              <label>
                <span>Duration</span>
                <select>
                  <option>30 seconds</option>
                </select>
              </label>
              <label>
                <span>Target audience</span>
                <select>
                  <option>Busy growth-minded adults</option>
                </select>
              </label>
              <label>
                <span>Objective</span>
                <select>
                  <option>App consideration</option>
                </select>
              </label>
              <label>
                <span>Tone</span>
                <select>
                  <option>Direct, credible, encouraging</option>
                </select>
              </label>
              <label>
                <span>Call to action</span>
                <input defaultValue="Start your first LevelUp plan" />
              </label>
            </div>
            <Button onClick={generate} disabled={generating}>
              {generating ? (
                <>
                  <i className="spinner" /> Generating 3 scripts…
                </>
              ) : (
                "Generate script variations →"
              )}
            </Button>
          </section>
          <aside className="card creative-context">
            <CardTitle title="Creative context" copy="From your Business Notebook" />
            {[
              ["Audience tension", "Starts strong, struggles to stay consistent."],
              ["Brand promise", "One adaptive system for whole-person growth."],
              ["Proof style", "Specific daily actions, not hype."],
              ["Words to avoid", "Hack, instant, guaranteed."],
            ].map((x) => (
              <div key={x[0]}>
                <span>{x[0]}</span>
                <p>{x[1]}</p>
              </div>
            ))}
          </aside>
        </div>
      )}
      {stage === "scripts" && (
        <div>
          <div className="variation-head">
            <div>
              <h2>Choose a creative direction</h2>
              <p>Three distinct scripts using your approved brand voice.</p>
            </div>
            <Button variant="secondary" onClick={generate}>
              Regenerate
            </Button>
          </div>
          <div className="script-grid">
            {[
              [
                "The Contrarian Hook",
                "“Motivation is the reason you keep starting over.”",
                "Direct and pattern-breaking",
                "91",
              ],
              [
                "The Relatable Reset",
                "“You don’t need more discipline. You need fewer decisions.”",
                "Empathetic and practical",
                "94",
              ],
              [
                "The Future Self",
                "“Your next level is built in the boring five minutes.”",
                "Aspirational and emotional",
                "87",
              ],
            ].map((x, i) => (
              <button
                className={`script-card card ${selected === i ? "selected" : ""}`}
                onClick={() => setSelected(i)}
                key={x[0]}
              >
                <div>
                  <Badge tone={i === 1 ? "mint" : "blue"}>
                    {i === 1 ? "Recommended" : `Variation ${i + 1}`}
                  </Badge>
                  <span className="score">
                    {x[3]}
                    <small>/100</small>
                  </span>
                </div>
                <h3>{x[0]}</h3>
                <blockquote>{x[1]}</blockquote>
                <p>{x[2]}</p>
                <div className="script-scenes">
                  <span>
                    <b>01</b>Hook · 3s
                  </span>
                  <span>
                    <b>02</b>Problem · 6s
                  </span>
                  <span>
                    <b>03</b>System · 14s
                  </span>
                  <span>
                    <b>04</b>CTA · 5s
                  </span>
                </div>
                <span className="radio">{selected === i ? "✓" : ""}</span>
              </button>
            ))}
          </div>
          <div className="bottom-action">
            <span>
              <b>Variation {selected + 1} selected</b>
              <small>You can edit every scene in the storyboard.</small>
            </span>
            <Button onClick={() => setStage("storyboard")}>
              Approve script & build storyboard →
            </Button>
          </div>
        </div>
      )}
      {stage === "storyboard" && <Storyboard go={go} notify={notify} />}
    </>
  );
}

function Storyboard({ go, notify }: { go: (p: Page) => void; notify: (s: string) => void }) {
  const scenes = [
    [
      "01",
      "0:00–0:03",
      "Hook",
      "Close-up. Presenter leans into frame.",
      "You don’t need more discipline. You need fewer decisions.",
    ],
    [
      "02",
      "0:03–0:09",
      "The cycle",
      "Quick cuts: alarm, gym bag, unfinished plan.",
      "Every new goal adds another decision—and another chance to stop.",
    ],
    [
      "03",
      "0:09–0:23",
      "The system",
      "App UI and daily plan over shoulder B-roll.",
      "LevelUp turns all your goals into one adaptive daily system.",
    ],
    [
      "04",
      "0:23–0:29",
      "CTA",
      "Presenter returns, direct eye contact.",
      "Make progress the default. Start your first plan today.",
    ],
  ];
  return (
    <div className="storyboard">
      <div className="storyboard-toolbar">
        <span>
          <h2>The Relatable Reset</h2>
          <p>29 seconds · 4 scenes · 9:16</p>
        </span>
        <Button variant="secondary">Preview script</Button>
        <Button
          onClick={() => {
            notify("Storyboard approved");
            go("AI Avatar Studio");
          }}
        >
          Choose avatar →
        </Button>
      </div>
      {scenes.map((s, i) => (
        <div className="scene-card card" key={s[0]}>
          <div className="drag">⠿</div>
          <div className={`scene-thumb st${i}`}>
            <span>{i === 2 ? "APP" : "▶"}</span>
          </div>
          <div className="scene-copy">
            <div>
              <Badge tone="blue">{s[2]}</Badge>
              <small>{s[1]}</small>
            </div>
            <textarea defaultValue={s[4]} />
            <p>
              <b>Visual</b>
              {s[3]}
            </p>
          </div>
          <div className="scene-controls">
            <button>•••</button>
            <span>{s[0]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Avatars({ go, notify }: P) {
  const [selected, setSelected] = useState(0);
  const [generating, setGenerating] = useState(false);
  const avatars = [
    ["Maya", "Warm coach", photo.ava1],
    ["Theo", "Confident guide", photo.ava2],
    ["Eli", "Calm expert", photo.ava3],
    ["Nina", "Energetic mentor", photo.ava4],
    ["Sasha", "Wellness host", photo.ava5],
  ];
  return (
    <>
      <PageHeader
        eyebrow="AI presenter"
        title="Avatar Studio"
        copy="Choose a fictional demo presenter or create an authorized custom avatar."
        actions={<Button variant="secondary">＋ Create custom avatar</Button>}
      />
      <div className="avatar-layout">
        <section>
          <div className="toolbar">
            <div className="tabs">
              <button className="active">All presenters</button>
              <button>Saved</button>
              <button>Custom</button>
            </div>
            <button className="filter">Style: Natural ⌄</button>
          </div>
          <div className="avatar-grid">
            {avatars.map((a, i) => (
              <button
                className={selected === i ? "selected" : ""}
                onClick={() => setSelected(i)}
                key={a[0]}
              >
                <img src={a[2]} alt={`Fictional AI avatar ${a[0]}`} />
                <span>
                  <b>{a[0]}</b>
                  <small>{a[1]}</small>
                </span>
                <i>{selected === i ? "✓" : ""}</i>
              </button>
            ))}
          </div>
          <div className="consent-banner">
            <Icon name="Settings" />
            <p>
              <b>Consent-first custom avatars</b>
              <span>
                Reference uploads require confirmation that you own the image or have permission
                from the depicted person.
              </span>
            </p>
            <button>Learn more</button>
          </div>
        </section>
        <aside className="avatar-preview card">
          <div className="preview-stage">
            <img src={avatars[selected][2]} alt="Selected fictional AI avatar" />
            <span className="frame-guide" />
            <button>▶ Preview motion</button>
          </div>
          <h3>{avatars[selected][0]} · Lifestyle studio</h3>
          <div className="setting-row">
            <span>Voice</span>
            <button>Amelia · US warm ⌄</button>
          </div>
          <div className="setting-row">
            <span>Background</span>
            <button>Soft graphite studio ⌄</button>
          </div>
          <div className="setting-row">
            <span>Framing</span>
            <button>Medium portrait ⌄</button>
          </div>
          <div className="script-preview">
            <small>SCRIPT PREVIEW</small>
            <p>“You don’t need more discipline. You need fewer decisions.”</p>
          </div>
          <Button
            disabled={generating}
            onClick={() => {
              setGenerating(true);
              setTimeout(() => {
                notify("Simulated presenter video is ready");
                go("Video Editor");
              }, 1400);
            }}
          >
            {generating ? "Generating demo preview…" : "Generate presenter video →"}
          </Button>
          <p className="disclaimer">Prototype simulation. No real video is generated.</p>
        </aside>
      </div>
    </>
  );
}

function VoiceStudio({ notify }: P) {
  const [playing, setPlaying] = useState(-1);
  const voices = [
    ["Amelia", "US · Warm & clear", "Female"],
    ["Marcus", "UK · Grounded", "Male"],
    ["Sofia", "AU · Energetic", "Female"],
    ["Rowan", "US · Calm expert", "Neutral"],
  ];
  return (
    <>
      <PageHeader
        eyebrow="Speech & voice"
        title="Voice Studio"
        copy="Direct narration with multilingual voices and consent-based custom voice setup."
        actions={<Button variant="secondary">＋ Add authorized voice</Button>}
      />
      <div className="voice-layout">
        <section className="card voice-library">
          <CardTitle
            title="Voice library"
            copy="Curated for LevelUp's brand voice"
            action="English (US)"
          />
          {voices.map((v, i) => (
            <button
              className={playing === i ? "playing" : ""}
              onClick={() => setPlaying(playing === i ? -1 : i)}
              key={v[0]}
            >
              <span className="play-round">{playing === i ? "Ⅱ" : "▶"}</span>
              <span>
                <b>{v[0]}</b>
                <small>{v[1]}</small>
              </span>
              <div className="waveform">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                  <i key={n} style={{ height: `${8 + ((n * 7) % 22)}px` }} />
                ))}
              </div>
              <Badge tone="blue">{v[2]}</Badge>
            </button>
          ))}
        </section>
        <section className="card voice-editor">
          <h3>Generate narration</h3>
          <textarea defaultValue="You don’t need more discipline. You need fewer decisions. LevelUp turns your goals into one adaptive daily system." />
          <div className="range-row">
            <span>
              Speed <b>1.0×</b>
            </span>
            <input type="range" defaultValue="50" />
          </div>
          <div className="range-row">
            <span>
              Pitch <b>Natural</b>
            </span>
            <input type="range" defaultValue="50" />
          </div>
          <div className="audio-player">
            <button>▶</button>
            <div className="waveform mint">
              {Array.from({ length: 28 }, (_, n) => (
                <i key={n} style={{ height: `${8 + ((n * 11) % 26)}px` }} />
              ))}
            </div>
            <span>0:00 / 0:08</span>
          </div>
          <Button onClick={() => notify("Demo narration generated")}>Generate voiceover</Button>
          <div className="consent-mini">
            <b>Custom voice safeguards</b>
            <p>
              Enrollment requires a spoken consent statement and authorization confirmation. Custom
              voices are visibly labeled.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

function VideoEditor({ go, notify }: P) {
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const run = () => {
    setEditing(true);
    setTimeout(() => {
      setEditing(false);
      setEdited(true);
      notify("AI editing plan applied to timeline");
    }, 1500);
  };
  return (
    <div className="editor-page">
      <div className="editor-top">
        <span>
          <button onClick={() => go("Content Studio")}>←</button>
          <div>
            <b>The Relatable Reset</b>
            <small>Saved just now · Demo project</small>
          </div>
        </span>
        <div>
          <Button variant="secondary">Share</Button>
          <Button onClick={() => notify("Demo render added to project")}>Render video</Button>
        </div>
      </div>
      <div className="editor-workspace">
        <aside className="media-panel">
          <div className="vertical-tabs">
            <button className="active">
              <Icon name="Video Editor" />
              <span>Media</span>
            </button>
            <button>
              <Icon name="Voice Studio" />
              <span>Audio</span>
            </button>
            <button>
              <Icon name="Business Notebook" />
              <span>Brand</span>
            </button>
          </div>
          <div className="media-browser">
            <h3>Project media</h3>
            <button className="upload-small">＋ Upload media</button>
            <label>VIDEO</label>
            <div className="media-grid">
              <div className="media-item">
                <img src={photo.ava1} alt="Presenter clip" />
                <small>Presenter.mp4</small>
              </div>
              <div className="media-item app-shot">
                <span>LU</span>
                <small>App demo.mp4</small>
              </div>
              <div className="media-item gym">
                <img src={photo.hero} alt="Workout b-roll" />
                <small>Gym b-roll.mp4</small>
              </div>
              <div className="media-item">
                <img src={photo.ava4} alt="Morning routine b-roll" />
                <small>Routine.mp4</small>
              </div>
            </div>
            <label>GENERATED</label>
            <div className="audio-asset">
              ♫{" "}
              <span>
                <b>Amelia VO</b>
                <small>0:29 · Voiceover</small>
              </span>
            </div>
          </div>
        </aside>
        <section className="preview-panel">
          <div className="preview-canvas">
            <div className="video-frame">
              <img src={photo.ava1} alt="Fictional avatar video preview" />
              <div className="caption-overlay">
                YOU NEED <em>FEWER DECISIONS.</em>
              </div>
              <div className="video-brand">LEVELUP</div>
              <span className="selection-box" />
            </div>
          </div>
          <div className="playback">
            <button>◀</button>
            <button>▶</button>
            <button>▶|</button>
            <span>00:08:12 / 00:29:00</span>
            <div className="spacer" />
            <button>9:16 ⌄</button>
            <button>100% ⌄</button>
          </div>
        </section>
        <aside className="edit-panel">
          <div className="edit-tabs">
            <button className="active">AI Assistant</button>
            <button>Properties</button>
          </div>
          <div className="assistant-chat">
            <div className="assistant-logo">
              <Icon name="AI Command Center" />
            </div>
            <h3>Edit with AI</h3>
            <p>Describe the result you want. I’ll create a reversible editing plan.</p>
            <div className="prompt-box">
              <textarea defaultValue="Edit this into a high-retention 30-second TikTok. Remove pauses, add dynamic captions and relevant B-roll." />
              {!editing && !edited && <Button onClick={run}>Apply edit plan ↑</Button>}
            </div>
            {editing && (
              <div className="processing">
                <i className="spinner" />
                <span>
                  <b>Analyzing 29 seconds…</b>
                  <small>Detecting pauses, emphasis and visual beats</small>
                </span>
              </div>
            )}
            {edited && (
              <div className="edit-plan">
                <div>
                  <span>✓</span>
                  <b>Editing plan applied</b>
                </div>
                {[
                  "Removed 1.8s of pauses",
                  "Added 4 B-roll moments",
                  "Generated dynamic captions",
                  "Applied LevelUp brand preset",
                  "Balanced narration audio",
                ].map((x) => (
                  <p key={x}>✓ {x}</p>
                ))}
                <Button variant="secondary" onClick={() => go("Audience Simulation")}>
                  Run quality evaluation →
                </Button>
              </div>
            )}
          </div>
        </aside>
      </div>
      <div className="timeline">
        <div className="timeline-tools">
          <button>↶</button>
          <button>↷</button>
          <button>✂</button>
          <span />
          <small>00:08:12</small>
          <div>
            − <input type="range" defaultValue="65" /> ＋
          </div>
        </div>
        <div className="tracks">
          <div className="track-labels">
            {["Video 1", "B-roll", "Captions", "Voiceover", "Music"].map((x) => (
              <span key={x}>
                {x}
                <i>◉</i>
              </span>
            ))}
          </div>
          <div className="track-area">
            <div className="ruler">00:00　　00:05　　00:10　　00:15　　00:20　　00:25　　00:30</div>
            <div className="playhead" />
            <div className="track video">
              <i style={{ width: "29%" }}>
                <img src={photo.ava1} />
              </i>
              <i style={{ width: "22%" }}>
                <img src={photo.ava1} />
              </i>
              <i style={{ width: "25%" }}>
                <img src={photo.ava1} />
              </i>
              <i style={{ width: "21%" }}>
                <img src={photo.ava1} />
              </i>
            </div>
            <div className="track broll">
              {edited && (
                <>
                  <i style={{ left: "19%", width: "12%" }}>Gym.mp4</i>
                  <i style={{ left: "52%", width: "15%" }}>App UI.mp4</i>
                  <i style={{ left: "73%", width: "10%" }}>Routine.mp4</i>
                </>
              )}
            </div>
            <div className="track captions">
              <i>YOU DON'T NEED MORE DISCIPLINE</i>
              <i>YOU NEED FEWER DECISIONS</i>
            </div>
            <div className="track audio">
              <i>
                {Array.from({ length: 60 }, (_, n) => (
                  <b key={n} style={{ height: `${4 + ((n * 9) % 15)}px` }} />
                ))}
              </i>
            </div>
            <div className="track music">
              <i>◖ Focus Pulse — 86 BPM ◗</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AudienceLab({ go, notify, setApproved }: P) {
  const [improved, setImproved] = useState(false);
  const people = [
    [
      "Impatient viewer",
      "Hook retention",
      "88",
      "“The first line disrupts a familiar belief immediately.”",
    ],
    [
      "Target customer",
      "Relevance",
      "94",
      "“This names the exact consistency problem I struggle with.”",
    ],
    [
      "Skeptical viewer",
      "Credibility",
      "76",
      "“Show one specific example of how the plan adapts.”",
    ],
    [
      "Potential buyer",
      "Value clarity",
      "84",
      "“I understand the system, but want to see the app sooner.”",
    ],
    ["Casual viewer", "Clarity", "91", "“Easy to follow without knowing the product.”"],
    ["Brand reviewer", "Brand fit", "96", "“Direct, encouraging, and avoids exaggerated claims.”"],
  ];
  return (
    <>
      <PageHeader
        eyebrow="AI quality evaluation"
        title="Audience Simulation Lab"
        copy="Six simulated perspectives review clarity and creative quality—not real audience behavior."
        actions={<Badge tone="review">AI simulation · Not predictive</Badge>}
      />
      <div className="lab-summary card">
        <div className="score-ring mint">
          <strong>{improved ? 94 : 88}</strong>
          <span>overall score</span>
        </div>
        <div>
          <Badge>{improved ? "Improved version" : "Strong creative"}</Badge>
          <h2>
            {improved
              ? "The product proof now lands earlier."
              : "A sharp hook with one credibility gap."}
          </h2>
          <p>
            {improved
              ? "All priority suggestions have been applied to the demo version."
              : "The concept is clear and relevant. Show the app 3 seconds earlier and make the adaptive benefit tangible."}
          </p>
        </div>
        <div className="summary-bars">
          {[
            ["Attention", improved ? 96 : 91],
            ["Clarity", 93],
            ["Relevance", 94],
            ["Credibility", improved ? 89 : 76],
            ["CTA", improved ? 92 : 84],
          ].map((x) => (
            <div key={x[0]}>
              <span>
                {x[0]}
                <b>{x[1]}</b>
              </span>
              <i>
                <em style={{ width: `${x[1]}%` }} />
              </i>
            </div>
          ))}
        </div>
      </div>
      <div className="evaluator-grid">
        {people.map((p, i) => (
          <article className="card evaluator" key={p[0]}>
            <div>
              <span className={`eval-avatar e${i}`}>{p[0][0]}</span>
              <span>
                <h3>{p[0]}</h3>
                <small>Simulated evaluator</small>
              </span>
              <strong>
                {improved ? Math.min(99, +p[2] + (i === 2 ? 13 : i === 3 ? 8 : 3)) : p[2]}
              </strong>
            </div>
            <Badge tone="blue">{p[1]}</Badge>
            <p>
              {improved && i === 2
                ? "“The app example makes the adaptive claim much more believable.”"
                : p[3]}
            </p>
            <button>View full feedback →</button>
          </article>
        ))}
      </div>
      <div className="lab-actions">
        <div>
          <b>Important</b>
          <p>
            AI simulations cannot predict virality or guarantee engagement. Validate recommendations
            with real campaign results.
          </p>
        </div>
        {!improved ? (
          <Button
            onClick={() => {
              setImproved(true);
              notify("Improved version created from simulation feedback");
            }}
          >
            Improve Content Based on Feedback
          </Button>
        ) : (
          <>
            <Button variant="secondary">Compare versions</Button>
            <Button
              onClick={() => {
                setApproved(true);
                notify("Content approved and ready to schedule");
                go("Content Calendar");
              }}
            >
              Approve & schedule →
            </Button>
          </>
        )}
      </div>
    </>
  );
}

function Pipeline({ go }: P) {
  const columns = [
    ["Research", 3],
    ["Script", 2],
    ["Video editing", 2],
    ["Quality assurance", 1],
    ["Awaiting approval", 2],
    ["Scheduled", 4],
  ];
  return (
    <>
      <PageHeader
        eyebrow="Production operations"
        title="Content Pipeline"
        copy="Every creative artifact, quality gate, and approval in one traceable flow."
        actions={<Button onClick={() => go("Content Studio")}>＋ New content project</Button>}
      />
      <div className="pipeline-stats">
        {[
          ["14", "Active projects"],
          ["6", "Running agents"],
          ["3", "Awaiting approval"],
          ["92%", "On-time rate"],
        ].map((x) => (
          <span key={x[1]}>
            <b>{x[0]}</b>
            <small>{x[1]}</small>
          </span>
        ))}
      </div>
      <div className="kanban">
        {columns.map((c, i) => (
          <div className="kanban-col" key={c[0]}>
            <div className="kanban-head">
              <span className={`dot d${i}`} />
              <b>{c[0]}</b>
              <small>{c[1]}</small>
              <button>•••</button>
            </div>
            {Array.from({ length: Math.min(c[1] as number, 2) }, (_, n) => (
              <button
                className="project-card card"
                onClick={() =>
                  go(i === 3 ? "Audience Simulation" : i === 2 ? "Video Editor" : "Content Studio")
                }
                key={n}
              >
                <div className={`project-cover pc${i}${n}`}>
                  {i > 1 && (
                    <img
                      src={[photo.hero, photo.ava1, photo.ava4][(i + n) % 3]}
                      alt="Project thumbnail"
                    />
                  )}
                  <Badge tone="dark">{i % 2 ? "TikTok" : "Instagram"}</Badge>
                </div>
                <h3>
                  {
                    [
                      ["Morning reset series", "AI habits that stick"],
                      ["Stop chasing motivation", "LevelUp weekly guide"],
                      ["The relatable reset", "5 habits carousel"],
                      ["The relatable reset"],
                      ["30-day progress story", "Nutrition myth"],
                      ["Weekly LevelUp guide", "Sunday reset"],
                    ][i][n]
                  }
                </h3>
                <p>
                  {
                    [
                      "Research Agent",
                      "Script Agent",
                      "Creative Agent",
                      "Quality Agent",
                      "Alex Morgan",
                      "Publisher",
                    ][i]
                  }
                </p>
                <div className="project-meta">
                  <span>{15 + i * 14}%</span>
                  <i>
                    <em style={{ width: `${15 + i * 14}%` }} />
                  </i>
                  <small>{120 + i * 45} cr.</small>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function Calendar({ go, notify, approved }: P) {
  const [view, setView] = useState("Month");
  const [scheduled, setScheduled] = useState(approved);
  const days = Array.from({ length: 35 }, (_, i) => i - 2);
  return (
    <>
      <PageHeader
        eyebrow="Distribution planning"
        title="Content Calendar"
        copy="Plan, approve, and schedule every channel from one view."
        actions={
          <>
            <Button variant="secondary">Today</Button>
            <Button onClick={() => notify("New post composer opened")}>＋ Create post</Button>
          </>
        }
      />
      <div className="calendar-toolbar">
        <div>
          <button>‹</button>
          <h2>June 2025</h2>
          <button>›</button>
        </div>
        <div className="view-switch">
          {["Month", "Week", "Day", "List"].map((x) => (
            <button className={view === x ? "active" : ""} onClick={() => setView(x)} key={x}>
              {x}
            </button>
          ))}
        </div>
        <button className="filter">All channels ⌄</button>
      </div>
      <div className="calendar-layout">
        <section className="calendar card">
          <div className="weekdays">
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
          <div className="calendar-days">
            {days.map((d, i) => (
              <div
                className={`${d < 1 || d > 30 ? "muted" : ""} ${d === 5 ? "today" : ""}`}
                key={i}
              >
                <span>{d < 1 ? 30 + d : d > 30 ? d - 30 : d}</span>
                {d === 3 && (
                  <CalendarItem
                    tone="purple"
                    text="3 habits ruining progress"
                    platform="IG · 6:30 PM"
                  />
                )}
                {d === 5 && (
                  <CalendarItem tone="mint" text="Motivation reset" platform="TK · 9:00 AM" />
                )}
                {d === 8 && (
                  <CalendarItem tone="blue" text="Weekly LevelUp guide" platform="LI · 12:00 PM" />
                )}
                {d === 11 && (
                  <CalendarItem tone="gold" text="2-minute reset" platform="YT · 4:00 PM" />
                )}
                {d === 14 && (
                  <CalendarItem tone="purple" text="Progress story" platform="IG · 7:00 PM" />
                )}
                {d === 17 && scheduled && (
                  <CalendarItem
                    tone="mint"
                    text="The relatable reset"
                    platform="IG + TK · 6:00 PM"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
        <aside className="schedule-panel card">
          <Badge tone={approved ? "mint" : "review"}>
            {approved ? "Approved content" : "Approval required"}
          </Badge>
          <h3>The Relatable Reset</h3>
          <div className="schedule-preview">
            <img src={photo.ava1} alt="Scheduled video preview" />
            <span>0:29 · 9:16</span>
          </div>
          <label>Channels</label>
          <div className="channel-check">
            <button className="selected">◎ Instagram ✓</button>
            <button className="selected">♪ TikTok ✓</button>
            <button>▶ YouTube</button>
          </div>
          <label>Publication date</label>
          <input type="date" defaultValue="2025-06-17" />
          <label>Time</label>
          <input type="time" defaultValue="18:00" />
          <label>Caption</label>
          <textarea defaultValue="You don't need more discipline. You need fewer decisions. Build your daily system with LevelUp. #LevelUpDaily #BetterHabits" />
          <Button
            disabled={!approved}
            onClick={() => {
              setScheduled(true);
              notify("Post added to publishing queue");
              go("Publishing Queue");
            }}
          >
            Schedule post
          </Button>
          {!approved && (
            <button className="text-button" onClick={() => go("Audience Simulation")}>
              Complete audience review first →
            </button>
          )}
        </aside>
      </div>
    </>
  );
}
function CalendarItem({ tone, text, platform }: { tone: string; text: string; platform: string }) {
  return (
    <button className={`cal-item ${tone}`}>
      <b>{text}</b>
      <small>{platform}</small>
    </button>
  );
}

function Queue({ notify, published, setPublished }: P) {
  const [publishing, setPublishing] = useState(false);
  const publish = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublished(true);
      notify("Demo post marked as published");
    }, 1000);
  };
  return (
    <>
      <PageHeader
        eyebrow="Publishing operations"
        title="Publishing Queue"
        copy="Final checks, channel readiness, and simulated delivery status."
        actions={<Button variant="secondary">Publishing settings</Button>}
      />
      <div className="queue-summary">
        {[
          ["Ready", published ? 2 : 3, "mint"],
          ["Needs review", 1, "gold"],
          ["Scheduled", 8, "blue"],
          ["Failed", 0, "red"],
        ].map((x) => (
          <span key={x[0] as string}>
            <i className={x[2] as string} />
            <b>{x[1]}</b>
            <small>{x[0]}</small>
          </span>
        ))}
      </div>
      <section className="card queue-table">
        <div className="table-head">
          <span>Content</span>
          <span>Channels</span>
          <span>Scheduled</span>
          <span>Checks</span>
          <span>Status</span>
          <span />
        </div>
        <div className="queue-row">
          <div>
            <img src={photo.ava1} />
            <span>
              <b>The Relatable Reset</b>
              <small>29s video · Approved by Alex</small>
            </span>
          </div>
          <span className="channel-icons">◎ ♪</span>
          <span>Jun 17 · 6:00 PM</span>
          <span className="checks">5/5 passed</span>
          <Badge tone={published ? "mint" : "ready"}>
            {published ? "Published · demo" : "Ready"}
          </Badge>
          {!published ? (
            <Button onClick={publish} disabled={publishing}>
              {publishing ? "Publishing…" : "Simulate publish"}
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => notify("Demo performance synced")}>
              View post
            </Button>
          )}
        </div>
        {[
          ["3 habits ruining your progress", photo.hero, "Instagram", "Today · 6:30 PM", "Ready"],
          ["The two-minute reset", photo.ava4, "TikTok", "Tomorrow · 9:00 AM", "Needs review"],
        ].map((x, i) => (
          <div className="queue-row" key={x[0]}>
            <div>
              <img src={x[1]} />
              <span>
                <b>{x[0]}</b>
                <small>{i ? "24s video · AI review" : "Carousel · Approved"}</small>
              </span>
            </div>
            <span>{x[2]}</span>
            <span>{x[3]}</span>
            <span className="checks">{i ? "4/5" : "5/5"} passed</span>
            <Badge tone={i ? "review" : "ready"}>{x[4]}</Badge>
            <button>•••</button>
          </div>
        ))}
      </section>
      <div className="demo-note">
        Publishing is simulated. No external social accounts or live APIs are connected.
      </div>
    </>
  );
}

function Social({ notify }: P) {
  const accounts = [
    ["Instagram", "@levelup.ai", "Demo connection", photo.ava1],
    ["TikTok", "@levelupcoach", "Demo connection", photo.ava2],
    ["YouTube", "LevelUp AI Coach", "Not connected", photo.ava3],
    ["LinkedIn", "LevelUp AI", "Not connected", photo.ava4],
  ];
  return (
    <>
      <PageHeader
        eyebrow="Channel management"
        title="Social Accounts"
        copy="Manage permissions, sync health, and available publishing capabilities."
        actions={
          <Button onClick={() => notify("Demo OAuth modal opened")}>＋ Connect account</Button>
        }
      />
      <div className="social-grid">
        {accounts.map((a, i) => (
          <article className="card social-card" key={a[0]}>
            <div>
              <img src={a[3]} />
              <span>
                <h3>{a[0]}</h3>
                <p>{a[1]}</p>
              </span>
              <Badge tone={i < 2 ? "blue" : "draft"}>{a[2]}</Badge>
            </div>
            <dl>
              <dt>Publishing</dt>
              <dd>{i < 2 ? "Demo enabled" : "Unavailable"}</dd>
              <dt>Analytics</dt>
              <dd>{i < 2 ? "Simulated" : "Unavailable"}</dd>
              <dt>Last sync</dt>
              <dd>{i < 2 ? "12 minutes ago" : "—"}</dd>
            </dl>
            <Button
              variant="secondary"
              onClick={() => notify(i < 2 ? "Account settings opened" : "Demo OAuth flow started")}
            >
              {i < 2 ? "Manage account" : "Connect " + a[0]}
            </Button>
          </article>
        ))}
      </div>
      <div className="demo-note">
        These are demonstration connections. No real credentials, tokens, posts, or analytics are
        used.
      </div>
    </>
  );
}

function Ads({ notify }: P) {
  const [step, setStep] = useState(0);
  const labels = ["Objective", "Audience", "Budget", "Creative", "Review"];
  return (
    <>
      <PageHeader
        eyebrow="Paid growth"
        title="Ads Manager"
        copy="Build evidence-led Meta campaigns with explicit budget authorization."
        actions={<Badge tone="draft">Meta · Demo mode</Badge>}
      />
      <div className="ads-layout">
        <section className="card campaign-wizard">
          <div className="wizard-steps">
            {labels.map((x, i) => (
              <span className={i === step ? "active" : i < step ? "done" : ""} key={x}>
                <i>{i < step ? "✓" : i + 1}</i>
                <b>{x}</b>
              </span>
            ))}
          </div>
          {step === 0 && (
            <div className="wizard-body">
              <h2>What should this campaign achieve?</h2>
              <div className="objective-grid">
                {["App installs", "Website conversions", "Brand awareness", "Video views"].map(
                  (x, i) => (
                    <button className={i === 0 ? "selected" : ""} key={x}>
                      <Icon
                        name={
                          ["Growth Intelligence", "Analytics", "Ads Manager", "Video Editor"][i]
                        }
                      />
                      <b>{x}</b>
                      <p>
                        {
                          [
                            "Drive qualified installs",
                            "Optimize for completed actions",
                            "Reach relevant audiences",
                            "Maximize creative views",
                          ][i]
                        }
                      </p>
                    </button>
                  ),
                )}
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="wizard-body">
              <h2>Define your test audience.</h2>
              <div className="form-grid">
                <label>
                  <span>Location</span>
                  <input defaultValue="United States, United Kingdom" />
                </label>
                <label>
                  <span>Age</span>
                  <input defaultValue="22–38" />
                </label>
                <label className="wide">
                  <span>Interests</span>
                  <textarea defaultValue="Personal development, fitness apps, habit tracking, wellness technology" />
                </label>
              </div>
              <div className="audience-size">
                <span>Estimated audience</span>
                <b>4.2M – 5.8M</b>
                <small>Broad enough to let delivery optimize.</small>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="wizard-body">
              <h2>Set a hard campaign limit.</h2>
              <div className="budget-box">
                <span>$</span>
                <input defaultValue="300" />
                <small>Total campaign budget</small>
              </div>
              <div className="allocation">
                <div>
                  <span>Creative testing</span>
                  <b>$90</b>
                </div>
                <div>
                  <span>Winner scaling</span>
                  <b>$180</b>
                </div>
                <div>
                  <span>Retargeting</span>
                  <b>$30</b>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="wizard-body">
              <h2>Choose your creative.</h2>
              <div className="ad-creative">
                <img src={photo.ava1} />
                <span>
                  <Badge>Recommended</Badge>
                  <h3>The Relatable Reset</h3>
                  <p>29s · 9:16 · Quality score 94</p>
                </span>
                <b>✓</b>
              </div>
              <label className="ad-copy">
                <span>Primary text</span>
                <textarea defaultValue="Goals shouldn't compete for your attention. LevelUp turns them into one adaptive daily plan." />
              </label>
            </div>
          )}
          {step === 4 && (
            <div className="wizard-body review-campaign">
              <Badge tone="review">Spend authorization required</Badge>
              <h2>Review before launch</h2>
              {[
                ["Objective", "App installs"],
                ["Audience", "US + UK · Ages 22–38"],
                ["Total spend limit", "$300.00 USD"],
                ["Duration", "10 days"],
                ["Creative", "The Relatable Reset"],
              ].map((x) => (
                <div key={x[0]}>
                  <span>{x[0]}</span>
                  <b>{x[1]}</b>
                </div>
              ))}
              <label className="authorization">
                <input type="checkbox" /> I authorize a maximum simulated spend of $300. No real
                charge will occur in this prototype.
              </label>
            </div>
          )}
          <div className="wizard-actions">
            <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
            <div className="spacer" />
            {step < 4 ? (
              <Button onClick={() => setStep((s) => s + 1)}>Continue →</Button>
            ) : (
              <Button onClick={() => notify("Demo campaign created — no real spend occurred")}>
                Confirm demo launch
              </Button>
            )}
          </div>
        </section>
        <aside className="card forecast">
          <Badge tone="blue">Illustrative estimate</Badge>
          <h3>Campaign forecast</h3>
          <strong>340–610</strong>
          <span>estimated installs</span>
          <div>
            <small>Estimated CPA</small>
            <b>$0.49–$0.88</b>
          </div>
          <div>
            <small>Estimated reach</small>
            <b>28K–46K</b>
          </div>
          <p>
            Forecasts are directional estimates based on fictional demo assumptions. They do not
            guarantee outcomes.
          </p>
        </aside>
      </div>
    </>
  );
}

function Analytics({ go, published }: P) {
  const [range, setRange] = useState("30 days");
  return (
    <>
      <PageHeader
        eyebrow="Unified performance"
        title="Growth Analytics"
        copy="See how search, content, social, and paid activity contribute to growth."
        actions={
          <>
            <button className="filter">All channels ⌄</button>
            <button
              className="filter"
              onClick={() => setRange(range === "30 days" ? "90 days" : "30 days")}
            >
              Last {range} ⌄
            </button>
          </>
        }
      />
      <div className="analytics-top">
        {[
          ["Website visitors", "48,291", "12.7%"],
          ["App downloads", "4,862", "18.2%"],
          ["Social reach", "284.7K", "24.1%"],
          ["Conversions", "1,284", "9.6%"],
          ["Revenue", "$18.4K", "14.8%"],
        ].map((x) => (
          <div key={x[0]}>
            <span>{x[0]}</span>
            <strong>{x[1]}</strong>
            <small>↗ {x[2]}</small>
          </div>
        ))}
      </div>
      {published && (
        <div className="published-insight">
          <Badge>New demo result</Badge>
          <b>“The Relatable Reset” is gaining early traction.</b>
          <span>12.8K views · 842 profile visits · 116 demo installs</span>
        </div>
      )}
      <div className="analytics-grid">
        <section className="card main-chart">
          <CardTitle
            title="Growth across channels"
            copy="Reach and conversion trend"
            action="Weekly"
          />
          <div className="chart-legend">
            <span>
              <i className="mint" />
              Organic
            </span>
            <span>
              <i className="purple" />
              Social
            </span>
            <span>
              <i className="gold" />
              Paid
            </span>
          </div>
          <GrowthChart />
        </section>
        <section className="card channel-chart">
          <CardTitle title="Channel contribution" copy="Conversions by source" />
          <div className="donut">
            <strong>
              1,284<small>total</small>
            </strong>
          </div>
          {[
            ["Organic search", "36%", "mint"],
            ["Instagram", "27%", "purple"],
            ["TikTok", "21%", "blue"],
            ["Paid media", "16%", "gold"],
          ].map((x) => (
            <div key={x[0]}>
              <span>
                <i className={x[2]} />
                {x[0]}
              </span>
              <b>{x[1]}</b>
            </div>
          ))}
        </section>
        <section className="card content-ranking">
          <CardTitle title="Top-performing content" copy="Ranked by qualified profile visits" />
          {[
            ["The 2-minute reset", "42.8K", "2,104", photo.ava4],
            ["3 habits ruining progress", "38.1K", "1,882", photo.hero],
            ["Your motivation is broken", "31.6K", "1,472", photo.ava1],
          ].map((x, i) => (
            <div key={x[0]}>
              <strong>0{i + 1}</strong>
              <img src={x[3]} />
              <span>
                <b>{x[0]}</b>
                <small>{x[1]} views</small>
              </span>
              <em>{x[2]} visits</em>
            </div>
          ))}
        </section>
        <section className="card intelligence-card">
          <div className="rec-icon">
            <Icon name="Growth Intelligence" />
          </div>
          <Badge>Growth Intelligence</Badge>
          <h2>Teach first. Demonstrate second. Promote last.</h2>
          <p>
            Educational posts generated 2.4× more qualified profile visits than promotional content
            across 18 posts.
          </p>
          <div className="supporting">
            <span>
              <small>Educational CTR</small>
              <b>3.8%</b>
            </span>
            <span>
              <small>Promotional CTR</small>
              <b>1.6%</b>
            </span>
            <span>
              <small>Confidence</small>
              <b>High</b>
            </span>
          </div>
          <Button onClick={() => go("Content Studio")}>Create experiment →</Button>
        </section>
      </div>
    </>
  );
}

function Integrations({ notify }: P) {
  const [cat, setCat] = useState("All");
  const items = [
    ["OpenAI", "AI models", "Connected"],
    ["Anthropic", "AI models", "Connected"],
    ["Gemini", "AI models", "Available"],
    ["ComfyUI", "Video generation", "Available"],
    ["Postiz", "Scheduling", "Available"],
    ["OpenSEO", "SEO tools", "Connected"],
    ["n8n", "Automation", "Connected"],
    ["Meta", "Social platforms", "Demo"],
    ["TikTok", "Social platforms", "Demo"],
    ["YouTube", "Social platforms", "Available"],
    ["Search Console", "Analytics", "Connected"],
    ["Cursor", "Developer tools", "Available"],
  ];
  const cats = [
    "All",
    "AI models",
    "Social platforms",
    "SEO tools",
    "Video generation",
    "Developer tools",
  ];
  return (
    <>
      <PageHeader
        eyebrow="Connected ecosystem"
        title="Integrations"
        copy="Models, platforms, and tools that extend your marketing workspace."
      />
      <div className="category-tabs">
        {cats.map((x) => (
          <button className={cat === x ? "active" : ""} onClick={() => setCat(x)} key={x}>
            {x}
          </button>
        ))}
      </div>
      <div className="integration-grid">
        {items
          .filter((x) => cat === "All" || x[1] === cat)
          .map((x, i) => (
            <article className="card integration" key={x[0]}>
              <div className={`integration-logo il${i}`}>{x[0].slice(0, 2)}</div>
              <div>
                <h3>{x[0]}</h3>
                <p>{x[1]}</p>
              </div>
              <Badge tone={x[2] === "Connected" ? "mint" : x[2] === "Demo" ? "blue" : "draft"}>
                {x[2]}
              </Badge>
              <p>Connect {x[0]} to extend your workspace with approved tools and permissions.</p>
              <Button
                variant="secondary"
                onClick={() =>
                  notify(
                    x[2] === "Connected"
                      ? "Integration settings opened"
                      : "Demo connection flow opened",
                  )
                }
              >
                {x[2] === "Connected" ? "Configure" : "Connect"}
              </Button>
            </article>
          ))}
      </div>
    </>
  );
}

function Automations({ notify }: P) {
  const [running, setRunning] = useState(true);
  const nodes = [
    ["Trigger", "Every Monday · 9:00 AM"],
    ["Research", "Discover trending topics"],
    ["Generate", "Create 3 video scripts"],
    ["Produce", "Generate draft videos"],
    ["Evaluate", "Run audience simulation"],
    ["Condition", "Score is above 88"],
    ["Approval", "Send to content owner"],
    ["Schedule", "Add to approved queue"],
  ];
  return (
    <>
      <PageHeader
        eyebrow="Workflow orchestration"
        title="Automation Workflows"
        copy="Build durable, approval-aware marketing systems without hiding critical decisions."
        actions={
          <>
            <Button variant="secondary">Templates</Button>
            <Button onClick={() => notify("New workflow canvas created")}>＋ New workflow</Button>
          </>
        }
      />
      <div className="workflow-meta">
        <span>
          <b>Weekly Content Engine</b>
          <small>Last run completed · 2h ago</small>
        </span>
        <Badge>{running ? "Active" : "Paused"}</Badge>
        <button className="toggle" onClick={() => setRunning(!running)}>
          <i className={running ? "on" : ""} />
        </button>
        <Button variant="secondary" onClick={() => notify("Demo workflow test started")}>
          Test workflow
        </Button>
      </div>
      <div className="workflow-canvas">
        {nodes.map((n, i) => (
          <div
            className={`flow-node n${i}`}
            style={{ left: `${60 + (i % 4) * 250}px`, top: `${55 + Math.floor(i / 4) * 210}px` }}
            key={n[0]}
          >
            <span>
              <Icon
                name={
                  [
                    "Content Calendar",
                    "Trending Content",
                    "Content Studio",
                    "Video Editor",
                    "Audience Simulation",
                    "Automation Workflows",
                    "Team & Members",
                    "Publishing Queue",
                  ][i]
                }
              />
            </span>
            <div>
              <small>{n[0].toUpperCase()}</small>
              <b>{n[1]}</b>
            </div>
            <button>•••</button>
            {i < 7 && <i className="connector">→</i>}
          </div>
        ))}
        <div className="canvas-controls">
          <button>＋</button>
          <button>−</button>
          <button>⌖</button>
        </div>
      </div>
      <section className="card run-history">
        <CardTitle title="Execution history" copy="Durable stage-level logs" />
        {[
          ["Today, 9:00 AM", "Completed", "8m 42s", "842 cr."],
          ["Jun 2, 9:00 AM", "Completed", "9m 18s", "904 cr."],
          ["May 26, 9:00 AM", "Recovered", "12m 06s", "876 cr."],
        ].map((x) => (
          <div key={x[0]}>
            <span className="run-ok">✓</span>
            <b>{x[0]}</b>
            <Badge tone={x[1] === "Recovered" ? "review" : "mint"}>{x[1]}</Badge>
            <span>{x[2]}</span>
            <span>{x[3]}</span>
            <button>View logs →</button>
          </div>
        ))}
      </section>
    </>
  );
}

function Settings({ notify }: P) {
  const [tab, setTab] = useState("Workspace");
  return (
    <>
      <PageHeader
        eyebrow="Workspace administration"
        title="Settings & team"
        copy="Manage workspace identity, members, billing, permissions, and security."
      />
      <div className="settings-layout">
        <aside>
          {[
            "Workspace",
            "Team members",
            "Roles & permissions",
            "Usage & credits",
            "Billing plans",
            "API keys",
            "Notifications",
            "Security",
          ].map((x) => (
            <button className={tab === x ? "active" : ""} onClick={() => setTab(x)} key={x}>
              {x}
              <span>›</span>
            </button>
          ))}
        </aside>
        <section className="card settings-page">
          {tab === "Team members" ? (
            <>
              <h2>Team members</h2>
              <p>Control who can access LevelUp and approve critical actions.</p>
              <div className="member-list">
                {[
                  ["Alex Morgan", "alex@levelup.ai", "Owner"],
                  ["Maya Lewis", "maya@levelup.ai", "Content lead"],
                  ["Jordan Chen", "jordan@levelup.ai", "Analyst"],
                ].map((x, i) => (
                  <div key={x[0]}>
                    <span className={`member-avatar m${i}`}>
                      {x[0]
                        .split(" ")
                        .map((y) => y[0])
                        .join("")}
                    </span>
                    <span>
                      <b>{x[0]}</b>
                      <small>{x[1]}</small>
                    </span>
                    <Badge tone="blue">{x[2]}</Badge>
                    <button>•••</button>
                  </div>
                ))}
              </div>
              <Button onClick={() => notify("Invite dialog opened")}>Invite member</Button>
            </>
          ) : tab === "Usage & credits" ? (
            <>
              <h2>Usage & credits</h2>
              <p>Transparent provider and workflow usage for your workspace.</p>
              <div className="credit-large">
                <span>Available balance</span>
                <strong>6,420</strong>
                <small>of 10,000 monthly credits</small>
                <div>
                  <i style={{ width: "64.2%" }} />
                </div>
              </div>
              {[
                ["AI generation", "2,140 cr."],
                ["Video production", "980 cr."],
                ["Research providers", "340 cr."],
                ["Workflow compute", "120 cr."],
              ].map((x) => (
                <div className="billing-row" key={x[0]}>
                  <span>{x[0]}</span>
                  <b>{x[1]}</b>
                </div>
              ))}
            </>
          ) : (
            <>
              <h2>Workspace profile</h2>
              <p>Core details visible across the Marketing OS workspace.</p>
              <div className="settings-brand">
                <div className="workspace-logo large">LU</div>
                <Button variant="secondary">Change logo</Button>
              </div>
              <div className="form-grid">
                <label>
                  <span>Workspace name</span>
                  <input defaultValue="LevelUp AI Coach" />
                </label>
                <label>
                  <span>Workspace URL</span>
                  <input defaultValue="marketingos.app/levelup" />
                </label>
                <label>
                  <span>Default timezone</span>
                  <select>
                    <option>Europe/London (GMT+1)</option>
                  </select>
                </label>
                <label>
                  <span>Default currency</span>
                  <select>
                    <option>USD — US Dollar</option>
                  </select>
                </label>
              </div>
              <Button onClick={() => notify("Workspace settings saved")}>Save changes</Button>
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
