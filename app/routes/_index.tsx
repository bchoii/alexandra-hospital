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
          <img className="max-h-8 md:max-h-10" src="/assets/logo.jpg"></img>
          <div className="ml-auto text-3xl font-bold md:text-4xl">Dify</div>
        </div>
      </header>
      <div className="m-auto flex max-w-2xl flex-wrap gap-2 text-2xl font-light lg:max-w-5xl">
        <Link
          className="w-80 rounded bg-gray-50 p-8 text-center shadow transition hover:bg-white hover:shadow-md"
          to={"ah/list"}
        >
          Start Here
        </Link>
      </div>
      <Outlet></Outlet>
      <footer
        className="grid place-content-center p-5 text-center text-neutral-100 *:m-2"
        style={{ background: "#323232" }}
      >
        <div className="grid *:mx-10 md:flex">
          <a href="https://wa.me/6596693329">Contact Me</a>
        </div>
        <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
        <div>© {year} Bernard Choi</div>
      </footer>
      <div className="scroll-watcher"></div>
    </>
  );
}
