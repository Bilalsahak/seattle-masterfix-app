/* eslint-disable jsx-a11y/alt-text -- React Native Image uses accessibilityLabel instead of alt. */
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Accordion, ActionButton, BackLink, Card, Heading, Page } from "@/components/ui";
import {
  faqGroups,
  guides,
  neighbourhoodsInRegion,
  photos,
  processSteps,
  regionLabels,
  site,
  PHOTO_NOTE,
} from "@/data/publicContent";
import { colors } from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";

type InfoSection = "faq" | "guides" | "projects" | "process" | "service-area";

export default function InfoScreen() {
  const { section } = useLocalSearchParams<{ section: string }>();

  switch (section as InfoSection) {
    case "faq":
      return <FaqScreen />;
    case "guides":
      return <GuidesScreen />;
    case "projects":
      return <ProjectsScreen />;
    case "process":
      return <ProcessScreen />;
    case "service-area":
      return <ServiceAreaScreen />;
    default:
      return (
        <Page>
          <Heading>Information not found</Heading>
          <Text style={styles.body}>Choose a section from the More tab.</Text>
        </Page>
      );
  }
}

function FaqScreen() {
  return (
    <Page>
      <BackLink href="/(tabs)/more">← More</BackLink>
      <Heading eyebrow="Helpful answers">Frequently asked questions</Heading>
      {faqGroups.map((group) => (
        <View key={group.id} style={styles.section}>
          <Text style={styles.sectionTitle}>{group.title}</Text>
          {group.items.map((item) => (
            <Accordion key={item.id} title={item.q}>
              <Text style={styles.body}>{faqAnswer(item.id, item.a)}</Text>
            </Accordion>
          ))}
        </View>
      ))}
    </Page>
  );
}

function faqAnswer(id: string, answer: string) {
  if (id === "how-do-i-get-an-estimate") {
    return `Use the Estimate tab to share your project details, address, contact information, and timeline, or call ${site.phone} or email ${site.email}. We review the request and follow up about next steps.`;
  }
  if (id === "can-i-send-photos") {
    return `Photo attachments are not available in the app yet. Email photos to ${site.email} and mention your name.`;
  }
  return answer;
}

function GuidesScreen() {
  return (
    <Page>
      <BackLink href="/(tabs)/more">← More</BackLink>
      <Heading eyebrow="Planning projects">Cost guides</Heading>
      <Text style={styles.body}>
        These published planning figures are not a quote. Final pricing depends on the property,
        scope, materials, and conditions; the written estimate confirms the price for your job.
      </Text>
      {guides.map((guide) => (
        <Accordion
          key={guide.slug}
          title={guide.title}
          subtitle={`Planning range ${currency(guide.mfStarting)}–${currency(guide.mfHigh)}`}
        >
          <Text style={styles.guideRange}>
            Public market reference: {currency(guide.low)}–{currency(guide.high)}
          </Text>
          <Text style={styles.body}>{guide.notes}</Text>
          <Text style={styles.guideRange}>{guide.mfLabel}</Text>
          <Text style={styles.body}>{guide.mfNote}</Text>
          <Text style={styles.smallText}>
            Typical timing: {guide.timelineWeeks ?? "Depends on project scope"}
          </Text>
          {guide.costDrivers.slice(0, 4).map((driver) => (
            <Text key={driver} style={styles.bullet}>• {driver}</Text>
          ))}
        </Accordion>
      ))}
    </Page>
  );
}

