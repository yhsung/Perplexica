# Azure OpenAI Integration Architecture

```mermaid
graph TD
    subgraph Existing Providers
        A(OpenAI) --> B{{API Route}}
        C(Anthropic) --> B
        D(Ollama) --> B
    end

    subgraph Azure Integration
        E[Azure Provider Module] --> B
        E --> F[Azure Config]
        F --> G{{.env Variables}}
        E --> H[Azure OpenAI Service]
    end

    classDef azure fill:#e3f2fd,stroke:#2196f3;
    class E,F,H azure;
```

## Key Components

1. **Azure Provider Module** (`src/lib/providers/azureOpenAI.ts`)
   - Handles Azure-specific configuration
   - Implements model loading for Azure deployments
   - Extends base provider interface

2. **Configuration Flow**
   ```mermaid
   sequenceDiagram
       User->>Environment: Set AZURE_OPENAI_* vars
       AzureProvider->>Config: Validate credentials
       Config->>AzureProvider: Return configuration
       AzureProvider->>Langchain: Initialize client
       Langchain->>Azure API: Make requests
   ```

3. **Environment Variables
   - `AZURE_OPENAI_API_KEY`
   - `AZURE_OPENAI_API_INSTANCE_NAME`
   - `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME`
   - `AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME`

4. **Architecture Principles
   - Complete isolation from standard OpenAI implementation
   - Shared provider interface contract
   - Separate error handling boundaries