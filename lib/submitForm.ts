"use server";

export type FormKind =
  | "national-signup"
  | "city-signup"
  | "market-application"
  | "partner-application"
  | "sponsor-inquiry"
  | "message-hosts";

export type FormPayload = {
  kind: FormKind;
  fields: Record<string, string>;
};

/**
 * Single stub for every form on the site.
 * It records nothing and sends nothing. Brevo (or another destination) plugs in here later.
 */
export async function submitForm(payload: FormPayload): Promise<{ ok: true; sent: false }> {
  void payload.kind;
  void payload.fields;
  return { ok: true, sent: false };
}
