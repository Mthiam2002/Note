export function formatDate(date) {
    return date.toLocaleDateString("fr-FR", {
        day:"numeric",
        month:"short",
        year: "numeric",
    });
}