// "use client";

// import { useEffect, useState } from "react";
// import { deleteDocument, getDocuments, uploadDocument } from "../lib/api";

// type Document = {
//   id: number;
//   filename: string;
//   storage_path: string;
//   extracted_text: string | null;
//   processing_status: string;
//   created_at: string;
// };

// export default function Home() {
//   const [documents, setDocuments] = useState<Document[]>([]);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   async function loadDocuments() {
//     console.log("loadDocuments");
//     try {
//       const data = await getDocuments();
//       setDocuments(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to load documents");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     let active = true;

//     getDocuments()
//       .then((data) => {
//         if (active) {
//           setDocuments(data);
//         }
//       })
//       .catch((err) => {
//         if (active) {
//           setError(
//             err instanceof Error ? err.message : "Failed to load documents",
//           );
//         }
//       })
//       .finally(() => {
//         if (active) {
//           setLoading(false);
//         }
//       });

//     return () => {
//       active = false;
//     };
//   }, []);

//   useEffect(() => {
//     const hasProcessingDocument = documents.some(
//       (document) => document.processing_status === "processing",
//     );

//     if (!hasProcessingDocument) {
//       return;
//     }

//     const interval = setInterval(() => {
//       loadDocuments();
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [documents]);

//   async function handleUpload() {
//     if (!selectedFile) {
//       return;
//     }

//     setUploading(true);
//     setError("");

//     try {
//       await uploadDocument(selectedFile);

//       setSelectedFile(null);

//       const fileInput = document.getElementById(
//         "file-input",
//       ) as HTMLInputElement | null;

//       if (fileInput) {
//         fileInput.value = "";
//       }

//       await loadDocuments();
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Failed to upload document",
//       );
//     } finally {
//       setUploading(false);
//     }
//   }

//   async function handleDelete(documentId: number) {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this document?",
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       setError("");

//       await deleteDocument(documentId);

//       setDocuments((current) =>
//         current.filter((document) => document.id !== documentId),
//       );
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Failed to delete document",
//       );
//     }
//   }

//   return (
//     <main className="min-h-screen bg-zinc-50 px-6 py-12">
//       <div className="mx-auto max-w-4xl">
//         <header className="mb-10">
//           <h1 className="text-3xl font-bold text-zinc-900">Ask My Document</h1>

//           <p className="mt-2 text-zinc-600">
//             Upload a PDF and ask questions about it.
//           </p>
//         </header>

//         <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
//           <h2 className="text-lg font-semibold text-zinc-900">
//             Upload document
//           </h2>

//           <div className="mt-4 flex flex-col gap-3 sm:flex-row">
//             <input
//               id="file-input"
//               type="file"
//               accept=".pdf,application/pdf"
//               onChange={(event) => {
//                 setSelectedFile(event.target.files?.[0] ?? null);
//               }}
//               className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm"
//             />

//             <button
//               onClick={handleUpload}
//               disabled={!selectedFile || uploading}
//               className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {uploading ? "Uploading..." : "Upload"}
//             </button>
//           </div>
//         </section>

//         {error && (
//           <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//             {error}
//           </div>
//         )}

//         <section className="mt-8">
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-lg font-semibold text-zinc-900">
//               Your documents
//             </h2>

//             <button
//               onClick={loadDocuments}
//               className="text-sm text-zinc-600 hover:text-zinc-900"
//             >
//               Refresh
//             </button>
//           </div>

//           {loading ? (
//             <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
//               Loading documents...
//             </div>
//           ) : documents.length === 0 ? (
//             <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-10 text-center">
//               <p className="text-zinc-500">No documents uploaded yet.</p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {documents.map((document) => (
//                 <div
//                   key={document.id}
//                   className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
//                 >
//                   <div className="min-w-0">
//                     <h3 className="truncate font-medium text-zinc-900">
//                       {document.filename}
//                     </h3>

//                     <p className="mt-1 text-sm text-zinc-500">
//                       {document.processing_status === "processing"
//                         ? "Processing..."
//                         : document.processing_status === "completed"
//                           ? "Ready"
//                           : "Processing failed"}
//                     </p>
//                   </div>

//                   <button
//                     onClick={() => handleDelete(document.id)}
//                     className="ml-4 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// }

// import { deleteDocument, getDocuments, uploadDocument } from "../lib/api";



"use client";

import { useEffect, useState } from "react";
import {
  askDocument,
  deleteDocument,
  getDocuments,
  uploadDocument,
} from "../lib/api";

type Document = {
  id: number;
  filename: string;
  storage_path: string;
  extracted_text: string | null;
  processing_status: string;
  created_at: string;
};

type Source = {
  page_number: number;
  distance: number;
};

