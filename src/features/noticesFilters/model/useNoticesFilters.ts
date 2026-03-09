import { useSearchParams } from "react-router-dom";

export const useNoticesFilters = () => {
  const [params, setParams] = useSearchParams();

  const updateParam = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(params);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    newParams.set("page", "1");

    setParams(newParams);
  };

  const resetFilters = () => {
    setParams({});
  };

  return {
    params,
    updateParam,
    resetFilters,
  };
};