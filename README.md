# Ask My Document — Frontend

A modern web interface for **Ask My Document**, a PDF question-answering application powered by a Retrieval-Augmented Generation (RAG) backend.

Users can upload PDF documents, monitor document processing, ask questions about a selected document, and inspect the source pages used to generate an answer.

> **Upload → Process → Ask → Retrieve → Answer → Sources**

---

## Overview

The frontend is responsible for the user-facing experience of Ask My Document.

It communicates with a separate **FastAPI backend** that handles:

* PDF processing
* Text extraction
* Chunking
* Embeddings
* Vector search
* LLM-based answer generation

The frontend does not implement the RAG pipeline itself. It provides the interface through which users interact with that pipeline.

---

## Features

### Document Management

* PDF upload
* Document list
* Processing status
* Document deletion with confirmation
* Upload and error states
* Automatic document list updates

### Document Q&A

* Select a document
* Ask questions about its contents
* Display generated answers
* Display retrieved source pages
* Handle loading and error states

### Responsive UI

* Desktop-friendly layout
* Mobile-responsive interface
* Responsive document list
* Responsive upload interface
* Mobile-friendly dialogs and controls
* Proper handling of long filenames and answers

---

## Tech Stack

* **Next.js**
* **TypeScript**
* **React**
* **Tailwind CSS**
* **shadcn/ui**

---

## Architecture

The frontend communicates with the FastAPI backend over HTTP.

```text
┌─────────────────────────────┐
│          Next.js            │
│                             │
│  Document Management        │
│  PDF Upload                 │
│  Question Interface         │
│  Answer Display             │
│  Source Display             │
└──────────────┬──────────────┘
               │
               │ HTTP API
               ↓
┌─────────────────────────────┐
│          FastAPI            │
│                             │
│  Document Processing        │
│  RAG Retrieval              │
│  Embeddings                 │
│  LLM Generation             │
└─────────────────────────────┘
```

---

## Main User Flow

### 1. Upload a document

The user selects a PDF from the upload interface.

The frontend sends the file to the FastAPI backend as multipart form data.

### 2. Monitor processing

After upload, the document appears in the document list with its processing status.

The backend handles extraction, chunking, and embedding generation.

### 3. Select a document

The user selects a processed document to open its question-answering interface.

### 4. Ask a question

The frontend sends the question and document ID to the backend.

### 5. Display the answer

The backend returns:

* Generated answer
* Retrieved source information
* Relevant page numbers

The frontend presents these results in a readable format.

---

## API Integration

The backend URL is configured through:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

For example:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

The frontend uses this value when communicating with the FastAPI backend.

---

## Local Development

### Prerequisites

* Node.js
* npm
* Running Ask My Document backend

### Install dependencies

```bash
npm install
```

### Configure environment

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### Start development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

## Deployment

The frontend is designed to be deployed independently from the backend.

A typical deployment setup is:

```text
Next.js
   ↓
Vercel

FastAPI
   ↓
Render / VPS / Cloud Server
```

The production frontend only needs the production API URL configured through:

```env
NEXT_PUBLIC_API_URL
```

---

## Backend

The RAG backend is maintained in a separate repository.

**Backend repository:** Add your backend repository URL here.

The backend is responsible for the complete document-processing and RAG pipeline.

---

## Project Structure

A simplified frontend structure:

```text
src/
├── app/
│
├── components/
│   ├── ui/
│   ├── documents/
│   └── ...
│
├── lib/
│   └── ...
│
└── ...
```

The application is organized around reusable UI components and API-driven document/Q&A workflows.

---

## Design Goals

The interface is intentionally designed to be:

* Clean
* Minimal
* Professional
* Spacious
* Easy to understand
* Responsive
* Focused on the document and answer rather than unnecessary visual effects

The UI avoids excessive gradients, glassmorphism, and decorative elements in favor of clear hierarchy and usability.

---

## Current Scope

The frontend currently focuses on the core RAG workflow:

```text
Upload PDF
     ↓
Select Document
     ↓
Ask Question
     ↓
View Answer
     ↓
Inspect Sources
```

It does not attempt to implement advanced document-management features outside this workflow.

---

## Related Repository

**Ask My Document — Backend:** https://github.com/imran-khan-dev/ask-my-pdf-backend

---

## License

MIT 