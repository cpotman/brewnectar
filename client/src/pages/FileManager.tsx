import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Upload,
  FileIcon,
  Trash2,
  Download,
  Image,
  FileText,
  Film,
  Music,
  Archive,
  Loader2,
  LogIn,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

const MAX_FILE_SIZE = 16 * 1024 * 1024; // 16MB

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith("image/")) return <Image size={20} className="text-amber-600" />;
  if (mimeType.startsWith("video/")) return <Film size={20} className="text-purple-600" />;
  if (mimeType.startsWith("audio/")) return <Music size={20} className="text-sky-600" />;
  if (mimeType.includes("zip") || mimeType.includes("archive") || mimeType.includes("tar") || mimeType.includes("gz"))
    return <Archive size={20} className="text-stone-600" />;
  if (mimeType.includes("pdf") || mimeType.includes("document") || mimeType.includes("text"))
    return <FileText size={20} className="text-emerald-600" />;
  return <FileIcon size={20} className="text-stone-500" />;
}

export default function FileManager() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();
  const filesQuery = trpc.files.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const uploadMutation = trpc.files.upload.useMutation({
    onSuccess: () => {
      utils.files.list.invalidate();
    },
  });
  const deleteMutation = trpc.files.delete.useMutation({
    onMutate: async ({ id }) => {
      await utils.files.list.cancel();
      const prev = utils.files.list.getData();
      utils.files.list.setData(undefined, (old) =>
        old ? old.filter((f) => f.id !== id) : []
      );
      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) {
        utils.files.list.setData(undefined, context.prev);
      }
      toast.error("Failed to delete file");
    },
    onSettled: () => {
      utils.files.list.invalidate();
    },
  });

  const handleUpload = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      setUploading(true);
      let successCount = 0;
      let errorCount = 0;

      for (const file of Array.from(fileList)) {
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`"${file.name}" exceeds 16MB limit`);
          errorCount++;
          continue;
        }

        try {
          const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              // Strip the data URL prefix (e.g. "data:image/png;base64,")
              const base64 = result.split(",")[1];
              resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          await uploadMutation.mutateAsync({
            filename: file.name,
            mimeType: file.type || "application/octet-stream",
            size: file.size,
            base64Data,
          });
          successCount++;
        } catch (err) {
          console.error(`Failed to upload ${file.name}:`, err);
          toast.error(`Failed to upload "${file.name}"`);
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast.success(
          `${successCount} file${successCount > 1 ? "s" : ""} uploaded successfully`
        );
      }
      setUploading(false);
    },
    [uploadMutation]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleUpload(e.dataTransfer.files);
    },
    [handleUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#D97706]" size={32} />
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl text-[#1C1917]">
              Sign In Required
            </CardTitle>
            <CardDescription className="text-[#78716C]">
              Please sign in to access the file manager and upload files.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <a href={getLoginUrl()}>
              <Button className="w-full bg-[#1C1917] hover:bg-[#292524]">
                <LogIn size={16} className="mr-2" />
                Sign In
              </Button>
            </a>
            <Link href="/">
              <Button variant="outline" className="w-full">
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const files = filesQuery.data ?? [];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ArrowLeft size={14} />
                  Home
                </Button>
              </Link>
              <div>
                <h1 className="font-display text-2xl font-bold text-[#1C1917]">
                  File Manager
                </h1>
                <p className="text-sm text-[#78716C]">
                  Upload and manage your files securely with S3 storage
                </p>
              </div>
            </div>
            <div className="text-sm text-[#78716C]">
              {files.length} file{files.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Zone */}
        <div
          className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 mb-8 ${
            dragOver
              ? "border-[#D97706] bg-amber-50/50"
              : "border-stone-300 bg-white hover:border-stone-400"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center justify-center py-12 px-4">
            {uploading ? (
              <>
                <Loader2 size={40} className="animate-spin text-[#D97706] mb-3" />
                <p className="text-sm font-medium text-[#44403C]">Uploading...</p>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                  <Upload size={24} className="text-[#D97706]" />
                </div>
                <p className="text-base font-medium text-[#1C1917] mb-1">
                  Drag & drop files here
                </p>
                <p className="text-sm text-[#78716C] mb-4">
                  or click to browse (max 16MB per file)
                </p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-[#D97706] text-[#B45309] hover:bg-amber-50"
                >
                  <Upload size={14} className="mr-2" />
                  Choose Files
                </Button>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => handleUpload(e.target.files)}
            disabled={uploading}
          />
        </div>

        {/* File List */}
        {filesQuery.isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin text-[#D97706]" size={24} />
            <span className="ml-2 text-sm text-[#78716C]">Loading files...</span>
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
              <FileIcon size={28} className="text-stone-400" />
            </div>
            <p className="text-lg font-medium text-[#44403C] mb-1">No files yet</p>
            <p className="text-sm text-[#78716C]">
              Upload your first file to get started
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-4 bg-white rounded-xl border border-stone-100 p-4 hover:shadow-sm hover:border-stone-200 transition-all"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-stone-50 flex items-center justify-center flex-shrink-0">
                  {getFileIcon(file.mimeType)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1C1917] truncate">
                    {file.filename}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-[#A8A29E]">
                      {formatFileSize(file.size)}
                    </span>
                    <span className="text-xs text-[#A8A29E]">{file.mimeType}</span>
                    <span className="text-xs text-[#A8A29E]">
                      {new Date(file.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {/* Preview/Download */}
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Open file"
                    >
                      <Download size={14} />
                    </Button>
                  </a>

                  {/* Delete */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200"
                    title="Delete file"
                    onClick={() => {
                      if (window.confirm(`Delete "${file.filename}"?`)) {
                        deleteMutation.mutate({ id: file.id });
                      }
                    }}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Storage info */}
        <div className="mt-8 p-4 rounded-xl bg-amber-50/50 border border-amber-200/40">
          <div className="flex items-start gap-3">
            <AlertCircle size={16} className="text-[#B45309] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#92400E]">About File Storage</p>
              <p className="text-xs text-[#B45309] mt-1 leading-relaxed">
                Files are securely stored using S3 cloud storage. Each file is uploaded via
                presigned URLs for maximum security. The file metadata (name, size, type) is
                tracked in the database while the actual file bytes live in S3.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
