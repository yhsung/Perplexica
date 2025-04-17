// Existing imports and config...
import { z } from 'zod';

// Add Azure OpenAI config getters
export const getAzureOpenaiApiKey = () =>
  process.env.AZURE_OPENAI_API_KEY || '';

export const getAzureOpenaiInstanceName = () =>
  process.env.AZURE_OPENAI_API_INSTANCE_NAME || '';

export const getAzureOpenaiChatDeploymentName = () =>
  process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME || '';

export const getAzureOpenaiEmbeddingDeploymentName = () =>
  process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME || '';

// Rest of existing config...
