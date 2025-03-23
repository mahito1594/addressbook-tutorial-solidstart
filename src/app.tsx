import { MetaProvider, Title } from "@solidjs/meta";
import {
  A,
  query,
  type RouteSectionProps,
  Router,
  createAsync,
  type RouteDefinition,
} from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { For, Show, Suspense } from "solid-js";
import { getContacts } from "./data";
import "./app.css";

const queryContacts = query(async () => {
  "use server";
  return await getContacts();
}, "contacts");

export const route = {
  preload: () => queryContacts(),
} satisfies RouteDefinition;

const GlobalLayout = (props: RouteSectionProps) => {
  const contacts = createAsync(() => queryContacts());
  const contactsLength = () => contacts()?.length || 0;
  return (
    <>
      <div id="sidebar">
        <h1>
          <A href="/about">Solid Start Contacts</A>
        </h1>
        <div>
          <form id="search-form">
            <input
              aria-label="Search contacts"
              id="q"
              name="q"
              placeholder="Search"
              type="search"
            />
            <div aria-hidden hidden={true} id="search-spinner" />
          </form>
          <form>
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <Suspense>
            <Show
              when={contactsLength() > 0}
              fallback={
                <p>
                  <i>No contacts</i>
                </p>
              }
            >
              <ul>
                <For each={contacts()}>
                  {(contact) => (
                    <li>
                      <A href={`/contacts/${contact.id}`}>
                        <Show when={contact.first || contact.last} fallback={<i>No Name</i>}>
                          {contact.first} {contact.last}
                        </Show>
                        <Show when={contact.favorite}>
                          <span>★</span>
                        </Show>
                      </A>
                    </li>
                  )}
                </For>
              </ul>
            </Show>
          </Suspense>
        </nav>
      </div>
      <div id="detail">
        <Suspense
          fallback={
            <div id="lading-splash">
              <div class="loading-splash-spinner">
                <p>Loading, pleas wait</p>
              </div>
            </div>
          }
        >
          {props.children}
        </Suspense>
      </div>
    </>
  );
};

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
