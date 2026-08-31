import { redirect } from "next/navigation";

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "sobre" || slug === "sobre-nos") {
    redirect("/sobre-nos");
  }
  redirect(`/artigos/${slug}`);
}

