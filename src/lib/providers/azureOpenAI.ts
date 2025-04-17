import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { 
  getAzureOpenaiApiKey,
  getAzureOpenaiInstanceName,
  getAzureOpenaiChatDeploymentName,
  getAzureOpenaiEmbeddingDeploymentName
} from '../config';
import { ChatModel, EmbeddingModel } from '.';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { Embeddings } from '@langchain/core/embeddings';

export const PROVIDER_INFO = {
  key: 'azure_openai',
  displayName: 'Azure OpenAI',
};

const azureConfig = {
  openAIApiKey: getAzureOpenaiApiKey(),
  azureOpenAIApiInstanceName: getAzureOpenaiInstanceName(),
  azureOpenAIApiDeploymentName: getAzureOpenaiChatDeploymentName(),
  azureOpenAIApiVersion: '2023-05-15'
};

export const loadAzureOpenAIChatModels = async () => {
  const apiKey = getAzureOpenaiApiKey();
  const instanceName = getAzureOpenaiInstanceName();
  const deploymentName = getAzureOpenaiChatDeploymentName();

  if (!apiKey || !instanceName || !deploymentName) return {};

  try {
    return {
      [deploymentName]: {
        displayName: 'Azure OpenAI Chat',
        model: new ChatOpenAI({
          ...azureConfig,
          modelName: deploymentName,
          temperature: 0.7,
          azureOpenAIBasePath: `https://${instanceName}.openai.azure.com/openai/deployments/${deploymentName}`
        }) as unknown as BaseChatModel,
      }
    };
  } catch (err) {
    console.error(`Error loading Azure OpenAI models: ${err}`);
    return {};
  }
};

export const loadAzureOpenAIEmbeddingModels = async () => {
  const apiKey = getAzureOpenaiApiKey();
  const instanceName = getAzureOpenaiInstanceName();
  const deploymentName = getAzureOpenaiEmbeddingDeploymentName();

  if (!apiKey || !instanceName || !deploymentName) return {};

  try {
    return {
      [deploymentName]: {
        displayName: 'Azure OpenAI Embeddings',
        model: new OpenAIEmbeddings({
          ...azureConfig,
          modelName: deploymentName,
          azureOpenAIBasePath: `https://${instanceName}.openai.azure.com/openai/deployments/${deploymentName}`
        }) as unknown as Embeddings,
      }
    };
  } catch (err) {
    console.error(`Error loading Azure OpenAI embeddings models: ${err}`);
    return {};
  }
};