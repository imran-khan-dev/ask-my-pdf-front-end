const API_URL = "http://127.0.0.1:8000";

export async function getDocuments() {
    const response = await fetch(`${API_URL}/documents`);

    console.log("response", response);

    if (!response.ok) {
        throw new Error("Failed to fetch documents");
    }

    return response.json();
}

export async function uploadDocument(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/documents/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to upload document");
    }

    return response.json();
}

export async function deleteDocument(documentId: number) {
    const response = await fetch(
        `${API_URL}/documents/${documentId}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to delete document");
    }

    return response.json();
}

export async function askDocument(
  documentId: number,
  question: string
) {
  const response = await fetch(
    `${API_URL}/documents/${documentId}/ask?q=${encodeURIComponent(question)}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.detail || "Failed to get an answer"
    );
  }

  return response.json();
}