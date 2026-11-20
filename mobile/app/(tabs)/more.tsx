import { Link } from "expo-router";
import { Alert, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Card, Heading, Page } from "@/components/ui";
import { site } from "@/data/publicContent";
import { colors } from "@/theme";

const items = [
  { title: "About Seattle MasterFix", subtitle: "Business details, local focus, and services", section: "about" },
  { title: "Property managers & GCs", subtitle: "Unit turns, punch lists, and repeat work", section: "property-managers" },
  { title: "Service area", subtitle: "Seattle neighborhoods and nearby cities", section: "service-area" },
  { title: "FAQs", subtitle: "Estimates, timelines, permits, and getting ready", section: "faq" },
  { title: "Cost guides", subtitle: "Planning ranges and project considerations", section: "guides" },
  { title: "Project photos", subtitle: "A look at work by members of our crew", section: "projects" },
  { title: "How we work", subtitle: "From first conversation through closeout", section: "process" },
] as const;

export default function MoreScreen() {
  return (
    <Page>
      <Heading eyebrow="More information">Explore</Heading>

      <View style={styles.introCard}>
        <Text style={styles.introTitle}>Good to know, before the work begins.</Text>
        <Text style={styles.introText}>
          Find answers, see what we do, and get to know the Seattle neighborhoods we serve.
        </Text>
      </View>

      <View style={styles.list}>
        {items.map((item) => (
          <Link
            key={item.section}
            href={{ pathname: "/info", params: { section: item.section } }}
            asChild
          >
            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [styles.row, pressed && styles.pressed]}
            >
              <View style={styles.rowCopy}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <Card>
        <Text style={styles.cardTitle}>Seattle MasterFix</Text>
        <Text style={styles.detail}>{site.address.full}</Text>
        <Pressable accessibilityRole="link" onPress={() => void openLink(site.phoneHref)}>
          <Text style={styles.contactLink}>{site.phone}</Text>
        </Pressable>
        <Pressable accessibilityRole="link" onPress={() => void openLink(`mailto:${site.email}`)}>
          <Text style={styles.contactLink}>{site.email}</Text>
        </Pressable>
        <Text style={styles.hoursHeading}>Business hours</Text>
        {site.hours.map((hours) => (
          <Text key={hours.days} style={styles.detail}>
            {hours.days}: {hours.time}
          </Text>
        ))}
        <Text style={styles.detail}>Washington registration {site.registrationNo}</Text>
        <Pressable accessibilityRole="link" onPress={() => void openLink(site.calendly)}>
          <Text style={styles.contactLink}>Book a consultation</Text>
        </Pressable>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Policies</Text>
        <Pressable accessibilityRole="link" onPress={() => void openLink(`${site.url}/privacy/`)}>
          <Text style={styles.contactLink}>Privacy Policy</Text>
        </Pressable>
        <Pressable accessibilityRole="link" onPress={() => void openLink(`${site.url}/terms/`)}>
          <Text style={styles.contactLink}>Terms of Use</Text>
        </Pressable>
      </Card>

      <Card style={styles.futureCard}>
        <Text style={styles.cardTitle}>Project tracking</Text>
        <Text style={styles.detail}>
          Customer sign-in and private project updates are planned for the next build phase.
        </Text>
      </Card>
    </Page>
  );
}

async function openLink(url: string) {
  try {
    await Linking.openURL(url);
  } catch (error) {
    console.error("Could not open contact link", error);
    Alert.alert("Unable to open link", `Please contact us at ${site.phone} or ${site.email}.`);
  }
}

const styles = StyleSheet.create({
  introCard: {
    gap: 7,
    padding: 17,
    backgroundColor: colors.parchmentDeep,
    borderRadius: 14,
  },
  introTitle: { color: colors.ink, fontSize: 16, fontWeight: "700", lineHeight: 22 },
  introText: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  list: { gap: 9 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 72,
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
  },
  rowCopy: { flex: 1, gap: 4 },
  rowTitle: { color: colors.ink, fontSize: 15, fontWeight: "700" },
  rowSubtitle: { color: colors.muted, fontSize: 12, lineHeight: 17 },
  arrow: { color: colors.bronzeDeep, fontSize: 26, paddingLeft: 10 },
  pressed: { opacity: 0.8 },
  cardTitle: { color: colors.ink, fontSize: 16, fontWeight: "700" },
  detail: { color: colors.muted, fontSize: 13, lineHeight: 19 },
  contactLink: { color: colors.bronzeDeep, fontSize: 13, fontWeight: "600", paddingVertical: 2 },
  hoursHeading: { color: colors.ink, fontSize: 13, fontWeight: "700", marginTop: 6 },
  futureCard: { backgroundColor: colors.parchmentDeep, borderColor: colors.parchmentDeep },
});
