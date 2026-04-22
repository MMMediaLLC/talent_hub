import { NextResponse } from "next/server";

// Label maps for human-readable display
const areaLabels: Record<string, string> = {
  media: "Медиуми и новинарство",
  content: "Содржина и социјални мрежи",
  design: "Дизајн и визуелна комуникација",
  production: "Фото, видео и дрон продукција",
  ai: "АИ алатки и автоматизација",
  web: "Веб и технологија",
};

const levelLabels: Record<string, string> = {
  beginner: "Почетник",
  amateur: "Аматер со хоби проекти",
  "semi-pro": "Полу-професионалец",
  experienced: "Искусен",
};

const priorExpLabels: Record<string, string> = {
  no: "Не, но сака да почне",
  self: "Да, самостојно (видеа, курсеви, експерименти)",
  concrete: "Да, има направено нешто конкретно",
  real: "Да, има работено на реален проект",
};

const learningStyleLabels: Record<string, string> = {
  explore: "Сам истражува и проба",
  guided: "Следи насоки, учи чекор по чекор",
  team: "Работи подобро во тим",
  mixed: "Комбинира повеќе пристапи",
};

const activityLabels: Record<string, string> = {
  week: "Во последните 7 дена",
  month: "Во последниот месец",
  "3months": "Во последните 3 месеци",
  older: "Повеќе од 3 месеци",
  nothing: "Сè уште ништо",
};

const seriousnessLabels: Record<string, string> = {
  curious: "Само го интересира",
  learn: "Сака да научи повеќе",
  active: "Сака активно да работи во оваа област",
};

const futureInvolvementLabels: Record<string, string> = {
  yes: "Да",
  maybe: "Можеби",
  "not-now": "Засега не",
};

const activityTypeLabels: Record<string, string> = {
  learning: "Учење",
  practical: "Практична работа",
  "short-tasks": "Кратки задачи",
  teamwork: "Тимска работа",
};

const referralLabels: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok / YouTube",
  friend: "Пријател / препорака",
  linkedin: "LinkedIn",
  other: "Друго",
};

function val(v: unknown, fallback = "Нема"): string {
  if (v === undefined || v === null || v === "") return fallback;
  if (Array.isArray(v)) return v.length > 0 ? v.join(", ") : fallback;
  return String(v);
}

function mapVal(v: unknown, map: Record<string, string>, fallback = "Не е избрано"): string {
  if (!v || typeof v !== "string") return fallback;
  return map[v] || v;
}

