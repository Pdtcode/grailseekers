export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Grail Seekers",
  description: "Seek until you find",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Drop",
      href: "/drop",
    },
    {
      label: "Store",
      href: "/store",
    },
    {
      label: "News",
      href: "/news",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Drop",
      href: "/drop",
    },
    {
      label: "Store",
      href: "/store",
    },
    {
      label: "News",
      href: "/news",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    login: "/login",
  },
};
