import { PropsWithChildren } from "react";
import HeaderComponent from "../components/Header/Header";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <HeaderComponent/>

      {/* <section style={{ height: "10vh", backgroundColor: "red" }}>
        <h1>HERE IS BREADCRUMB</h1>
      </section> */}

      <section style={{ minHeight: "60vh" }}>{children}</section>

      {/* <footer style={{ height: "15vh", backgroundColor: "red" }}>
        <h1>HERE IS FOOTER</h1>
      </footer> */}
    </div>
  );
}
