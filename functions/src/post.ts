import axios from 'axios';
import { isNil, isNotNil } from 'ramda';
import { JSDOM } from 'jsdom';

interface BloggerPost {
  id: number,
  labels: string[],
  title: string,
  content: string,
}

interface CoachPost {
  id: number,
  title: string,
  highlights: string[],
  content: string,
  outLinks: string[],
  imagesUrls: string[],
}

export const findAllPosts = async (blogId?: string): Promise<Partial<CoachPost>[]> => {
  if (isNil(blogId)) {
    return [];
  }
  const baseUrl = 'https://www.googleapis.com/blogger/v3/blogs';
  const url = `${baseUrl}/${blogId}/posts`;
  const config = {
    maxBodyLength: Infinity,
    params: {
      key: process.env.BLOGGER_TOKEN,
    },
  };
  const response = await axios.get(url, config);
  console.log(response.status, response.statusText);
  return response.data.items
    .map((item: BloggerPost) => {
      const dom = new JSDOM(item.content);
      const highlights = [...dom.window.document.querySelectorAll('blockquote')]
        .map((el: HTMLQuoteElement) => el.textContent?.trim() ?? '')
        .filter(isNotNil);
      const outLinks = [...dom.window.document.querySelectorAll('a')]
        .map((link: HTMLAnchorElement) => link.href);
      const imagesUrls = [...dom.window.document.querySelectorAll('img')]
        .map((image: HTMLImageElement) => image.src);
      return {
        id: item.id,
        title: item.title,
        highlights,
        content: item.content,
        outLinks,
        imagesUrls,
      } as CoachPost;
    });
};
