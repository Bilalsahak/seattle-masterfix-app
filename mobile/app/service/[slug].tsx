/* eslint-disable jsx-a11y/alt-text -- React Native Image uses accessibilityLabel instead of alt. */
import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { Accordion, ActionButton, BackLink, Card, Heading, Page } from "@/components/ui";
import { services, site } from "@/data/publicContent";
import { colors } from "@/theme";

export default function ServiceDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <Page>
        <Heading>Service not found</Heading>
        <Text style={styles.body}>Choose a service from the services list.</Text>
      </Page>
    );
  }

  const photoFile = service.heroFile ?? service.photoSet?.files[0];
  const photoTrade = service.photoSet?.trade ?? service.slug;
  const photoUrl = photoFile ? `${site.url}/images/services/${photoTrade}/${photoFile}` : null;

  return (
    <Page>
      <BackLink href="/(tabs)/services">← All services</BackLink>
      <Heading eyebrow={service.name}>{service.headline}</Heading>
      {photoUrl ? (
        <Image
          accessibilityLabel={`${service.name} project photo`}
          source={{ uri: photoUrl }}
          resizeMode="cover"
          style={styles.heroImage}
        />
      ) : null}
      <Card style={styles.introCard}>
        <Text style={styles.body}>{service.intro}</Text>
      </Card>

      <Accordion title="Typical timing" subtitle={service.timeline} />

      <Accordion title="What affects the cost" subtitle={`${service.costDrivers.length} pricing factors`}>
        {service.costDrivers.map((item) => (
          <Text key={item} style={styles.bullet}>• {item}</Text>
        ))}
      </Accordion>

      <Accordion title="Materials and systems" subtitle="See common options">
        {service.materials.map((item) => (
          <Text key={item} style={styles.bullet}>• {item}</Text>
        ))}
      </Accordion>

      <Accordion title="How we approach the work" subtitle={`${service.process.length} project steps`}>
        {service.process.map((step) => (
          <View key={step.title} style={styles.processStep}>
            <Text style={styles.cardTitle}>{step.title}</Text>
            <Text style={styles.body}>{step.body}</Text>
          </View>
        ))}
      </Accordion>

      <ActionButton href="/(tabs)/estimate">
        Request an estimate for {service.shortName.toLowerCase()}
      </ActionButton>
    </Page>
  );
}

const styles = StyleSheet.create({
  heroImage: { width: "100%", height: 230, borderRadius: 14, backgroundColor: colors.parchmentDeep },
  introCard: { borderRadius: 14, padding: 18 },
  body: { color: colors.charcoal, fontSize: 14, lineHeight: 21 },
  cardTitle: { color: colors.ink, fontSize: 15, fontWeight: "700" },
  processStep: { paddingTop: 10, borderTopColor: colors.border, borderTopWidth: 1, gap: 5 },
  bullet: { color: colors.charcoal, fontSize: 14, lineHeight: 21 },
});
