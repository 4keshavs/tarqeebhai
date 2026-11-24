import { useState, type FormEvent } from "react";
import { ArrowLeft, Heart, LockKeyhole, Sparkles } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidDateCode } from "@/lib/apology-gate";

const REASONS = [
  {
    number: "01",
    paragraphs: [
      "I'm guilty of the things I've done, and uske liye dil se sorry. I know saying sorry doesn't undo things, but I genuinely mean it.",
    ],
  },
  {
    number: "02",
    paragraphs: [
      "Mehnati ladka hoon. Life mein kuch achha karne ki koshish jaari hai, and I have big plans for myself.",
    ],
  },
  {
    number: "03",
    paragraphs: [
      "Funny hoon, IQ bhi theek-thaak hai, shakal bhi achhi hai, height bhi theek hai... aur zaroorat padne par jhukna bhi jaanta hoon. 😂",
    ],
  },
  {
    number: "04",
    paragraphs: [
      "Tum khush hoti ho toh dil khush hota hai, tum dukhi hoti ho toh dil udaas ho jaata hai. Your happiness genuinely matters to me.",
    ],
  },
  {
    number: "05",
    paragraphs: [
      "Kabhi-kabhi gadho wali harkatein kar deta hoon, lekin tumhe manane mein bhi koi kasar nahi chhodta. (Although I'd prefer to stop giving you reasons to be upset!)",
    ],
  },
  {
    number: "06",
    paragraphs: [
      "Achha ladka hoon. Jo dil mein hai, woh zubaan par hai. Games khelna nahi aata, bas kabhi-kabhi situations handle karna nahi aata.",
    ],
  },
  {
    number: "07",
    paragraphs: [
      "Dosti ho, pyaar ho ya koi rishta, loyalty meri priority hai. Ek baar commitment kar di, uske baad main apne aap ki bhi nahi sunta.",
    ],
  },
  {
    number: "08",
    paragraphs: [
      "Sapne bade dekhta hoon, aur unhe poora karne ke liye mehnat bhi karta hoon. I dream big and never settle for less.",
    ],
  },
  {
    number: "09",
    paragraphs: [
      "My USP? I don't give up easily. Agility, ability, mobility and a fierce attitude towards problems. Problems se ladna aata hai, bas kabhi-kabhi apni hi galtiyon se seekhne mein time lag jaata hai.",
    ],
  },
  {
    number: "10",
    paragraphs: [
      "Life ke har padav par balance banana pasand hai. Career, family, relationships, ambitions... sabko importance dena chahta hoon.",
    ],
  },
  {
    number: "11",
    paragraphs: [
      "And finally, har pal yahan, jee bhar jiyo, jo hai samaa, kal ho na ho...",
      "Because life is too short to keep egos bigger than relationships. ❤️",
    ],
  },
] as const;

