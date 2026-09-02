import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/src/sanity/client";

const token = process.env.SANITY_API_TOKEN;

const writeClient = token
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
    })
  : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, postId } = body;

    if (!slug && !postId) {
      return NextResponse.json({ error: "Missing slug or postId" }, { status: 400 });
    }

    if (!writeClient) {
      return NextResponse.json({
        success: true,
        message: "Simulation mode (SANITY_API_TOKEN not configured)",
      });
    }

    if (postId) {
      await writeClient
        .patch(postId)
        .setIfMissing({ views: 0 })
        .inc({ views: 1 })
        .commit({ autoGenerateArrayKeys: true });
    } else if (slug) {
      await writeClient
        .patch({
          query: `*[_type == "post" && slug.current == $slug][0]`,
          params: { slug },
        })
        .setIfMissing({ views: 0 })
        .inc({ views: 1 })
        .commit({ autoGenerateArrayKeys: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API Views] Error updating view count:", error);
    return NextResponse.json(
      { error: "Failed to increment view count" },
      { status: 500 }
    );
  }
}
