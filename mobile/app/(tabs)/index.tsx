import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ActionButton, Card, Heading, Page } from "@/components/ui";
import { services, site } from "@/data/publicContent";
import { colors } from "@/theme";

export default function HomeScreen() {
  return (
    <Page>
      <View style={styles.hero}>
        <View style={styles.localBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.eyebrow}>Seattle & King County</Text>
        </View>
        <Text style={styles.title}>Seattle MasterFix</Text>
        <Text style={styles.tagline}>{site.tagline}</Text>
        <Text style={styles.description}>
          Practical remodeling and repair for local homes, with clear communication from the first
          conversation.
        </Text>
        <View style={styles.localLine}>
          <Text style={styles.localTitle}>Locally based in Ballard</Text>
          <Text style={styles.localAreas}>Serving {site.serviceArea}</Text>
        </View>
        <ActionButton href="/(tabs)/estimate">
          Request an estimate
        </ActionButton>
        <Link href="/(tabs)/services" style={styles.heroLink}>
          Browse services
        </Link>
      </View>

      <View style={styles.sectionHeader}>
        <Heading eyebrow="What we do">Services</Heading>
        <Link href="/(tabs)/services" style={styles.link}>See all</Link>
      </View>

      <View style={styles.serviceGrid}>
        {services.slice(0, 4).map((service) => (
          <Link
            key={service.slug}
            href={{ pathname: "/service/[slug]", params: { slug: service.slug } }}
            asChild
          >
            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [styles.serviceCard, pressed && styles.pressed]}
            >
              <View style={styles.serviceCardTop}>
                <View style={styles.serviceMark}>
                  <Text style={styles.serviceMarkText}>{service.shortName.slice(0, 1)}</Text>
                </View>
                <Text style={styles.serviceArrow}>↗</Text>
              </View>
              <Text numberOfLines={2} style={styles.serviceName}>{service.name}</Text>
              <Text numberOfLines={3} style={styles.serviceSummary}>
                {service.summary}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <Card style={styles.trustCard}>
        <Text style={styles.trustEyebrow}>The local difference</Text>
        <Text style={styles.trustHeading}>Rooted in Seattle</Text>
        <Text style={styles.trustText}>
          Based in Ballard, serving Seattle and King County. Our home turf includes{" "}
          {site.homeTurf.join(", ")}.
        </Text>
        <Text style={styles.trustLicense}>WA registration {site.registrationNo}</Text>
        <Link
          href={{ pathname: "/info", params: { section: "service-area" } }}
          style={[styles.link, styles.trustLink]}
        >
          Explore our service area →
        </Link>
      </Card>
    </Page>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.ink,
    borderRadius: 18,
    padding: 22,
    gap: 13,
    overflow: "hidden",
  },
  localBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#FFFFFF12",
  },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.bronze },
  eyebrow: {
    color: colors.bronzeLight,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  title: {
    color: colors.parchment,
    fontSize: 31,
    fontWeight: "700",
    lineHeight: 37,
    letterSpacing: -0.5,
  },
  tagline: { color: colors.bronzeLight, fontSize: 15, fontWeight: "600", lineHeight: 22 },
  description: { color: "#FFFFFFD9", fontSize: 14, lineHeight: 22 },
  localLine: { borderTopWidth: 1, borderTopColor: "#FFFFFF24", paddingTop: 12, gap: 4 },
  localTitle: { color: colors.parchment, fontSize: 13, fontWeight: "700" },
  localAreas: { color: "#FFFFFFB8", fontSize: 12, lineHeight: 18 },
  heroLink: { color: colors.bronzeLight, fontSize: 13, fontWeight: "700", alignSelf: "center" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  serviceGrid: {
    flexDirection: "column",
    rowGap: 10,
  },
  serviceCard: {
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
    padding: 13,
    width: "100%",
    minWidth: 0,
    minHeight: 142,
  },
  serviceCardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  serviceMark: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    backgroundColor: colors.parchmentDeep,
  },
  serviceMarkText: { color: colors.bronzeDeep, fontSize: 14, fontWeight: "700" },
  serviceArrow: { color: colors.bronzeDeep, fontSize: 16, fontWeight: "700" },
  serviceName: { color: colors.ink, fontSize: 14, fontWeight: "700", lineHeight: 19 },
  serviceSummary: { color: colors.muted, fontSize: 11, lineHeight: 16 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.985 }] },
  trustCard: { gap: 7, borderRadius: 14 },
  trustEyebrow: {
    color: colors.bronzeDeep,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  trustHeading: { color: colors.ink, fontSize: 18, fontWeight: "700" },
  trustText: { color: colors.muted, fontSize: 13, lineHeight: 19 },
  trustLicense: { color: colors.inkSoft, fontSize: 11, fontWeight: "600", marginTop: 2 },
  trustLink: { marginTop: 4 },
  link: { color: colors.bronzeDeep, fontSize: 13, fontWeight: "700" },
});
