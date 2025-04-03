import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Costa: Code Assignment" },
    { name: "description", content: "Welcome to Start page!" },
  ];
}

export default function Home() {
  return (
    <>
      <div>The start page</div>
      <Link to="/about">About</Link>
    </>
  );
}
