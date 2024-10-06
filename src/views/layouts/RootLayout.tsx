import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <header style={{ height: "15vh", backgroundColor: "red" }}>
        <h1>HERE IS HEADER</h1>
      </header>

      <section style={{ height: "10vh", backgroundColor: "red" }}>
        <h1>HERE IS BREADCRUMB</h1>
      </section>

      <section style={{ minHeight: "60vh" }}>{children}</section>

      <footer style={{ height: "15vh", backgroundColor: "red" }}>
        <h1>HERE IS FOOTER</h1>
      </footer>
    </div>
  );
}
