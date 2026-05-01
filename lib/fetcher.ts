// Helper for server-side fetching

const BASE_URL = process.env.API_BASE_URL;

/**
 * Helper for server-side fetching.
 * Automatically handles base URL construction and fallback data.
 * 
 * @param endpoint - The API endpoint (e.g., "/users")
 * @param options - Fetch options (method, headers, body, etc.)
 * @param fallbackData - Optional fallback data returned if the API call fails
 * @returns The parsed JSON response, or fallbackData if the fetch fails.
 */
export async function dbFetch<T = any>(
    endpoint: string,
    options: RequestInit = {},
    fallbackData?: T
): Promise<T> {
    if (!BASE_URL) {
        console.error("[Server Fetch Error] API_BASE_URL is not defined in environment variables.");
        if (fallbackData !== undefined) return fallbackData;
        throw new Error("API_BASE_URL is not defined in environment variables.");
    }

    // Normalize URL construction
    const cleanBaseUrl = BASE_URL.replace(/\/$/, "");
    const cleanEndpoint = endpoint.replace(/^\//, "");
    const url = `${cleanBaseUrl}/${cleanEndpoint}`;

    // Prepare headers
    const headers = new Headers(options.headers);

    // Set default Content-Type if not provided
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            // Try to parse error message if available
            let errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;
            try {
                const errorData = await response.json();
                if (errorData?.message) {
                    errorMessage = errorData.message;
                }
            } catch {
                // Ignore JSON parsing error for error response
            }
            throw new Error(errorMessage);
        }

        // Handle 204 No Content
        if (response.status === 204) {
            return (fallbackData !== undefined ? fallbackData : {}) as T;
        }

        return await response.json();
    } catch (error) {
        // Safe robust logging
        console.error(`[Server Fetch Error] Failed fetching ${url}:`, error instanceof Error ? error.message : error);
        
        // Return fallback data if explicitly provided instead of crashing
        if (fallbackData !== undefined) {
            console.warn(`[Fallback] Returning fallback recovery data for ${endpoint}`);
            return fallbackData;
        }

        // Only throw if NO fallback was supplied
        throw error;
    }
}
