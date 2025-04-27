export function cn(
  ...classes: (string | undefined | null | false | Record<string, boolean>)[]
) {
  return classes
    .flatMap((cls) => {
      if (typeof cls === "string") return cls;
      if (typeof cls === "object" && cls !== null) {
        return Object.entries(cls)
          .filter(([, value]) => value)
          .map(([key]) => key);
      }
      return [];
    })
    .filter(Boolean)
    .join(" ");
}
