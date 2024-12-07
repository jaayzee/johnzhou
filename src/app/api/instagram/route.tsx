import { NextResponse } from 'next/server';

// holy moly a few days after I pushed to live on Dec 4, 2024, Meta deprecated Instagram Basic Display API
// switched over to Instagram Graph API today

// refresh token regularly
async function refreshToken(token: string) {
  const response = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  );
  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }
  return true;
}

export async function GET() {
  try {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!token) {
      throw new Error('Instagram access token not found');
    }

    await refreshToken(token);

    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=${token}`
    );
    return NextResponse.json(await response.json());
  } catch (error) {
    console.error('Instagram API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
