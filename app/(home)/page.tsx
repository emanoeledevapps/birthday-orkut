import { Page } from "../../components/Page/Page";
import { checkUserExists } from "../actions";
import { CardUser } from "./components/CardUser/CardUser";

export default async function Home() {
  const response = await checkUserExists({
    email: "emanoelaugusto7@gmail.com",
  });
  console.log(response);
  return (
    <Page>
      <CardUser />
    </Page>
  );
}