type LetterScreen = "welcome" | "reasons" | "apology" | "question" | "ending";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mera chhotu motu cutu" },
      {
        name: "description",
        content: "A thoughtful, private letter with a few honest words and a heartfelt apology.",
      },
      { property: "og:title", content: "A Little Something Just For You — A Private Apology" },
      {
        property: "og:description",
        content: "A thoughtful, private letter with a few honest words and a heartfelt apology.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [screen, setScreen] = useState<LetterScreen>("welcome");
  const [dateCode, setDateCode] = useState("");
  const [hasError, setHasError] = useState(false);
  const [reasonIndex, setReasonIndex] = useState(0);
  const reason = REASONS[reasonIndex];

  function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isValidDateCode(dateCode)) {
      setHasError(false);
      setScreen("reasons");
      return;
    }
    setHasError(true);
  }

  function moveReason(direction: -1 | 1) {
    setReasonIndex((current) => Math.min(REASONS.length - 1, Math.max(0, current + direction)));
  }

  return (
    <main className="letter-page">
      <div className="letter-page__texture" aria-hidden="true" />
      <div className="letter-shell">
        <header className="letter-topline">
          <span className="letter-topline__mark">
            <Heart aria-hidden="true" />
            <span>A LITTLE SOMETHING</span>
          </span>
          <span className="letter-topline__lock">
            <LockKeyhole aria-hidden="true" />
            Just for you
          </span>
        </header>

        <section className="letter-screen" key={screen} aria-live="polite">
          {screen === "welcome" && (
            <div className="welcome-screen">
              <div className="welcome-screen__flourish" aria-hidden="true">
                <span />
                <Heart />
                <span />
              </div>
              <p className="letter-eyebrow">A private little note</p>
              <h1 className="welcome-screen__title">
                A little something,
                <br />
                <em>exclusively for you.</em>
              </h1>
              <p className="welcome-screen__subtitle">
                Some things deserve a little extra effort. And this one is just for you.
              </p>

              <form className="welcome-form" onSubmit={unlock}>
                <label className="welcome-form__label" htmlFor="date-code">
                  Enter your DOB
                </label>
                <div className={`date-field${hasError ? " date-field--error" : ""}`}>
                  <LockKeyhole aria-hidden="true" className="date-field__icon" />
                  <Input
                    id="date-code"
                    aria-label="Enter your DOB"
                    aria-invalid={hasError}
                    aria-describedby={hasError ? "date-code-error" : "date-code-hint"}
                    className="letter-input"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={8}
                    placeholder="DDMMYYYY"
                    value={dateCode}
                    onChange={(event) => {
                      setDateCode(event.currentTarget.value.replace(/\D/g, "").slice(0, 8));
                      setHasError(false);
                    }}
                  />
                </div>
                {hasError ? (
                  <p className="welcome-form__error" id="date-code-error" role="alert">
                    Hmm, looks like that's not quite right. Try once more. ❤️
                  </p>
                ) : (
                  <p className="welcome-form__hint" id="date-code-hint">
                    This little space is exclusively for you. ❤️
                  </p>
                )}
                <Button
                  className="letter-button letter-button--primary welcome-form__submit"
                  disabled={dateCode.length !== 8}
                  size="lg"
                  type="submit"
                >
                  Unlock My Little Surprise
                  <span aria-hidden="true">→</span>
                </Button>
              </form>
            </div>
          )}

          {screen === "reasons" && (
            <div className="reasons-screen">
              <div className="reasons-screen__intro">
                <p className="letter-eyebrow">A few words from the heart</p>
                <h1 className="section-title">Here's why you should forgive me</h1>
                <p className="section-subtitle">
                  11 little reminders, from someone who genuinely means it.
                </p>
              </div>

              <div className="reason-progress" aria-label="Reason progress">
                <span className="reason-progress__count">
                  {String(reasonIndex + 1).padStart(2, "0")} / 11
                </span>
                <progress
                  className="reason-progress__bar"
                  aria-label={`${reasonIndex + 1} of 11 reasons`}
                  value={reasonIndex + 1}
                  max={11}
                />
              </div>

              {reason && (
                <article className="reason-card" key={reason.number}>
                  <div className="reason-card__number" aria-hidden="true">
                    {reason.number}
                    <span>little reminder</span>
                  </div>
                  <div className="reason-card__copy">
                    {reason.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {reason.number === "11" && (
                      <aside className="reason-card__postscript">
                        <span className="reason-card__postscript-label">P.S.</span>
                        <p>
                          These are reasons to give me another chance, not reasons you owe me one. I
                          know I have to earn your trust back.
                        </p>
                      </aside>
                    )}
                  </div>
                </article>
              )}

              <nav className="reason-navigation" aria-label="Reason navigation">
                {reasonIndex > 0 ? (
                  <Button
                    className="letter-button letter-button--quiet"
                    size="lg"
                    type="button"
                    variant="outline"
                    onClick={() => moveReason(-1)}
                  >
                    <ArrowLeft aria-hidden="true" />
                    Previous
                  </Button>
                ) : (
                  <span aria-hidden="true" />
                )}
                {reasonIndex === REASONS.length - 1 ? (
                  <Button
                    className="letter-button letter-button--primary"
                    size="lg"
                    type="button"
                    onClick={() => setScreen("apology")}
                  >
                    One last thing ❤️
                  </Button>
                ) : (
                  <Button
                    className="letter-button letter-button--primary"
                    size="lg"
                    type="button"
                    onClick={() => moveReason(1)}
                  >
                    Next →
                  </Button>
                )}
              </nav>
            </div>
          )}

          {screen === "apology" && (
            <div className="apology-screen">
              <div className="apology-screen__hearts" aria-hidden="true">
                <Heart className="apology-heart apology-heart--one" />
                <Heart className="apology-heart apology-heart--two" />
                <Heart className="apology-heart apology-heart--three" />
              </div>
              <p className="letter-eyebrow">One last thing</p>
              <h1 className="apology-screen__message">
                <span>
                  Ssssssshhhhhhhrrrrrreeeeeyyyyyaaaaa dil se bada waaaallllllaaaaa
                  sssssooooorrrrryyyyyy.
                </span>
                <span>Aise naaaaarrrraaaazzz mat rahya karo na, please...</span>
              </h1>
              <Button
                className="letter-button letter-button--primary apology-screen__button"
                size="lg"
                type="button"
                onClick={() => setScreen("question")}
              >
                Ek last sawaal... ❤️
              </Button>
            </div>
          )}

          {screen === "question" && (
            <div className="question-screen">
              <div className="question-screen__seal" aria-hidden="true">
                <Heart />
              </div>
              <p className="letter-eyebrow">From me, to you</p>
              <h1 className="question-screen__title">Kar diya na maaf?</h1>
              <p className="question-screen__subtitle">Ab itna bhi mat tadpao. 🥺❤️</p>
              <div className="question-screen__choices">
                <Button
                  className="letter-button letter-button--primary"
                  size="lg"
                  type="button"
                  onClick={() => {
                    window.open(
                      "https://www.instagram.com/keshavsrigyan/",
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                >
                  Haan ❤️
                </Button>
                <Button
                  className="letter-button letter-button--quiet"
                  size="lg"
                  type="button"
                  variant="outline"
                  onClick={() => setScreen("ending")}
                >
                  No 🥺
                </Button>
              </div>
            </div>
          )}

          {screen === "ending" && (
            <div className="ending-screen">
              <div className="ending-screen__illustration" aria-hidden="true">
                <Heart />
                <span />
              </div>
              <p className="letter-eyebrow">Still here, still trying</p>
              <h1 className="ending-screen__message">
                Mujhe 2 cheejein achhe se aati hai sabr rakhna aur tumko manana.... koshish zaari
                rahegi.
              </h1>
              <p className="ending-screen__signoff">Some things are worth being patient for. ❤️</p>
            </div>
          )}
        </section>

        <footer className="letter-footer" aria-hidden="true">
          <span />
          <Sparkles />
          <span />
        </footer>
      </div>
    </main>
  );
}
