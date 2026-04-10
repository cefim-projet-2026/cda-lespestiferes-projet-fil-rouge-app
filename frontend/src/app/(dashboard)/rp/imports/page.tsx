"use client";

import { useState, useRef } from "react";
import { useImportNotes } from "@/hooks";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import {
  FileUp,
  FileJson,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  Loader2,
} from "lucide-react";
import type { ImportResult, ImportNoteItem } from "@/types";

export default function ImportsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<ImportNoteItem[] | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const importMutation = useImportNotes();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    if (selectedFile.type !== "application/json") {
      setError("Veuillez sélectionner un fichier JSON valide.");
      return;
    }

    setFile(selectedFile);
    setError(null);
    setImportResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          setJsonData(json);
        } else {
          setError("Le format du JSON doit être un tableau d'objets.");
        }
      } catch (err) {
        setError("Le fichier JSON est corrompu ou mal formé.");
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleImport = async () => {
    if (!jsonData) return;

    try {
      const response = await importMutation.mutateAsync(jsonData);
      setImportResult(response.data);
      setJsonData(null);
      setFile(null);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Une erreur est survenue lors de l'import.",
      );
    }
  };

  const reset = () => {
    setFile(null);
    setJsonData(null);
    setImportResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Import <span className="text-primary">Massif</span>
        </h1>
        <p className="text-slate-400">
          Importez des notes en masse via un fichier JSON structuré.
        </p>
      </div>

      {!importResult ? (
        <Card className="border-dashed border-2 bg-white/[0.02]">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 border border-primary/20 shadow-xl shadow-primary/5">
              <FileUp className="w-10 h-10 text-primary" />
            </div>

            <div className="space-y-2 mb-8">
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                Déposez votre fichier JSON
              </h3>
              <p className="text-slate-500 max-w-sm mx-auto text-sm">
                Glissez-déposez votre fichier ici ou cliquez pour parcourir
                votre ordinateur.
              </p>
            </div>

            <input
              type="file"
              className="hidden"
              accept=".json"
              onChange={handleFileChange}
              ref={fileInputRef}
            />

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl border-white/10 hover:border-primary/50"
              >
                Sélectionner le fichier
              </Button>
              {jsonData && (
                <Button
                  onClick={handleImport}
                  isLoading={importMutation.isPending}
                  className="rounded-2xl px-8"
                >
                  Démarrer l'import
                </Button>
              )}
            </div>

            {file && !error && (
              <div className="mt-6 flex items-center gap-3 p-3 px-5 rounded-2xl bg-white/5 border border-white/5 text-primary font-medium">
                <FileJson className="w-5 h-5" />
                <span className="text-sm font-bold truncate max-w-[200px]">
                  {file.name}
                </span>
                <span className="text-xs text-slate-500">
                  ({(file.size / 1024).toFixed(2)} KB)
                </span>
              </div>
            )}

            {error && (
              <div className="mt-6 flex items-center gap-2 text-red-400 bg-red-500/10 p-3 px-6 rounded-2xl border border-red-500/20 text-sm font-semibold">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="bg-emerald-500/5 border-emerald-500/20">
            <CardContent className="p-8 flex items-center gap-6">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-tight">
                  Import terminé avec succès
                </h3>
                <p className="text-slate-400 text-sm">
                  <span className="text-emerald-500 font-bold">
                    {importResult.success}
                  </span>{" "}
                  notes ont été importées sur un total de{" "}
                  <span className="text-white font-bold">
                    {importResult.total}
                  </span>
                  .
                </p>
              </div>
              <Button variant="outline" onClick={reset} className="rounded-2xl">
                Nouveau Import
              </Button>
            </CardContent>
          </Card>

          {importResult.errors.length > 0 && (
            <Card className="border-red-500/20">
              <CardHeader
                title="Erreurs rencontrées"
                description={`${importResult.errors.length} ligne(s) n'ont pas pu être traitées.`}
              />
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {importResult.errors.map((err, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 border-b border-[#1f1f22] last:border-none hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="w-8 h-8 shrink-0 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 font-black text-xs text-red-500">
                        {err.ligne}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-300 font-medium">
                          {err.message}
                        </p>
                      </div>
                      <XCircle className="w-4 h-4 text-red-500 opacity-40" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
            <Info className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">
              Format attendu du fichier
            </h4>
            <div className="text-sm text-slate-400 space-y-4 font-medium leading-relaxed">
              <p>
                Le fichier doit être au format JSON et contenir une liste
                d'objets avec les champs suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2 px-2 border-l border-primary/20 ml-2">
                <li>
                  <code className="text-primary bg-white/5 px-1.5 py-0.5 rounded">
                    eleveEmail
                  </code>{" "}
                  : Email de l'élève (string)
                </li>
                <li>
                  <code className="text-primary bg-white/5 px-1.5 py-0.5 rounded">
                    evaluationId
                  </code>{" "}
                  : ID de l'évaluation (number)
                </li>
                <li>
                  <code className="text-primary bg-white/5 px-1.5 py-0.5 rounded">
                    valeur
                  </code>{" "}
                  : Note entre 0 et 20 (number)
                </li>
                <li>
                  <code className="text-primary bg-white/5 px-1.5 py-0.5 rounded">
                    presence
                  </code>{" "}
                  : PRESENT, ABSENT_JUSTIFIE, ou ABSENT_NON_JUSTIFIE (optionnel)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
