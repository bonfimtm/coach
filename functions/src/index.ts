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

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const articles = onRequest(async (request, response) => {
  logger.info('Fetching all articles');
  const articles = await findAllArticles();
  logger.info(`Fetched ${articles.length} articles`);
  response.send(articles);
});

export const articleImage = onRequest(async (request, response) => {
  logger.info('Fetching all article images');
  const articleQuery = request.query?.articleId as string ?? '';
  const articleId = parseInt(articleQuery);
  const articleImage = await findAllArticleImages(articleId);
  logger.info('Article image fetched');
  response.send(articleImage);
});
