import { Outlet, useLoaderData, useOutletContext } from "react-router";
import type { DetailsAndServices } from "~/types/types";

export default function Services() {
  const data = useOutletContext<DetailsAndServices>();
  console.log("Services1: ", data);
  return <Outlet context={data} />;
}
