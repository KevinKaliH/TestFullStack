import { useState } from "react";

type ActionType = "DELETE" | "UPDATE" | "READ" | "CREATE";

export function useCommonFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [actionType, setActionType] = useState<ActionType>("READ");

  const commonFetch = async <T>(
    actionType: ActionType,
    action: () => Promise<T>
  ): Promise<T | undefined> => {
    setActionType(actionType);
    setIsLoading(true);
    setError(null);
    try {
      const result = await action();
      return result;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    setError,
    isLoading,
    actionType,
    commonFetch,
  };
}
