import { NextResponse } from 'next/server';
import { InstagramResponse, InstagramMedia } from '@/types/instagram';

// holy moly a few days after I pushed to live on Dec 4, 2024, Meta deprecated Instagram Basic Display API
// switched over to Instagram Graph API today

// Cache duration: 1 hour
const CACHE_DURATION = 3600;

async function refreshToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`,
      { next: { revalidate: CACHE_DURATION } }
    );

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }
    return true;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
}

// Transform Instagram media URLs to use our proxy
function transformMediaUrls(posts: InstagramMedia[]): InstagramMedia[] {
  return posts.map((post) => {
    if (post.media_url) {
      // Create a URL-safe version of the original media URL
      const encodedUrl = encodeURIComponent(post.media_url);

      // Replace the direct Instagram URL with our proxy URL
      return {
        ...post,
        media_url: `/api/instagram/proxy/${post.id}?url=${encodedUrl}`,
      };
    }
    return post;
  });
}

export async function GET() {
  try {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!token) {
      throw new Error('Instagram access token not found');
    }

    // Try to refresh the token
    await refreshToken(token);

    // Fetch posts
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=${token}`,
      { next: { revalidate: CACHE_DURATION } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data: InstagramResponse = await response.json();

    // Transform media URLs to use our proxy
    if (data.data) {
      data.data = transformMediaUrls(data.data);
    }

    // Return response with cache headers
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error('Instagram API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
