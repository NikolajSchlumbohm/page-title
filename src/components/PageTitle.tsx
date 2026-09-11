import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types";
import { classNames } from "../util/lang";
import { pathToRoot } from "../util/path";
import { i18n } from "../i18n";

// Prüft einmalig beim Laden des Moduls (nicht bei jedem Seiten-Render),
// ob static/logo.png existiert. Quartz kopiert den Inhalt von `static/`
// unverändert in die Wurzel der Website, d.h. quartz/static/logo.png
// landet als /logo.png im Output.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGO_FILENAME = "logo.png";
const LOGO_PATH = path.join(__dirname, "..", "static", LOGO_FILENAME);
const hasLogo = fs.existsSync(LOGO_PATH);

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const locale = cfg?.locale ?? "en-US";
  const title = cfg?.pageTitle ?? i18n(locale).propertyDefaults.title;
  const baseDir = pathToRoot(fileData.slug as string);

  return (
    <div class={classNames(displayClass, "page-title-container")}>
      {hasLogo && (
        <img
          class="page-title-logo"
          src={`${baseDir}/static/${LOGO_FILENAME}`}
          alt=""
          aria-hidden="true"
        />
      )}
      <h2 class="page-title">
        <a href={baseDir}>{title}</a>
      </h2>
    </div>
  );
};

PageTitle.css = `
.page-title-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
}

.page-title-logo {
  max-width: 2.5rem;
  max-height: 2.5rem;
  height: auto;
  width: auto;
  object-fit: contain;
}

.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
`;

export default (() => PageTitle) satisfies QuartzComponentConstructor;
