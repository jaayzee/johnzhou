export interface InstagramMedia {
    id: string;
    media_type: string;
    media_url: string;
    caption?: string;
    permalink: string;
    thumbnail_url?: string;
  }
  
  export interface InstagramResponse {
    data: InstagramMedia[];
    paging?: {
      cursors: {
        before: string;
        after: string;
      };
      next: string;
    };
  }