import type { RouteSectionProps } from "@solidjs/router";
import Sidebar from "~/components/Sidebar";

const ContactLayout = (props: RouteSectionProps) => {
  return (
    <>
      <Sidebar />
      <div id="detail">{props.children}</div>
    </>
  );
};
export default ContactLayout;
