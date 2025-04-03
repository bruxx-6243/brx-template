import { useEffect } from "react";
import { z } from "zod";

/**
 * Zod schema for validating SEO props.
 * @typedef {Object} PageSEOProps
 * @property {string} [title] - The page title for SEO and browser tab.
 * @property {string} [description] - The meta description for SEO (max 160 characters).
 * @property {string} [keywords] - Comma-separated keywords for SEO.
 * @property {string} [ogTitle] - Open Graph title for social media sharing.
 * @property {string} [ogDescription] - Open Graph description for social media sharing (max 300 characters).
 * @property {string} [ogImage] - URL to the Open Graph image for social media sharing.
 * @property {string} [ogUrl] - Canonical URL for Open Graph.
 * @property {string} [ogType] - The type of content (e.g., 'website', 'article', 'product').
 * @property {string} [ogSiteName] - The name of the site (e.g., your website's name).
 * @property {string} [ogLocale] - The locale of the content (e.g., 'en_US').
 */
const pageSEOSchema = z
  .object({
    title: z
      .string()
      .optional()
      .describe("The page title for SEO and browser tab"),
    description: z.string().optional().describe("The meta description for SEO"),
    keywords: z
      .string()
      .optional()
      .describe("Comma-separated keywords for SEO"),
    ogTitle: z
      .string()
      .optional()
      .describe("Open Graph title for social media sharing"),
    ogDescription: z
      .string()
      .optional()
      .describe("Open Graph description for social media sharing"),
    ogImage: z
      .string()
      .url()
      .optional()
      .describe("URL to the Open Graph image for social media sharing"),
    ogUrl: z.string().url().optional().describe("Canonical URL for Open Graph"),
    ogType: z
      .string()
      .optional()
      .describe("The type of content (e.g., 'website', 'article', 'product')"),
    ogSiteName: z
      .string()
      .optional()
      .describe("The name of the site (e.g., your website's name)"),
    ogLocale: z
      .string()
      .optional()
      .describe("The locale of the content (e.g., 'en_US')"),
  })
  .strict();

export type PageSEOProps = z.infer<typeof pageSEOSchema>;

/**
 * Custom React hook for setting SEO metadata, including standard meta tags and Open Graph tags.
 * This hook dynamically updates the document's title and meta tags for SEO optimization and social media sharing.
 * All properties are optional, allowing flexible usage for different pages or components.
 *
 * @param {PageSEOProps} props - The SEO properties to set.
 * @example
 * useSEO({
 *   title: 'My Page Title',
 *   description: 'This is the description of my page for SEO',
 *   keywords: 'react, seo, optimization, web development',
 *   ogTitle: 'Open Graph Title for Social Sharing',
 *   ogDescription: 'Open Graph description for social media previews',
 *   ogImage: 'https://example.com/og-image.jpg',
 *   ogUrl: 'https://example.com/my-page',
 *   ogType: 'website',
 *   ogSiteName: 'My Website',
 *   ogLocale: 'en_US'
 * });
 */
const useSEO = (props: PageSEOProps) => {
  const validatedProps = pageSEOSchema.parse(props);

  /**
   * Sets or updates a single meta tag in the document head.
   * @param {string} attr - The attribute name (e.g., 'name' or 'property').
   * @param {string} key - The attribute value to match (e.g., 'description' or 'og:title').
   * @param {string} content - The content to set for the meta tag.
   */
  const setMetaTag = (attr: string, key: string, content: string) => {
    if (content) {
      let element = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`,
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    }
  };

  useEffect(() => {
    // Set document title
    if (validatedProps.title) {
      document.title = validatedProps.title;
    }

    // Set standard meta tags
    if (validatedProps.description) {
      setMetaTag("name", "description", validatedProps.description);
    }
    if (validatedProps.keywords) {
      setMetaTag("name", "keywords", validatedProps.keywords);
    }

    // Set Open Graph meta tags
    if (validatedProps.ogTitle) {
      setMetaTag("property", "og:title", validatedProps.ogTitle);
    }
    if (validatedProps.ogDescription) {
      setMetaTag("property", "og:description", validatedProps.ogDescription);
    }
    if (validatedProps.ogImage) {
      setMetaTag("property", "og:image", validatedProps.ogImage);
    }
    if (validatedProps.ogUrl) {
      setMetaTag("property", "og:url", validatedProps.ogUrl);
    }
    if (validatedProps.ogType) {
      setMetaTag("property", "og:type", validatedProps.ogType);
    }
    if (validatedProps.ogSiteName) {
      setMetaTag("property", "og:site_name", validatedProps.ogSiteName);
    }
    if (validatedProps.ogLocale) {
      setMetaTag("property", "og:locale", validatedProps.ogLocale);
    }

    return () => {
      const metaTags = document.getElementsByTagName("meta");
      for (let i = metaTags.length - 1; i >= 0; i--) {
        const tag = metaTags[i];
        if (
          tag.getAttribute("name")?.includes("description") ||
          tag.getAttribute("name")?.includes("keywords") ||
          tag.getAttribute("property")?.startsWith("og:")
        ) {
          tag.parentNode?.removeChild(tag);
        }
      }
      if (validatedProps.title) {
        document.title = "Your Default Title";
      }
    };
  }, [
    validatedProps.title,
    validatedProps.description,
    validatedProps.keywords,
    validatedProps.ogTitle,
    validatedProps.ogDescription,
    validatedProps.ogImage,
    validatedProps.ogUrl,
    validatedProps.ogType,
    validatedProps.ogSiteName,
    validatedProps.ogLocale,
  ]);
};

export default useSEO;
