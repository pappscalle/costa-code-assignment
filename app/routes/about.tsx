import { Link } from "react-router";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About page" },
    { name: "description", content: "Welcome to the About page!" },
  ];
}

export default function About() {
  return (
    <>
      <div>About</div>
      <Link to="/">Home</Link>
    </>
  );
}
