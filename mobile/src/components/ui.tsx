import { PropsWithChildren } from "react";
import { useState } from "react";
import { Href, Link } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme";

export function Page({
  children,
  contentStyle,
}: PropsWithChildren<{ contentStyle?: StyleProp<ViewStyle> }>) {
  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <ScrollView
        contentContainerStyle={[styles.content, contentStyle]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Heading({
  eyebrow,
  children,
  style,
}: PropsWithChildren<{ eyebrow?: string; style?: StyleProp<TextStyle> }>) {
  return (
    <View style={styles.heading}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={[styles.title, style]}>{children}</Text>
    </View>
  );
}

export function Card({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function Accordion({
  title,
  subtitle,
  children,
  initiallyOpen = false,
}: PropsWithChildren<{
  title: string;
  subtitle?: string;
  initiallyOpen?: boolean;
}>) {
  const [open, setOpen] = useState(initiallyOpen);

  return (
    <View style={styles.accordion}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((value) => !value)}
        style={styles.accordionTrigger}
      >
        <View style={styles.accordionCopy}>
          <Text style={styles.accordionTitle}>{title}</Text>
          {subtitle ? <Text style={styles.accordionSubtitle}>{subtitle}</Text> : null}
        </View>
        <View style={[styles.accordionMark, open && styles.accordionMarkOpen]}>
          <Text style={[styles.accordionMarkText, open && styles.accordionMarkTextOpen]}>
            {open ? "−" : "+"}
          </Text>
        </View>
      </Pressable>
      {open ? <View style={styles.accordionContent}>{children}</View> : null}
    </View>
  );
}

export function BackLink({ href, children }: PropsWithChildren<{ href: Href }>) {
  return (
    <Link href={href} style={styles.backLink}>
      {children}
    </Link>
  );
}

export function ActionButton({
  children,
  onPress,
  href,
  variant = "primary",
  disabled = false,
}: PropsWithChildren<{
  onPress?: () => void;
  href?: Href;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}>) {
  const button = (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "primary" ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
      ]}
    >
      <Text style={variant === "primary" ? styles.primaryButtonText : styles.secondaryButtonText}>
        {children}
      </Text>
    </Pressable>
  );

  return href ? (
    <Link href={href} asChild>
      {button}
    </Link>
  ) : (
    button
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.parchment },
  content: {
    width: "100%",
    maxWidth: 680,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 20,
  },
  heading: { gap: 7 },
  eyebrow: {
    color: colors.bronzeDeep,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  title: { color: colors.ink, fontSize: 26, fontWeight: "700", lineHeight: 32 },
  card: {
    padding: 17,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    gap: 9,
  },
  accordion: {
    overflow: "hidden",
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
  },
  accordionTrigger: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  accordionCopy: { flex: 1, gap: 4 },
  accordionTitle: { color: colors.ink, fontSize: 14, fontWeight: "700", lineHeight: 20 },
  accordionSubtitle: { color: colors.muted, fontSize: 12, lineHeight: 17 },
  accordionMark: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: colors.parchment,
  },
  accordionMarkOpen: { backgroundColor: colors.ink },
  accordionMarkText: { color: colors.ink, fontSize: 18, fontWeight: "500", lineHeight: 22 },
  accordionMarkTextOpen: { color: colors.white },
  accordionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 2,
    gap: 10,
  },
  button: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  primaryButton: { backgroundColor: colors.bronze },
  secondaryButton: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border },
  disabledButton: { opacity: 0.55 },
  pressedButton: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  primaryButtonText: { color: colors.ink, fontSize: 14, fontWeight: "700", letterSpacing: 0.2 },
  secondaryButtonText: { color: colors.ink, fontSize: 14, fontWeight: "700" },
  backLink: { color: colors.bronzeDeep, fontSize: 13, fontWeight: "700", alignSelf: "flex-start" },
});
