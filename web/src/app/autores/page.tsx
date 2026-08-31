import { Suspense } from "react";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { AUTHORS_QUERY } from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";
import { AuthorsExplorer } from "@/src/components/blog/AuthorsExplorer";
import type { AuthorRef } from "@/src/types/sanity";

export const metadata: Metadata = {
  title: "Nossos Autores & Especialistas | Blog Pirâmide Imóveis",
  description:
    "Conheça os corretores, consultores e especialistas que escrevem sobre o mercado imobiliário no Blog Pirâmide Imóveis.",
  alternates: {
    canonical: "/autores",
  },
  openGraph: {
    title: "Nossos Autores & Especialistas | Blog Pirâmide Imóveis",
    description:
      "Conheça os corretores, consultores e especialistas que escrevem sobre o mercado imobiliário no Blog Pirâmide Imóveis.",
    url: "/autores",
  },
};

export default async function AutoresPage() {
  const { data: rawAuthors = [] } = await sanityFetch({
    query: AUTHORS_QUERY,
  });

  const authors = (rawAuthors as AuthorRef[]) || [];

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://blog.piramideimoveissjc.com.br";

  const authorsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Autores & Especialistas | Blog Pirâmide Imóveis",
    description:
      "Conheça os especialistas e corretores autores do Blog Pirâmide Imóveis.",
    url: `${baseUrl}/autores`,
  };

  const breadcrumbsItems = [{ label: "Autores" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(authorsJsonLd),
        }}
      />
      <div className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbsItems} />

        <PageHeroHeader
          badge="Especialistas & Redação"
          badgeIcon="ph:user-circle-fill"
          title="Nossos Autores & Especialistas"
          description="Conheça os corretores, consultores e analistas que compartilham inteligência imobiliária, tendências e análises exclusivas."
          meta={`${authors.length} especialistas cadastrados`}
        />

        <Suspense
          fallback={
            <div className="py-12 text-center text-muted-foreground font-mono text-xs">
              Carregando autores...
            </div>
          }
        >
          <AuthorsExplorer authors={authors} />
        </Suspense>
      </div>
    </>
  );
}
