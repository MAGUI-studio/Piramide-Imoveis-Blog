import { defineQuery } from "next-sanity";


export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    featured,
    views,
    highlight1Title,
    highlight1Description,
    highlight2Title,
    highlight2Description,
    highlight3Title,
    highlight3Description,
    publishedAt,
    updatedAt,
    excerpt,
    tags,
    mainImage,
    body,
    author->{
      _id,
      name,
      slug,
      role,
      creci,
      image
    },
    city->{
      _id,
      name,
      slug,
      state,
      image
    },
    categories[]->{
      _id,
      title,
      slug,
      description,
      image
    }
  }
`);


export const FEATURED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    featured,
    views,
    highlight1Title,
    highlight1Description,
    highlight2Title,
    highlight2Description,
    highlight3Title,
    highlight3Description,
    publishedAt,
    excerpt,
    tags,
    mainImage,
    body,
    author->{
      _id,
      name,
      slug,
      role,
      creci,
      image
    },
    city->{
      _id,
      name,
      slug,
      state,
      image
    },
    categories[]->{
      _id,
      title,
      slug,
      image
    }
  }
`);


export const TOP_TRENDING_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && (!defined(featured) || featured != true)] | order(coalesce(views, 0) desc, publishedAt desc)[0...5] {
    _id,
    title,
    slug,
    featured,
    views,
    publishedAt,
    excerpt,
    mainImage,
    author->{
      _id,
      name,
      slug,
      image
    },
    city->{
      _id,
      name,
      slug,
      state
    },
    categories[]->{
      _id,
      title,
      slug
    }
  }
`);


export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    featured,
    views,
    highlight1Title,
    highlight1Description,
    highlight2Title,
    highlight2Description,
    highlight3Title,
    highlight3Description,
    publishedAt,
    updatedAt,
    excerpt,
    tags,
    metaTitle,
    metaDescription,
    seoImage,
    canonicalUrl,
    noIndex,
    mainImage,
    calloutStyle,
    calloutTitle,
    calloutContent,
    faqTitle,
    faqItems,
    ctaTitle,
    ctaDescription,
    ctaButtonText,
    ctaButtonUrl,
    videoUrl,
    videoTitle,
    videoCaption,
    galleryTitle,
    galleryImages,
    author->{
      _id,
      name,
      slug,
      role,
      creci,
      image,
      bio,
      linkedinUrl,
      instagramUrl,
      email
    },
    city->{
      _id,
      name,
      slug,
      state,
      image
    },
    categories[]->{
      _id,
      title,
      slug,
      description,
      image
    },
    body[]{
      ...,
      _type == "block" => {
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug.current,
            "title": @.reference->title
          }
        }
      }
    }
  }
`);


export const RELATED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && slug.current != $currentSlug && count((categories[]->slug.current)[@ in $categorySlugs]) > 0] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    author->{
      _id,
      name,
      slug,
      image
    },
    city->{
      _id,
      name,
      slug,
      state
    },
    categories[]->{
      _id,
      title,
      slug,
      image
    }
  }
`);


export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    slug,
    description,
    image,
    "postCount": count(*[_type == "post" && defined(slug.current) && (^.slug.current in categories[]->slug.current || references(^._id))])
  }
`);


export const CITIES_QUERY = defineQuery(`
  *[_type == "city" && defined(slug.current)] | order(name asc) {
    _id,
    name,
    slug,
    state,
    description,
    image,
    "postCount": count(*[_type == "post" && defined(slug.current) && (city._ref == ^._id || references(^._id))])
  }
`);

export const AUTHORS_QUERY = defineQuery(`
  *[_type == "author" && defined(slug.current)] | order(name asc) {
    _id,
    name,
    slug,
    role,
    creci,
    image,
    bio,
    linkedinUrl,
    instagramUrl,
    email,
    "postCount": count(*[_type == "post" && defined(slug.current) && (author._ref == ^._id || references(^._id))])
  }
`);

export const AUTHOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    role,
    creci,
    image,
    bio,
    linkedinUrl,
    instagramUrl,
    email
  }
`);


export const POSTS_BY_AUTHOR_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && author->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    featured,
    publishedAt,
    updatedAt,
    excerpt,
    tags,
    mainImage,
    body,
    author->{
      _id,
      name,
      slug,
      role,
      creci,
      image
    },
    city->{
      _id,
      name,
      slug,
      state
    },
    categories[]->{
      _id,
      title,
      slug,
      image
    }
  }
`);


