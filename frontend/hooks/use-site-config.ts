export function useSiteConfig() {
  return {
    siteName: "Health Forum",
    apiBaseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api",
  };
}
