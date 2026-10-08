"use client";

import { useState } from "react";
import { submitForm, type FormKind } from "@/lib/submitForm";

function useSubmit(kind: FormKind) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields: Record<string, string> = {};
    data.forEach((value, key) => {
      fields[key] = String(value);
    });
    setStatus("sending");
    await submitForm({ kind, fields });
    setStatus("done");
  }

  return { status, onSubmit };
}

function Done({ children }: { children: string }) {
  return (
    <p className="success" role="status">
      {children}
    </p>
  );
}

const THANKS =
  "Thanks. This preview does not send messages yet, so nothing was submitted.";

export function SignupForm({
  kind,
  button,
  emailLabel,
  cityPlaceholder = "Your city",
  cityValue,
  showSms = true,
}: {
  kind: "national-signup" | "city-signup";
  button: string;
  emailLabel: string;
  cityPlaceholder?: string;
  cityValue?: string;
  showSms?: boolean;
}) {
  const { status, onSubmit } = useSubmit(kind);
  if (status === "done") return <Done>{THANKS}</Done>;
  return (
    <form className="form" onSubmit={onSubmit}>
      {kind === "city-signup" ? (
        <>
          <input type="hidden" name="city" value={cityValue} />
          <input className="full" name="name" placeholder="Name" aria-label="Name" required />
          <input name="email" type="email" placeholder="Email" aria-label="Email" required />
          <input name="phone" type="tel" placeholder="Phone" aria-label="Phone" />
        </>
      ) : (
        <>
          <input name="firstName" placeholder="First name" aria-label="First name" required />
          <input name="email" type="email" placeholder="Email" aria-label="Email" required />
          <input
            className="full"
            name="city"
            placeholder={cityPlaceholder}
            aria-label="City"
            defaultValue={cityValue}
            required
          />
          <input className="full" name="phone" type="tel" placeholder="Phone (optional)" aria-label="Phone (optional)" />
        </>
      )}
      <label className="chk full">
        <input type="checkbox" name="emailConsent" defaultChecked />
        {emailLabel}
      </label>
      {showSms ? (
        <label className="chk full">
          <input type="checkbox" name="smsConsent" />
          Optional: text me event reminders. Msg and data rates may apply. Reply STOP to opt out.
        </label>
      ) : null}
      <button className="btn btn-peach full" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : button}
      </button>
    </form>
  );
}

export function HostMessageForm({ city }: { city: string }) {
  const { status, onSubmit } = useSubmit("message-hosts");
  if (status === "done") return <Done>{THANKS}</Done>;
  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="city" value={city} />
      <div className="two">
        <input name="name" placeholder="Name" aria-label="Name" required />
        <input name="mobile" placeholder="Mobile number" aria-label="Mobile number" />
      </div>
      <input name="email" type="email" placeholder="Email" aria-label="Email" required />
      <textarea name="question" placeholder="Your question" aria-label="Your question" required />
      <label className="chk" style={{ marginBottom: 14 }}>
        <input type="checkbox" name="smsConsent" defaultChecked />
        OK to text me back about my question. Msg and data rates may apply. Reply STOP to opt out.
      </label>
      <button className="btn btn-peach" type="submit" style={{ display: "block", width: "100%" }} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send to the hosts"}
      </button>
    </form>
  );
}

function Segment<T extends string>({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string; hint: string }[];
}) {
  return (
    <div className="seg" role="radiogroup" aria-label={name}>
      <input type="hidden" name={name} value={value} />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={option.value === value ? "on" : undefined}
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          <small>{option.hint}</small>
        </button>
      ))}
    </div>
  );
}

