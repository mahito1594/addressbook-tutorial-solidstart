import { MetaProvider, Title } from "@solidjs/meta";
import { A, type RouteSectionProps, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

const GlobalLayout = (props: RouteSectionProps) => (
  <>
    <div id="sidebar">
      <h1>Solid Start Contacts</h1>
      <div>
        <form id="search-form">
          <input aria-label="Search contacts" id="q" name="q" placeholder="Search" type="search" />
          <div aria-hidden hidden={true} id="search-spinner" />
        </form>
        <form>
          <button type="submit">New</button>
        </form>
      </div>
      <nav>
        <ul>
          <li>
            <A href="/contacts/1">Your Name</A>
          </li>
          <li>
            <A href="/contacts/2">Your Friends</A>
          </li>
        </ul>
      </nav>
    </div>
    <div id="detail">
      <Suspense>{props.children}</Suspense>
    </div>
  </>
);

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Solid Start Contacts</Title>
          <GlobalLayout {...props} />
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
