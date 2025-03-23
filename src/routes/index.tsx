import type { RouteDefinition } from "@solidjs/router";
import Sidebar, { queryContacts } from "~/components/Sidebar";

export const route = {
  preload: () => queryContacts(),
} satisfies RouteDefinition;

const Home = () => {
  return (
    <>
      <Sidebar />
      <div id="detail">
        <p id="index-page">
          This is a demo for Solid Start.
          <br />
          Check out <a href="https://docs.solidjs.com/solid-start">the docs at docs.solidjs.com</a>.
        </p>
      </div>
    </>
  );
};

export default Home;
