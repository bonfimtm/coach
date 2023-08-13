/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from 'firebase-functions/v2/https';
 * import {onDocumentWritten} from 'firebase-functions/v2/firestore';
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';

import { findAllArticles } from './article';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const articles = onRequest(async (request, response) => {
  logger.info('Fetching all articles');
  const articles = await findAllArticles();
  logger.info(`Fetched ${articles.length} articles`);
  response.send(articles);
});
