import { ActionButton, Heading, Page } from "@/components/ui";

export default function NotFoundScreen() {
  return (
    <Page>
      <Heading>Page not found</Heading>
      <ActionButton href="/(tabs)">Go to Home</ActionButton>
    </Page>
  );
}
