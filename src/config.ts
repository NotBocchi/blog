import * as fs from "node:fs";
import * as path from "node:path";
import type { Config } from "@interfaces/site";
import yaml from "js-yaml";

const configPath = path.resolve("frosti.config.yaml");
const translationsPath = path.resolve("src/i18n/translations.yaml");

const config = yaml.load(fs.readFileSync(configPath, "utf8")) as Config;
const translationsConfig = yaml.load(
  fs.readFileSync(translationsPath, "utf8"),
) as Record<string, any>;

export const SITE_TAB = config.site.tab;
export const SITE_TITLE = config.site.title;
export const SITE_DESCRIPTION = config.site.description;
export const SITE_LANGUAGE = config.site.language;
export const SITE_FAVICON = config.site.favicon;
export const SITE_THEME = config.site.theme;
export const DATE_FORMAT = config.site.date_format;

export const BLOG_CONFIG = config.site.blog;
export const BLOG_PAGE_SIZE = config.site.blog.pageSize;

export const CODE_THEME = config.site.theme.code;

export const USER_NAME = config.user.name;
export const USER_SITE = config.user.site;
export const USER_AVATAR = config.user.avatar;

export const USER_SIDEBAR_SOCIAL_ICONS = config.user.sidebar.social;
export const USER_FOOTER_SOCIAL_ICONS = config.user.footer.social;

export const SITE_MENU = config.site.menu;
export const TRANSLATIONS = translationsConfig;

const translationCache: Record<string, string> = {};

export function t(key: string): string {
  if (translationCache[key] !== undefined) {
    return translationCache[key];
  }

  const keyParts = key.split(".");
  const candidateLanguages = [
    SITE_LANGUAGE,
    SITE_LANGUAGE.split("-")[0],
    "en",
  ].filter((lang, index, langs) => lang && langs.indexOf(lang) === index);

  for (const lang of candidateLanguages) {
    const currentLangTranslations = TRANSLATIONS[lang];
    if (!currentLangTranslations) continue;

    let result = currentLangTranslations;

    for (const part of keyParts) {
      if (!result || typeof result !== "object") {
        result = undefined;
        break;
      }

      result = result[part];
    }

    if (typeof result === "string") {
      translationCache[key] = result;
      return result;
    }
  }

  translationCache[key] = key;
  return translationCache[key];
}