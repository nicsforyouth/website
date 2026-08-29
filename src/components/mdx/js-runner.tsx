"use client";

import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

interface LogEntry {
  type: "log" | "error";
  text: string;
}

interface JSRunnerProps {
  code: string;
}

export default function JSRunner({ code }: JSRunnerProps) {
  const [input, setInput] = useState<string>(code ?? "");
  const [output, setOutput] = useState<LogEntry[]>([]);

  const run = (): void => {
    const logs: LogEntry[] = [];
    const originalLog = console.log;
    const originalErr = console.error;

    console.log = (...args: unknown[]) => {
      logs.push({ type: "log", text: args.map(String).join(" ") });
    };
    console.error = (...args: unknown[]) => {
      logs.push({ type: "error", text: args.map(String).join(" ") });
    };

    try {
      // eslint-disable-next-line no-new-func
      new Function(input)();
    } catch (e) {
      logs.push({ type: "error", text: (e as Error).message });
    }

    console.log = originalLog;
    console.error = originalErr;
    setOutput(logs);
  };

  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: 8,
        overflow: "hidden",
        fontFamily: "monospace",
      }}
    >
      <Editor
        value={input}
        onValueChange={setInput}
        highlight={(c: string) =>
          highlight(c || "", languages.javascript, "javascript")
        }
        padding={12}
        style={{
          background: "#2d2d2d",
          color: "#fff",
          minHeight: 120,
          fontSize: 14,
        }}
      />
      <div
        style={{
          background: "#1e1e1e",
          padding: "6px 12px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={run}
          style={{
            background: "#0af",
            color: "#fff",
            border: "none",
            padding: "6px 14px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          ▶ Run
        </button>
      </div>
      <div
        style={{
          background: "#111",
          color: "#0f0",
          padding: 12,
          minHeight: 40,
          whiteSpace: "pre-wrap",
        }}
      >
        {output.length === 0 ? (
          <span style={{ color: "#666" }}>// output will appear here</span>
        ) : (
          output.map((o, i) => (
            <div
              key={i}
              style={{ color: o.type === "error" ? "#f55" : "#0f0" }}
            >
              {o.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// "use client";
//
// import {
//   isValidElement,
//   useEffect,
//   useRef,
//   useState,
//   type ReactNode,
// } from "react";
// import CodeMirror from "@uiw/react-codemirror";
// import { javascript } from "@codemirror/lang-javascript";
//
// interface JSRunnerProps {
//   children: ReactNode;
//   code: string;
// }
//
// function extractCode(node: ReactNode): string {
//   if (typeof node === "string") {
//     return node;
//   }
//
//   if (typeof node === "number") {
//     return String(node);
//   }
//
//   if (Array.isArray(node)) {
//     return node.map(extractCode).join("");
//   }
//
//   if (isValidElement(node)) {
//     return extractCode((node.props as any).children as any);
//   }
//
//   return "";
// }
//
// export default function JSRunner({ children, code: codee }: JSRunnerProps) {
//   const initialCode = extractCode(children).trim();
//
//   const [code, setCode] = useState(initialCode);
//   const [output, setOutput] = useState<string[]>([]);
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//
//   useEffect(() => {
//     const handleMessage = (event: MessageEvent) => {
//       if (event.source !== iframeRef.current?.contentWindow) return;
//
//       if (event.data?.type === "console") {
//         setOutput((prev) => [...prev, event.data.value]);
//       }
//     };
//
//     window.addEventListener("message", handleMessage);
//
//     return () => {
//       window.removeEventListener("message", handleMessage);
//     };
//   }, []);
//
//   function run() {
//     setOutput([]);
//
//     const safeCode = code.replace(/<\/script>/gi, "<\\/script>");
//
//     iframeRef.current!.srcdoc = `
//       <!DOCTYPE html>
//       <html>
//         <body>
//           <script>
//             console.log = (...args) => {
//               window.parent.postMessage(
//                 {
//                   type: "console",
//                   value: args.map(String).join(" ")
//                 },
//                 "*"
//               );
//             };
//
//             try {
//               ${safeCode}
//             } catch (error) {
//               console.log("Error:", error.message);
//             }
//           <\/script>
//         </body>
//       </html>
//     `;
//   }
//
//   return (
//     <div className="overflow-hidden rounded-xl border">
//       <CodeMirror
//         value={code}
//         onChange={setCode}
//         extensions={[javascript()]}
//         basicSetup={{
//           lineNumbers: true,
//           foldGutter: false,
//           highlightActiveLine: true,
//         }}
//       />
//
//       <div className="flex items-center justify-between border-t px-3 py-2">
//         <span className="text-sm text-muted-foreground">JavaScript</span>
//
//         <button
//           type="button"
//           onClick={run}
//           className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
//         >
//           Run
//         </button>
//       </div>
//
//       <div className="border-t bg-black p-4 font-mono text-sm text-white">
//         {output.length === 0 ? (
//           <span className="text-zinc-500">No output</span>
//         ) : (
//           output.map((line, index) => <div key={index}>{line}</div>)
//         )}
//       </div>
//
//       <iframe
//         ref={iframeRef}
//         title="JavaScript runner"
//         sandbox="allow-scripts"
//         className="hidden"
//       />
//     </div>
//   );
// }
