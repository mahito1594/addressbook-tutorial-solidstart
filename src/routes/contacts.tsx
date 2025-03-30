import { type RouteSectionProps, useIsRouting } from "@solidjs/router";
import Sidebar from "~/components/Sidebar";

const ContactLayout = (props: RouteSectionProps) => {
  const isRouting = useIsRouting();

  return (
    <>
      <Sidebar />
      <div id="detail" classList={{ loading: isRouting() }}>
        {props.children}
      </div>
    </>
  );
};
export default ContactLayout;
