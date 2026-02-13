// Helper for server-side fetching

const BASE_URL = process.env.API_BASE_URL;
const API_TOKEN = process.env.API_TOKEN;

/**
 * Helper for Server-Side Fetching.
 * Automatically handles Base URL and Authentication Token.
 * 
 * @param endpoint - The API endpoint (e.g., "/users")
 * @param options - Fetch options (method, headers, body, etc.)
 * @returns The parsed JSON response
 */
export async function dbFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!BASE_URL) {
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

    // Set Authorization if token exists and not already provided
    if (API_TOKEN && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${API_TOKEN}`);
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
            return {} as T;
        }

        return await response.json();
    } catch (error) {
        console.error(`[Server Fetch Error] ${url}:`, error);
        throw error;
    }
}