export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    image,
    "postCount": count(*[_type == "post" && defined(slug.current) && ($slug in categories[]->slug.current || references(^._id))])
  }
`);

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && ($slug in categories[]->slug.current || references(^._id))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    featured,
    publishedAt,
    updatedAt,
    excerpt,
    tags,
    mainImage,
    body,
    author->{
      _id,
      name,
      slug,
      role,
      creci,
      image
    },
    city->{
      _id,
      name,
      slug,
      state,
      image
    },
    categories[]->{
      _id,
      title,
      slug,
      image
    }
  }
`);


export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`);


export const CATEGORY_SLUGS_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)]{ "slug": slug.current }
`);

export const CITY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "city" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    state,
    description,
    image,
    "postCount": count(*[_type == "post" && defined(slug.current) && (city->slug.current == $slug || city._ref == ^._id)])
  }
`);

export const POSTS_BY_CITY_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && (city->slug.current == $slug || city._ref == ^._id)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    featured,
    publishedAt,
    updatedAt,
    excerpt,
    tags,
    mainImage,
    body,
    author->{
      _id,
      name,
      slug,
      role,
      creci,
      image
    },
    city->{
      _id,
      name,
      slug,
      state,
      image
    },
    categories[]->{
      _id,
      title,
      slug,
      image
    }
  }
`);

export const CITY_SLUGS_QUERY = defineQuery(`
  *[_type == "city" && defined(slug.current)]{ "slug": slug.current }
`);

export const AUTHOR_SLUGS_QUERY = defineQuery(`
  *[_type == "author" && defined(slug.current)]{ "slug": slug.current }
`);

export const POST_PREV_NEXT_QUERY = defineQuery(`
  {
    "prev": *[_type == "post" && defined(slug.current) && publishedAt < $publishedAt] | order(publishedAt desc)[0] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage
    },
    "next": *[_type == "post" && defined(slug.current) && publishedAt > $publishedAt] | order(publishedAt asc)[0] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage
    }
  }
`);

export const ALL_TAGS_QUERY = defineQuery(`
  array::unique(*[_type == "post" && defined(tags)].tags[])
`);

export const SITEMAP_DATA_QUERY = defineQuery(`
  {
    "posts": *[_type == "post" && defined(slug.current) && noIndex != true]{
      "slug": slug.current,
      "publishedAt": publishedAt,
      "updatedAt": updatedAt
    },
    "categories": *[_type == "category" && defined(slug.current)]{
      "slug": slug.current
    },
    "authors": *[_type == "author" && defined(slug.current)]{
      "slug": slug.current
    },
    "cities": *[_type == "city" && defined(slug.current)]{
      "slug": slug.current
    },
    "tags": array::unique(*[_type == "post" && defined(tags)].tags[])
  }
`);

export const REELS_QUERY = defineQuery(`
  *[_type == "reel"] | order(publishedAt desc) {
    _id,
    title,
    description,
    thumbnail,
    "videoFileUrl": videoFile.asset->url,
    videoUrl,
    propertyTitle,
    propertyUrl,
    instagramUrl,
    publishedAt
  }
`);

export const LAUNCHES_QUERY = defineQuery(`
  *[_type == "launch"] | order(coalesce(order, 999) asc, _createdAt asc) {
    _id,
    title,
    image,
    alt,
    href,
    order
  }
`);

export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember" && (!defined(active) || active == true)] | order(
    select(
      tier == "leadership_founders" => 1,
      tier == "leadership_directors" => 2,
      tier == "management" => 3,
      tier == "broker" => 4,
      5
    ) asc,
    coalesce(order, 999) asc,
    name asc
  ) {
    _id,
    name,
    slug,
    role,
    tier,
    order,
    creci,
    image,
    email,
    whatsapps[]{ label, url },
    instagram
  }
`);

export const LEADERSHIP_QUERY = defineQuery(`
  *[_type == "teamMember" && (!defined(active) || active == true) && tier in ["leadership_founders", "leadership_directors"]] | order(
    select(
      tier == "leadership_founders" => 1,
      tier == "leadership_directors" => 2,
      3
    ) asc,
    coalesce(order, 999) asc,
    name asc
  ) {
    _id,
    name,
    slug,
    role,
    tier,
    order,
    creci,
    image,
    email,
    whatsapps[]{ label, url },
    instagram
  }
`);


