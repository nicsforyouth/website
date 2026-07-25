import Image from "next/image";
import { config } from "@/lib/config";
import Logo from "@/assets/logo-transparent.png";
import { FaFacebook, FaInstagram, FaDiscord } from "react-icons/fa";

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function HeroFooter({ onNavClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (id: string) => {
    onNavClick(id);
  };

  return (
    <footer
      id="footer-section"
      className="bg-[#0D1117] text-white pt-16 pb-12 border-t-2 border-primary"
    >
      <div className="max-w-300 mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Logo and Tagline */}
          <div className="md:col-span-5 space-y-4">
            <button
              id="footer-logo-btn"
              onClick={() => handleLinkClick("home")}
              className="flex items-center gap-2 cursor-pointer group text-left"
              aria-label="NICS Home"
            >
              <Image src={Logo} className="h-10 w-10" alt="NICS logo" />
              <span className="font-display text-2xl font-bold tracking-wide text-white transition-colors group-hover:text-primary">
                Nepal Informatics & Computing Society
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            </button>
            <p className="text-body text-sm text-gray-400 font-medium">
              "For students, by students."
            </p>
            <p className="text-body text-xs text-gray-500 max-w-85">
              Nepal Informatics & Computing Society is a national, student-run
              non-profit IT community guiding high schoolers across Nepal.
            </p>
          </div>

          {/* Column 2: Nav Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-gray-400">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { name: "Home", id: "home" },
                { name: "About NICS", id: "about" },
                { name: "What We Do", id: "what-we-do" },
                { name: "Upcoming Events", id: "events" },
                { name: "Join Us", id: "community" },
              ].map((link) => (
                <button
                  key={link.id}
                  id={`footer-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-body text-xs text-gray-400 hover:text-primary transition-colors text-left cursor-pointer font-medium w-fit"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Column 3: Social Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-gray-400">
              Connect With Us
            </h4>
            <div className="flex items-center gap-4">
              <a
                href={config.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/4 hover:bg-primary/20 border border-white/10 hover:border-primary/40 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                aria-label="Twitter X"
              >
                <FaFacebook />
              </a>

              {/* Instagram icon */}
              <a
                href={config.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/4 hover:bg-primary/20 border border-white/10 hover:border-primary/40 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href={config.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/4 hover:bg-primary/20 border border-white/10 hover:border-primary/40 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                aria-label="Discord"
              >
                <FaDiscord />
              </a>
            </div>
            <p className="text-body text-xs text-gray-500 font-medium">
              Join us today!
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4">
          <p className="text-xs font-sans text-gray-500">
            &copy; {`${currentYear} NICS `} &middot; Non-profit high school IT
            club &middot; Open to all.
          </p>
          <div className="flex items-center gap-6 text-xs font-sans text-gray-500">
            <span className="hover:text-primary transition-colors">
              By Students, For Students
            </span>
            {/* <span className="w-1 h-1 rounded-full bg-gray-500" /> */}
            {/* <span className="hover:text-primary transition-colors"> */}
            {/*   Bhaktapur, Nepal */}
            {/* </span> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
