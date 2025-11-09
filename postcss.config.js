/**
 * PostCSS configuration for the Social Media SaaS frontend.
 *
 * Tailwind and Autoprefixer are configured as PostCSS plugins. This file is
 * automatically detected by Next.js when processing CSS. Autoprefixer
 * ensures that vendor prefixes are added where necessary for broader
 * browser support.
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
