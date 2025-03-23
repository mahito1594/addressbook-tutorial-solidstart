import { A } from "@solidjs/router";

const About = () => {
  return (
    <div id="about">
      <A href="/">← Go to demo</A>
      <h1>About Solid Start</h1>

      <div>
        <p>
          This is a demo application showing off some of the powerful features of Solid Start,
          including dynamic routing, nested routes, data fetching/mutation, and more.
        </p>

        <h2>Features</h2>
        <p>Explore the demo to see how Solid Start handles:</p>
        <ul>
          <li>Data fetching and mutaions</li>
          <li>Nested routing with nested layouts</li>
          <li>URL-based routing with dynamic segments</li>
          <li>Pending and optimistic UI</li>
        </ul>

        <h2>Learn More</h2>
        <p>
          Check out the official documentaion at{" "}
          <a href="https://docs.solidjs.com/solid-start">docs.solidjs.com</a> to learn more about
          building great web applications with Solid Start.
        </p>
      </div>
    </div>
  );
};
export default About;
