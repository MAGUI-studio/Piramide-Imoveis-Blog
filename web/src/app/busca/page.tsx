import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";
import { SearchInput } from "@/src/components/blog/SearchInput";
import { CategoryShowcase } from "@/src/components/blog/CategoryShowcase";
import { PostsList } from "@/src/components/blog/PostsList";
import { ContactSection } from "@/src/components/blog/ContactSection";
import type { PostItem, CategoryRef } from "@/src/types/sanity";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; search?: string }>;
}): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const rawQuery = resolvedSearchParams?.q || resolvedSearchParams?.search || "";
  const query = rawQuery.trim();

  const title = query
    ? `Busca por "${query}" | Blog Pirâmide Imóveis`
    : "Buscar Artigos & Análises | Blog Pirâmide Imóveis";

  const description = query
    ? `Resultados da pesquisa por "${query}" no Blog Pirâmide Imóveis.`
    : "Pesquise por artigos, bairros, tendências de mercado e lançamentos no Blog Pirâmide Imóveis.";

  return {
    title,
    description,
    alternates: {
      canonical: "/busca",
    },
    openGraph: {
      title,
      description,
      url: "/busca",
    },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; search?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const rawQuery = resolvedSearchParams?.q || resolvedSearchParams?.search || "";
  const searchTerm = rawQuery.toLowerCase().trim();

  const [{ data: rawPosts = [] }, { data: rawCategories = [] }] = await Promise.all([
    sanityFetch({ query: POSTS_QUERY }),
    sanityFetch({ query: CATEGORIES_QUERY }),
  ]);

  const allPosts = (rawPosts as PostItem[]) || [];
  const categories = (rawCategories as CategoryRef[]) || [];

  const categoryList = categories.map((cat) => {
    const matchedCount = allPosts.filter((p) =>
      p.categories?.some(
        (c) =>
          c.slug?.current === cat.slug?.current ||
          c._id === cat._id ||
          c.title?.toLowerCase() === cat.title?.toLowerCase(),
      ),
    ).length;

    return {
      ...cat,
      postCount: Math.max(matchedCount, cat.postCount || 0),
    };
  });

  const postList = searchTerm
    ? allPosts.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchTerm) ||
          p.excerpt?.toLowerCase().includes(searchTerm) ||
          p.tags?.some((t) => t.toLowerCase().includes(searchTerm)) ||
          p.city?.name?.toLowerCase().includes(searchTerm) ||
          p.author?.name?.toLowerCase().includes(searchTerm) ||
          p.categories?.some((c) =>
            c.title?.toLowerCase().includes(searchTerm),
          ),
      )
    : [];

  const breadcrumbsItems = [
    { label: "Busca", href: "/busca" },
    ...(rawQuery.trim() ? [{ label: `"${rawQuery.trim()}"` }] : []),
  ];

  return (
    <div className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-12">
      <Breadcrumbs items={breadcrumbsItems} />

      <PageHeroHeader
        badge={searchTerm ? "Resultado da Busca" : "Pesquisa no Acervo"}
        badgeIcon="ph:magnifying-glass-bold"
        title={
          searchTerm
            ? `Resultados para "${rawQuery.trim()}"`
            : "Buscar Artigos & Análises"
        }
        description={
          searchTerm
            ? postList.length > 0
              ? "Confira os artigos, matérias e análises correspondentes à sua pesquisa."
              : "Não encontramos nenhum artigo correspondente à sua pesquisa."
            : "Digite palavras-chave, temas, bairros ou autores para encontrar inteligência de mercado imobiliário."
        }
        meta={
          searchTerm
            ? `${postList.length} ${postList.length === 1 ? "artigo encontrado" : "artigos encontrados"}`
            : "Utilize o campo de busca abaixo para pesquisar"
        }
      />

      <div className="pt-2">
        <SearchInput initialQuery={rawQuery.trim()} />
      </div>

      {!searchTerm ? (
        
        <div className="border border-zinc-200 dark:border-zinc-800 bg-transparent p-12 text-center rounded-none my-6 space-y-2">
          <h3 className="text-xl font-bold font-heading uppercase text-foreground">
            Pronto para pesquisar?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground font-light max-w-md mx-auto leading-relaxed">
            Digite um termo, tema, bairro, cidade ou autor no campo de busca acima para explorar nosso acervo.
          </p>
        </div>
      ) : postList.length === 0 ? (
        
        <div className="space-y-8 my-6">
          <div className="border border-zinc-200 dark:border-zinc-800 bg-transparent p-12 text-center rounded-none space-y-2">
            <h3 className="text-xl font-bold font-heading uppercase text-foreground">
              Nenhum artigo encontrado para &ldquo;{rawQuery.trim()}&rdquo;
            </h3>
            <p className="mt-2 text-sm text-muted-foreground font-light max-w-md mx-auto leading-relaxed">
              Tente buscar por outras palavras-chave ou explore as categorias abaixo.
            </p>
          </div>

          {categoryList.length > 0 && (
            <div className="pt-4">
              <CategoryShowcase categories={categoryList} />
            </div>
          )}
        </div>
      ) : (
        
        <PostsList posts={postList} hideHeader />
      )}

      <ContactSection />
    </div>
  );
}
