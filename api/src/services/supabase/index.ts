import axios from "axios";

// Replace with your Supabase project reference and API key
const supabaseApiKey = process.env.SUPABASE_SERVICE_TOKEN;
const supabaseProjectRef = "default";
const supabaseBaseUrl = "localhost:8000/api";

// Set up Axios instance
const axiosInstance = axios.create({
  baseURL: `${supabaseBaseUrl}/v1/projects/${supabaseProjectRef}`,
  headers: {
    Authorization: "Basic cm9vdDpwYXNz", //`Bearer ${supabaseApiKey}`,
    "Content-Type": "application/json",
  },
});

// GET /v1/projects/{ref}/config/auth
export const getAuthConfig = async () => {
  try {
    const response = await axiosInstance.get(`/config/auth`);
    return response.data;
  } catch (error) {
    console.error("Error getting auth config:", error);
    throw error;
  }
};

// PATCH /v1/projects/{ref}/config/auth
export const updateAuthConfig = async (authConfig: object) => {
  try {
    const response = await axiosInstance.patch(`/config/auth`, authConfig);
    return response.data;
  } catch (error) {
    console.error("Error updating auth config:", error);
    throw error;
  }
};

// POST /v1/projects/{ref}/config/auth/third-party-auth
export const createThirdPartyAuth = async (thirdPartyConfig: object) => {
  try {
    const response = await axiosInstance.post(
      `/config/auth/third-party-auth`,
      thirdPartyConfig
    );
    return response.data;
  } catch (error) {
    console.error("Error creating third-party auth:", error);
    throw error;
  }
};

// GET /v1/projects/{ref}/config/auth/third-party-auth
export const getThirdPartyAuth = async () => {
  try {
    const response = await axiosInstance.get(`/config/auth/third-party-auth`);
    return response.data;
  } catch (error) {
    console.error("Error getting third-party auth:", error);
    throw error;
  }
};

// GET /v1/projects/{ref}/config/auth/third-party-auth/{tpa_id}
export const getThirdPartyAuthById = async (tpaId: string) => {
  try {
    const response = await axiosInstance.get(
      `/config/auth/third-party-auth/${tpaId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error getting third-party auth by ID ${tpaId}:`, error);
    throw error;
  }
};

// DELETE /v1/projects/{ref}/config/auth/third-party-auth/{tpa_id}
export const deleteThirdPartyAuth = async (tpaId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/config/auth/third-party-auth/${tpaId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting third-party auth ID ${tpaId}:`, error);
    throw error;
  }
};

// POST /v1/projects/{ref}/config/auth/sso/providers
export const createSSOProvider = async (ssoProviderConfig: object) => {
  try {
    const response = await axiosInstance.post(
      `/config/auth/sso/providers`,
      ssoProviderConfig
    );
    return response.data;
  } catch (error) {
    console.error("Error creating SSO provider:", error);
    throw error;
  }
};

// GET /v1/projects/{ref}/config/auth/sso/providers
export const getSSOProviders = async () => {
  try {
    const response = await axiosInstance.get(`/config/auth/sso/providers`);
    return response.data;
  } catch (error) {
    console.error("Error getting SSO providers:", error);
    throw error;
  }
};

// GET /v1/projects/{ref}/config/auth/sso/providers/{provider_id}
export const getSSOProviderById = async (providerId: string) => {
  try {
    const response = await axiosInstance.get(
      `/config/auth/sso/providers/${providerId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error getting SSO provider by ID ${providerId}:`, error);
    throw error;
  }
};

// PUT /v1/projects/{ref}/config/auth/sso/providers/{provider_id}
export const updateSSOProvider = async (
  providerId: string,
  ssoProviderConfig: object
) => {
  try {
    const response = await axiosInstance.put(
      `/config/auth/sso/providers/${providerId}`,
      ssoProviderConfig
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating SSO provider ID ${providerId}:`, error);
    throw error;
  }
};

// DELETE /v1/projects/{ref}/config/auth/sso/providers/{provider_id}
export const deleteSSOProvider = async (providerId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/config/auth/sso/providers/${providerId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting SSO provider ID ${providerId}:`, error);
    throw error;
  }
};

///
/// DB
///

// GET /v1/snippets
export const getSnippets = async () => {
  try {
    const response = await axiosInstance.get(`/snippets`);
    return response.data;
  } catch (error) {
    console.error("Error getting snippets:", error);
    throw error;
  }
};

// GET /v1/snippets/{id}
export const getSnippetById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/snippets/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting snippet by ID ${id}:`, error);
    throw error;
  }
};

// GET /v1/projects/{ref}/ssl-enforcement
export const getSSLEnforcement = async () => {
  try {
    const response = await axiosInstance.get(`/ssl-enforcement`);
    return response.data;
  } catch (error) {
    console.error("Error getting SSL enforcement:", error);
    throw error;
  }
};

// PUT /v1/projects/{ref}/ssl-enforcement
export const updateSSLEnforcement = async (sslConfig: object) => {
  try {
    const response = await axiosInstance.put(`/ssl-enforcement`, sslConfig);
    return response.data;
  } catch (error) {
    console.error("Error updating SSL enforcement:", error);
    throw error;
  }
};

