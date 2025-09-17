import { Page } from "@/components/Page/Page";

import { CardUser } from "./components/CardUser/CardUser";
import { Feed } from "./components/Feed/Feed";

export default function Home() {
  return (
    <Page>
      <CardUser />
      <Feed />
    </Page>
  );
}
