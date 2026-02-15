import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function RootPage() {
    const cookieStore = await cookies();
    const lang = cookieStore.get("lang")?.value || cookieStore.get("NEXT_LOCALE")?.value;

    if (lang && (lang === "en" || lang === "id")) {
        redirect(`/${lang}`);
    } else {
        redirect("/en");
    }
}