function mapArr(arr: unknown, map: Record<string, string>): string {
  if (!Array.isArray(arr) || arr.length === 0) return "Нема";
  return arr.map((a: string) => map[a] || a).join(", ");
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:8px 12px;color:#111827;font-size:13px;">${value}</td>
  </tr>`;
}

function section(title: string, rows: string): string {
  return `
    <h3 style="margin:28px 0 10px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6366f1;">${title}</h3>
    <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:8px;overflow:hidden;">
      ${rows}
    </table>`;
}

export async function POST(request: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: Record<string, any> = await request.json();

    // ── Derived values ──────────────────────────────────────────────────────
    const fullName = val(data.fullName, "Анонимен");
    const primaryAreaId = data.primaryArea || (Array.isArray(data.areas) && data.areas[0]) || "";
    const primaryAreaLabel = mapVal(primaryAreaId, areaLabels);
    const levelLabel = mapVal(data.level, levelLabels);
    const isBeginner = data.level === "beginner";

    // High-value signal
    const isHighValue =
      data.level && data.level !== "beginner" &&
      (data.priorExperience === "concrete" || data.priorExperience === "real");

    // ── Subject ─────────────────────────────────────────────────────────────
    const subject = primaryAreaLabel !== "Не е избрано"
      ? `Нова пријава – ${fullName} (${primaryAreaLabel})`
      : `Нова пријава – ${fullName}`;

    // ── Summary bullets ──────────────────────────────────────────────────────
    let levelSummary = levelLabel;
    let priorSummary = "нема практично искуство";
    if (data.priorExperience === "self") priorSummary = "има самостојно пробано";
    else if (data.priorExperience === "concrete") priorSummary = "има направено конкретни работи";
    else if (data.priorExperience === "real") priorSummary = "има работено на реални проекти";

    let intentSummary = "иницијален интерес";
    if (data.seriousnessLevel === "active") intentSummary = "покажува сериозна намера";
    else if (data.seriousnessLevel === "learn") intentSummary = "има интерес за учење";

    // ── Areas ────────────────────────────────────────────────────────────────
    const areasDisplay = Array.isArray(data.areas) && data.areas.length > 0
      ? data.areas.map((a: string) => areaLabels[a] || a).join(", ")
      : "Не е избрано";

    const subcatsDisplay = Array.isArray(data.subcategories) && data.subcategories.length > 0
      ? data.subcategories.join(", ")
      : "Нема";

    const toolsDisplay = (() => {
      const selected = Array.isArray(data.tools) ? data.tools.filter((t: string) => t !== "other").join(", ") : "";
      const other = data.toolsOther ? ` + ${data.toolsOther}` : "";
      return (selected || other) ? `${selected}${other}` : "Нема";
    })();

    const cityDisplay = data.city === "other"
      ? (data.cityOther || "Друго")
      : val(data.city, "Не е внесено");

    // ── HTML Email ───────────────────────────────────────────────────────────
    const html = `<!DOCTYPE html>
<html lang="mk">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:620px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);padding:32px 28px 28px;">
      <p style="margin:0 0 4px;color:rgba(255,255,255,.7);font-size:13px;letter-spacing:.05em;text-transform:uppercase;">M&amp;M Talent Hub</p>
      <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Нова пријава</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,.85);font-size:16px;">${fullName}</p>
    </div>

    <div style="padding:28px;">

      ${isHighValue ? `
      <!-- High-value flag -->
      <div style="background:#fef3c7;border:1px solid #f59e0b;border-radius:8px;padding:12px 16px;margin-bottom:24px;display:flex;align-items:center;gap:10px;">
        <span style="font-size:18px;">⚡</span>
        <span style="color:#92400e;font-weight:600;font-size:14px;">Потенцијално интересен кандидат</span>
      </div>` : ""}

      ${section("1. Основни информации",
        row("Ime", fullName) +
        row("Возраст", val(data.age, "Не е внесено")) +
        row("Град", cityDisplay) +
        row("Е-пошта", val(data.email, "Не е внесено")) +
        row("Телефон", val(data.phone, "Нема"))
      )}

      ${section("2. Интерес и фокус",
        row("Области", areasDisplay) +
        row("Примарна област", primaryAreaLabel) +
        row("Подкатегории", subcatsDisplay) +
        row("Сериозност", mapVal(data.seriousnessLevel, seriousnessLabels))
      )}

      ${section("3. Искуство",
        row("Ниво", levelLabel) +
        row("Претходно искуство", mapVal(data.priorExperience, priorExpLabels)) +
        row("Начин на учење", mapVal(data.learningStyle, learningStyleLabels)) +
        row("Последна активност", mapVal(data.lastActivity, activityLabels)) +
        (isBeginner
          ? row("Што сака да проба/научи", val(data.motivation, "Нема"))
          : row("Линк до работа", data.workLink ? `<a href="${data.workLink}" style="color:#6366f1;">${data.workLink}</a>` : "Нема"))
      )}

      ${section("4. Алатки и фокус",
        row("Алатки", toolsDisplay) +
        row("Типови проекти", Array.isArray(data.projectTypes)
          ? data.projectTypes.join(", ") || "Нема"
          : "Нема")
      )}

      ${section("5. Сигнали и потенцијал",
        row("Идна вклученост", mapVal(data.futureInvolvement, futureInvolvementLabels)) +
        row("Тип активности", mapArr(data.activityTypes, activityTypeLabels)) +
        row("Извор", mapVal(data.referralSource, referralLabels))
      )}

      ${data.aboutYourself ? `
      ${section("6. За себе", `
        <tr><td colspan="2" style="padding:12px 16px;color:#374151;font-size:13px;font-style:italic;line-height:1.6;">${data.aboutYourself}</td></tr>
      `)}` : ""}

      <!-- Summary -->
      <div style="background:#f0f4ff;border-left:4px solid #6366f1;border-radius:4px;padding:18px 20px;margin-top:28px;">
        <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#3730a3;text-transform:uppercase;letter-spacing:.05em;">Резиме</p>
        <ul style="margin:0;padding-left:20px;color:#374151;font-size:13px;line-height:1.8;">
          <li>${levelSummary} кандидат</li>
          <li>${priorSummary.charAt(0).toUpperCase() + priorSummary.slice(1)}</li>
          <li>${intentSummary.charAt(0).toUpperCase() + intentSummary.slice(1)}</li>
        </ul>
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 28px;text-align:center;">
      <p style="margin:0;color:#9ca3af;font-size:12px;">M&amp;M Talent Hub · Автоматски генерирано</p>
    </div>
  </div>
</body>
</html>`;

    // ── Send via Resend ──────────────────────────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "M&M Talent Hub <noreply@mmmedia.site>",
          to: process.env.ADMIN_EMAIL || "contact@mmmedia.site",
          subject,
          html,
        }),
      });

      if (!emailRes.ok) {
        const errText = await emailRes.text();
        console.error("Resend error:", errText);
        // Don't fail the submission if email fails
      }
    } else {
      console.log("[DEV] Email would be sent:");
      console.log("Subject:", subject);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