type Answer = {
  document_id: number;
  question: string;
  answer: string;
  sources: Source[];
};

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] =
    useState<Document | null>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);

  const [uploading, setUploading] = useState(false);
  const [asking, setAsking] = useState(false);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  async function loadDocuments() {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load documents"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadDocuments();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const hasProcessingDocument = documents.some(
      (document) =>
        document.processing_status === "processing"
    );

    if (!hasProcessingDocument) {
      return;
    }

    const interval = setInterval(() => {
      loadDocuments();
    }, 2000);

    return () => clearInterval(interval);
  }, [documents]);

  async function handleUpload() {
    if (!selectedFile) {
      return;
    }

    setUploading(true);
    setError("");

    try {
      await uploadDocument(selectedFile);

      setSelectedFile(null);

      const fileInput = document.getElementById(
        "file-input"
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      await loadDocuments();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload document"
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(documentId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteDocument(documentId);

      setDocuments((current) =>
        current.filter(
          (document) => document.id !== documentId
        )
      );

      if (selectedDocument?.id === documentId) {
        setSelectedDocument(null);
        setAnswer(null);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete document"
      );
    }
  }

  async function handleAsk() {
    if (!selectedDocument || !question.trim()) {
      return;
    }

    setAsking(true);
    setError("");
    setAnswer(null);

    try {
      const data = await askDocument(
        selectedDocument.id,
        question
      );

      setAnswer(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to get an answer"
      );
    } finally {
      setAsking(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-zinc-900">
            Ask My Document
          </h1>

          <p className="mt-2 text-zinc-600">
            Upload a PDF and ask questions about it.
          </p>
        </header>

        {/* Upload */}
        <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">
            Upload document
          </h2>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              id="file-input"
              type="file"
              accept=".pdf,application/pdf"
              onChange={(event) => {
                setSelectedFile(
                  event.target.files?.[0] ?? null
                );
              }}
              className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm"
            />

            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </section>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Documents */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">
                Documents
              </h2>

              <button
                onClick={loadDocuments}
                className="text-sm text-zinc-600 hover:text-zinc-900"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="rounded-xl border bg-white p-5 text-sm text-zinc-500">
                Loading...
              </div>
            ) : documents.length === 0 ? (
              <div className="rounded-xl border border-dashed bg-white p-6 text-center text-sm text-zinc-500">
                No documents yet.
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((document) => {
                  const isSelected =
                    selectedDocument?.id === document.id;

                  const isReady =
                    document.processing_status ===
                    "completed";

                  return (
                    <div
                      key={document.id}
                      className={`rounded-xl border bg-white p-4 ${
                        isSelected
                          ? "border-zinc-900"
                          : "border-zinc-200"
                      }`}
                    >
                      <button
                        disabled={!isReady}
                        onClick={() => {
                          setSelectedDocument(document);
                          setAnswer(null);
                          setQuestion("");
                        }}
                        className="w-full text-left disabled:cursor-not-allowed"
                      >
                        <p className="truncate font-medium text-zinc-900">
                          {document.filename}
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          {isReady
                            ? "Ready"
                            : document.processing_status ===
                                "processing"
                              ? "Processing..."
                              : "Processing failed"}
                        </p>
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(document.id)
                        }
                        className="mt-3 text-sm text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Q&A */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            {!selectedDocument ? (
              <div className="flex min-h-[400px] items-center justify-center text-center">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">
                    Select a document
                  </h2>

                  <p className="mt-2 text-sm text-zinc-500">
                    Choose a processed document to start
                    asking questions.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="border-b border-zinc-200 pb-5">
                  <p className="text-sm text-zinc-500">
                    Asking about
                  </p>

                  <h2 className="mt-1 font-semibold text-zinc-900">
                    {selectedDocument.filename}
                  </h2>
                </div>

                <div className="mt-6">
                  <textarea
                    value={question}
                    onChange={(event) =>
                      setQuestion(event.target.value)
                    }
                    placeholder="Ask something about this document..."
                    rows={4}
                    className="w-full resize-none rounded-lg border border-zinc-300 p-3 text-sm outline-none focus:border-zinc-900"
                  />

                  <button
                    onClick={handleAsk}
                    disabled={
                      !question.trim() || asking
                    }
                    className="mt-3 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {asking
                      ? "Thinking..."
                      : "Ask Question"}
                  </button>
                </div>

                {answer && (
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold text-zinc-900">
                      Answer
                    </h3>

                    <div className="mt-3 rounded-lg bg-zinc-50 p-5 text-sm leading-7 text-zinc-800">
                      {answer.answer}
                    </div>

                    {answer.sources.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-sm font-semibold text-zinc-900">
                          Sources
                        </h3>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {answer.sources.map(
                            (source) => (
                              <span
                                key={source.page_number}
                                className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700"
                              >
                                Page{" "}
                                {source.page_number}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}