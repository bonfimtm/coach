/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from 'firebase-functions/v2/https';
 * import {onDocumentWritten} from 'firebase-functions/v2/firestore';
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as logger from 'firebase-functions/logger';
import { onRequest } from 'firebase-functions/v2/https';

import { findAllArticleImages, findAllArticles } from './article';
import { findAllPosts } from './post';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const cors = [new RegExp(process.env.CORS_ALLOW_REGEX || '')];

export const posts = onRequest({ cors }, async (request, response) => {
  logger.info('Fetching all posts');
  const blogId = process.env.BLOGGER_BLOG_ID;
  const articles = await findAllPosts(blogId);
  logger.info(`Fetched ${articles.length} posts`);
  response.send(articles);
});

export const articles = onRequest({ cors }, async (request, response) => {
  logger.info('Fetching all articles');
  const articles = await findAllArticles();
  logger.info(`Fetched ${articles.length} articles`);
  response.send(articles);
});

export const articleImage = onRequest({ cors }, async (request, response) => {
  logger.info('Fetching all article images');
  const articleQuery = request.query?.articleId as string ?? '';
  const articleId = parseInt(articleQuery);
  const articleImage = await findAllArticleImages(articleId);
  logger.info('Article image fetched');
  response.send(articleImage);
});
