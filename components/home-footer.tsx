import { Link } from "@heroui/link";

import ThemeInstagram from "@/components/theme-instagram";

export default function HomeFooter() {
  return (
    <div className="w-full flex items-center justify-center z-10">
      <div className="flex gap-4 text-sm opacity-70 hover:opacity-100 transition-opacity">
        <Link
          aria-label="Follow us on Instagram"
          className="p-2 rounded-full transition-colors hover:bg-foreground/10 flex items-center justify-center"
          href="https://www.instagram.com/grail__seekers/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <ThemeInstagram size={24} />
        </Link>
      </div>
    </div>
  );
}
