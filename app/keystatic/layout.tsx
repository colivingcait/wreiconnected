import { notFound } from "next/navigation";
import KeystaticApp from "./keystatic";

export const dynamic = "force-dynamic";

/**
 * Local mode edits files on disk, which a Vercel deploy cannot do.
 * The admin UI stays off in production until KEYSTATIC_STORAGE=github.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production" && process.env.KEYSTATIC_STORAGE !== "github") {
    notFound();
  }
  return (
    <>
      <KeystaticApp />
      {children}
    </>
  );
}
