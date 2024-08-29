import {
  DataFunctionArgs,
  json,
  LoaderFunctionArgs,
  type LinksFunction,
} from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { NavigationStatus } from "./components/NavigationStatus";
import tailwindCss from "./tailwind.css?url";
import rootCss from "./root.css?url";
import { ClientOnly } from "remix-utils/client-only";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindCss },
  { rel: "stylesheet", href: rootCss },
];

// export const loader = async ({ request, params }: LoaderFunctionArgs) => {
//   console.log("Root Loader");
//   console.log(request);
//   console.log(params);
//   return null;
// };

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* <link rel="manifest" href="/app.webmanifest"></link> */}
        <link rel="stylesheet" href="/styles.css"></link>
        <link
          rel="shortcut icon"
          href="https://www.open.gov.sg/images/favicon.png"
          type="image/x-icon"
        ></link>
      </head>
      <body>
        <ClientOnly fallback={<>Loading...</>}>
          {() => <>{children}</>}
        </ClientOnly>
        {/* {children} */}
        {/* <ThemePanel /> */}
        {/* <Suspense>{children}</Suspense> */}
        {/* <ScrollRestoration /> */}
        <Scripts />
        <NavigationStatus></NavigationStatus>
        <div className="background"></div>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export const mapError = (error: unknown) =>
  isRouteErrorResponse(error)
    ? ["Route Error", error.status, error.statusText, error.data]
    : error instanceof Error
      ? ["Error", error.message, error.stack]
      : ["Error", JSON.stringify(error, null, 2)];

// export function ErrorBoundary() {
//   const error = useRouteError();
//   console.dir(error);
//   return mapError(error).map((e, i) => <pre key={i}>{e}</pre>);
// }

export function ErrorBoundary() {
  const error = useRouteError();
  console.dir(error);
  return (
    <div className="m-auto">
      Something went wrong.{" "}
      <a className="block text-blue-600 underline" href="/">
        Try again.
      </a>
      {mapError(error).map((e, i) => (
        <pre>{e}</pre>
      ))}
    </div>
  );
}
