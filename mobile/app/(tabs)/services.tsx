import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Heading, Page } from "@/components/ui";
import { services } from "@/data/publicContent";
import { colors } from "@/theme";

export default function ServicesScreen() {
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(search) ||
      service.summary.toLowerCase().includes(search),
  );

  return (
    <Page>
      <View style={styles.heading}>
        <Heading eyebrow="Seattle and King County">Find your service</Heading>
        <Text style={styles.intro}>
          Explore the work we do, what affects cost, and typical timing.
        </Text>
      </View>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          accessibilityLabel="Search services"
          value={query}
          onChangeText={setQuery}
          placeholder="Search siding, tile, flooring..."
          placeholderTextColor={colors.muted}
          returnKeyType="search"
          style={styles.searchInput}
        />
        {query.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            onPress={() => setQuery("")}
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>×</Text>
          </Pressable>
        ) : null}
      </View>
      <View style={styles.list}>
        {filteredServices.map((service) => (
          <Link
            key={service.slug}
            href={{ pathname: "/service/[slug]", params: { slug: service.slug } }}
            asChild
          >
            <Pressable
              accessibilityRole="button"
              accessibilityHint={`Read about ${service.name}`}
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            >
              <View style={styles.serviceMark}>
                <Text style={styles.serviceMarkText}>{service.shortName.slice(0, 1)}</Text>
              </View>
              <View style={styles.serviceCopy}>
                <Text style={styles.name}>{service.name}</Text>
                <Text numberOfLines={2} style={styles.summary}>{service.summary}</Text>
                <Text style={styles.timeline}>{service.timeline.split(".")[0]}.</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          </Link>
        ))}
      </View>
      {filteredServices.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No matching services</Text>
          <Text style={styles.emptyText}>Try another trade or clear your search.</Text>
        </View>
      ) : null}
    </Page>
  );
}

const styles = StyleSheet.create({
  heading: { gap: 7 },
  intro: { color: colors.muted, fontSize: 13, lineHeight: 19 },
  searchBox: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 13,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },
  searchIcon: { color: colors.muted, fontSize: 23, lineHeight: 25 },
  searchInput: { flex: 1, color: colors.ink, fontSize: 14, paddingVertical: 8 },
  clearButton: { width: 30, height: 30, alignItems: "center", justifyContent: "center" },
  clearText: { color: colors.muted, fontSize: 22, lineHeight: 25 },
  list: { gap: 10 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 92,
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    padding: 13,
  },
  serviceMark: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: colors.parchmentDeep,
  },
  serviceMarkText: { color: colors.bronzeDeep, fontSize: 16, fontWeight: "700" },
  serviceCopy: { flex: 1, gap: 4 },
  name: { color: colors.ink, fontSize: 15, fontWeight: "700" },
  summary: { color: colors.muted, fontSize: 12, lineHeight: 17 },
  timeline: { color: colors.bronzeDeep, fontSize: 10, lineHeight: 15, fontWeight: "600" },
  arrow: { color: colors.bronzeDeep, fontSize: 22, paddingLeft: 2 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  emptyState: {
    alignItems: "center",
    backgroundColor: colors.paper,
    borderRadius: 14,
    gap: 5,
    padding: 22,
  },
  emptyTitle: { color: colors.ink, fontSize: 15, fontWeight: "700" },
  emptyText: { color: colors.muted, fontSize: 12, textAlign: "center" },
});