// GET /v1/projects/{ref}/types/typescript
export const getTypeScriptTypes = async () => {
  try {
    const response = await axiosInstance.get(`/types/typescript`);
    return response.data;
  } catch (error) {
    console.error("Error getting TypeScript types:", error);
    throw error;
  }
};

// GET /v1/projects/{ref}/readonly
export const getReadOnlyStatus = async () => {
  try {
    const response = await axiosInstance.get(`/readonly`);
    return response.data;
  } catch (error) {
    console.error("Error getting readonly status:", error);
    throw error;
  }
};

// POST /v1/projects/{ref}/readonly/temporary-disable
export const disableReadOnlyTemporary = async () => {
  try {
    const response = await axiosInstance.post(`/readonly/temporary-disable`);
    return response.data;
  } catch (error) {
    console.error("Error disabling readonly temporarily:", error);
    throw error;
  }
};

// POST /v1/projects/{ref}/read-replicas/setup
export const setupReadReplicas = async () => {
  try {
    const response = await axiosInstance.post(`/read-replicas/setup`);
    return response.data;
  } catch (error) {
    console.error("Error setting up read replicas:", error);
    throw error;
  }
};

// POST /v1/projects/{ref}/read-replicas/remove
export const removeReadReplicas = async () => {
  try {
    const response = await axiosInstance.post(`/read-replicas/remove`);
    return response.data;
  } catch (error) {
    console.error("Error removing read replicas:", error);
    throw error;
  }
};

// GET /v1/projects/{ref}/config/database/postgres
export const getPostgresConfig = async () => {
  try {
    const response = await axiosInstance.get(`/config/database/postgres`);
    return response.data;
  } catch (error) {
    console.error("Error getting Postgres config:", error);
    throw error;
  }
};

// PUT /v1/projects/{ref}/config/database/postgres
export const updatePostgresConfig = async (postgresConfig: object) => {
  try {
    const response = await axiosInstance.put(
      `/config/database/postgres`,
      postgresConfig
    );
    return response.data;
  } catch (error) {
    console.error("Error updating Postgres config:", error);
    throw error;
  }
};

// GET /v1/projects/{ref}/config/database/pgbouncer
export const getPgBouncerConfig = async () => {
  try {
    const response = await axiosInstance.get(`/config/database/pgbouncer`);
    return response.data;
  } catch (error) {
    console.error("Error getting PgBouncer config:", error);
    throw error;
  }
};

// GET /v1/projects/{ref}/config/database/pooler
export const getPoolerConfig = async () => {
  try {
    const response = await axiosInstance.get(`/config/database/pooler`);
    return response.data;
  } catch (error) {
    console.error("Error getting pooler config:", error);
    throw error;
  }
};

// PATCH /v1/projects/{ref}/config/database/pooler
export const updatePoolerConfig = async (poolerConfig: object) => {
  try {
    const response = await axiosInstance.patch(
      `/config/database/pooler`,
      poolerConfig
    );
    return response.data;
  } catch (error) {
    console.error("Error updating pooler config:", error);
    throw error;
  }
};

// POST /v1/projects/{ref}/database/query
export const executeDatabaseQuery = async (query: string) => {
  try {
    const response = await axiosInstance.post(`/database/query`, { query });
    return response.data;
  } catch (error) {
    console.error("Error executing database query:", error);
    throw error;
  }
};

// POST /v1/projects/{ref}/database/webhooks/enable
export const enableDatabaseWebhooks = async () => {
  try {
    const response = await axiosInstance.post(`/database/webhooks/enable`);
    return response.data;
  } catch (error) {
    console.error("Error enabling database webhooks:", error);
    throw error;
  }
};

// GET /v1/projects/{ref}/database/backups
export const getDatabaseBackups = async () => {
  try {
    const response = await axiosInstance.get(`/database/backups`);
    return response.data;
  } catch (error) {
    console.error("Error getting database backups:", error);
    throw error;
  }
};

// POST /v1/projects/{ref}/database/backups/restore-pitr
export const restoreBackupToPointInTime = async (restoreConfig: object) => {
  try {
    const response = await axiosInstance.post(
      `/database/backups/restore-pitr`,
      restoreConfig
    );
    return response.data;
  } catch (error) {
    console.error("Error restoring backup to point-in-time:", error);
    throw error;
  }
};

///
/// REST
///

// GET /v1/projects/{ref}/postgrest
export const getPostgRESTConfig = async () => {
  try {
    const response = await axiosInstance.get(`/postgrest`);
    return response.data;
  } catch (error) {
    console.error("Error getting PostgREST config:", error);
    throw error;
  }
};

// PATCH /v1/projects/{ref}/postgrest
export const updatePostgRESTConfig = async (postgRESTConfig: object) => {
  try {
    const response = await axiosInstance.patch(`/postgrest`, postgRESTConfig);
    return response.data;
  } catch (error) {
    console.error("Error updating PostgREST config:", error);
    throw error;
  }
};