export function MarketApplicationForm() {
  const { status, onSubmit } = useSubmit("market-application");
  const [starting, setStarting] = useState("new");
  if (status === "done") return <Done>{THANKS}</Done>;
  return (
    <form className="fg" onSubmit={onSubmit}>
      <div className="fl">
        <label htmlFor="market-name">First and last name</label>
        <input id="market-name" name="name" required />
      </div>
      <div className="fl">
        <label htmlFor="market-email">Email</label>
        <input id="market-email" name="email" type="email" required />
      </div>
      <div className="fl">
        <label htmlFor="market-phone">Phone</label>
        <input id="market-phone" name="phone" type="tel" />
      </div>
      <div className="fl">
        <label htmlFor="market-city">City or metro</label>
        <input id="market-city" name="city" placeholder="e.g. Charlotte, NC" required />
      </div>
      <div className="fl full">
        <label>Where are you starting from?</label>
        <Segment
          name="starting"
          value={starting}
          onChange={setStarting}
          options={[
            { value: "new", label: "I want to start one", hint: "No group yet" },
            { value: "existing", label: "I run a group today", hint: "Tell us about it below" },
          ]}
        />
      </div>
      <div className="fl">
        <label htmlFor="market-cohost">
          Co-host name <span>(if you have one)</span>
        </label>
        <input id="market-cohost" name="coHost" />
      </div>
      <div className="fl">
        <label htmlFor="market-link">
          Website or social link <span>(optional)</span>
        </label>
        <input id="market-link" name="link" />
      </div>
      <div className="fl full">
        <label htmlFor="market-why">Why do you want to open a market?</label>
        <textarea id="market-why" name="why" />
      </div>
      <label className="chk full">
        <input type="checkbox" name="emailConsent" defaultChecked />
        Email me about my application and WREI Connected news.
      </label>
      <label className="chk full">
        <input type="checkbox" name="smsConsent" />
        Optional: text me about my application. Msg and data rates may apply. Reply STOP to opt out.
      </label>
      <button className="btn btn-peach full" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}

export function PartnerForm() {
  const { status, onSubmit } = useSubmit("partner-application");
  const [starting, setStarting] = useState("existing");
  const [interest, setInterest] = useState("chapter");
  if (status === "done") return <Done>{THANKS}</Done>;
  return (
    <form className="fg" onSubmit={onSubmit}>
      <div className="fl">
        <label htmlFor="partner-name">First and last name</label>
        <input id="partner-name" name="name" required />
      </div>
      <div className="fl">
        <label htmlFor="partner-email">Email</label>
        <input id="partner-email" name="email" type="email" required />
      </div>
      <div className="fl">
        <label htmlFor="partner-phone">Phone</label>
        <input id="partner-phone" name="phone" />
      </div>
      <div className="fl">
        <label htmlFor="partner-city">City or metro</label>
        <input id="partner-city" name="city" placeholder="e.g. Charlotte, NC" required />
      </div>
      <div className="fl full">
        <label>Where are you starting from?</label>
        <Segment
          name="starting"
          value={starting}
          onChange={setStarting}
          options={[
            { value: "existing", label: "I run a group today", hint: "Tell us about it below" },
            { value: "new", label: "I want to start one", hint: "No group yet" },
          ]}
        />
      </div>
      <div className="fl">
        <label htmlFor="partner-group">
          Group name <span>(if you have one)</span>
        </label>
        <input id="partner-group" name="groupName" />
      </div>
      <div className="fl">
        <label htmlFor="partner-link">
          Website or social link <span>(optional)</span>
        </label>
        <input id="partner-link" name="link" />
      </div>
      <div className="fl full">
        <label>Which interests you?</label>
        <Segment
          name="interest"
          value={interest}
          onChange={setInterest}
          options={[
            { value: "chapter", label: "Market", hint: "Recommended" },
            { value: "affiliate", label: "Affiliate", hint: "Keep my brand" },
            { value: "unsure", label: "Not sure yet", hint: "Let's talk" },
          ]}
        />
      </div>
      <div className="fl full">
        <label htmlFor="partner-why">Why do you want to host?</label>
        <textarea id="partner-why" name="why" />
      </div>
      <label className="chk full">
        <input type="checkbox" name="emailConsent" defaultChecked />
        Email me about my application and WREI Connected news.
      </label>
      <label className="chk full">
        <input type="checkbox" name="smsConsent" />
        Optional: text me about my application. Msg and data rates may apply. Reply STOP to opt out.
      </label>
      <button className="btn btn-peach full" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}

export function SponsorForm() {
  const { status, onSubmit } = useSubmit("sponsor-inquiry");
  const [interest, setInterest] = useState("national");
  if (status === "done") return <Done>{THANKS}</Done>;
  return (
    <form className="fg" onSubmit={onSubmit}>
      <div className="fl">
        <label htmlFor="sponsor-name">Your name</label>
        <input id="sponsor-name" name="name" required />
      </div>
      <div className="fl">
        <label htmlFor="sponsor-company">Company</label>
        <input id="sponsor-company" name="company" required />
      </div>
      <div className="fl">
        <label htmlFor="sponsor-email">Work email</label>
        <input id="sponsor-email" name="email" type="email" required />
      </div>
      <div className="fl">
        <label htmlFor="sponsor-phone">
          Phone <span>(optional)</span>
        </label>
        <input id="sponsor-phone" name="phone" />
      </div>
      <div className="fl">
        <label htmlFor="sponsor-category">Category</label>
        <select id="sponsor-category" name="category" defaultValue="Lending and financing">
          <option>Lending and financing</option>
          <option>Proptech and software</option>
          <option>Investor tools</option>
          <option>Insurance</option>
          <option>Title and closing</option>
          <option>Property services</option>
        </select>
      </div>
      <div className="fl">
        <label htmlFor="sponsor-cities">
          Cities you care about <span>(optional)</span>
        </label>
        <input id="sponsor-cities" name="cities" placeholder="e.g. Atlanta, Charlotte" />
      </div>
      <div className="fl full">
        <label>What are you interested in?</label>
        <Segment
          name="interest"
          value={interest}
          onChange={setInterest}
          options={[
            { value: "national", label: "National", hint: "Every market + Summit" },
            { value: "local", label: "Local event", hint: "One meetup" },
            { value: "unsure", label: "Not sure yet", hint: "Send the media kit" },
          ]}
        />
      </div>
      <div className="fl full">
        <label htmlFor="sponsor-notes">Anything else we should know?</label>
        <textarea id="sponsor-notes" name="notes" />
      </div>
      <label className="chk full">
        <input type="checkbox" name="emailConsent" defaultChecked />
        Email me the media kit and sponsorship updates.
      </label>
      <button className="btn btn-peach full" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
