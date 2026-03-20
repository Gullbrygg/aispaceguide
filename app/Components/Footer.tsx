import Link from "next/link";
function Footer() {
  return (
    <footer className="w-full text-center py-4 mt-auto">
      <p>&copy; {new Date().getFullYear()} AiGuidebook. All rights reserved.</p>
    </footer>
  );

}
export default Footer;