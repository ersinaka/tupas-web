import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, metadata image routes and files with an extension.
  matcher: ["/((?!api|_next|_vercel|.*opengraph-image|.*twitter-image|.*\\..*).*)"],
};
