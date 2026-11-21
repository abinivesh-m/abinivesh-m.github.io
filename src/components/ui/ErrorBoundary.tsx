import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-[12px] text-red-300">
          <div className="font-mono">3D scene failed to load:</div>
          <div className="mt-1 break-words">{this.state.error.message}</div>
        </div>
      );
    }
    return this.props.children;
  }
}
