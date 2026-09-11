import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, auth } from "@/auth";

async function loginAction(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const callbackUrl = String(formData.get("callbackUrl") || "/admin");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=Invalid%20credentials");
    }
    throw error;
  }
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const session = await auth();
  if (session) redirect("/admin");

  const params = await searchParams;
  const error = params.error;
  const callbackUrl = params.callbackUrl || "/admin";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-[#f4f1ea]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(198,165,114,0.18), transparent 45%), radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.05), transparent 40%)",
        }}
      />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 lg:flex-row lg:items-center lg:gap-20">
        <section className="mb-12 max-w-xl lg:mb-0">
          <p className="mb-4 text-[11px] tracking-[0.35em] text-[#c6a572] uppercase">
            Devert Store · Hyderabad
          </p>
          <h1 className="font-display text-5xl leading-none md:text-7xl">
            Command the
            <br />
            <em className="text-[#c6a572]">maison</em>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#9a9488]">
            Premium admin for inventory control, live order tracking, and AI
            product recommendations across the Devert Store ecosystem.
          </p>
        </section>

        <section className="w-full max-w-md border border-[#222] bg-[#0d0d0d]/95 p-8 shadow-2xl backdrop-blur">
          <p className="text-[11px] tracking-[0.28em] text-[#9a9488] uppercase">
            Secure access
          </p>
          <h2 className="font-display mt-2 text-3xl">Sign in</h2>

          {error ? (
            <p className="mt-4 border border-[#5a2a2a] bg-[#1a0f0f] px-3 py-2 text-sm text-[#d46a6a]">
              {decodeURIComponent(error)}
            </p>
          ) : null}

          <form action={loginAction} className="mt-8 space-y-5">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <label className="block">
              <span className="mb-2 block text-[11px] tracking-[0.18em] text-[#9a9488] uppercase">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                defaultValue="admin@devert.store"
                className="w-full border-0 border-b border-[#333] bg-transparent px-0 py-3 outline-none transition focus:border-[#c6a572]"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] tracking-[0.18em] text-[#9a9488] uppercase">
                Password
              </span>
              <input
                name="password"
                type="password"
                required
                defaultValue="devert123"
                className="w-full border-0 border-b border-[#333] bg-transparent px-0 py-3 outline-none transition focus:border-[#c6a572]"
              />
            </label>
            <button
              type="submit"
              className="mt-4 w-full bg-[#f4f1ea] px-4 py-3 text-[11px] font-semibold tracking-[0.22em] text-[#050505] uppercase transition hover:bg-[#c6a572]"
            >
              Enter dashboard
            </button>
          </form>

          <p className="mt-6 text-xs leading-relaxed text-[#6f6a62]">
            Demo: admin@devert.store / devert123
          </p>
        </section>
      </div>
    </main>
  );
}
