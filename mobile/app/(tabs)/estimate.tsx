import { useState } from "react";
import { Alert, Linking, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { ComponentProps } from "react";
import { ActionButton, Heading, Page } from "@/components/ui";
import { services, site } from "@/data/publicContent";
import {
  isEstimateSubmissionConfigured,
  submitEstimateRequest,
  validateEstimateRequest,
  type EstimateRequestInput,
} from "@/lib/estimateRequests";
import { colors } from "@/theme";

const emptyRequest: EstimateRequestInput = {
  fullName: "",
  email: "",
  phone: "",
  propertyAddress: "",
  serviceSlug: "siding",
  projectDescription: "",
  timeline: "",
  privacyConsent: false,
};

export default function EstimateScreen() {
  const [request, setRequest] = useState(emptyRequest);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof EstimateRequestInput>(key: K, value: EstimateRequestInput[K]) {
    setRequest((current) => ({ ...current, [key]: value }));
    setErrorMessage(null);
    setSent(false);
  }

  async function submit() {
    const validationError = validateEstimateRequest(request);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);
    try {
      await submitEstimateRequest(request);
      setRequest(emptyRequest);
      setSent(true);
    } catch (error) {
      console.error("Estimate request submission failed", error);
      setErrorMessage(error instanceof Error ? error.message : "The request could not be sent.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Page contentStyle={styles.page}>
      <Heading eyebrow="Start with a conversation">Request an estimate</Heading>
      <Text style={styles.intro}>
        Tell us a little about the property and the work. We will follow up about next steps. A
        request is not a booking or a final estimate.
      </Text>

      {!isEstimateSubmissionConfigured ? (
        <View style={styles.setupNotice} accessibilityRole="alert">
          <Text style={styles.setupTitle}>Estimate requests are not connected yet</Text>
          <Text style={styles.setupText}>
            Please call or email us to request an estimate while this form is unavailable.
          </Text>
        </View>
      ) : null}

      <View style={styles.form}>
        <View style={styles.formCard}>
          <Text style={styles.groupTitle}>Your details</Text>
          <Text style={styles.groupHint}>How should we get back to you?</Text>
          <Field
            label="Your name"
            value={request.fullName}
            onChangeText={(value) => update("fullName", value)}
            autoComplete="name"
            returnKeyType="next"
          />
          <Field
            label="Email"
            value={request.email}
            onChangeText={(value) => update("email", value)}
            autoComplete="email"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <Field
            label="Phone (optional)"
            value={request.phone}
            onChangeText={(value) => update("phone", value)}
            autoComplete="tel"
            keyboardType="phone-pad"
            returnKeyType="next"
          />
        </View>

        <View style={styles.formCard}>
          <Text style={styles.groupTitle}>Project details</Text>
          <Text style={styles.groupHint}>A few details help us prepare for the conversation.</Text>
          <Field
            label="Property address"
            value={request.propertyAddress}
            onChangeText={(value) => update("propertyAddress", value)}
            autoComplete="street-address"
            returnKeyType="next"
          />

          <View style={styles.serviceSelection}>
            <Text style={styles.label}>What kind of work?</Text>
            <View style={styles.serviceGrid}>
              {services.map((service) => {
                const selected = request.serviceSlug === service.slug;
                return (
                  <Pressable
                    key={service.slug}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    onPress={() => update("serviceSlug", service.slug)}
                    style={[styles.serviceOption, selected && styles.selectedOption]}
                  >
                    <Text style={[styles.optionText, selected && styles.selectedOptionText]}>
                      {service.shortName}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Field
            label="Tell us about the project"
            value={request.projectDescription}
            onChangeText={(value) => update("projectDescription", value)}
            multiline
            placeholder="What would you like done? Include any details that may help us understand the scope."
            textAlignVertical="top"
          />
          <Field
            label="When are you hoping to start? (optional)"
            value={request.timeline}
            onChangeText={(value) => update("timeline", value)}
            placeholder="For example, within the next few months"
          />
        </View>

        <View style={styles.consentCard}>
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: request.privacyConsent }}
          onPress={() => update("privacyConsent", !request.privacyConsent)}
          style={styles.consentRow}
        >
          <View style={[styles.checkbox, request.privacyConsent && styles.checkedBox]}>
            {request.privacyConsent ? <Text style={styles.checkmark}>✓</Text> : null}
          </View>
          <Text style={styles.consentText}>
            I agree to be contacted about this request and have read the{" "}
            <Text style={styles.privacyLink} onPress={() => void openPrivacyPolicy()}>
              Privacy Policy
            </Text>
            .
          </Text>
        </Pressable>
        </View>

        {errorMessage ? (
          <Text accessibilityRole="alert" style={styles.error}>
            {errorMessage}
          </Text>
        ) : null}
        {sent ? (
          <View accessibilityRole="alert" style={styles.successBox}>
            <Text style={styles.successText}>
              Your request was sent. We will follow up about next steps.
            </Text>
          </View>
        ) : null}

        <ActionButton
          onPress={() => void submit()}
          disabled={submitting || !isEstimateSubmissionConfigured}
        >
          {submitting ? "Sending..." : "Send estimate request"}
        </ActionButton>
        <Text style={styles.registration}>
          Washington-registered contractor · No. {site.registrationNo}
        </Text>
      </View>
    </Page>
  );
}

async function openPrivacyPolicy() {
  try {
    await Linking.openURL(`${site.url}/privacy/`);
  } catch (error) {
    console.error("Could not open privacy policy", error);
    Alert.alert("Unable to open the privacy policy", `Visit ${site.url}/privacy/ in your browser.`);
  }
}

function Field({
  label,
  ...props
}: {
  label: string;
} & ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        accessibilityLabel={label}
        placeholderTextColor={colors.muted}
        style={[styles.input, props.multiline && styles.multiline]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { gap: 14 },
  intro: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: -8 },
  setupNotice: {
    backgroundColor: "#FFF4DB",
    borderColor: colors.bronze,
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
    padding: 13,
  },
  setupTitle: { color: colors.ink, fontSize: 14, fontWeight: "700" },
  setupText: { color: colors.charcoal, fontSize: 12, lineHeight: 18 },
  form: { gap: 12 },
  formCard: {
    gap: 13,
    padding: 16,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
  },
  groupTitle: { color: colors.ink, fontSize: 16, fontWeight: "700" },
  groupHint: { color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: -8 },
  consentCard: {
    padding: 14,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
  },
  serviceSelection: { gap: 8 },
  field: { gap: 6 },
  label: { color: colors.ink, fontSize: 13, fontWeight: "700" },
  input: {
    minHeight: 50,
    borderColor: colors.border,
    borderRadius: 9,
    borderWidth: 1,
    backgroundColor: colors.paper,
    color: colors.charcoal,
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  multiline: { minHeight: 112 },
  serviceGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  serviceOption: {
    minHeight: 42,
    minWidth: "30%",
    borderColor: colors.border,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: colors.paper,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  selectedOption: { backgroundColor: colors.ink, borderColor: colors.ink },
  optionText: { color: colors.ink, fontSize: 12, fontWeight: "600" },
  selectedOptionText: { color: colors.parchment },
  consentRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, paddingVertical: 4 },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: colors.muted,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  checkedBox: { backgroundColor: colors.ink, borderColor: colors.ink },
  checkmark: { color: colors.white, fontSize: 14, fontWeight: "700" },
  consentText: { flex: 1, color: colors.charcoal, fontSize: 12, lineHeight: 18 },
  privacyLink: { color: colors.bronzeDeep, textDecorationLine: "underline" },
  error: { color: colors.error, fontSize: 13, lineHeight: 19 },
  successBox: { backgroundColor: "#E8F2EC", borderRadius: 6, padding: 12 },
  successText: { color: colors.success, fontSize: 13, lineHeight: 19, fontWeight: "600" },
  registration: { color: colors.muted, fontSize: 11, lineHeight: 17, textAlign: "center" },
});
