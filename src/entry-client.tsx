// @refresh reload
import { StartClient, mount } from "@solidjs/start/client";

// biome-ignore lint/style/noNonNullAssertion: assume that the element exists
mount(() => <StartClient />, document.getElementById("app")!);