function ProjectsScreen() {
  const [selectedTrade, setSelectedTrade] = useState("all");
  const tradeFilters = ["all", ...new Set(photos.map((photo) => photo.trade))];
  const visiblePhotos =
    selectedTrade === "all" ? photos : photos.filter((photo) => photo.trade === selectedTrade);

  return (
    <SafeAreaView edges={["top"]} style={styles.listSafe}>
      <FlatList
        data={visiblePhotos}
        keyExtractor={(photo) => photo.src}
        contentContainerStyle={styles.photoList}
        ItemSeparatorComponent={() => <View style={styles.photoSeparator} />}
        ListHeaderComponent={
          <View style={styles.photoHeader}>
            <BackLink href="/(tabs)/more">← More</BackLink>
            <Heading eyebrow="A look at the work">Project photos</Heading>
            <Text style={styles.body}>{PHOTO_NOTE}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterList}
            >
              {tradeFilters.map((trade) => {
                const selected = trade === selectedTrade;
                return (
                  <Pressable
                    key={trade}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    onPress={() => setSelectedTrade(trade)}
                    style={[styles.filterChip, selected && styles.selectedFilterChip]}
                  >
                    <Text style={[styles.filterText, selected && styles.selectedFilterText]}>
                      {trade === "all" ? "All work" : trade}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        }
        renderItem={({ item: photo }) => (
          <Card style={styles.photoCard}>
            <Image
              accessibilityLabel={photo.alt}
              source={{ uri: `${site.url}${photo.src}` }}
              resizeMode="cover"
              style={styles.projectImage}
            />
            <Text style={styles.photoCaption}>{photo.caption}</Text>
            <Text style={styles.smallText}>{photo.trade}</Text>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}

function ProcessScreen() {
  return (
    <Page>
      <BackLink href="/(tabs)/more">← More</BackLink>
      <Heading eyebrow="A clear path from start to finish">How we work</Heading>
      {processSteps.map((step) => (
        <Card key={step.step}>
          <Text style={styles.stepNumber}>{step.step}</Text>
          <Text style={styles.cardTitle}>{step.title}</Text>
          <Text style={styles.body}>{step.body}</Text>
        </Card>
      ))}
      <Card>
        <Text style={styles.cardTitle}>Warranty</Text>
        <Text style={styles.body}>{site.warrantyTerms}</Text>
      </Card>
    </Page>
  );
}

function ServiceAreaScreen() {
  return (
    <Page>
      <BackLink href="/(tabs)/more">← More</BackLink>
      <Heading eyebrow="Seattle and King County">Service area</Heading>
      <Text style={styles.body}>
        Our service area is Seattle and King County, Washington. The property address and written
        estimate confirm whether a particular project is in scope.
      </Text>

      {Object.entries(regionLabels).map(([region, label]) => {
        const areas = neighbourhoodsInRegion(region as keyof typeof regionLabels);
        if (!areas.length) return null;
        return (
          <Accordion
            key={region}
            title={label}
            subtitle={`${areas.length} areas`}
            initiallyOpen={region === "home-turf"}
          >
            {areas.map((area) => (
              <View key={area.slug} style={styles.areaCard}>
                <Text style={styles.cardTitle}>{area.name}</Text>
                <Text style={styles.body}>{area.intro}</Text>
              </View>
            ))}
          </Accordion>
        );
      })}

      <Card>
        <Text style={styles.cardTitle}>Not sure if your address is in range?</Text>
        <Text style={styles.body}>Send the property address with your estimate request.</Text>
        <ActionButton href="/(tabs)/estimate">
          Request an estimate
        </ActionButton>
      </Card>
    </Page>
  );
}

function currency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

const styles = StyleSheet.create({
  section: { gap: 10 },
  sectionTitle: { color: colors.ink, fontSize: 19, fontWeight: "700" },
  cardTitle: { color: colors.ink, fontSize: 15, fontWeight: "700" },
  body: { color: colors.charcoal, fontSize: 13, lineHeight: 20 },
  bullet: { color: colors.charcoal, fontSize: 12, lineHeight: 18 },
  guideRange: { color: colors.bronzeDeep, fontSize: 13, fontWeight: "700", lineHeight: 19 },
  smallText: { color: colors.muted, fontSize: 11, lineHeight: 16 },
  listSafe: { flex: 1, backgroundColor: colors.parchment },
  photoList: { padding: 20, paddingBottom: 36 },
  photoHeader: { gap: 14, marginBottom: 12 },
  filterList: { gap: 8, paddingRight: 20 },
  filterChip: {
    minHeight: 34,
    justifyContent: "center",
    paddingHorizontal: 13,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.paper,
  },
  selectedFilterChip: { backgroundColor: colors.ink, borderColor: colors.ink },
  filterText: { color: colors.muted, fontSize: 11, fontWeight: "700", textTransform: "capitalize" },
  selectedFilterText: { color: colors.white },
  photoSeparator: { height: 10 },
  photoCard: { padding: 9, borderRadius: 14 },
  projectImage: { width: "100%", height: 210, borderRadius: 9, backgroundColor: colors.parchmentDeep },
  photoCaption: { color: colors.ink, fontSize: 13, fontWeight: "600", lineHeight: 18 },
  stepNumber: { color: colors.bronzeDeep, fontSize: 11, fontWeight: "700", letterSpacing: 1.2 },
  areaCard: { paddingTop: 10, borderTopColor: colors.border, borderTopWidth: 1, gap: 5 },
});
