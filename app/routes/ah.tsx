import {
  type ActionFunctionArgs,
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { sitename_ } from "../utils/config";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const host = request.headers.get("host");
  const sitename = sitename_(host ?? "");
  return { host, sitename };
};

export default function Component() {
  const year = new Date().toISOString().slice(0, 4);

  return (
    <>
      <header
        style={{
          background: "linear-gradient(to bottom, #c7d2fe 70%, transparent)",
        }}
      >
        <div className="flex p-10">
          <Link to={"/"}>
            <img className="max-h-8 md:max-h-10" src="/assets/logo.jpg"></img>
          </Link>
          <div className="ml-auto text-3xl font-bold md:text-4xl">Dify</div>
        </div>
      </header>
      <div>
        <NavLink
          className="m-2 bg-gray-50 px-5 py-2 text-center text-blue-700 underline shadow transition hover:bg-white"
          to={"create"}
        >
          Create Knowledge
        </NavLink>
        <NavLink
          className="m-2 bg-gray-50 px-5 py-2 text-center text-blue-700 underline shadow transition hover:bg-white"
          to={"list"}
        >
          List All Knowledge
        </NavLink>
      </div>
      <div className="grow">
        <Outlet></Outlet>
      </div>
      <footer
        className="grid place-content-center p-5 text-center text-neutral-100 *:m-2"
        style={{ background: "#323232" }}
      >
        <a href="https://wa.me/6596693329">© {year} Bernard Choi</a>
      </footer>
      <div className="scroll-watcher"></div>
    </>
  );
}
